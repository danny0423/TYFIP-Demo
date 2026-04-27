// =============================
//  SISS 2.0 Demo — app.js
// =============================

let currentPage = 'dashboard';
let sidebarCollapsed = false;
let lineChart = null;
let donutChart = null;
let currentWashBatch = null;

// ====== NOTIFICATIONS ======
let unreadCount = 3;

function toggleNotifMenu(e) {
  e.stopPropagation();
  document.getElementById('user-dropdown').classList.remove('open');
  document.getElementById('notif-dropdown').classList.toggle('open');
}

function markNotifRead(el) {
  if (!el.classList.contains('unread')) return;
  el.classList.remove('unread');
  unreadCount = Math.max(0, unreadCount - 1);
  updateBellBadge();
}

function markAllNotifRead() {
  document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
  unreadCount = 0;
  updateBellBadge();
  document.getElementById('notif-dropdown').classList.remove('open');
}

function updateBellBadge() {
  const badge = document.getElementById('bell-badge');
  const unreadBadge = document.getElementById('notif-unread-badge');
  if (unreadCount === 0) {
    badge.style.display = 'none';
    unreadBadge.textContent = '全部已讀';
    unreadBadge.className = 'badge badge-gray';
  } else {
    badge.style.display = 'flex';
    badge.textContent = unreadCount;
    unreadBadge.textContent = `${unreadCount} 則未讀`;
    unreadBadge.className = 'badge badge-blue';
  }
}

// ====== USER MENU ======
function toggleUserMenu(e) {
  e.stopPropagation();
  document.getElementById('notif-dropdown').classList.remove('open');
  document.getElementById('user-dropdown').classList.toggle('open');
}

document.addEventListener('click', () => {
  document.getElementById('user-dropdown')?.classList.remove('open');
  document.getElementById('notif-dropdown')?.classList.remove('open');
});

function doLogout() {
  document.getElementById('user-dropdown').classList.remove('open');
  document.getElementById('main-page').style.display = 'none';
  document.getElementById('login-page').style.display = 'flex';

  // reset state
  currentPage = 'dashboard';
  sidebarCollapsed = false;
  if (lineChart) { lineChart.destroy(); lineChart = null; }
  if (donutChart) { donutChart.destroy(); donutChart = null; }
  currentWashBatch = null;

  document.getElementById('sidebar').classList.remove('collapsed');
  document.querySelectorAll('.nav-item, .nav-sub-item').forEach(n => n.classList.remove('active'));
  document.querySelector('.nav-item[data-page="dashboard"]').classList.add('active');
  document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
  document.getElementById('page-dashboard').classList.add('active');
  document.querySelectorAll('.nav-sub').forEach(s => s.classList.remove('open'));
}

// ====== LOGIN ======
function doLogin() {
  const btn = document.getElementById('login-btn');
  btn.innerHTML = '<div class="spinner" style="margin:0 auto;"></div>';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
    initApp();
  }, 800);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('login-page').style.display !== 'none') {
    doLogin();
  }
});

// ====== INIT ======
function initApp() {
  renderDashboardSubtitle();
  renderKPI();
  renderWashTable();
  renderSterilizerCards();
  renderSterilizeBatches();
  renderPackManageTable();
  renderSterilizeCheck();
  renderStorageTable();
  renderStockoutTable();
  renderDamageTable();
  renderReportWashTable();
  renderReportSterilizeTable();
  renderPackLabelTable();
  renderPackCartGrid();
  initCharts();
}

// ====== SIDEBAR ======
function toggleSidebar() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    document.getElementById('sidebar').classList.toggle('mobile-open');
    document.getElementById('sidebar-overlay').classList.toggle('active',
      document.getElementById('sidebar').classList.contains('mobile-open'));
  } else {
    sidebarCollapsed = !sidebarCollapsed;
    document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
  }
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

function toggleSub(el, subId) {
  const sub = document.getElementById(subId);
  const isOpen = sub.classList.contains('open');

  // close all subs
  document.querySelectorAll('.nav-sub').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('open'));

  if (!isOpen) {
    sub.classList.add('open');
    el.classList.add('open');
  }
}

function navTo(el, page) {
  // remove active from all nav items and sub-items
  document.querySelectorAll('.nav-item, .nav-sub-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');

  // hide all pages
  document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // breadcrumb
  const labels = {
    dashboard: '即時資訊', wash: '器械清洗管理',
    'pack-label': '盤包標籤列印', 'pack-manage': '盤包包配管理', 'pack-cart': '備車管理',
    sterilize: '滅菌作業管理', 'sterilize-check': '滅菌後檢驗管理',
    storage: '倉儲管理', stockout: '出庫管理',
    damage: '器械損壞/遺失', 'report-wash': '清洗記錄查詢',
    'report-sterilize': '滅菌記錄查詢', 'instrument-history': '器械歷程查詢'
  };
  document.getElementById('breadcrumb-current').textContent = labels[page] || page;

  currentPage = page;

  if (window.innerWidth <= 768) closeMobileSidebar();

  // re-render charts when switching to dashboard
  if (page === 'dashboard') {
    setTimeout(() => {
      if (lineChart) lineChart.destroy();
      if (donutChart) donutChart.destroy();
      initCharts();
    }, 50);
  }
}

