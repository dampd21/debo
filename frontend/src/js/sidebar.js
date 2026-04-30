/* ================================================================
   Sherpain21 — sidebar.js (v2.1.1 + Developer Tools)
   ================================================================ */

// ── 카테고리 정의 (완전판, 생략 없음) ──
var SIDEBAR_CATEGORIES = [
  {
    id: 'naver',
    title: '네이버',
    icon: 'fa-solid fa-n',
    items: [
      {
        id: 'place', name: '플레이스', icon: 'fa-solid fa-map-marker-alt',
        items: [
          { id: 'place-rank', name: '플레이스 순위 조회', url: '/app/place/rank.html' },
          { id: 'place-seo', name: '플레이스 SEO 분석', url: '/app/place/seo.html' },
          { id: 'place-logic', name: '플레이스 리뷰 로직분석', url: '/app/place/logic.html' }
        ]
      },
      {
        id: 'blog', name: '블로그/카페', icon: 'fa-solid fa-blog',
        items: [
          { id: 'blog-index', name: '블로그 지수 분석', url: '/app/blog/index.html' },
          { id: 'blog-rank', name: '키워드별 블로그 순위 분석', url: '/app/blog/rank.html' },
          { id: 'blog-post', name: '블로그 자동 포스팅', url: '/app/blog/post.html' },
          { id: 'blog-url', name: '블로그 상위노출 URL 생성기', url: '/app/blog/url.html' }
        ]
      },
      {
        id: 'review', name: '리뷰', icon: 'fa-solid fa-star',
        items: [
          { id: 'review-seo', name: '플레이스 리뷰 SEO분석', url: '/app/review/seo.html' },
          { id: 'review-qr', name: '영수증 리뷰 QR코드', url: '/app/review/qr.html' }
        ]
      }
    ]
  },
  {
    id: 'platform', title: '기타 플랫폼', icon: 'fa-solid fa-th-large',
    items: [
      { id: 'daangn', name: '당근', url: '/app/platform/daangn.html', badge: '개발예정' },
      { id: 'google', name: '구글', url: '/app/platform/google.html', badge: '개발예정' },
      { id: 'kakao', name: '카카오', url: '/app/platform/kakao.html', badge: '개발예정' }
    ]
  },
  {
    id: 'keyword', title: '키워드', icon: 'fa-solid fa-key',
    items: [
      { id: 'keyword-volume', name: '키워드 검색량/조합', url: '/app/keyword/volume.html' },
      { id: 'keyword-trend', name: '트렌드 키워드', url: '/app/keyword/trend.html' },
      { id: 'keyword-map', name: '키워드 마인드맵', url: '/app/keyword/map.html' }
    ]
  },
  {
    id: 'ad', title: '광고', icon: 'fa-solid fa-bullhorn',
    items: [
      { id: 'ad-fraud', name: '광고 부정클릭 관리', url: '/app/ad/fraud.html' },
      { id: 'ad-cpc', name: 'CPC 순위별 단가 추적', url: '/app/ad/cpc.html' },
      { id: 'ad-optimize', name: '네이버 검색 광고 최적화', url: '/app/ad/time.html' },
      { id: 'ad-ai', name: '플랫폼 광고 소재 생성기', url: '/app/ad/ai.html' },
      { id: 'ad-campaign', name: 'CPC 캠페인 생성 자동화', url: '/app/ad/campaign.html' }
    ]
  },
  {
    id: 'review-manage', title: '리뷰 종합관리', icon: 'fa-solid fa-star-half-alt',
    items: [
      { id: 'review-block', name: '리뷰 블라인드/차단/삭제', url: '/app/review-manage/block.html' },
      { id: 'review-sync', name: '플랫폼 리뷰 연동', url: '/app/review-manage/sync.html' },
      { id: 'review-sns', name: '리뷰 SNS 자동업로드', url: '/app/review-manage/sns.html' }
    ]
  },
  {
    id: 'data', title: '데이터 운영 관리', icon: 'fa-solid fa-database',
    items: [
      { id: 'data-biz', name: '소상공인 데이터 수집', url: '/app/data/biz.html' },
      { id: 'data-realestate', name: '부동산 데이터 수집', url: '/app/data/realestate.html' },
      { id: 'data-parking', name: '주차 데이터 관리', url: '/app/data/parking.html' },
      { id: 'data-calc', name: '손익계산 원가율', url: '/app/data/calc.html' },
      { id: 'data-sales', name: '매출연동', url: '/app/data/sales.html' },
      { id: 'data-photo', name: '사진 메타정보 변경', url: '/app/data/photo.html' },
      { id: 'data-youtube', name: '유튜브 분석', url: '/app/data/youtube.html' }
    ]
  },
  {
    id: 'settings', title: '기타 기능', icon: 'fa-solid fa-cog',
    items: [
      { id: 'settings-education', name: '강의 및 문서', url: '/app/settings/education.html' },
      { id: 'settings-report', name: '카카오 보고서 알림', url: '/app/settings/report.html' },
      { id: 'settings-guide', name: '가이드', url: '/app/settings/guide.html' }
    ]
  }
];

