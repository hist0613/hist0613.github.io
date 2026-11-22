// 테트리스 엔진·화면·level1 agent 의 JavaScript 판. tetris_battle/engine.py, battle.py, render.py,
// agents.HeuristicAgent 를 그대로 옮겼다. 같은 seed·같은 키면 Python 과 같은 판, 같은 픽셀이 나와야 한다
// (tests/test_js_port.py 가 확인한다). 브라우저에서는 window.TB, node 에서는 module.exports.
(function (root) {
  "use strict";
  const W = 10, H = 24, VISIBLE_TOP = 4;
  const NOOP = 0, LEFT = 1, RIGHT = 2, ROT_CW = 3, ROT_CCW = 4, SOFT_DROP = 5, HARD_DROP = 6, HOLD = 7;
  const ACTION_NAMES = ["NOOP", "LEFT", "RIGHT", "ROT_CW", "ROT_CCW", "SOFT_DROP", "HARD_DROP", "HOLD"];
  const PIECES = "IOTSZJL", GARBAGE = 8;

  const BASE = {
    I: [4, [[1, 0], [1, 1], [1, 2], [1, 3]]], O: [3, [[0, 1], [0, 2], [1, 1], [1, 2]]],
    T: [3, [[0, 1], [1, 0], [1, 1], [1, 2]]], S: [3, [[0, 1], [0, 2], [1, 0], [1, 1]]],
    Z: [3, [[0, 0], [0, 1], [1, 1], [1, 2]]], J: [3, [[0, 0], [1, 0], [1, 1], [1, 2]]],
    L: [3, [[0, 2], [1, 0], [1, 1], [1, 2]]],
  };
  const sortCells = cs => cs.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const SHAPES = {};
  for (const k of PIECES) {
    const [n, cells] = BASE[k], states = [cells];
    for (let i = 0; i < 3; i++) states.push(k === "O" ? cells : states[states.length - 1].map(([r, c]) => [c, n - 1 - r]));
    SHAPES[k] = states.map(sortCells);
  }
  const KICKS_JLSTZ = {"0,1": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]], "1,0": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    "1,2": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]], "2,1": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    "2,3": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]], "3,2": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    "3,0": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]], "0,3": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]};
  const KICKS_I = {"0,1": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]], "1,0": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    "1,2": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]], "2,1": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
    "2,3": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]], "3,2": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
    "3,0": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]], "0,3": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]};
  const LINE_ATTACK = [0, 0, 1, 2, 4], TSPIN_ATTACK = [0, 2, 4, 6], TSPIN_MINI_ATTACK = [0, 0, 1, 1], B2B_BONUS = 1;
  const COMBO_ATTACK = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5], PERFECT_CLEAR_ATTACK = 10;
  const CONFIG = {gravity: [60, 48, 36, 28, 22, 16, 12, 8, 6, 4, 3, 2], level_ticks: 900, lock_delay: 30, max_lock_resets: 15,
    garbage_cap: 8, next_count: 5};

  // ---------- Python random.Random 과 같은 난수 (MT19937, seed·shuffle·randrange 방식까지) ----------
  class PyRandom {
    constructor(seed) {
      this.mt = new Uint32Array(624); this.i = 624;
      let a = BigInt(Math.abs(seed)); const key = [];
      do { key.push(Number(a & 0xffffffffn)); a >>= 32n; } while (a > 0n);
      this._initByArray(key);
    }
    _initGenrand(s) {
      const mt = this.mt; mt[0] = s >>> 0;
      for (let i = 1; i < 624; i++) mt[i] = (Math.imul(1812433253, mt[i - 1] ^ (mt[i - 1] >>> 30)) + i) >>> 0;
    }
    _initByArray(key) {
      const mt = this.mt; this._initGenrand(19650218);
      let i = 1, j = 0;
      for (let k = Math.max(624, key.length); k; k--) {
        const s = mt[i - 1] ^ (mt[i - 1] >>> 30);
        mt[i] = ((mt[i] ^ Math.imul(s, 1664525)) + key[j] + j) >>> 0;
        i++; j++;
        if (i >= 624) { mt[0] = mt[623]; i = 1; }
        if (j >= key.length) j = 0;
      }
      for (let k = 623; k; k--) {
        const s = mt[i - 1] ^ (mt[i - 1] >>> 30);
        mt[i] = ((mt[i] ^ Math.imul(s, 1566083941)) - i) >>> 0;
        i++;
        if (i >= 624) { mt[0] = mt[623]; i = 1; }
      }
      mt[0] = 0x80000000;
    }
    _next() {
      const mt = this.mt;
      if (this.i >= 624) {
        for (let k = 0; k < 624; k++) {
          const y = (mt[k] & 0x80000000) | (mt[(k + 1) % 624] & 0x7fffffff);
          mt[k] = (mt[(k + 397) % 624] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0)) >>> 0;
        }
        this.i = 0;
      }
      let y = mt[this.i++];
      y ^= y >>> 11; y = (y ^ ((y << 7) & 0x9d2c5680)) >>> 0; y = (y ^ ((y << 15) & 0xefc60000)) >>> 0; y ^= y >>> 18;
      return y >>> 0;
    }
    _randbelow(n) {  // n < 2^32
      const k = 32 - Math.clz32(n);
      let r = this._next() >>> (32 - k);
      while (r >= n) r = this._next() >>> (32 - k);
      return r;
    }
    randrange(n) { return this._randbelow(n); }
    shuffle(x) { for (let i = x.length - 1; i > 0; i--) { const j = this._randbelow(i + 1); [x[i], x[j]] = [x[j], x[i]]; } }
  }

  // ---------- 엔진 ----------
  class Tetris {
    constructor(seed = 0, cfg = CONFIG) {
      this.cfg = cfg; this.seed = seed;
      this.board = new Int8Array(H * W);
      this.bagRng = new PyRandom(seed); this.garbageRng = new PyRandom(seed * 7919 + 17);
      this.queue = []; this.hold = null; this.canHold = true; this.pending = [];
      this.alive = true; this.tick = 0; this.lines = 0; this.sent = 0; this.received = 0; this.pieces = 0;
      this.combo = -1; this.b2b = false; this.flash = []; this.flashTicks = 0; this.lastRot = false; this.lastKick = 0;
      this.grav = 0; this.lockTimer = 0; this.lockResets = 0; this.lowest = 0;
      this.spawn(this.nextKind());
    }
    at(r, c) { return this.board[r * W + c]; }
    cells(kind = this.kind, rot = this.rot, x = this.x, y = this.y) { return SHAPES[kind][rot].map(([r, c]) => [y + r, x + c]); }
    fits(kind, rot, x, y) {
      for (const [r, c] of SHAPES[kind][rot]) {
        const rr = y + r, cc = x + c;
        if (rr < 0 || rr >= H || cc < 0 || cc >= W || this.board[rr * W + cc]) return false;
      }
      return true;
    }
    ghostY() { let y = this.y; while (this.fits(this.kind, this.rot, this.x, y + 1)) y++; return y; }
    nextPieces() { this.fillQueue(); return this.queue.slice(0, this.cfg.next_count); }
    level() { return Math.min(Math.floor(this.tick / this.cfg.level_ticks), this.cfg.gravity.length - 1); }
    pendingTotal() { return this.pending.reduce((a, b) => a + b, 0); }

    step(action) {
      const res = {locked: false, lines: 0, attack: 0, toppedOut: false};
      if (!this.alive) return res;
      this.tick++;
      if (this.flashTicks) { this.flashTicks--; if (!this.flashTicks) this.flash = []; }
      if (action === LEFT) this.move(-1);
      else if (action === RIGHT) this.move(1);
      else if (action === ROT_CW) this.rotate(1);
      else if (action === ROT_CCW) this.rotate(-1);
      else if (action === SOFT_DROP) { if (this.fall()) this.grav = 0; }
      else if (action === HARD_DROP) { while (this.fall()); this.lock(res); return res; }
      else if (action === HOLD) { this.doHold(res); if (!this.alive) return res; }
      this.grav++;
      if (this.grav >= this.cfg.gravity[this.level()]) { this.grav = 0; this.fall(); }
      if (!this.fits(this.kind, this.rot, this.x, this.y + 1)) {
        this.lockTimer++;
        if (this.lockTimer >= this.cfg.lock_delay) this.lock(res);
      }
      return res;
    }
    receiveGarbage(n) { if (n > 0) this.pending.push(n); }
    nextKind() { this.fillQueue(); return this.queue.shift(); }
    fillQueue() {
      while (this.queue.length < this.cfg.next_count + 1) { const bag = PIECES.split(""); this.bagRng.shuffle(bag); this.queue.push(...bag); }
    }
    spawn(kind) {
      this.kind = kind; this.rot = 0; this.x = 3; this.y = kind === "I" ? 1 : 2;
      this.grav = 0; this.lockTimer = 0; this.lockResets = 0; this.lowest = this.y; this.lastRot = false;
      if (!this.fits(kind, 0, this.x, this.y)) this.alive = false;
    }
    afterMove() {
      if (!this.fits(this.kind, this.rot, this.x, this.y + 1) && this.lockResets < this.cfg.max_lock_resets) { this.lockTimer = 0; this.lockResets++; }
    }
    move(dx) {
      if (this.fits(this.kind, this.rot, this.x + dx, this.y)) { this.x += dx; this.lastRot = false; this.afterMove(); return true; }
      return false;
    }
    fall() {
      if (this.fits(this.kind, this.rot, this.x, this.y + 1)) {
        this.y++; this.lastRot = false;
        if (this.y > this.lowest) { this.lowest = this.y; this.lockResets = 0; this.lockTimer = 0; }
        return true;
      }
      return false;
    }
    rotate(d) {
      if (this.kind === "O") return false;
      const nw = ((this.rot + d) % 4 + 4) % 4, table = this.kind === "I" ? KICKS_I : KICKS_JLSTZ;
      const kicks = table[`${this.rot},${nw}`];
      for (let i = 0; i < kicks.length; i++) {
        const nx = this.x + kicks[i][0], ny = this.y - kicks[i][1];
        if (this.fits(this.kind, nw, nx, ny)) {
          this.x = nx; this.y = ny; this.rot = nw; this.lastRot = true; this.lastKick = i; this.afterMove(); return true;
        }
      }
      return false;
    }
    doHold(res) {
      if (!this.canHold) return;
      const cur = this.kind;
      if (this.hold === null) { this.hold = cur; this.spawn(this.nextKind()); }
      else { const nxt = this.hold; this.hold = cur; this.spawn(nxt); }
      this.canHold = false;
      if (!this.alive) res.toppedOut = true;
    }
    tspin() {
      if (this.kind !== "T" || !this.lastRot) return null;
      const blocked = (r, c) => r < 0 || r >= H || c < 0 || c >= W || !!this.board[r * W + c];
      const y = this.y, x = this.x;
      const corner = {tl: blocked(y, x), tr: blocked(y, x + 2), bl: blocked(y + 2, x), br: blocked(y + 2, x + 2)};
      if (Object.values(corner).filter(Boolean).length < 3) return null;
      const front = {0: ["tl", "tr"], 1: ["tr", "br"], 2: ["bl", "br"], 3: ["tl", "bl"]}[this.rot];
      return front.every(k => corner[k]) || this.lastKick === 4 ? "full" : "mini";
    }
    lock(res) {
      const tspin = this.tspin(), cells = this.cells(), v = PIECES.indexOf(this.kind) + 1;
      for (const [r, c] of cells) this.board[r * W + c] = v;
      res.locked = true; this.pieces++; this.canHold = true;
      if (cells.every(([r]) => r < VISIBLE_TOP)) { this.alive = false; res.toppedOut = true; return; }
      const full = [];
      for (let r = 0; r < H; r++) { let f = true; for (let c = 0; c < W; c++) if (!this.board[r * W + c]) { f = false; break; } if (f) full.push(r); }
      const n = full.length;
      if (n) {
        const keep = [];
        for (let r = 0; r < H; r++) if (!full.includes(r)) keep.push(this.board.slice(r * W, r * W + W));
        const nb = new Int8Array(H * W); keep.forEach((row, k) => nb.set(row, (n + k) * W)); this.board = nb;
        this.lines += n; this.combo++;
        let atk = tspin === "full" ? TSPIN_ATTACK[Math.min(n, 3)] : tspin === "mini" ? TSPIN_MINI_ATTACK[Math.min(n, 3)] : LINE_ATTACK[Math.min(n, 4)];
        const difficult = n === 4 || tspin !== null, b2b = difficult && this.b2b;
        if (b2b) atk += B2B_BONUS;
        this.b2b = difficult;
        atk += COMBO_ATTACK[Math.min(this.combo, COMBO_ATTACK.length - 1)];
        const flash = [];
        if (tspin) flash.push("T-SPIN", ...(tspin === "mini" ? ["MINI"] : []));
        flash.push(["", "SINGLE", "DOUBLE", "TRIPLE", "TETRIS"][Math.min(n, 4)]);
        if (b2b) flash.push("B2B");
        if (this.combo >= 1) flash.push(`COMBO ${this.combo}`);
        if (!this.board.some(Boolean)) { atk += PERFECT_CLEAR_ATTACK; flash.push("PERFECT"); }
        this.flash = flash; this.flashTicks = 90;
        while (atk && this.pending.length) {
          const t = Math.min(atk, this.pending[0]); atk -= t; this.pending[0] -= t;
          if (this.pending[0] === 0) this.pending.shift();
        }
        this.sent += atk; res.lines = n; res.attack = atk;
      } else {
        this.combo = -1;
        if (tspin) { this.flash = ["T-SPIN", ...(tspin === "mini" ? ["MINI"] : [])]; this.flashTicks = 90; }
        this.applyGarbage(res);
        if (!this.alive) return;
      }
      this.spawn(this.nextKind());
      if (!this.alive) res.toppedOut = true;
    }
    applyGarbage(res) {
      let budget = this.cfg.garbage_cap;
      while (budget && this.pending.length) {
        const t = Math.min(budget, this.pending[0]), hole = this.garbageRng.randrange(W);
        if (this.board.slice(0, t * W).some(Boolean)) { this.alive = false; res.toppedOut = true; }
        const nb = new Int8Array(H * W); nb.set(this.board.slice(t * W), 0);
        for (let r = H - t; r < H; r++) for (let c = 0; c < W; c++) nb[r * W + c] = c === hole ? 0 : GARBAGE;
        this.board = nb; this.received += t; budget -= t; this.pending[0] -= t;
        if (this.pending[0] === 0) this.pending.shift();
        if (!this.alive) return;
      }
    }
  }

  class Match {
    constructor(seed = 0, maxTicks = 60 * 300) { this.games = [new Tetris(seed), new Tetris(seed)]; this.maxTicks = maxTicks; this.tick = 0; this.result = null; }
    get done() { return this.result !== null; }
    step(a0 = NOOP, a1 = NOOP) {
      if (this.done) return;
      const [g0, g1] = this.games, r0 = g0.step(a0), r1 = g1.step(a1);
      if (r0.attack) g1.receiveGarbage(r0.attack);
      if (r1.attack) g0.receiveGarbage(r1.attack);
      this.tick++;
      if (g0.alive && g1.alive && this.tick < this.maxTicks) return;
      let winner, reason;
      if (g0.alive !== g1.alive) { winner = g0.alive ? 0 : 1; reason = "top_out"; }
      else { reason = g0.alive ? "time" : "double_top_out"; winner = g0.sent !== g1.sent ? (g0.sent > g1.sent ? 0 : 1) : -1; }
      this.result = {winner, reason, ticks: this.tick, sent: [g0.sent, g1.sent]};
    }
  }

  // ---------- 화면 (render.py 와 같은 픽셀) ----------
  const FRAME_W = 640, FRAME_H = 384, PANEL_W = 320, CELL = 16, FIRST_ROW = 2, BOARD_X = 80, BOARD_Y = 0;
  const HOLD_BOX = [8, 52, 64, 44], NEXT_X = 248, NEXT_Y = 52, NEXT_SLOT = 44, METER_X = 72, METER_W = 6, STATS_Y = 362, FLASH_Y = 150, PREVIEW = 12;
  const BG = [12, 12, 16], EMPTY = [24, 24, 32], GRID = [38, 38, 48], TEXT = [200, 200, 210], HIGHLIGHT = [245, 245, 245];
  const METER = [230, 40, 40], DISABLED = [80, 80, 80];
  const COLORS = {1: [0, 200, 220], 2: [230, 200, 0], 3: [160, 60, 200], 4: [60, 190, 60], 5: [220, 50, 50], 6: [40, 90, 220], 7: [230, 130, 20], 8: [110, 110, 110]};
  const FONT = {A: "010101111101101", B: "110101110101110", C: "011100100100011", D: "110101101101110", E: "111100110100111",
    F: "111100110100100", G: "011100101101011", H: "101101111101101", I: "111010010010111", J: "001001001101010", K: "101101110101101",
    L: "100100100100111", M: "101111111101101", N: "110101101101101", O: "010101101101010", P: "110101110100100", Q: "010101101110011",
    R: "110101110101101", S: "011100010001110", T: "111010010010010", U: "101101101101111", V: "101101101101010", W: "101101111111101",
    X: "101101010101101", Y: "101101010010010", Z: "111001010100111", "0": "111101101101111", "1": "010110010010111",
    "2": "110001010100111", "3": "110001010001110", "4": "101101111001001", "5": "111100110001110", "6": "011100111101111",
    "7": "111001010010010", "8": "111101111101111", "9": "111101111001110", " ": "000000000000000", ":": "000010000010000", "-": "000000111000000"};

  // img: Uint8ClampedArray RGBA (640x384). numpy 자르기처럼 화면 밖은 버린다
  function rect(img, x, y, w, h, col) {
    const x0 = Math.max(0, x), y0 = Math.max(0, y), x1 = Math.min(FRAME_W, x + w), y1 = Math.min(FRAME_H, y + h);
    for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) {
      const p = (yy * FRAME_W + xx) * 4; img[p] = col[0]; img[p + 1] = col[1]; img[p + 2] = col[2]; img[p + 3] = 255;
    }
  }
  function frameBox(img, x, y, w, h, col) { rect(img, x, y, w, 1, col); rect(img, x, y + h - 1, w, 1, col); rect(img, x, y, 1, h, col); rect(img, x + w - 1, y, 1, h, col); }
  function text(img, x, y, s, col = TEXT, sc = 2) {
    [...s.toUpperCase()].forEach((ch, i) => {
      const bits = FONT[ch] || FONT[" "];
      for (let k = 0; k < 15; k++) if (bits[k] === "1") rect(img, x + (i * 4 + k % 3) * sc, y + Math.floor(k / 3) * sc, sc, sc, col);
    });
  }
  function cell(img, x, y, col, style = "locked", size = CELL) {
    if (style === "ghost") { frameBox(img, x + 1, y + 1, size - 1, size - 1, col); return; }
    rect(img, x + 1, y + 1, size - 1, size - 1, col);
    if (style === "active") frameBox(img, x + 1, y + 1, size - 1, size - 1, HIGHLIGHT);
  }
  function preview(img, x, y, w, h, kind, col) {
    const cells = SHAPES[kind][0], rows = cells.map(c => c[0]), cols = cells.map(c => c[1]);
    const r0 = Math.min(...rows), c0 = Math.min(...cols);
    const pw = (Math.max(...cols) - c0 + 1) * PREVIEW, ph = (Math.max(...rows) - r0 + 1) * PREVIEW;
    const ox = x + Math.floor((w - pw) / 2), oy = y + Math.floor((h - ph) / 2);
    const color = col || COLORS[PIECES.indexOf(kind) + 1];
    for (const [r, c] of cells) cell(img, ox + (c - c0) * PREVIEW, oy + (r - r0) * PREVIEW, color, "locked", PREVIEW);
  }
  const xy = (ox, r, c) => [ox + BOARD_X + c * CELL, BOARD_Y + (r - FIRST_ROW) * CELL];

  function drawPanel(img, ox, g, banner) {
    rect(img, ox, 0, PANEL_W, FRAME_H, BG);
    const vy = BOARD_Y + (VISIBLE_TOP - FIRST_ROW) * CELL;
    rect(img, ox + BOARD_X, vy, W * CELL + 1, (H - VISIBLE_TOP) * CELL + 1, GRID);
    for (let r = VISIBLE_TOP; r < H; r++) for (let c = 0; c < W; c++) { const [x, y] = xy(ox, r, c); rect(img, x + 1, y + 1, CELL - 1, CELL - 1, EMPTY); }
    for (let r = FIRST_ROW; r < H; r++) for (let c = 0; c < W; c++) { const v = g.at(r, c); if (v) { const [x, y] = xy(ox, r, c); cell(img, x, y, COLORS[v]); } }
    if (g.alive) {
      const color = COLORS[PIECES.indexOf(g.kind) + 1], gy = g.ghostY();
      if (gy !== g.y) for (const [r, c] of g.cells(g.kind, g.rot, g.x, gy)) if (r >= FIRST_ROW) { const [x, y] = xy(ox, r, c); cell(img, x, y, color, "ghost"); }
      for (const [r, c] of g.cells()) if (r >= FIRST_ROW) { const [x, y] = xy(ox, r, c); cell(img, x, y, color, "active"); }
    } else {
      for (let yy = vy; yy < vy + (H - VISIBLE_TOP) * CELL; yy++) for (let xx = ox + BOARD_X; xx < ox + BOARD_X + W * CELL; xx++) {
        const p = (yy * FRAME_W + xx) * 4; img[p] = Math.floor(img[p] * 2 / 5); img[p + 1] = Math.floor(img[p + 1] * 2 / 5); img[p + 2] = Math.floor(img[p + 2] * 2 / 5);
      }
      text(img, ox + BOARD_X + 56, 150, "KO", HIGHLIGHT, 8);
    }
    const [hx, hy, hw, hh] = HOLD_BOX;
    text(img, ox + hx, 36, "HOLD"); frameBox(img, ox + hx, hy, hw, hh, GRID);
    if (g.hold) preview(img, ox + hx, hy, hw, hh, g.hold, g.canHold ? null : DISABLED);
    text(img, ox + NEXT_X, 36, "NEXT");
    g.nextPieces().forEach((k, i) => { const y = NEXT_Y + i * NEXT_SLOT; frameBox(img, ox + NEXT_X, y, 64, NEXT_SLOT, GRID); preview(img, ox + NEXT_X, y, 64, NEXT_SLOT, k); });
    const n = Math.min(g.pendingTotal(), H - VISIBLE_TOP);
    if (n) { const bottom = BOARD_Y + (H - FIRST_ROW) * CELL; rect(img, ox + METER_X, bottom - n * CELL, METER_W, n * CELL, METER); }
    text(img, ox + 8, STATS_Y, `LINES ${g.lines}  SENT ${g.sent}  LV ${g.level() + 1}`);
    g.flash.forEach((line, i) => text(img, ox + 8, FLASH_Y + i * 14, line, HIGHLIGHT));
    if (banner) text(img, ox + hx, 120, banner, HIGHLIGHT);
  }

  // player 시점 화면 (자기 판이 왼쪽). RGBA Uint8ClampedArray 를 돌려준다
  function renderView(match, player = 0, img = new Uint8ClampedArray(FRAME_W * FRAME_H * 4)) {
    let bMe = null, bOpp = null;
    if (match.result) {
      const w = match.result.winner;
      bMe = w === player ? "WIN" : w < 0 ? "DRAW" : "LOSE"; bOpp = w === 1 - player ? "WIN" : w < 0 ? "DRAW" : "LOSE";
    }
    drawPanel(img, 0, match.games[player], bMe); drawPanel(img, PANEL_W, match.games[1 - player], bOpp);
    return img;
  }
  function toRGB(rgba) {  // model 입력 uint8 [384, 640, 3]
    const out = new Uint8Array(FRAME_W * FRAME_H * 3);
    for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) { out[j] = rgba[i]; out[j + 1] = rgba[i + 1]; out[j + 2] = rgba[i + 2]; }
    return out;
  }

  // ---------- level1 agent (agents.HeuristicAgent 기본값). 화면 대신 엔진 상태를 직접 읽는다 ----------
  const WEAK_WEIGHTS = [-1.0, 1.0, -0.5, -1.0, -3.0, -0.5];
  const norm = cells => { const r0 = Math.min(...cells.map(c => c[0])), c0 = Math.min(...cells.map(c => c[1])); return sortCells(cells.map(([r, c]) => [r - r0, c - c0])); };
  const same = (a, b) => a.length === b.length && a.every((p, i) => p[0] === b[i][0] && p[1] === b[i][1]);
  function drop(board, shape, col) {
    if (shape.some(([, c]) => col + c < 0 || col + c >= W)) return null;
    let top = null;
    for (let y = 0; y < H; y++) {
      if (shape.every(([r]) => y + r < H) && shape.every(([r, c]) => !board[(y + r) * W + col + c])) top = y; else break;
    }
    return top === null ? null : shape.map(([r, c]) => [top + r, col + c]);
  }
  function features(board, cells) {
    let b = board.slice(); for (const [r, c] of cells) b[r * W + c] = 1;
    const full = []; for (let r = 0; r < H; r++) { let f = true; for (let c = 0; c < W; c++) if (!b[r * W + c]) f = false; if (f) full.push(r); }
    const eroded = full.length * cells.filter(([r]) => full.includes(r)).length;
    if (full.length) { const nb = new Uint8Array(H * W); let k = full.length; for (let r = 0; r < H; r++) if (!full.includes(r)) { nb.set(b.slice(r * W, r * W + W), k * W); k++; } b = nb; }
    const rows = cells.map(c => c[0]), landing = H - (Math.min(...rows) + Math.max(...rows)) / 2;
    const F = (r, c) => (c < 0 || c >= W) ? 1 : (b[r * W + c] ? 1 : 0);
    let rowT = 0; for (let r = 0; r < H; r++) for (let c = -1; c < W; c++) if (F(r, c) !== F(r, c + 1)) rowT++;
    let colT = 0; for (let c = 0; c < W; c++) for (let r = 0; r < H; r++) { const below = r + 1 < H ? (b[(r + 1) * W + c] ? 1 : 0) : 1; if ((b[r * W + c] ? 1 : 0) !== below) colT++; }
    let holes = 0; for (let c = 0; c < W; c++) { let seen = false; for (let r = 0; r < H; r++) { if (b[r * W + c]) seen = true; else if (seen) holes++; } }
    let wells = 0; for (let c = 0; c < W; c++) { let depth = 0; for (let r = 0; r < H; r++) {
      const left = c > 0 ? b[r * W + c - 1] : 1, right = c < W - 1 ? b[r * W + c + 1] : 1;
      if (!b[r * W + c] && left && right) { depth++; wells += depth; } else depth = 0; } }
    let tooHigh = false; for (let i = 0; i < (VISIBLE_TOP + 2) * W; i++) if (b[i]) tooHigh = true;
    return [[landing, eroded, rowT, colT, holes, wells], tooHigh];
  }
  class HeuristicAgent {
    constructor(wait = 16, weights = WEAK_WEIGHTS, delay = 0) { this.wait = wait; this.weights = weights; this.delay = delay; this.pause = 0; this.last = null; this.target = null; this.rotTries = 0; }
    plan(board, kind) {
      let best = null; const seen = [];
      for (let k = 0; k < 4; k++) {
        const shape = norm(SHAPES[kind][k]);
        if (seen.some(s => same(s, shape))) continue;
        seen.push(shape);
        for (let col = -1; col < W; col++) {
          const cells = drop(board, shape, col); if (!cells) continue;
          const [f, tooHigh] = features(board, cells);
          const score = f.reduce((a, v, i) => a + this.weights[i] * v, 0) - (tooHigh ? 1000 : 0);
          if (!best || score > best[0]) best = [score, shape, col];
        }
      }
      return best && [best[1], best[2]];
    }
    // g: 자기 판 (Tetris). 화면에 보이는 2행부터 읽는 Python 판과 같게 위 두 줄은 비운다
    act(g) {
      if (!g.alive) return [NOOP, this.wait];
      const board = g.board.slice(); board.fill(0, 0, FIRST_ROW * W);
      const active = g.cells().filter(([r]) => r >= FIRST_ROW);
      if (active.length !== 4) return [NOOP, this.wait];
      const key = String(board) + g.kind;
      if (key !== this.last) { this.last = key; this.target = this.plan(board, g.kind); this.rotTries = 0; this.pause = this.delay; }
      if (this.pause > 0) { this.pause--; return [NOOP, this.wait]; }   // 새 블록을 delay 번 보고 나서 움직임 (Python 과 같다)
      if (!this.target) return [HARD_DROP, this.wait];
      const [shape, col] = this.target, cur = norm(active);
      if (!same(cur, shape) && this.rotTries < 4) {
        let k0 = 0; while (!same(norm(SHAPES[g.kind][k0]), cur)) k0++;
        let d = 1; while (!same(norm(SHAPES[g.kind][(k0 + d) % 4]), shape)) d++;
        this.rotTries++;
        return [d === 3 ? ROT_CCW : ROT_CW, this.wait];
      }
      const c0 = Math.min(...active.map(c => c[1]));
      if (c0 < col) return [RIGHT, this.wait];
      if (c0 > col) return [LEFT, this.wait];
      return [HARD_DROP, this.wait];
    }
  }

  const API = {W, H, VISIBLE_TOP, NOOP, LEFT, RIGHT, ROT_CW, ROT_CCW, SOFT_DROP, HARD_DROP, HOLD, ACTION_NAMES, PIECES, SHAPES,
    WAIT_BINS: [4, 6, 8, 12, 16, 24, 32, 60], MIN_WAIT: 4, MAX_WAIT: 60, FRAME_W, FRAME_H,
    PyRandom, Tetris, Match, renderView, toRGB, HeuristicAgent};
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.TB = API;
})(typeof window !== "undefined" ? window : globalThis);
