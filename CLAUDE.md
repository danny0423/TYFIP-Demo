# SISS 2.0 Demo — Claude Code 接手說明文件

> 這是一份給 AI（Claude Code）的完整接手規格文件。請在開始任何修改前完整閱讀本文件。

---

## 一、專案概覽

**專案名稱**：SISS 2.0 Demo（盤包與器械追溯系統展示版）  
**用途**：業務行銷 Demo，給醫院客戶展示系統功能，目標是讓客戶看完後產生購買意願  
**技術棧**：純靜態 HTML + CSS + JS，無任何後端，無 npm，不需伺服器  
**啟動方式**：直接用瀏覽器開啟 `index.html` 即可  
**開發者背景**：React 前端工程師，熟悉 Tailwind CSS、MUI，目前這份 demo 是純原生 JS 寫的

---

## 二、檔案結構與職責

```
siss-demo/
├── index.html   ← 整個系統的唯一 HTML 檔（登入頁 + 主畫面全部在這）
├── data.js      ← 所有假資料（用 const DEMO_DATA = {...} 掛在 window 上）
├── style.css    ← 全部自訂樣式（CSS variables + 元件類別）
├── app.js       ← 所有互動邏輯（頁面切換、資料渲染、圖表、Modal 等）
└── CLAUDE.md    ← 本文件
```

### 重要：沒有 main.html
原始規格有提到 `main.html`，但實作時**合併到 `index.html`** 裡面了。登入頁與主畫面都在同一個 HTML 檔，透過 `display:none/block` 切換。

---

## 三、CSS 設計系統

### CSS Variables（定義在 `style.css` 的 `:root`）

```css
--brand: #1E3A5F        /* 主色：深藍，用於 Sidebar、按鈕、強調文字 */
--brand-light: #2C5282  /* 主色淺版，用於 hover 狀態 */
--accent: #3B82F6       /* 互動色：天藍，用於主要按鈕、focus、active */
--accent-light: #EFF6FF /* 互動色淡背景 */
--bg: #F8FAFC           /* 頁面底色：淡灰 */
--card: #FFFFFF         /* 卡片白底 */
--text: #1E293B         /* 主要文字色 */
--text-secondary: #64748B /* 次要文字色 */
--success: #10B981      /* 成功綠 */
--warning: #F59E0B      /* 警告橙 */
--danger: #EF4444       /* 危險紅 */
--border: #E2E8F0       /* 邊框色 */
--sidebar-w: 240px      /* Sidebar 展開寬度 */
--topbar-h: 64px        /* TopBar 高度 */
--radius: 12px          /* 標準圓角 */
```

### 字體
Google Fonts 載入 `Noto Sans TC`，全站使用，weight: 300/400/500/600/700

### 主要元件類別清單

| 類別 | 用途 |
|------|------|
| `.kpi-card` | 儀表板 KPI 統計卡片 |
| `.card` | 通用卡片容器（白底+邊框+圓角） |
| `.card-header` / `.card-body` | 卡片頭部/內容區 |
| `.data-table` | 資料表格（含 thead 灰底、tbody hover 淡藍） |
| `.badge` | 狀態標籤，有 `.badge-blue/.green/.orange/.red/.gray/.purple` |
| `.btn` | 按鈕基底，搭配 `.btn-primary/.btn-success/.btn-outline/.btn-sm` |
| `.search-bar` | 搜尋列容器（flex 橫排） |
| `.form-input` / `.select-input` | 表單輸入框 / 下拉選單 |
| `.modal-overlay` / `.modal` | Modal 遮罩 + 容器（加 `.active` class 顯示） |
| `.toast` | 右上角通知（加到 `#toast-container`） |
| `.timeline-item` | 歷程時間軸單筆 |
| `.sterilizer-card` | 滅菌鍋狀態卡片 |
| `.sidebar` / `.sidebar.collapsed` | Sidebar（加 collapsed class 縮到 64px） |
| `.nav-item` / `.nav-item.active` | Sidebar 導覽項目 |
| `.nav-sub` / `.nav-sub.open` | 可展開子選單（max-height 動畫） |
| `.page-section` / `.page-section.active` | 頁面區塊，加 active 才顯示 |

---

## 四、HTML 結構說明

### 整體層次