var userProfile = {
  name: '대표님',
  plan: 'c',
  snowball: 50000
};

function getPlanName(plan) {
  var m = { 'a':'BASIC','b':'STANDARD','c':'PRO','basic':'BASIC','standard':'STANDARD','pro':'PRO' };
  return m[plan] || plan.toUpperCase();
}

function getPlanBadgeClass(plan) {
  var m = { 'a':'badge-a','b':'badge-b','c':'badge-c','basic':'badge-basic','standard':'badge-standard','pro':'badge-pro' };
  return m[plan] || 'badge-basic';
}

function isPageActive(url) {
  if (!url) return false;
  var p = window.location.pathname;
  return p === url || p.endsWith(url);
}

function isDashboardActive() {
  return window.location.pathname.indexOf('dashboard') !== -1;
}

function hasActiveItem(cat) {
  return cat.items.some(function(i) {
    if (i.items) return i.items.some(function(s) { return isPageActive(s.url); });
    return isPageActive(i.url);
  });
}

function escapeHTML(str) {
  var d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function numFmt(n) {
  return (n || 0).toLocaleString('ko-KR');
}

function isDevEnvironment() {
  return true;   // 테스트 기간 동안 모든 환경에서 보이게 함
}

/* ==================== 사이드바 렌더링 ==================== */
function renderSidebar(containerId = 'sidebar-container') {
  var container = document.getElementById(containerId);
  if (!container) return;

  var h = '<div class="sidebar">';

  // Header
  h += `
    <div class="sidebar-header">
      <a href="/app/dashboard.html" class="sidebar-logo">
        <div class="sidebar-logo-icon"><i class="fa-solid fa-mountain"></i></div>
        <span class="logo-text">Sherpain</span>
      </a>
      <button class="sidebar-collapse-btn" id="btn-sidebar-collapse" aria-label="사이드바 접기">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </div>`;

  // Profile
  h += `
    <div class="sidebar-profile">
      <div class="profile-top">
        <div class="profile-avatar"><i class="fa-solid fa-user"></i></div>
        <div class="profile-details">
          <div class="profile-name">${escapeHTML(userProfile.name)}</div>
          <div class="profile-meta">
            <div class="profile-meta-row">
              <span class="profile-meta-label">요금제 :</span>
              <span class="profile-plan-badge ${getPlanBadgeClass(userProfile.plan)}">${getPlanName(userProfile.plan)}</span>
            </div>
            <div class="profile-meta-row">
              <span class="profile-meta-label">남은 눈덩이 :</span>
              <span class="profile-snowball">${numFmt(userProfile.snowball)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-actions">
        <a href="/app/settings/profile.html" class="profile-action-btn">프로필/설정</a>
        <a href="/app/settings/billing.html" class="profile-action-btn">플랜/결제</a>
      </div>
      <div class="profile-actions" style="margin-top:4px">
        <button class="profile-action-btn danger" id="btn-sidebar-logout">로그아웃</button>
      </div>`;

  // Developer Tools (더 깔끔한 버전)
  if (isDevEnvironment()) {
    h += `
      <div class="dev-tools">
        <div class="dev-tools-header" id="dev-tools-header">
          <span>Developer Tools</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="dev-tools-body" id="dev-tools-body">
          <div class="dev-form-group">
            <label>Plan</label>
            <select id="dev-plan-select" class="form-select">
              <option value="a">BASIC</option>
              <option value="b">STANDARD</option>
              <option value="c" selected>PRO</option>
            </select>
          </div>
          <div class="dev-form-group">
            <label>눈덩이 (Snowball)</label>
            <input type="number" id="dev-snowball-input" value="${userProfile.snowball}" class="form-input">
          </div>
          <button id="btn-apply-dev" class="btn btn-primary btn-sm w-full">변경 적용 (페이지 새로고침)</button>
          <div class="dev-note">※ 개발자 테스트용 도구입니다. 변경 시 페이지가 새로고침됩니다.</div>
        </div>
      </div>`;
  }

  h += '</div>'; // profile end

  // Navigation
  h += '<nav class="sidebar-nav">';
  h += `<a href="/app/dashboard.html" class="sidebar-dashboard-link ${isDashboardActive() ? ' active' : ''}">
          <i class="fa-solid fa-home"></i><span>대시보드</span>
        </a>`;

  SIDEBAR_CATEGORIES.forEach(function(cat) {
    h += renderCategory(cat);
  });

  h += '</nav></div>';

  container.innerHTML = h;
  bindSidebarEvents();
}

function renderCategory(cat) {
  var active = hasActiveItem(cat);
  var h = `<div class="sidebar-category${active ? ' active' : ''}" data-category-id="${cat.id}">`;

  h += `<div class="sidebar-category-header">
          <i class="${cat.icon}"></i>
          <span class="category-title">${cat.title}</span>
          <i class="fa-solid fa-chevron-down chevron-icon"></i>
        </div>`;

  h += '<div class="sidebar-subcategories">';

  cat.items.forEach(function(item) {
    if (item.items) {
      var subActive = item.items.some(function(s) { return isPageActive(s.url); });
      h += `<div class="sidebar-subcategory${subActive ? '' : ' collapsed'}" data-sub-id="${item.id}">`;
      h += `  <div class="sidebar-subcategory-header">
                <i class="${item.icon || 'fa-solid fa-folder'}"></i>
                <span>${item.name}</span>
                <i class="fa-solid fa-chevron-down sub-chevron"></i>
              </div>`;
      h += '  <div class="sidebar-subcategory-items">';
      item.items.forEach(function(sub) {
        h += `<a href="${sub.url}" class="sidebar-sub-item${isPageActive(sub.url) ? ' active' : ''}">
                <span>${sub.name}</span>
                ${sub.badge ? `<span class="sidebar-badge">${sub.badge}</span>` : ''}
              </a>`;
      });
      h += '  </div></div>';
    } else {
      h += `<a href="${item.url}" class="sidebar-item${isPageActive(item.url) ? ' active' : ''}">
              <span>${item.name}</span>
              ${item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : ''}
            </a>`;
    }
  });

  h += '</div></div>';
  return h;
}

function bindSidebarEvents() {
  document.querySelectorAll('.sidebar-category-header').forEach(function(el) {
    el.addEventListener('click', function() {
      el.closest('.sidebar-category').classList.toggle('collapsed');
    });
  });

  document.querySelectorAll('.sidebar-subcategory-header').forEach(function(el) {
    el.addEventListener('click', function() {
      el.closest('.sidebar-subcategory').classList.toggle('collapsed');
    });
  });

  var collapseBtn = document.getElementById('btn-sidebar-collapse');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', toggleCollapse);
  }

  var logoutBtn = document.getElementById('btn-sidebar-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('정말 로그아웃 하시겠습니까?')) {
        localStorage.removeItem('sherpa_token');
        localStorage.removeItem('sherpa_user');
        window.location.href = '/login.html';
      }
    });
  }

  // Developer Tools 이벤트
  var devHeader = document.getElementById('dev-tools-header');
  var devBody = document.getElementById('dev-tools-body');
  if (devHeader && devBody) {
    devHeader.addEventListener('click', function() {
      devBody.classList.toggle('show');
    });
  }

  var applyBtn = document.getElementById('btn-apply-dev');
  if (applyBtn) {
    applyBtn.addEventListener('click', applyDevChanges);
  }
}

