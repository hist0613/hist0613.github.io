/**
 * highlights.test.js — 하이라이트·필터 비주얼 로직 테스트
 */
const { loadAllScripts } = require('./setup');

beforeAll(() => {
  loadAllScripts();
  // Ensure full view
  window.state.viewMode = 'all';
  window.renderTable();
});

function resetFilters() {
  window.state.activeTrack = null;
  window.state.activeMD = null;
  window.state.activeGroup = null;
  window.state.activeLayer = null;
  window.state.activeLayerTag = null;
  window.updateHighlights();
}

afterEach(resetFilters);

// ─── Default state (no filter) ─────────────────────────────────────────────
describe('updateHighlights — no active filter', () => {
  test('no card is dimmed by default', () => {
    window.updateHighlights();
    expect(document.querySelectorAll('.course-card.dimmed').length).toBe(0);
  });

  test('cards with multi-dept similar_id have "similar" class', () => {
    window.updateHighlights();
    expect(document.querySelectorAll('.course-card.similar').length).toBeGreaterThan(0);
  });
});

// ─── Track filter ─────────────────────────────────────────────────────────────
describe('updateHighlights — track active', () => {
  test('some cards are highlighted, others dimmed', () => {
    window.state.activeTrack = window.tracks[0].id;
    window.updateHighlights();
    expect(document.querySelectorAll('.course-card.highlighted').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.course-card.dimmed').length).toBeGreaterThan(0);
  });

  test('highlighted cards are all in track.required_similars', () => {
    const track = window.tracks[0];
    const reqSet = new Set(track.required_similars);
    window.state.activeTrack = track.id;
    window.updateHighlights();
    document.querySelectorAll('.course-card.highlighted').forEach((card) => {
      expect(reqSet.has(card.dataset.similar)).toBe(true);
    });
  });

  test('dimmed cards are NOT in track.required_similars', () => {
    const track = window.tracks[0];
    const reqSet = new Set(track.required_similars);
    window.state.activeTrack = track.id;
    window.updateHighlights();
    document.querySelectorAll('.course-card.dimmed').forEach((card) => {
      expect(reqSet.has(card.dataset.similar)).toBe(false);
    });
  });
});

// ─── Layer filter ────────────────────────────────────────────────────────────
describe('updateHighlights — layer active', () => {
  test('L1/core highlights only L1+core cards', () => {
    window.state.activeLayer = 'L1';
    window.state.activeLayerTag = 'core';
    window.updateHighlights();
    const highlighted = document.querySelectorAll('.course-card.highlighted');
    expect(highlighted.length).toBeGreaterThan(0);
    highlighted.forEach((card) => {
      expect(card.dataset.layer).toBe('L1');
      expect(card.dataset.layerTag).toBe('core');
    });
  });

  test('L0/literacy highlights only L0 cards', () => {
    window.state.activeLayer = 'L0';
    window.state.activeLayerTag = 'literacy';
    window.updateHighlights();
    document.querySelectorAll('.course-card.highlighted').forEach((card) => {
      expect(card.dataset.layer).toBe('L0');
    });
  });
});

// ─── Similarity group filter ────────────────────────────────────────────────
describe('updateHighlights — similarity group active', () => {
  test('only cards with the selected similar_id are highlighted', () => {
    const sid = [...window.simColorMap.keys()][0];
    window.state.activeGroup = sid;
    window.updateHighlights();
    const highlighted = document.querySelectorAll('.course-card.highlighted');
    expect(highlighted.length).toBeGreaterThan(0);
    highlighted.forEach((card) => {
      expect(card.dataset.similar).toBe(sid);
    });
  });

  test('cards not in the group are dimmed', () => {
    const sid = [...window.simColorMap.keys()][0];
    window.state.activeGroup = sid;
    window.updateHighlights();
    document.querySelectorAll('.course-card.dimmed').forEach((card) => {
      expect(card.dataset.similar).not.toBe(sid);
    });
  });
});