```
body
├── #login-page（登入頁，初始 display:flex）
│   ├── .login-brand（左半，品牌視覺）
│   └── .login-form-side（右半，表單）
│
└── #main-page（主畫面，初始 display:none）
    └── .layout（display:flex）
        ├── .sidebar#sidebar（左側導覽）
        └── .content-wrapper（右側內容區）
            ├── .topbar（頂部 bar）
            └── .main-content（捲動區域）
                ├── .page-section#page-dashboard（儀表板）
                ├── .page-section#page-wash（清洗管理）
                ├── .page-section#page-sterilize（滅菌管理）
                ├── .page-section#page-instrument-history（歷程查詢）
                └── ...其他 placeholder 頁面
```

### 所有 page-section 的 id 清單

| id | 頁面名稱 | 是否有實際內容 |
|----|----------|----------------|
| `page-dashboard` | 即時資訊儀表板 | ✅ 完整 |
| `page-wash` | 器械清洗管理 | ✅ 完整 |
| `page-sterilize` | 滅菌作業管理 | ✅ 完整 |
| `page-instrument-history` | 器械歷程查詢 | ✅ 完整 |
| `page-pack-label` | 盤包標籤列印 | ⬜ Placeholder |
| `page-pack-manage` | 盤包包配管理 | ⬜ Placeholder |
| `page-pack-cart` | 備車管理 | ⬜ Placeholder |
| `page-sterilize-check` | 滅菌後檢驗管理 | ⬜ Placeholder |
| `page-storage` | 倉儲管理 | ⬜ Placeholder |
| `page-stockout` | 出庫管理 | ⬜ Placeholder |
| `page-damage` | 器械損壞/遺失 | ⬜ Placeholder |
| `page-report-wash` | 清洗記錄查詢 | ⬜ Placeholder |
| `page-report-sterilize` | 滅菌記錄查詢 | ⬜ Placeholder |

### Modal

目前只有一個 Modal：`#wash-modal`（清洗批次詳情）  
- 結構：`.modal-overlay > .modal > .modal-header + .modal-body + .modal-footer`
- 開啟：加 `.active` class → CSS transition 淡入+縮放
- 關閉：點 overlay 背景或關閉按鈕

---

## 五、JavaScript 架構說明

### 全域狀態變數

```js
let currentPage = 'dashboard';   // 目前顯示的頁面 id
let sidebarCollapsed = false;    // Sidebar 收合狀態
let lineChart = null;            // Chart.js 折線圖實例（切換頁面時需 destroy 再重建）
let donutChart = null;           // Chart.js 甜甜圈圖實例
let currentWashBatch = null;     // 目前 Modal 開啟的清洗批次物件（用於確認完成）
```

### 核心函式說明

#### 登入相關
```js
doLogin()
// 點登入按鈕觸發，模擬 0.8s loading，隱藏 login-page，顯示 main-page，執行 initApp()
// 也監聽 Enter 鍵
```

#### 初始化
```js
initApp()
// 登入後呼叫，依序執行：
// renderKPI() → renderWashTable() → renderSterilizerCards() → renderSterilizeBatches() → initCharts()
```

#### 頁面切換
```js
navTo(el, page)
// el：被點擊的 nav-item 或 nav-sub-item DOM 元素
// page：目標頁面的 id（不含 page- 前綴）
// 執行：移除所有 .active → 加到 el 和目標 page-section → 更新麵包屑
// 注意：切換到 dashboard 時，需要 setTimeout 50ms 再重新 initCharts()（Canvas 渲染問題）
```

```js
toggleSub(el, subId)
// 展開/收合 Sidebar 子選單
// 每次點擊先關閉所有 .nav-sub，再根據 isOpen 決定是否開啟目標
```

```js
toggleSidebar()
// 切換 sidebar.collapsed class，CSS 控制寬度從 240px → 64px
```

#### 資料渲染
```js
renderKPI()
// 讀 DEMO_DATA.dashboard.kpi，產生 8 個 .kpi-card 注入 #kpi-grid

renderWashTable()
// 讀 DEMO_DATA.wash，套用 keyword + status 篩選，產生 table rows 注入 #wash-tbody

renderSterilizerCards()
// 讀 DEMO_DATA.sterilizers，產生 3 個滅菌鍋卡片注入 #sterilizer-cards

renderSterilizeBatches()
// 讀 DEMO_DATA.sterilizeBatches，產生 table rows 注入 #sterilize-tbody
```

#### 圖表
```js
initCharts()
// 動態 append Chart.js CDN script（如果 window.Chart 已存在則直接 drawCharts）
// CDN: https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js

drawCharts()
// 建立折線圖（#chart-line）和甜甜圈圖（#chart-donut）
// ⚠️ 重要：每次呼叫前必須先 destroy 舊實例，否則 Canvas 會報錯
```

