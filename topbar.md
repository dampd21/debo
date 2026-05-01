analysis_export.pdf
10개 파일 / 33페이지
인쇄 / PDF 저장
[File] Sherpa-in.com-main/frontend/app/community/board.html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sherpain21 - 커뮤니티</title>
  <link rel="stylesheet" href="/src/css/app.css">
  <link rel="stylesheet" href="/src/css/community.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all
.min.css">
</head>
<body>

  <!-- Main Wrapper -->
  <div class="main-wrapper">
    
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <a href="/app/dashboard.html" class="sidebar-logo">
        <div class="logo-mark">S</div>
        <span style="color: #f1f5f9;">Sherpain</span>
      </a>
      
      <div class="sidebar-profile-box">
        <div class="profile-top">
          <div class="profile-avatar"><i class="fa-solid fa-user"></i></div>
          <div class="profile-info">
            <span class="profile-name">홍길동 님</span>
            <div class="profile-badges">
              <span class="plan-badge">PRO 플랜</span>
            </div>
          </div>
        </div>
        <div class="token-balance">
          보유 토큰 <strong>1,250</strong> TK
        </div>
        <div class="account-menu">
          <a href="/app/settings/api" class="account-item"><i class="fa-solid fa-gear"></i> 설정
 (API/플레이스)</a>
          <a href="/app/settings/billing" class="account-item"><i class="fa-solid fa-credit-card
"></i> 결제 및 구독</a>
          <a href="/app/settings/profile" class="account-item"><i class="fa-solid fa-user-pen"><
/i> 정보 수정</a>
        </div>
      </div>

      <!-- Categories -->
      <div class="sidebar-category">
        <div class="category-title">홈</div>
        <ul class="sidebar-menu">
          <li><a href="/app/dashboard.html" class="sidebar-item"><i class="fa-solid fa-house ite
m-icon"></i> <span class="item-text">대시보드</span></a></li>
        </ul>
      </div>

      <div class="sidebar-category">
        <div class="category-title">바로가기</div>
        <ul class="sidebar-menu">
          <li><a href="/app/community/board.html" class="sidebar-item is-active"><i class="fa-so
lid fa-comments item-icon"></i> <span class="item-text">커뮤니티</span></a></li>
          <li><a href="/app/escrow/missions.html" class="sidebar-item"><i class="fa-solid fa-han
dshake item-icon"></i> <span class="item-text">모집 및 의뢰</span></a></li>
        </ul>
      </div>
      
      <div style="height: 100px;"></div>
    </aside>

    <!-- Right Wrapper -->
    <div class="right-wrapper">
      
      <!-- Top Navigation Bar -->
      <nav class="topbar">
        <button id="toggle-sidebar" class="toggle-sidebar-btn" title="메뉴 접기">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="topbar-nav">
          <div class="nav-dropdown-wrap">
            <a href="/app/community/board.html" class="top-menu-link active highlight-nav">커뮤
니티 <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
1 / 33
[File] Sherpa-in.com-main/frontend/app/community/board.html (continued)
            <div class="nav-dropdown nav-dropdown-2col">
              <a href="/app/community/board.html?tab=notice">공지사항</a>
              <a href="/app/community/board.html?tab=greeting">가입인사</a>
              <a href="/app/community/board.html?tab=attendance">출석체크</a>
              <a href="/app/community/board.html?tab=free">자유게시판</a>
              <a href="/app/community/board.html?tab=share">정보공유</a>
              <a href="/app/community/board.html?tab=logic">로직분석 연구실</a>
            </div>
          </div>
          
          <div class="nav-dropdown-wrap">
            <a href="/app/partner/services.html" class="top-menu-link">제휴사 및 자유홍보 <i cla
ss="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/partner/services.html#premium">공식 제휴 파트너사</a>
              <a href="/app/partner/services.html#promo">자유홍보 게시판</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/escrow/missions.html" class="top-menu-link">모집 및 의뢰 <i class="fa-
solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/escrow/missions.html?tab=recruit">모집 (의뢰하기)</a>
              <a href="/app/escrow/missions.html?tab=apply">의뢰 (수행하기)</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/inquiry.html" class="top-menu-link">프로그램 문의 <i class="fa
-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/inquiry.html?tab=usage">사용 오류/방법 문의</a>
              <a href="/app/support/inquiry.html?tab=feature">기능 건의</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/cs.html" class="top-menu-link">고객센터 <i class="fa-solid fa-
chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/cs.html?tab=faq">자주 묻는 질문 (FAQ)</a>
              <a href="/app/support/cs.html?tab=qna">Q&A 게시판</a>
              <a href="/app/support/cs.html?tab=1on1">1:1 문의 내역</a>
              <a href="https://open.kakao.com/..." target="_blank" style="color: #ca8a04;">카카
오톡 실시간 상담</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content Area -->
      <main class="content">
        <div class="page-header" style="display: none;"></div>

        <div class="community-container">
          
          <!-- 상단 배너 (Primary Color 통일) -->
          <div class="sponsor-banner" style="background: linear-gradient(135deg, var(--primary) 
0%, var(--accent) 100%);">
            <div class="sponsor-content">
              <h2>회원들과 마케팅 인사이트를 공유하고 소통하세요.</h2>
              <p>추후 이 공간에 월단위 배너 광고 및 스폰서십 게시물이 노출될 예정입니다.</p>
            </div>
            <button class="btn btn-sponsor" style="background-color: #fff; color: var(--primary)
;">광고 문의하기</button>
          </div>

          <!-- 게시판 영역 -->
          <div class="board-area">
            
            <div class="board-tabs page-tabs" id="community-tab-list">
              <button class="page-tab is-active nav-item" data-board="notice">공지사항</button>
              <button class="page-tab nav-item" data-board="greeting">가입인사</button>
              <button class="page-tab nav-item" data-board="attendance" style="color: var(--prim
ary); font-weight: 700;">출석체크</button>
              <button class="page-tab nav-item" data-board="free">자유게시판</button>
              <button class="page-tab nav-item" data-board="share">정보공유</button>
              <button class="page-tab nav-item" data-board="logic">로직분석 연구실</button>
            </div>
2 / 33
[File] Sherpa-in.com-main/frontend/app/community/board.html (continued)
            <!-- 컨트롤 바 -->
            <div class="board-controls" style="padding: 16px 24px;">
              <div class="board-title-group">
                <h3 id="board-title" style="font-size:18px; font-weight:700; color:#1e293b; marg
in-bottom:4px;">공지사항</h3>
                <p id="board-desc" style="font-size:13px; color:#6b7280; margin:0;">셰르파-인의 
새로운 업데이트와 소식을 확인하세요.</p>
              </div>
              
              <div class="action-group" id="board-action-group">
                <div class="search-field search-box">
                  <input type="text" class="search-input" placeholder="검색어 입력" style="borde
r:none; padding:8px; box-shadow:none;">
                  <i class="fa-solid fa-magnifying-glass" style="color:#9ca3af;"></i>
                </div>
                <button class="btn btn-write" id="btn-open-modal">글쓰기</button>
              </div>
            </div>

            <!-- 일반 게시판 리스트 -->
            <table class="data-table" id="view-board">
              <thead>
                <tr>
                  <th style="width: 60px; text-align: center;">No</th>
                  <th>제목</th>
                  <th style="width: 120px;">작성자</th>
                  <th style="width: 100px; text-align: center;">작성일</th>
                  <th style="width: 80px; text-align: right;">조회수</th>
                </tr>
              </thead>
              <tbody id="board-list-body">
                <tr class="rank-row-highlight">
                  <td style="text-align: center; color: var(--primary); font-weight:700;">공지</
td>
                  <td class="rank-name">Sherpain 2.0 업데이트 및 에스크로 모집 안내</td>
                  <td>운영자</td>
                  <td style="text-align: center; color: #6b7280; font-size:12px;">2024.11.20</td
>
                  <td style="text-align: right; color: #6b7280; font-size:12px;">1,420</td>
                </tr>
              </tbody>
            </table>

            <!-- 출석체크 전용 UI -->
            <div class="attendance-area" id="view-attendance" style="display: none; padding: 24p
x;">
              <form class="search-row-aligned" id="form-attendance" style="margin-bottom: 24px;"
>
                <div class="search-field">
                  <input type="text" class="search-input" id="attendance-input" placeholder="오
늘의 출석 체크 인사말을 가볍게 남겨주세요!" required autocomplete="off">
                </div>
                <button type="submit" class="btn" id="btn-submit-attendance">출석하기</button>
              </form>

              <table class="data-table">
                <thead>
                  <tr>
                    <th style="width: 60px; text-align: center;">No</th>
                    <th>내용 (인사말)</th>
                    <th style="width: 120px;">작성자</th>
                    <th style="width: 100px; text-align: center;">작성일</th>
                  </tr>
                </thead>
                <tbody id="attendance-list-body">
                  <tr>
                    <td style="text-align: center; color:#6b7280; font-size:12px;">2</td>
                    <td class="rank-name">오늘 하루도 화이팅입니다! 좋은 정보 많이 얻어가요~</td
>
                    <td>강남맛집사장</td>
                    <td style="text-align: center; color: #6b7280; font-size:12px;">방금 전</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; color:#6b7280; font-size:12px;">1</td>
                    <td class="rank-name">출석체크 완료! 다들 로직 변동 대비 잘 하고 계신가요?</
td>
                    <td>마케터A</td>
                    <td style="text-align: center; color: #6b7280; font-size:12px;">10분 전</td>
                  </tr>
3 / 33
[File] Sherpa-in.com-main/frontend/app/community/board.html (continued)
                </tbody>
              </table>
            </div> <!-- end view-attendance -->

          </div> <!-- end board-area -->
        </div> <!-- end community-container -->
      </main>
    </div> <!-- end right-wrapper -->
  </div> <!-- end main-wrapper -->

  <!-- 게시글 작성 모달 -->
  <div class="modal-overlay" id="board-modal">
    <div class="modal-content" style="max-width: 800px; background: #fff; border-radius: 12px; b
ox-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
      <div class="card-header" style="padding: 20px 24px;">
        <h3 style="font-size:18px;"><i class="fa-solid fa-pen-to-square"></i> 게시글 작성</h3>
        <button type="button" class="btn-close" id="btn-close-modal" style="background:none; bor
der:none; font-size:20px; cursor:pointer; color:#9ca3af;">&times;</button>
      </div>
      
      <form id="form-write-board" style="display: flex; flex-direction: column;">
        <div class="card-body" style="display: flex; flex-direction: column; gap: 16px; padding:
 24px;">
          
          <div class="search-field">
            <label class="search-label" for="board_category">게시판 선택</label>
            <select class="search-select" id="board_category" required>
              <option value="greeting">가입인사</option>
              <option value="free">자유게시판</option>
              <option value="share">정보공유</option>
              <option value="logic">로직분석 연구실</option>
            </select>
          </div>

          <div class="search-field">
            <label class="search-label" for="board_title">제목</label>
            <input type="text" class="search-input" id="board_title" placeholder="제목을 입력해 