function applyDevChanges() {
  var plan = document.getElementById('dev-plan-select').value;
  var snowball = parseInt(document.getElementById('dev-snowball-input').value) || 0;

  var user = {
    name: userProfile.name || '대표님',
    plan: plan,
    snowball: snowball,
    token: snowball
  };

  localStorage.setItem('sherpa_user', JSON.stringify(user));
  setUserProfile(user);

  alert(`Plan이 ${getPlanName(plan)}로 변경되었습니다.\n페이지가 새로고침되어 적용됩니다.`);

  setTimeout(function() {
    location.reload();
  }, 800);
}

function toggleCollapse() {
  var isCollapsed = document.body.classList.toggle('sidebar-collapsed');
  localStorage.setItem('sherpa_sidebar_collapsed', isCollapsed ? '1' : '0');
}

function setUserProfile(profile) {
  userProfile = Object.assign({}, userProfile, profile);
}

function updateSnowballDisplay(val) {
  userProfile.snowball = val || 0;
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
  var saved = localStorage.getItem('sherpa_user');
  if (saved) {
    try {
      setUserProfile(JSON.parse(saved));
    } catch(e) {}
  }
  renderSidebar();
});

window.SidebarModule = {
  renderSidebar: renderSidebar,
  setUserProfile: setUserProfile,
  updateSnowballDisplay: updateSnowballDisplay,
  toggleCollapse: toggleCollapse,
  toggleSidebar: function(){},
  closeSidebar: function(){}
};