# BUSINESS_LOGIC.md
# Sherpain21 비즈니스 로직, 과금 체계 및 기술 아키텍처 통합 명세서 (Master)

본 문서는 Sherpain21(셰르파인 2.1) 플랫폼의 핵심 수익 모델(BM), 눈덩이(토큰) 이코노미, 에스크로 중개 시스템, 레거시 기능(플레이스, 블로그, 스마트플레이스 북마클릿 연동 등)이 어떤 기술적 아키텍처(데이터 흐름)를 가지고 동작하며 과금되는지를 초상세하게 통합 규정한 마스터 문서입니다.

모든 현금성 트랜잭션(눈덩이 증감)은 동시성 문제와 데이터 무결성을 위해 반드시 Cloudflare D1의 `db.batch()`를 이용해 처리되며, `snowball_transactions` 테이블에 상세 Audit Log가 남아야 합니다.

---

## 1. 플랫폼 비전 및 핵심 수익 구조 (6대 캐시카우)

Sherpain21은 기존의 "마케터와 자영업자를 분리하여 메뉴를 숨기는" 단순 SaaS 툴에서 벗어나, **모든 유저에게 기능을 100% 오픈하되 '사용량(슬롯/눈덩이)'으로 허들을 두는 Freemium & Upsell 플랫폼**으로 진화했습니다.

1. **SaaS 구독 수익 (월/연간 결제)**
   - Basic(무료), Standard(월 39,000~59,000원), Pro(월 99,000~189,000원). 연 결제 시 10% 할인 적용. (토스/네이버페이 등 결제 시 요금제 자동 연동)
2. **Enterprise/Franchise 맞춤 B2B 페이지**: 별도 구축 및 심화 상담 비용 (지점 통합 현황/QC 관리 등).
3. **에이전시 중개 수수료**: 플랫폼 내 제휴사(올스, 고트마케팅 등) 거래 시 발생하는 중개 마진.
4. **B2B2C 리뷰어 모집 에스크로 수수료**: 업주(의뢰자)와 일반인(수행자) 간 미션 보상 눈덩이 지급 시, **거래 대금의 10%**를 플랫폼 수수료로 원천 징수.
5. **낙전 수익 (Breakage Revenue)**: 일반 유저가 미션을 통해 벌어들인 눈덩이는 **최소 10,000원(또는 5,000원) 이상 시에만 출금 가능**하도록 제한. 목표 달성 전 이탈하는 유저의 소액 자산은 고스란히 플랫폼의 순수익으로 귀속.
6. **실행사 배너 광고비**: 커뮤니티 및 제휴사 게시판 상단에 스폰서 배너 입점 (월 30~50만 원 구좌 임대).

---

## 2. 재화 단위 (눈덩이)

- **기본 재화명**: 눈덩이 (구: TK, Token. DB 컬럼명은 `tokens`로 유지, 코드에서 snowball로 매핑)
- **가치 비율**: 1 눈덩이 = 1 KRW (원)
- **현재 환경**: 테스트 환경에서는 가상 충전 API 사용

---

## 3. 요금제별 기능 개방 및 슬롯/눈덩이 정책

모든 사용자는 회원가입 즉시 "Basic(무료)" 플랜으로 시작하며, 고급 기능 및 대량 처리를 위해 Standard 또는 Pro로의 업그레이드(결제)를 유도합니다.

### 3.1 요금제별 권한 (SaaS)

| 기능 카테고리 | Basic (무료) | Standard | Pro |
|:---|:---|:---|:---|
| **플레이스 순위 조회** | 기본 1개 슬롯 | 기본 3개 슬롯 + 스냅샷 보고서 | 기본 10개 슬롯 + 심화 보고서 |
| **플레이스 SEO 분석** | 보고서 (핵심 모자이크) | 보고서 전체 오픈 | 보고서 오픈 + 맞춤형 솔루션 |
| **블로그 지수 분석** | 조회 쿨타임 1시간 | 무제한 | 무제한 |
| **키워드별 블로그 순위** | 단순 순위 조회 | 순위 내 본인 변동 알림 + 키워드 3개 | 댓글 자동화 + 키워드 5개 |
| **블로그 자동 포스팅** | 1일 1건 수동(글만) | 일 5건 (사진+글) 자동 연동 | 일 20건 (유튜브 스크랩 포함) |
| **리뷰 SNS 자동 업로드** | 기능 설명 노출 | 일 5건 인스타/스레드 | 일 20건 (블로그 포함) |
| **CPC 단가 추적** | 계정당 1회 | 일 10회 | 무제한 |
| **광고 시간대별 최적화** | 기능 설명 오픈 | 기능 설명 오픈 | 분석 제공 (자동화는 월광고비 15% 수수료) |
| **유튜브 분석** | 기능 설명 오픈 | 키워드 검색 (상위 5개) | 전체 오픈 + 상위노출 솔루션 |
| **키워드 마인드맵** | TOP 3개 오픈 (나머지 모자이크) | 전체 오픈 + 기본 보고서 | 전체 오픈 + 플레이스 유입키워드 분석 |

