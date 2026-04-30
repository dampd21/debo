/**
 * SHERPAIN21 - Config (v2.1)
 * 환경별 설정
 */
var SHERPA_CONFIG = {
  API_URL: location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://localhost:8787'
    : 'https://sherpa-api.sherpain21.workers.dev',

  PAGES: {
    landing: '/',
    login: '/login.html',
    signup: '/signup.html',
    dashboard: '/app/dashboard.html',
  },

  STORAGE_KEYS: {
    token: 'sherpa_token',
    user: 'sherpa_user',
    sidebarCollapsed: 'sherpa_sidebar_collapsed',
  },
};