// ====== DASHBOARD SUBTITLE ======
function renderDashboardSubtitle() {
  const now = new Date();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 星期${weekDays[now.getDay()]}`;
  const el = document.getElementById('dashboard-subtitle');
  if (el) el.textContent = `${dateStr} ‧ 供應室管理員 ${DEMO_DATA.user.name}`;
}

// ====== KPI CARDS ======
const KPI_CONFIG = [
  { key: 'wash',      label: '待清洗器械數',  color: '#3B82F6', bg: '#EFF6FF', icon: 'droplets',       page: 'wash' },
  { key: 'package',   label: '待包配盤包數',  color: '#06B6D4', bg: '#ECFEFF', icon: 'package',        page: 'pack-manage' },
  { key: 'sterilizer',label: '待滅菌盤包數',  color: '#F59E0B', bg: '#FFF7ED', icon: 'shield',         page: 'sterilize' },
  { key: 'inspect',   label: '待檢驗批數',    color: '#EF4444', bg: '#FEF2F2', icon: 'flask-conical',   page: 'sterilize-check' },
  { key: 'stockIn',   label: '待入庫盤包數',  color: '#10B981', bg: '#ECFDF5', icon: 'inbox',          page: 'storage' },
  { key: 'expire',    label: '即將過期盤包數', color: '#F59E0B', bg: '#FFFBEB', icon: 'alert-triangle', page: 'storage' },
  { key: 'stockOut',  label: '今日出庫數',    color: '#8B5CF6', bg: '#F5F3FF', icon: 'truck',          page: 'stockout' },
  { key: 'damage',    label: '器械損壞通報',  color: '#DC2626', bg: '#FFF1F2', icon: 'wrench',         page: 'damage' }
];

const ICONS = {
  'droplets': '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.8-4-4-6.5c-.3 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  'package': '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'flask-conical': '<path d="M14 2v6l3 6H7l3-6V2"/><path d="M6 2h12"/>',
  'inbox': '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'truck': '<path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>',
  'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
};

function kpiNavTo(page) {
  const target = document.querySelector(`.nav-item[data-page="${page}"], .nav-sub-item[data-page="${page}"]`);
  if (target) {
    navTo(target, page);
    if (target.classList.contains('nav-sub-item')) {
      const sub = target.closest('.nav-sub');
      if (sub) sub.classList.add('open');
      const parentNav = sub?.previousElementSibling;
      if (parentNav?.classList.contains('nav-item')) parentNav.classList.add('open');
    }
  } else {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    const pg = document.getElementById('page-' + page);
    if (pg) pg.classList.add('active');
  }
}

function renderKPI() {
  const kpi = DEMO_DATA.dashboard.kpi;
  const grid = document.getElementById('kpi-grid');
  grid.innerHTML = KPI_CONFIG.map(c => `
    <div class="kpi-card" style="cursor:pointer;" onclick="kpiNavTo('${c.page}')" title="前往${c.label}">
      <div class="kpi-icon" style="background:${c.bg}; color:${c.color};">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${ICONS[c.icon]}</svg>
      </div>
      <div>
        <div class="kpi-num" style="color:${c.color};">${kpi[c.key]}</div>
        <div class="kpi-label">${c.label}</div>
      </div>
    </div>
  `).join('');
}

// ====== CHARTS ======
function initCharts() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
  script.onload = drawCharts;
  if (window.Chart) {
    drawCharts();
  } else {
    document.head.appendChild(script);
  }
}

function drawCharts() {
  const data = DEMO_DATA.dashboard.chart_monthly;
  const labels = data.map(d => `${d.day}日`);

  // Line chart
  const lineCtx = document.getElementById('chart-line');
  if (!lineCtx) return;
  if (lineChart) lineChart.destroy();

  Chart.defaults.font.family = "'Noto Sans TC', sans-serif";

  lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: '清洗量', data: data.map(d => d.wash), borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.08)', tension: 0.4, pointRadius: 2, borderWidth: 2, fill: true },
        { label: '滅菌量', data: data.map(d => d.sterilize), borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.05)', tension: 0.4, pointRadius: 2, borderWidth: 2, fill: true },
        { label: '出庫量', data: data.map(d => d.stockOut), borderColor: '#8B5CF6', backgroundColor: 'rgba(139,92,246,0.05)', tension: 0.4, pointRadius: 2, borderWidth: 2, fill: true }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94A3B8', maxTicksLimit: 10 } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#94A3B8' }, beginAtZero: true }
      }
    }
  });

  // Donut chart
  const donutCtx = document.getElementById('chart-donut');
  if (!donutCtx) return;
  if (donutChart) donutChart.destroy();

  const dist = DEMO_DATA.dashboard.chart_distribution;
  donutChart = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: dist.map(d => d.label),
      datasets: [{
        data: dist.map(d => d.value),
        backgroundColor: dist.map(d => d.color),
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` }
        }
      }
    }
  });

  // Legends
  const legends = document.getElementById('donut-legends');
  if (legends) {
    legends.innerHTML = dist.map(d => `
      <div class="donut-legend-item">
        <div class="donut-legend-left">
          <div style="width:10px;height:10px;border-radius:50%;background:${d.color};flex-shrink:0;"></div>
          <span style="font-size:12px;color:var(--text-secondary);">${d.label}</span>
        </div>
        <div class="donut-legend-bar-bg" style="flex:1;height:4px;background:var(--border);border-radius:99px;margin:0 12px;">
          <div class="donut-legend-bar" style="height:100%;border-radius:99px;width:${d.value}%;background:${d.color};"></div>
        </div>
        <span class="donut-legend-pct">${d.value}%</span>
      </div>
    `).join('');
  }
}

