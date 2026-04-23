SISS 系統完整業務邏輯分析報告
一、系統概覽
項目	內容
系統名稱	SISS — 器械包盤追蹤追溯系統
客戶	阮綜合醫院（YUANHOSP）
開發商	TripleA
框架	ASP.NET MVC 5 + Web API（.NET Framework 4.7.2）
資料庫	Microsoft SQL Server（ADO.NET 原生 SQL）
前端	Razor Views + AdminLTE + Bootstrap 3 + jQuery + DataTables
二、系統架構
技術棧
後端：C# ASP.NET MVC 5 + Web API（~41 個 Controller、超過 250 個 API endpoints）
前端：Razor(.cshtml) 伺服器渲染、200+ 個 View、Chart.js、DataTables、Select2、SweetAlert2
硬體整合：Zebra SDK、TSC 印表機（P/Invoke）、SNMP 印表機監控、WebCam 影像上傳
外部系統：HIS 醫院資訊系統（172.17.6.15:8083）
文件產生：iText7（PDF）、ClosedXML（Excel）、ZXing.Net（條碼產生）
目錄結構

SISS/
├── App_Start/          路由、Bundle、全域過濾
├── App_Code/           共用類別（Connection、Verification、BarcodeAnalyze、HospitalAPI、TSCTSPL）
├── Controllers/        41 個 Controller
├── Models/             62 個 Model（兼具 DAO 角色）
├── Services/           14 個 Service
└── Views/              200+ 個 Razor 視圖
三、使用者與權限系統
3.1 登入流程

使用者輸入帳密
  → HospitalAPI.LoginCheck()（打 HIS 驗證）
  → 查 CSRORDetail 判斷 DeptType（CSR/OR/ESR/其他）
  → 查 User_Access 取權限字串（新使用者依單位名稱自動設定預設權限）
  → 建立 FormsAuthenticationTicket（UserData 格式：姓名_單位代碼_DeptType_UA字串_臨床單位）
  → 導向 Home/Index（儀表板依 UA 字串動態渲染側邊欄）
3.2 權限模型（UA 字串）
UA 字串格式：Q1-123C1-1C2-12C3-12...，以 regex 比對 {字母}{數字}-{子功能數字串}

字首	對應單位	說明
C	供應室（CSR）	C1=清洗、C2=包配、C3=滅菌...
O	開刀房（OR）	O1=手術清點、O2=倉儲...
E	內視鏡室（ESR）	
R	臨床單位（DEPT）	R1=申領、R2=倉儲...
Q	查詢/報表	
A	系統管理設定	
S	督導審核	
四、核心業務模組
4.1 器械主檔管理
資料層級結構（四層）：


InstrumentTypeMaster（大分類）
  └─ InstrumentType（小分類）
       └─ InstrumentData（器械品項）
            └─ InstrumentBarcode（個別條碼實例）
InstrumentBarcode.Status 狀態碼：0=正常、1/2=損壞、3=遺失、4=報修、5=待回清洗區
接受度（Accept）：需由刻碼廠商掃描驗收後才能進入流通
4.2 器械完整生命週期

器械進貨
  → LaserEngraving 送刻（寄送刻碼廠商）
  → 刻碼返回 → AcceptInstrument 驗收（InstrumentBarcode.Accept=1）
       ↓
[1] 清洗（WashMaster + WashDetail）
    → ATP 採樣記錄（WashMasterATPData）
    → WebCam 影像存證
    → FinishWash
       ↓
[2] 包配（PackageAction）
    → 依 PackageMasterDetail 定義放入器械
    → 建立 InstrumentHistory（ProcessMasterId=2）
    → FinishPackage
       ↓
[3] 滅菌（SterilizerDaily）
    → PreSterilizeCar 備車集中
    → 真空檢驗（Vacuum）
    → 消毒劑記錄（Disinfectant）
    → 每日檢查（DayCheck）
    → StartSterilizer → EndSterilizer
    → SterilizerInspect 滅菌後檢驗（生物/化學指示劑）
       ↓
[5] 入庫（PackageIn）
    → 計算效期（SterilizerValidity = SterilizerType 規則 D/W/M/Y + 天數）
       ↓
[12] 出庫（PackageOut）→ 臨床單位
       ↓
臨床使用（InstrumentUse）
    → 手術清點（SurgeryInstrument）
       ↓
回收（DeptRecover）→ 回供應室 → 清洗（循環）
損壞分支：


InstrumentDamage 登錄
  → 督導審核（ReviewInstrumentDamage）
  → DamageType=1,2 → InstrumentRepair 報修送修
  → DamageType=3   → 停用（遺失）
  → InstrumentRemake 復刻 → 重新送 LaserEngraving
4.3 盤包生命週期
盤包主檔結構：


PackageMaster（盤包種類定義）
  └─ PackageMasterDetail（包含哪些器械及數量）

PackagePrint（列印批次）
  └─ PackageBarcode（個別盤包條碼實例）
       └─ PackageHistory（各處理階段歷史）
流程：

列印標籤：PackagePrintCreate → 依 Quantity 建 N 張 PackageBarcode → Zebra/TSC 列印
包配：掃描 PackageBarcode → 放入器械 → FinishPackage
滅菌 → 入庫 → 出庫（同器械流程）
效期管理：到期警告（≤3天）/ 超期計數，顯示於 Home 儀表板
4.4 手術房流程（OR）

