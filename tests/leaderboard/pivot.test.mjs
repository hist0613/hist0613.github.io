// leaderboard/pivot.js 의 열 묶음 계산. 실행: node --test tests/leaderboard/
import { test } from 'node:test';
import assert from 'node:assert/strict';

await import('../../leaderboard/pivot.js');
const P = globalThis.LBPivot;

const META = {
  benchmarks: [
    { id: 'A', name: 'Bench A', metric: 'exact_match', n_items: 300, tags: { language: ['English'] },
      subtasks: [
        { id: 'a_chem', name: 'chemistry', n_items: 100, tags: { domain: ['STEM/Chemistry'] } },
        { id: 'a_law', name: 'law', n_items: 200, tags: { domain: ['Law'] } },
        { id: 'a_alt', name: 'other metric', slice: false, tags: { domain: ['STEM/Chemistry'] } },
      ] },
    { id: 'B', name: 'Bench B', metric: 'exact_match', n_items: 50, tags: { domain: ['STEM/Chemistry', 'STEM/Biology'] }, subtasks: [] },
    { id: 'T', name: 'Bench T', metric: 'chrf', n_items: 20, tags: {},
      subtasks: [
        { id: 't_enko', name: 'en→ko', n_items: 10, tags: { language_pair: ['en→ko'] } },
        { id: 't_koen', name: 'ko→en', n_items: 10, tags: { language_pair: ['ko→en'] } },
      ] },
    { id: 'I', name: 'Bench I', metric: 'acc', modality: 'image', n_items: 40, tags: { domain: ['STEM/Chemistry'] }, subtasks: [] },
  ],
};

// 공식 점수(score)는 subtask 평균과 일부러 다르게 둔다
const ROW = {
  meta: { image_input: true },
  runs: {
    A: { score: 0.7, subtasks: { a_chem: 0.9, a_law: 0.3, a_alt: 0.1 }, output_tokens: 3000, wall_seconds: 60, subtask_tokens: { a_chem: 12, a_law: 8 } },
    B: { score: 0.5, subtasks: [], output_tokens: 500, wall_seconds: 10 },
    T: { score: 0.6, subtasks: { t_enko: 0.4, t_koen: 0.8 }, output_tokens: 200, wall_seconds: 5 },
    I: { score: 0.2, subtasks: [], output_tokens: 400, wall_seconds: 8 },
  },
};
const TEXT_ROW = { meta: { image_input: false }, runs: { ...ROW.runs, I: undefined } };
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
const find = (nodes, label) => nodes.find((n) => n.label === label);
const ALL_OPEN = { has: () => true };

test('default axes reproduce benchmark ▸ subtask', () => {
  const tree = P.buildTree(P.cells(META), ['benchmark', 'subtask'], new Set());
  assert.deepEqual(tree.map((n) => n.label), ['Bench A', 'Bench B', 'Bench T', 'Bench I']);
  const a = P.buildTree(P.cells(META), ['benchmark', 'subtask'], ALL_OPEN)[0];
  assert.deepEqual(a.children.map((n) => n.label), ['chemistry', 'law', 'other metric']);
});

test('benchmark node shows official score', () => {
  const a = P.buildTree(P.cells(META), ['benchmark', 'subtask'], new Set())[0];
  close(P.nodeValue(a, ROW, 'score', {}).value, 0.7);
});

test('group is macro of visible children', () => {
  const tree = P.buildTree(P.cells(META), ['domain', 'benchmark'], ALL_OPEN);
  const stem = find(tree, 'STEM');
  // STEM ▸ (Chemistry ▸ A,B,I / Biology ▸ B): Chemistry = mean(A 0.7, B 0.5, I 0.2), Biology = 0.5
  close(P.nodeValue(find(stem.children, 'Chemistry'), ROW, 'score', {}).value, (0.7 + 0.5 + 0.2) / 3);
  close(P.nodeValue(stem, ROW, 'score', {}).value, ((0.7 + 0.5 + 0.2) / 3 + 0.5) / 2);
  const flat = P.buildTree(P.cells(META), ['domain'], ALL_OPEN);
  // Domain 한 줄이면 Chemistry 아래는 점수 칸 전체: a_chem 0.9, B 0.5, I 0.2
  close(P.nodeValue(find(find(flat, 'STEM').children, 'Chemistry'), ROW, 'score', {}).value, (0.9 + 0.5 + 0.2) / 3);
});

test('multi-valued cell counts once per group', () => {
  const tree = P.buildTree(P.cells(META), ['domain'], ALL_OPEN);
  const stem = find(tree, 'STEM');
  const leaves = (n) => (n.leaf ? [n.leaf.id] : n.children.flatMap(leaves));
  assert.equal(leaves(find(stem.children, 'Chemistry')).filter((id) => id === 'B').length, 1);
  assert.equal(leaves(find(stem.children, 'Biology')).filter((id) => id === 'B').length, 1);
  assert.equal(stem.children.length, 2);
});

test('leaf columns without benchmark axis', () => {
  const tree = P.buildTree(P.cells(META), ['language_pair'], ALL_OPEN);
  assert.deepEqual(find(tree, 'en→ko').children.map((n) => n.leaf && n.leaf.id), ['T::t_enko']);
  assert.equal(tree[tree.length - 1].label, '(none)');
});

