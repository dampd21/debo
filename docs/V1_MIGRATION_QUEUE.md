# V1_MIGRATION_QUEUE.md
# v1 → v2.1 이식 대기열
# 이 파일의 내용을 새 세션에서 함께 제공하면 됩니다

---

## 이식 대기 (5개 — 코드 확인 완료)

| # | v1 파일 | v2.1 경로 | API 의존 | 비고 |
|---|--------|----------|---------|------|
| 1 | ad-fraud.html + ad-fraud.js | `app/ad/fraud.html` + `ad-fraud.js` | 없음 (프론트 전용, CSV 파싱) | 탭 4개, SVG 차트 |
| 2 | biz-data.html + biz-data.js | `app/data/biz.html` + `biz-data.js` | `SherpaAPI.biz.collect` | 탭 2개, localStorage 저장함 |
| 3 | blog-analysis.html + blog-analysis.js | `app/blog/index.html` + `blog-analysis.js` | 외부 API (`sherpain-blog-analyzer.onrender.com`) | SVG 계기판, 차트 |
| 4 | blog-posting.html + blog-posting.js | `app/blog/post.html` + `blog-posting.js` | `SherpaAPI.blog.generate` | 탭 3개, Chrome 확장 연동 |
| 5 | client-manage.html + client-manage.js | `app/settings/clients.html` (신규 경로) | 없음 (localStorage) | 모달 2개, 마케터 전용 |

## 이식 작업 패턴 (모든 페이지 동일)

```
변경하는 것:
- v1 사이드바/헤더 → v2.1 사이드바+탑바 레이아웃
- v1 CSS 클래스 → app.css 디자인 토큰
- 스크립트 경로 → v2.1 경로 (../../src/js/...)
- 컬러 #4A6CF7 → #2563EB
- dev-toolbar 제거

변경하지 않는 것:
- JS 로직 100% 유지
- HTML 구조 (카드/테이블/탭/모달) 유지
- 기능 축소 없음
```

## 새 세션에서 할 일

```
1. 마스터 프롬프트 + 스타일 가이드 + CURRENT_STATUS 제공
2. app.css + sidebar.js + topbar.js + config.js + api.js + auth.js 제공
3. 이 파일 (V1_MIGRATION_QUEUE.md) 제공
4. "이 5개 페이지를 v2.1로 이식해줘" 요청
5. v1 HTML+JS 코드는 이미 이 세션에서 확인 완료 — 다시 제공할 필요 없음
   (단, 새 AI 세션은 이전 코드를 기억 못하므로 다시 붙여넣어야 함)
```

## 블로그 분석 특이사항

blog-analysis.js는 외부 API를 사용합니다:
```
API_BASE = SHERPA_CONFIG.BLOG_ANALYZER_API_URL || 'https://sherpain-blog-analyzer.onrender.com'
```
→ config.js에 `BLOG_ANALYZER_API_URL` 추가 필요

---

*2025-07-11 작성*