### 3.2 무료 전면 개방 기능 (트래픽 유도용)

플랫폼 체류 시간과 DAU 확보를 위해 플랜 상관없이 100% 무료 개방:

1. 플레이스 리뷰 로직 분석, 타업체 리뷰 분석
2. 키워드 검색량/조합 및 트렌드(급등 키워드)
3. 손익계산 및 매출 연동 (홈택스, 배민, 포스기 연동)
4. 리뷰 연동 + CS 보고서 및 ROAS 분석

### 3.3 눈덩이 완전 과금 기능

요금제와 무관하게(또는 요금제 혜택 소진 시), 사용할 때마다 유저의 보유 눈덩이를 즉시 차감하는 고비용 리소스 기능:

1. **소상공인 데이터 (010 번호 수집)**: Basic (1회 무료), Standard (월 1회 무료), Pro (월 3회 무료). 이후 건당 눈덩이 차감.
2. **부동산 데이터 수집**: 1건당 눈덩이 차감 (미국 Render.com → Cloudflare Proxy).
3. **사진 메타정보 변경 (EXIF 에디터)**: 1회 이용 시 300 눈덩이 차감.
4. **플랫폼 광고 소재 AI 생성기 (Mirr 협업)**: 생성 시 N 눈덩이 차감.
5. **자유홍보 게시판 글쓰기**: 전 플랜 최초 1회 무료. 이후 건당 500 눈덩이 차감.

---

## 4. 눈덩이 과금 상세 내역 (트랜잭션 로직)

모든 과금 및 지급은 아래 표를 기준으로 동작합니다.

| 기능 | 과금액 (눈덩이) | 설명 및 트랜잭션 로직 |
|------|-----------|------------------|
| **회원가입 보너스** | + 150 눈덩이 | 가입 즉시 지급. (프로모션용) |
| **추천인 가입 보너스** | + 1,000 눈덩이 | 유효한 추천인 코드 입력 시 기본 150 대신 1,000 지급 |
| **일일 출석체크** | + 10~50 눈덩이 | 1일 1회 제한. 연속 출석 일수에 따라 차등 지급. 7일+: 20, 14일+: 30, 30일+: 50 눈덩이 |
| **에스크로 의뢰 등록** | 의뢰금 + 10% 수수료 차감 | 플랫폼 핵심 캐시카우. 10,000 눈덩이 의뢰 시 11,000 눈덩이 즉시 예치 차감 |
| **에스크로 정산** | + 의뢰금 (수행자) | 의뢰자 승인 시 수행자에게 원금 지급. 수수료 1,000은 플랫폼 귀속 |
| **자유홍보 등록 (1회차)** | 0 눈덩이 | posts 테이블 count 확인 후 최초 1회 무료 |
| **자유홍보 등록 (2회차~)** | - 500 눈덩이 | services.html. 제휴사 홍보 목적 |
| **마케팅 순위 분석** | - 300 눈덩이 | marketing.html & place-rank.html. 크롤링 프록시 실행 시 즉시 부과 |
| **EXIF 메타정보 변경** | - 300 눈덩이 | 사진 메타정보 1회 변경 시 |
| **테스트 눈덩이 충전** | + 선택 금액 | profile.html. PG사 연동 전 1만/5만/10만 눈덩이 가상 즉시 충전 |
| **[개발용] 마스터 충전** | + 1억 눈덩이 | POST /api/dev/make-admin. 개발/QA 테스트 전용. 운영 시 삭제 예정 |

---

## 5. 핵심 캐시카우: 에스크로 (모집/의뢰) 트랜잭션 상세 로직