#### Modal 操作
```js
openWashModal(id)
// id：清洗批次編號（如 'W2026042301'）
// 從 DEMO_DATA.wash 找到對應批次，渲染 Modal 內容，顯示 Modal

closeWashModal(event)
// 點 overlay 背景時觸發，判斷 e.target === overlay 才關閉（避免點 modal 內容也關閉）

confirmWash()
// 將 currentWashBatch.status 改為 '已完成'，關閉 Modal，呼叫 showToast()，呼叫 renderWashTable() 和 renderKPI()
```

#### 工具函式
```js
statusBadge(status)
// 輸入狀態字串，輸出對應顏色的 badge HTML

showToast(msg, type='success')
// 在 #toast-container 新增 .toast 元素，3 秒後 fade out 並移除

searchWithLoading()
// 按下搜尋按鈕時觸發，模擬 0.5s loading 動畫後執行 renderWashTable()

queryHistory()
// 按下查詢按鈕時觸發，0.6s loading 後渲染 DEMO_DATA.instrumentHistory 的時間軸
```

### 重要注意事項

1. **Chart.js Canvas 問題**：切換頁面再切回儀表板時，一定要先 `destroy()` 舊圖表再重建，否則會出現「Canvas is already in use」錯誤
2. **動態 CDN 載入**：Chart.js 是動態 `createElement('script')` 載入的，`onload` 觸發後才執行 `drawCharts()`
3. **所有資料來自 data.js**：不能有任何 fetch/API 呼叫，所有資料都從 `DEMO_DATA` 常數取得
4. **頁面切換不重整**：所有功能頁面都已在 HTML 裡，只透過 CSS `display` 控制顯示

---

## 六、data.js 資料結構

```js
const DEMO_DATA = {
  user: {
    name: '王小明',
    dept: '供應室',
    role: '管理員',
    avatar: '王'  // 頭像顯示的文字
  },

  dashboard: {
    kpi: {
      wash: 47,       // 待清洗器械數
      package: 23,    // 待包配盤包數
      sterilizer: 18, // 待滅菌盤包數
      inspect: 5,     // 待檢驗批數
      stockIn: 12,    // 待入庫盤包數
      expire: 8,      // 即將過期盤包數
      stockOut: 34,   // 今日出庫數
      damage: 2       // 器械損壞通報數
    },
    chart_monthly: [  // 30 筆，每筆 { day, wash, sterilize, stockOut }
      { day: 1, wash: 45, sterilize: 38, stockOut: 22 },
      // ...
    ],
    chart_distribution: [  // 甜甜圈圖資料
      { label: '供應室', value: 35, color: '#3B82F6' },
      { label: 'B棟手術室', value: 28, color: '#10B981' },
      { label: 'C棟手術室', value: 20, color: '#8B5CF6' },
      { label: '內視鏡室', value: 12, color: '#F59E0B' },
      { label: '其他', value: 5, color: '#94A3B8' }
    ]
  },

  wash: [  // 10 筆清洗批次
    {
      id: 'W2026042301',
      time: '2026/04/23 08:30',
      type: '腹腔鏡器械組',
      count: 12,
      machine: '清洗機 #1',
      operator: '林小芳',
      status: '已完成',  // '待清洗' | '清洗中' | '已完成'
      instruments: [     // 該批次內的器械清單
        { name: '腹腔鏡', barcode: 'INS-001-2023', status: '已完成' },
        // ...
      ]
    }
  ],

  sterilizers: [  // 3 台滅菌鍋
    {
      id: 1,
      name: '滅菌鍋 #1',
      status: '運作中',  // '運作中' | '閒置中' | '待檢驗'
      todayCount: 4,
      temp: '134°C',
      pressure: '2.1 bar',
      eta: '11分鐘'
    }
  ],

  sterilizeBatches: [  // 8 筆滅菌批次記錄
    {
      id: 'ST-20260423-01',
      machine: '滅菌鍋 #1',
      packageCount: 8,
      startTime: '2026/04/23 07:00',
      endTime: '2026/04/23 07:45',
      status: '通過'  // '通過' | '進行中' | '待檢驗'
    }
  ],

  instrumentHistory: [  // 8 筆歷程（用於時間軸）
    {
      time: '2026/04/20 09:15',
      event: '送洗',
      desc: '由 林小芳 登記送洗，批次 W2026042001',
      type: 'wash',   // 決定時間軸點的顏色
      icon: 'droplets' // 決定顯示的 SVG 圖示
    }
  ]
}
```