// ====== WASH TABLE ======
function statusBadge(s) {
  if (s === '待清洗') return `<span class="badge badge-orange">待清洗</span>`;
  if (s === '清洗中') return `<span class="badge badge-blue">清洗中</span>`;
  if (s === '已完成') return `<span class="badge badge-green">已完成</span>`;
  return `<span class="badge badge-gray">${s}</span>`;
}

function renderWashTable() {
  const keyword = (document.getElementById('wash-search')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('wash-status')?.value || '';

  let rows = DEMO_DATA.wash;
  if (keyword) rows = rows.filter(r => r.id.toLowerCase().includes(keyword) || r.type.includes(keyword));
  if (statusFilter) rows = rows.filter(r => r.status === statusFilter);

  const tbody = document.getElementById('wash-tbody');
  if (!tbody) return;

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td><span style="font-family:monospace;font-weight:600;color:var(--brand);">${r.id}</span></td>
      <td>${r.time}</td>
      <td>${r.type}</td>
      <td><span style="font-weight:600;">${r.count}</span> 件</td>
      <td>${r.machine}</td>
      <td>${r.operator}</td>
      <td>${statusBadge(r.status)}</td>
      <td><button class="btn btn-outline btn-sm" onclick="openWashModal('${r.id}')">查看詳情</button></td>
    </tr>
  `).join('');
}

function searchWithLoading(btn) {
  if (!btn) btn = document.querySelector('#page-wash .btn-primary');
  const orig = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 搜尋中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.classList.remove('btn-loading');
    renderWashTable();
  }, 500);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement?.id === 'wash-search') {
    searchWithLoading();
  }
});

// ====== WASH MODAL ======
function openWashModal(id) {
  const batch = DEMO_DATA.wash.find(r => r.id === id);
  if (!batch) return;
  currentWashBatch = batch;

  document.getElementById('modal-batch-id').textContent = batch.id;
  document.getElementById('modal-info').innerHTML = `
    <div class="info-item"><div class="info-label">批次編號</div><div class="info-value">${batch.id}</div></div>
    <div class="info-item"><div class="info-label">送洗時間</div><div class="info-value">${batch.time}</div></div>
    <div class="info-item"><div class="info-label">操作人員</div><div class="info-value">${batch.operator}</div></div>
    <div class="info-item"><div class="info-label">清洗機台</div><div class="info-value">${batch.machine}</div></div>
    <div class="info-item"><div class="info-label">器械種類</div><div class="info-value">${batch.type}</div></div>
    <div class="info-item"><div class="info-label">器械數量</div><div class="info-value">${batch.count} 件</div></div>
  `;

  document.getElementById('modal-instruments').innerHTML = batch.instruments.map(inst => `
    <tr>
      <td>${inst.name}</td>
      <td><span style="font-family:monospace;font-size:12px;color:var(--text-secondary);">${inst.barcode}</span></td>
      <td>${statusBadge(inst.status)}</td>
    </tr>
  `).join('');

  const btn = document.getElementById('confirm-wash-btn');
  const doneTag = document.getElementById('modal-done-tag');
  if (batch.status === '已完成') {
    btn.style.display = 'none';
    if (doneTag) doneTag.style.display = 'inline-flex';
  } else {
    btn.style.display = 'inline-flex';
    if (doneTag) doneTag.style.display = 'none';
  }

  document.getElementById('wash-modal').classList.add('active');
}

function closeWashModal(e) {
  if (e.target === document.getElementById('wash-modal')) {
    document.getElementById('wash-modal').classList.remove('active');
  }
}

function confirmWash() {
  if (!currentWashBatch) return;
  currentWashBatch.status = '已完成';
  currentWashBatch.instruments.forEach(i => i.status = '已完成');

  document.getElementById('wash-modal').classList.remove('active');
  renderWashTable();
  showToast('已確認完成清洗：' + currentWashBatch.id);
  DEMO_DATA.dashboard.kpi.wash = Math.max(0, DEMO_DATA.dashboard.kpi.wash - 1);
  DEMO_DATA.dashboard.kpi.package += 1;
  renderKPI();
}

// ====== STERILIZER ======
function renderSterilizerCards() {
  const cards = document.getElementById('sterilizer-cards');
  if (!cards) return;

  cards.innerHTML = DEMO_DATA.sterilizers.map(s => {
    let statusBadgeHtml = '';
    let statusColor = '';
    if (s.status === '運作中') { statusBadgeHtml = `<span class="badge badge-blue">運作中</span>`; statusColor = '#3B82F6'; }
    else if (s.status === '閒置中') { statusBadgeHtml = `<span class="badge badge-gray">閒置中</span>`; statusColor = '#94A3B8'; }
    else if (s.status === '待檢驗') { statusBadgeHtml = `<span class="badge badge-orange">待檢驗</span>`; statusColor = '#F59E0B'; }

    return `
      <div class="sterilizer-card" style="border-top:3px solid ${statusColor};">
        <div class="sterilizer-card-header">
          <div class="sterilizer-name">${s.name}</div>
          ${statusBadgeHtml}
        </div>
        <div class="sterilizer-stats">
          <div class="sterilizer-stat">
            <div class="sterilizer-stat-label">溫度</div>
            <div class="sterilizer-stat-value" style="font-size:14px;">${s.temp}</div>
          </div>
          <div class="sterilizer-stat">
            <div class="sterilizer-stat-label">壓力</div>
            <div class="sterilizer-stat-value" style="font-size:14px;">${s.pressure}</div>
          </div>
          <div class="sterilizer-stat">
            <div class="sterilizer-stat-label">今日次數</div>
            <div class="sterilizer-stat-value">${s.todayCount}</div>
          </div>
          <div class="sterilizer-stat">
            <div class="sterilizer-stat-label">預計完成</div>
            <div class="sterilizer-stat-value" style="font-size:13px;">${s.eta}</div>
          </div>
        </div>
        ${s.status === '運作中'
          ? `<button class="btn btn-primary" style="width:100%;" onclick="showToast('滅菌鍋 #${s.id} 運作中，預計 ${s.eta} 完成')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>運作中 — ${s.eta}完成</button>`
          : s.status === '待檢驗'
          ? `<button class="btn btn-success" style="width:100%;" onclick="showToast('已送出檢驗確認，請等待結果')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5m4 0h10"/></svg>進行滅菌後檢驗</button>`
          : `<button class="btn btn-primary" style="width:100%;" onclick="startSterilize(${s.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>開始滅菌</button>`
        }
      </div>
    `;
  }).join('');
}

function startSterilize(id) {
  showToast(`已啟動滅菌鍋 #${id} 滅菌程序`);
}

function renderSterilizeBatches() {
  const tbody = document.getElementById('sterilize-tbody');
  if (!tbody) return;

  tbody.innerHTML = DEMO_DATA.sterilizeBatches.map(b => {
    let badge = '';
    if (b.status === '通過') badge = `<span class="badge badge-green">通過</span>`;
    else if (b.status === '進行中') badge = `<span class="badge badge-blue">進行中</span>`;
    else if (b.status === '待檢驗') badge = `<span class="badge badge-orange">待檢驗</span>`;
    else badge = `<span class="badge badge-gray">${b.status}</span>`;

    return `
      <tr>
        <td><span style="font-family:monospace;font-weight:600;color:var(--brand);font-size:12px;">${b.id}</span></td>
        <td>${b.machine}</td>
        <td><span style="font-weight:600;">${b.packageCount}</span> 包</td>
        <td>${b.startTime}</td>
        <td>${b.endTime}</td>
        <td>${badge}</td>
        <td><button class="btn btn-outline btn-sm" onclick="showToast('報告產生中...')">查看報告</button></td>
      </tr>
    `;
  }).join('');
}

// ====== HISTORY ======
const TIMELINE_COLORS = {
  wash: '#3B82F6', wash_done: '#10B981', package: '#8B5CF6',
  sterilize: '#F59E0B', inspect: '#10B981', stock_in: '#06B6D4',
  stock_out: '#8B5CF6', surgery: '#EF4444'
};

const TIMELINE_ICONS_SVG = {
  'droplets': '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.8-4-4-6.5c-.3 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'package': '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>',
  'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'inbox': '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  'truck': '<path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>',
  'activity': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'
};

function queryHistory() {
  const btn = document.getElementById('history-btn');
  const barcode = document.getElementById('instrument-barcode').value;

  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 查詢中';
  btn.classList.add('btn-loading');

  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');

    document.getElementById('history-empty').style.display = 'none';
    document.getElementById('history-result').style.display = 'block';

    if (barcode) {
      document.getElementById('hist-instrument-barcode').textContent = '條碼：' + barcode;
    }

    const timeline = document.getElementById('timeline-wrap');
    timeline.innerHTML = DEMO_DATA.instrumentHistory.map((item, idx) => {
      const color = TIMELINE_COLORS[item.type] || '#64748B';
      const iconSvg = TIMELINE_ICONS_SVG[item.icon] || '';
      const isLast = idx === DEMO_DATA.instrumentHistory.length - 1;

      return `
        <div class="timeline-item">
          <div class="timeline-left">
            <div class="timeline-dot" style="background:${color}1A; color:${color};">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconSvg}</svg>
            </div>
            ${!isLast ? '<div class="timeline-line"></div>' : ''}
          </div>
          <div class="timeline-content">
            <div class="timeline-time">${item.time}</div>
            <div class="timeline-event" style="color:${color};">${item.event}</div>
            <div class="timeline-desc">${item.desc}</div>
          </div>
        </div>
      `;
    }).join('');
  }, 600);
}

