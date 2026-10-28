// 열 묶음 계산: benchmark·subtask 칸에 단 속성으로 열 트리를 만들고, 묶음마다 평균을 낸다. DOM 을 쓰지 않는다.
// leaderboard.js 와 tests/leaderboard/pivot.test.mjs 가 globalThis.LBPivot 으로 쓴다.
(() => {
  'use strict';

  const NONE = '(none)';
  // micro 평균(문항 수 가중)은 정확도 계열 지표끼리만 뜻이 있다
  const ACCURACY_METRICS = ['exact_match', 'acc', 'prompt_level_strict_acc', 'relaxed_accuracy', 'all_correct'];
  const HIERARCHICAL = new Set(['domain']);

  // 점수 칸 목록. subtask 가 있으면 subtask 마다, 없으면 benchmark 자체가 한 칸이다
  function cells(meta) {
    const out = [];
    for (const b of meta.benchmarks) {
      const base = { ...(b.tags || {}), benchmark: [b.id] };
      if (b.subtasks && b.subtasks.length) {
        for (const s of b.subtasks) {
          out.push({ id: `${b.id}::${s.id}`, bench: b, sub: s, slice: s.slice !== false, tags: { ...base, ...(s.tags || {}), subtask: [`${b.id}::${s.id}`] } });
        }
        // subtask 가 모두 같은 문항을 다시 채점한 것(IFEval 등)이면 다른 줄 구성에서는 benchmark 자체를 한 칸으로 쓴다
        if (b.subtasks.every((s) => s.slice === false)) out.push({ id: b.id, bench: b, sub: null, slice: true, whole: true, tags: base });
      } else {
        out.push({ id: b.id, bench: b, sub: null, slice: true, tags: base });
      }
    }
    return out;
  }

  // path 는 이 칸 위에 있는 줄들. Benchmark 줄이 위에 없으면 subtask 이름만으로는 어느 benchmark 것인지 몰라 이름을 붙인다
  function label(axis, value, cell, path = []) {
    if (value === NONE) return NONE;
    if (axis === 'benchmark') return cell.bench.name;
    if (axis === 'subtask') return !cell.sub ? cell.bench.name : path.includes('benchmark') ? cell.sub.name : `${cell.bench.name} · ${cell.sub.name}`;
    return value.split('/').pop();
  }

  // 한 칸이 이 단계에서 갖는 값들. 위아래 단계가 있는 속성은 prefix 아래의 다음 단계 값만 낸다
  function valuesAt(cell, axis, prefix) {
    // subtask 가 없는 benchmark 는 subtask 줄에서 묶음을 만들지 않고 그 자리의 칸이 된다
    if (axis === 'subtask' && !cell.sub) return [];
    const vals = cell.tags[axis];
    if (!vals || !vals.length) return prefix.length ? [] : [NONE];
    if (!HIERARCHICAL.has(axis)) return [...new Set(vals)];
    const out = [];
    for (const v of vals) {
      const parts = v.split('/');
      if (prefix.every((p, i) => parts[i] === p) && parts.length > prefix.length) {
        const next = parts.slice(0, prefix.length + 1).join('/');
        if (!out.includes(next)) out.push(next);
      }
    }
    return out;
  }

  // 같은 문항을 다르게 채점한 subtask(slice:false)는 benchmark·subtask 줄로만 내려갈 때 보인다
  const allowed = (cell, path) => cell.slice || (path.includes('benchmark') && path.every((a) => a === 'benchmark' || a === 'subtask'));

  function buildTree(cellList, axes, open) {
    function group(cs, depth, parentKey, path, prefix) {
      // 이 축의 위아래 단계를 다 내려왔으면 다음 축으로
      const axis = axes[depth];
      if (axis === undefined) return cs.map((c) => ({ key: `${parentKey}>${c.id}`, axis: null, value: c.id, label: `${c.bench.name}${c.sub ? ' · ' + c.sub.name : ''}`, depth: path.length, children: [], leaf: c, open: false, expandable: false }));
      const order = [];
      const members = new Map();
      const direct = [];
      for (const c of cs) {
        const vs = valuesAt(c, axis, prefix);
        if (!vs.length && !prefix.length) direct.push(c);
        for (const v of vs) {
          if (!members.has(v)) { members.set(v, []); order.push(v); }
          members.get(v).push(c);
        }
      }
      order.sort((a, b) => (a === NONE) - (b === NONE));
      const leaves = direct.map((c) => ({ key: `${parentKey}>${c.id}`, axis: null, value: c.id, label: c.bench.name, depth: path.length, children: [], leaf: c, open: false, expandable: false }));
      return order.map((v) => {
        const key = `${parentKey}>${axis}=${v}`;
        const sub = members.get(v);
        const deeper = HIERARCHICAL.has(axis) && v !== NONE && sub.some((c) => valuesAt(c, axis, v.split('/')).length);
        const nextPath = [...path, axis];
        let children;
        let calc = null;
        if (deeper) {
          children = group(sub, depth, key, nextPath, v.split('/'));
          // 더 깊은 단계 값이 없는 칸(예: "STEM" 만 단 칸)은 그 단계에서 바로 칸으로 둔다
          const flat = sub.filter((c) => !valuesAt(c, axis, v.split('/')).length);
          if (flat.length) children = children.concat(group(flat, depth + 1, key, nextPath, []));
          // 값은 아래 단계(Chemistry 등)가 아니라 다음 줄 기준으로 낸다: "Domain ▸ Benchmark"면 STEM 안 benchmark 별 점수의 평균
          const next = axes[depth + 1];
          calc = group(sub.filter((c) => allowed(c, next ? [...nextPath, next] : nextPath)), depth + 1, key, nextPath, []);
        } else {
          const next = axes[depth + 1];
          const kept = sub.filter((c) => allowed(c, next ? [...nextPath, next] : nextPath));
          // 이 묶음에 칸이 하나뿐이고 축이 끝났으면 그 칸 자체가 leaf 다
          children = !next && kept.length === 1 && axis === 'subtask' ? [] : group(kept, depth + 1, key, nextPath, []);
          if (!next && kept.length === 1 && axis === 'subtask') {
            return { key, axis, value: v, label: label(axis, v, kept[0], path), depth: path.length, children: [], leaf: kept[0], open: false, expandable: false };
          }
        }
        // subtask 가 없는 benchmark 는 그 자신 한 칸뿐이라 펼칠 것이 없다
        const expandable = !(axis === 'benchmark' && children.length === 1 && children[0].leaf && !children[0].leaf.sub);
        return { key, axis, value: v, label: label(axis, v, sub[0], path), depth: path.length, children, calc, leaf: null, open: expandable && open.has(key), expandable };
      // 아래 줄 때문에 칸이 하나도 남지 않은 묶음(예: slice:false subtask 아래 Domain 줄)은 뺀다
      }).filter((n) => n.leaf || n.children.length).concat(leaves);
    }
    // 같은 문항을 다시 채점한 subtask 는 Benchmark 가 맨 위이고 Benchmark·Subtask 줄뿐일 때만 보이고, 그 밖에는 benchmark 한 칸(whole)이 대신한다
    const alt = axes[0] === 'benchmark' && axes.every((a) => a === 'benchmark' || a === 'subtask');
    return group(cellList.filter((c) => (c.whole ? !alt : c.slice || alt)), 0, '', [], []);
  }

  // 이미지를 받지 못하는 모델의 이미지 benchmark 칸. opts.imageInput 이 없으면 row.meta.image_input 을 쓴다
  function isTextOnly(bench, row, run, opts) {
    const input = opts.imageInput ?? row.meta?.image_input;
    return bench.modality === 'image' && input === false && (!run || run.score == null);
  }

  // benchmark 하나의 공식 값(점수·문항당 토큰·시간)
  function benchValue(bench, row, mode, opts) {
    const run = row.runs[bench.id];
    if (isTextOnly(bench, row, run, opts)) {
      if (opts.textOnly === 'exclude') return { excluded: true };
      return { value: mode === 'score' ? 0 : null, textOnly: true };
    }
    if (!run) return { value: null };
    if (mode === 'time') return { value: run.wall_seconds ?? null };
    if (mode === 'tokens') return { value: run.output_tokens ? run.output_tokens / bench.n_items : null };
    return { value: run.score ?? null };
  }

  function leafValue(cell, row, mode, opts) {
    if (!cell.sub) return benchValue(cell.bench, row, mode, opts);
    const run = row.runs[cell.bench.id];
    if (isTextOnly(cell.bench, row, run, opts)) return opts.textOnly === 'exclude' ? { excluded: true } : { value: mode === 'score' ? 0 : null, textOnly: true };
    if (!run || mode === 'time') return { value: null };
    if (mode === 'tokens') return { value: run.subtask_tokens?.[cell.sub.id] ?? null };
    const s = run.subtasks;
    return { value: s && !Array.isArray(s) ? s[cell.sub.id] ?? null : null };
  }

  // 여러 값을 단 칸은 한 묶음 아래 여러 번 나올 수 있어 한 번씩만 센다
  const leavesOf = (node) => [...new Map((function all(n) { return n.leaf ? [n.leaf] : n.children.flatMap(all); })(node).map((c) => [c.id, c])).values()];

  // benchmark 칸이 그 benchmark 의 칸을 모두 담고 있으면 공식 점수를 보인다. 일부(예: Chemistry 아래 MMLU-Pro)면 그 칸들의 평균이다
  function isOfficial(node) {
    return node.axis === 'benchmark' && benchesOf(node)[0].whole;
  }

  // 묶음 안의 benchmark 와, 그 benchmark 의 칸을 모두 담았는지(whole). 시간처럼 benchmark 단위로만 잰 값을 묶을 때 쓴다
  function benchesOf(node) {
    const by = new Map();
    for (const c of leavesOf(node)) {
      if (!by.has(c.bench.id)) by.set(c.bench.id, { bench: c.bench, cells: [] });
      by.get(c.bench.id).cells.push(c);
    }
    return [...by.values()].map(({ bench, cells }) => {
      const ids = new Set(cells.map((c) => c.id));
      const whole = cells.some((c) => !c.sub) || bench.subtasks.filter((s) => s.slice !== false).every((s) => ids.has(`${bench.id}::${s.id}`));
      return { bench, whole };
    });
  }

  function micro(node, row, mode, opts) {
    if (mode !== 'score') return null;
    const ls = leavesOf(node);
    if (!ls.length || !ls.every((c) => ACCURACY_METRICS.includes(c.bench.metric))) return null;
    let num = 0, den = 0;
    for (const c of ls) {
      const r = leafValue(c, row, mode, opts);
      if (r.excluded || r.value == null) continue;
      const w = (c.sub ? c.sub.n_items : c.bench.n_items) || 0;
      num += r.value * w;
      den += w;
    }
    return den ? num / den : null;
  }

  function mean(results) {
    const kept = results.filter((r) => !r.excluded);
    const vals = kept.filter((r) => r.value != null);
    const partial = vals.length < kept.length || vals.some((r) => r.partial);
    // 실제 결과 없이 이미지 칸 0점만 있고 나머지가 비었으면 숫자를 내지 않는다
    if (partial && vals.length && vals.every((r) => r.textOnly)) return { value: null, partial, m: vals.length, n: kept.length };
    return { value: vals.length ? vals.reduce((a, r) => a + r.value, 0) / vals.length : null, partial, m: vals.length, n: kept.length };
  }

  function nodeValue(node, row, mode, opts = {}) {
    if (node.leaf) return { m: 1, n: 1, partial: false, micro: null, ...leafValue(node.leaf, row, mode, opts) };
    if (isOfficial(node)) {
      // benchmark 칸은 subtask 평균이 아니라 공식 점수다(MMLU-Pro 전체 정답률, BFCL 가중 overall 등)
      return { m: 1, n: 1, partial: false, micro: null, ...benchValue(leavesOf(node)[0].bench, row, mode, opts) };
    }
    if (mode === 'time') return { value: null, partial: false, m: 0, n: 0, micro: null };
    const r = mean((node.calc || node.children).map((c) => nodeValue(c, row, mode, opts)));
    return { ...r, micro: micro(node, row, mode, opts) };
  }

  // Average 열: 체크한 benchmark 들의 공식 값의 macro
  function average(row, meta, checked, mode, opts = {}) {
    const bs = meta.benchmarks.filter((b) => checked.has(b.id));
    if (!bs.length) return { value: null, partial: false, m: 0, n: 0 };
    return mean(bs.map((b) => benchValue(b, row, mode, opts)));
  }

  globalThis.LBPivot = { cells, buildTree, nodeValue, average, isOfficial, benchesOf, NONE };
})();