1. **의뢰 (업주)**: "보상 눈덩이: 10,000" 입력 시, 시스템이 플랫폼 수수료 10% (1,000 눈덩이)를 가산하여 총 11,000 눈덩이를 지갑에서 즉시 차감(Hold). 상태: `open`
2. **수행/독점 (리뷰어)**: 리뷰어가 수락 시 상태가 `in_progress`(진행중)이 되며 카드가 잠김(`is_locked = 1`). 타인 중복 신청 불가. 최대 수행자 수 도달 시 자동 잠금.
3. **정산 (Completion)**: 의뢰자가 승인 시, Hold 된 11,000 눈덩이 중 10,000 눈덩이는 수행자에게, 1,000 눈덩이는 셰르파인 플랫폼 수익으로 DB 트랜잭션 분배. 상태: `completed`
4. **낙전 수익**: 수행자의 눈덩이는 최소 10,000원(10,000 눈덩이) 이상 시 출금(Withdraw) 가능. 미달 상태로 이탈한 유저의 잔여 눈덩이는 회사 수익 귀속.

### 에스크로 상태 흐름

```
open → in_progress → completed
                   → cancelled (의뢰자 취소, 미승인 환불)
```

---

## 6. 유저 데이터 수집 모델 (가입 시)

회원가입 시 마케팅 및 타겟팅을 위해 다음 정보를 필수로 수집하여 `users` 테이블에 저장합니다.

- **기본 정보**: 이름(상호명), 전화번호(`phone`), 이메일, 비밀번호(SHA-256 해시 저장)
- **로그인 정보**: `login_id` (영문+숫자+언더스코어 4~20자), `password_hash`
- **지역 정보**: 시/도(`region_sido`), 구/군(`region_sigungu`) - 프론트엔드 동적 스크립트를 통한 정확한 행정구역 매핑 필수
- **추가 정보**: 가입 유형(Role: `general` / `marketer`), 업종(`biz_type`), 상호명(`store_name`), 에이전시명(`agency_name`), 추천인 코드(`referral_code`, 선택)
- **재화**: `tokens` 컬럼 (눈덩이, 가입 보너스 즉시 반영)
- **추천인 코드**: `referral_code` (가입 시 자동 생성, 'S' + timestamp base36)

---

## 7. 어드민(플랫폼) 누적 수익 집계 원칙

플랫폼 소유자(`admin.html`)가 확인하는 '총 누적 수익'은 다음 두 가지 지표의 합으로 계산됩니다. (JWT `role === 'admin'`인 유저만 접근 가능)

1. **에스크로 수익 (`escrowRevenue`)**: `escrow_missions` 테이블의 `platform_fee` 컬럼 총합 (`SUM(platform_fee)`). 상태가 `completed`인 건만 집계.
2. **부가 서비스 수익 (`serviceRevenue`)**: `snowball_transactions` 테이블에서 `type = 'service_fee'` (자유홍보, 순위 분석 등)로 기록된 차감 내역의 절댓값 총합 (`ABS(SUM(amount))`).

---

## 8. 백엔드 API 데이터 흐름 및 아키텍처 (Data Flow)

Sherpain21의 핵심 크롤링 및 프록시 아키텍처는 Cloudflare Worker와 외부 서버(Render, Oracle)를 융합하여 네이버의 어뷰징 탐지를 우회합니다.

### 8.1 플레이스 순위 조회 (Place Rank)

네이버 플레이스 GraphQL API를 오라클 프록시 서버를 경유하여 호출합니다.

```
[프론트 place-rank.html]
  |-- SherpaAPI.rank.place({ keyword, placeId, kind, x, y, display })
  v
[Worker /rank/place]
  |-- buildGraphQL(kind, keyword, start, display, x, y, deviceType)
  |-- fetch('http://152.69.239.221:3000/naver/place', {
  |     headers: { 'x-api-key': 'sherpa2026proxy' },
  |     body: [gql]
  |   })
  |-- normalizeItem(kind, item)
  |-- 응답: { keyword, placeId, kind, myRank, total, results[] }
  v
[프론트]
  |-- Place ID로 대상 업체 타겟팅 (myRank 표시)
  |-- 순위 카드 + 1~50위 결과 목록 렌더링
  |-- 추적 등록 시 D1 DB snapshots 테이블 저장 → 크론(매일 15시) 자동 수집
```

