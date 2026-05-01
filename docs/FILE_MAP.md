# FILE_MAP.md (디렉토리 구조)

이 파일은 Sherpain 2.0 (Sherpain21) 프로젝트의 프론트엔드/백엔드 전체 디렉토리와 핵심 파일들을 설명합니다. 새로운 AI 세션을 시작하거나 코드를 수정할 때 반드시 이 구조에 맞게 파일을 생성하거나 수정하십시오.

```text
Sherpain21/
├── docs/                               # 📌 [기획/문서]
│   ├── SHERPAIN21_MASTER_PROMPT.md     # (필독) AI 개발 지침 및 아키텍처 (새 세션 시 전체 복사)
│   ├── CURRENT_STATUS.md               # 현재 개발 진행 상황 상세 트래킹 (매번 업데이트)
│   ├── FILE_MAP.md                     # 이 파일 (디렉토리 구조)
│   ├── BUSINESS_LOGIC.md               # (핵심) 수익 구조, 토큰 정책, 에스크로, 레거시 크롤링 로직 상세 명세
│   ├── TOPBAR_FEATURES_SPEC.md         # 5대 글로벌 상단 메뉴 탭/기능/UI 상세 기획서
│   ├── SECURITY_GUIDE.md               # 필수 보안 가이드라인 및 OWASP Top 10 대응
│   ├── STYLE_GUIDE.md                  # Profound Minimalist 테마 (아이콘 금지, 2단 Split-View 등) UI/UX 가이드라인
│   └── sherpain-pitch-deck.html        # 투자/고객 유치용 비즈니스 프레젠테이션 (HTML 슬라이드)
│
├── frontend/                           # 🌐 [프론트엔드 - Cloudflare Pages + Vite]
│   ├── package.json                    # npm 패키지 (vite, javascript-obfuscator 등)
│   ├── vite.config.js                  # Vite 빌드 설정 (코드 난독화/Minify/Chunks 분리 포함)
│   ├── index.html                      # 메인 랜딩 페이지
│   ├── login.html                      # 로그인 페이지
│   ├── signup.html                     # 회원가입 페이지
│   ├── app/                            # 애플리케이션 내부 (로그인 후 대시보드 환경)
│   │   ├── dashboard.html              # 홈 - 메인 대시보드
│   │   │
│   │   ├── community/                  # 📌 바로가기 (글로벌 메뉴 연동)
│   │   │   └── board.html              # 커뮤니티 게시판 (공지/가입/출석/자유/정보/로직)
│   │   ├── partner/
│   │   │   └── services.html           # 제휴사 및 자유홍보 (프리미엄 배너 + 프로모션)
│   │   ├── escrow/
│   │   │   └── missions.html           # 모집 및 의뢰 (에스크로 미션 등록/수행)
│   │   ├── support/
│   │   │   ├── inquiry.html            # 프로그램 문의 (오류/사용법, 기능제안)
│   │   │   └── cs.html                 # 고객센터 (FAQ, QnA, 1:1문의)
│   │   │
│   │   ├── place/                      # 📌 N사 플레이스
│   │   │   ├── rank.html               # 플레이스 순위 조회 및 추적
│   │   │   ├── seo.html                # 플레이스 SEO 분석
│   │   │   └── logic.html              # 플레이스 리뷰 로직분석
│   │   │
│   │   ├── blog/                       # 📌 블로그 / 카페
│   │   │   ├── index.html              # 블로그 지수 분석
│   │   │   ├── rank.html               # 키워드별 블로그 순위 분석
│   │   │   ├── post.html               # 블로그 자동 포스팅
│   │   │   └── url.html                # 블로그 상위노출 URL 생성기
│   │   │
│   │   ├── review/                     # 📌 리뷰 마케팅
│   │   │   ├── seo.html                # 플레이스 리뷰 SEO 분석 (타업체 리뷰 분석)
│   │   │   └── qr.html                 # 영수증 리뷰 QR (AI)
│   │   │
│   │   ├── platform/                   # 📌 기타 플랫폼
│   │   │   ├── daangn.html             # 당근 마케팅 자동화 (소식, 동네생활, 단골/리뷰, CPC, 숏폼 탭 통합)
│   │   │   ├── google.html             # 구글 맵/리뷰 분석 (상위노출, SEO, 배포 탭 통합)
│   │   │   └── kakao.html              # 카카오 트렌드 분석 (맛집트렌드, SEO 탭 통합)
│   │   │
│   │   ├── keyword/                    # 📌 키워드 / 트렌드
│   │   │   ├── volume.html             # 키워드 검색량/조합
│   │   │   ├── trend.html              # 트렌드 (급등 키워드)
│   │   │   └── map.html                # 키워드 마인드맵
│   │   │
│   │   ├── ad/                         # 📌 디지털 광고 관리
│   │   │   ├── fraud.html              # 광고 부정클릭 관리
│   │   │   ├── cpc.html                # CPC 단가 추적 (1~5위)
│   │   │   ├── time.html               # 검색광고 시간대별 최적화
│   │   │   ├── ai.html                 # 광고 소재 AI 생성기
│   │   │   ├── roas.html               # ROAS 캠페인 분석
│   │   │   └── campaign.html           # CPC 캠페인 생성 자동화
│   │   │
│   │   ├── review-manage/              # 📌 리뷰 종합관리
│   │   │   ├── block.html              # 리뷰 블라인드/차단/삭제
│   │   │   ├── sync.html               # 플랫폼 리뷰 연동
│   │   │   └── sns.html                # 리뷰 SNS 자동업로드
│   │   │
│   │   ├── data/                       # 📌 데이터/운영 관리
│   │   │   ├── biz.html                # 소상공인 데이터 (010 수집)
│   │   │   ├── realestate.html         # 부동산 데이터 수집
│   │   │   ├── calc.html               # 손익계산/원가율 및 매출연동
│   │   │   ├── photo.html              # 사진 메타정보 변경
│   │   │   ├── youtube.html            # 유튜브 분석
│   │   │   ├── threads.html            # 스레드 분석
│   │   │   ├── insta.html              # 인스타 분석
│   │   │   └── tiktok.html             # 틱톡 분석
│   │   │
│   │   └── settings/                   # 📌 기타 기능 (가이드/설정)
│   │       ├── education.html          # 강의 및 문서
│   │       ├── report.html             # 카카오 보고서 알림
│   │       ├── api.html                # 설정 (플레이스/API 등록)
│   │       ├── billing.html            # 플랜/결제 (올스)
│   │       └── profile.html            # 사용자 정보 수정 / 탈퇴
│   │
│   └── src/                            # 프론트엔드 에셋 및 스크립트 모듈
│       ├── css/
│       │   ├── app.css                 # 전역 레이아웃 및 컴포넌트(Card, Tab, Table)
│       │   ├── auth.css                # 로그인/회원가입 전용 스타일
│       │   └── landing.css             # 랜딩 페이지 전용 스타일
│       └── js/
│           ├── api.js                  # Fetch 래퍼, JWT, URL 동적 라우팅
│           ├── auth.js                 # JWT 파싱, 만료 검증, OAuth 콜백
│           ├── sidebar.js              # 네비게이션 트리, 프로필 동적 렌더링
│           └── [기능별 js 파일들]        # html 파일명과 동일하게 1:1 매칭 (예: place-rank.js)
│
└── worker/                             # ⚙️ [백엔드 - Cloudflare Workers + D1]
    ├── wrangler.toml                   
    ├── schema.sql                      
    └── src/
        ├── index.js                    # 메인 API 라우터 (인증, 트랜잭션, 크롤링)
```