// ====== TOAST ======
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span class="toast-msg">${msg}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ====== PACK MANAGE ======
let currentPackBatch = null;

function renderPackManageTable() {
  const keyword = (document.getElementById('pack-search')?.value || '').trim().toLowerCase();
  const status = document.getElementById('pack-status')?.value || '';
  const tbody = document.getElementById('pack-manage-tbody');
  if (!tbody) return;

  const data = DEMO_DATA.packManage.filter(p => {
    const matchKw = !keyword || p.name.toLowerCase().includes(keyword) || p.barcode.toLowerCase().includes(keyword);
    const matchSt = !status || p.status === status;
    return matchKw && matchSt;
  });

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text-secondary);padding:32px">查無符合條件的盤包記錄</td></tr>';
    return;
  }

  const statusMap = { '待包配': 'badge-orange', '包配中': 'badge-blue', '已完成': 'badge-green' };
  tbody.innerHTML = data.map(p => {
    const checked = p.instruments.filter(i => i.checked).length;
    const total = p.instruments.length;
    const progress = Math.round(checked / total * 100);
    return `
      <tr>
        <td style="font-family:monospace;font-size:12px">${p.barcode}</td>
        <td style="font-weight:500">${p.name}</td>
        <td>${p.type}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <span>${p.instrumentCount} 件</span>
            ${p.status !== '待包配' ? `<div style="flex:1;height:4px;background:var(--border);border-radius:2px;min-width:60px"><div style="width:${progress}%;height:100%;background:var(--accent);border-radius:2px"></div></div><span style="font-size:11px;color:var(--text-secondary)">${checked}/${total}</span>` : ''}
          </div>
        </td>
        <td>${p.operator}</td>
        <td>${p.startTime}</td>
        <td><span class="badge ${statusMap[p.status] || 'badge-gray'}">${p.status}</span></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="openPackModal('${p.id}')">查看詳情</button>
          ${p.status !== '已完成' ? `<button class="btn btn-primary btn-sm" style="margin-left:6px" onclick="openPackModal('${p.id}')">繼續包配</button>` : ''}
        </td>
      </tr>`;
  }).join('');
}

