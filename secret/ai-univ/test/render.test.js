/**
 * render.test.js — DOM 렌더링 테스트
 */
const { loadAllScripts } = require('./setup');

beforeAll(() => {
  loadAllScripts();
});

// ─── init() 기본 렌더 ─────────────────────────────────────────────────────────
describe('init() — default render', () => {
  test('track-filters has at least one chip', () => {
    expect(document.querySelectorAll('#track-filters .filter-chip').length).toBeGreaterThan(0);
  });

  test('md-filters has at least one chip', () => {
    expect(document.querySelectorAll('#md-filters .filter-chip').length).toBeGreaterThan(0);
  });

  test('roadmap-table has 8 table-row elements in full view', () => {
    expect(document.querySelectorAll('.table-row').length).toBe(8);
  });

  test('state.viewMode defaults to "all"', () => {
    expect(window.state.viewMode).toBe('all');
  });

  test('course-card elements are rendered', () => {
    expect(document.querySelectorAll('.course-card').length).toBeGreaterThan(50);
  });
});

// ─── renderFilters ────────────────────────────────────────────────────────────
describe('renderFilters', () => {
  test('layer-filters container is created', () => {
    expect(document.getElementById('layer-filters')).not.toBeNull();
  });

  test('layer-filters has 7 chips (L0+L1×2+L2×2+L3×2)', () => {
    expect(document.querySelectorAll('#layer-filters .filter-chip').length).toBe(7);
  });

  test('view mode buttons rendered (>= 6)', () => {
    expect(document.querySelectorAll('.view-btn').length).toBeGreaterThanOrEqual(6);
  });

  test('exactly one view button is active', () => {
    expect(document.querySelectorAll('.view-btn.active').length).toBe(1);
  });

  test('Show New Courses checkbox is checked by default', () => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(true);
  });
});

// ─── Track filter click ────────────────────────────────────────────────────────
describe('track filter interaction', () => {
  afterEach(() => {
    window.state.activeTrack = null;
    window.state.activeMD = null;
    window.state.activeLayer = null;
    window.state.activeLayerTag = null;
    window.state.activeGroup = null;
    window.renderFilters();
    window.renderTable();
  });

  test('clicking a track chip sets state.activeTrack', () => {
    const chips = document.querySelectorAll('#track-filters .filter-chip');
    expect(chips.length).toBeGreaterThan(0);
    chips[0].click();
    expect(window.state.activeTrack).not.toBeNull();
  });

  test('clicking the same chip again toggles state.activeTrack off', () => {
    const chips = document.querySelectorAll('#track-filters .filter-chip');
    chips[0].click();
    const tracked = window.state.activeTrack;
    expect(tracked).not.toBeNull();
    chips[0].click();
    expect(window.state.activeTrack).toBeNull();
  });

  test('clicking a track clears activeMD and activeLayer', () => {
    window.state.activeMD = 0;
    window.state.activeLayer = 'L1';
    const chips = document.querySelectorAll('#track-filters .filter-chip');
    chips[0].click();
    expect(window.state.activeMD).toBeNull();
    expect(window.state.activeLayer).toBeNull();
  });
});

// ─── Reset button ─────────────────────────────────────────────────────────────
describe('resetBtn', () => {
  test('clicking reset clears all filter state', () => {
    window.state.activeTrack = 'dummy_track';
    window.state.activeMD = 1;
    window.state.activeGroup = 'ml';
    window.state.activeLayer = 'L2';
    window.state.activeLayerTag = 'core';

    document.getElementById('resetBtn').click();

    expect(window.state.activeTrack).toBeNull();
    expect(window.state.activeMD).toBeNull();
    expect(window.state.activeGroup).toBeNull();
    expect(window.state.activeLayer).toBeNull();
    expect(window.state.activeLayerTag).toBeNull();
  });
});

// ─── View mode routing ────────────────────────────────────────────────────────
describe('view mode rendering', () => {
  afterEach(() => {
    window.state.viewMode = 'all';
    window.renderTable();
  });

  test('"tracks" view renders .track-overview-wrapper', () => {
    window.state.viewMode = 'tracks';
    window.renderTable();
    expect(document.querySelector('.track-overview-wrapper')).not.toBeNull();
  });

  test('"faculty" view renders .faculty-wrapper', () => {
    window.state.viewMode = 'faculty';
    window.renderTable();
    expect(document.querySelector('.faculty-wrapper')).not.toBeNull();
  });

  test('"pbl" view renders .pbl-wrapper', () => {
    window.state.viewMode = 'pbl';
    window.renderTable();
    expect(document.querySelector('.pbl-wrapper')).not.toBeNull();
  });

  test('"all" view renders 8 table-row elements', () => {
    window.state.viewMode = 'all';
    window.renderTable();
    expect(document.querySelectorAll('.table-row').length).toBe(8);
  });

  test('"ai" view hides AX-only department columns', () => {
    window.state.viewMode = 'ai';
    window.renderTable();
    const headers = document.querySelectorAll('.col-header:not(.semester-col)');
    const texts = Array.from(headers).map((h) => h.textContent.trim());
    // AX-only depts (ELLT, 산업경영, 바이오) should not appear
    const hasAXOnly = texts.some(
      (t) => t.includes('ELLT') || t.includes('산업경영') || t.includes('바이오메디컬')
    );
    expect(hasAXOnly).toBe(false);
  });
});

// ─── Modal ───────────────────────────────────────────────────────────────────
describe('openModal', () => {
  test('populates modalTitle with course name', () => {
    const course = window.courseData[0];
    const dept = window.departments.find((d) => d.id === course.dept);
    window.openModal(course, dept);
    expect(document.getElementById('modalTitle').textContent).toBe(course.name);
  });

  test('adds "visible" class to #courseModal', () => {
    const course = window.courseData[0];
    const dept = window.departments.find((d) => d.id === course.dept);
    window.openModal(course, dept);
    expect(document.getElementById('courseModal').classList.contains('visible')).toBe(true);
  });

  test('close button removes "visible" class', () => {
    document.getElementById('courseModal').classList.add('visible');
    document.querySelector('.close-btn').click();
    expect(document.getElementById('courseModal').classList.contains('visible')).toBe(false);
  });

  test('lists similar courses for course with shared similar_id', () => {
    const course = window.courseData.find(
      (c) =>
        c.similar_id &&
        window.courseData.filter((x) => x.similar_id === c.similar_id).length > 1
    );
    if (!course) return;
    const dept = window.departments.find((d) => d.id === course.dept);
    window.openModal(course, dept);
    const items = document.querySelectorAll('#modalSimilars li');
    expect(items.length).toBeGreaterThan(0);
  });
});

// ─── Hash routing ─────────────────────────────────────────────────────────────
describe('applyHashToState', () => {
  afterEach(() => {
    window.state.viewMode = 'all';
  });

  test('valid hash "#faculty" sets viewMode to "faculty"', () => {
    window.location.hash = '#faculty';
    window.applyHashToState();
    expect(window.state.viewMode).toBe('faculty');
  });

  test('invalid hash does not change viewMode', () => {
    window.state.viewMode = 'all';
    window.location.hash = '#no_such_view';
    window.applyHashToState();
    expect(window.state.viewMode).toBe('all');
  });

  test('all 6 valid views are accepted by applyHashToState', () => {
    ['all', 'ai', 'ax', 'tracks', 'faculty', 'pbl'].forEach((v) => {
      window.location.hash = `#${v}`;
      window.applyHashToState();
      expect(window.state.viewMode).toBe(v);
    });
  });
});
