/**
 * setup.js — 테스트 환경 설정 헬퍼
 *
 * Jest의 jsdom 환경에서 실행된다 (@jest-environment jsdom).
 * runScripts: 'dangerously' 설정 덕분에 <script> 텍스트 콘텐츠가 실행된다.
 *
 * loadAllScripts() 호출 후:
 * - window.state, window.courseData, window.tracks, ... 전역 변수 접근 가능
 * - window.renderFilters(), window.renderTable(), ... 전역 함수 접근 가능
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/**
 * index.html의 DOM 구조와 동일한 최소 HTML 스켈레톤.
 * script.js가 의존하는 id/class들을 모두 포함한다.
 */
const BASE_HTML = `
  <div class="controls-wrapper">
    <div class="controls">
      <span class="filter-label">Tracks:</span>
      <div id="track-filters" class="chip-group"></div>
    </div>
    <div class="controls">
      <span class="filter-label">Micro Degrees:</span>
      <div id="md-filters" class="chip-group"></div>
      <div style="flex:1"></div>
      <button id="resetBtn" class="filter-chip reset-chip">Reset Filters</button>
    </div>
  </div>
  <main class="roadmap-wrapper">
    <div class="roadmap-table" id="roadmap-table"></div>
  </main>
  <div id="courseModal" class="modal">
    <div class="modal-box">
      <h2 id="modalTitle"></h2>
      <div id="modalMeta"></div>
      <p id="modalDesc"></p>
      <ul id="modalSimilars"></ul>
      <button class="close-btn">Close</button>
    </div>
  </div>
`;

/**
 * 테스트 파일에서 beforeAll()로 호출.
 * <script> 엘리먼트 삽입 방식으로 코드를 로드한다.
 * jsdom runScripts:'dangerously' 덕분에 전역 스코프에서 실행된다.
 */
function loadAllScripts() {
  // 1. DOM 구조 설정
  document.body.innerHTML = BASE_HTML;

  // 2. 브라우저 API polyfill
  window.requestAnimationFrame = (cb) => cb();
  window.open = jest.fn();
  if (window.history) {
    Object.defineProperty(window.history, 'pushState', {
      value: jest.fn(),
      writable: true,
    });
  }

  // 3. 스크립트 순서대로 <script> 태그 주입
  const order = ['courses.js', 'data.js', 'views.js', 'table.js', 'main.js'];
  order.forEach((filename) => {
    const code = fs.readFileSync(path.join(ROOT, filename), 'utf-8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = code;
    document.head.appendChild(scriptEl);
  });
}

module.exports = { loadAllScripts };
