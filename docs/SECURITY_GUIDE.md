# [Cloudflare Workers/Node.js] 로컬 마케팅 에스크로 플랫폼 (Sherpain21) 구현

본 문서는 대표님의 요청에 따라 Sherpain21 플랫폼의 **보안 요구사항(Security Requirements)**을 완벽하게 정의한 명세서입니다. AI 세션 및 개발자는 이 문서의 보안 라이브러리와 아키텍처를 절대적으로 준수하여 코드를 작성해야 합니다.

## 1. 기능 요구사항 (Functional Requirements)
- **[기능 1]**: 이메일/소셜(카카오, 네이버) 투트랙 인증 및 다중 역할(Role) 선택 기반의 회원 관리 시스템
- **[기능 2]**: 10% 수수료가 자동으로 계산되고, 토큰 예치(차감) 및 정산이 이루어지는 B2B2C 에스크로(모집 및 의뢰) 게시판 시스템
- **[기능 3]**: 네이버 플레이스/블로그 등 외부 크롤링 데이터를 기반으로 한 순위 추적 및 분석 대시보드 제공

## 2. 보안 요구사항 (필수 준수 - OWASP Top 10)
✓ **입력 검증 및 Sanitization**: 클라이언트로부터 넘어오는 모든 요청 값은 엄격히 검증하며, HTML/스크립트 태그 삽입 방지를 위해 Sanitization 처리 (Node.js의 경우 `express-validator` 개념 적용, Worker에서는 `DOMPurify` 패턴의 정규식/이스케이프 처리).
✓ **인증/인가**: `Web Crypto API` (또는 `jsonwebtoken`) 기반의 JWT Access/Refresh 토큰 아키텍처 구현. 시크릿 어드민(Role) 권한 검증 필수.
✓ **환경변수로 민감 정보 관리**: Secret Key, DB 토큰 등은 `.dev.vars` (Worker 환경변수) 또는 `.env` 에 저장. 코드 내 하드코딩 엄금.
✓ **SQL Injection 방지**: Cloudflare D1 (SQLite) 쿼리 실행 시 문자열 결합 금지. 무조건 Parameterized Queries (`db.prepare('...').bind()`) 사용.
✓ **XSS 방지**: 프론트엔드 데이터 렌더링 시 `textContent`만 허용. `innerHTML` 사용 시 `xss-clean` 또는 `DOMPurify` 개념 적용.
✓ **CSRF 보호**: 세션 기반이 아닌 JWT `Authorization: Bearer` 헤더 전송을 강제하여 CSRF 우회. 필요시 Origin/Referer 이중 검증.
✓ **Rate Limiting**: Cloudflare WAF 및 Worker 내부 메모리를 활용한 속도 제한(Rate Limiting) 구현으로 Brute-force 및 DDoS 방어. (Node.js의 `express-rate-limit` 개념).
✓ **보안 헤더 설정**: API 응답 시 `Strict-Transport-Security (HSTS)`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` 헤더를 반드시 포함 (Node.js의 `helmet` 개념).
✓ **비밀번호 해싱**: 평문 저장 절대 금지. `Web Crypto API`의 `SHA-256` (Salt 포함) 또는 `bcrypt`/`argon2` 에 준하는 강력한 해싱 알고리즘 적용.
✓ **에러 핸들링**: DB 스키마나 Stack Trace가 클라이언트 브라우저로 절대 노출되지 않도록 `500 Internal Server Error` 로 제네릭하게 래핑.
✓ **HTTPS 강제 및 Secure 쿠키 설정**: Cloudflare DNS 단에서 TLS 1.3 강제 및 모든 인증 토큰/쿠키에 `Secure`, `HttpOnly` 속성 부여.
✓ **CORS 적절히 설정**: 개발망(`127.0.0.1`) 외 프로덕션망에서는 `Access-Control-Allow-Origin`을 특정 도메인(`sherpa-in.com`)으로 엄격히 제한 (Node.js `cors` 모듈 개념 적용).

## 3. 코딩 스타일 (Coding Style)
- **보안 관련 주석 포함**: 인증, 해싱, 쿼리문 등 보안과 직결된 코드 상단에 `// [보안: SQL Injection 방어용 Parameter 바인딩]` 등의 주석을 필수로 작성.
- **에러 핸들링 모범 사례 적용**: 모든 비동기(Async) 로직에는 최상위 `try-catch` 블록을 씌우고, 실패 시 안전한 에러 객체를 리턴.
- **로깅 시 민감 정보 마스킹**: 비밀번호, 휴대폰 번호, 이메일 등 개인정보를 `console.log()`로 출력할 때는 `***` 로 마스킹 처리.

---

## 4. 보안 설정 가이드 및 파일 (제공물)

### 4.1 `.env.example` (환경변수 템플릿)
```env
# Sherpain21 Environment Variables Template (DO NOT COMMIT ACTUAL .env OR .dev.vars)
JWT_SECRET="여기에_강력한_랜덤_시크릿키_입력"
API_VERSION="v1"
NAVER_CLIENT_ID="your_naver_client_id"
NAVER_CLIENT_SECRET="your_naver_client_secret"
KAKAO_REST_API_KEY="your_kakao_rest_api_key"
GROQ_API_KEY="your_groq_api_key"
D1_DATABASE_ID="your_cloudflare_d1_id"
```

### 4.2 `.gitignore` (민감 정보 제외)
```gitignore
# Logs
logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for local Cloudflare D1 / KV data
.wrangler/

# Dependency directories
node_modules/

# Environment Variables (Security)
.env
.env.local
.env.production
.dev.vars

# Build output
dist/
dist-ssr/
build/
```

### 4.3 `package.json` (보안 라이브러리 포함 예시 - Frontend)
```json
{
  "name": "sherpain21-frontend",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "javascript-obfuscator": "^4.1.0",
    "vite-plugin-javascript-obfuscator": "^3.0.1",
    "terser": "^5.24.0",
    "dompurify": "^3.0.6"
  }
}
```

### 4.4 간단한 보안 테스트 예시 (Security Testing)
1. **SQL Injection 테스트**:
   - 로그인 창 아이디에 `' OR '1'='1` 입력 시도.
   - *결과*: DB 바인딩(`?`)에 의해 문자열 그대로 인식되어 가입되지 않은 아이디로 안전하게 방어됨.
2. **XSS(크로스 사이트 스크립팅) 테스트**:
   - 자유홍보 게시판 내용에 `<script>alert("Hacked!")</script>` 작성 시도.
   - *결과*: `innerHTML`이 아닌 `textContent`로 렌더링되거나 `DOMPurify`로 필터링되어 스크립트가 텍스트로만 표시됨.
3. **CORS 테스트**:
   - Postman이나 허용되지 않은 출처(Origin)에서 API 요청 시도.
   - *결과*: Cloudflare Worker가 `403 Forbidden` 처리.
4. **JWT 조작 테스트**:
   - 발급된 JWT 토큰의 `payload` 부분을 디코딩하여 `is_superadmin: true`로 임의 변경 후 재전송.
   - *결과*: Signature(서명) 불일치로 `401 Unauthorized` 처리됨.

---
*본 보안 가이드는 백엔드 코드(`worker/src/index.js`)와 프론트엔드 빌드(`vite.config.js`)에 이미 녹여져 있으며, 향후 추가될 모든 모듈에서도 절대적으로 준수해야 합니다.*