// 경기 다시보기와 미리보기 그림. 리더보드(index.html)가 쓴다. 경기 기록은 <base>games/<id>.json
// 화면 배치와 색은 tetris_battle/render.py 와 같다.
(function () {
  const PANEL_W = 320, CELL = 16, FIRST_ROW = 2, VISIBLE_TOP = 4, H = 24, W = 10;
  const BOARD_X = 80, HOLD = [8, 52, 64, 44], NEXT_X = 248, NEXT_Y = 52, NEXT_SLOT = 44, METER_X = 72, METER_W = 6;
  const STATS_Y = 362, FLASH_Y = 150, PREVIEW = 12;
  const BG = "rgb(12,12,16)", EMPTY = "rgb(24,24,32)", GRID = "rgb(38,38,48)", TEXT = "rgb(200,200,210)";
  const HIGHLIGHT = "rgb(245,245,245)", METER = "rgb(230,40,40)", DISABLED = "rgb(80,80,80)";
  const COLORS = {1: "rgb(0,200,220)", 2: "rgb(230,200,0)", 3: "rgb(160,60,200)", 4: "rgb(60,190,60)", 5: "rgb(220,50,50)",
    6: "rgb(40,90,220)", 7: "rgb(230,130,20)", 8: "rgb(110,110,110)"};
  const FONT = {A: "010101111101101", B: "110101110101110", C: "011100100100011", D: "110101101101110", E: "111100110100111",
    F: "111100110100100", G: "011100101101011", H: "101101111101101", I: "111010010010111", J: "001001001101010", K: "101101110101101",
    L: "100100100100111", M: "101111111101101", N: "110101101101101", O: "010101101101010", P: "110101110100100", Q: "010101101110011",
    R: "110101110101101", S: "011100010001110", T: "111010010010010", U: "101101101101111", V: "101101101101010", W: "101101111111101",
    X: "101101010101101", Y: "101101010010010", Z: "111001010100111", "0": "111101101101111", "1": "010110010010111",
    "2": "110001010100111", "3": "110001010001110", "4": "101101111001001", "5": "111100110001110", "6": "011100111101111",
    "7": "111001010010010", "8": "111101111101111", "9": "111101111001110", " ": "000000000000000", ":": "000010000010000", "-": "000000111000000"};
  const REASON = {top_out: "먼저 넘침", time: "시간 종료 · 보낸 줄 수", double_top_out: "동시에 넘침"};

  class Player {
    constructor(canvas, animate = true) {
      this.ctx = canvas.getContext("2d");
      this.T = null; this.tick = 0; this.playing = false; this.speed = 1; this.acc = 0; this.last = 0;
      this.onTick = null; this.onEnd = null;
      this._loop = this._loop.bind(this);
      if (animate) requestAnimationFrame(t => { this.last = t; this._loop(t); });
    }
    load(trace) { this.T = trace; this.states = null; this.tick = 0; this.seek(0); }
    rect(x, y, w, h, c) { this.ctx.fillStyle = c; this.ctx.fillRect(x, y, w, h); }
    frame(x, y, w, h, c) { this.rect(x, y, w, 1, c); this.rect(x, y + h - 1, w, 1, c); this.rect(x, y, 1, h, c); this.rect(x + w - 1, y, 1, h, c); }
    text(x, y, s, c = TEXT, sc = 2) {
      [...s.toUpperCase()].forEach((ch, i) => {
        const bits = FONT[ch] || FONT[" "];
        for (let k = 0; k < 15; k++) if (bits[k] === "1") this.rect(x + (i * 4 + k % 3) * sc, y + Math.floor(k / 3) * sc, sc, sc, c);
      });
    }
    cell(x, y, c, style = "locked", size = CELL) {
      if (style === "ghost") { this.frame(x + 1, y + 1, size - 1, size - 1, c); return; }
      this.rect(x + 1, y + 1, size - 1, size - 1, c);
      if (style === "active") this.frame(x + 1, y + 1, size - 1, size - 1, HIGHLIGHT);
    }
    xy(ox, r, c) { return [ox + BOARD_X + c * CELL, (r - FIRST_ROW) * CELL]; }
    preview(x, y, w, h, kind, color) {
      const cells = this.T.shapes[kind][0], rs = cells.map(c => c[0]), cs = cells.map(c => c[1]);
      const r0 = Math.min(...rs), c0 = Math.min(...cs);
      const pw = (Math.max(...cs) - c0 + 1) * PREVIEW, ph = (Math.max(...rs) - r0 + 1) * PREVIEW;
      const ox = x + Math.floor((w - pw) / 2), oy = y + Math.floor((h - ph) / 2);
      const col = color || COLORS[this.T.pieces.indexOf(kind) + 1];
      cells.forEach(([r, c]) => this.cell(ox + (c - c0) * PREVIEW, oy + (r - r0) * PREVIEW, col, "locked", PREVIEW));
    }
    panel(ox, s, banner) {
      this.rect(ox, 0, PANEL_W, 384, BG);
      const vy = (VISIBLE_TOP - FIRST_ROW) * CELL;
      this.rect(ox + BOARD_X, vy, W * CELL + 1, (H - VISIBLE_TOP) * CELL + 1, GRID);
      for (let r = VISIBLE_TOP; r < H; r++) for (let c = 0; c < W; c++) { const [x, y] = this.xy(ox, r, c); this.rect(x + 1, y + 1, CELL - 1, CELL - 1, EMPTY); }
      for (let i = 0; i < s.b.length; i++) {
        const v = +s.b[i]; if (!v) continue;
        const [x, y] = this.xy(ox, FIRST_ROW + Math.floor(i / W), i % W); this.cell(x, y, COLORS[v]);
      }
      if (s.a && s.p) {
        const [k, rot, px, py, gy] = s.p, color = COLORS[k + 1], shape = this.T.shapes[this.T.pieces[k]][rot];
        if (gy !== py) shape.forEach(([r, c]) => { if (gy + r >= FIRST_ROW) { const [x, y] = this.xy(ox, gy + r, px + c); this.cell(x, y, color, "ghost"); } });
        shape.forEach(([r, c]) => { if (py + r >= FIRST_ROW) { const [x, y] = this.xy(ox, py + r, px + c); this.cell(x, y, color, "active"); } });
      }
      if (!s.a) {
        this.ctx.fillStyle = "rgba(0,0,0,0.6)"; this.ctx.fillRect(ox + BOARD_X, vy, W * CELL, (H - VISIBLE_TOP) * CELL);
        this.text(ox + BOARD_X + 56, 150, "KO", HIGHLIGHT, 8);
      }
      const [hx, hy, hw, hh] = HOLD;
      this.text(ox + hx, 36, "HOLD"); this.frame(ox + hx, hy, hw, hh, GRID);
      if (s.h) this.preview(ox + hx, hy, hw, hh, s.h, s.ch ? null : DISABLED);
      this.text(ox + NEXT_X, 36, "NEXT");
      [...s.n].forEach((k, i) => { const y = NEXT_Y + i * NEXT_SLOT; this.frame(ox + NEXT_X, y, 64, NEXT_SLOT, GRID); this.preview(ox + NEXT_X, y, 64, NEXT_SLOT, k); });
      const n = Math.min(s.q, H - VISIBLE_TOP);
      if (n) this.rect(ox + METER_X, (H - FIRST_ROW) * CELL - n * CELL, METER_W, n * CELL, METER);
      this.text(ox + 8, STATS_Y, `LINES ${s.l}  SENT ${s.s}  LV ${s.lv}`);
      (s.f || []).forEach((line, i) => this.text(ox + 8, FLASH_Y + i * 14, line, HIGHLIGHT));
      if (banner) this.text(ox + hx, 120, banner, HIGHLIGHT);
    }
    seek(t) {
      const T = this.T; if (!T) return;
      t = Math.max(0, Math.min(T.ticks, Math.round(t)));
      if (!this.states || t < this.tick) { this.states = [{}, {}]; this.di = 0; }
      while (this.di < T.deltas.length && T.deltas[this.di][0] <= t) { const [, p, d] = T.deltas[this.di++]; Object.assign(this.states[p], d); }
      this.tick = t; this.draw();
    }
    draw() {
      const T = this.T; let b0 = null, b1 = null;
      if (this.tick >= T.ticks) {
        const w = T.result.winner;
        b0 = w === 0 ? "WIN" : w < 0 ? "DRAW" : "LOSE"; b1 = w === 1 ? "WIN" : w < 0 ? "DRAW" : "LOSE";
      }
      this.panel(0, this.states[0], b0); this.panel(PANEL_W, this.states[1], b1);
      if (this.onTick) this.onTick(this.tick, T.ticks);
    }
    _loop(now) {
      if (this.playing && this.T) {
        this.acc += Math.min(100, now - this.last) * 0.06 * this.speed;  // 60 tick = 1초
        const step = Math.floor(this.acc); this.acc -= step;
        if (step) this.seek(this.tick + step);
        if (this.tick >= this.T.ticks) { this.playing = false; if (this.onEnd) this.onEnd(); }
      }
      this.last = now; requestAnimationFrame(this._loop);
    }
  }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));
  const mmss = t => `${Math.floor(t / 3600)}:${String(Math.floor(t / 60) % 60).padStart(2, "0")}`;

  const cache = new Map();
  function load(id, base = "data/") {
    const url = `${base}games/${encodeURIComponent(id)}.json`;
    if (!cache.has(url)) cache.set(url, fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }));
    return cache.get(url);
  }

  // 경기 한 장면(전체 길이의 frac 지점)을 canvas 에 그린다. 카드의 미리보기용
  function thumb(canvas, id, frac = 0.6, base) {
    return load(id, base).then(T => { const p = new Player(canvas, false); p.load(T); p.seek(T.ticks * frac); }).catch(() => {});
  }

  // root 안에 제목·이름·화면·조작 막대를 만들고 경기 id 를 재생한다
  function mount(root, id, opts = {}) {
    root.innerHTML = `
      <div class="tp-head"><div class="tp-title">불러오는 중…</div><div class="tp-sub"></div></div>
      <div class="tp-names"><span class="tp-n0"></span><span class="tp-n1"></span></div>
      <div class="tp-stage"><canvas width="640" height="384"></canvas></div>
      <div class="tp-ctrl"><button class="tp-play">일시정지</button><span class="tp-speeds"></span>
        <input class="tp-seek" type="range" min="0" value="0"><span class="tp-time"></span></div>`;
    const $ = s => root.querySelector(s);
    const p = new Player($("canvas"));
    const setPlay = v => { p.playing = v; $(".tp-play").textContent = v ? "일시정지" : "재생"; };
    [0.5, 1, 2, 4].forEach(s => {
      const b = document.createElement("button"); b.textContent = `x${s}`; b.className = s === 1 ? "on" : "";
      b.onclick = () => { p.speed = s; [...$(".tp-speeds").children].forEach(x => x.className = x === b ? "on" : ""); };
      $(".tp-speeds").appendChild(b);
    });
    $(".tp-play").onclick = () => { if (p.T && p.tick >= p.T.ticks) p.seek(0); setPlay(!p.playing); };
    $(".tp-seek").oninput = e => p.seek(+e.target.value);
    p.onTick = (t, n) => { $(".tp-seek").value = t; $(".tp-time").textContent = `${mmss(t)} / ${mmss(n)}`; };
    p.onEnd = () => setPlay(false);
    load(id, opts.base).then(T => {
      const [a, b] = T.players, w = T.result.winner;
      $(".tp-title").textContent = `${a} vs ${b}`;
      const sub = `${w < 0 ? "무승부" : (w === 0 ? a : b) + " 승"} (${REASON[T.result.reason] || T.result.reason})`;
      $(".tp-sub").textContent = sub;
      $(".tp-n0").textContent = a; $(".tp-n1").textContent = b;
      if (w === 0) $(".tp-n0").classList.add("win"); if (w === 1) $(".tp-n1").classList.add("win");
      $(".tp-seek").max = T.ticks;
      p.load(T); p.seek((opts.t || 0) * 60); setPlay(true);
    }).catch(e => { $(".tp-title").textContent = "경기 기록을 불러오지 못했습니다"; $(".tp-sub").textContent = e.message; });
    return {stop: () => setPlay(false)};
  }

  window.TetrisReplay = {mount, thumb, esc};
})();
