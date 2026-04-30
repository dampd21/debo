/* ================================================================
   Sherpain21 — topbar.js
   Version: 2.1.0
   변경: 메뉴 아이콘 전부 제거(텍스트만), 사이드바 접기 버튼 탑바에 추가
   ================================================================ */

// ── 탑바 메뉴 (아이콘 없음, 텍스트만) ──
var TOPBAR_MENU = [
  { id: 'community', name: '커뮤니티', url: '/app/community/board.html', matchPath: '/community/' },
  { id: 'partner', name: '홍보하기', url: '/app/partner/services.html', matchPath: '/partner/' },
  { id: 'escrow', name: '모집/리뷰어', url: '/app/escrow/missions.html', matchPath: '/escrow/' },
  { id: 'inquiry', name: '프로그램문의', url: '/app/support/inquiry.html', matchPath: '/support/inquiry' },
  {
    id: 'cs', name: '고객센터', matchPath: '/support/cs',
    hasDropdown: true,
    dropdown: [
      { name: 'FAQ', url: '/app/support/cs.html?tab=faq' },
      { name: 'Q&A', url: '/app/support/cs.html?tab=qna' },
      { name: '1:1 문의', url: '/app/support/cs.html?tab=1on1' },
      { name: '카카오톡 상담', url: 'https://pf.kakao.com/xxxxx', external: true }
    ]
  }
];

var notificationCount = 0;

function isTopbarActive(menu) {
  var p = window.location.pathname;
  if (menu.matchPath) return p.indexOf(menu.matchPath) !== -1;
  return menu.url && (p === menu.url || p.endsWith(menu.url));
}