test('partial marks star', () => {
  const row = { meta: { image_input: true }, runs: { ...ROW.runs, B: undefined } };
  const v = P.nodeValue(find(P.buildTree(P.cells(META), ['domain', 'benchmark'], ALL_OPEN), 'STEM').children[1], row, 'score', {});
  assert.equal(v.value, null);
  const chem = P.nodeValue(find(find(P.buildTree(P.cells(META), ['domain', 'benchmark'], ALL_OPEN), 'STEM').children, 'Chemistry'), row, 'score', {});
  assert.equal(chem.partial, true);
  assert.equal(chem.m, 2);
  assert.equal(chem.n, 3);
});

test('slice false excluded from groups', () => {
  const flat = P.buildTree(P.cells(META), ['domain'], ALL_OPEN);
  const ids = (n) => (n.leaf ? [n.leaf.id] : n.children.flatMap(ids));
  assert.ok(!ids(find(flat, 'STEM')).includes('A::a_alt'));
});

test('text-only cells: zero vs exclude', () => {
  const tree = P.buildTree(P.cells(META), ['domain', 'benchmark'], ALL_OPEN);
  const chem = find(find(tree, 'STEM').children, 'Chemistry');
  const zero = P.nodeValue(chem, TEXT_ROW, 'score', { textOnly: 'zero' });
  close(zero.value, (0.7 + 0.5 + 0) / 3);
  assert.equal(zero.partial, false);
  const excl = P.nodeValue(chem, TEXT_ROW, 'score', { textOnly: 'exclude' });
  close(excl.value, (0.7 + 0.5) / 2);
  assert.equal(excl.partial, false);
  const avg = P.average(TEXT_ROW, META, new Set(['A', 'I']), 'score', { textOnly: 'zero' });
  close(avg.value, 0.35);
});

test('average with no checked benchmarks is null', () => {
  assert.equal(P.average(ROW, META, new Set(), 'score', {}).value, null);
  close(P.average(ROW, META, new Set(['A', 'T']), 'score', {}).value, 0.65);
});

test('time mode is benchmark only', () => {
  const tree = P.buildTree(P.cells(META), ['domain', 'benchmark'], ALL_OPEN);
  assert.equal(P.nodeValue(find(tree, 'STEM'), ROW, 'time', {}).value, null);
  const bench = P.buildTree(P.cells(META), ['benchmark', 'subtask'], new Set())[0];
  assert.equal(P.nodeValue(bench, ROW, 'time', {}).value, 60);
});

test('tokens use subtask tokens', () => {
  const a = P.buildTree(P.cells(META), ['benchmark', 'subtask'], ALL_OPEN)[0];
  assert.equal(P.nodeValue(a.children[0], ROW, 'tokens', {}).value, 12);
  close(P.nodeValue(a, ROW, 'tokens', {}).value, 10);
});

test('micro only for accuracy metrics', () => {
  const flat = P.buildTree(P.cells(META), ['domain'], ALL_OPEN);
  const chem = P.nodeValue(find(find(flat, 'STEM').children, 'Chemistry'), ROW, 'score', {});
  close(chem.micro, (0.9 * 100 + 0.5 * 50 + 0.2 * 40) / 190);
  const pair = P.nodeValue(find(P.buildTree(P.cells(META), ['language_pair'], ALL_OPEN), 'en→ko'), ROW, 'score', {});
  assert.equal(pair.micro, null);
});

test('same subtask id in two benchmarks stays apart', () => {
  const meta = { benchmarks: [
    { id: 'X', name: 'X', n_items: 1, subtasks: [{ id: 'acc_math', name: 'math', n_items: 1 }] },
    { id: 'Y', name: 'Y', n_items: 1, subtasks: [{ id: 'acc_math', name: 'math', n_items: 1 }] },
  ] };
  assert.equal(P.buildTree(P.cells(meta), ['subtask'], new Set()).length, 2);
});

test('benchmark without subtasks is not expandable', () => {
  const tree = P.buildTree(P.cells(META), ['benchmark', 'subtask'], ALL_OPEN);
  const b = find(tree, 'Bench B');
  assert.equal(b.expandable, false);
  assert.equal(find(tree, 'Bench A').expandable, true);
  assert.ok(!b.children.some((n) => n.label === '(none)'));
});

test('no empty groups when a row sits below subtask', () => {
  const tree = P.buildTree(P.cells(META), ['benchmark', 'subtask', 'domain'], ALL_OPEN);
  const empty = [];
  const walk = (n) => { if (!n.leaf && !n.children.length) empty.push(n.key); n.children.forEach(walk); };
  tree.forEach(walk);
  assert.deepEqual(empty, []);
});

test('zero fills alone do not make an average', () => {
  // 텍스트 benchmark 가 아직 하나도 안 끝난 텍스트 전용 모델: 이미지 칸 0점만으로 0.0 을 내지 않는다
  const row = { meta: { image_input: false }, runs: {} };
  assert.equal(P.average(row, META, new Set(['A', 'I']), 'score', { textOnly: 'zero' }).value, null);
  // 이미지 benchmark 만 고르면 0점이 답이다
  close(P.average(row, META, new Set(['I']), 'score', { textOnly: 'zero' }).value, 0);
});
