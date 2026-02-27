/**
 * utils.test.js — 순수 함수 단위 테스트
 */
const { loadAllScripts } = require('./setup');

beforeAll(() => {
  loadAllScripts();
});

// ─── hexToRgba ────────────────────────────────────────────────────────────────
describe('hexToRgba', () => {
  test('converts 6-digit hex to rgba string', () => {
    expect(window.hexToRgba('#3b82f6', 0.5)).toBe('rgba(59,130,246,0.5)');
  });

  test('alpha 0 gives transparent', () => {
    expect(window.hexToRgba('#000000', 0)).toBe('rgba(0,0,0,0)');
  });

  test('alpha 1 gives opaque', () => {
    expect(window.hexToRgba('#ffffff', 1)).toBe('rgba(255,255,255,1)');
  });

  test('handles common track color #10b981', () => {
    expect(window.hexToRgba('#10b981', 0.18)).toBe('rgba(16,185,129,0.18)');
  });
});

// ─── calculateSimilarityColors ────────────────────────────────────────────────
describe('calculateSimilarityColors', () => {
  test('simColorMap is populated after init()', () => {
    expect(window.simColorMap.size).toBeGreaterThan(0);
  });

  test('simNumberMap assigns sequential numbers starting at 1', () => {
    const nums = Array.from(window.simNumberMap.values());
    expect(Math.min(...nums)).toBe(1);
    const sorted = [...nums].sort((a, b) => a - b);
    sorted.forEach((v, i) => expect(v).toBe(i + 1));
  });

  test('only similar_ids with count > 1 appear in simColorMap', () => {
    const countMap = {};
    window.courseData.forEach((c) => {
      if (c.similar_id) countMap[c.similar_id] = (countMap[c.similar_id] || 0) + 1;
    });
    for (const sid of window.simColorMap.keys()) {
      expect(countMap[sid]).toBeGreaterThan(1);
    }
  });

  test('simColorMap values are valid hex colors', () => {
    for (const color of window.simColorMap.values()) {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  test('recalculating re-populates maps with same size', () => {
    const sizeBefore = window.simColorMap.size;
    window.calculateSimilarityColors();
    expect(window.simColorMap.size).toBe(sizeBefore);
  });
});