// ── 탑바 렌더링 ──
function renderTopbar(containerId) {
  var container = document.getElementById(containerId || 'topbar-container');
  if (!container) return;

  var h = '';
  h += '<div class="topbar">';

  // 왼쪽: 모바일 햄버거 + 사이드바 접기 + 메뉴
  h += '<div class="flex items-center">';

  // 모바일 햄버거
  h += '<button class="topbar-mobile-toggle" id="btn-sidebar-toggle" aria-label="메뉴">';
  h += '  <i class="fa-solid fa-bars"></i>';
  h += '</button>';

  // 사이드바 접기 버튼 (데스크톱)
  h += '<button class="topbar-collapse-btn" id="btn-topbar-collapse" aria-label="사이드바 접기">';
  h += '  <i class="fa-solid fa-sidebar" style="font-size:14px;"></i>';
  h += '</button>';

  // 메뉴
  h += '<div class="topbar-menu">';

  TOPBAR_MENU.forEach(function(menu) {
    var active = isTopbarActive(menu);
    var hasDD = menu.hasDropdown;

    h += '<div class="topbar-item' + (hasDD ? ' has-dropdown' : '') + (active ? ' active' : '') + '">';

    if (hasDD) {
      h += '<button class="topbar-link" aria-haspopup="true" aria-expanded="false">';
      h += '  <span>' + menu.name + '</span>';
      h += '  <i class="fa-solid fa-chevron-down dropdown-icon"></i>';
      h += '</button>';

      h += '<div class="topbar-dropdown">';
      menu.dropdown.forEach(function(item) {
        h += '<a href="' + item.url + '" class="topbar-dropdown-item"' + (item.external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>';
        h += item.name;
        if (item.external) h += ' <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px;color:var(--color-gray-400);margin-left:4px;"></i>';
        h += '</a>';
      });
      h += '</div>';
    } else {
      h += '<a href="' + menu.url + '" class="topbar-link">';
      h += '  <span>' + menu.name + '</span>';
      h += '</a>';
    }

    h += '</div>';
  });

  h += '</div>'; // .topbar-menu
  h += '</div>'; // .flex

  // 오른쪽: 알림 + 사용자
  h += '<div class="topbar-actions">';

  // 알림
  h += '<button class="topbar-btn" id="btn-notification" aria-label="알림">';
  h += '  <i class="fa-solid fa-bell"></i>';
  if (notificationCount > 0) {
    h += '  <span class="notification-badge">' + (notificationCount > 99 ? '99+' : notificationCount) + '</span>';
  }
  h += '</button>';

  // 사용자 메뉴
  h += '<div class="topbar-user">';
  h += '  <button class="topbar-user-btn" id="btn-user-menu" aria-label="사용자 메뉴">';
  h += '    <i class="fa-solid fa-user"></i>';
  h += '  </button>';
  h += '  <div class="topbar-user-dropdown" id="user-dropdown">';
  h += '    <div class="user-dropdown-header">';
  h += '      <div class="user-dropdown-name" id="user-dropdown-name">사용자</div>';
  h += '      <div class="user-dropdown-email" id="user-dropdown-email"></div>';
  h += '    </div>';
  h += '    <a href="/app/settings/profile.html" class="user-dropdown-item"><i class="fa-solid fa-user"></i> 프로필/설정</a>';
  h += '    <a href="/app/settings/billing.html" class="user-dropdown-item"><i class="fa-solid fa-credit-card"></i> 플랜/결제</a>';
  h += '    <hr class="dropdown-divider">';
  h += '    <a href="#" class="user-dropdown-item" id="btn-topbar-logout"><i class="fa-solid fa-sign-out-alt"></i> 로그아웃</a>';
  h += '  </div>';
  h += '</div>';

  h += '</div>'; // .topbar-actions
  h += '</div>'; // .topbar

  container.innerHTML = h;
  updateTopbarUserInfo();
  bindTopbarEvents();
}


function updateTopbarUserInfo() {
  try {
    var stored = localStorage.getItem('sherpa_user');
    if (stored) {
      var u = JSON.parse(stored);
      var nameEl = document.getElementById('user-dropdown-name');
      var emailEl = document.getElementById('user-dropdown-email');
      if (nameEl && u.name) nameEl.textContent = u.name;
      if (emailEl && u.email) emailEl.textContent = u.email;
    }
  } catch(e) {}
}


function bindTopbarEvents() {
  // 모바일 햄버거
  var toggle = document.getElementById('btn-sidebar-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      if (window.SidebarModule) window.SidebarModule.toggleSidebar();
    });
  }

  // 사이드바 접기 (데스크톱)
  var collapseBtn = document.getElementById('btn-topbar-collapse');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', function() {
      if (window.SidebarModule) window.SidebarModule.toggleCollapse();
    });
  }

  // 드롭다운 hover
  var ddItems = document.querySelectorAll('.topbar-item.has-dropdown');
  ddItems.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      var dd = item.querySelector('.topbar-dropdown');
      if (dd) dd.classList.add('show');
    });
    item.addEventListener('mouseleave', function() {
      var dd = item.querySelector('.topbar-dropdown');
      if (dd) dd.classList.remove('show');
    });
    var btn = item.querySelector('.topbar-link');
    if (btn && btn.tagName === 'BUTTON') {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var dd = item.querySelector('.topbar-dropdown');
        if (dd) dd.classList.toggle('show');
      });
    }
  });

  // 사용자 메뉴
  var userBtn = document.getElementById('btn-user-menu');
  var userDD = document.getElementById('user-dropdown');
  if (userBtn && userDD) {
    userBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      userDD.classList.toggle('show');
    });
  }

  // 바깥 클릭 닫기
  document.addEventListener('click', function(e) {
    if (userDD && !e.target.closest('#topbar-user')) {
      userDD.classList.remove('show');
    }
    ddItems.forEach(function(item) {
      if (!item.contains(e.target)) {
        var dd = item.querySelector('.topbar-dropdown');
        if (dd) dd.classList.remove('show');
      }
    });
  });

  // 로그아웃
  var logoutBtn = document.getElementById('btn-topbar-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('정말 로그아웃 하시겠습니까?')) {
        localStorage.removeItem('sherpa_token');
        localStorage.removeItem('sherpa_user');
        window.location.href = '/login.html';
      }
    });
  }

  // 알림
  var notifBtn = document.getElementById('btn-notification');
  if (notifBtn) {
    notifBtn.addEventListener('click', function() {
      // TODO: 알림 패널
    });
  }
}


function setNotificationCount(count) {
  notificationCount = count;
  var badge = document.querySelector('.notification-badge');
  if (badge) {
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}


// ── 초기화 ──
document.addEventListener('DOMContentLoaded', function() {
  renderTopbar();
});

if (typeof window !== 'undefined') {
  window.TopbarModule = {
    renderTopbar: renderTopbar,
    setNotificationCount: setNotificationCount
  };
}
