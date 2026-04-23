// SISS 2.0 Demo 假資料
const DEMO_DATA = {
  user: { name: '王小明', dept: '供應室', role: '管理員', avatar: '王' },

  dashboard: {
    kpi: {
      wash: 47, package: 23, sterilizer: 18, inspect: 5,
      stockIn: 12, expire: 8, stockOut: 34, damage: 2
    },
    chart_monthly: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      wash: Math.floor(Math.random() * 60) + 20,
      sterilize: Math.floor(Math.random() * 50) + 15,
      stockOut: Math.floor(Math.random() * 40) + 10
    })),
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
