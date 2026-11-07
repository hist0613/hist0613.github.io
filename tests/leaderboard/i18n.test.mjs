// 화면 문구 한국어 사전(leaderboard/i18n.js)이 빠짐없는지. 실행: node --test tests/leaderboard/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = (p) => readFileSync(new URL(`../../leaderboard/${p}`, import.meta.url), 'utf8');
const ctx = { navigator: { language: 'en-US' } };
ctx.globalThis = ctx;
vm.runInNewContext(read('i18n.js'), ctx);
const { KO, HTML_KO } = ctx.LBI18N.dict;

// t( ... ) 인자 안의 문자열 literal 을 모은다. 괄호와 따옴표를 세어 인자 끝을 찾는다
function tStrings(src) {
  const out = [];
  const re = /(?<![\w.$])t\(/g;
  let m;
  while ((m = re.exec(src))) {
    let i = m.index + 2, depth = 1;
    while (i < src.length && depth) {
      const c = src[i];
      if (c === "'" || c === '"') {
        let j = i + 1;
        while (src[j] !== c) j += src[j] === '\\' ? 2 : 1;
        // 비교 대상(=== 'mih')은 key 가 아니다
        const compared = /[!=]==\s*$/.test(src.slice(m.index, i));
        if (!compared && (depth === 1 || src.slice(m.index, i).includes('{ score'))) out.push(src.slice(i + 1, j).replace(/\\(['"\\])/g, '$1'));
        i = j + 1;
        continue;
      }
      if (c === '`') { // 템플릿 literal 은 key 로 쓰지 않는다
        let j = i + 1;
        while (src[j] !== '`') j += src[j] === '\\' ? 2 : 1;
        i = j + 1;
        continue;
      }
      if (c === '(' || c === '{' || c === '[') depth++;
      if (c === ')' || c === '}' || c === ']') depth--;
      i++;
    }
  }
  return out;
}

test('every string passed to t() has a Korean entry', () => {
  const keys = [...new Set(tStrings(read('leaderboard.js')))].filter((k) => k.trim() && k !== 'en-US');
  assert.ok(keys.length > 100, `found only ${keys.length}`);
  assert.deepEqual(keys.filter((k) => KO[k] == null), []);
});

test('every data-i18n id in index.html has Korean HTML, and the reverse', () => {
  const ids = new Set([...read('index.html').matchAll(/data-i18n="(\w+)"/g)].map((m) => m[1]));
  assert.deepEqual([...ids].filter((id) => HTML_KO[id] == null), []);
  assert.deepEqual(Object.keys(HTML_KO).filter((id) => !ids.has(id)), []);
});

test('Korean keeps the same {placeholders}', () => {
  const ph = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
  assert.deepEqual(Object.keys(KO).filter((k) => ph(k) !== ph(KO[k])), []);
});

test('every axis label and tag value has a Korean entry', () => {
  const META = JSON.parse(read('data/benchmarks.json'));
  const vals = new Set(META.axes.map((a) => a.label));
  for (const b of META.benchmarks) {
    for (const x of [b, ...b.subtasks]) for (const [ax, vs] of Object.entries(x.tags || {})) if (ax !== 'subtask') for (const v of vs) vals.add(v.split('/').pop());
  }
  assert.deepEqual([...vals].filter((v) => KO[v] == null), []);
});

test('every benchmark has Korean description and metric label', () => {
  const META = JSON.parse(read('data/benchmarks.json'));
  for (const b of META.benchmarks) {
    assert.ok(b.description_ko, `${b.id} description_ko`);
    assert.ok(b.metric_label_ko, `${b.id} metric_label_ko`);
  }
});
