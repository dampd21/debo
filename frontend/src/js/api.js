/**
 * SHERPAIN21 - API Client (v2.1)
 * 
 * 기존 기능 100% 유지 + 에스크로/커뮤니티/출석/눈덩이 추가
 * DB tokens → 코드에서 snowball로 매핑
 * 
 * 의존: config.js (SHERPA_CONFIG)
 */
var SherpaAPI = (function() {
  'use strict';
  var BASE = SHERPA_CONFIG.API_URL;

  async function request(method, path, body, opts) {
    opts = opts || {};
    var url = BASE + path;
    var headers = { 'Content-Type': 'application/json' };
    if (!opts.noAuth && typeof SherpaAuth !== 'undefined') {
      var token = SherpaAuth.getToken();
      if (token) headers['Authorization'] = 'Bearer ' + token;
    }
    var fetchOpts = { method: method, headers: headers };
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      fetchOpts.body = JSON.stringify(body);
    }
    var timeout = opts.timeout || 20000;
    var controller = new AbortController();
    fetchOpts.signal = controller.signal;
    var timer = setTimeout(function() { controller.abort(); }, timeout);
    try {
      var res = await fetch(url, fetchOpts);
      clearTimeout(timer);
      if (opts.raw) return res;
      var data;
      var contentType = res.headers.get('Content-Type') || '';
      if (contentType.indexOf('application/json') !== -1) {
        data = await res.json();
      } else {
        data = { _text: await res.text() };
      }
      // snowball 매핑: API 응답의 tokens → snowball
      if (data && data.user && data.user.tokens !== undefined && data.user.snowball === undefined) {
        data.user.snowball = data.user.tokens;
      }
      if (!res.ok) {
        var err = new Error(data.error || data.message || 'API Error');
        err.status = res.status; err.data = data;
        if (res.status === 401 && !opts.noAuth && typeof SherpaAuth !== 'undefined') {
          SherpaAuth.clearAuth();
          if (window.location.pathname.indexOf('/login') === -1) {
            window.location.href = SHERPA_CONFIG.PAGES.login;
          }
        }
        throw err;
      }
      return data;
    } catch (e) {
      clearTimeout(timer);
      if (e.name === 'AbortError') {
        var te = new Error('요청 시간이 초과되었습니다.');
        te.status = 0; te.isTimeout = true; throw te;
      }
      if (!e.status) { e.status = 0; e.isNetwork = true; }
      throw e;
    }
  }

  function get(path, opts) { return request('GET', path, null, opts); }
  function post(path, body, opts){ return request('POST', path, body, opts); }
  function put(path, body, opts) { return request('PUT', path, body, opts); }
  function del(path, opts) { return request('DELETE', path, null, opts); }

  // ── 기존 API 모듈 (100% 유지) ──

  var auth = {
    me: function() { return get('/auth/me'); },
    signup: function(data) { return post('/auth/signup', data); },
    login: function(loginId, password) { return post('/auth/login', { loginId: loginId, password: password }); },
  };

  var rank = {
    place: function(params) {
      var q = '?keyword=' + encodeURIComponent(params.keyword || '');
      if (params.store) q += '&store=' + encodeURIComponent(params.store);
      if (params.kind) q += '&kind=' + encodeURIComponent(params.kind);
      if (params.x) q += '&x=' + encodeURIComponent(params.x);
      if (params.y) q += '&y=' + encodeURIComponent(params.y);
      if (params.start) q += '&start=' + params.start;
      if (params.display) q += '&display=' + params.display;
      if (params.deviceType) q += '&deviceType=' + encodeURIComponent(params.deviceType);
      return get('/rank/place' + q, { timeout: 30000 });
    },
    proxy: function(params) {
      var q = '?keyword=' + encodeURIComponent(params.keyword || '');
      if (params.kind) q += '&kind=' + encodeURIComponent(params.kind);
      if (params.x) q += '&x=' + encodeURIComponent(params.x);
      if (params.y) q += '&y=' + encodeURIComponent(params.y);
      if (params.start) q += '&start=' + params.start;
      if (params.display) q += '&display=' + params.display;
      if (params.deviceType) q += '&deviceType=' + encodeURIComponent(params.deviceType);
      return post('/rank/proxy' + q, null, { timeout: 30000 });
    },
    trackCreate: function(data) { return post('/rank/track', data); },
    tracks: function(workspaceId) { return get('/rank/tracks?workspaceId=' + encodeURIComponent(workspaceId || 'default')); },
    trackDelete: function(workspaceId, trackId) { return del('/rank/track?workspaceId=' + encodeURIComponent(workspaceId || 'default') + '&id=' + trackId); },
    collect: function(workspaceId, trackId) { return post('/rank/collect?workspaceId=' + encodeURIComponent(workspaceId || 'default') + '&trackId=' + trackId, null, { timeout: 30000 }); },
    timeline: function(workspaceId, trackId, limit) { var q = '?workspaceId=' + encodeURIComponent(workspaceId || 'default') + '&trackId=' + trackId; if (limit) q += '&limit=' + limit; return get('/rank/timeline' + q); },
    snapshot: function(workspaceId, trackId, date) { return get('/rank/snapshot?workspaceId=' + encodeURIComponent(workspaceId || 'default') + '&trackId=' + trackId + '&date=' + encodeURIComponent(date)); },
  };

  var keyword = {
    volume: function(keywords, includeRelated) { return post('/keyword/volume', { keywords: Array.isArray(keywords) ? keywords : [keywords], includeRelated: !!includeRelated }, { timeout: 60000 }); },
    volumeMock: function(kw) { return get('/keyword/volume?keyword=' + encodeURIComponent(kw)); },
  };

  var ad = {
    rankBids: function(keyword) { return post('/ad/analyze', { mode: 'rank', keyword: keyword }, { timeout: 30000 }); },
    custom: function(keyword, bid) { return post('/ad/analyze', { mode: 'custom', keyword: keyword, bid: bid }, { timeout: 30000 }); },
    full: function(keyword) { return post('/ad/analyze', { mode: 'full', keyword: keyword }, { timeout: 30000 }); },
    bulk: function(keywords) { return post('/ad/analyze', { mode: 'bulk', keywords: keywords }, { timeout: 120000 }); },
  };

  var review = {
    stats: function(businessId, startDate, endDate, force) { var q = '?businessId=' + encodeURIComponent(businessId) + '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate); if (force) q += '&force=1'; return get('/review/stats' + q, { timeout: 15000 }); },
  };

  var user = {
    dashboard: function() { return get('/user/dashboard'); },
    updateProfile: function(data) { return put('/user/profile', data); },
  };

  var payment = {
    ready: function(planCode, method) { return post('/payment/ready', { plan: planCode, method: method }); },
    confirm: function(paymentKey, orderId, amount) { return post('/payment/confirm', { paymentKey: paymentKey, orderId: orderId, amount: amount }); },
    status: function(paymentId) { return get('/payment/status?id=' + encodeURIComponent(paymentId)); },
  };

  var youtube = {
    search: function(params) { var q = '?q=' + encodeURIComponent(params.q || ''); if (params.order) q += '&order=' + encodeURIComponent(params.order); if (params.videoDuration && params.videoDuration !== 'any') q += '&videoDuration=' + encodeURIComponent(params.videoDuration); if (params.publishedAfter) q += '&publishedAfter=' + encodeURIComponent(params.publishedAfter); if (params.maxResults) q += '&maxResults=' + params.maxResults; if (params.pageToken) q += '&pageToken=' + encodeURIComponent(params.pageToken); return get('/youtube/search' + q, { timeout: 30000 }); },
    videos: function(ids, part) { return get('/youtube/videos?id=' + encodeURIComponent(ids) + '&part=' + encodeURIComponent(part || 'snippet,contentDetails,statistics'), { timeout: 20000 }); },
    channels: function(ids, part) { return get('/youtube/channels?id=' + encodeURIComponent(ids) + '&part=' + encodeURIComponent(part || 'statistics,snippet'), { timeout: 20000 }); },
    trending: function(categoryId) { var q = categoryId && categoryId !== '0' ? '?categoryId=' + categoryId : ''; return get('/youtube/trending' + q, { timeout: 20000 }); },
    aiAnalyze: function(data) { return post('/ai/youtube-analyze', data, { timeout: 60000 }); },
  };

  var place = {
    keywords: function(placeId, kind) { return get('/place/keywords?placeId=' + encodeURIComponent(placeId) + '&kind=' + encodeURIComponent(kind || 'restaurant'), { timeout: 10000 }); },
    detail: function(placeId, kind) { return get('/place/detail?placeId=' + encodeURIComponent(placeId) + '&kind=' + encodeURIComponent(kind || 'restaurant'), { timeout: 15000 }); },
    detailGql: function(placeId) { return get('/place/detail-gql?placeId=' + encodeURIComponent(placeId), { timeout: 10000 }); },
    themes: function(placeId, kind) { return get('/place/themes?placeId=' + encodeURIComponent(placeId) + '&kind=' + encodeURIComponent(kind || 'restaurant'), { timeout: 15000 }); },
    reviews: function(placeId, kind, size, sort) { var q = '?placeId=' + encodeURIComponent(placeId) + '&kind=' + encodeURIComponent(kind || 'restaurant') + '&size=' + (size || 30); if (sort) q += '&sort=' + encodeURIComponent(sort); return get('/place/reviews' + q, { timeout: 15000 }); },
  };

  var datalab = {
    trend: function(keywordGroups, startDate, endDate, opts) { opts = opts || {}; return post('/datalab/trend', { keywordGroups: keywordGroups, startDate: startDate, endDate: endDate, timeUnit: opts.timeUnit || 'date', device: opts.device || '', gender: opts.gender || '', ages: opts.ages || [] }, { timeout: 30000 }); }
  };

  var googleTrends = {
    daily: function() { return get('/google/trends/daily', { timeout: 15000 }); },
    realtime: function() { return get('/google/trends/realtime', { timeout: 15000 }); }
  };

  var parking = {
    scan: function(imageBase64) { return post('/ai/parking-scan', { image: imageBase64 }, { timeout: 30000 }); }
  };

  var biz = {
    collect: function(keyword, opts) { opts = opts || {}; return post('/biz/collect', { keyword: keyword, maxBlogs: opts.maxBlogs || 30 }, { timeout: 60000 }); }
  };

  var blog = {
    generate: function(data) { return post('/ai/blog-generate', data, { timeout: 120000 }); }
  };

  var system = {
    health: function() { return get('/health', { noAuth: true, timeout: 5000 }); },
  };

  // ── v2.1 신규 API 모듈 ──

  var escrow = {
    create: function(data) { return post('/escrow/create', data, { timeout: 15000 }); },
    list: function(opts) {
      opts = opts || {};
      var q = '?status=' + encodeURIComponent(opts.status || 'open');
      if (opts.page) q += '&page=' + opts.page;
      if (opts.limit) q += '&limit=' + opts.limit;
      return get('/escrow/list' + q);
    },
    detail: function(id) { return get('/escrow/detail?id=' + id); },
    apply: function(missionId) { return post('/escrow/apply', { mission_id: missionId }); },
    approve: function(applicationId) { return post('/escrow/approve', { application_id: applicationId }); },
  };

  var community = {
    list: function(opts) {
      opts = opts || {};
      var q = '?board=' + encodeURIComponent(opts.board || 'community');
      if (opts.page) q += '&page=' + opts.page;
      if (opts.limit) q += '&limit=' + opts.limit;
      return get('/post/list' + q);
    },
    detail: function(id) { return get('/post/detail?id=' + id); },
    create: function(data) { return post('/post/create', data); },
    comment: function(postId, content, parentId) {
      return post('/comment/create', { post_id: postId, content: content, parent_id: parentId || null });
    },
  };

  var attendance = {
    check: function() { return post('/attendance/check', {}); },
    status: function() { return get('/attendance/status'); },
  };

  var snowball = {
    history: function(opts) {
      opts = opts || {};
      var q = '?page=' + (opts.page || 1);
      if (opts.limit) q += '&limit=' + opts.limit;
      if (opts.type) q += '&type=' + encodeURIComponent(opts.type);
      return get('/snowball/history' + q);
    },
  };

  var dashboard = {
    stats: function() { return get('/dashboard/stats'); },
  };

  // ── 에러 메시지 ──

  function errorMessage(err) {
    if (err.isTimeout) return '서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.';
    if (err.isNetwork) return '네트워크 연결을 확인해주세요.';
    if (err.status === 401) return '로그인이 필요합니다.';
    if (err.status === 403) return '접근 권한이 없습니다.';
    if (err.status === 429) return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    if (err.status === 502) return '외부 API 응답을 받지 못했습니다. 잠시 후 다시 시도해주세요.';
    if (err.data && err.data.error) return err.data.error;
    return err.message || '알 수 없는 오류가 발생했습니다.';
  }

  return {
    request: request, get: get, post: post, put: put, del: del,
    // 기존
    auth: auth, rank: rank, keyword: keyword, ad: ad, review: review,
    user: user, payment: payment, place: place, youtube: youtube, system: system,
    datalab: datalab, googleTrends: googleTrends, parking: parking, biz: biz, blog: blog,
    errorMessage: errorMessage,
    // v2.1 신규
    escrow: escrow,
    community: community,
    attendance: attendance,
    snowball: snowball,
    dashboard: dashboard,
  };
})();
