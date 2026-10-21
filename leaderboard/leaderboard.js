// LLM leaderboard: reads data/benchmarks.json and data/results.json and renders the table.
(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const SIZE_BUCKETS = [
    { id: 'xs', label: '< 2B', test: (p) => p < 2 },
    { id: 's', label: '2–5B', test: (p) => p >= 2 && p < 5 },
    { id: 'm', label: '5–10B', test: (p) => p >= 5 && p < 10 },
    { id: 'l', label: '≥ 10B', test: (p) => p >= 10 },
  ];

  const state = {
    query: [],
    settings: new Set(),
    sizes: new Set(SIZE_BUCKETS.map((b) => b.id)),
    mode: 'score',
    group: true,
    openBench: new Set(),
    openModels: new Set(),
    details: new Set(),
    sort: { key: 'avg', dir: -1 },
    costBench: '__avg',
    costAxis: 'tokens',
  };

  let META, RES, ROWS, MODELS, SETTING_LABEL, SETTING_ORDER;
  let view = { cols: [], lines: [], colStats: {} };

  // ---------- data ----------
  function buildRows() {
    MODELS = Object.fromEntries(RES.models.map((m) => [m.id, m]));
    // 평가 중인 (모델, 설정, benchmark): collect.py 가 서버 대기열에서 읽어 둔 것. 결과가 아직 없는 모델도 행으로 보인다
    view.inProgress = new Map((RES.in_progress || []).map((x) => [`${x.model}|${x.setting}|${x.benchmark}`, x.state]));
    SETTING_LABEL = Object.fromEntries(META.settings.map((s) => [s.id, s.label]));
    SETTING_ORDER = Object.fromEntries(META.settings.map((s, i) => [s.id, i]));
    const byKey = new Map();
    for (const r of RES.runs) {
      const key = `${r.model}|${r.setting}`;
      if (!byKey.has(key)) byKey.set(key, { key, model: r.model, setting: r.setting, meta: MODELS[r.model] || { id: r.model }, runs: {} });
      byKey.get(key).runs[r.benchmark] = r;
    }
    for (const x of RES.in_progress || []) {
      const key = `${x.model}|${x.setting}`;
      if (!byKey.has(key)) byKey.set(key, { key, model: x.model, setting: x.setting, meta: MODELS[x.model] || { id: x.model }, runs: {} });
    }
    ROWS = [...byKey.values()];
    // one color per model, stable across filters
    const ids = [...new Set(ROWS.map((r) => r.model))].sort();
    view.colorIdx = Object.fromEntries(ids.map((m, i) => [m, i]));
    view.color = Object.fromEntries(ids.map((m, i) => [m, PALETTE[i % PALETTE.length]]));
  }

  function columns() {
    const cols = [];
    for (const b of META.benchmarks) {
      cols.push({ id: b.id, bench: b, kind: 'main', first: true });
      if (state.mode === 'score' && state.openBench.has(b.id)) {
        for (const s of b.subtasks) cols.push({ id: `${b.id}::${s.id}`, bench: b, sub: s, kind: 'sub' });
      }
    }
    return cols;
  }

  function cellValue(row, col) {
    const run = row.runs[col.bench.id];
    if (!run) return null;
    if (state.mode === 'time') return col.kind === 'main' ? run.wall_seconds ?? null : null;
    if (state.mode === 'tokens') return col.kind === 'main' && run.output_tokens ? run.output_tokens / col.bench.n_items : null;
    if (col.kind === 'main') return run.score ?? null;
    return run.subtasks?.[col.sub.id] ?? null;
  }

  // ---------- filtering ----------
  function parseQuery(text) {
    const pats = [];
    for (let raw of text.split(',')) {
      raw = raw.trim();
      if (!raw) continue;
      const neg = raw.startsWith('!');
      if (neg) raw = raw.slice(1).trim();
      if (!raw) continue;
      let re;
      const m = raw.match(/^\/(.*)\/([a-z]*)$/);
      if (m) re = new RegExp(m[1], m[2].includes('i') ? m[2] : m[2] + 'i');
      else if (/[*?]/.test(raw)) re = new RegExp('^' + raw.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
      else re = new RegExp(raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      pats.push({ neg, re });
    }
    return pats;
  }

  function matches(row) {
    if (!state.settings.has(row.setting)) return false;
    const p = row.meta.params_b;
    if (p != null && !SIZE_BUCKETS.some((b) => state.sizes.has(b.id) && b.test(p))) return false;
    const pos = state.query.filter((q) => !q.neg);
    const id = row.model;
    if (pos.length && !pos.some((q) => q.re.test(id))) return false;
    if (state.query.some((q) => q.neg && q.re.test(id))) return false;
    return true;
  }

  // ---------- stats ----------
  function rowSummary(rows) {
    const main = META.benchmarks.map((b) => ({ id: b.id, bench: b, kind: 'main' }));
    // rank of each row per benchmark (1 = best score). When settings are grouped, a row is ranked
    // against the other models' best setting, so ranks run from 1 to the number of models.
    const ranks = new Map(rows.map((r) => [r.key, []]));
    for (const c of main) {
      const scored = rows.filter((r) => r.runs[c.id]?.score != null);
      if (state.group) {
        const best = new Map();
        for (const r of scored) best.set(r.model, Math.max(best.get(r.model) ?? -Infinity, r.runs[c.id].score));
        for (const r of scored) {
          const v = r.runs[c.id].score;
          let rank = 1;
          for (const [m, b] of best) if (m !== r.model && b > v) rank++;
          ranks.get(r.key).push(rank);
        }
      } else {
        scored.sort((a, b) => b.runs[c.id].score - a.runs[c.id].score).forEach((r, i) => ranks.get(r.key).push(i + 1));
      }
    }
    for (const r of rows) {
      const scores = main.map((c) => r.runs[c.id]?.score).filter((v) => v != null);
      const secs = main.map((c) => r.runs[c.id]?.wall_seconds).filter((v) => v != null);
      r.n = scores.length;
      r.avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
      const rk = ranks.get(r.key);
      r.avgRank = rk.length ? rk.reduce((a, b) => a + b, 0) / rk.length : null;
      r.total = secs.length ? secs.reduce((a, b) => a + b, 0) : null;
      // output tokens per item over the generative benchmarks
      const gen = main.filter((c) => r.runs[c.id]?.output_tokens);
      r.tokens = gen.length ? gen.reduce((a, c) => a + r.runs[c.id].output_tokens, 0) / gen.reduce((a, c) => a + c.bench.n_items, 0) : null;
    }
  }

  const summaryValue = (r) => (state.mode === 'time' ? r.total : state.mode === 'tokens' ? r.tokens : r.avg);

  function sortValue(row) {
    const k = state.sort.key;
    if (k === 'avg') return summaryValue(row);
    if (k === 'rank') return row.avgRank;
    if (k === 'params') return row.meta.params_b ?? null;
    if (k === 'model') return row.model.toLowerCase();
    const col = view.cols.find((c) => c.id === k);
    return col ? cellValue(row, col) : null;
  }

  function compare(a, b) {
    const va = sortValue(a), vb = sortValue(b);
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === 'string') return state.sort.dir * va.localeCompare(vb);
    return state.sort.dir * (va - vb);
  }

  function describe(values) {
    const v = values.filter((x) => x.value != null).sort((a, b) => a.value - b.value);
    if (!v.length) return null;
    const n = v.length;
    const nums = v.map((x) => x.value);
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const median = n % 2 ? nums[(n - 1) / 2] : (nums[n / 2 - 1] + nums[n / 2]) / 2;
    const sd = Math.sqrt(nums.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
    return { n, mean, median, sd, min: v[0], max: v[n - 1], nums };
  }

  // ---------- formatting ----------
  const fmtScore = (v) => (v == null ? '–' : (v * 100).toFixed(1));
  function fmtTime(s) {
    if (s == null) return '–';
    if (s < 60) return `${Math.round(s)}s`;
    const m = Math.round(s / 60);
    if (m < 60) return `${m}m`;
    return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
  }
  function fmtTokens(v) {
    if (v == null) return '–';
    if (v >= 10000) return Math.round(v / 1000) + 'k';
    if (v >= 1000) return (v / 1000).toFixed(1) + 'k';
    return String(Math.round(v));
  }
  const fmt = (v) => (state.mode === 'time' ? fmtTime(v) : state.mode === 'tokens' ? fmtTokens(v) : fmtScore(v));
  const MODE_RGB = { score: '37,99,235', time: '217,119,6', tokens: '13,148,136' };
  const MODE_HEX = { score: '#2563eb', time: '#d97706', tokens: '#0d9488' };
  // bf16 이 기본이라 표시하지 않고, 양자화 checkpoint 만 FP8 같은 표시를 붙인다
  const precLabel = (m) => (m.precision && m.precision !== 'bf16' ? m.precision.toUpperCase() : '');
  // benchmark 언어. 국기는 Windows 가 이모지로 그리지 못해 Twemoji SVG(flags/)를 쓰고, 언어 이름은 tooltip 과 대체 텍스트에 둔다
  const LANGS = { en: { name: 'English', flag: 'us' }, ko: { name: 'Korean', flag: 'kr' } };
  const langBadge = (code) => {
    const l = LANGS[code];
    if (!l) return `<span class="lang">${esc(code)}</span>`;
    return `<span class="lang" title="${l.name}"><img src="/leaderboard/flags/${l.flag}.svg" alt="${l.name}" width="16" height="16">${esc(code.toUpperCase())}</span>`;
  };
  const fmtParams = (p) => (p == null ? '–' : p < 10 ? p.toFixed(1) + 'B' : Math.round(p) + 'B');

  // eval time and tokens span orders of magnitude, so they are colored on a log scale
  const scale = (v) => (state.mode !== 'score' ? Math.log10(Math.max(v, 1)) : v);

  function heat(v, st) {
    if (v == null || !st || st.max.value === st.min.value) return '';
    const t = (scale(v) - scale(st.min.value)) / (scale(st.max.value) - scale(st.min.value));
    const rgb = MODE_RGB[state.mode];
    return `background-color: rgba(${rgb},${(0.04 + 0.4 * t).toFixed(3)})`;
  }

  function histogram(st) {
    if (!st) return '<svg width="70" height="16"></svg>';
    const bins = 14;
    const lo = state.mode !== 'score' ? scale(st.min.value) : 0;
    const hi = state.mode !== 'score' ? Math.max(scale(st.max.value), lo + 1e-9) : 1;
    const counts = new Array(bins).fill(0);
    for (const x of st.nums) counts[Math.max(0, Math.min(bins - 1, Math.floor(((scale(x) - lo) / (hi - lo)) * bins)))]++;
    const top = Math.max(...counts);
    const w = 70 / bins;
    const color = MODE_HEX[state.mode];
    const bars = counts.map((c, i) => {
      const h = c ? Math.max(2, (c / top) * 15) : 0;
      return `<rect x="${(i * w + 0.5).toFixed(2)}" y="${(16 - h).toFixed(2)}" width="${(w - 1).toFixed(2)}" height="${h.toFixed(2)}" fill="${color}" opacity=".75"/>`;
    }).join('');
    return `<svg width="70" height="16" aria-hidden="true"><line x1="0" y1="15.5" x2="70" y2="15.5" stroke="#e5e7eb"/>${bars}</svg>`;
  }

  // ---------- render ----------
  function render() {
    view.cols = columns();
    const rows = ROWS.filter(matches);
    rowSummary(rows);

    // group variants of the same model
    const lines = [];
    if (state.group) {
      const groups = new Map();
      for (const r of rows) {
        if (!groups.has(r.model)) groups.set(r.model, []);
        groups.get(r.model).push(r);
      }
      const list = [...groups.values()].map((g) => g.sort(compare));
      list.sort((a, b) => compare(a[0], b[0]));
      list.forEach((g, i) => {
        lines.push({ row: g[0], rank: i + 1, parent: true, nVariants: g.length - 1 });
        if (state.openModels.has(g[0].model)) for (const c of g.slice(1)) lines.push({ row: c, child: true });
      });
    } else {
      rows.sort(compare).forEach((r, i) => lines.push({ row: r, rank: i + 1 }));
    }
    view.lines = lines;

    // per-column stats over the rows that are visible
    const shown = lines.map((l) => l.row);
    view.colStats = {};
    for (const c of view.cols) view.colStats[c.id] = describe(shown.map((r) => ({ value: cellValue(r, c), row: r })));
    view.colStats.__avg = describe(shown.map((r) => ({ value: summaryValue(r), row: r })));
    view.colStats.__rank = describe(shown.map((r) => ({ value: r.avgRank, row: r })));

    $('#table').innerHTML = renderHead() + renderBody();
    $('#count').textContent = `${new Set(shown.map((r) => r.model)).size} models, ${shown.length} rows shown` +
      (state.group ? ' (settings grouped under each model; the top row is the best setting by the current sort)' : '');
    placeFrozen();
    syncTopbar();
    updateNav();
    renderCost(rows);
  }

  // ---------- score vs. cost ----------
  const PALETTE = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#db2777', '#0891b2', '#65a30d', '#475569', '#92400e', '#1e3a8a', '#c026d3'];
  const SETTING_SHORT = { 'think-off': 'off', 'think-low': 'low', 'think-medium': 'medium', 'think-high': 'high' };
  const COST_AXES = {
    tokens: { label: 'Output tokens per item', fmt: (v) => fmtTokens(v) },
    time: { label: 'Eval time', fmt: (v) => fmtTime(v) },
    memory: { label: 'Minimum GPU memory (GiB)', fmt: (v) => (v < 10 ? v.toFixed(1) : Math.round(v)) + ' GiB' },
    params: { label: 'Parameters', fmt: (v) => fmtParams(v) },
  };
  const quantile = (s, q) => {
    const i = (s.length - 1) * q, lo = Math.floor(i), hi = Math.ceil(i);
    return s[lo] + (s[hi] - s[lo]) * (i - lo);
  };
  const median = (a) => (a.length ? quantile([...a].sort((x, y) => x - y), 0.5) : null);

  // score and cost of one row for the chosen benchmark; the average only counts rows evaluated on every benchmark
  // Average 에 쓸 benchmark: 보이는 행의 80% 이상이 점수를 가진 것. benchmark 가 계속 늘어나므로 "전부 끝낸 행만"은 쓰지 않는다
  function avgBenchmarks(rows) {
    const scored = rows.filter((r) => META.benchmarks.some((b) => r.runs[b.id]?.score != null));
    return META.benchmarks.filter((b) => scored.length && scored.filter((r) => r.runs[b.id]?.score != null).length >= 0.8 * scored.length);
  }

  function costPoint(r, benchId, axis) {
    const set = benchId === '__avg' ? view.avgSet : [META.benchmarks.find((b) => b.id === benchId)];
    const runs = set.map((b) => r.runs[b.id]);
    if (!runs.length || runs.some((x) => !x || x.score == null)) return null;
    const y = runs.reduce((a, b) => a + b.score, 0) / runs.length;
    let x = null;
    if (axis === 'params') x = r.meta.params_b ?? null;
    else if (axis === 'time') x = runs.reduce((a, b) => a + (b.wall_seconds ?? NaN), 0);
    else if (axis === 'memory') x = Math.max(...runs.map((b) => b.min_memory_gib ?? NaN));
    else {
      const gen = runs.filter((b) => b.output_tokens);
      const items = gen.reduce((a, b) => a + META.benchmarks.find((m) => m.id === b.benchmark).n_items, 0);
      x = gen.length ? gen.reduce((a, b) => a + b.output_tokens, 0) / items : null;
    }
    return y == null || x == null || !isFinite(x) || x <= 0 ? null : { r, x, y };
  }

  function logTicks(lo, hi, axis) {
    if (axis === 'time') {
      const t = [10, 30, 60, 120, 300, 600, 1200, 1800, 3600, 7200, 18000, 36000, 72000, 180000].filter((v) => v >= lo && v <= hi);
      return t.length > 8 ? t.filter((_, i) => i % 2 === 0) : t;
    }
    const out = [];
    for (let e = Math.floor(Math.log10(lo)); e <= Math.ceil(Math.log10(hi)); e++) {
      for (const m of [1, 2, 5]) { const v = m * 10 ** e; if (v >= lo && v <= hi) out.push(v); }
    }
    return out.length > 9 ? out.filter((v) => /^1/.test(v.toExponential())) : out;
  }

  function renderCost(rows) {
    const benchId = state.costBench, axis = state.costAxis;
    const box = $('#cost-chart');
    view.avgSet = avgBenchmarks(rows);
    const pts = rows.map((r) => costPoint(r, benchId, axis)).filter(Boolean);
    const note = [];
    if (benchId === '__avg') {
      note.push(`The average uses the ${view.avgSet.length} benchmarks that at least 80% of the rows in view have finished (${view.avgSet.map((b) => b.name).join(', ')}), and only rows that have all of them.`);
    }
    if (benchId !== '__avg') {
      const bm = META.benchmarks.find((x) => x.id === benchId);
      if (bm) note.push(`${bm.name}: ${bm.description} Score: ${bm.metric_label}.`);
    }
    if (axis === 'time') note.push('Eval time depends on the GPU (RTX 4090 or RTX 5090) that ran it.');
    if (axis === 'memory') note.push('Weights plus the KV cache of one 8,192-token request, as allocated by vLLM. vLLM reserves most of the card up front, so the peak reading of the GPU is not informative.');
    if (axis === 'tokens' && benchId === '__avg') note.push('Tokens are generated tokens per item over those benchmarks.');
    $('#cost-note').textContent = note.join(' ');
    renderSettingTable(rows, benchId, axis);
    if (!pts.length) {
      const b = META.benchmarks.find((m) => m.id === benchId);
      box.innerHTML = `<p class="lb-empty">${axis === 'tokens' && b && /log-likelihood/i.test(b.metric_label)
        ? `${esc(b.name)} is scored by log-likelihood, so it generates no tokens. Pick another cost axis.`
        : 'No rows with both a score and this cost in the current view.'}</p>`;
      return;
    }

    const W = Math.max(320, box.clientWidth), H = W < 640 ? 340 : 460;
    const L = 46, R = 18, T = 14, B = 44;
    let x0 = Math.min(...pts.map((p) => p.x)), x1 = Math.max(...pts.map((p) => p.x));
    x0 /= 1.35; x1 *= 1.35;
    let y0 = Math.floor((Math.min(...pts.map((p) => p.y)) * 100 - 2) / 5) * 5, y1 = Math.ceil((Math.max(...pts.map((p) => p.y)) * 100 + 2) / 5) * 5;
    const sx = (v) => L + ((Math.log10(v) - Math.log10(x0)) / (Math.log10(x1) - Math.log10(x0))) * (W - L - R);
    const sy = (v) => T + (1 - (v * 100 - y0) / (y1 - y0)) * (H - T - B);

    let svg = '';
    for (let t = y0; t <= y1; t += y1 - y0 > 40 ? 10 : 5) {
      const y = sy(t / 100);
      svg += `<line x1="${L}" x2="${W - R}" y1="${y}" y2="${y}" class="grid"/><text x="${L - 6}" y="${y + 4}" class="tick" text-anchor="end">${t}</text>`;
    }
    for (const t of logTicks(x0, x1, axis)) {
      const x = sx(t);
      svg += `<line x1="${x}" x2="${x}" y1="${T}" y2="${H - B}" class="grid"/><text x="${x}" y="${H - B + 16}" class="tick" text-anchor="middle">${esc(COST_AXES[axis].fmt(t))}</text>`;
    }
    svg += `<text x="${(L + W - R) / 2}" y="${H - 6}" class="axis" text-anchor="middle">${esc(COST_AXES[axis].label)} (log scale) →</text>`;
    svg += `<text transform="translate(12 ${(T + H - B) / 2}) rotate(-90)" class="axis" text-anchor="middle">${esc(benchId === '__avg' ? 'Average score' : 'Score')} →</text>`;

    // Pareto front: points that no cheaper point beats
    const sorted = [...pts].sort((a, b) => a.x - b.x || b.y - a.y);
    const front = [];
    for (const p of sorted) if (!front.length || p.y > front[front.length - 1].y) front.push(p);
    const pareto = new Set(front);
    if (front.length > 1) svg += `<polyline class="pareto" points="${front.map((p) => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ')}"/>`;

    const byModel = new Map();
    for (const p of pts) {
      if (!byModel.has(p.r.model)) byModel.set(p.r.model, []);
      byModel.get(p.r.model).push(p);
    }
    for (const [model, ps] of byModel) {
      ps.sort((a, b) => SETTING_ORDER[a.r.setting] - SETTING_ORDER[b.r.setting]);
      if (ps.length > 1) svg += `<polyline data-mi="${view.colorIdx[model]}" class="mline" stroke="${view.color[model]}" points="${ps.map((p) => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ')}"/>`;
    }
    for (const p of pts) {
      const c = view.color[p.r.model];
      const off = p.r.setting === 'think-off';
      svg += `<circle data-mi="${view.colorIdx[p.r.model]}" cx="${sx(p.x).toFixed(1)}" cy="${sy(p.y).toFixed(1)}" r="${pareto.has(p) ? 5.5 : 4.5}" fill="${off ? '#fff' : c}" stroke="${c}" stroke-width="${off ? 2 : 1}"/>`;
    }

    // labels "Model (setting)", placed greedily where they do not overlap points or other labels
    const boxes = pts.map((p) => [sx(p.x) - 5, sy(p.y) - 5, sx(p.x) + 5, sy(p.y) + 5]);
    const hit = (b) => boxes.some((o) => b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1]) || b[0] < L || b[2] > W - R || b[1] < T || b[3] > H - B;
    const order = [...pts].sort((a, b) => (pareto.has(b) - pareto.has(a)) || b.y - a.y);
    for (const p of order) {
      const name = p.r.model.split('/').pop() + (precLabel(p.r.meta) && !/fp8/i.test(p.r.model) ? ` ${precLabel(p.r.meta)}` : '');
      const text = byModel.get(p.r.model).length > 1 || p.r.setting !== 'think-off' ? `${name} (${SETTING_SHORT[p.r.setting] || p.r.setting})` : name;
      const w = text.length * 6.1, h = 12, x = sx(p.x), y = sy(p.y);
      for (const [bx, by, anchor] of [[x + 8, y - 6, 'start'], [x - 8 - w, y - 6, 'end'], [x - w / 2, y - 20, 'middle'], [x - w / 2, y + 8, 'middle']]) {
        const b = [bx, by, bx + w, by + h];
        if (hit(b)) continue;
        boxes.push(b);
        const tx = anchor === 'start' ? bx : anchor === 'end' ? bx + w : bx + w / 2;
        svg += `<text data-mi="${view.colorIdx[p.r.model]}" class="plabel" x="${tx.toFixed(1)}" y="${(by + 10).toFixed(1)}" text-anchor="${anchor}" fill="${view.color[p.r.model]}">${esc(text)}</text>`;
        break;
      }
    }
    view.costPts = pts.map((p) => ({ ...p, px: sx(p.x), py: sy(p.y) }));
    view.costScale = W / box.clientWidth;
    box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Score against ${esc(COST_AXES[axis].label)}">${svg}</svg>`;
  }

  // per setting: how many rows, their median score, and the median change against thinking off for models that have both
  function renderSettingTable(rows, benchId, axis) {
    const settings = META.settings.map((s) => s.id).filter((id) => rows.some((r) => r.setting === id));
    const pts = rows.map((r) => costPoint(r, benchId, axis) || (benchId === '__avg' ? null : (r.runs[benchId] ? { r, y: r.runs[benchId].score, x: null } : null))).filter(Boolean);
    const base = new Map(pts.filter((p) => p.r.setting === 'think-off').map((p) => [p.r.model, p]));
    const body = settings.map((s) => {
      const ps = pts.filter((p) => p.r.setting === s);
      const paired = ps.filter((p) => s !== 'think-off' && base.has(p.r.model));
      const dy = median(paired.map((p) => p.y - base.get(p.r.model).y));
      const rx = median(paired.filter((p) => p.x && base.get(p.r.model).x).map((p) => p.x / base.get(p.r.model).x));
      const sign = (v) => (v >= 0 ? '+' : '−') + Math.abs(v * 100).toFixed(1);
      return `<tr><td><span class="badge ${esc(s)}">${esc(SETTING_LABEL[s] || s)}</span></td><td>${ps.length}</td><td>${fmtScore(median(ps.map((p) => p.y)))}</td>
        <td>${dy == null ? '–' : `${sign(dy)} <span class="muted">(${paired.length})</span>`}</td><td>${rx == null ? '–' : '×' + rx.toFixed(1)}</td></tr>`;
    }).join('');
    $('#setting-table').innerHTML = `<thead><tr><th>Reasoning</th><th>Rows</th><th>Median score</th>
      <th title="Median over models evaluated both with thinking off and in this setting">Score vs. thinking off</th>
      <th title="Median ratio over the same models">${esc(COST_AXES[axis].label)} vs. thinking off</th></tr></thead><tbody>${body}</tbody>`;
  }

  const costBox = $('#cost-chart');
  function highlight(mi) {
    if (costBox.dataset.hl === String(mi ?? '')) return;
    costBox.dataset.hl = mi ?? '';
    costBox.querySelectorAll('.hl').forEach((el) => el.classList.remove('hl'));
    costBox.classList.toggle('hl-on', mi != null);
    if (mi != null) costBox.querySelectorAll(`[data-mi="${mi}"]`).forEach((el) => el.classList.add('hl'));
  }
  costBox.addEventListener('mousemove', (e) => {
    const svg = costBox.querySelector('svg');
    if (!svg || !view.costPts) return;
    const rect = svg.getBoundingClientRect();
    const k = svg.viewBox.baseVal.width / rect.width;
    const mx = (e.clientX - rect.left) * k, my = (e.clientY - rect.top) * k;
    let best = null, bd = 14 * k;
    for (const p of view.costPts) {
      const d = Math.hypot(p.px - mx, p.py - my);
      if (d < bd) { bd = d; best = p; }
    }
    if (!best) { highlight(null); hideTip(); return; }
    highlight(view.colorIdx[best.r.model]);
    const run0 = state.costBench === '__avg' ? null : best.r.runs[state.costBench];
    showTip(`<b>${esc(best.r.model)}</b> (${esc(SETTING_SHORT[best.r.setting] || best.r.setting)})<br>Score ${fmtScore(best.y)}<br>${esc(COST_AXES[state.costAxis].label)}: ${esc(COST_AXES[state.costAxis].fmt(best.x))}` +
      (run0?.gpu ? `<br>${esc(run0.gpu.replace('NVIDIA GeForce ', ''))}` : ''), e.clientX, e.clientY);
  });
  costBox.addEventListener('mouseleave', () => { highlight(null); hideTip(); });

  function sortArrow(key) {
    return state.sort.key === key ? `<span class="arrow">${state.sort.dir < 0 ? '▼' : '▲'}</span>` : '';
  }

  function renderHead() {
    const statLabel = { score: 'Average', time: 'Total time', tokens: 'Per item' }[state.mode];
    let r1 = `<tr>
      <th class="fz c-rank" rowspan="2">#</th>
      <th class="fz c-model ch-stat" rowspan="2" data-sort="model" style="text-align:left!important">Model ${sortArrow('model')}</th>
      <th class="fz c-setting" rowspan="2">Reasoning</th>
      <th class="fz fz-last c-params ch-stat" rowspan="2" data-sort="params">Params ${sortArrow('params')}</th>
      <th class="bh" colspan="${state.mode === 'score' ? 2 : 1}">Summary</th>`;
    let r2 = `<tr><th class="ch first" data-sort="avg" data-col="__avg"><span class="ch-name">${statLabel} ${sortArrow('avg')}</span>${histogram(view.colStats.__avg)}</th>`;
    if (state.mode === 'score') r2 += `<th class="ch" data-sort="rank" data-col="__rank"><span class="ch-name">Avg rank ${sortArrow('rank')}</span><svg width="70" height="16"></svg></th>`;

    for (const b of META.benchmarks) {
      const open = state.openBench.has(b.id) && state.mode === 'score';
      const nsub = b.subtasks.length;
      const span = open ? 1 + nsub : 1;
      const btn = nsub
        ? `<button type="button" data-bench="${b.id}" aria-expanded="${open}" title="${open ? 'Hide' : 'Show'} ${nsub} subtasks"><span class="caret">▸</span>${esc(b.name)} <span class="nsub">${nsub}</span></button>`
        : `<span>${esc(b.name)}</span>`;
      r1 += `<th class="bh${open ? ' open' : ''}" colspan="${span}" data-bench-head="${b.id}" data-col="${b.id}"><span class="bh-label">${btn}
        ${langBadge(b.language)}<a class="ds" href="${esc(b.dataset_url)}" target="_blank" rel="noopener" title="Dataset on Hugging Face">data</a></span></th>`;
      for (const c of view.cols.filter((c) => c.bench.id === b.id)) {
        const name = c.kind === 'main' ? (open ? 'Overall' : { score: 'Score', time: 'Time', tokens: 'Tokens / item' }[state.mode]) : c.sub.name;
        const grp = c.kind === 'sub' && c.sub.group ? `<span class="ch-group">${esc(c.sub.group)}</span>` : '';
        r2 += `<th class="ch${c.kind === 'main' ? ' first' : ' sub'}" data-sort="${esc(c.id)}" data-col="${esc(c.id)}">${grp}<span class="ch-name">${esc(name)} ${sortArrow(c.id)}</span>${histogram(view.colStats[c.id])}</th>`;
      }
    }
    return `<thead>${r1}</tr>${r2}</tr></thead>`;
  }

  function renderBody() {
    const ncols = 4 + (state.mode === 'score' ? 2 : 1) + view.cols.length;
    let html = '<tbody>';
    for (const line of view.lines) {
      const r = line.row;
      const [org, ...rest] = r.model.split('/');
      const name = rest.length ? `<span class="m-org">${esc(org)}/</span>${esc(rest.join('/'))}` : esc(r.model);
      let toggle = '<span class="toggle"></span>';
      if (line.parent && line.nVariants > 0) {
        const open = state.openModels.has(r.model);
        toggle = `<button type="button" class="toggle" data-variants="${esc(r.model)}" aria-expanded="${open}" title="${open ? 'Hide' : 'Show'} other reasoning settings">${open ? '▾' : '▸'}</button>`;
      }
      const more = line.parent && line.nVariants > 0 ? `<span class="vcount">+${line.nVariants}</span>` : '';
      const prec = precLabel(r.meta);
      const summary = summaryValue(r);
      const partial = state.mode === 'score' && r.n < META.benchmarks.length ? ` title="Average over ${r.n} of ${META.benchmarks.length} benchmarks"` : '';
      html += `<tr class="${line.child ? 'child' : ''}" data-row="${esc(r.key)}">
        <td class="fz c-rank">${line.rank ?? ''}</td>
        <td class="fz c-model">${line.child ? '' : toggle}<button type="button" class="m-link" data-detail="${esc(r.key)}" title="${esc(r.model)}">${name}</button>${prec ? `<span class="prec" title="Weights in ${esc(prec)}">${esc(prec)}</span>` : ''}${more}</td>
        <td class="fz c-setting"><span class="badge ${esc(r.setting)}">${esc(SETTING_LABEL[r.setting] || r.setting)}</span></td>
        <td class="fz fz-last c-params">${fmtParams(r.meta.params_b)}</td>
        <td class="v first stat" style="${heat(summary, view.colStats.__avg)}"${partial}>${fmt(summary)}${partial ? '*' : ''}</td>`;
      if (state.mode === 'score') html += `<td class="v stat">${r.avgRank == null ? '–' : r.avgRank.toFixed(1)}</td>`;
      for (const c of view.cols) {
        const v = cellValue(r, c);
        const pend = v == null && c.kind === 'main' ? view.inProgress.get(`${r.model}|${r.setting}|${c.bench.id}`) : null;
        const text = pend ? `<span class="pend ${pend}">${pend === 'running' ? 'running' : 'queued'}</span>` : fmt(v);
        html += `<td class="v${c.kind === 'main' ? ' first' : ' sub'}${v == null ? ' na' : ''}" data-col="${esc(c.id)}" style="${heat(v, view.colStats[c.id])}">${text}</td>`;
      }
      html += '</tr>';
      if (state.details.has(r.key)) html += `<tr class="detail"><td colspan="${ncols}">${renderDetail(r)}</td></tr>`;
    }
    if (!view.lines.length) html += `<tr><td colspan="${ncols}" style="padding:24px;color:#6b7280">No models match the filters.</td></tr>`;
    return html + '</tbody>';
  }

  function renderDetail(r) {
    const m = r.meta;
    const hf = `https://huggingface.co/${r.model}`;
    let rows = '';
    for (const b of META.benchmarks) {
      const run = r.runs[b.id];
      if (!run) { rows += `<tr><td>${esc(b.name)}</td><td colspan="9" style="color:#9ca3af">not evaluated</td></tr>`; continue; }
      const issue = run.issue ? `<a href="${esc(run.issue)}">request</a>` : '–';
      rows += `<tr><td>${esc(b.name)}</td><td>${fmtScore(run.score)}</td><td>${fmtTime(run.wall_seconds)}</td>
        <td>${run.output_tokens ? fmtTokens(run.output_tokens / b.n_items) : '–'}</td><td>${run.min_memory_gib != null ? run.min_memory_gib.toFixed(1) + ' GiB' : '–'}</td>
        <td>${esc((run.gpu || '').replace('NVIDIA GeForce ', ''))}${run.n_gpus > 1 ? ' × ' + run.n_gpus : ''}</td>
        <td>${esc(run.evaluated_at || '')}</td><td>${esc(run.versions?.lm_eval || '')}</td><td>${esc(run.versions?.vllm || '')}</td><td>${issue}</td></tr>`;
    }
    return `<div class="detail-box">
      <dl>
        <dt>Model</dt><dd><a href="${esc(hf)}" target="_blank" rel="noopener">${esc(r.model)}</a></dd>
        <dt>Reasoning</dt><dd>${esc(SETTING_LABEL[r.setting] || r.setting)}</dd>
        <dt>Precision</dt><dd>${esc(precLabel(m) || 'BF16')}</dd>
        <dt>Parameters</dt><dd>${m.params_b != null ? m.params_b.toFixed(2) + 'B' : '–'}</dd>
        <dt>Architecture</dt><dd>${esc(m.architecture || '–')}</dd>
        <dt>License</dt><dd>${esc(m.license || '–')}</dd>
        <dt>Revision</dt><dd>${esc(m.revision || '–')}</dd>
      </dl>
      <table><thead><tr><th>Benchmark</th><th>Score</th><th>Eval time</th><th title="Generated tokens per item">Tokens / item</th><th title="Weights plus the KV cache of one 8,192-token request">Min. memory</th><th>GPU</th><th>Evaluated</th><th>lm-eval</th><th>vLLM</th><th>Request</th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  // frozen columns: left offsets follow the rendered widths (some columns are hidden on narrow screens)
  function placeFrozen() {
    const head = $('#table thead tr');
    if (!head) return;
    let left = 0;
    const lefts = [];
    for (const th of head.querySelectorAll('th.fz')) {
      lefts.push(left);
      if (getComputedStyle(th).display !== 'none') left += th.getBoundingClientRect().width;
    }
    view.frozenWidth = left;
    $('#table').style.setProperty('--frozen', left + 'px');
    for (const tr of $('#table').querySelectorAll('tr')) {
      tr.querySelectorAll('.fz').forEach((cell, i) => { cell.style.left = lefts[i] + 'px'; });
    }
  }

  // ---------- horizontal scrolling ----------
  const wrap = $('#wrap');
  const topbar = $('#topbar');
  let syncing = false;

  function syncTopbar() {
    $('#topbar-inner').style.width = $('#table').scrollWidth + 'px';
    topbar.style.visibility = $('#table').scrollWidth > wrap.clientWidth + 1 ? 'visible' : 'hidden';
    topbar.scrollLeft = wrap.scrollLeft;
  }
  topbar.addEventListener('scroll', () => {
    if (syncing) { syncing = false; return; }
    syncing = true;
    wrap.scrollLeft = topbar.scrollLeft;
  });
  wrap.addEventListener('scroll', () => {
    if (topbar.scrollLeft !== wrap.scrollLeft) {
      if (syncing) { syncing = false; } else { syncing = true; topbar.scrollLeft = wrap.scrollLeft; }
    }
    updateNav();
    hideTip();
  });

  function benchStops() {
    return [...document.querySelectorAll('#table th[data-bench-head]')].map((th) => th.offsetLeft - (view.frozenWidth || 0));
  }
  function jump(dir) {
    const x = wrap.scrollLeft;
    const stops = benchStops();
    const target = dir > 0 ? stops.find((s) => s > x + 4) : [...stops].reverse().find((s) => s < x - 4);
    wrap.scrollTo({ left: target ?? (dir > 0 ? wrap.scrollWidth : 0), behavior: 'smooth' });
  }
  function updateNav() {
    const max = wrap.scrollWidth - wrap.clientWidth;
    $('#prev-bench').disabled = wrap.scrollLeft <= 2;
    $('#next-bench').disabled = wrap.scrollLeft >= max - 2;
  }
  $('#prev-bench').addEventListener('click', () => jump(-1));
  $('#next-bench').addEventListener('click', () => jump(1));

  wrap.addEventListener('keydown', (e) => {
    if (e.target.closest('input')) return;
    const step = 160;
    if (e.key === 'ArrowRight') { e.shiftKey ? jump(1) : wrap.scrollBy({ left: step }); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { e.shiftKey ? jump(-1) : wrap.scrollBy({ left: -step }); e.preventDefault(); }
    else if (e.key === 'Home' && !e.ctrlKey) { wrap.scrollTo({ left: 0 }); e.preventDefault(); }
    else if (e.key === 'End' && !e.ctrlKey) { wrap.scrollTo({ left: wrap.scrollWidth }); e.preventDefault(); }
  });
  // vertical wheel over the header row scrolls sideways
  wrap.addEventListener('wheel', (e) => {
    if (!e.target.closest('thead') || e.shiftKey) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    wrap.scrollLeft += e.deltaY;
    e.preventDefault();
  }, { passive: false });

  // ---------- tooltip ----------
  const tip = $('#tip');
  function showTip(html, x, y) {
    tip.innerHTML = html;
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    tip.style.left = Math.min(x + 14, window.innerWidth - r.width - 8) + 'px';
    tip.style.top = (y + 16 + r.height > window.innerHeight ? y - r.height - 10 : y + 16) + 'px';
  }
  function hideTip() { tip.hidden = true; }

  function colById(id) {
    if (id === '__avg') return { label: { score: 'Average score', time: 'Total eval time', tokens: 'Output tokens per item, generative benchmarks' }[state.mode] };
    if (id === '__rank') return { label: 'Average rank (lower is better)' };
    const c = view.cols.find((c) => c.id === id) || { bench: META.benchmarks.find((b) => b.id === id), kind: 'main' };
    return { ...c, label: c.kind === 'sub' ? `${c.bench.name} · ${c.sub.name}` : c.bench?.name };
  }

  function tipForHeader(th) {
    const id = th.dataset.col;
    const st = view.colStats[id];
    const c = colById(id);
    const f = id === '__rank' ? (v) => v.toFixed(1) : fmt;
    let html = `<b>${esc(c.label || '')}</b>`;
    if (c.bench && th.classList.contains('bh')) {
      html += `<br>${esc(c.bench.description)}<br>${c.bench.n_items.toLocaleString()} items · ${esc(c.bench.metric_label)}`;
      return html;
    }
    if (c.sub?.n_items) html += `<br>${c.sub.n_items.toLocaleString()} items`;
    if (!st) return html + '<br>No values in the current view.';
    return html + `<table>
      <tr><td>Models</td><td>${st.n}</td></tr>
      <tr><td>Mean</td><td>${f(st.mean)}</td></tr>
      <tr><td>Median</td><td>${f(st.median)}</td></tr>
      ${id === '__rank' ? '' : `<tr><td>Std</td><td>${f(st.sd)}</td></tr>`}
      <tr><td>Min</td><td>${f(st.min.value)} · ${esc(st.min.row.model.split('/').pop())}</td></tr>
      <tr><td>Max</td><td>${f(st.max.value)} · ${esc(st.max.row.model.split('/').pop())}</td></tr></table>`;
  }

  function tipForCell(td) {
    const row = ROWS.find((r) => r.key === td.closest('tr').dataset.row);
    const c = colById(td.dataset.col);
    const run = row?.runs[c.bench.id];
    if (!run) {
      const pend = view.inProgress.get(`${row.model}|${row.setting}|${c.bench.id}`);
      return `<b>${esc(row.model)}</b><br>${esc(c.label)}: ${pend === 'running' ? 'being evaluated now' : pend ? 'waiting in the evaluation queue' : 'not evaluated'}`;
    }
    const v = cellValue(row, c);
    let html = `<b>${esc(row.model)}</b> · ${esc(SETTING_LABEL[row.setting] || row.setting)}<br>${esc(c.label)}: ${fmt(v)}`;
    if (run.output_tokens) html += `<br>${fmtTokens(run.output_tokens / c.bench.n_items)} output tokens per item`;
    html += `<br>Eval time ${fmtTime(run.wall_seconds)} on ${esc((run.gpu || '').replace('NVIDIA GeForce ', ''))}`;
    if (run.evaluated_at) html += `<br>Evaluated ${esc(run.evaluated_at)}`;
    return html;
  }

  $('#table').addEventListener('mousemove', (e) => {
    const th = e.target.closest('th[data-col]');
    const td = e.target.closest('td[data-col]');
    if (th) showTip(tipForHeader(th), e.clientX, e.clientY);
    else if (td) showTip(tipForCell(td), e.clientX, e.clientY);
    else hideTip();
  });
  $('#table').addEventListener('mouseleave', hideTip);

  // ---------- interactions ----------
  $('#table').addEventListener('click', (e) => {
    const bench = e.target.closest('[data-bench]');
    if (bench) {
      const id = bench.dataset.bench;
      if (state.mode !== 'score') return;
      state.openBench.has(id) ? state.openBench.delete(id) : state.openBench.add(id);
      const keep = wrap.scrollLeft;
      render();
      // keep the expanded benchmark in view
      const th = document.querySelector(`#table th[data-bench-head="${CSS.escape(id)}"]`);
      wrap.scrollLeft = state.openBench.has(id) ? th.offsetLeft - view.frozenWidth : keep;
      return;
    }
    const v = e.target.closest('[data-variants]');
    if (v) {
      const id = v.dataset.variants;
      state.openModels.has(id) ? state.openModels.delete(id) : state.openModels.add(id);
      render();
      return;
    }
    const d = e.target.closest('[data-detail]');
    if (d) {
      const id = d.dataset.detail;
      state.details.has(id) ? state.details.delete(id) : state.details.add(id);
      render();
      return;
    }
    if (e.target.closest('a')) return;
    const s = e.target.closest('[data-sort]');
    if (s) {
      const key = s.dataset.sort;
      if (state.sort.key === key) state.sort.dir *= -1;
      else state.sort = { key, dir: key === 'model' || key === 'rank' || (state.mode !== 'score' && key !== 'params') ? 1 : -1 };
      render();
    }
  });

  function setupControls() {
    const sf = $('#settings-filter');
    for (const s of META.settings) {
      const n = ROWS.filter((r) => r.setting === s.id).length;
      state.settings.add(s.id);
      sf.insertAdjacentHTML('beforeend', `<label class="${n ? '' : 'none'}" title="${n ? `${n} rows` : 'No results yet'}"><input type="checkbox" value="${esc(s.id)}" checked${n ? '' : ' disabled'}>${esc(s.label)} <span class="n">${n}</span></label>`);
    }
    sf.addEventListener('change', (e) => {
      e.target.checked ? state.settings.add(e.target.value) : state.settings.delete(e.target.value);
      render();
    });
    const zf = $('#size-filter');
    for (const b of SIZE_BUCKETS) zf.insertAdjacentHTML('beforeend', `<label><input type="checkbox" value="${b.id}" checked>${b.label}</label>`);
    zf.addEventListener('change', (e) => {
      e.target.checked ? state.sizes.add(e.target.value) : state.sizes.delete(e.target.value);
      render();
    });
    $('#mode').addEventListener('change', (e) => {
      state.mode = e.target.value;
      state.sort = { key: 'avg', dir: state.mode === 'score' ? -1 : 1 };
      render();
    });
    $('#group-variants').addEventListener('change', (e) => { state.group = e.target.checked; render(); });
    const q = $('#q');
    let timer;
    q.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try { state.query = parseQuery(q.value); q.classList.remove('invalid'); q.title = ''; }
        catch (err) { q.classList.add('invalid'); q.title = 'Invalid regular expression'; return; }
        render();
      }, 120);
    });
    const cb = $('#cost-bench');
    cb.innerHTML = '<option value="__avg">Average</option>' + META.benchmarks.map((b) => `<option value="${esc(b.id)}">${esc(b.name)}</option>`).join('');
    cb.addEventListener('change', () => { state.costBench = cb.value; render(); });
    $('#cost-x').insertAdjacentHTML('beforeend', Object.entries(COST_AXES).map(([k, a]) =>
      `<label><input type="radio" name="cost-x" value="${k}"${k === state.costAxis ? ' checked' : ''}>${esc({ tokens: 'Output tokens', time: 'Eval time', memory: 'GPU memory', params: 'Parameters' }[k])}</label>`).join(''));
    $('#cost-x').addEventListener('change', (e) => { state.costAxis = e.target.value; render(); });
    let rt;
    window.addEventListener('resize', () => {
      placeFrozen(); syncTopbar(); updateNav();
      clearTimeout(rt);
      rt = setTimeout(() => renderCost(ROWS.filter(matches)), 150);
    });
  }

  // benchmark 목록: 한 줄 요약(이름, 언어, 문항 수, 채점)만 보이고, 누르면 설명과 링크가 펼쳐진다
  function benchLinks(b) {
    return `lm-eval task <code>${esc(b.lm_eval_task)}</code>${b.protocol_url ? ` (prompt and answer extraction from the <a href="${esc(b.protocol_url)}">official ${esc(b.protocol_name || '')} code</a>)` : ''}
      · <a href="${esc(b.dataset_url)}">dataset</a>${b.paper_url ? ` · <a href="${esc(b.paper_url)}">paper</a>` : ''}`;
  }
  function renderBenchList() {
    $('#bench-list').innerHTML = '<h2>Benchmarks</h2><p class="lb-help">Click a benchmark to see how it is run and scored.</p>' + META.benchmarks.map((b) => `
      <details class="lb-bench"><summary><span class="lb-bench-name">${esc(b.name)}</span>${langBadge(b.language)}
        <span class="lb-bench-meta">${b.n_items.toLocaleString()} items · ${esc(b.metric_label)}</span></summary>
        <p>${esc(b.description)}</p>
        <p>${benchLinks(b)}</p></details>`).join('');
  }

  // ?data=sample loads placeholder results that cover every reasoning setting
  const RESULTS = new URLSearchParams(location.search).get('data') === 'sample' ? 'data/results.sample.json' : 'data/results.json';
  Promise.all([fetch('data/benchmarks.json').then((r) => r.json()), fetch(RESULTS).then((r) => r.json())])
    .then(([meta, res]) => {
      META = meta;
      RES = res;
      $('#sample-note').hidden = !res.sample;
      const ip = res.in_progress || [];
      // 갱신 시각만 적는다. 몇 개가 돌고 있는지는 표의 running·queued 칸이 보여 준다
      if (res.generated_at && !res.sample) {
        const t = new Date(res.generated_at).toLocaleString('en-CA', { timeZone: 'Asia/Seoul', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        $('#status-line').textContent = `Last updated ${t.replace(',', '')} KST.` + (ip.length ? ' Cells marked queued or running are still being evaluated.' : '');
      }
      buildRows();
      setupControls();
      renderBenchList();
      render();
    })
    .catch((err) => {
      $('#table').innerHTML = `<tbody><tr><td style="padding:24px;color:#b91c1c">Could not load leaderboard data: ${esc(err.message)}</td></tr></tbody>`;
    });
})();