function searchPackWithLoading(btn) {
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 搜尋中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    renderPackManageTable();
  }, 500);
}

function openPackModal(id) {
  const pack = DEMO_DATA.packManage.find(p => p.id === id);
  if (!pack) return;
  currentPackBatch = pack;

  document.getElementById('pack-modal-title').textContent = pack.name;

  const statusMap = { '待包配': 'badge-orange', '包配中': 'badge-blue', '已完成': 'badge-green' };
  document.getElementById('pack-modal-info').innerHTML = `
    <div style="flex:1">
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">盤包條碼</div>
      <div style="font-size:13px;font-weight:500;font-family:monospace">${pack.barcode}</div>
    </div>
    <div style="flex:1">
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">操作人員</div>
      <div style="font-size:13px;font-weight:500">${pack.operator}</div>
    </div>
    <div style="flex:1">
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">器械總數</div>
      <div style="font-size:13px;font-weight:500">${pack.instrumentCount} 件</div>
    </div>
    <div>
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">狀態</div>
      <span class="badge ${statusMap[pack.status] || 'badge-gray'}">${pack.status}</span>
    </div>`;

  document.getElementById('pack-modal-instruments').innerHTML = pack.instruments.map(inst => `
    <tr>
      <td style="font-weight:500">${inst.name}</td>
      <td style="font-family:monospace;font-size:12px">${inst.barcode}</td>
      <td><span class="badge ${inst.checked ? 'badge-green' : 'badge-orange'}">${inst.checked ? '已清點' : '待清點'}</span></td>
    </tr>`).join('');

  const doneTag = document.getElementById('pack-modal-done-tag');
  const confirmBtn = document.getElementById('pack-confirm-btn');
  if (pack.status === '已完成') {
    doneTag.innerHTML = '<span class="badge badge-green" style="font-size:13px;padding:6px 14px">✓ 已完成包配</span>';
    confirmBtn.style.display = 'none';
  } else {
    doneTag.innerHTML = '';
    confirmBtn.style.display = '';
  }

  document.getElementById('pack-detail-modal').classList.add('active');
}

function closePackModal(event) {
  if (event.target === document.getElementById('pack-detail-modal')) {
    document.getElementById('pack-detail-modal').classList.remove('active');
  }
}

function confirmPack() {
  if (!currentPackBatch) return;
  currentPackBatch.status = '已完成';
  currentPackBatch.instruments.forEach(i => i.checked = true);
  DEMO_DATA.dashboard.kpi.package = Math.max(0, DEMO_DATA.dashboard.kpi.package - 1);
  DEMO_DATA.dashboard.kpi.sterilizer += 1;
  document.getElementById('pack-detail-modal').classList.remove('active');
  showToast('盤包包配完成，已進入待滅菌佇列');
  renderPackManageTable();
  renderKPI();
}

// ====== STERILIZE CHECK ======
function renderSterilizeCheck() {
  const status = document.getElementById('check-status')?.value || '';
  const machine = document.getElementById('check-machine')?.value || '';
  const tbody = document.getElementById('sterilize-check-tbody');
  if (!tbody) return;

  const data = DEMO_DATA.sterilizeCheck.filter(r => {
    const matchSt = !status || r.status === status;
    const matchMc = !machine || r.machine === machine;
    return matchSt && matchMc;
  });

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--text-secondary);padding:32px">查無符合條件的檢驗記錄</td></tr>';
    return;
  }

  const statusMap = { '通過': 'badge-green', '待檢驗': 'badge-orange', '不合格': 'badge-red', '進行中': 'badge-blue' };
  const indicatorBadge = v => {
    if (v === '合格') return '<span class="badge badge-green">合格</span>';
    if (v === '不合格') return '<span class="badge badge-red">不合格</span>';
    if (v === '待判讀') return '<span class="badge badge-orange">待判讀</span>';
    return `<span style="color:var(--text-secondary)">${v}</span>`;
  };

  tbody.innerHTML = data.map(r => `
    <tr>
      <td style="font-family:monospace;font-size:12px">${r.batchId}</td>
      <td>${r.machine}</td>
      <td style="text-align:center">${r.packageCount}</td>
      <td>${r.endTime}</td>
      <td>${r.inspector}</td>
      <td style="text-align:center">${indicatorBadge(r.chemIndicator)}</td>
      <td style="text-align:center">${indicatorBadge(r.bioIndicator)}</td>
      <td><span class="badge ${statusMap[r.status] || 'badge-gray'}">${r.status}</span></td>
      <td>
        ${r.status === '待檢驗' ? `<button class="btn btn-primary btn-sm" onclick="confirmSterilizeCheck('${r.id}')">登錄檢驗結果</button>` : ''}
        ${r.status === '不合格' ? `<button class="btn btn-sm" style="background:#FEF2F2;color:var(--danger);border:1px solid #FECACA">查看異常處置</button>` : ''}
        ${r.status === '通過' ? `<button class="btn btn-outline btn-sm">查看報告</button>` : ''}
        ${r.status === '進行中' ? `<span style="color:var(--text-secondary);font-size:12px">滅菌進行中</span>` : ''}
      </td>
    </tr>`).join('');
}

