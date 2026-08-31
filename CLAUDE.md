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
python3 -m http.server 8001      # → http://localhost:8001/blog/  (8000은 lecture-agent 전용)
```

## 글 작성 규칙 (말투)

글쓰기는 coding agent가 아니라 writing assistant 자아로 한다 — 자연스러운 글을 쓰려고 적극적으로 노력하라고 명시적으로 당부받은 부분이다. 기준은 교수 본인의 네이버 블로그 말투(~다체의 사색적 에세이).

**기본**
- **한국어판만 작업한다.** 영어판은 사용자가 명시적으로 요청할 때만. 한국어가 원본이고, 영어는 한국어에 맞춰 옮긴다(영어 -> 한국어 번역은 번역체가 되니 금지).
- 종결은 **~다체**(평서 문어체, 합니다체 아님). 다만 구어에 가깝게 — "~는 거다", "얹혀 있다", "갈아 끼운다".
- 톤은 담백·간결·사색적. 문학적 수식·정형구 없이.
- 제목은 **명사형**. "블로그를 시작하며"(X) -> "블로그 시작"(O).
- 영어 technical keyword(LLM-as-a-Judge, reliability 등)는 번역하지 말고 그대로.
- 용어는 정확하게: "무게" -> "가중치", "한 칸" -> "한 문제", "재다" -> "평가하다".

**강하게 반복 지적된 금지**
- **번역투 금지.** 영어 에세이 훅의 리듬("X. But actually Y.")을 한글에 그대로 옮기지 말 것. 한국어답게 생각 순서대로 이어라.
- **반전·훅 프레이밍 금지.** "사실은", "은근슬쩍 숨기는 게 하나 있다", "그런데 여기서 흥미로운 건" 같이 뜸 들이는 구조를 강하게 거부한다. 반전 없이 곧장 전달. 접속의 "그런데"는 다음 생각으로 넘어갈 때만.
- **dash 삽입구 금지.** "A — 부연 — B"는 한글에서 잘 안 쓰는 형태다. 수식어는 문장 앞으로 풀거나 문장을 나눈다. 부연으로 dash를 쓸 땐 대상을 먼저 쓰고 그 뒤에 붙인다.
- **AI 말투 정형구 금지**: "흥미로운 건 ~라는 점이다", "~인 셈이다", "~게 된다", "흐릿하다" 류.
- **같은 비유 반복 금지.** "자(ruler)" 비유는 한 번은 좋지만 "judge를 재는 자"로 또 쓰면 구리다.
- **사실을 극화·날조하지 말 것.** 예: 인용한 논문을 "이 글을 쓰게 만든 논문"처럼 실제와 다른 동기로 포장하지 않는다. 논문은 객관적으로 소개.
- 섹션 헤더에 "(인접)", "(곁다리)" 같은 try-hard 메타 표지 금지.

**깊이**
- **고등학생도 이해할 수준으로 자세히.** "재는 능력", "흔들리는 정도" 같은 정의 안 된 추상 표현을 던지지 말고 구체적 예로 푼다(쉬운 문항 많이 맞힌 모델과 어려운 문항 맞힌 모델이 같은 점수 -> 실력이 같은 게 아니다).
- 개인적·구어적 곁들임은 환영("어찌저찌 살다 보니 이번 기회에 정리해봤다"). 개인 일화는 흐름의 뿌리로 자연스럽게 연결하고 뜬금없이 끼워넣지 않는다.
- 친숙한 비유를 적극 활용(IRT를 수능 표준점수로).
- 묶음 인용 OK — 관련 논문 여러 편이면 `[1, 2, 3]`. related work 밀도를 지향해도 좋다.
- 승부처 문장(도입·핵심 정의·펀치라인)은 2-3개 변주로 내고 반응을 본 뒤 나머지에 전파한다. 단 A/B/C 메뉴 남발 자체가 훅 버릇이니 최소화.

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

## News 항목 규칙 (index.html)

- 항목은 **지우지 않고** 최신 것을 위에 쌓는다.
- 예외: **소속 이동**(`I joined ...`) 항목은 가장 최근 하나만 남기고,
  이전 소속은 News에서 빼고 `Experience` 섹션으로 이관한다.
- 형식은 `<li><b>MMM YYYY</b>: 문장.</li>`. 날짜 외에 `<b>`로 강조하는 것은
  **따옴표로 부를 수 있는 고유명사**뿐이다 — 사업명, 논문 제목 등 (Talks 섹션과 같은 관례).
  서술 구절(연구 주제 설명 등)은 통째로 굵히면 문장이 뭉개지므로 강조하지 않는다.
  학회명·기관명처럼 `<a>` 링크가 걸리는 것도 링크로 이미 구분되므로 bold를 겹치지 않는다.
- 연구과제 선정:
  `Our lab has been awarded the <b>사업명(국문 병기)</b> grant from the <a>기관</a>,
  for research on <연구 주제> (시작&ndash;종료 연도).`
  금액·과제번호는 적지 않는다 (학계 관례).
- preprint: `A new preprint, <b>"제목"</b>, is available on <a>arXiv</a>.`

## 디자인 (style.css — 전 페이지 공유)

- 흰 배경. `.content` 카드 = 흰색 + 1px 테두리(`#e6e6e6`) + 파란 상단 막대
  (3px `#035384`) + 둥근 모서리(8px).
- nav는 `.nav-inner`(좌측 `Seungtaek Choi` 브랜드 + 우측 `.nav-links`).
  모든 페이지(About/Publications/Teaching/Blog) 동일.
- 강조는 `<b>`=400, `<strong>`=700으로 굵기가 다르다. body가 300이라 400만으로
  충분히 구분되고, Lato에는 semibold가 없어 700은 곧장 Bold로 튄다. News·Awards처럼
  본문 흐름 안의 강조는 `<b>`를 쓴다.
- 블로그 본문은 `blog.css` — Pretendard 폰트, 미니멀 타이포그래피. 목록은 미니멀 리스트+측면 썸네일, 본문은 좁은 폭(720px)+figure 캡션.
- **세리프·종이톤 시도 금지** — "뜬금없다"고 거부된 방향이다.
- **figure는 작게.** `figure-wide`나 큰 max-width를 습관적으로 붙이지 말 것. 가로형이라도 기본은 본문 폭보다 한참 작게(max-width 360-480px). "그림이 너무 크다"는 반복 지적.

## 주의

- 커밋은 사용자가 명시적으로 요청할 때만. `git add .` 금지 — 파일별로 추가.
- 기존 페이지(index/publications/teaching)의 손작성 HTML 구조를 존중한다.
- 스펙·계획 문서: `docs/superpowers/specs|plans/2026-05-19-multilingual-blog*`.
