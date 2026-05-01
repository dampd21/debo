# CLOUDFLARE_DEPLOYMENT_GUIDE.md

이 문서는 Sherpain21의 **프론트엔드(Vite + Obfuscator)**와 **백엔드(Workers + D1)**를 실제 Cloudflare 프로덕션 환경에 배포하기 위한 완벽한 순서도입니다. 개발자 머신(로컬)의 터미널에서 아래 순서대로 실행하세요.

---

## 1단계: Cloudflare 로그인 및 D1 데이터베이스 생성

터미널을 열고 `worker` 폴더로 이동합니다.
```bash
cd worker
npm install -g wrangler
wrangler login
```

Cloudflare 계정에 로그인한 후, 프로덕션용 D1 데이터베이스를 생성합니다.
```bash
wrangler d1 create sherpain21-db
```
> **성공 시 출력되는 `database_id` 값을 복사하여 `worker/wrangler.toml` 파일의 `database_id = "..."` 부분에 붙여넣습니다.**

---

## 2단계: D1 데이터베이스 스키마(테이블) 세팅

작성해둔 `schema.sql`을 이용해 DB 테이블을 생성합니다.

**1. 로컬 환경 테스트 (선택)**
```bash
wrangler d1 execute sherpain21-db --local --file=./schema.sql
```
**2. 실제 프로덕션(리모트) DB에 적용 (필수)**
```bash
wrangler d1 execute sherpain21-db --remote --file=./schema.sql
```

---

## 3단계: Cloudflare Workers (API 서버) 배포

`wrangler.toml`이 있는 `worker` 폴더에서 배포 명령어를 실행합니다.
```bash
wrangler deploy
```
> **배포 성공 시 API의 고유 주소(예: `https://sherpain21-worker.YOUR_ACCOUNT.workers.dev`)가 출력됩니다.**
> 프론트엔드의 `frontend/src/js/api.js` 파일 첫 줄에 있는 `API_BASE_URL`을 위 주소(또는 커스텀 도메인 주소)로 변경해야 실제 프론트와 백엔드가 통신합니다.

---

## 4단계: Frontend 난독화 빌드 및 Cloudflare Pages 배포

`frontend` 폴더로 이동하여 패키지를 설치하고 빌드합니다.
```bash
cd ../frontend
npm install
npm run build
```
> `npm run build`가 완료되면 `dist/` 폴더가 생성되며, 모든 JS 파일은 `vite-plugin-javascript-obfuscator`에 의해 추적 불가능한 코드로 난독화(Base64 + 제어흐름 평탄화)됩니다.

**Cloudflare Pages로 배포**
```bash
wrangler pages deploy dist --project-name sherpain21-frontend
```
> - 처음 배포 시 Cloudflare Pages 프로젝트가 생성됩니다.
> - 배포가 완료되면 `https://sherpain21-frontend.pages.dev` 주소가 주어집니다.
> - 마지막으로 Cloudflare 대시보드에서 구매해둔 `sherpa-in.com` 도메인을 이 Pages 프로젝트에 연결(Custom Domains)하시면 됩니다.

---

## 💡 최종 확인
1. 브라우저에서 `sherpa-in.com/signup.html` 로 접속해 회원가입 진행
2. 자동으로 150 TK가 들어오는지 확인
3. 대시보드로 넘어가 '에스크로 등록', '순위 분석' 등을 눌러 토큰 차감이 정상 작동하는지 확인
4. F12 개발자 도구를 열어 `app-core.js` 등 JS 파일이 알아볼 수 없게 **난독화**되었는지 확인