function searchCheckWithLoading(btn) {
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 篩選中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    renderSterilizeCheck();
  }, 500);
}

function confirmSterilizeCheck(id) {
  const record = DEMO_DATA.sterilizeCheck.find(r => r.id === id);
  if (!record) return;
  record.chemIndicator = '合格';
  record.bioIndicator = '合格';
  record.status = '通過';
  record.inspector = DEMO_DATA.user.name;
  DEMO_DATA.dashboard.kpi.inspect = Math.max(0, DEMO_DATA.dashboard.kpi.inspect - 1);
  DEMO_DATA.dashboard.kpi.stockIn += 1;
  renderSterilizeCheck();
  renderKPI();
  showToast('滅菌後檢驗結果已登錄，批次通過，已進入待入庫佇列');
}

// ====== STORAGE ======
function renderStorageTable() {
  const keyword = (document.getElementById('storage-search')?.value || '').trim().toLowerCase();
  const filter = document.getElementById('storage-filter')?.value || '';
  const tbody = document.getElementById('storage-tbody');
  if (!tbody) return;

  const data = DEMO_DATA.storage.filter(s => {
    const matchKw = !keyword || s.name.toLowerCase().includes(keyword) || s.barcode.toLowerCase().includes(keyword);
    const matchFilter = !filter ||
      (filter === 'near' && s.nearExpire && !s.expired) ||
      (filter === 'expired' && s.expired) ||
      (filter === 'normal' && !s.nearExpire && !s.expired);
    return matchKw && matchFilter;
  });

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text-secondary);padding:32px">查無符合條件的庫存記錄</td></tr>';
    return;
  }

  tbody.innerHTML = data.map(s => {
    const expireTag = s.expired
      ? '<span class="badge badge-red">已過期</span>'
      : s.nearExpire
        ? '<span class="badge badge-orange">即將到期</span>'
        : '<span class="badge badge-green">正常</span>';
    return `
      <tr>
        <td style="font-family:monospace;font-size:12px">${s.barcode}</td>
        <td style="font-weight:500">${s.name}</td>
        <td><span style="background:var(--accent-light);color:var(--accent);padding:2px 8px;border-radius:4px;font-size:12px">${s.location}</span></td>
        <td style="text-align:center;font-weight:600">${s.qty}</td>
        <td>${s.sterileMethod}</td>
        <td style="${s.expired ? 'color:var(--danger);font-weight:500' : s.nearExpire ? 'color:var(--warning);font-weight:500' : ''}">${s.expireDate}</td>
        <td>${expireTag}</td>
        <td>
          <button class="btn btn-outline btn-sm">出庫</button>
          ${s.expired ? `<button class="btn btn-sm" style="margin-left:6px;background:#FEF2F2;color:var(--danger);border:1px solid #FECACA">申請報廢</button>` : ''}
        </td>
      </tr>`;
  }).join('');
}

function searchStorageWithLoading(btn) {
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 搜尋中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    renderStorageTable();
  }, 500);
}

// ====== STOCKOUT ======
function renderStockoutTable() {
  const status = document.getElementById('stockout-status')?.value || '';
  const tbody = document.getElementById('stockout-tbody');
  if (!tbody) return;

  const data = DEMO_DATA.stockout.filter(o => !status || o.status === status);

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--text-secondary);padding:32px">查無符合條件的出庫記錄</td></tr>';
    return;
  }

  const statusMap = { '撥補中': 'badge-orange', '撥補完成': 'badge-green', '轉移完成': 'badge-blue' };
  tbody.innerHTML = data.map(o => {
    let actionBtn = '';
    if (o.status === '撥補中') actionBtn = `<button class="btn btn-primary btn-sm" onclick="confirmStockout('${o.id}')">確認送達</button>`;
    else if (o.status === '撥補完成') actionBtn = `<button class="btn btn-outline btn-sm">查看撥補結果</button>`;
    else actionBtn = `<button class="btn btn-outline btn-sm">查看轉移結果</button>`;
    return `
      <tr>
        <td style="font-family:monospace;font-size:12px">${o.id}</td>
        <td style="font-weight:500">${o.name}</td>
        <td>${o.dest}</td>
        <td>${o.requester}</td>
        <td>${o.requestTime}</td>
        <td>${o.outTime}</td>
        <td>${o.receiver}</td>
        <td><span class="badge ${statusMap[o.status] || 'badge-gray'}">${o.status}</span></td>
        <td>${actionBtn}</td>
      </tr>`;
  }).join('');
}

function searchStockoutWithLoading(btn) {
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 篩選中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    renderStockoutTable();
  }, 500);
}