### 歷程 type → 顏色對應
```js
const TIMELINE_COLORS = {
  wash: '#3B82F6',
  wash_done: '#10B981',
  package: '#8B5CF6',
  sterilize: '#F59E0B',
  inspect: '#10B981',
  stock_in: '#06B6D4',
  stock_out: '#8B5CF6',
  surgery: '#EF4444'
}
```

---

## 七、CDN 依賴清單

```html
<!-- 已在 index.html 引入 -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- 動態載入（在 app.js 裡 createElement('script') 載入） -->
https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js
```

**注意**：
- Tailwind 是透過 CDN Play 模式載入，不需 config，直接用 utility class 即可
- Lucide Icons 原規格有列出但**實際沒有引入**，目前所有 icon 都是**內嵌 SVG 字串**寫在 JS 裡
- 不要加入任何需要 `npm install` 的套件

---

## 八、目前已完成 vs 待開發功能

### ✅ 已完成（有實際 UI + 資料）

1. **登入頁** — 品牌視覺 + 表單 + loading 動畫
2. **儀表板** — KPI 卡片 × 8、折線圖、甜甜圈圖
3. **清洗管理頁** — 搜尋篩選、資料表格、詳情 Modal、確認完成（即時更新狀態）
4. **滅菌管理頁** — 3 台滅菌鍋狀態卡片、批次記錄表格
5. **器械歷程查詢頁** — 條碼輸入、垂直時間軸

### ⬜ Placeholder（顯示「此功能模組開發中」）

6. 盤包標籤列印
7. 盤包包配管理
8. 備車管理
9. 滅菌後檢驗管理
10. 倉儲管理
11. 出庫管理
12. 器械損壞/遺失通報
13. 清洗記錄查詢
14. 滅菌記錄查詢

---

## 九、擴充新頁面的標準流程

如果要把 Placeholder 改成實際功能頁，步驟如下：

### Step 1：在 `data.js` 新增假資料
```js
// 在 DEMO_DATA 物件裡新增對應的陣列
storage: [
  { id: 'STK-001', name: '腹腔鏡器械組', location: 'A-03', qty: 5, expireDate: '2026/10/01' }
]
```

### Step 2：在 `index.html` 找到對應的 `page-section`，替換 Placeholder 內容
```html
<!-- 找到這個 -->
<div class="page-section" id="page-storage">
  <div class="page-header">...</div>
  <div class="card"><div class="card-body empty-state">...</div></div>
</div>

<!-- 替換成完整 UI -->
<div class="page-section" id="page-storage">
  <div class="page-header">
    <div class="page-title">倉儲管理</div>
    <div class="page-subtitle">管理各區貨架庫存狀況</div>
  </div>
  <div class="search-bar">...</div>
  <div class="table-wrap">
    <table class="data-table">...</table>
  </div>
</div>
```

### Step 3：在 `app.js` 新增渲染函式
```js
function renderStorageTable() {
  const tbody = document.getElementById('storage-tbody');
  tbody.innerHTML = DEMO_DATA.storage.map(item => `<tr>...</tr>`).join('');
}
```

### Step 4：在 `initApp()` 呼叫新函式
```js
function initApp() {
  renderKPI();
  renderWashTable();
  renderSterilizerCards();
  renderSterilizeBatches();
  renderStorageTable(); // ← 新增
  initCharts();
}
```

---

## 十、常見問題與注意事項

### Q: 修改後圖表不顯示怎麼辦？
A: 確認 `lineChart` 和 `donutChart` 在重建前有先 `.destroy()`。切換到 dashboard 頁面時有 `setTimeout 50ms`，這是為了等 DOM display 切換完成後 Canvas 才能正確取得寬度。

### Q: 如何新增一個 Toast 通知？
```js
showToast('你的訊息內容'); // 綠色成功通知，3秒消失
```

### Q: 如何新增一個 Modal？
1. 在 HTML body 底部新增 `.modal-overlay > .modal` 結構
2. JS 中呼叫 `document.getElementById('your-modal').classList.add('active')` 開啟
3. 關閉時 `classList.remove('active')`

### Q: Badge 的顏色怎麼選？
```
badge-blue    → 進行中、清洗中
badge-green   → 完成、通過、正常
badge-orange  → 待處理、警告、待檢驗
badge-red     → 異常、逾期
badge-gray    → 閒置、未知
badge-purple  → 特殊狀態
```

### Q: 表格的 status 篩選邏輯在哪？
在 `renderWashTable()` 裡，讀取 `#wash-status` select 的值來 filter `DEMO_DATA.wash`。

---

## 十一、設計原則（保持一致性用）

