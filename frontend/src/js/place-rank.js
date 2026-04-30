/**
 * SHERPAIN21 - Place Rank Page Logic (v2.1)
 * 순위 조회 (300위 확장) + 추적 관리 + 요금제 정책
 *
 * 정책:
 *   Basic    — 조회 1시간당 5회 / 추적 슬롯 1개 / 스냅샷 모자이크
 *   Standard — 조회 무제한 / 추적 슬롯 3개 (추가 1000눈덩이) / 스냅샷 전체
 *   Pro      — 조회 무제한 / 추적 슬롯 10개 (추가 1000눈덩이) / 스냅샷 전체 + 보고서
 */
(function() {
  'use strict';

  var now = new Date();
  var dayNames = ['일','월','화','수','목','금','토'];
  var dateEl = document.getElementById('header-date');
  if (dateEl) dateEl.textContent = now.getFullYear() + '.' + String(now.getMonth()+1).padStart(2,'0') + '.' + String(now.getDate()).padStart(2,'0') + ' (' + dayNames[now.getDay()] + ')';

  // ── 사용자 플랜 ──
  var userPlan = 'a';
  try { if (typeof SherpaAuth !== 'undefined') userPlan = SherpaAuth.getPlan() || 'a'; } catch(e) {}

  var PLAN_CONFIG = {
    'a': { searchLimit: 5, searchWindow: 3600000, trackSlots: 1, canBuySlot: false, snapshotBlur: true, label: 'BASIC' },
    'b': { searchLimit: 999999, searchWindow: 0, trackSlots: 3, canBuySlot: true, snapshotBlur: false, label: 'STANDARD' },
    'c': { searchLimit: 999999, searchWindow: 0, trackSlots: 10, canBuySlot: true, snapshotBlur: false, label: 'PRO' }
  };
  var planCfg = PLAN_CONFIG[userPlan] || PLAN_CONFIG['a'];

  // ── Basic 조회 제한 ──
  var SEARCH_LOG_KEY = 'sherpa_place_search_log';
  function getSearchCount() { try { var log = JSON.parse(localStorage.getItem(SEARCH_LOG_KEY) || '[]'); var cutoff = Date.now() - planCfg.searchWindow; log = log.filter(function(t) { return t > cutoff; }); localStorage.setItem(SEARCH_LOG_KEY, JSON.stringify(log)); return log.length; } catch(e) { return 0; } }
  function recordSearch() { try { var log = JSON.parse(localStorage.getItem(SEARCH_LOG_KEY) || '[]'); log.push(Date.now()); var cutoff = Date.now() - planCfg.searchWindow; log = log.filter(function(t) { return t > cutoff; }); localStorage.setItem(SEARCH_LOG_KEY, JSON.stringify(log)); } catch(e) {} }
  function checkSearchLimit() { if (planCfg.searchLimit >= 999999) return true; var count = getSearchCount(); if (count >= planCfg.searchLimit) { var notice = document.getElementById('rate-limit-notice'); notice.style.display = 'block'; document.getElementById('rate-limit-msg').textContent = planCfg.label + ' 플랜은 1시간당 ' + planCfg.searchLimit + '회 조회 가능합니다. (현재 ' + count + '/' + planCfg.searchLimit + '회 사용)'; return false; } return true; }

  if (planCfg.searchLimit < 999999) { var cnt = getSearchCount(); if (cnt > 0) { var notice = document.getElementById('rate-limit-notice'); notice.style.display = 'block'; document.getElementById('rate-limit-msg').textContent = planCfg.label + ' 플랜: 1시간당 ' + planCfg.searchLimit + '회 조회 가능 (' + cnt + '/' + planCfg.searchLimit + '회 사용)'; } }

  // ── 탭 ──
  var tabs = document.querySelectorAll('.page-tab');
  tabs.forEach(function(tab) { tab.addEventListener('click', function() { tabs.forEach(function(t) { t.classList.remove('is-active'); }); this.classList.add('is-active'); var target = this.dataset.tab; document.getElementById('tab-search').style.display = (target === 'search') ? 'block' : 'none'; document.getElementById('tab-tracking').style.display = (target === 'tracking') ? 'block' : 'none'; if (target === 'tracking') loadTracks(); }); });

  // ── 상세 옵션 ──
  document.getElementById('btn-advanced').addEventListener('click', function() { var area = document.getElementById('advanced-area'); var open = area.classList.toggle('is-open'); this.textContent = open ? '상세 옵션 접기' : '상세 옵션 펼치기'; });

  // ── 주소 검색 ──
  document.getElementById('btn-geocode').addEventListener('click', doGeocode);
  document.getElementById('s-addr').addEventListener('keydown', function(e) { if (e.key === 'Enter') doGeocode(); });
  function doGeocode() { var addr = document.getElementById('s-addr').value.trim(); if (!addr) { alert('주소를 입력하세요.'); return; } var btn = document.getElementById('btn-geocode'); btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(addr) + '&limit=1', { headers: { 'Accept-Language': 'ko' } }).then(function(r) { return r.json(); }).then(function(data) { if (!data.length) { alert('주소를 찾을 수 없습니다.'); return; } document.getElementById('s-x').value = data[0].lon; document.getElementById('s-y').value = data[0].lat; alert('좌표 설정 완료: ' + data[0].display_name); }).catch(function() { alert('주소 검색 실패'); }).then(function() { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-location-dot"></i> 검색'; }); }

  // ── DOM ──
  var $keyword = document.getElementById('s-keyword');
  var $placeId = document.getElementById('s-place-id');
  var $store = document.getElementById('s-store');
  var $kind = document.getElementById('s-kind');
  var $x = document.getElementById('s-x');
  var $y = document.getElementById('s-y');
  var $device = document.getElementById('s-device');

  // ── 상태 ──
  var lastSearchData = null;
  var rankTrendChart = null;
  var WORKSPACE = 'default';
  var KIND_LABELS = { restaurant:'음식점', hairshop:'미용실', nailshop:'네일샵', hospital:'병원', accommodation:'숙박' };
  var allResults = [];
  var searchTotal = 0;
  var searchKeyword = '';
  var searchPlaceId = '';
  var isLoadingMore = false;
  var MAX_RESULTS = 300;
  var PAGE_SIZE = 50;
  var retryTimer = null;

  // ── 유틸리티 ──
  function show(id) { document.getElementById(id).style.display = ''; }
  function hide(id) { document.getElementById(id).style.display = 'none'; }
  function esc(s) { if (!s) return ''; var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function comma(n) { if (n == null) return '-'; return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fmtDateLabel(ds) { var d = new Date(ds + 'T00:00:00+09:00'); return String(d.getMonth()+1).padStart(2,'0') + '.' + String(d.getDate()).padStart(2,'0') + ' ' + dayNames[d.getDay()]; }
  function fmtRankDelta(n) { if (n == null) return ''; if (n === 0) return ' <span class="snap-delta snap-flat">-</span>'; if (n > 0) return ' <span class="snap-delta snap-up">+' + n + '</span>'; return ' <span class="snap-delta snap-down">' + n + '</span>'; }
  function fmtMetricDelta(n) { if (n == null || n === 0) return ''; if (n > 0) return ' <span class="snap-delta snap-up">+' + comma(n) + '</span>'; return ' <span class="snap-delta snap-down">' + comma(n) + '</span>'; }
  function rankBadge(r) { return r===1?'r1':r<=3?'r2':r<=5?'r3':'r4'; }

  // ── 에러 표시 (카운트다운 + 재시도 버튼) ──
  function showError(msg, canRetry) {
    var errEl = document.getElementById('search-error');
    var msgEl = document.getElementById('search-error-msg');

    if (canRetry) {
      var countdown = 30;
      msgEl.innerHTML = msg + '<br><span id="retry-countdown" style="font-size:12px;margin-top:6px;display:inline-block;">네이버 API 제한으로 잠시 대기 중... <strong>' + countdown + '초</strong> 후 자동 재시도</span>' +
        '<br><button id="btn-retry-now" style="margin-top:8px;padding:6px 16px;font-size:12px;font-weight:600;background:var(--color-accent);color:white;border:none;border-radius:4px;cursor:pointer;">지금 재시도</button>';

      if (retryTimer) clearInterval(retryTimer);
      retryTimer = setInterval(function() {
        countdown--;
        var cdEl = document.getElementById('retry-countdown');
        if (cdEl) cdEl.innerHTML = '네이버 API 제한으로 잠시 대기 중... <strong>' + countdown + '초</strong> 후 자동 재시도';
        if (countdown <= 0) {
          clearInterval(retryTimer);
          retryTimer = null;
          hide('search-error');
          doSearch();
        }
      }, 1000);

      setTimeout(function() {
        var retryBtn = document.getElementById('btn-retry-now');
        if (retryBtn) {
          retryBtn.addEventListener('click', function() {
            if (retryTimer) { clearInterval(retryTimer); retryTimer = null; }
            hide('search-error');
            doSearch();
          });
        }
      }, 0);
    } else {
      msgEl.textContent = msg;
    }

    show('search-error');
  }

  // ════════════════════════════════
  // 순위 조회
  // ════════════════════════════════
  document.getElementById('btn-search').addEventListener('click', doSearch);
  document.getElementById('btn-loadmore').addEventListener('click', loadMore);
  $keyword.addEventListener('keydown', function(e) { if (e.key === 'Enter') doSearch(); });
  $placeId.addEventListener('keydown', function(e) { if (e.key === 'Enter') doSearch(); });

  function doSearch() {
    var keyword = $keyword.value.trim();
    var placeId = $placeId.value.trim();
    if (!keyword) { alert('검색 키워드를 입력하세요.'); $keyword.focus(); return; }
    if (!placeId) { alert('Place ID를 입력하세요.'); $placeId.focus(); return; }
    if (!checkSearchLimit()) { return; }

    if (retryTimer) { clearInterval(retryTimer); retryTimer = null; }

    allResults = []; searchTotal = 0; searchKeyword = keyword; searchPlaceId = placeId;
    show('search-loading'); hide('search-empty'); hide('search-result'); hide('search-error'); hide('r-loadmore-wrap');
    recordSearch();
    fetchPage(1, PAGE_SIZE, true);
  }

  function loadMore() {
    if (isLoadingMore) return;
    if (allResults.length >= MAX_RESULTS || allResults.length >= searchTotal) return;
    var nextStart = allResults.length + 1;
    var remaining = Math.min(PAGE_SIZE, MAX_RESULTS - allResults.length);
    isLoadingMore = true;
    var btn = document.getElementById('btn-loadmore');
    btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 로딩 중...';
    fetchPage(nextStart, remaining, false);
  }

  function fetchPage(start, display, isFirstPage) {
    SherpaAPI.rank.place({
      keyword: searchKeyword, kind: $kind.value, x: $x.value, y: $y.value,
      deviceType: $device.value, display: display, start: start,
    }).then(function(data) {
      if (isFirstPage) {
        hide('search-loading');
        lastSearchData = data;
        lastSearchData._placeId = searchPlaceId;
        lastSearchData._storeName = $store.value.trim();
        searchTotal = data.total || 0;
        allResults = data.results || [];
      } else {
        var newResults = data.results || [];
        var existingIds = {};
        for (var i = 0; i < allResults.length; i++) existingIds[String(allResults[i].id)] = true;
        for (var j = 0; j < newResults.length; j++) { if (!existingIds[String(newResults[j].id)]) allResults.push(newResults[j]); }
        lastSearchData.results = allResults;
      }
      renderSearchResult(isFirstPage);
      updateLoadMoreButton();
      if (!isFirstPage) { isLoadingMore = false; var btn = document.getElementById('btn-loadmore'); btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-angles-down"></i> 더보기 (' + allResults.length + ' / ' + Math.min(searchTotal, MAX_RESULTS) + ')'; }
      if (planCfg.searchLimit < 999999) { var cnt = getSearchCount(); document.getElementById('rate-limit-notice').style.display = 'block'; document.getElementById('rate-limit-msg').textContent = planCfg.label + ' 플랜: 1시간당 ' + planCfg.searchLimit + '회 (' + cnt + '/' + planCfg.searchLimit + '회 사용)'; }
    }).catch(function(err) {
      var errMsg = SherpaAPI.errorMessage(err);
      var is502 = err.status === 502 || errMsg.indexOf('외부 API') !== -1 || errMsg.indexOf('응답을 받지') !== -1;

      if (isFirstPage) {
        hide('search-loading');
        if (is502) {
          showError('네이버 플레이스 API가 일시적으로 응답하지 않습니다.', true);
        } else {
          showError(errMsg, false);
        }
      } else {
        isLoadingMore = false;
        var btn = document.getElementById('btn-loadmore');
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-angles-down"></i> 더보기 (오류 — 클릭하여 재시도)';
      }
    });
  }

  function updateLoadMoreButton() {
    var canLoad = allResults.length < Math.min(searchTotal, MAX_RESULTS) && allResults.length > 0;
    document.getElementById('r-loadmore-wrap').style.display = canLoad ? '' : 'none';
    if (canLoad) { document.getElementById('btn-loadmore').innerHTML = '<i class="fa-solid fa-angles-down"></i> 더보기 (' + allResults.length + ' / ' + Math.min(searchTotal, MAX_RESULTS) + ')'; }
  }

  function renderSearchResult(isFirstPage) {
    var results = allResults;
    var placeId = searchPlaceId;
    var storeName = $store.value.trim();

    if (isFirstPage) {
      var targetItem = null, targetRank = null;
      for (var i = 0; i < results.length; i++) { if (String(results[i].id) === String(placeId)) { targetItem = results[i]; targetRank = i + 1; break; } }

      if (targetRank) { document.getElementById('r-rank').textContent = targetRank + '위'; document.getElementById('r-rank-sub').textContent = '전체 ' + (searchTotal||results.length) + '개 중'; document.getElementById('r-rank-sub').style.color = 'var(--color-success)'; }
      else { document.getElementById('r-rank').textContent = '미발견'; document.getElementById('r-rank-sub').textContent = '상위 ' + results.length + '위 안에 없음'; document.getElementById('r-rank-sub').style.color = 'var(--color-danger)'; }
      document.getElementById('r-total').textContent = (searchTotal||results.length).toLocaleString();
      document.getElementById('r-kw').textContent = searchKeyword + ' (' + (KIND_LABELS[$kind.value]||$kind.value) + ')';
      document.getElementById('r-time').textContent = lastSearchData.checkedAt || '-';

      var targetBody = document.getElementById('r-target-body');
      if (targetItem) {
        document.getElementById('r-target-card').style.display = '';
        targetBody.innerHTML = '<div class="target-info">' + (targetItem.imageUrl ? '<div class="target-thumb"><img src="'+targetItem.imageUrl+'" alt="" loading="lazy"></div>' : '<div class="target-thumb"><i class="fa-solid fa-store"></i></div>') + '<div class="target-detail"><div class="target-name"><span class="rank-num '+rankBadge(targetRank)+'" style="margin-right:6px;">'+targetRank+'</span>'+esc(targetItem.name)+'</div><div class="target-cat">'+esc(targetItem.category||targetItem.businessCategory||'')+(targetItem.roadAddress?' | '+esc(targetItem.roadAddress):'')+'</div><div class="target-stats"><span class="target-stat"><b>블로그</b> '+comma(targetItem.blogCafeReviewCount)+'</span><span class="target-stat"><b>방문자</b> '+comma(targetItem.visitorReviewCount)+'</span><span class="target-stat"><b>저장</b> '+comma(targetItem.saveCount)+'</span><span class="target-stat"><b>평점</b> '+(targetItem.visitorReviewScore||'-')+'</span><span class="target-stat"><b>사진</b> '+comma(targetItem.imageCount)+'</span></div><div style="margin-top:4px;font-size:10px;color:var(--color-gray-400);">PID: '+placeId+'</div></div></div>';
      } else {
        document.getElementById('r-target-card').style.display = '';
        targetBody.innerHTML = '<div style="padding:14px;text-align:center;color:var(--color-danger);font-size:13px;">Place ID <strong>'+esc(placeId)+'</strong>에 해당하는 업체가 상위 '+results.length+'위 안에 없습니다.</div>';
      }
      document.getElementById('r-result-body').innerHTML = '';
    }

    var tbody = document.getElementById('r-result-body');
    var startIdx = isFirstPage ? 0 : tbody.children.length;
    document.getElementById('r-count').textContent = results.length + '개' + (searchTotal > results.length ? ' / 전체 ' + searchTotal + '개' : '');

    for (var idx = startIdx; idx < results.length; idx++) {
      var item = results[idx]; var isTarget = String(item.id) === String(placeId); var isStoreName = storeName && item.name && item.name.indexOf(storeName) !== -1;
      var tr = document.createElement('tr'); if (isTarget) tr.className = 'rank-highlight';
      var nameLabel = ''; if (isTarget) nameLabel = '<span class="rank-target-label">[조회 대상]</span>'; else if (isStoreName) nameLabel = '<span class="rank-store-label">[매장명 일치]</span>';
      tr.innerHTML = '<td><span class="rank-num '+rankBadge(idx+1)+'">'+(idx+1)+'</span></td><td><div style="font-weight:600;color:var(--color-gray-900);font-size:12px;">'+esc(item.name)+nameLabel+'</div><div style="font-size:10px;color:var(--color-gray-400);">'+esc(item.id)+'</div></td><td>'+esc(item.category||item.businessCategory||'-')+'</td><td>'+comma(item.blogCafeReviewCount)+'</td><td>'+comma(item.visitorReviewCount)+'</td><td>'+(item.visitorReviewScore||'-')+'</td><td>'+comma(item.saveCount)+'</td><td>'+comma(item.imageCount)+'</td>';
      tbody.appendChild(tr);
    }
    show('search-result');

    if (!isFirstPage) { var newTargetRank = null; for (var k = 0; k < results.length; k++) { if (String(results[k].id) === String(placeId)) { newTargetRank = k + 1; break; } } if (newTargetRank && document.getElementById('r-rank').textContent === '미발견') { document.getElementById('r-rank').textContent = newTargetRank + '위'; document.getElementById('r-rank-sub').textContent = '전체 ' + searchTotal + '개 중'; document.getElementById('r-rank-sub').style.color = 'var(--color-success)'; } }
  }

  // ════════════════════════════════
  // 추적 등록
  // ════════════════════════════════
  document.getElementById('btn-track-register').addEventListener('click', function() {
    if (!lastSearchData) return; var placeId = lastSearchData._placeId; if (!placeId) { alert('Place ID가 없습니다.'); return; }
    var btn = this; btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 등록 + 수집 중...';
    var targetName = ''; if (lastSearchData.results) { for (var i = 0; i < lastSearchData.results.length; i++) { if (String(lastSearchData.results[i].id) === String(placeId)) { targetName = lastSearchData.results[i].name; break; } } } if (!targetName) targetName = lastSearchData._storeName || '';
    SherpaAPI.rank.trackCreate({ workspaceId: WORKSPACE, kind: $kind.value, keyword: lastSearchData.keyword, targetPlaceId: placeId, targetName: targetName, x: $x.value, y: $y.value, deviceType: $device.value, }).then(function(res) { return SherpaAPI.rank.collect(WORKSPACE, res.id).then(function(cr) { return { id: res.id, collected: cr.collected }; }); }).then(function(result) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-bookmark"></i> 추적 등록 + 즉시 수집'; var c = result.collected; alert('추적 등록 완료! 순위: ' + (c.targetRank ? c.targetRank + '위' : 'Top50 밖')); tabs.forEach(function(t) { t.classList.remove('is-active'); }); document.querySelector('[data-tab="tracking"]').classList.add('is-active'); document.getElementById('tab-search').style.display = 'none'; document.getElementById('tab-tracking').style.display = 'block'; loadTracks(); }).catch(function(err) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-bookmark"></i> 추적 등록 + 즉시 수집'; alert('등록/수집 실패: ' + SherpaAPI.errorMessage(err)); });
  });

  // ════════════════════════════════
  // 추적 관리
  // ════════════════════════════════
  document.getElementById('btn-refresh-tracks').addEventListener('click', loadTracks);
  var buySlotBtn = document.getElementById('btn-buy-slot');
  if (buySlotBtn) { buySlotBtn.addEventListener('click', function() { if (!confirm('추적 슬롯 1개를 1,000 눈덩이로 구매하시겠습니까?')) return; alert('슬롯 구매 기능은 준비 중입니다.'); }); }

  function updateSlotInfo(trackCount) { var maxSlots = planCfg.trackSlots; document.getElementById('slot-used').textContent = trackCount; document.getElementById('slot-max').textContent = maxSlots; document.getElementById('slot-remain-text').textContent = '슬롯 ' + trackCount + '/' + maxSlots + ' 사용 중'; if (planCfg.canBuySlot && trackCount >= maxSlots) { document.getElementById('btn-buy-slot').style.display = ''; } else { document.getElementById('btn-buy-slot').style.display = 'none'; } var regBtn = document.getElementById('btn-track-register'); if (regBtn && trackCount >= maxSlots) { regBtn.disabled = true; regBtn.title = '추적 슬롯이 부족합니다. (' + planCfg.label + ': 최대 ' + maxSlots + '개)'; } }

  function loadTracks() {
    var list = document.getElementById('track-list');
    list.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner"></i> 불러오는 중...</div>';
    hide('track-empty'); hide('snapshot-area'); hide('rank-chart-area');
    SherpaAPI.rank.tracks(WORKSPACE).then(function(res) { var tracks = res.tracks || []; updateSlotInfo(tracks.length); if (tracks.length === 0) { list.innerHTML = ''; show('track-empty'); return; } list.innerHTML = ''; var chain = Promise.resolve(); tracks.forEach(function(tr) { chain = chain.then(function() { return renderTrackItem(tr, list); }); }); }).catch(function(err) { list.innerHTML = '<div style="padding:20px;color:var(--color-danger);text-align:center;font-size:13px;">'+SherpaAPI.errorMessage(err)+'</div>'; });
  }

  function renderTrackItem(track, container) {
    var kl = KIND_LABELS[track.kind] || track.kind; var item = document.createElement('div'); item.className = 'track-item';
    item.innerHTML = '<div class="track-header"><div><div class="track-keyword">['+esc(kl)+'] '+esc(track.keyword)+'</div><div class="track-meta">PID: '+esc(track.target_place_id)+(track.target_name?' | '+esc(track.target_name):'')+' | 최근 30일</div></div><div class="track-actions"><button class="track-btn btn-collect"><i class="fa-solid fa-arrows-rotate"></i> 수집</button><button class="track-btn track-btn-danger btn-delete"><i class="fa-solid fa-trash"></i></button></div></div><div class="mini-mount"></div>';
    container.appendChild(item);
    item.querySelector('.btn-collect').addEventListener('click', function() { var btn = this; btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; SherpaAPI.rank.collect(WORKSPACE, track.id).then(function(res) { var c = res.collected; alert(c.skipped ? '오늘 이미 수집됨 ('+c.baseDate+')' : '수집 완료! 순위: '+(c.targetRank?c.targetRank+'위':'미발견')); loadTracks(); }).catch(function(err) { alert('수집 실패: '+SherpaAPI.errorMessage(err)); btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> 수집'; }); });
    item.querySelector('.btn-delete').addEventListener('click', function() { if (!confirm('이 추적을 삭제하시겠습니까?')) return; SherpaAPI.rank.trackDelete(WORKSPACE, track.id).then(loadTracks).catch(function(err) { alert('삭제 실패: '+SherpaAPI.errorMessage(err)); }); });
    var mount = item.querySelector('.mini-mount');
    return SherpaAPI.rank.timeline(WORKSPACE, track.id, 30).then(function(res) { var tl = res.timeline || []; if (tl.length === 0) { mount.innerHTML = '<div style="margin-top:8px;font-size:11px;color:var(--color-gray-400);">수집된 데이터가 없습니다.</div>'; return; } renderMiniTimeline(track, tl, mount); renderRankChart(track, tl); }).catch(function(err) { mount.innerHTML = '<div style="margin-top:8px;font-size:11px;color:var(--color-danger);">타임라인 로드 실패</div>'; });
  }

  function renderMiniTimeline(track, timeline, container) {
    var wrap = document.createElement('div'); wrap.className = 'mini-wrap'; var grid = document.createElement('div'); grid.className = 'mini-grid';
    timeline.forEach(function(row) { var cell = document.createElement('div'); cell.className = 'mini-cell'; cell.dataset.date = row.date; var rankText = row.targetRank == null ? 'OUT' : String(row.targetRank); cell.innerHTML = '<div class="mini-date">'+fmtDateLabel(row.date)+'</div><div class="mini-rank'+(row.targetRank==null?' mini-out':'')+'">'+rankText+fmtRankDelta(row.rankDelta)+'</div><div class="mini-metric"><b>블</b> '+(row.blogCount==null?'-':comma(row.blogCount))+'<br><b>방</b> '+(row.visitorCount==null?'-':comma(row.visitorCount))+'</div>'; cell.addEventListener('click', function() { var cells = grid.querySelectorAll('.mini-cell'); for (var i = 0; i < cells.length; i++) cells[i].classList.remove('active'); cell.classList.add('active'); loadSnapshot(track.id, row.date, track.target_place_id, track.target_name); }); grid.appendChild(cell); });
    wrap.appendChild(grid); container.appendChild(wrap); if (timeline.length > 0) grid.querySelector('.mini-cell').click();
  }

  function renderRankChart(track, timeline) {
    show('rank-chart-area'); document.getElementById('rank-chart-title').textContent = track.keyword + (track.target_name ? ' - ' + track.target_name : '');
    var reversed = timeline.slice().reverse(); var maxRank = 1; reversed.forEach(function(t) { if (t.targetRank != null && t.targetRank > maxRank) maxRank = t.targetRank; });
    var yMax = maxRank <= 10 ? 10 : maxRank <= 20 ? 20 : maxRank <= 30 ? 30 : 50;
    if (rankTrendChart) rankTrendChart.destroy();
    rankTrendChart = new Chart(document.getElementById('chart-rank-trend'), { type: 'line', data: { labels: reversed.map(function(t) { return t.date.slice(5); }), datasets: [{ label: '순위', data: reversed.map(function(t) { return t.targetRank; }), borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,0.06)', fill: true, tension: 0.3, pointRadius: 3, pointBackgroundColor: '#2563EB', borderWidth: 2, spanGaps: false }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { reverse: true, min: 1, max: yMax, ticks: { stepSize: yMax<=10?1:yMax<=20?2:5, font:{size:10}, callback:function(v){return Number.isInteger(v)?v+'위':'';} }, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } }, plugins: { legend: { display: false } } } });
  }

  function loadSnapshot(trackId, date, targetPlaceId, targetName) {
    show('snapshot-area'); document.getElementById('snap-title').textContent = '스냅샷: ' + date; document.getElementById('snap-sub').textContent = '로딩중...'; document.getElementById('snap-body').innerHTML = ''; document.getElementById('snap-target-note').style.display = 'none'; document.getElementById('snap-blur-notice').style.display = 'none';
    SherpaAPI.rank.snapshot(WORKSPACE, trackId, date).then(function(data) {
      if (!data.snapshot) { document.getElementById('snap-sub').textContent = '해당 날짜 데이터가 없습니다.'; return; }
      var snap = data.snapshot; var items = data.items || [];
      document.getElementById('snap-sub').textContent = '대상 순위: '+(snap.target_rank==null?'Top50 밖':snap.target_rank+'위')+' | 전일: '+(data.prevDate||'-')+' | 업체 수: '+items.length;
      var isBlur = planCfg.snapshotBlur; var snapTable = document.getElementById('snap-table');
      if (isBlur) { document.getElementById('snap-blur-notice').style.display = ''; snapTable.className = 'rank-table snapshot-blur'; } else { snapTable.className = 'rank-table'; }
      var targetFound = false; var body = document.getElementById('snap-body'); body.innerHTML = '';
      items.forEach(function(it) { if (it.isTarget) targetFound = true; var tr = document.createElement('tr'); if (it.isTarget) tr.className = 'rank-highlight'; tr.innerHTML = '<td><span class="rank-num '+rankBadge(it.rank)+'">'+it.rank+'</span>'+fmtRankDelta(it.delta?it.delta.rankDelta:null)+'</td><td><div style="font-weight:600;color:var(--color-gray-900);font-size:12px;">'+esc(it.name||'-')+(it.isTarget?' <span class="snap-pill">대상</span>':'')+'</div><div style="font-size:10px;color:var(--color-gray-400);">'+esc(it.place_id)+'</div></td><td>'+esc(it.category||it.businessCategory||'-')+'</td><td>'+comma(it.blog_count||0)+fmtMetricDelta(it.delta?it.delta.blogDelta:null)+'</td><td>'+comma(it.visitor_count||0)+fmtMetricDelta(it.delta?it.delta.visitorDelta:null)+'</td><td>'+(it.score||'-')+'</td><td>'+comma(it.save_count||0)+fmtMetricDelta(it.delta?it.delta.saveDelta:null)+'</td><td>'+comma(it.image_count||0)+fmtMetricDelta(it.delta?it.delta.imgDelta:null)+'</td>'; body.appendChild(tr); });
      var note = document.getElementById('snap-target-note'); if (!targetFound && targetPlaceId) { note.style.display = ''; note.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> 대상 업체 (PID: '+esc(targetPlaceId)+(targetName?' / '+esc(targetName):'')+')가 이 날짜 Top50에 포함되지 않았습니다.'; }
    }).catch(function(err) { document.getElementById('snap-sub').textContent = '로드 실패: '+SherpaAPI.errorMessage(err); });
  }

  var overlay = document.getElementById('sidebar-overlay');
  if (overlay) { overlay.addEventListener('click', function() { if (window.SidebarModule) window.SidebarModule.closeSidebar(); }); }

})();