### 8.2 네이버 플레이스 GraphQL 프록시 아키텍처 (v2.1 신규)

기존 Cloudflare Worker에서 직접 `api.place.naver.com`을 호출하던 방식에서, **오라클 서버를 경유하는 방식**으로 변경. Cloudflare IP 차단 문제 완전 해소.

```
[Worker]
  |-- POST http://152.69.239.221:3000/naver/place
  |-- Headers: { 'x-api-key': 'sherpa2026proxy', 'Content-Type': 'application/json' }
  |-- Body: [GraphQL Query Array]
  v
[Oracle Server 152.69.239.221:3000]
  |-- API Key 검증 (x-api-key: sherpa2026proxy)
  |-- 한국 IP로 api.place.naver.com 호출
  |-- 응답 그대로 Worker에 반환
  v
[Worker → 프론트]
  |-- JSON 파싱 및 정규화 후 응답
```

적용 엔드포인트:
- `/rank/place` — naverFetchResults 내부
- `/rank/proxy` — handleRankProxy
- `/place/themes` — handlePlaceThemes
- `/place/reviews` — handlePlaceReviews
- `/place/detail-gql` — handlePlaceDetailGql

### 8.3 플레이스 키워드 분석 (북마클릿 Same-Origin Fetch)

보안상 유저의 아이디/비밀번호를 수집하지 않기 위해 **북마클릿(Bookmarklet) 방식** 채택.

1. 사용자가 즐겨찾기 바에 "SHERPA IN 키워드" 버튼 등록.
2. 사용자가 스마트플레이스 통계 페이지에 직접 로그인.
3. 북마클릿 클릭 시 브라우저 내에서 `/api/proxy/bizadvisor...` API를 Same-Origin Fetch로 호출 (인증: 브라우저 내장 `ba_access_token` 쿠키 사용).
4. `ref_keyword`와 `pv` 데이터를 추출하여 SHERPA IN 새 탭으로 전달.
5. SHERPA IN 프론트가 전달된 데이터를 기반으로 D3.js 마인드맵과 키워드 순위 렌더링.

### 8.4 부동산 데이터 수집 (미국 Render 우회)

네이버 부동산은 타임아웃 방지를 위해 **Render.com(Flask) → Cloudflare Worker(한국 PoP 프록시) → 네이버 부동산 API**의 3단계 우회 스크래핑을 거칩니다.

- 프론트(GitHub Pages)가 Render 서버로 요청.
- Render 서버가 Worker의 `/land/proxy` 엔드포인트(`m.land.naver.com`)를 경유.
- 수집 항목: 매물번호, 거래유형, 중개사 휴대폰번호 등. (CSV 다운로드 지원)

### 8.5 상위노출 URL 생성기 (Oracle 서버 Puppeteer)

지인 공유 시 네이버 통계에 "검색 유입"으로 기록되게 만드는 기법.

```
[프론트 url-generator.html]
  |-- 랜딩 페이지 배포 → 타인이 "시작하기" 클릭
  v
[Worker /puppeteer/proxy]
  |-- POST http://152.69.239.221:3000/generate-click-token
  |-- Headers: { 'x-api-key': 'sherpa2026proxy' }
  |-- Body: { keyword, blogId, logNo, sortByDate }
  v
[Oracle Server 152.69.239.221:3000]
  |-- Puppeteer 작동 (한국 IP)
  |-- 네이버 모바일 검색창 Headless 시뮬레이션
  |-- 블로그 링크 클릭 → crd/rd POST 로그 전송 완료
```

### 8.6 소상공인 데이터 (010 번호 자동 수집)

```
[Worker /biz/collect]
  |-- 네이버 검색 API(blog.json)로 최신 블로그 URL 200개 획득
  |-- 모바일 페이지(m.blog.naver.com) HTML 직접 Fetch (10개씩 병렬)
  |-- 정규식(/010[\s\-\.]*\d{4}[\s\-\.]*\d{4}/) 으로 010 번호 추출
  |-- data-module JSON 파싱으로 상호명/주소 추출
  |-- 중복 제거 후 결과 반환
```

과금: Basic 1회 무료, Standard 월 1회 무료, Pro 월 3회 무료. 이후 건당 눈덩이 차감.