1. **間距**：卡片 padding `20px`，卡片間距 `16px`，section 間距 `24px`
2. **圓角**：標準 `12px`（`--radius`），按鈕 `8px`，Badge `99px`
3. **陰影**：卡片用 `0 1px 3px rgba(0,0,0,0.06)`，hover 狀態 `0 8px 24px rgba(0,0,0,0.08)`
4. **表格**：thead 固定灰底 `var(--bg)`，tbody hover 淡藍 `#F0F7FF`
5. **字體大小**：頁面標題 `22px`，卡片標題 `14px/700`，表格 `13px`，Label `11-12px`
6. **所有新功能都要有 loading 效果**（參考 `searchWithLoading()`，至少 0.5s）
7. **操作成功一定要有 Toast 通知**（參考 `showToast()`）

---

## 十二、重要參考文件（開始任何新功能前必讀）

以下三份文件與本文件並列，**開始開發任何新功能前請一併參考**：

### 📄 `/home/user/0409/TYFIP-Demo/old-system-logic.md`
**用途：SISS 1.0 舊系統完整業務邏輯分析**

記錄了正式上線的 SISS 1.0（阮綜合醫院）的完整架構與業務邏輯，包含：
- 六種角色的 UA 權限字串格式（C=供應室、O=開刀房、E=內視鏡室、R=臨床、Q=查詢、A=管理）
- 器械完整生命週期（進貨刻碼 → 清洗 → 包配 → 滅菌 → 入庫 → 出庫 → 手術使用 → 回收）
- 盤包生命週期與效期管理規則（D/W/M/Y + 天數）
- 41 個 Controller、250+ API endpoint 的模組分布
- ATP 清洗品質管控、生物/化學指示劑滅菌檢驗的業務流程
- 病患使用器械歷程查詢、盤包歷程查詢等報表結構
- HIS 系統整合、GS1 UDI 條碼解析、Zebra/TSC 印表機整合

**何時用**：設計新假資料欄位、規劃新功能頁面邏輯、確認業務術語正確性時參考。

---

### 📄 `/home/user/0409/TYFIP-Demo/real-browse-recommand.md`
**用途：實際系統截圖巡覽後的 Demo 強化建議**

由實際操作 SISS 1.0 系統後整理的規格落差分析，指出 Demo 2.0 與真實系統的差距，包含：
- 儀表板 KPI 應分「供應室 / 開刀房 / 內視鏡室」三區塊（而非混排）
- Sidebar 實際有六種角色選單（供應室深藍、開刀房金黃、內視鏡室綠色...）
- 清洗管理表格缺少「ATP 檢測」欄位（重要品質指標）
- 滅菌鍋卡片應加入「滅菌方式」欄位（高溫高壓 / E.O.）
- **最高銷售價值的三個功能**（目前 Demo 完全沒有）：
  1. **病患使用器械歷程查詢**：輸入病患代號 → 完整器械歷程，醫院評鑑必備，病安追溯亮點
  2. **盤包歷程查詢**：從盤包條碼查完整供應鏈
  3. **多角色切換**：登入後選角色（供應室 / 開刀房 / 督導）

**何時用**：規劃 Demo 新功能優先順序、設計 UI 細節、決定哪些欄位要加時參考。

---

### 📄 `/home/user/0409/TYFIP-Demo/optimization.md`
**用途：已完成優化項目的完整清單**

記錄了第一輪 12 項優化的完整說明與解法，包含：
- 登出功能、通知 dropdown、折線圖固定資料、日期動態產生
- KPI 連動更新、Sidebar tooltip、滅菌按鈕語意修正、KPI 卡片跳轉
- Modal 已完成 badge、Placeholder Coming Soon 改版、搜尋邏輯統一、RWD sidebar

**何時用**：避免重複實作已完成的項目、了解現有功能的設計意圖時參考。

---

### 目前 Demo 最具銷售價值的待開發功能（依優先順序）

| 優先 | 功能 | 說明 | 來源 |
|------|------|------|------|
| 🔥 1 | **病患使用器械歷程查詢** | 醫院評鑑必備，病安追溯核心亮點 | real-browse-recommand §八 |
| 🔥 2 | **儀表板 KPI 分三區塊** | 展示多科室整合管理能力 | real-browse-recommand §一 |
| 🔥 3 | **清洗管理加 ATP 欄位** | 展示清洗品質管控，競品少有 | real-browse-recommand §三 |
| ⭐ 4 | **盤包歷程查詢** | 與器械歷程互補，展示雙向追溯 | real-browse-recommand §八 |
| ⭐ 5 | **滅菌鍋加滅菌方式欄位** | 細節展示系統專業度 | real-browse-recommand §七 |
