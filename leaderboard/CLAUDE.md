# CLAUDE.md — leaderboard

LLM leaderboard 화면. 평가 실행 코드와 운영 절차는 seungtaek `projects/llm-leaderboard`(README)와 skill `llm-leaderboard` 에 있다.

benchmark 를 `data/benchmarks.json` 에 더할 때 `metric_short`, benchmark·subtask 의 `tags`(축 목록은 파일 맨 위 `axes`), 같은 문항을 다르게 채점한 subtask 의 `slice: false` 를 함께 단다. `tests/leaderboard/` 의 테스트(`node --test tests/leaderboard/*.test.mjs`)가 빠진 것을 잡는다.

## PR

- branch 를 따서 draft PR 로 올리고, 사용자가 괜찮다고 하면 squash merge 한다. 성격이 다른 변경은 PR 을 나눈다.
- 화면이 바뀌는 PR 은 본문 끝 `## 화면` 절에 스크린샷을 넣는다.
  - 바뀐 부분만 보이게 찍는다. 화면 전체를 찍지 말고, 모델 검색으로 행을 몇 개로 줄이고 가로 스크롤로 해당 열을 맞춘 뒤 그 영역만 자른다(2026-10-30 "전체화면으로 캡쳐해서 깃헙에서 한눈에 보기가 어렵다").
  - 글씨가 원래 크기로 보이게 한다. 본문 폭(약 820px)보다 넓게 찍으면 줄어들어 안 읽힌다. 창 폭을 820px 이하로 찍거나(720px 이하면 휴대폰 배치) legend 와 표를 나눠 찍고, `<img width>` 는 찍은 CSS 폭 그대로 둔다. 이미지를 바꿀 때는 파일 이름을 바꾼다(GitHub 이 같은 이름의 옛 이미지를 캐시한다).
  - headless Chrome(`--force-device-scale-factor=2`)으로 찍는다. 클릭한 상태가 필요하면 클릭 script 를 붙인 임시 html 을 만들어 찍고 지운다. 찍은 이미지를 직접 열어 사이트 공통 CSS(`css/style.css`)가 덮어쓴 곳이 없는지 본다.
  - 이미지는 orphan branch `pr-assets` 의 `pr<번호>/` 에 두고 `https://raw.githubusercontent.com/hist0613/hist0613.github.io/pr-assets/pr<번호>/<이름>.png` 로 건다. master 에는 넣지 않는다.
- PR 본문과 페이지 문구에는 과제명과 평가를 돌리는 내부 인프라를 쓰지 않는다.