주세요." required>
          </div>

          <div class="search-field">
            <label class="search-label" for="board_content">본문 내용</label>
            <textarea class="kw-textarea" id="board_content" rows="12" placeholder="운영 원칙에 
위배되는 게시물은 예고 없이 삭제될 수 있습니다." required></textarea>
          </div>
        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #f3f4f6; display: flex; justify-co
ntent: flex-end; gap: 10px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          <button type="button" class="btn" style="background: #fff; color: #4b5563; border: 1px
 solid #d1d5db;" id="btn-cancel-modal">취소</button>
          <button type="submit" class="btn" id="btn-submit-board">등록하기</button>
        </div>
      </form>
    </div>
  </div>

  <script type="module" src="/src/js/sidebar.js"></script>
  <script type="module" src="/src/js/community.js"></script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b
.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9f0b32277cf2a7c6',t:'MTc3NjkyOTc
3Mg=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/ma
in.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[
0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1
;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibili
ty='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.a
ddEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystate
change||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyStat
e&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
4 / 33
[File] Sherpa-in.com-main/frontend/app/escrow/missions.html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sherpain21 - 모집 및 의뢰</title>
  <link rel="stylesheet" href="/src/css/app.css">
  <link rel="stylesheet" href="/src/css/escrow.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all
.min.css">
</head>
<body>

  <div class="main-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <a href="/app/dashboard.html" class="sidebar-logo">
        <div class="logo-mark">S</div>
        <span style="color: #f1f5f9;">Sherpain</span>
      </a>
      
      <div class="sidebar-profile-box">
        <div class="profile-top">
          <div class="profile-avatar"><i class="fa-solid fa-user"></i></div>
          <div class="profile-info">
            <span class="profile-name">홍길동 님</span>
            <div class="profile-badges">
              <span class="plan-badge">PRO 플랜</span>
            </div>
          </div>
        </div>
        <div class="token-balance">
          보유 토큰 <strong>1,250</strong> TK
        </div>
        <div class="account-menu">
          <a href="/app/settings/api" class="account-item"><i class="fa-solid fa-gear"></i> 설정
 (API/플레이스)</a>
          <a href="/app/settings/billing" class="account-item"><i class="fa-solid fa-credit-card
"></i> 결제 및 구독</a>
          <a href="/app/settings/profile" class="account-item"><i class="fa-solid fa-user-pen"><
/i> 정보 수정</a>
        </div>
      </div>

      <!-- Categories -->
      <div class="sidebar-category">
        <div class="category-title">홈</div>
        <ul class="sidebar-menu">
          <li><a href="/app/dashboard.html" class="sidebar-item"><i class="fa-solid fa-house ite
m-icon"></i> <span class="item-text">대시보드</span></a></li>
        </ul>
      </div>

      <div class="sidebar-category">
        <div class="category-title">바로가기</div>
        <ul class="sidebar-menu">
          <li><a href="/app/community/board.html" class="sidebar-item"><i class="fa-solid fa-com
ments item-icon"></i> <span class="item-text">커뮤니티</span></a></li>
          <li><a href="/app/escrow/missions.html" class="sidebar-item is-active"><i class="fa-so
lid fa-handshake item-icon"></i> <span class="item-text">모집 및 의뢰</span></a></li>
        </ul>
      </div>
      
      <div style="height: 100px;"></div>
    </aside>

    <!-- Right Wrapper -->
    <div class="right-wrapper">
      
      <!-- Top Navigation Bar -->
      <nav class="topbar">
        <button id="toggle-sidebar" class="toggle-sidebar-btn" title="메뉴 접기">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="topbar-nav">
          <div class="nav-dropdown-wrap">
            <a href="/app/community/board.html" class="top-menu-link">커뮤니티 <i class="fa-soli
d fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown nav-dropdown-2col">
              <a href="/app/community/board.html?tab=notice">공지사항</a>
5 / 33
[File] Sherpa-in.com-main/frontend/app/escrow/missions.html (continued)
              <a href="/app/community/board.html?tab=greeting">가입인사</a>
              <a href="/app/community/board.html?tab=attendance">출석체크</a>
              <a href="/app/community/board.html?tab=free">자유게시판</a>
              <a href="/app/community/board.html?tab=share">정보공유</a>
              <a href="/app/community/board.html?tab=logic">로직분석 연구실</a>
            </div>
          </div>
          
          <div class="nav-dropdown-wrap">
            <a href="/app/partner/services.html" class="top-menu-link">제휴사 및 자유홍보 <i cla
ss="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/partner/services.html#premium">공식 제휴 파트너사</a>
              <a href="/app/partner/services.html#promo">자유홍보 게시판</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/escrow/missions.html" class="top-menu-link active highlight-nav">모집 
및 의뢰 <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/escrow/missions.html?tab=recruit">모집 (의뢰하기)</a>
              <a href="/app/escrow/missions.html?tab=apply">의뢰 (수행하기)</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/inquiry.html" class="top-menu-link">프로그램 문의 <i class="fa
-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/inquiry.html?tab=usage">사용 오류/방법 문의</a>
              <a href="/app/support/inquiry.html?tab=feature">기능 건의</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/cs.html" class="top-menu-link">고객센터 <i class="fa-solid fa-
chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/cs.html?tab=faq">자주 묻는 질문 (FAQ)</a>
              <a href="/app/support/cs.html?tab=qna">Q&A 게시판</a>
              <a href="/app/support/cs.html?tab=1on1">1:1 문의 내역</a>
              <a href="https://open.kakao.com/..." target="_blank" style="color: #ca8a04;">카카
오톡 실시간 상담</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content Area -->
      <main class="content">
        <div class="page-header" style="margin-bottom: 24px;">
          <div>
            <h1 class="page-title">모집 및 의뢰 (에스크로)</h1>
            <p class="page-desc">안전한 토큰 예치 기반으로 마케팅 미션을 등록하거나 수행해 보세
요.</p>
          </div>
        </div>

        <div class="escrow-container">
          
          <!-- 1. 컨트롤 바 (dampd21 스타일 카드) -->
          <div class="card" style="margin-bottom: 0;">
            <div class="card-header" style="justify-content: flex-start; gap: 16px; border-botto
m: none;">
              <button class="btn" style="background:#4A6CF7; padding:6px 14px; font-size:12px;">
전체 미션</button>
              <button class="btn btn-outline" style="background:#f3f4f6; color:#6b7280; padding:
6px 14px; font-size:12px; border:none;">모집중</button>
              <button class="btn btn-outline" style="background:#f3f4f6; color:#6b7280; padding:
6px 14px; font-size:12px; border:none;">내가 등록한 의뢰</button>
              
              <div style="margin-left: auto; display: flex; gap: 10px;">
                <input type="text" class="search-input" placeholder="업종, 지역 등 검색" style="
width:200px; padding:8px 12px; font-size:12px; border:1px solid #d1d5db; border-radius:6px;">
                <button class="btn" id="btn-open-modal" style="background: linear-gradient(135de
g, #10b981, #059669); padding:8px 16px; font-size:12px;"><i class="fa-solid fa-plus"></i> 미션 
등록하기</button>
              </div>
            </div>
6 / 33
[File] Sherpa-in.com-main/frontend/app/escrow/missions.html (continued)
          </div>

          <!-- 2. 미션 리스트 그리드 -->
          <div class="stat-grid stat-grid-3" id="mission-list" style="margin-bottom: 20px;">
            
            <!-- [카드 1] 모집중 -->
            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; curso
r: pointer;">
              <div class="card-header" style="background:#f9fafb;">
                <h3 style="color:#0ea5e9; font-size:12px;">블로그 체험단</h3>
                <span class="badge" style="background:#e0f2fe; color:#0284c7;">모집중</span>
              </div>
              <div class="card-body" style="flex:1;">
                <h3 class="rank-name" style="font-size:15px; margin-bottom:12px;">[강남구 맛집] 
방문 후 블로그 포스팅 작성해주실 분</h3>
                <p style="font-size:13px; color:#4b5563; line-height:1.6; margin-bottom:16px;">
식사권(5만원 상당) 제공 및 리뷰 작성 보상금 토큰 지급. 1일 1,000명 이상 방문자 블로거 우대합니다
.</p>
                <div style="font-size:12px; color:#9ca3af; font-weight:600; margin-bottom:8px;">
조회 142 · 1시간 전 등록</div>
              </div>
              <div style="padding: 16px 20px; border-top: 1px dashed #e5e7eb; display: flex; jus
tify-content: space-between; align-items: center; background:#fafbfc;">
                <span style="font-size:12px; color:#6b7280; font-weight:600;">보상 토큰</span>
                <span class="stat-value" style="color:#4A6CF7; font-size:20px;">5,000<span style
="font-size:12px; color:#9ca3af;"> TK</span></span>
              </div>
            </div>

            <!-- [카드 2] 진행중 (is-locked) -->
            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; opaci
ty: 0.7;" title="이미 누군가 수행 중인 미션입니다.">
              <div class="card-header" style="background:#f9fafb;">
                <h3 style="color:#10b981; font-size:12px;">영수증 리뷰</h3>
                <span class="badge" style="background:#fef9c3; color:#ca8a04;">진행중</span>
              </div>
              <div class="card-body" style="flex:1;">
                <h3 class="rank-name" style="font-size:15px; margin-bottom:12px;">수원 카페 포토
 영수증 리뷰어 (사진 제공)</h3>
                <p style="font-size:13px; color:#4b5563; line-height:1.6; margin-bottom:16px;">
제공해드리는 영수증과 커피 사진을 바탕으로 정성스러운 리뷰 작성 부탁드립니다.</p>
                <div style="font-size:12px; color:#9ca3af; font-weight:600; margin-bottom:8px;">
수행자 배정 완료 · 어제 등록</div>
              </div>
              <div style="padding: 16px 20px; border-top: 1px dashed #e5e7eb; display: flex; jus
tify-content: space-between; align-items: center; background:#fafbfc;">
                <span style="font-size:12px; color:#6b7280; font-weight:600;">보상 토큰</span>
                <span class="stat-value" style="color:#4A6CF7; font-size:20px;">1,500<span style
="font-size:12px; color:#9ca3af;"> TK</span></span>
              </div>
            </div>

          </div> <!-- end grid -->

        </div>
      </main>
    </div> <!-- end right-wrapper -->
  </div> <!-- end main-wrapper -->

  <!-- ==========================================
       미션 등록 모달 (dampd21 스타일 적용)
       ========================================== -->
  <div class="modal-overlay" id="mission-modal">
    <div class="modal-content" style="max-width: 600px; background: #fff; border-radius: 12px; b
ox-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
      <div class="card-header" style="padding: 20px 24px;">
        <h3 style="font-size:18px;"><i class="fa-solid fa-plus-circle"></i> 신규 미션 등록 (토큰
 예치)</h3>
        <button type="button" class="btn-close" id="btn-close-modal" style="background:none; bor
der:none; font-size:20px; cursor:pointer; color:#9ca3af;">&times;</button>
      </div>
      
      <form id="form-create-mission" style="display: flex; flex-direction: column;">
        <div class="card-body" style="display: flex; flex-direction: column; gap: 16px; padding:
 24px;">
          
          <div class="search-field">
            <label class="search-label" for="mission_category">미션 유형</label>
            <select class="search-select" id="mission_category" required>
              <option value="">유형을 선택하세요</option>
7 / 33
[File] Sherpa-in.com-main/frontend/app/escrow/missions.html (continued)
              <option value="영수증 리뷰">영수증 리뷰 배포</option>
              <option value="블로그 체험단">블로그/카페 배포</option>
            </select>
          </div>

          <div class="search-field">
            <label class="search-label" for="mission_title">미션 제목</label>
            <input type="text" class="search-input" id="mission_title" required>
          </div>

          <div class="search-field">
            <label class="search-label" for="mission_desc">상세 내용 및 가이드라인</label>
            <textarea class="kw-textarea" id="mission_desc" rows="5" required></textarea>
          </div>

          <div class="search-field">
            <label class="search-label" for="mission_reward">보상 토큰 (최소 500)</label>
            <input type="number" class="search-input" id="mission_reward" required min="500">
            <span style="font-size: 11px; color: #6b7280; margin-top: 4px;">의뢰 등록 즉시 보증
금으로 예치되며, 정산 시 수수료가 포함되어 최종 차감됩니다.</span>
            
            <div class="page-notice page-notice-warn" style="margin-top:10px; display:flex; flex
-direction:column; gap:8px; align-items:flex-start;">
              <div style="width:100%; display:flex; justify-content:space-between; font-size:12p
x;">
                <span>수행자 보상금</span>
                <strong><span id="calc-reward">0</span> TK</strong>
              </div>
              <div style="width:100%; display:flex; justify-content:space-between; font-size:12p
x;">
                <span>플랫폼 수수료 (10%)</span>
                <strong><span id="calc-fee">0</span> TK</strong>
              </div>
              <div style="width:100%; display:flex; justify-content:space-between; font-size:14p
x; font-weight:800; border-top:1px dashed #fcd34d; padding-top:8px; margin-top:4px;">
                <span style="color:#b45309;">총 예치 필요 토큰</span>
                <span style="color:#d97706;"><span id="calc-total">0</span> TK</span>
              </div>
            </div>
          </div>

        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #f3f4f6; display: flex; justify-co
ntent: flex-end; gap: 10px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          <button type="button" class="btn" style="background: #fff; color: #4b5563; border: 1px
 solid #d1d5db;" id="btn-cancel-modal">취소</button>
          <button type="submit" class="btn" id="btn-submit-mission">등록하기</button>
        </div>
      </form>
    </div>
  </div>

  <script type="module" src="/src/js/sidebar.js"></script>
  <script type="module" src="/src/js/escrow.js"></script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b
.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9f0b3248490da7c6',t:'MTc3NjkyOTc
3Nw=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/ma
in.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[
0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1
;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibili
ty='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.a
ddEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystate
change||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyStat
e&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
8 / 33
[File] Sherpa-in.com-main/frontend/app/partner/services.html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sherpain21 - 제휴사 및 자유홍보</title>
  <link rel="stylesheet" href="/src/css/app.css">
  <link rel="stylesheet" href="/src/css/services.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all
.min.css">
</head>
<body>

  <!-- Main Wrapper -->
  <div class="main-wrapper">
    
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <a href="/app/dashboard.html" class="sidebar-logo">
        <div class="logo-mark">S</div>
        <span style="color: #f1f5f9;">Sherpain</span>
      </a>
      
      <div class="sidebar-profile-box">
        <div class="profile-top">
          <div class="profile-avatar"><i class="fa-solid fa-user"></i></div>
          <div class="profile-info">
            <span class="profile-name">홍길동 님</span>
            <div class="profile-badges">
              <span class="plan-badge">PRO 플랜</span>
            </div>
          </div>
        </div>
        <div class="token-balance">
          보유 토큰 <strong>1,250</strong> TK
        </div>
        <div class="account-menu">
          <a href="/app/settings/api" class="account-item"><i class="fa-solid fa-gear"></i> 설정
 (API/플레이스)</a>
          <a href="/app/settings/billing" class="account-item"><i class="fa-solid fa-credit-card
"></i> 결제 및 구독</a>
          <a href="/app/settings/profile" class="account-item"><i class="fa-solid fa-user-pen"><
/i> 정보 수정</a>
        </div>
      </div>

      <!-- Categories -->
      <div class="sidebar-category">
        <div class="category-title">홈</div>
        <ul class="sidebar-menu">
          <li><a href="/app/dashboard.html" class="sidebar-item"><i class="fa-solid fa-house ite
m-icon"></i> <span class="item-text">대시보드</span></a></li>
        </ul>
      </div>

      <div class="sidebar-category">
        <div class="category-title">바로가기</div>
        <ul class="sidebar-menu">
          <li><a href="/app/community/board.html" class="sidebar-item"><i class="fa-solid fa-com
ments item-icon"></i> <span class="item-text">커뮤니티</span></a></li>
          <li><a href="/app/escrow/missions.html" class="sidebar-item"><i class="fa-solid fa-han
dshake item-icon"></i> <span class="item-text">모집 및 의뢰</span></a></li>
        </ul>
      </div>
      
      <div style="height: 100px;"></div>
    </aside>

    <!-- Right Wrapper -->
    <div class="right-wrapper">
      
      <!-- Top Navigation Bar -->
      <nav class="topbar">
        <button id="toggle-sidebar" class="toggle-sidebar-btn" title="메뉴 접기">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="topbar-nav">
          <div class="nav-dropdown-wrap">
            <a href="/app/community/board.html" class="top-menu-link">커뮤니티 <i class="fa-soli
d fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
9 / 33
[File] Sherpa-in.com-main/frontend/app/partner/services.html (continued)
            <div class="nav-dropdown nav-dropdown-2col">
              <a href="/app/community/board.html?tab=notice">공지사항</a>
              <a href="/app/community/board.html?tab=greeting">가입인사</a>
              <a href="/app/community/board.html?tab=attendance">출석체크</a>
              <a href="/app/community/board.html?tab=free">자유게시판</a>
              <a href="/app/community/board.html?tab=share">정보공유</a>
              <a href="/app/community/board.html?tab=logic">로직분석 연구실</a>
            </div>
          </div>
          
          <div class="nav-dropdown-wrap">
            <a href="/app/partner/services.html" class="top-menu-link active highlight-nav">제휴
사 및 자유홍보 <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></
i></a>
            <div class="nav-dropdown">
              <a href="/app/partner/services.html#premium">공식 제휴 파트너사</a>
              <a href="/app/partner/services.html#promo">자유홍보 게시판</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/escrow/missions.html" class="top-menu-link">모집 및 의뢰 <i class="fa-
solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/escrow/missions.html?tab=recruit">모집 (의뢰하기)</a>
              <a href="/app/escrow/missions.html?tab=apply">의뢰 (수행하기)</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/inquiry.html" class="top-menu-link">프로그램 문의 <i class="fa
-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/inquiry.html?tab=usage">사용 오류/방법 문의</a>
              <a href="/app/support/inquiry.html?tab=feature">기능 건의</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/cs.html" class="top-menu-link">고객센터 <i class="fa-solid fa-
chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/cs.html?tab=faq">자주 묻는 질문 (FAQ)</a>
              <a href="/app/support/cs.html?tab=qna">Q&A 게시판</a>
              <a href="/app/support/cs.html?tab=1on1">1:1 문의 내역</a>
              <a href="https://open.kakao.com/..." target="_blank" style="color: #ca8a04;">카카
오톡 실시간 상담</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content Area -->
      <main class="content">
        <div class="page-header" style="margin-bottom: 24px;">
          <div>
            <h1 class="page-title">제휴사 서비스 및 자유홍보</h1>
            <p class="page-desc">셰르파-인과 공식 계약을 맺은 전문 마케팅 대행사들의 서비스입니
다.</p>
          </div>
        </div>

        <div class="service-container">
          
          <!-- 1. 제휴사 서비스 카탈로그 (dampd21 카드 스타일) -->
          <div class="stat-grid stat-grid-3" id="premium">
            
            <!-- 제휴사 카드 1 (활성화) -->
            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column;">
              <div class="card-header" style="background:#f9fafb;">
                <h3 style="color:#4A6CF7;"><i class="fa-solid fa-handshake"></i> 올스 (ALLS) <sp
an class="badge" style="background:#4A6CF7; color:#fff; margin-left:8px;">공식</span></h3>
              </div>
              <div class="card-body" style="flex:1;">
                <p style="font-size:13px; color:#4b5563; line-height:1.6; margin-bottom:16px;">
네이버 블로그 상위노출 및 일반 배포, 영수증 리뷰 트래픽 관리를 전문으로 하는 마케팅 에이전시입니
다.</p>
                <div style="font-size:12px; color:#9ca3af; font-weight:600; margin-bottom:8px;">
블로그 배포 / 트래픽</div>
              </div>
10 / 33
[File] Sherpa-in.com-main/frontend/app/partner/services.html (continued)
              <div style="padding: 16px 20px; border-top: 1px dashed #e5e7eb; display: flex; jus
tify-content: flex-end;">
                <button class="btn" style="padding: 8px 16px; font-size:12px;">문의/신청하기</bu
tton>
              </div>
            </div>

            <!-- 제휴사 카드 2 (활성화) -->
            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column;">
              <div class="card-header" style="background:#f9fafb;">
                <h3 style="color:#10b981;"><i class="fa-solid fa-mug-hot"></i> 고트마케팅 <span 
class="badge" style="background:#10b981; color:#fff; margin-left:8px;">공식</span></h3>
              </div>
              <div class="card-body" style="flex:1;">
                <p style="font-size:13px; color:#4b5563; line-height:1.6; margin-bottom:16px;">
맘카페, 정보성 카페 등 타겟에 맞는 자연스러운 카페 침투 바이럴 마케팅 서비스를 제공합니다.</p>
                <div style="font-size:12px; color:#9ca3af; font-weight:600; margin-bottom:8px;">
카페 바이럴</div>
              </div>
              <div style="padding: 16px 20px; border-top: 1px dashed #e5e7eb; display: flex; jus
tify-content: flex-end;">
                <button class="btn" style="background: linear-gradient(135deg, #10b981, #059669)
; padding: 8px 16px; font-size:12px;">문의/신청하기</button>
              </div>
            </div>

            <!-- 제휴사 카드 3 (잠금/준비중) -->
            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; opaci
ty:0.6;">
              <div class="card-header" style="background:#f9fafb;">
                <h3 style="color:#6b7280;"><i class="fa-solid fa-shield-halved"></i> A컴퍼니 <sp
an class="badge" style="background:#9ca3af; color:#fff; margin-left:8px;">준비중</span></h3>
              </div>
              <div class="card-body" style="flex:1;">
                <p style="font-size:13px; color:#4b5563; line-height:1.6; margin-bottom:16px;">
악성 리뷰 차단 및 블라인드 처리, 긍정 리뷰 밸런싱 등 통합 평점 관리 솔루션입니다.</p>
                <div style="font-size:12px; color:#9ca3af; font-weight:600; margin-bottom:8px;">
리뷰 블라인드 관리</div>
              </div>
              <div style="padding: 16px 20px; border-top: 1px dashed #e5e7eb; display: flex; jus
tify-content: flex-end;">
                <button class="btn" style="background: #9ca3af; cursor:not-allowed; padding: 8px
 16px; font-size:12px;" disabled>신청 불가</button>
              </div>
            </div>

          </div> <!-- end 제휴사 카탈로그 -->

          <!-- 2. 자유홍보 게시판 (dampd21 테이블 스타일 적용) -->
          <div class="card" id="promo">
            <div class="card-header">
              <h3><i class="fa-solid fa-bullhorn"></i> 자유홍보 게시판</h3>
              <div style="display:flex; align-items:center; gap:16px;">
                <span style="font-size: 12px; font-weight: 600; color: #ef4444; background: #fef
2f2; padding: 4px 10px; border-radius: 20px;" id="promo-limit-msg">오늘 무료 작성: 1/1 남음</spa
n>
                <button class="btn" id="btn-promo-write" style="padding: 6px 16px; font-size:12p
x;">홍보 글쓰기</button>
              </div>
            </div>

            <!-- 홍보글 리스트 (테이블형) -->
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 80px; text-align: center;">분류</th>
                  <th>제목</th>
                  <th style="width: 120px;">작성자</th>
                  <th style="width: 100px; text-align: center;">작성일</th>
                  <th style="width: 80px; text-align: right;">조회수</th>
                </tr>
              </thead>
              <tbody id="promo-list-body">
                <tr>
                  <td style="text-align: center;"><span class="badge" style="background:#eef2ff;
 color:#4A6CF7;">블로그</span></td>
                  <td class="rank-name">고품질 블로그 원고 작성해 드립니다 (건당 5천원)</td>
                  <td>원고대행전문</td>
                  <td style="text-align: center; color: #6b7280; font-size:12px;">10:45</td>
                  <td style="text-align: right; color: #6b7280; font-size:12px;">18</td>
11 / 33
[File] Sherpa-in.com-main/frontend/app/partner/services.html (continued)
                </tr>
                <tr>
                  <td style="text-align: center;"><span class="badge" style="background:#fef3c7;
 color:#d97706;">디자인</span></td>
                  <td class="rank-name">인스타 릴스 / 카드뉴스 기획 및 제작 대행</td>
                  <td>김디자이너</td>
                  <td style="text-align: center; color: #6b7280; font-size:12px;">어제</td>
                  <td style="text-align: right; color: #6b7280; font-size:12px;">52</td>
                </tr>
                <tr>
                  <td style="text-align: center;"><span class="badge" style="background:#fce7f3;
 color:#be185d;">당근마켓</span></td>
                  <td class="rank-name">당근마켓 소식 발행 및 단골 늘리기 패키지 특가</td>
                  <td>로컬마케터즈</td>
                  <td style="text-align: center; color: #6b7280; font-size:12px;">11.20</td>
                  <td style="text-align: right; color: #6b7280; font-size:12px;">104</td>
                </tr>
              </tbody>
            </table>
          </div> <!-- end 자유홍보 게시판 -->

        </div> <!-- end service-container -->
      </main>
    </div> <!-- end right-wrapper -->
  </div> <!-- end main-wrapper -->

  <!-- 자유홍보 글쓰기 모달 (dampd21 스타일) -->
  <div class="modal-overlay" id="promo-modal">
    <div class="modal-content" style="max-width: 600px; background: #fff; border-radius: 12px; b
ox-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
      <div class="card-header" style="padding: 20px 24px;">
        <h3 style="font-size:18px;"><i class="fa-solid fa-pen-to-square"></i> 자유홍보 글쓰기</h
3>
        <button type="button" class="btn-close" id="btn-close-modal" style="background:none; bor
der:none; font-size:20px; cursor:pointer; color:#9ca3af;">&times;</button>
      </div>
      
      <form id="form-write-promo" style="display: flex; flex-direction: column;">
        <div class="card-body" style="display: flex; flex-direction: column; gap: 16px; padding:
 24px;">
          
          <div class="page-notice page-notice-info">
            <i class="fa-solid fa-circle-info"></i>
            <div>매일 1회 무료 작성이 가능하며, 소진 후에는 건당 <strong>500 토큰</strong>이 차
감됩니다.</div>
          </div>

          <div class="search-field">
            <label class="search-label" for="promo_category">홍보 카테고리</label>
            <select class="search-select" id="promo_category" required>
              <option value="블로그">N사 블로그/카페</option>
              <option value="플레이스">N사 플레이스/리뷰</option>
              <option value="sns">인스타/스레드/유튜브</option>
              <option value="daangn">당근마켓</option>
              <option value="design">원고/디자인/촬영</option>
              <option value="other">기타 서비스</option>
            </select>
          </div>

          <div class="search-field">
            <label class="search-label" for="promo_title">홍보 제목</label>
            <input type="text" class="search-input" id="promo_title" placeholder="어떤 서비스를 
제공하시나요?" required>
          </div>

          <div class="search-field">
            <label class="search-label" for="promo_content">홍보 내용 및 연락처</label>
            <textarea class="kw-textarea" id="promo_content" rows="6" placeholder="서비스 상세 
내용과 가격, 연락 가능한 카톡 링크 등을 적어주세요." required></textarea>
          </div>
        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #f3f4f6; display: flex; justify-co
ntent: flex-end; gap: 10px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          <button type="button" class="btn" style="background: #fff; color: #4b5563; border: 1px
 solid #d1d5db;" id="btn-cancel-modal">취소</button>
          <button type="submit" class="btn" id="btn-submit-promo">무료로 등록하기</button>
        </div>
      </form>
    </div>
12 / 33
[File] Sherpa-in.com-main/frontend/app/partner/services.html (continued)
  </div>

  <script type="module" src="/src/js/sidebar.js"></script>
  <script type="module" src="/src/js/services.js"></script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b
.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9f0b32373e43a7c6',t:'MTc3NjkyOTc
3NQ=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/ma
in.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[
0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1
;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibili
ty='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.a
ddEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystate
change||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyStat
e&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
13 / 33
[File] Sherpa-in.com-main/frontend/app/support/cs.html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sherpain21 - 고객센터</title>
  <link rel="stylesheet" href="/src/css/app.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all
.min.css">
</head>
<body>

  <div class="main-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <a href="/app/dashboard.html" class="sidebar-logo">
        <div class="logo-mark">S</div>
        <span style="color: #f1f5f9;">Sherpain</span>
      </a>
      
      <div class="sidebar-profile-box">
        <div class="profile-top">
          <div class="profile-avatar"><i class="fa-solid fa-user"></i></div>
          <div class="profile-info">
            <span class="profile-name">홍길동 님</span>
            <div class="profile-badges">
              <span class="plan-badge">PRO 플랜</span>
            </div>
          </div>
        </div>
        <div class="token-balance">
          보유 토큰 <strong>1,250</strong> TK
        </div>
        <div class="account-menu">
          <a href="/app/settings/api" class="account-item"><i class="fa-solid fa-gear"></i> 설정
 (API/플레이스)</a>
          <a href="/app/settings/billing" class="account-item"><i class="fa-solid fa-credit-card
"></i> 결제 및 구독</a>
          <a href="/app/settings/profile" class="account-item"><i class="fa-solid fa-user-pen"><
/i> 정보 수정</a>
        </div>
      </div>

      <!-- Categories -->
      <div class="sidebar-category">
        <div class="category-title">홈</div>
        <ul class="sidebar-menu">
          <li><a href="/app/dashboard.html" class="sidebar-item"><i class="fa-solid fa-house ite
m-icon"></i> <span class="item-text">대시보드</span></a></li>
        </ul>
      </div>

      <div class="sidebar-category">
        <div class="category-title">바로가기</div>
        <ul class="sidebar-menu">
          <li><a href="/app/support/cs.html" class="sidebar-item is-active"><i class="fa-solid f
a-headset item-icon"></i> <span class="item-text">고객센터</span></a></li>
        </ul>
      </div>
      
      <div style="height: 100px;"></div>
    </aside>

    <!-- Right Wrapper -->
    <div class="right-wrapper">
      
      <!-- Top Navigation Bar -->
      <nav class="topbar">
        <button id="toggle-sidebar" class="toggle-sidebar-btn" title="메뉴 접기">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="topbar-nav">
          <div class="nav-dropdown-wrap">
            <a href="/app/community/board.html" class="top-menu-link">커뮤니티 <i class="fa-soli
d fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown nav-dropdown-2col">
              <a href="/app/community/board.html?tab=notice">공지사항</a>
              <a href="/app/community/board.html?tab=greeting">가입인사</a>
              <a href="/app/community/board.html?tab=attendance">출석체크</a>
              <a href="/app/community/board.html?tab=free">자유게시판</a>
14 / 33
[File] Sherpa-in.com-main/frontend/app/support/cs.html (continued)
              <a href="/app/community/board.html?tab=share">정보공유</a>
              <a href="/app/community/board.html?tab=logic">로직분석 연구실</a>
            </div>
          </div>
          
          <div class="nav-dropdown-wrap">
            <a href="/app/partner/services.html" class="top-menu-link">제휴사 및 자유홍보 <i cla
ss="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/partner/services.html#premium">공식 제휴 파트너사</a>
              <a href="/app/partner/services.html#promo">자유홍보 게시판</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/escrow/missions.html" class="top-menu-link">모집 및 의뢰 <i class="fa-
solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/escrow/missions.html?tab=recruit">모집 (의뢰하기)</a>
              <a href="/app/escrow/missions.html?tab=apply">의뢰 (수행하기)</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/inquiry.html" class="top-menu-link">프로그램 문의 <i class="fa
-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/inquiry.html?tab=usage">사용 오류/방법 문의</a>
              <a href="/app/support/inquiry.html?tab=feature">기능 건의</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/cs.html" class="top-menu-link active highlight-nav">고객센터 <
i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/cs.html?tab=faq">자주 묻는 질문 (FAQ)</a>
              <a href="/app/support/cs.html?tab=qna">Q&A 게시판</a>
              <a href="/app/support/cs.html?tab=1on1">1:1 문의 내역</a>
              <a href="https://open.kakao.com/..." target="_blank" style="color: #ca8a04;">카카
오톡 실시간 상담</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content Area -->
      <main class="content">
        <div class="page-header" style="margin-bottom: 24px; justify-content: space-between; dis
play: flex;">
          <div>
            <h1 class="page-title">고객센터</h1>
            <p class="page-desc">궁금한 점이 있으신가요? 셰르파-인이 빠르고 친절하게 안내해 드립
니다.</p>
          </div>
          <div>
            <a href="https://pf.kakao.com/your-channel-link" target="_blank" class="btn" style="
background:#ca8a04; display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-comment"></i> 카카오톡 실시간 상담
            </a>
          </div>
        </div>

        <div class="card" style="margin-bottom: 0;">
          <div class="card-header" style="padding: 16px 24px; border-bottom: none;">
            <div class="page-tabs" id="cs-tab-list" style="margin:0; border:none; display:flex; 
gap:16px;">
              <button class="page-tab is-active nav-item" data-tab="faq" style="padding:8px 0;">
자주 묻는 질문 (FAQ)</button>
              <button class="page-tab nav-item" data-tab="qna" style="padding:8px 0;">Q&A 게시판
</button>
              <button class="page-tab nav-item" data-tab="1on1" style="padding:8px 0;">나의 1:1 
문의</button>
            </div>
            
            <div style="margin-left: auto;">
              <button class="btn" id="btn-open-cs-modal" style="display:none; background: linear
-gradient(135deg, #4A6CF7, #6366f1); padding:8px 16px; font-size:12px;"><i class="fa-solid fa-pe
n"></i> 1:1 문의 작성하기</button>
            </div>
15 / 33
[File] Sherpa-in.com-main/frontend/app/support/cs.html (continued)
          </div>

          <!-- 문의글 리스트 테이블 (dampd21 스타일) -->
          <table class="data-table">
            <thead id="cs-table-head">
              <tr>
                <th style="width: 60px; text-align: center;">No</th>
                <th style="width: 100px; text-align: center;">분류</th>
                <th>질문 제목</th>
              </tr>
            </thead>
            <tbody id="cs-list-body">
              <!-- 목업 데이터 (FAQ) -->
              <tr>
                <td style="text-align: center; color: #6b7280; font-size:12px;">3</td>
                <td style="text-align: center; color: #4A6CF7; font-weight:700;">결제/환불</td>
                <td class="rank-name">PRO 요금제에서 결제 수단을 변경하고 싶습니다.</td>
              </tr>
              <tr>
                <td style="text-align: center; color: #6b7280; font-size:12px;">2</td>
                <td style="text-align: center; color: #4A6CF7; font-weight:700;">계정/로그인</td
>
                <td class="rank-name">카카오 간편 가입 후 이메일 계정과 연동할 수 있나요?</td>
              </tr>
              <tr>
                <td style="text-align: center; color: #6b7280; font-size:12px;">1</td>
                <td style="text-align: center; color: #4A6CF7; font-weight:700;">이용안내</td>
                <td class="rank-name">영수증 리뷰 모집/의뢰 시 플랫폼 수수료는 어떻게 되나요?</t
d>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div> <!-- end right-wrapper -->
  </div> <!-- end main-wrapper -->

  <!-- 1:1 문의 작성 모달 (dampd21 스타일) -->
  <div class="modal-overlay" id="cs-modal">
    <div class="modal-content" style="max-width: 600px; background: #fff; border-radius: 12px; b
ox-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
      <div class="card-header" style="padding: 20px 24px;">
        <h3 style="font-size:18px;"><i class="fa-solid fa-headset"></i> 1:1 문의 작성</h3>
        <button type="button" class="btn-close" id="btn-close-modal" style="background:none; bor
der:none; font-size:20px; cursor:pointer; color:#9ca3af;">&times;</button>
      </div>
      
      <form id="form-cs" style="display: flex; flex-direction: column;">
        <div class="card-body" style="display: flex; flex-direction: column; gap: 16px; padding:
 24px;">
          
          <div class="search-field">
            <label class="search-label" for="cs_category">문의 분류</label>
            <select class="search-select" id="cs_category" required>
              <option value="결제/환불">결제 및 환불</option>
              <option value="이용불편">이용 불편 사항</option>
              <option value="계정/회원">계정 및 탈퇴</option>
              <option value="기타">기타 문의</option>
            </select>
          </div>

          <div class="search-field">
            <label class="search-label" for="cs_title">문의 제목</label>
            <input type="text" class="search-input" id="cs_title" placeholder="제목을 입력하세요
." required>
          </div>

          <div class="search-field">
            <label class="search-label" for="cs_content">문의 내용</label>
            <textarea class="kw-textarea" id="cs_content" rows="6" placeholder="최대한 상세하게 
작성해 주시면 빠르고 정확한 답변 처리가 가능합니다." required></textarea>
          </div>

        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #f3f4f6; display: flex; justify-co
ntent: flex-end; gap: 10px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          <button type="button" class="btn" style="background: #fff; color: #4b5563; border: 1px
 solid #d1d5db;" id="btn-cancel-modal">취소</button>
16 / 33
[File] Sherpa-in.com-main/frontend/app/support/cs.html (continued)
          <button type="submit" class="btn" id="btn-submit-cs">문의 등록하기</button>
        </div>
      </form>
    </div>
  </div>

  <script type="module" src="/src/js/sidebar.js"></script>
  <script type="module" src="/src/js/cs.js"></script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b
.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9f0b32717b7aa7c6',t:'MTc3NjkyOTc
4NA=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/ma
in.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[
0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1
;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibili
ty='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.a
ddEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystate
change||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyStat
e&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
17 / 33
[File] Sherpa-in.com-main/frontend/app/support/inquiry.html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sherpain21 - 프로그램 문의</title>
  <link rel="stylesheet" href="/src/css/app.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all
.min.css">
</head>
<body>

  <!-- Main Wrapper -->
  <div class="main-wrapper">
    
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <a href="/app/dashboard.html" class="sidebar-logo">
        <div class="logo-mark">S</div>
        <span style="color: #f1f5f9;">Sherpain</span>
      </a>
      
      <div class="sidebar-profile-box">
        <div class="profile-top">
          <div class="profile-avatar"><i class="fa-solid fa-user"></i></div>
          <div class="profile-info">
            <span class="profile-name">홍길동 님</span>
            <div class="profile-badges">
              <span class="plan-badge">PRO 플랜</span>
            </div>
          </div>
        </div>
        <div class="token-balance">
          보유 토큰 <strong>1,250</strong> TK
        </div>
        <div class="account-menu">
          <a href="/app/settings/api" class="account-item"><i class="fa-solid fa-gear"></i> 설정
 (API/플레이스)</a>
          <a href="/app/settings/billing" class="account-item"><i class="fa-solid fa-credit-card
"></i> 결제 및 구독</a>
          <a href="/app/settings/profile" class="account-item"><i class="fa-solid fa-user-pen"><
/i> 정보 수정</a>
        </div>
      </div>

      <!-- Categories -->
      <div class="sidebar-category">
        <div class="category-title">홈</div>
        <ul class="sidebar-menu">
          <li><a href="/app/dashboard.html" class="sidebar-item"><i class="fa-solid fa-house ite
m-icon"></i> <span class="item-text">대시보드</span></a></li>
        </ul>
      </div>

      <div class="sidebar-category">
        <div class="category-title">바로가기</div>
        <ul class="sidebar-menu">
          <li><a href="/app/support/inquiry.html" class="sidebar-item is-active"><i class="fa-so
lid fa-headset item-icon"></i> <span class="item-text">프로그램 문의</span></a></li>
        </ul>
      </div>
      
      <div style="height: 100px;"></div>
    </aside>

    <!-- Right Wrapper -->
    <div class="right-wrapper">
      
      <!-- Top Navigation Bar -->
      <nav class="topbar">
        <button id="toggle-sidebar" class="toggle-sidebar-btn" title="메뉴 접기">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="topbar-nav">
          <div class="nav-dropdown-wrap">
            <a href="/app/community/board.html" class="top-menu-link">커뮤니티 <i class="fa-soli
d fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown nav-dropdown-2col">
              <a href="/app/community/board.html?tab=notice">공지사항</a>
              <a href="/app/community/board.html?tab=greeting">가입인사</a>
18 / 33
[File] Sherpa-in.com-main/frontend/app/support/inquiry.html (continued)
              <a href="/app/community/board.html?tab=attendance">출석체크</a>
              <a href="/app/community/board.html?tab=free">자유게시판</a>
              <a href="/app/community/board.html?tab=share">정보공유</a>
              <a href="/app/community/board.html?tab=logic">로직분석 연구실</a>
            </div>
          </div>
          
          <div class="nav-dropdown-wrap">
            <a href="/app/partner/services.html" class="top-menu-link">제휴사 및 자유홍보 <i cla
ss="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/partner/services.html#premium">공식 제휴 파트너사</a>
              <a href="/app/partner/services.html#promo">자유홍보 게시판</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/escrow/missions.html" class="top-menu-link">모집 및 의뢰 <i class="fa-
solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/escrow/missions.html?tab=recruit">모집 (의뢰하기)</a>
              <a href="/app/escrow/missions.html?tab=apply">의뢰 (수행하기)</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/inquiry.html" class="top-menu-link active highlight-nav">프로
그램 문의 <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a
>
            <div class="nav-dropdown">
              <a href="/app/support/inquiry.html?tab=usage">사용 오류/방법 문의</a>
              <a href="/app/support/inquiry.html?tab=feature">기능 건의</a>
            </div>
          </div>

          <div class="nav-dropdown-wrap">
            <a href="/app/support/cs.html" class="top-menu-link">고객센터 <i class="fa-solid fa-
chevron-down" style="font-size: 10px; margin-left: 6px;"></i></a>
            <div class="nav-dropdown">
              <a href="/app/support/cs.html?tab=faq">자주 묻는 질문 (FAQ)</a>
              <a href="/app/support/cs.html?tab=qna">Q&A 게시판</a>
              <a href="/app/support/cs.html?tab=1on1">1:1 문의 내역</a>
              <a href="https://open.kakao.com/..." target="_blank" style="color: #ca8a04;">카카
오톡 실시간 상담</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content Area -->
      <main class="content">
        <div class="page-header" style="margin-bottom: 24px;">
          <div>
            <h1 class="page-title">프로그램 문의 및 개선 제안</h1>
            <p class="page-desc">셰르파-인 사용 중 불편하신 점이나 추가를 원하시는 기능이 있다면
 언제든 말씀해 주세요.</p>
          </div>
        </div>

        <div class="card" style="margin-bottom: 0;">
          <div class="card-header" style="padding: 16px 24px; border-bottom: none;">
            <div class="page-tabs" id="inquiry-tab-list" style="margin:0; border:none; display:f
lex; gap:16px;">
              <button class="page-tab is-active nav-item" data-tab="usage" style="padding:8px 0;
">사용 오류/방법 문의</button>
              <button class="page-tab nav-item" data-tab="feature" style="padding:8px 0;">기능 
건의</button>
            </div>
            
            <div style="margin-left: auto;">
              <button class="btn" id="btn-open-inquiry" style="background: linear-gradient(135de
g, #4A6CF7, #6366f1); padding:8px 16px; font-size:12px;"><i class="fa-solid fa-pen"></i> 문의글 
작성하기</button>
            </div>
          </div>

          <!-- 문의글 리스트 테이블 (dampd21 스타일) -->
          <table class="data-table">
            <thead>
              <tr>
19 / 33
[File] Sherpa-in.com-main/frontend/app/support/inquiry.html (continued)
                <th style="width: 60px; text-align: center;">No</th>
                <th style="width: 100px; text-align: center;">상태</th>
                <th>제목</th>
                <th style="width: 100px; text-align: center;">작성일</th>
              </tr>
            </thead>
            <tbody id="inquiry-list-body">
              <!-- 목업 데이터 -->
              <tr>
                <td style="text-align: center; color: #6b7280; font-size:12px;">3</td>
                <td style="text-align: center;"><span class="badge" style="background:#fef2f2; c
olor:#ef4444; padding:3px 8px;">답변대기</span></td>
                <td class="rank-name">블로그 포스팅 이미지 업로드 에러가 납니다.</td>
                <td style="text-align: center; color: #6b7280; font-size:12px;">오늘 10:20</td>
              </tr>
              <tr>
                <td style="text-align: center; color: #6b7280; font-size:12px;">2</td>
                <td style="text-align: center;"><span class="badge" style="background:#ecfdf5; c
olor:#10b981; padding:3px 8px;">답변완료</span></td>
                <td class="rank-name">플레이스 추적 슬롯 추가 결제는 어떻게 하나요?</td>
                <td style="text-align: center; color: #6b7280; font-size:12px;">어제 14:00</td>
              </tr>
              <tr>
                <td style="text-align: center; color: #6b7280; font-size:12px;">1</td>
                <td style="text-align: center;"><span class="badge" style="background:#ecfdf5; c
olor:#10b981; padding:3px 8px;">답변완료</span></td>
                <td class="rank-name">제휴사 등록 기준이 궁금합니다.</td>
                <td style="text-align: center; color: #6b7280; font-size:12px;">2024.11.15</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div> <!-- end right-wrapper -->
  </div> <!-- end main-wrapper -->

  <!-- 문의글 작성 모달 (dampd21 스타일) -->
  <div class="modal-overlay" id="inquiry-modal">
    <div class="modal-content" style="max-width: 600px; background: #fff; border-radius: 12px; b
ox-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
      <div class="card-header" style="padding: 20px 24px;">
        <h3 style="font-size:18px;"><i class="fa-solid fa-headset"></i> 문의글 작성</h3>
        <button type="button" class="btn-close" id="btn-close-modal" style="background:none; bor
der:none; font-size:20px; cursor:pointer; color:#9ca3af;">&times;</button>
      </div>
      
      <form id="form-inquiry" style="display: flex; flex-direction: column;">
        <div class="card-body" style="display: flex; flex-direction: column; gap: 16px; padding:
 24px;">
          
          <div class="search-field">
            <label class="search-label" for="inq_category">문의 유형</label>
            <select class="search-select" id="inq_category" required>
              <option value="usage">프로그램 사용 문의 (오류/사용법)</option>
              <option value="feature">이런 기능도 넣어주세요 (기능 건의)</option>
            </select>
          </div>

          <div class="search-field">
            <label class="search-label" for="inq_title">제목</label>
            <input type="text" class="search-input" id="inq_title" placeholder="어떤 내용으로 문
의하시나요?" required>
          </div>

          <div class="search-field">
            <label class="search-label" for="inq_content">문의 상세 내용</label>
            <textarea class="kw-textarea" id="inq_content" rows="8" placeholder="상세한 내용과 
발생 시간, 오류 화면 캡처 링크 등을 남겨주시면 더 빠르고 정확한 답변이 가능합니다." required></t
extarea>
          </div>

        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #f3f4f6; display: flex; justify-co
ntent: flex-end; gap: 10px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          <button type="button" class="btn" style="background: #fff; color: #4b5563; border: 1px
 solid #d1d5db;" id="btn-cancel-modal">취소</button>
          <button type="submit" class="btn" id="btn-submit-inquiry">문의 접수하기</button>
        </div>
20 / 33
[File] Sherpa-in.com-main/frontend/app/support/inquiry.html (continued)
      </form>
    </div>
  </div>

  <script type="module" src="/src/js/sidebar.js"></script>
  <script type="module" src="/src/js/inquiry.js"></script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b
.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9f0b325c0d3aa7c6',t:'MTc3NjkyOTc
4MQ=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/ma
in.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[
0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1
;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibili
ty='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.a
ddEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystate
change||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyStat
e&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
21 / 33
[File] Sherpa-in.com-main/frontend/src/js/community.js
/**
 * Sherpain21 - Community Logic
 * 커뮤니티 게시판 탭 전환, 글쓰기 및 출석체크 처리
 */
import SherpainAPI from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.getElementById('community-tab-list');
  const boardTitle = document.getElementById('board-title');
  const boardDesc = document.getElementById('board-desc');
  const boardActionGroup = document.getElementById('board-action-group');
  
  // View 뷰 토글
  const viewBoard = document.getElementById('view-board');
  const viewAttendance = document.getElementById('view-attendance');
  const tbody = document.getElementById('board-list-body');
  
  // 탭별 정보
  const boardDataInfo = {
    notice: { title: '공지사항', desc: '셰르파-인의 새로운 업데이트와 소식을 확인하세요.' },
    greeting: { title: '가입인사', desc: '새로 오신 회원분들의 따뜻한 인사를 남겨주세요.' },
    attendance: { title: '출석체크', desc: '오늘 하루도 화이팅! 출석체크로 토큰을 획득하세요.' }
,
    free: { title: '자유게시판', desc: '마케터 및 사장님들과 자유로운 주제로 소통하세요.' },
    share: { title: '정보공유', desc: '도움이 되는 유용한 정보와 자료를 나눌 수 있습니다.' },
    logic: { title: '로직분석 연구실', desc: '네이버/구글 알고리즘 분석과 마케팅 노하우를 연구합
니다.' }
  };

  // ==============================================================
  // 1. 가로형 게시판 탭 전환 로직
  // ==============================================================
  if (tabList) {
    tabList.addEventListener('click', (e) => {
      const clickedTab = e.target.closest('.nav-item');
      if (!clickedTab) return;

      tabList.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      clickedTab.classList.add('active');

      const boardKey = clickedTab.dataset.board;
      const info = boardDataInfo[boardKey];
      
      boardTitle.textContent = info.title;
      boardDesc.textContent = info.desc;

      // 출석체크 탭 분기
      if (boardKey === 'attendance') {
        viewBoard.style.display = 'none';
        boardActionGroup.style.display = 'none';
        viewAttendance.style.display = 'block'; // 출석체크 뷰 보이기
      } else {
        viewBoard.style.display = 'table';
        boardActionGroup.style.display = 'flex';
        viewAttendance.style.display = 'none';

        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; color:#9
4a3b8;">게시글을 불러오는 중입니다...</td></tr>';
        
        setTimeout(() => {
          if (boardKey === 'notice') {
            tbody.innerHTML = `
              <tr class="notice"><td class="col-id">공지</td><td class="col-title">Sherpain 2.0 
업데이트 및 에스크로 런칭 안내</td><td class="col-author">운영자</td><td class="col-date">2024.1
1.20</td><td class="col-views">1,420</td></tr>
              <tr class="notice"><td class="col-id">공지</td><td class="col-title">[안내] 네이버
 플레이스 순위 추적 슬롯 확장 프로모션</td><td class="col-author">운영자</td><td class="col-date
">2024.11.15</td><td class="col-views">852</td></tr>
            `;
          } else {
            tbody.innerHTML = `
              <tr><td class="col-id">5</td><td class="col-title">${info.title} 첫 번째 게시글입
니다.</td><td class="col-author">홍길동</td><td class="col-date">방금 전</td><td class="col-view
s">0</td></tr>
              <tr><td class="col-id">4</td><td class="col-title">도움이 되는 글이라 추천합니다!<
/td><td class="col-author">마케팅초보</td><td class="col-date">어제</td><td class="col-views">42
</td></tr>
            `;
          }
        }, 300);
22 / 33
[File] Sherpa-in.com-main/frontend/src/js/community.js (continued)
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && boardDataInfo[tabParam]) {
      const targetTab = document.querySelector(`.nav-item[data-board="${tabParam}"]`);
      if (targetTab) targetTab.click();
    } else {
      const initTab = document.querySelector('.nav-item[data-board="notice"]');
      if (initTab) initTab.click();
    }
  }

  // ==============================================================
  // 2. 출석체크 폼 제출 로직 (테이블 렌더링 방식)
  // ==============================================================
  const formAttendance = document.getElementById('form-attendance');
  const attendanceInput = document.getElementById('attendance-input');
  const attendanceListBody = document.getElementById('attendance-list-body');

  if (formAttendance) {
    formAttendance.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const content = attendanceInput.value.trim();
      if (!content) return;

      const submitBtn = document.getElementById('btn-submit-attendance');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '확인 중...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('출석체크 완료! (보상 토큰이 지급되었습니다.)');
        
        let myName = window.sherpainUserName || '홍길동';

        // 💡 다른 게시판과 동일한 Table tr td 구조로 생성
        const newItemHtml = `
          <tr>
            <td class="col-id">3</td>
            <td class="col-title">${content}</td>
            <td class="col-author">${myName}</td>
            <td class="col-date">방금 전</td>
          </tr>
        `;
        
        attendanceListBody.insertAdjacentHTML('afterbegin', newItemHtml);
        
        attendanceInput.value = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 500);
    });
  }

  // 게시판 작성 모달 생략...
});
23 / 33
[File] Sherpa-in.com-main/frontend/src/js/cs.js
/**
 * Sherpain21 - CS (Customer Support) Logic
 * 고객센터 탭 전환 (FAQ, QnA, 1:1문의) 및 1:1문의 작성 로직
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.getElementById('cs-tab-list');
  const boardTitle = document.getElementById('board-title');
  const boardDesc = document.getElementById('board-desc');
  const tbody = document.getElementById('cs-list-body');
  const thead = document.getElementById('cs-table-head');
  const btnWriteArea = document.getElementById('btn-open-cs-modal'); // 1:1 문의 작성 버튼

  const tabData = {
    faq: { 
      title: '자주 묻는 질문 (FAQ)', 
      desc: '회원님들이 가장 많이 궁금해하시는 질문과 답변입니다.',
      showWriteBtn: false
    },
    qna: { 
      title: 'Q&A 게시판', 
      desc: '셰르파-인 서비스 관련 질문을 남겨주시면 관리자 및 회원들이 답변해 드립니다.',
      showWriteBtn: false 
    },
    '1on1': { 
      title: '나의 1:1 문의 내역', 
      desc: '회원님이 접수하신 1:1 문의 내역과 관리자 답변을 확인할 수 있습니다.',
      showWriteBtn: true
    }
  };

  // 1. 탭 전환 로직
  if (tabList) {
    tabList.addEventListener('click', (e) => {
      const clickedTab = e.target.closest('.nav-item');
      if (!clickedTab) return;

      tabList.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      clickedTab.classList.add('active');

      const tabKey = clickedTab.dataset.tab;
      const info = tabData[tabKey];

      boardTitle.textContent = info.title;
      boardDesc.textContent = info.desc;

      // 1:1 문의 탭에서만 '문의 작성하기' 버튼 보이기
      if (info.showWriteBtn) {
        btnWriteArea.style.display = 'block';
      } else {
        btnWriteArea.style.display = 'none';
      }

      // 뷰에 따른 테이블 헤더 동적 변경 및 목업 데이터 주입
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:40px; color:#94a3
b8;">목록을 불러오는 중입니다...</td></tr>';
      
      setTimeout(() => {
        if (tabKey === 'faq') {
          thead.innerHTML = `
            <tr>
              <th class="col-id">No</th>
              <th class="col-title">분류</th>
              <th class="col-title">질문 제목</th>
            </tr>
          `;
          tbody.innerHTML = `
            <tr><td class="col-id">3</td><td class="col-title" style="width:100px; color:var(--a
ccent); font-weight:700;">결제/환불</td><td class="col-title">PRO 요금제에서 결제 수단을 변경하
고 싶습니다.</td></tr>
            <tr><td class="col-id">2</td><td class="col-title" style="width:100px; color:var(--a
ccent); font-weight:700;">계정/로그인</td><td class="col-title">카카오 간편 가입 후 이메일 계정
과 연동할 수 있나요?</td></tr>
            <tr><td class="col-id">1</td><td class="col-title" style="width:100px; color:var(--a
ccent); font-weight:700;">이용안내</td><td class="col-title">영수증 리뷰 모집/의뢰 시 플랫폼 수
수료는 어떻게 되나요?</td></tr>
          `;
        } else if (tabKey === 'qna') {
          thead.innerHTML = `
            <tr>
24 / 33
[File] Sherpa-in.com-main/frontend/src/js/cs.js (continued)
              <th class="col-id">No</th>
              <th class="col-title">제목</th>
              <th class="col-author">작성자</th>
              <th class="col-date">작성일</th>
            </tr>
          `;
          tbody.innerHTML = `
            <tr><td class="col-id">5</td><td class="col-title">당근마켓 소식 자동발행은 언제 업
데이트 되나요?</td><td class="col-author">수원미용실원장</td><td class="col-date">오늘 09:30</td
></tr>
            <tr><td class="col-id">4</td><td class="col-title">네이버 블로그 검색량 조회 한도가 
있나요?</td><td class="col-author">마케터kim</td><td class="col-date">어제 16:45</td></tr>
          `;
        } else if (tabKey === '1on1') {
          thead.innerHTML = `
            <tr>
              <th class="col-id">No</th>
              <th class="col-status">상태</th>
              <th class="col-title">문의 제목</th>
              <th class="col-date">접수일</th>
            </tr>
          `;
          tbody.innerHTML = `
            <tr><td class="col-id">2</td><td class="col-status"><span class="status-badge status
-wait">답변대기</span></td><td class="col-title">에스크로 미션 등록 시 결제창이 안 뜹니다.</td><
td class="col-date">방금 전</td></tr>
            <tr><td class="col-id">1</td><td class="col-status"><span class="status-badge status
-done">답변완료</span></td><td class="col-title">결제 영수증(세금계산서) 발행 요청드립니다.</td>
<td class="col-date">2024.11.19</td></tr>
          `;
        }
      }, 300);
    });

    // URL 파라미터 매칭
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && tabData[tabParam]) {
      const targetTab = document.querySelector(`.nav-item[data-tab="${tabParam}"]`);
      if (targetTab) targetTab.click();
    }
  }

  // 2. 1:1 문의글 작성 모달 제어
  const modalOverlay = document.getElementById('cs-modal');
  const btnOpenModal = document.getElementById('btn-open-cs-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const formCs = document.getElementById('form-cs');
  
  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', () => {
      modalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeModal = () => {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    if(formCs) formCs.reset(); 
  };

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 3. 1:1 문의글 폼 제출
  if (formCs) {
    formCs.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById('btn-submit-cs');
      const originalText = btnSubmit.textContent;
      btnSubmit.textContent = '등록 중...';
      btnSubmit.disabled = true;
25 / 33
[File] Sherpa-in.com-main/frontend/src/js/cs.js (continued)
      try {
        const payload = {
          category: document.getElementById('cs_category').value,
          title: document.getElementById('cs_title').value.trim(),
          content: document.getElementById('cs_content').value.trim()
        };
        console.log('1:1 문의 등록 요청:', payload);
        
        await new Promise(r => setTimeout(r, 500));
        
        alert('1:1 문의가 정상적으로 접수되었습니다.\n나의 문의 내역에서 답변을 확인하실 수 있습
니다.');
        closeModal();
        
        const activeTab = document.querySelector('.nav-item.active');
        if (activeTab) activeTab.click();
        
      } catch (error) {
        console.error('CS Submission Error:', error);
        alert('문의 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        btnSubmit.textContent = originalText;
        btnSubmit.disabled = false;
      }
    });
  }

});
26 / 33
[File] Sherpa-in.com-main/frontend/src/js/escrow.js
/**
 * Sherpain21 - Escrow (모집 및 의뢰) Logic
 * 미션 등록 모달 제어 및 수수료 실시간 계산, 파일 첨부 처리
 */
import SherpainAPI from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  // 모달 제어 요소
  const modalOverlay = document.getElementById('mission-modal');
  const btnOpenModal = document.getElementById('btn-open-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  
  // 폼 및 수수료 계산 요소
  const formCreateMission = document.getElementById('form-create-mission');
  const inputReward = document.getElementById('mission_reward');
  const calcReward = document.getElementById('calc-reward');
  const calcFee = document.getElementById('calc-fee');
  const calcTotal = document.getElementById('calc-total');

  // 파일 업로드 요소
  const fileInput = document.getElementById('mission_file');
  const fileDisplay = document.getElementById('file-name-display');
  
  // 미션 목록 조회 및 렌더링 함수
  const fetchMissions = async () => {
    try {
      const response = await SherpainAPI.getMissions();
      if (response && response.ok) {
        console.log('미션 목록 로드 성공:', response.missions);
        // 향후 실제 DOM 렌더링 로직으로 교체
      }
    } catch (error) {
      console.error('미션 목록 조회 실패:', error);
    }
  };

  // 페이지 로드 시 미션 목록 조회
  fetchMissions();

  // 모달 열기 (배경 스크롤 잠금 적용)
  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', () => {
      modalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden'; 
    });
  }

  // 모달 닫기 로직 (폼 초기화 포함)
  const closeModal = () => {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    if(formCreateMission) formCreateMission.reset(); 
    
    // 파일 및 수수료 초기화
    updateFeeCalc(); 
    if(fileDisplay) {
      fileDisplay.style.display = 'none';
      fileDisplay.textContent = '첨부된 파일 없음';
    }
  };

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);

  // 모달 바깥 배경 클릭 시 닫기
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 파일 첨부 시 파일명(또는 개수) 표시 로직
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        fileDisplay.style.display = 'block';
        if (files.length === 1) {
          fileDisplay.textContent = `첨부됨: ${files[0].name}`;
27 / 33
[File] Sherpa-in.com-main/frontend/src/js/escrow.js (continued)
        } else {
          fileDisplay.textContent = `첨부됨: ${files.length}개의 파일`;
        }
      } else {
        fileDisplay.style.display = 'none';
        fileDisplay.textContent = '첨부된 파일 없음';
      }
    });
  }

  // 실시간 수수료 계산 로직
  const PLATFORM_FEE_RATE = 0.10; 

  const updateFeeCalc = () => {
    let rewardValue = parseInt(inputReward.value, 10) || 0;
    
    const feeValue = Math.floor(rewardValue * PLATFORM_FEE_RATE);
    const totalValue = rewardValue + feeValue;

    if (calcReward) calcReward.textContent = rewardValue.toLocaleString();
    if (calcFee) calcFee.textContent = feeValue.toLocaleString();
    if (calcTotal) calcTotal.textContent = totalValue.toLocaleString();
  };

  if (inputReward) {
    inputReward.addEventListener('input', updateFeeCalc);
  }

  // 미션 등록 폼 제출 이벤트
  if (formCreateMission) {
    formCreateMission.addEventListener('submit', async (e) => {
      e.preventDefault();

      const rewardAmount = parseInt(inputReward.value, 10);
      // 최소 500 토큰 검증
      if (rewardAmount < 500) {
        alert('보상 토큰은 최소 500 토큰 이상 설정해야 합니다.');
        inputReward.focus();
        return;
      }

      const feeAmount = Math.floor(rewardAmount * PLATFORM_FEE_RATE);
      const totalDeduction = rewardAmount + feeAmount;

      const userTokenBalance = window.sherpainUserTokenBalance || 0;
      
      if (totalDeduction > userTokenBalance) {
        alert(`잔여 토큰이 부족합니다.\n(총 필요: ${totalDeduction.toLocaleString()} TK / 현재 
잔여: ${userTokenBalance.toLocaleString()} TK)`);
        return;
      }

      // API Payload 생성 (파일은 추후 FormData로 전송 필요)
      const payload = {
        category: document.getElementById('mission_category').value,
        title: document.getElementById('mission_title').value.trim(),
        description: document.getElementById('mission_desc').value.trim(),
        reward_tokens: rewardAmount,
        fee_tokens: feeAmount
      };

      const submitBtn = document.getElementById('btn-submit-mission');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '등록 중...';
      submitBtn.disabled = true;

      try {
        console.log('미션 등록 요청 (API 호출):', payload);
        
        // api.js의 createMission() 호출
        const response = await SherpainAPI.createMission(payload);
        
        if (response && response.ok) {
          alert('의뢰 등록이 완료되었습니다.\n(보증금 및 수수료가 예치 처리되었습니다.)');
          closeModal();
          fetchMissions(); // 미션 목록 새로고침
          
          // 내 잔고 정보도 새로고침(sidebar)
          if(window.location.pathname.includes('missions')) {
             window.location.reload();
28 / 33
[File] Sherpa-in.com-main/frontend/src/js/escrow.js (continued)
          }
        }
      } catch (error) {
        console.error('Mission Creation Error:', error);
        alert(error.message || '미션 등록 중 오류가 발생했습니다.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // 필터 버튼 로직
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

});
29 / 33
[File] Sherpa-in.com-main/frontend/src/js/inquiry.js
/**
 * Sherpain21 - Program Inquiry Logic
 * 프로그램 문의 및 기능 제안 탭 전환, 문의 작성 로직
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.getElementById('inquiry-tab-list');
  const boardTitle = document.getElementById('board-title');
  const boardDesc = document.getElementById('board-desc');
  const tbody = document.getElementById('inquiry-list-body');

  const tabData = {
    usage: { title: '프로그램 사용 문의', desc: '기능 사용 방법이나 오류에 대한 답변을 확인할 수
 있습니다.' },
    feature: { title: '이런 기능도 넣어주세요', desc: '셰르파-인에 추가되었으면 하는 기능이나 개
선점을 자유롭게 제안해 주세요.' }
  };

  // 1. 탭 전환 로직
  if (tabList) {
    tabList.addEventListener('click', (e) => {
      const clickedTab = e.target.closest('.nav-item');
      if (!clickedTab) return;

      tabList.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      clickedTab.classList.add('active');

      const tabKey = clickedTab.dataset.tab;
      boardTitle.textContent = tabData[tabKey].title;
      boardDesc.textContent = tabData[tabKey].desc;

      // 로딩 및 목업 렌더링
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:40px; color:#94a3
b8;">목록을 불러오는 중입니다...</td></tr>';
      
      setTimeout(() => {
        if (tabKey === 'feature') {
          tbody.innerHTML = `
            <tr><td class="col-id">2</td><td class="col-status"><span class="status-badge status
-wait">검토중</span></td><td class="col-title">네이버 블로그 일괄 공감/서로이웃 기능 건의합니다.
</td><td class="col-date">방금 전</td></tr>
            <tr><td class="col-id">1</td><td class="col-status"><span class="status-badge status
-done">반영완료</span></td><td class="col-title">자유홍보 게시판 하루 1회 무료 기능 추가해 주세
요.</td><td class="col-date">어제 12:00</td></tr>
          `;
        } else {
          tbody.innerHTML = `
            <tr><td class="col-id">3</td><td class="col-status"><span class="status-badge status
-wait">답변대기</span></td><td class="col-title">블로그 포스팅 이미지 업로드 에러가 납니다.</td>
<td class="col-date">오늘 10:20</td></tr>
            <tr><td class="col-id">2</td><td class="col-status"><span class="status-badge status
-done">답변완료</span></td><td class="col-title">플레이스 추적 슬롯 추가 결제는 어떻게 하나요?</
td><td class="col-date">어제 14:00</td></tr>
            <tr><td class="col-id">1</td><td class="col-status"><span class="status-badge status
-done">답변완료</span></td><td class="col-title">제휴사 등록 기준이 궁금합니다.</td><td class="c
ol-date">2024.11.15</td></tr>
          `;
        }
      }, 300);
    });

    // URL 파라미터 매칭
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && tabData[tabParam]) {
      const targetTab = document.querySelector(`.nav-item[data-tab="${tabParam}"]`);
      if (targetTab) targetTab.click();
    }
  }

  // 2. 문의글 작성 모달 제어
  const modalOverlay = document.getElementById('inquiry-modal');
  const btnOpenModal = document.getElementById('btn-open-inquiry');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const formInquiry = document.getElementById('form-inquiry');
  
  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', () => {
      modalOverlay.classList.add('show');
30 / 33
[File] Sherpa-in.com-main/frontend/src/js/inquiry.js (continued)
      document.body.style.overflow = 'hidden';
      
      const activeTab = document.querySelector('.nav-item.active');
      if (activeTab) {
        document.getElementById('inq_category').value = activeTab.dataset.tab;
      }
    });
  }

  const closeModal = () => {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    if(formInquiry) formInquiry.reset(); 
  };

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 3. 문의글 접수 폼 제출
  if (formInquiry) {
    formInquiry.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById('btn-submit-inquiry');
      const originalText = btnSubmit.textContent;
      btnSubmit.textContent = '접수 중...';
      btnSubmit.disabled = true;

      try {
        const payload = {
          category: document.getElementById('inq_category').value,
          title: document.getElementById('inq_title').value.trim(),
          content: document.getElementById('inq_content').value.trim()
        };
        console.log('문의글 등록 요청:', payload);
        
        await new Promise(r => setTimeout(r, 500));
        
        alert('문의가 정상적으로 접수되었습니다. 관리자 확인 후 답변 드리겠습니다.');
        closeModal();
        
        const activeTab = document.querySelector('.nav-item.active');
        if (activeTab) activeTab.click();
        
      } catch (error) {
        console.error('Inquiry Submission Error:', error);
        alert('접수 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        btnSubmit.textContent = originalText;
        btnSubmit.disabled = false;
      }
    });
  }

});
31 / 33
[File] Sherpa-in.com-main/frontend/src/js/services.js
/**
 * Sherpain21 - Partner Services & Promotion Logic
 * 제휴사 서비스 조회, 자유홍보 일일 제한(무료/토큰) 처리
 */
import SherpainAPI from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  // ==============================================================
  // 1. 자유홍보 작성 횟수 및 폼 제어
  // ==============================================================
  const modalOverlay = document.getElementById('promo-modal');
  const btnOpenPromo = document.getElementById('btn-promo-write');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const formWritePromo = document.getElementById('form-write-promo');
  const btnSubmitPromo = document.getElementById('btn-submit-promo');
  const limitMsg = document.getElementById('promo-limit-msg');

  // 목업: 사용자 작성 가능 상태 (0: 소진됨(토큰결제필요), 1: 1번 남음)
  // 실제로는 백엔드 API에서 일일 작성 횟수를 받아와야 합니다.
  let freeCountRemaining = 1; 

  const updateLimitUI = () => {
    if (freeCountRemaining > 0) {
      limitMsg.textContent = `오늘 무료 작성: ${freeCountRemaining}/1 남음`;
      limitMsg.style.color = 'var(--primary)';
      limitMsg.style.background = '#e0f2fe';
      btnSubmitPromo.textContent = '무료로 등록하기';
    } else {
      limitMsg.textContent = '오늘 무료 작성 소진됨 (500 토큰 필요)';
      limitMsg.style.color = 'var(--error)';
      limitMsg.style.background = '#fef2f2';
      btnSubmitPromo.textContent = '500 토큰 사용해 등록';
    }
  };

  updateLimitUI();

  // 모달 열기
  if (btnOpenPromo) {
    btnOpenPromo.addEventListener('click', () => {
      modalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
      updateLimitUI();
    });
  }

  // 모달 닫기
  const closeModal = () => {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    if (formWritePromo) formWritePromo.reset();
  };

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ==============================================================
  // 2. 폼 제출 (자유홍보)
  // ==============================================================
  if (formWritePromo) {
    formWritePromo.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 토큰 소진 시 잔여 토큰 검증 목업
      if (freeCountRemaining === 0) {
        const userTokenBalance = window.sherpainUserTokenBalance || 0;
        if (userTokenBalance < 500) {
          alert(`잔여 토큰이 부족합니다.\n(총 필요: 500 TK / 현재 잔여: ${userTokenBalance.toLoc
aleString()} TK)`);
          return;
        }
      }

      const payload = {
32 / 33
[File] Sherpa-in.com-main/frontend/src/js/services.js (continued)
        category: document.getElementById('promo_category').value,
        title: document.getElementById('promo_title').value.trim(),
        content: document.getElementById('promo_content').value.trim(),
      };

      const originalText = btnSubmitPromo.textContent;
      btnSubmitPromo.textContent = '등록 중...';
      btnSubmitPromo.disabled = true;

      try {
        console.log('자유홍보 등록 요청:', payload);
        
        // 향후 API 호출 연동 (무료 작성 횟수 차감 또는 토큰 차감)
        
        if (freeCountRemaining > 0) {
          freeCountRemaining -= 1;
          alert('무료 홍보 글이 등록되었습니다.');
        } else {
          // 토큰 차감 후 등록 성공 알림
          alert('500 토큰이 차감되어 홍보 글이 등록되었습니다.');
        }

        closeModal();
        updateLimitUI();
        
      } catch (error) {
        console.error('Promo Creation Error:', error);
        alert(error.message || '게시글 등록 중 오류가 발생했습니다.');
      } finally {
        btnSubmitPromo.textContent = originalText;
        btnSubmitPromo.disabled = false;
      }
    });
  }

  // ==============================================================
  // 3. 제휴사 서비스 문의 버튼
  // ==============================================================
  const partnerBtns = document.querySelectorAll('.btn-partner');
  partnerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // is-locked 인 카드의 버튼은 CSS로 pointer-events 처리가 되어있으나
      // 혹시 모를 클릭 방지를 위해 검증
      if (e.target.closest('.is-locked')) return;
      
      const card = e.target.closest('.partner-card');
      const partnerName = card.querySelector('h3').textContent;
      
      alert(`[${partnerName}] 제휴사에 문의 신청이 접수되었습니다. 담당자가 곧 연락을 드립니다.`
);
    });
  });

});
33 / 33
