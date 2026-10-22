# CLAUDE.md — leaderboard

LLM leaderboard 화면. 평가 실행 코드와 운영 절차는 seungtaek `projects/llm-leaderboard`(README)와 skill `llm-leaderboard` 에 있다.

## PR

- branch 를 따서 draft PR 로 올리고, 사용자가 괜찮다고 하면 squash merge 한다. 성격이 다른 변경은 PR 을 나눈다.
- 화면이 바뀌는 PR 은 본문 끝 `## 화면` 절에 스크린샷을 넣는다.
  - headless Chrome(`--force-device-scale-factor=2`)으로 찍는다. 클릭한 상태가 필요하면 클릭 script 를 붙인 임시 html 을 만들어 찍고 지운다. 찍은 이미지를 직접 열어 사이트 공통 CSS(`css/style.css`)가 덮어쓴 곳이 없는지 본다.
  - 이미지는 orphan branch `pr-assets` 의 `pr<번호>/` 에 두고 `https://raw.githubusercontent.com/hist0613/hist0613.github.io/pr-assets/pr<번호>/<이름>.png` 로 건다. master 에는 넣지 않는다.
- PR 본문과 페이지 문구에는 과제명과 평가를 돌리는 내부 인프라를 쓰지 않는다.
