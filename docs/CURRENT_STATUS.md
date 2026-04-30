# CURRENT_STATUS.md
# Sherpain21 현재 진행 상황
# 마지막 업데이트: 2025-07-11

---

## 현재 페이즈: v1 페이지 → v2.1 이식 진행 중

---

## 배포 현황

| 항목 | 상태 | 값 |
|------|------|-----|
| Worker (API) | 라이브 | `https://sherpa-api.sherpain21.workers.dev` |
| Pages (프론트) | 라이브 | `https://sherpa-in.com` |
| D1 Database | 스키마 적용 완료 | `af152582-9250-4d97-b6c8-5c402988ec1e` |
| JWT_SECRET | 등록 완료 | wrangler secret |
| 커스텀 도메인 | 연결 완료 | `sherpa-in.com` |
| 크론 트리거 | 활성 | 매일 오전 6시 (KST) |

---

## 완료된 파일

| 파일 | 상태 |
|------|------|
| `frontend/src/css/app.css` | v2.1 |
| `frontend/src/js/config.js` | 실배포 URL |
| `frontend/src/js/sidebar.js` | v2.1 |
| `frontend/src/js/topbar.js` | v2.1 |
| `frontend/src/js/api.js` | v2.1 (51 엔드포인트) |
| `frontend/src/js/auth.js` | v2.1 (snowball 매핑) |
| `frontend/src/js/place-rank.js` | v2.1 (요금제 + 재시도) |
| `frontend/app/dashboard.html` | v2.1 (PRO + 1억 눈덩이) |
| `frontend/app/place/rank.html` | v2.1 |
| `worker/wrangler.toml` | 실배포 DB ID |
| `worker/schema.sql` | 13테이블 + 23인덱스 |
| `worker/src/index.js` | 51 엔드포인트 (재시도 패치 적용) |
| `docs/SHERPAIN21_MASTER_PROMPT.md` | v2.1.1 |
| `docs/STYLE_GUIDE.md` | v1.2 |
| `docs/DEPLOY_GUIDE.md` | 배포 가이드 |

---

## 작업 방침 결정 사항

### 이식 우선 → 요금제 나중에

```
1단계 (현재): v1 페이지 전부 v2.1 레이아웃으로 이식
              → v1의 HTML+JS를 제공하면 사이드바+탑바+app.css에 맞게 변환
              → 요금제 제한 없이 기능만 동작하게

2단계: 전체 완성 후 요금제 정책을 한번에 설계
              → 어떤 기능에 제한/눈덩이 차감을 걸지 전체 그림 보고 결정

3단계: 요금제 제한 로직 일괄 적용
```

### 네이버 API 차단 이슈

- **원인**: Cloudflare Workers 공유 IP 대역에서 네이버 API 호출 시 rate limiting
- **현재 상태**: 첫 조회는 성공, 연속 조회 시 차단 (30초~수분 대기 후 풀림)
- **임시 조치**: 502 에러 시 30초 카운트다운 + 자동 재시도 UX 적용
- **추적 등록**: 등록은 성공, 수집 실패 시 "내일 자동 수집" 안내
- **근본 해결**: 오라클 클라우드 고정IP 프록시 (서버 준비 중)

```
현재:  Client → Workers → 네이버 API (차단 가능)
계획:  Client → Workers → 오라클 프록시(고정IP) → 네이버 API
```

---

## 다음 작업: v1 페이지 이식

### 이식 대기 (v1 코드 제공 필요)

| 순서 | 페이지 | v1 파일 필요 |
|------|--------|-------------|
| 1 | 플레이스 SEO 분석 | place-seo.html + place-seo.js |
| 2 | 플레이스 리뷰 로직분석 | place-logic.html + place-logic.js |
| 3 | 블로그 지수 분석 | blog-index.html + blog-index.js |
| 4 | 블로그 순위 분석 | blog-rank.html + blog-rank.js |
| 5 | 블로그 자동 포스팅 | blog-post.html + blog-post.js |
| 6 | 블로그 URL 생성기 | blog-url.html + blog-url.js |
| 7 | 키워드 검색량/조합 | keyword-volume.html + keyword-volume.js |
| 8 | 키워드 트렌드 | keyword-trend.html + keyword-trend.js |
| 9 | 키워드 마인드맵 | keyword-map.html + keyword-map.js |
| 10 | 광고 부정클릭 | ad-fraud.html + ad-fraud.js |
| 11 | CPC 추적 | ad-cpc.html + ad-cpc.js |
| ... | 나머지 | ... |

### 이식 방법
```
대표님이 할 일: v1의 HTML + JS 파일을 채팅에 붙여넣기
AI가 할 일:     v2.1 레이아웃(사이드바+탑바+app.css)에 맞게 변환
              → place/seo.html + place-seo.js 생성
              → 기능 100% 유지, 스타일만 v2.1
```

---

## 알려진 이슈

| # | 내용 | 우선순위 | 상태 |
|---|------|---------|------|
| 1 | 네이버 API 차단 (Workers IP) | 상 | 오라클 프록시로 해결 예정 |
| 2 | 눈덩이 환산 비율 미정 | 중 | 대표님 확인 필요 |
| 3 | 사이드바 접기 아이콘 FA Pro 전용 | 하 | 대체 아이콘 필요 |
| 4 | 소셜 로그인 미구현 | 중 | 이식 완료 후 |
| 5 | 에스크로 취소/환불 미구현 | 중 | 이식 완료 후 |
| 6 | 슬롯 추가 구매 API 미구현 | 중 | 이식 완료 후 |
| 7 | 미등록 시크릿 8개 | 중 | 해당 기능 사용 시 등록 |

---

## 새 세션 시작 체크리스트

```
□ SHERPAIN21_MASTER_PROMPT.md
□ STYLE_GUIDE.md
□ CURRENT_STATUS.md (이 파일)
□ frontend/src/css/app.css
□ frontend/src/js/config.js
□ frontend/src/js/sidebar.js
□ frontend/src/js/topbar.js
□ frontend/src/js/api.js
□ frontend/src/js/auth.js
□ frontend/app/dashboard.html
□ 이식할 v1 페이지 (HTML + JS)
```

---

## 재배포 명령어

```bash
# Worker
cd C:\sherpa-in.com\worker
wrangler deploy

# Pages
cd C:\sherpa-in.com
wrangler pages deploy frontend --project-name=sherpa-in
```

---

*마지막 업데이트: 2025-07-11 | 배포 완료 + place/rank 구현 + v1 이식 방침 결정*