### 8.7 블로그 지수 분석 및 AI 포스팅

- **지수 분석**: Render.com의 `blog-analyzer` Flask 서버에서 방문자 수, 공감, 댓글 기반 15단계 품질 등급(일반~최적4+) 산출.
- **AI 포스팅**: Groq API(LLaMA 3.3 70B)를 Worker가 프록시 호출 (`/ai/blog-generate`). 키워드를 입력하면 네이버 에디터 포맷의 HTML 서식을 JSON으로 반환. Chrome 확장 프로그램(CRX)과 연동하여 자동 발행.

---

## 9. 오라클 서버 접속 정보

| 항목 | 값 |
|------|-----|
| IP | 152.69.239.221 |
| Port | 3000 |
| API Key Header | `x-api-key: sherpa2026proxy` |
| 네이버 플레이스 프록시 엔드포인트 | `POST /naver/place` |
| Puppeteer 클릭 토큰 엔드포인트 | `POST /generate-click-token` |
| 헬스체크 엔드포인트 | `GET /health` |

---

## 10. DB 테이블 구조 요약

### snowball_transactions (눈덩이 거래 감사 로그)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER PK | 자동 증가 |
| user_id | TEXT | 대상 유저 ID |
| type | TEXT | earn / use / escrow_deposit / escrow_payout / service_fee |
| amount | INTEGER | 증감액 (차감 시 음수) |
| balance_after | INTEGER | 트랜잭션 후 잔액 |
| description | TEXT | 사유 설명 |
| ref_type | TEXT | signup / escrow / attendance / service 등 |
| ref_id | TEXT | 관련 레코드 ID (선택) |
| created_at | DATETIME | 생성 시각 |

### escrow_missions

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER PK | 자동 증가 |
| requester_id | TEXT | 의뢰자 user_id |
| title | TEXT | 미션 제목 |
| reward_per_person | INTEGER | 1인당 보상 눈덩이 |
| max_applicants | INTEGER | 최대 수행자 수 |
| total_deposit | INTEGER | 예치금 (수수료 포함) |
| platform_fee | INTEGER | 플랫폼 수익 (10%) |
| status | TEXT | open / in_progress / completed / cancelled |
| is_locked | INTEGER | 0/1 (최대 인원 달성 시 자동 잠금) |

---

## 11. 구현 원칙 (Atomic Transaction)

백엔드 로직 작성 시 아래와 같은 형태의 배열 트랜잭션을 절대적으로 준수하여 하나라도 실패 시 전체가 롤백(Rollback)되도록 합니다.

```javascript
await env.DB.batch([
  // 1. 실제 비즈니스 테이블 생성 (escrow_missions, posts 등)
  env.DB.prepare('INSERT INTO ...'),

  // 2. 감사 로그(snowball_transactions) 기록 (핵심!)
  env.DB.prepare(
    "INSERT INTO snowball_transactions (user_id, type, amount, balance_after, description, ref_type) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(userId, 'service_fee', -300, newBalance, '순위 분석 (-300 눈덩이)', 'service'),

  // 3. 유저 잔고(users.tokens) 즉시 업데이트
  env.DB.prepare('UPDATE users SET tokens = tokens - ?, updated_at = ? WHERE id = ?')
    .bind(amount, new Date().toISOString(), userId)
]);
```

---

## 12. 보안 및 접근 제어

- 모든 인증 필요 API는 `Authorization: Bearer <JWT>` 헤더 검증 (`requireAuth` 함수).
- JWT Payload: `{ sub: userId, role, plan, name, iat, exp }`. 만료: 14일.
- 어드민 전용 API (`/api/dev/make-admin` 등)는 `role === 'admin'` 검증 필수.
- 개발용 마스터 충전 API는 운영 배포 전 반드시 제거 또는 비활성화.
- 에스크로 승인은 `requester_id === payload.sub` 검증으로 본인 미션만 처리 가능.
- 눈덩이 차감 전 항상 잔고 검증 (`getSnowballBalance`) 후 부족 시 400 에러 반환.

---

*본 비즈니스 로직 문서는 Sherpain21을 재개발하는 모든 작업에서 완벽히 일치되도록 구현되어야 하며, 특히 에스크로 트랜잭션과 프록시 데이터 흐름(오라클 서버 경유)에 있어 철저한 검증을 요구합니다.*
