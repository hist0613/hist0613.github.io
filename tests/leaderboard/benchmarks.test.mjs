// leaderboard/data/benchmarks.json 의 속성 데이터. 실행: node --test tests/leaderboard/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const META = JSON.parse(readFileSync(new URL('../../leaderboard/data/benchmarks.json', import.meta.url)));
const AXES = ['benchmark', 'subtask', 'language', 'language_pair', 'input', 'task_type', 'domain', 'cross_domain', 'difficulty', 'scoring'];

test('axes list', () => {
  assert.deepEqual(META.axes.map((a) => a.id), AXES);
  assert.ok(META.axes.every((a) => a.label));
});

test('every benchmark has metric_short and core tags', () => {
  for (const b of META.benchmarks) {
    assert.ok(b.metric_short, `${b.id} metric_short`);
    for (const ax of ['task_type', 'input', 'language']) assert.ok(b.tags?.[ax]?.length, `${b.id} ${ax}`);
  }
});

test('slice false marks exactly the re-scored subtasks', () => {
  const marked = META.benchmarks.flatMap((b) => b.subtasks.filter((s) => s.slice === false).map((s) => `${b.id}/${s.id}`)).sort();
  assert.deepEqual(marked, [
    'ifeval/inst_level_loose_acc', 'ifeval/inst_level_strict_acc', 'ifeval/prompt_level_loose_acc', 'ifeval/prompt_level_strict_acc',
    'k_mmbench/acc_vanilla', 'locomo/locomo_adversarial',
  ]);
});

test('domain paths have no empty parts', () => {
  const vals = META.benchmarks.flatMap((b) => [...(b.tags?.domain || []), ...b.subtasks.flatMap((s) => s.tags?.domain || [])]);
  assert.ok(vals.length);
  for (const v of vals) assert.ok(v.split('/').every((p) => p.trim()), v);
});

test('every MMLU-Pro subject has a domain', () => {
  const m = META.benchmarks.find((b) => b.id === 'mmlu_pro');
  assert.equal(m.subtasks.length, 14);
  for (const s of m.subtasks) assert.ok(s.tags?.domain?.length || m.tags?.domain?.length, s.id);
});

test('subject-split benchmarks give every subtask a domain', () => {
  for (const id of ['mmlu_pro', 'kmmlu_redux', 'mmmu', 'mmstar', 'k_mmstar', 'chembench']) {
    const b = META.benchmarks.find((x) => x.id === id);
    for (const s of b.subtasks) assert.ok(s.tags?.domain?.length || b.tags?.domain?.length, `${id}/${s.id}`);
  }
});
