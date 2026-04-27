// SISS 2.0 Demo 假資料
const DEMO_DATA = {
  user: { name: '王小明', dept: '供應室', role: '管理員', avatar: '王' },

  dashboard: {
    kpi: {
      wash: 47, package: 23, sterilizer: 18, inspect: 5,
      stockIn: 12, expire: 8, stockOut: 34, damage: 2
    },
    chart_monthly: [
      { day:1,  wash:52, sterilize:41, stockOut:28 }, { day:2,  wash:45, sterilize:38, stockOut:22 },
      { day:3,  wash:58, sterilize:47, stockOut:31 }, { day:4,  wash:43, sterilize:35, stockOut:19 },
      { day:5,  wash:61, sterilize:50, stockOut:35 }, { day:6,  wash:37, sterilize:29, stockOut:14 },
      { day:7,  wash:40, sterilize:32, stockOut:17 }, { day:8,  wash:55, sterilize:44, stockOut:29 },
      { day:9,  wash:63, sterilize:52, stockOut:38 }, { day:10, wash:48, sterilize:40, stockOut:24 },
      { day:11, wash:57, sterilize:46, stockOut:32 }, { day:12, wash:44, sterilize:36, stockOut:21 },
      { day:13, wash:39, sterilize:31, stockOut:16 }, { day:14, wash:66, sterilize:54, stockOut:40 },
      { day:15, wash:50, sterilize:42, stockOut:26 }, { day:16, wash:59, sterilize:48, stockOut:33 },
      { day:17, wash:46, sterilize:37, stockOut:23 }, { day:18, wash:53, sterilize:43, stockOut:27 },
      { day:19, wash:41, sterilize:33, stockOut:18 }, { day:20, wash:67, sterilize:55, stockOut:42 },
      { day:21, wash:38, sterilize:30, stockOut:15 }, { day:22, wash:60, sterilize:49, stockOut:36 },
      { day:23, wash:47, sterilize:39, stockOut:25 }, { day:24, wash:54, sterilize:45, stockOut:30 },
      { day:25, wash:62, sterilize:51, stockOut:37 }, { day:26, wash:49, sterilize:41, stockOut:27 },
      { day:27, wash:44, sterilize:36, stockOut:20 }, { day:28, wash:56, sterilize:47, stockOut:33 },
      { day:29, wash:51, sterilize:43, stockOut:28 }, { day:30, wash:47, sterilize:39, stockOut:24 }
    ],
    chart_distribution: [
      { label: '供應室', value: 35, color: '#3B82F6' },
      { label: 'B棟手術室', value: 28, color: '#10B981' },
      { label: 'C棟手術室', value: 20, color: '#8B5CF6' },
      { label: '內視鏡室', value: 12, color: '#F59E0B' },
      { label: '其他', value: 5, color: '#94A3B8' }
    ]
  },

  wash: [
    { id: 'W2026042301', time: '2026/04/23 08:30', type: '腹腔鏡器械組', count: 12, machine: '清洗機 #1', operator: '林小芳', status: '已完成',
      instruments: [
        { name: '腹腔鏡', barcode: 'INS-001-2023', status: '已完成' },
        { name: '抓鉗', barcode: 'INS-002-2023', status: '已完成' },
        { name: '剪刀鉗', barcode: 'INS-003-2023', status: '已完成' },
        { name: '電燒探針', barcode: 'INS-004-2023', status: '已完成' }
      ]
    },
    { id: 'W2026042302', time: '2026/04/23 09:15', type: '骨科手術器械組', count: 18, machine: '清洗機 #2', operator: '陳大明', status: '清洗中',
      instruments: [
        { name: '骨鑿', barcode: 'INS-101-2023', status: '清洗中' },
        { name: '骨鎚', barcode: 'INS-102-2023', status: '清洗中' },
        { name: '骨鋸', barcode: 'INS-103-2023', status: '待清洗' }
      ]
    },
    { id: 'W2026042303', time: '2026/04/23 10:00', type: '婦科手術器械組', count: 9, machine: '清洗機 #1', operator: '王美麗', status: '待清洗',
      instruments: [
        { name: '子宮擴張器', barcode: 'INS-201-2023', status: '待清洗' },
        { name: '刮匙', barcode: 'INS-202-2023', status: '待清洗' }
      ]
    },
    { id: 'W2026042304', time: '2026/04/23 10:45', type: '心血管外科器械組', count: 24, machine: '清洗機 #3', operator: '張志豪', status: '清洗中',
      instruments: [
        { name: '血管剪', barcode: 'INS-301-2023', status: '清洗中' },
        { name: '持針器', barcode: 'INS-302-2023', status: '已完成' }
      ]
    },
    { id: 'W2026042305', time: '2026/04/23 11:30', type: '神經外科器械組', count: 15, machine: '清洗機 #2', operator: '林小芳', status: '已完成',
      instruments: [
        { name: '顱骨鑽', barcode: 'INS-401-2023', status: '已完成' },
        { name: '腦壓計', barcode: 'INS-402-2023', status: '已完成' }
      ]
    },
    { id: 'W2026042306', time: '2026/04/23 12:00', type: '泌尿科器械組', count: 8, machine: '清洗機 #1', operator: '黃志明', status: '待清洗',
      instruments: [
        { name: '膀胱鏡', barcode: 'INS-501-2023', status: '待清洗' },
        { name: '輸尿管鏡', barcode: 'INS-502-2023', status: '待清洗' }
      ]
    },
    { id: 'W2026042307', time: '2026/04/23 13:20', type: '耳鼻喉器械組', count: 11, machine: '清洗機 #3', operator: '陳大明', status: '已完成',
      instruments: [
        { name: '鼻竇鏡', barcode: 'INS-601-2023', status: '已完成' },
        { name: '耳顯微器', barcode: 'INS-602-2023', status: '已完成' }
      ]
    },
    { id: 'W2026042308', time: '2026/04/23 14:10', type: '眼科器械組', count: 6, machine: '清洗機 #2', operator: '王美麗', status: '清洗中',
      instruments: [
        { name: '白內障超乳頭', barcode: 'INS-701-2023', status: '清洗中' },
        { name: '玻璃體切割器', barcode: 'INS-702-2023', status: '待清洗' }
      ]
    },
    { id: 'W2026042309', time: '2026/04/23 15:00', type: '胸腔外科器械組', count: 20, machine: '清洗機 #1', operator: '張志豪', status: '待清洗',
      instruments: [
        { name: '肋骨撐開器', barcode: 'INS-801-2023', status: '待清洗' },
        { name: '肺葉鉗', barcode: 'INS-802-2023', status: '待清洗' }
      ]
    },
    { id: 'W2026042310', time: '2026/04/23 15:45', type: '小兒外科器械組', count: 7, machine: '清洗機 #3', operator: '林小芳', status: '已完成',
      instruments: [
        { name: '小兒腸鉗', barcode: 'INS-901-2023', status: '已完成' },
        { name: '小兒剪刀', barcode: 'INS-902-2023', status: '已完成' }
      ]
    }
  ],

  sterilizers: [
    { id: 1, name: '滅菌鍋 #1', status: '運作中', todayCount: 4, temp: '134°C', pressure: '2.1 bar', eta: '11分鐘' },
    { id: 2, name: '滅菌鍋 #2', status: '閒置中', todayCount: 3, temp: '—', pressure: '—', eta: '—' },
    { id: 3, name: '滅菌鍋 #3', status: '待檢驗', todayCount: 2, temp: '121°C', pressure: '1.8 bar', eta: '完成待驗' }
  ],

  sterilizeBatches: [
    { id: 'ST-20260423-01', machine: '滅菌鍋 #1', packageCount: 8, startTime: '2026/04/23 07:00', endTime: '2026/04/23 07:45', status: '通過' },
    { id: 'ST-20260423-02', machine: '滅菌鍋 #2', packageCount: 6, startTime: '2026/04/23 08:30', endTime: '2026/04/23 09:15', status: '通過' },
    { id: 'ST-20260423-03', machine: '滅菌鍋 #3', packageCount: 10, startTime: '2026/04/23 09:00', endTime: '2026/04/23 09:50', status: '待檢驗' },
    { id: 'ST-20260423-04', machine: '滅菌鍋 #1', packageCount: 7, startTime: '2026/04/23 10:00', endTime: '2026/04/23 10:45', status: '通過' },
    { id: 'ST-20260423-05', machine: '滅菌鍋 #1', packageCount: 9, startTime: '2026/04/23 11:30', endTime: '—', status: '進行中' },
    { id: 'ST-20260423-06', machine: '滅菌鍋 #2', packageCount: 5, startTime: '2026/04/23 11:00', endTime: '2026/04/23 11:45', status: '通過' },
    { id: 'ST-20260423-07', machine: '滅菌鍋 #3', packageCount: 12, startTime: '2026/04/23 12:30', endTime: '2026/04/23 13:20', status: '待檢驗' },
    { id: 'ST-20260423-08', machine: '滅菌鍋 #2', packageCount: 4, startTime: '2026/04/23 14:00', endTime: '—', status: '進行中' }
  ],

  packManage: [
    { id: 'PK-20260423-01', name: '腹腔鏡手術盤包', barcode: 'TK-20260423-001', type: '腹腔鏡器械組', instrumentCount: 12, operator: '陳美玲', startTime: '2026/04/23 08:50', status: '包配中',
      instruments: [
        { name: '腹腔鏡鏡頭', barcode: 'INS-001-2023', required: true, checked: true },
        { name: 'Trocar 套管 5mm', barcode: 'INS-002-2023', required: true, checked: true },
        { name: 'Trocar 套管 10mm', barcode: 'INS-003-2023', required: true, checked: false },
        { name: '抓鉗', barcode: 'INS-004-2023', required: true, checked: true },
        { name: '電燒棒', barcode: 'INS-005-2023', required: true, checked: false }
      ]
    },
    { id: 'PK-20260423-02', name: '骨科膝關節置換盤包', barcode: 'TK-20260423-002', type: '骨科器械組', instrumentCount: 18, operator: '林小芳', startTime: '2026/04/23 09:20', status: '已完成',
      instruments: [
        { name: '骨鑿', barcode: 'INS-101-2023', required: true, checked: true },
        { name: '骨鎚', barcode: 'INS-102-2023', required: true, checked: true },
        { name: '骨鋸', barcode: 'INS-103-2023', required: true, checked: true }
      ]
    },
    { id: 'PK-20260423-03', name: '心臟外科體外循環盤包', barcode: 'TK-20260423-003', type: '心臟外科器械組', instrumentCount: 25, operator: '張志豪', startTime: '2026/04/23 10:00', status: '待包配',
      instruments: [
        { name: '心臟剪刀', barcode: 'INS-201-2023', required: true, checked: false },
        { name: '血管鉗', barcode: 'INS-202-2023', required: true, checked: false }
      ]
    },
    { id: 'PK-20260423-04', name: '婦科腹腔鏡盤包', barcode: 'TK-20260423-004', type: '婦科器械組', instrumentCount: 10, operator: '王美麗', startTime: '2026/04/23 11:30', status: '已完成',
      instruments: [
        { name: '子宮操作器', barcode: 'INS-301-2023', required: true, checked: true },
        { name: '舉宮器', barcode: 'INS-302-2023', required: true, checked: true }
      ]
    },
    { id: 'PK-20260423-05', name: '神經外科顱腦手術盤包', barcode: 'TK-20260423-005', type: '神經外科器械組', instrumentCount: 30, operator: '李志強', startTime: '2026/04/23 13:00', status: '待包配',
      instruments: [
        { name: '顱骨鑽', barcode: 'INS-401-2023', required: true, checked: false },
        { name: '腦膜剪', barcode: 'INS-402-2023', required: true, checked: false }
      ]
    },
    { id: 'PK-20260423-06', name: '泌尿科膀胱鏡盤包', barcode: 'TK-20260423-006', type: '泌尿科器械組', instrumentCount: 8, operator: '陳美玲', startTime: '2026/04/23 14:20', status: '包配中',
      instruments: [
        { name: '膀胱鏡', barcode: 'INS-501-2023', required: true, checked: true },
        { name: '活檢鉗', barcode: 'INS-502-2023', required: true, checked: false }
      ]
    }
  ],

  sterilizeCheck: [
    { id: 'SC-20260423-01', batchId: 'ST-20260423-01', machine: '滅菌鍋 #1', packageCount: 8, endTime: '2026/04/23 07:45', inspector: '張美玲', chemIndicator: '合格', bioIndicator: '合格', status: '通過' },
    { id: 'SC-20260423-02', batchId: 'ST-20260423-02', machine: '滅菌鍋 #2', packageCount: 6, endTime: '2026/04/23 09:15', inspector: '陳美玲', chemIndicator: '合格', bioIndicator: '待判讀', status: '待檢驗' },
    { id: 'SC-20260423-03', batchId: 'ST-20260423-03', machine: '滅菌鍋 #3', packageCount: 10, endTime: '2026/04/23 09:50', inspector: '林小芳', chemIndicator: '不合格', bioIndicator: '不合格', status: '不合格' },
    { id: 'SC-20260423-04', batchId: 'ST-20260423-04', machine: '滅菌鍋 #1', packageCount: 7, endTime: '2026/04/23 10:45', inspector: '王美麗', chemIndicator: '合格', bioIndicator: '合格', status: '通過' },
    { id: 'SC-20260423-05', batchId: 'ST-20260423-05', machine: '滅菌鍋 #1', packageCount: 9, endTime: '—', inspector: '—', chemIndicator: '—', bioIndicator: '—', status: '進行中' },
    { id: 'SC-20260423-06', batchId: 'ST-20260423-06', machine: '滅菌鍋 #2', packageCount: 5, endTime: '2026/04/23 11:45', inspector: '張志豪', chemIndicator: '合格', bioIndicator: '合格', status: '通過' },
    { id: 'SC-20260423-07', batchId: 'ST-20260423-07', machine: '滅菌鍋 #3', packageCount: 12, endTime: '2026/04/23 13:20', inspector: '—', chemIndicator: '—', bioIndicator: '—', status: '待檢驗' },
    { id: 'SC-20260423-08', batchId: 'ST-20260423-08', machine: '滅菌鍋 #2', packageCount: 4, endTime: '—', inspector: '—', chemIndicator: '—', bioIndicator: '—', status: '進行中' }
  ],

  storage: [
    { id: 'STK-001', barcode: 'TK-20260420-001', name: '腹腔鏡手術盤包', location: 'A-01-03', qty: 4, expireDate: '2026/10/20', nearExpire: false, expired: false, sterileMethod: '高壓蒸氣' },
    { id: 'STK-002', barcode: 'TK-20260420-002', name: '骨科膝關節置換盤包', location: 'A-02-01', qty: 2, expireDate: '2026/04/30', nearExpire: true, expired: false, sterileMethod: '高壓蒸氣' },
    { id: 'STK-003', barcode: 'TK-20260418-003', name: '心臟外科體外循環盤包', location: 'B-01-02', qty: 1, expireDate: '2026/04/25', nearExpire: true, expired: false, sterileMethod: 'E.O.' },
    { id: 'STK-004', barcode: 'TK-20260415-004', name: '婦科腹腔鏡盤包', location: 'A-03-05', qty: 3, expireDate: '2026/04/22', nearExpire: false, expired: true, sterileMethod: '高壓蒸氣' },
    { id: 'STK-005', barcode: 'TK-20260421-005', name: '神經外科顱腦手術盤包', location: 'B-02-04', qty: 2, expireDate: '2026/11/21', nearExpire: false, expired: false, sterileMethod: 'E.O.' },
    { id: 'STK-006', barcode: 'TK-20260422-006', name: '泌尿科膀胱鏡盤包', location: 'A-01-07', qty: 5, expireDate: '2026/10/22', nearExpire: false, expired: false, sterileMethod: '高壓蒸氣' },
    { id: 'STK-007', barcode: 'TK-20260419-007', name: '眼科白內障盤包', location: 'C-01-01', qty: 3, expireDate: '2026/05/01', nearExpire: true, expired: false, sterileMethod: '高壓蒸氣' },
    { id: 'STK-008', barcode: 'TK-20260416-008', name: '小兒外科腸道盤包', location: 'C-02-03', qty: 1, expireDate: '2026/04/23', nearExpire: false, expired: true, sterileMethod: '高壓蒸氣' }
  ],

  stockout: [
    { id: 'OUT-20260423-01', barcode: 'TK-20260420-001', name: '腹腔鏡手術盤包', dest: 'B棟手術室 OR-3', requester: '李志強', requestTime: '2026/04/23 07:30', outTime: '2026/04/23 08:00', receiver: '林護理師', status: '撥補完成' },
    { id: 'OUT-20260423-02', barcode: 'TK-20260421-005', name: '神經外科顱腦手術盤包', dest: 'B棟手術室 OR-1', requester: '張醫師', requestTime: '2026/04/23 08:00', outTime: '2026/04/23 08:45', receiver: '—', status: '撥補中' },
    { id: 'OUT-20260423-03', barcode: 'TK-20260420-002', name: '骨科膝關節置換盤包', dest: 'C棟手術室 OR-2', requester: '王護理師', requestTime: '2026/04/23 09:00', outTime: '2026/04/23 09:30', receiver: '陳助理', status: '撥補完成' },
    { id: 'OUT-20260423-04', barcode: 'TK-20260422-006', name: '泌尿科膀胱鏡盤包', dest: '內視鏡室', requester: '劉醫師', requestTime: '2026/04/23 10:00', outTime: '—', receiver: '—', status: '撥補中' },
    { id: 'OUT-20260423-05', barcode: 'TK-20260419-007', name: '眼科白內障盤包', dest: 'C棟手術室 OR-4', requester: '陳護理師', requestTime: '2026/04/23 11:00', outTime: '2026/04/23 11:30', receiver: '黃助理', status: '轉移完成' },
    { id: 'OUT-20260423-06', barcode: 'TK-20260421-005', name: '婦科腹腔鏡盤包', dest: 'B棟手術室 OR-5', requester: '林醫師', requestTime: '2026/04/23 13:00', outTime: '—', receiver: '—', status: '撥補中' }
  ],

  damage: [
    { id: 'DMG-20260423-01', instrumentName: '腹腔鏡鏡頭', barcode: 'INS-001-2023', type: '損壞', desc: '鏡頭鍍膜脫落，影像模糊', reporter: '林小芳', reportTime: '2026/04/23 09:00', status: '待審核' },
    { id: 'DMG-20260422-01', instrumentName: 'Trocar 套管 10mm', barcode: 'INS-003-2023', type: '損壞', desc: '密封墊圈老化破損，無法維持氣密', reporter: '陳美玲', reportTime: '2026/04/22 14:30', status: '報修中' },
    { id: 'DMG-20260421-01', instrumentName: '骨科電鑽主機', barcode: 'INS-102-2023', type: '遺失', desc: '手術後盤點發現缺少，已通知手術室清查', reporter: '張志豪', reportTime: '2026/04/21 17:00', status: '調查中' },
    { id: 'DMG-20260420-01', instrumentName: '心臟剪刀', barcode: 'INS-201-2023', type: '損壞', desc: '刀刃缺口，無法正常切割', reporter: '王美麗', reportTime: '2026/04/20 10:00', status: '已報廢' },
    { id: 'DMG-20260419-01', instrumentName: '腹腔鏡抓鉗', barcode: 'INS-004-2023', type: '損壞', desc: '鉗爪變形，夾持力不足', reporter: '李志強', reportTime: '2026/04/19 15:30', status: '維修完成' }
  ],

  reportWash: [
    { id: 'W2026042201', time: '2026/04/22 08:00', type: '腹腔鏡器械組', count: 10, machine: '清洗機 #1', operator: '林小芳', temp: '85°C', duration: '42分鐘', atpResult: '合格', status: '已完成' },
    { id: 'W2026042202', time: '2026/04/22 09:30', type: '骨科器械組', count: 15, machine: '清洗機 #2', operator: '陳美玲', temp: '93°C', duration: '38分鐘', atpResult: '合格', status: '已完成' },
    { id: 'W2026042203', time: '2026/04/22 11:00', type: '心臟外科器械組', count: 22, machine: '清洗機 #1', operator: '張志豪', temp: '85°C', duration: '45分鐘', atpResult: '不合格', status: '異常' },
    { id: 'W2026042301', time: '2026/04/23 08:30', type: '腹腔鏡器械組', count: 12, machine: '清洗機 #1', operator: '林小芳', temp: '85°C', duration: '40分鐘', atpResult: '合格', status: '已完成' },
    { id: 'W2026042302', time: '2026/04/23 09:00', type: '骨科器械組', count: 18, machine: '清洗機 #3', operator: '王美麗', temp: '93°C', duration: '36分鐘', atpResult: '合格', status: '已完成' },
    { id: 'W2026042303', time: '2026/04/23 10:20', type: '婦科器械組', count: 9, machine: '清洗機 #2', operator: '陳美玲', temp: '85°C', duration: '41分鐘', atpResult: '合格', status: '已完成' },
    { id: 'W2026042304', time: '2026/04/23 12:00', type: '神經外科器械組', count: 28, machine: '清洗機 #1', operator: '李志強', temp: '93°C', duration: '50分鐘', atpResult: '合格', status: '已完成' },
    { id: 'W2026042305', time: '2026/04/23 14:00', type: '眼科器械組', count: 6, machine: '清洗機 #2', operator: '王美麗', temp: '85°C', duration: '35分鐘', atpResult: '合格', status: '已完成' }
  ],

  reportSterilize: [
    { id: 'ST-20260422-01', machine: '滅菌鍋 #1', method: '高壓蒸氣', temp: '134°C', pressure: '2.1 bar', duration: '45分鐘', packageCount: 7, startTime: '2026/04/22 07:00', endTime: '2026/04/22 07:45', operator: '張美玲', chemIndicator: '合格', bioIndicator: '合格', status: '通過' },
    { id: 'ST-20260422-02', machine: '滅菌鍋 #2', method: 'E.O.', temp: '55°C', pressure: '0.6 bar', duration: '240分鐘', packageCount: 3, startTime: '2026/04/22 08:00', endTime: '2026/04/22 12:00', operator: '陳美玲', chemIndicator: '合格', bioIndicator: '合格', status: '通過' },
    { id: 'ST-20260422-03', machine: '滅菌鍋 #3', method: '高壓蒸氣', temp: '121°C', pressure: '1.8 bar', duration: '60分鐘', packageCount: 11, startTime: '2026/04/22 09:30', endTime: '2026/04/22 10:30', operator: '林小芳', chemIndicator: '不合格', bioIndicator: '不合格', status: '不合格' },
    { id: 'ST-20260423-01', machine: '滅菌鍋 #1', method: '高壓蒸氣', temp: '134°C', pressure: '2.1 bar', duration: '45分鐘', packageCount: 8, startTime: '2026/04/23 07:00', endTime: '2026/04/23 07:45', operator: '張美玲', chemIndicator: '合格', bioIndicator: '合格', status: '通過' },
    { id: 'ST-20260423-02', machine: '滅菌鍋 #2', method: '高壓蒸氣', temp: '134°C', pressure: '2.1 bar', duration: '45分鐘', packageCount: 6, startTime: '2026/04/23 08:30', endTime: '2026/04/23 09:15', operator: '陳美玲', chemIndicator: '合格', bioIndicator: '待判讀', status: '待檢驗' },
    { id: 'ST-20260423-04', machine: '滅菌鍋 #1', method: '高壓蒸氣', temp: '134°C', pressure: '2.1 bar', duration: '45分鐘', packageCount: 7, startTime: '2026/04/23 10:00', endTime: '2026/04/23 10:45', operator: '張美玲', chemIndicator: '合格', bioIndicator: '合格', status: '通過' },
    { id: 'ST-20260423-06', machine: '滅菌鍋 #2', method: '高壓蒸氣', temp: '134°C', pressure: '2.1 bar', duration: '45分鐘', packageCount: 5, startTime: '2026/04/23 11:00', endTime: '2026/04/23 11:45', operator: '張志豪', chemIndicator: '合格', bioIndicator: '合格', status: '通過' }
  ],

  packLabel: [
    { id: 'LBL-20260423-001', name: '腹腔鏡手術盤包', barcode: 'TK-20260423-007', type: '腹腔鏡器械組', printQty: 3, printTime: '2026/04/23 07:00', operator: '林小芳', printer: 'Zebra ZT411', status: '已列印' },
    { id: 'LBL-20260423-002', name: '骨科膝關節置換盤包', barcode: 'TK-20260423-008', type: '骨科器械組', printQty: 2, printTime: '2026/04/23 07:30', operator: '陳美玲', printer: 'Zebra ZT411', status: '已列印' },
    { id: 'LBL-20260423-003', name: '心臟外科體外循環盤包', barcode: 'TK-20260423-009', type: '心臟外科器械組', printQty: 1, printTime: '—', operator: '張志豪', printer: 'TSC TTP-344M', status: '待列印' },
    { id: 'LBL-20260423-004', name: '婦科腹腔鏡盤包', barcode: 'TK-20260423-010', type: '婦科器械組', printQty: 4, printTime: '2026/04/23 09:00', operator: '王美麗', printer: 'Zebra ZT411', status: '已列印' },
    { id: 'LBL-20260423-005', name: '神經外科顱腦手術盤包', barcode: 'TK-20260423-011', type: '神經外科器械組', printQty: 2, printTime: '—', operator: '—', printer: 'TSC TTP-344M', status: '待列印' }
  ],

  packCart: [
    { id: 'CART-001', name: '手術備車 A', assignedOR: 'B棟 OR-1', packageCount: 5, instrumentCount: 42, preparedBy: '林小芳', prepareTime: '2026/04/23 06:30', surgery: '腦部腫瘤切除術', surgeryTime: '2026/04/23 08:00', status: '已就緒' },
    { id: 'CART-002', name: '手術備車 B', assignedOR: 'B棟 OR-3', packageCount: 3, instrumentCount: 28, preparedBy: '陳美玲', prepareTime: '2026/04/23 07:00', surgery: '腹腔鏡膽囊切除術', surgeryTime: '2026/04/23 09:30', status: '已就緒' },
    { id: 'CART-003', name: '手術備車 C', assignedOR: 'C棟 OR-2', packageCount: 4, instrumentCount: 35, preparedBy: '張志豪', prepareTime: '—', surgery: '膝關節置換術', surgeryTime: '2026/04/23 10:00', status: '備車中' },
    { id: 'CART-004', name: '手術備車 D', assignedOR: 'C棟 OR-4', packageCount: 2, instrumentCount: 18, preparedBy: '—', prepareTime: '—', surgery: '白內障超乳手術', surgeryTime: '2026/04/23 13:00', status: '未備車' },
    { id: 'CART-005', name: '手術備車 E', assignedOR: 'B棟 OR-5', packageCount: 6, instrumentCount: 55, preparedBy: '王美麗', prepareTime: '2026/04/23 07:45', surgery: '心臟繞道手術', surgeryTime: '2026/04/23 14:00', status: '已就緒' }
  ],

  instrumentHistory: [
    { time: '2026/04/20 09:15', event: '送洗', desc: '由 林小芳 登記送洗，批次 W2026042001', type: 'wash', icon: 'droplets' },
    { time: '2026/04/20 11:30', event: '清洗完成', desc: '清洗機 #1，歷時 40 分鐘，水溫 85°C', type: 'wash_done', icon: 'check-circle' },
    { time: '2026/04/20 14:00', event: '包配', desc: '納入盤包 TK-20260420-003，由 陳美玲 執行', type: 'package', icon: 'package' },
    { time: '2026/04/20 16:20', event: '滅菌', desc: '滅菌鍋 #2，批次 ST-20260420-05，高壓蒸氣滅菌 134°C', type: 'sterilize', icon: 'shield' },
    { time: '2026/04/21 08:00', event: '通過檢驗', desc: '操作人員 張美玲，化學指示劑合格，生物指示劑合格', type: 'inspect', icon: 'check-circle' },
    { time: '2026/04/21 09:30', event: '入庫', desc: '供應室倉庫 A 區，貨架 A-03-05', type: 'stock_in', icon: 'inbox' },
    { time: '2026/04/22 07:45', event: '出庫', desc: '出庫至 B棟手術室，由 李志強 領取', type: 'stock_out', icon: 'truck' },
    { time: '2026/04/22 10:00', event: '手術使用', desc: '手術編號 S-20260422-007，病患代號 P-00123，主刀 陳外科醫師', type: 'surgery', icon: 'activity' }
  ]
};
