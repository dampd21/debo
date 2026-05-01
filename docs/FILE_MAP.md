# FILE_MAP.md

## 프로젝트 전체 파일 구조 및 모듈 스펙 (Phase 3 최종 완성 기준)

### Root
- `docs/` - 기획, 아키텍처, 배포 관련 모든 마크다운 바이블
- `frontend/` - Vite 기반 프론트엔드 (난독화 빌드 적용)
- `worker/` - Cloudflare Workers 백엔드 (API + D1 DB)

---

## 1. docs/ (바이블 및 가이드)
- `SHERPAIN21_MASTER_PROMPT.md` - 최상위 실행 지침서 (경로 작성 규칙 포함)
- `CURRENT_STATUS.md` - 진행 상황 (현재 Phase 3: 테스트 및 v1 이식 진행)
- `FILE_MAP.md` - **이 파일**
- `BUSINESS_LOGIC.md` - BM, 눈덩이 과금 및 지역/추천인 수집 로직 스펙 (개발용 1억 충전 API 명시)
- `STYLE_GUIDE.md` - Profound Minimalist 스타일 및 커스텀 UI (Toast/Modal) 규칙
- `SECURITY_GUIDE.md` - 암호화, JWT, 난독화 지침
- `DEPLOYMENT_GUIDE.md` - Cloudflare D1 / Pages / Worker 배포 순서도

---

## 2. frontend/ (UI 및 로직)
- `package.json` & `vite.config.js` - Vite 빌드 툴 및 `javascript-obfuscator` 플러그인 세팅 (`base: './'` 설정 적용)
- `index.html` - 외부 랜딩 (Hero, Features, Pricing, Footer)
- `login.html`, `signup.html` - 인증 페이지 (Role 선택 UI, **소셜 간편가입 버튼**, **지역 선택 드롭다운** 포함)

### frontend/app/ (내부 SaaS 대시보드 - HTML)
- `admin.html` - **[운영자 전용]** 플랫폼 누적 수수료 통계 및 유저 관리
- `dashboard.html` - **[v1.5 마이그레이션]** 통계 카드(순위, 리뷰, 지수) 및 Chart.js 시각화, 에스크로 최근 10건
- `community.html` - 일일 출석체크(+50 눈덩이) 및 자유게시판 목록
- `escrow.html` - 10% 수수료 기반 에스크로 의뢰 등록 폼
- `marketing.html` - 로컬 마케팅 도구
- `place-rank.html` - **[v1.5 마이그레이션]** 네이버 플레이스 순위 분석(-300 눈덩이)
- `services.html` - 자유홍보 게시판(-500 눈덩이) 및 서비스 목록
- `profile.html` - 플랜 확인 및 가상 눈덩이 충전 폼

### frontend/src/ (핵심 에셋 및 비즈니스 로직 - JS 난독화 대상)
**CSS**
- `css/app.css` - 전역 CSS 변수 및 기본 스타일 (Pretendard 폰트, 버튼/카드)
- `css/landing.css` - 외부 랜딩 전용 컴포넌트
- `css/dashboard.css` - 사이드바, Split-View 등 내부 앱 레이아웃 (Chart.js Grid 추가)
- `css/auth.css` - 2단(Split) 레이아웃 기반 로그인/가입 폼 전용 스타일

**JS 모듈 (Core)**
- `js/api.js` - JWT 자동 주입 및 401 에러 핸들링 `fetch` 래퍼 (Global `window.Api` 등록)
- `js/auth.js` - **[중요]** 쿠키 기반 JWT 관리, 전국 시/구 동적 매핑 로직, 소셜 로그인 연동
- `js/app-core.js` - 커스텀 Toast/Modal UI 주입 및 유저 프로필(**눈덩이 잔고**, 뱃지) 전역 렌더링
- `js/sidebar.js` - 다크 사이드바 접기/펴기 로직
- `js/splitview.js` - 위임(Delegation) 기반 우측 패널 열기/닫기 로직

**JS 모듈 (Pages)**
- `js/admin.js` - `/api/admin/stats` GET 통신 및 통계 렌더링
- `js/dashboard.js` - `/api/dashboard/stats` 통신을 통한 4대 통계 렌더링 및 `Chart.js` 시각화
- `js/escrow.js` - 10% 수수료 실시간 계산 및 의뢰 등록 로직
- `js/community.js` - 출석체크 API 연동 및 게시글 렌더링
- `js/services.js` - 자유홍보 눈덩이 차감 경고 및 글 등록/조회 로직
- `js/marketing.js` - 순위 분석(-300 눈덩이) 모의 연동
- `js/place-rank.js` - v1 플레이스 순위 조회 UI 연동 로직
- `js/profile.js` - 테스트 가상 충전 API 연동

---

## 3. worker/ (Cloudflare Workers 백엔드)
- `wrangler.toml` - 배포 환경변수 및 D1 바인딩 (`nodejs_compat` 적용)
- `schema.sql` - D1 데이터베이스 스키마 (`users` 테이블에 `phone`, `region_sido`, `region_sigungu`, `referral_code` 추가)
- `src/utils.js` - 의존성 없는 Web Crypto 기반 SHA-256 해싱 및 JWT 유틸리티
- `src/index.js` - **단일 라우터 엔트리포인트 (3대 영역 분리)**
  1. `[V2 CORE]`: `/api/auth/signup`, `/api/dev/make-admin` (마스터 1억 눈덩이), `/api/user/*`, `/api/escrow`, `/api/community/*`, `/api/services/*`
  2. `[V1 MIGRATION]`: 구버전 프록시 및 대시보드 통계 이식부 (`/api/dashboard/stats`, `/api/v1/rank/place` 등)
  3. `[V2 ADMIN]`: 운영자 전용 통계 및 권한 락(Lock) (`/api/admin/stats`)