function confirmStockout(id) {
  const item = DEMO_DATA.stockout.find(o => o.id === id);
  if (!item) return;
  item.status = '撥補完成';
  item.outTime = new Date().toLocaleString('zh-TW', { hour12: false }).replace(/\//g, '/').slice(0, 16);
  item.receiver = DEMO_DATA.user.name;
  DEMO_DATA.dashboard.kpi.stockOut += 1;
  renderStockoutTable();
  renderKPI();
  showToast('出庫確認完成，盤包已送達目的地');
}

// ====== DAMAGE ======
function renderDamageTable() {
  const type = document.getElementById('damage-type')?.value || '';
  const status = document.getElementById('damage-status')?.value || '';
  const tbody = document.getElementById('damage-tbody');
  if (!tbody) return;

  const data = DEMO_DATA.damage.filter(d => {
    return (!type || d.type === type) && (!status || d.status === status);
  });

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--text-secondary);padding:32px">查無符合條件的通報記錄</td></tr>';
    return;
  }

  const statusMap = { '待審核': 'badge-orange', '報修中': 'badge-blue', '調查中': 'badge-purple', '維修完成': 'badge-green', '已報廢': 'badge-gray' };
  const typeMap = { '損壞': 'badge-orange', '遺失': 'badge-red' };
  tbody.innerHTML = data.map(d => `
    <tr>
      <td style="font-family:monospace;font-size:12px">${d.id}</td>
      <td style="font-weight:500">${d.instrumentName}</td>
      <td style="font-family:monospace;font-size:12px">${d.barcode}</td>
      <td><span class="badge ${typeMap[d.type] || 'badge-gray'}">${d.type}</span></td>
      <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${d.desc}">${d.desc}</td>
      <td>${d.reporter}</td>
      <td>${d.reportTime}</td>
      <td><span class="badge ${statusMap[d.status] || 'badge-gray'}">${d.status}</span></td>
      <td>
        ${d.status === '待審核' ? `<button class="btn btn-primary btn-sm" onclick="approveDamage('${d.id}')">審核通過</button>` : ''}
        ${d.status === '報修中' ? `<button class="btn btn-outline btn-sm">查看報修進度</button>` : ''}
        ${d.status === '調查中' ? `<button class="btn btn-outline btn-sm">查看調查結果</button>` : ''}
      </td>
    </tr>`).join('');
}

function searchDamageWithLoading(btn) {
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 篩選中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    renderDamageTable();
  }, 500);
}

function approveDamage(id) {
  const item = DEMO_DATA.damage.find(d => d.id === id);
  if (!item) return;
  item.status = item.type === '遺失' ? '調查中' : '報修中';
  DEMO_DATA.dashboard.kpi.damage = Math.max(0, DEMO_DATA.dashboard.kpi.damage - 1);
  renderDamageTable();
  renderKPI();
  showToast('審核完成，已移交' + (item.type === '遺失' ? '調查' : '報修') + '作業');
}

// ====== REPORT WASH ======
function renderReportWashTable() {
  const keyword = (document.getElementById('report-wash-search')?.value || '').trim().toLowerCase();
  const status = document.getElementById('report-wash-status')?.value || '';
  const tbody = document.getElementById('report-wash-tbody');
  if (!tbody) return;

  const data = DEMO_DATA.reportWash.filter(r => {
    const matchKw = !keyword || r.type.toLowerCase().includes(keyword) || r.id.toLowerCase().includes(keyword);
    const matchSt = !status || r.status === status;
    return matchKw && matchSt;
  });

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;color:var(--text-secondary);padding:32px">查無符合條件的清洗記錄</td></tr>';
    return;
  }

  const atpBadge = v => v === '合格' ? '<span class="badge badge-green">合格</span>' : '<span class="badge badge-red">不合格</span>';
  const statusMap = { '已完成': 'badge-green', '異常': 'badge-red' };
  tbody.innerHTML = data.map(r => `
    <tr>
      <td style="font-family:monospace;font-size:12px">${r.id}</td>
      <td>${r.time}</td>
      <td>${r.type}</td>
      <td style="text-align:center">${r.count}</td>
      <td>${r.machine}</td>
      <td>${r.operator}</td>
      <td>${r.temp}</td>
      <td>${r.duration}</td>
      <td style="text-align:center">${atpBadge(r.atpResult)}</td>
      <td><span class="badge ${statusMap[r.status] || 'badge-gray'}">${r.status}</span></td>
    </tr>`).join('');
}

function searchReportWashWithLoading(btn) {
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 查詢中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    renderReportWashTable();
  }, 600);
}

// ====== REPORT STERILIZE ======
function renderReportSterilizeTable() {
  const machine = document.getElementById('report-sterilize-machine')?.value || '';
  const status = document.getElementById('report-sterilize-status')?.value || '';
  const tbody = document.getElementById('report-sterilize-tbody');
  if (!tbody) return;

  const data = DEMO_DATA.reportSterilize.filter(r => {
    return (!machine || r.machine === machine) && (!status || r.status === status);
  });

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="13" style="text-align:center;color:var(--text-secondary);padding:32px">查無符合條件的滅菌記錄</td></tr>';
    return;
  }

  const indicatorBadge = v => {
    if (v === '合格') return '<span class="badge badge-green">合格</span>';
    if (v === '不合格') return '<span class="badge badge-red">不合格</span>';
    if (v === '待判讀') return '<span class="badge badge-orange">待判讀</span>';
    return v;
  };
  const statusMap = { '通過': 'badge-green', '待檢驗': 'badge-orange', '不合格': 'badge-red' };
  tbody.innerHTML = data.map(r => `
    <tr>
      <td style="font-family:monospace;font-size:12px">${r.id}</td>
      <td>${r.machine}</td>
      <td>${r.method}</td>
      <td>${r.temp}</td>
      <td>${r.pressure}</td>
      <td>${r.duration}</td>
      <td style="text-align:center">${r.packageCount}</td>
      <td>${r.startTime}</td>
      <td>${r.endTime}</td>
      <td>${r.operator}</td>
      <td style="text-align:center">${indicatorBadge(r.chemIndicator)}</td>
      <td style="text-align:center">${indicatorBadge(r.bioIndicator)}</td>
      <td><span class="badge ${statusMap[r.status] || 'badge-gray'}">${r.status}</span></td>
    </tr>`).join('');
}

