# CLAUDE.md — hist0613.github.io

Seungtaek Choi의 학술 홈페이지(GitHub Pages). 손으로 작성한 정적 HTML 사이트이며,
정적 사이트 생성기(Jekyll 등)를 쓰지 않는다. 사이트는 루트에서 서빙된다.

## 페이지 구성

- `index.html` — About (홈)
- `publications/`, `teaching/` — 각 섹션
- `blog/` — 블로그 (아래 상세)
- `css/style.css` — 전 페이지 공유 스타일, `css/blog.css` — 블로그 전용

## 블로그 구조

```
blog/
  build.py                       목록·리다이렉트 생성 + 새 글 스캐폴딩 (stdlib only)
  _template/post.html            새 글 템플릿 (placeholder 포함)
  posts/<slug>/
    en/index.html, ko/index.html 글 본문 (언어별, 자유 형식 HTML — 수기 작성)
    assets/                      그 글 전용 이미지 (두 언어 공유)
  en/index.html, ko/index.html   언어별 글 목록      ┐ build.py가 생성
  index.html, posts/<slug>/index.html  리다이렉트 스텁 ┘ (수정 금지)
tests/test_build.py              build.py 단위 테스트
```

- 메타데이터는 글 HTML의 `<meta name="blog:*">` 태그: `title` `date` `summary`
  `tags` `image` `lang`. build.py가 이를 읽어 목록을 만든다.
- `blog:image`가 있으면 목록에 측면 썸네일이 렌더된다 (값 = 글 폴더 기준 경로).
- URL은 `.html` 없는 클린 URL. 블로그 페이지는 루트 절대경로(`/css/...`)를 쓴다.

## build.py 사용

```bash
python3 blog/build.py            # 목록·리다이렉트 스텁 재생성
python3 blog/build.py --new <slug>   # 새 글 폴더 스캐폴딩
python3 tests/test_build.py      # 테스트 (코드 수정 시 실행)
```

- 글을 추가·수정한 뒤 반드시 `python3 blog/build.py`로 목록을 재생성한다.
- build.py 실행 후 생기는 `__pycache__`는 지운다 (`.gitignore`에 등록돼 있음).
- KO 전용 글이면 빌드 시 `경고: <slug>: en 버전 누락`이 뜨는데 정상이다.

## 미리보기

루트 절대경로를 쓰므로 `file://`로 열면 깨진다. 저장소 루트에서:

```bash
python3 -m http.server 8000      # → http://localhost:8000/blog/
```

## 글 작성 규칙 (말투)

- **한국어판을 원본으로 먼저** 쓴다. 영어판은 사용자가 명시적으로 요청할 때만
  작업한다 (내용 확정 전 영어를 미리 쓰면 헛수고).
- 한국어 종결은 **~다체**(평서 문어체). 합니다체 아님. 사색적·담백, 군더더기 없이.
- 영어 technical keyword(LLM-as-a-Judge, reliability 등)는 **번역하지 말고 그대로**.
- 제목은 **명사형**. 서술형("~하며" 등) 금지.
- 본문은 산문이되 흐름이 있게. 문학적 수식·정형구 반복 금지.

## 글 구조

- 글머리: 논문 리뷰 등은 제목·링크·학회 순의 `<ul>` bullet로 정리하고 시작한다.
  링크는 URL을 그대로 표시한다(`arXiv:xxxx` 식 축약 표기 대신). 저자·affiliation은
  적지 않는다. 본문 안에 인라인으로 논문을 소개하며 링크 거는 방식은 쓰지 않는다.
- 긴 글은 `<h2>` 섹션 헤더로 나눈다.
- 그림·표는 `<figure><img><figcaption>`. 논문의 핵심 표는 PDF에서 직접 캡처해
  `assets/`에 넣는다 (poppler `pdftocairo`로 영역 크롭).
- 글 끝에는 `<footer class="post-footer">`의 콜로폰("Seungtaek Choi · 날짜").

## 인용 / 참고문헌 규칙

선행 연구는 텍스트로 풀어쓰지 않고 `[N]`으로 인용하고 글 하단에 목록을 둔다.
**현재 수동 작업** — build.py는 인용을 처리하지 않으므로 글 HTML에 직접 작성한다.

- 본문 인용: `<a id="cite-N" href="#ref-N">[N]</a>` — 괄호까지 통째로 링크.
- 인용 본문 표현은 저자명 prefix("Lalor 등[3]") 대신 **[N]을 주어처럼**
  ("[3]에서는 …"). 프로젝트·방법명(JE-IRT[8])이나 발표처·설명("ICML 2026
  논문[11]") 같은 정보성 표현은 OK.
- 하단 목록: `<ul class="references">`, 각 항목
  `<li id="ref-N"><a class="ref-num" href="#cite-N">[N]</a><span class="ref-cite">저자. 제목. 발표. <a href="...">arXiv:...</a></span></li>`
- 본문 `[N]` ↔ 참고문헌 `[N]`이 양방향으로 점프한다. `:target`이면 하이라이트.
- 스타일은 `blog.css`에 있음 (`.references`, `.ref-num` 등).

## 디자인 (style.css — 전 페이지 공유)

- 흰 배경. `.content` 카드 = 흰색 + 1px 테두리(`#e6e6e6`) + 파란 상단 막대
  (3px `#035384`) + 둥근 모서리(8px).
- nav는 `.nav-inner`(좌측 `Seungtaek Choi` 브랜드 + 우측 `.nav-links`).
  모든 페이지(About/Publications/Teaching/Blog) 동일.
- 블로그 본문은 `blog.css` — Pretendard 폰트, 미니멀 타이포그래피.

## 주의

- 커밋은 사용자가 명시적으로 요청할 때만. `git add .` 금지 — 파일별로 추가.
- 기존 페이지(index/publications/teaching)의 손작성 HTML 구조를 존중한다.
- 스펙·계획 문서: `docs/superpowers/specs|plans/2026-05-19-multilingual-blog*`.