術式設定（Surgical + SurgicalDetail）
  → HIS 抓取手術排程（GetSurgeryByDate）
  → 分配盤包（SurgerySurgical + SurgeryInstrument）
  → 手術前清點：掃描 PackageBarcode → CheckInFlag=true
  → 手術後清點：掃描 InstrumentBarcode → UseFlag=true → InstrumentUse
  → FinsihSurgeryInstrument 關閉手術
4.5 臨時申領流程

臨床單位（DEPT）
  → PackageApplyMaster + PackageApplyDetail 建立申領單
  → CSR 審閱 → 逐項出貨（PackageApplyOut）
  → AllPackageComplete → 申領完成
4.6 倉儲管理（DEPT）
配額系統（PackageQuota / InstrumentQuota）：每個單位每種盤包/器械有配額上限
收貨（StartDeptGet）：確認接收 CSR 發出的 PackageOutDetail
回收（StartDeptRecover）：掃入待回收盤包 → PreRecover 列表 → AllInPreRecover 批次確認
五、滅菌管理（最複雜模組，4977 行）
子功能	說明
SterilizerMaster	滅菌鍋設定（各 CSR/OR/ESR 單位的設備）
SterilizerType/Detail	包裝方式效期規則（D日/W週/M月/Y年）
SterilizerDaily	每日每鍋滅菌記錄（含 Seq 流水號）
SterilizerDailyDetail/2	各階段檢查（多 DetailType）
SterilizerDailyLevel	高層次消毒細節
DayCheck	每日例行檢查項目
Vacuum/Disinfectant	真空測試、消毒劑記錄
SterilizerInspect	滅菌後生物/化學指示劑檢驗
高層次消毒（ESR） 與一般高壓蒸氣滅菌走不同流程（StartLevelSterilizer / EndSterilizerLevel）。

六、報表與查詢系統
報表	說明
器械歷程查詢	個別器械條碼的完整流程追溯
盤包歷程查詢	個別盤包的完整流程追溯
病患使用查詢	特定病患使用過哪些器械/盤包
到期率報表	GetExpiredRateData / CheckExpiratedPackage
工作量統計	GetWorkloadStatistics（各單位各階段處理量）
單位申領統計	GetDepartmentRequisition（部門申領報告）
盤包生產分佈	GetPackageProductionDistribution
Excel 匯出	ExportChartToExcel（ClosedXML）
七、外部整合
7.1 HIS 醫院系統
API	用途
LoginVerify	登入驗證
GetPerson	查詢員工姓名/科別
GetPatient	查詢病患資料
GetDivision	取得科別列表
GetSurgeryByDate	依日期取手術排程
GetSurgeryBySurgeryNO	依手術號取手術詳情
每次 API 呼叫皆寫入 APILog 表；正式/測試環境以連線字串含 SISS_YUAN_TEST 切換假資料模式。

7.2 條碼解析（GS1 UDI）
支援 GS1-128、HIBCC、EAN/UPCA 格式；解析 Application Identifier (AI)：

(01) = GTIN/DI
(10) = Lot
(11) = 生產日期
(17) = 效期
(21) = Serial
7.3 印表機整合
類型	SDK	用途
Zebra	Zebra.Sdk	ZPL 標籤列印、校準(GAPDETECT)
TSC	TSCLIB.dll (P/Invoke)	TSPL 標籤列印
HP	SNMP (SharpSnmpLib)	印表機健康狀態監控
八、資料稽核機制
稽核表	記錄內容
UserLog	使用者登入/操作記錄
APILog	所有對外 HIS API 呼叫記錄
SystemLog	系統錯誤與追蹤記錄
PackageInstrumentLog	盤包內器械異動的完整稽核日誌（包含 MType、MContent）
InstrumentHistory	每支器械在每個處理階段的進出時間、操作人員
PackageHistory	每個盤包在每個處理階段的紀錄
九、系統規模
類別	數量	程式碼行數
Controllers	41 個	~45,000 行
Models（兼 DAO）	62 個	~17,500 行
Services	14 個	~7,800 行
Views	200+ 個	—
API Endpoints	250+ 個	—
最大 Controller：SterilizerDataApiController（4,977 行）、SurgeryApiController（3,403 行）、SetPackageInventoryApiController（3,346 行）

十、架構特徵與關鍵設計決策
Model 兼 DAO：Model 直接內嵌 SQL（LoadAll、SaveToDB 等），不使用 Repository Pattern，所有關聯透過 SQL JOIN 實現
Service 協調層：Service 負責業務邏輯編排，Controller 負責開啟 SqlConnection + Transaction，傳入 Service 方法
TransactionVerification 鏈式驗證：統一交易錯誤處理樣式，任一步驟失敗即 throw 中斷鏈式操作並 Rollback
多單位功能複製：同一功能（如 PackagePrint）在 CSR/OR/ESR 三個 Controller 各有一份，差別僅在權限字首
正式/測試環境切換：由連線字串名稱判斷，不需改程式碼
系統核心定位：這是一套醫院器械盤包的全生命週期追溯系統，覆蓋從器械進貨刻碼、清洗、包配、滅菌、入庫、出庫、臨床使用、手術清點、回收、損壞/遺失/報修、復刻的完整週期，橫跨供應室（CSR）、開刀房（OR）、內視鏡室（ESR）與所有臨床單位四大工作領域，並與醫院 HIS 系統及硬體設備深度整合。