function searchReportSterilizeWithLoading(btn) {
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 查詢中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    renderReportSterilizeTable();
  }, 600);
}

function exportToast() {
  showToast('Excel 報表已產生，正在下載...', 'success');
}

// ====== PACK LABEL ======
function renderPackLabelTable() {
  const tbody = document.getElementById('pack-label-tbody');
  if (!tbody) return;
  const statusMap = { '已列印': 'badge-green', '待列印': 'badge-orange' };
  tbody.innerHTML = DEMO_DATA.packLabel.map(l => `
    <tr>
      <td style="font-family:monospace;font-size:12px">${l.barcode}</td>
      <td style="font-weight:500">${l.name}</td>
      <td>${l.type}</td>
      <td style="text-align:center">${l.printQty}</td>
      <td>${l.printer}</td>
      <td>${l.operator}</td>
      <td>${l.printTime}</td>
      <td><span class="badge ${statusMap[l.status] || 'badge-gray'}">${l.status}</span></td>
      <td>
        ${l.status === '待列印'
          ? `<button class="btn btn-primary btn-sm" onclick="printLabel('${l.id}')">列印標籤</button>`
          : `<button class="btn btn-outline btn-sm" onclick="printLabel('${l.id}')">重新列印</button>`}
      </td>
    </tr>`).join('');
}

function printLabel(id) {
  const item = DEMO_DATA.packLabel.find(l => l.id === id);
  if (!item) return;
  item.status = '已列印';
  item.printTime = new Date().toLocaleString('zh-TW', { hour12: false }).slice(0, 16);
  item.operator = DEMO_DATA.user.name;
  renderPackLabelTable();
  showToast(`標籤列印完成：${item.name} × ${item.printQty} 張`);
}

function printSelectedLabels(btn) {
  const pending = DEMO_DATA.packLabel.filter(l => l.status === '待列印');
  if (!pending.length) { showToast('目前沒有待列印的標籤', 'success'); return; }
  const origInner = btn.innerHTML;
  btn.innerHTML = '<div class="spinner"></div> 列印中';
  btn.classList.add('btn-loading');
  setTimeout(() => {
    btn.innerHTML = origInner;
    btn.classList.remove('btn-loading');
    const now = new Date().toLocaleString('zh-TW', { hour12: false }).slice(0, 16);
    pending.forEach(l => { l.status = '已列印'; l.printTime = now; l.operator = DEMO_DATA.user.name; });
    renderPackLabelTable();
    showToast(`已列印 ${pending.length} 筆待列印標籤`);
  }, 800);
}

// ====== PACK CART ======
function renderPackCartGrid() {
  const grid = document.getElementById('pack-cart-grid');
  if (!grid) return;
  const statusConfig = {
    '已就緒': { cls: 'badge-green', dot: '#10B981' },
    '備車中': { cls: 'badge-orange', dot: '#F59E0B' },
    '未備車': { cls: 'badge-gray', dot: '#94A3B8' }
  };
  grid.innerHTML = DEMO_DATA.packCart.map(c => {
    const cfg = statusConfig[c.status] || { cls: 'badge-gray', dot: '#94A3B8' };
    return `
      <div class="card" style="padding:0;overflow:hidden">
        <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
          <div style="font-weight:600;font-size:14px">${c.name}</div>
          <span class="badge ${cfg.cls}">${c.status}</span>
        </div>
        <div style="padding:16px 20px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
            <div><div style="font-size:11px;color:var(--text-secondary);margin-bottom:2px">手術室</div><div style="font-size:13px;font-weight:500">${c.assignedOR}</div></div>
            <div><div style="font-size:11px;color:var(--text-secondary);margin-bottom:2px">手術時間</div><div style="font-size:13px;font-weight:500">${c.surgeryTime.slice(11)}</div></div>
            <div><div style="font-size:11px;color:var(--text-secondary);margin-bottom:2px">盤包數量</div><div style="font-size:13px;font-weight:500">${c.packageCount} 包</div></div>
            <div><div style="font-size:11px;color:var(--text-secondary);margin-bottom:2px">器械數量</div><div style="font-size:13px;font-weight:500">${c.instrumentCount} 件</div></div>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;background:var(--bg);padding:8px 10px;border-radius:6px">
            <span style="font-weight:500;color:var(--text)">手術術式：</span>${c.surgery}
          </div>
          <div style="display:flex;gap:8px">
            ${c.status === '未備車' ? `<button class="btn btn-primary btn-sm" style="flex:1" onclick="startCart('${c.id}')">開始備車</button>` : ''}
            ${c.status === '備車中' ? `<button class="btn btn-success btn-sm" style="flex:1" onclick="completeCart('${c.id}')">確認備車完成</button>` : ''}
            ${c.status === '已就緒' ? `<button class="btn btn-outline btn-sm" style="flex:1">查看備車清單</button>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');
}

function startCart(id) {
  const cart = DEMO_DATA.packCart.find(c => c.id === id);
  if (!cart) return;
  cart.status = '備車中';
  cart.preparedBy = DEMO_DATA.user.name;
  renderPackCartGrid();
  showToast(`${cart.name} 開始備車`);
}

function completeCart(id) {
  const cart = DEMO_DATA.packCart.find(c => c.id === id);
  if (!cart) return;
  cart.status = '已就緒';
  cart.prepareTime = new Date().toLocaleString('zh-TW', { hour12: false }).slice(0, 16);
  renderPackCartGrid();
  showToast(`${cart.name} 備車完成，已就緒`);
}

// Load Chart.js on startup
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
document.head.appendChild(chartScript);
