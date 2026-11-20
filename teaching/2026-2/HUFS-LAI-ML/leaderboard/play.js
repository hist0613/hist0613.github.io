// 리더보드에서 직접 두기: 사람(왼쪽) vs agent(오른쪽). 엔진·화면은 tetris.js (Python 과 같은 판).
// agent 는 level1(공개용 heuristic) 또는 학생 model.onnx (onnxruntime-web 으로 이 브라우저에서 실행).
// model 이 inference 하는 동안에도 게임은 흐른다 (평가와 같은 규칙: inference 시간도 게임 시간).
(function () {
  const TB = window.TB;
  const ORT_URL = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/ort.min.js";
  const DAS = 10, ARR = 2, SOFT_ARR = 2;
  const KEYS = {ArrowLeft: TB.LEFT, ArrowRight: TB.RIGHT, ArrowUp: TB.ROT_CW, KeyX: TB.ROT_CW, KeyZ: TB.ROT_CCW,
    ArrowDown: TB.SOFT_DROP, Space: TB.HARD_DROP, KeyC: TB.HOLD, ShiftLeft: TB.HOLD, ShiftRight: TB.HOLD};
  const clampWait = w => Math.max(TB.MIN_WAIT, Math.min(TB.MAX_WAIT, w | 0));

  let ortPromise = null;
  function loadOrt() {
    if (!ortPromise) ortPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script"); s.src = ORT_URL;
      s.onload = () => { window.ort.env.wasm.numThreads = 1; resolve(window.ort); };
      s.onerror = () => reject(new Error("onnxruntime-web 을 불러오지 못함"));
      document.head.appendChild(s);
    });
    return ortPromise;
  }

  // 사람: 누른 키를 tick 마다 하나씩. 누르고 있으면 10 tick 뒤부터 2 tick 마다 반복 (scripts/play.py 와 같다)
  class Human {
    constructor() { this.queue = []; this.held = new Map(); }
    down(code) {
      const a = KEYS[code]; if (a === undefined) return false;
      if (!this.held.has(code)) {
        if (this.queue.length < 3) this.queue.push(a);
        if (a === TB.LEFT || a === TB.RIGHT || a === TB.SOFT_DROP) this.held.set(code, 0);
      }
      return true;
    }
    up(code) { this.held.delete(code); }
    action() {
      for (const [code, t0] of this.held) {
        const t = t0 + 1; this.held.set(code, t); const a = KEYS[code];
        const rep = a === TB.SOFT_DROP ? t % SOFT_ARR === 0 : t >= DAS && (t - DAS) % ARR === 0;
        if (rep && !this.queue.length) this.queue.push(a);
      }
      return this.queue.length ? this.queue.shift() : TB.NOOP;
    }
  }

  // level1: 엔진 상태를 바로 읽어 계산이 짧다
  class SyncOpponent {
    constructor(agent) { this.agent = agent; this.left = 0; }
    action(match) {
      if (this.left > 0) { this.left--; return TB.NOOP; }
      const [a, w] = this.agent.act(match.games[1]); this.left = clampWait(w) - 1; return a;
    }
  }

  // 학생 model: 화면(자기 판이 왼쪽)을 넣고 결과가 나올 때까지 NOOP
  class OnnxOpponent {
    static async create(url, onStatus) {
      onStatus("onnxruntime-web 을 불러오는 중…");
      const ort = await loadOrt();
      onStatus("model 을 받는 중…");
      const sess = await ort.InferenceSession.create(url, {executionProviders: ["wasm"]});
      if (!sess.outputNames.includes("action_logits")) throw new Error("출력에 action_logits 가 없음");
      return new OnnxOpponent(ort, sess);
    }
    constructor(ort, sess) {
      this.ort = ort; this.sess = sess; this.input = sess.inputNames[0];
      this.left = 0; this.busy = false; this.ready = null; this.ms = [];   // 4 tick 마다 action 하나 (wait 출력은 쓰지 않음)
    }
    action(match) {
      if (this.left > 0) { this.left--; return TB.NOOP; }
      if (this.ready !== null) { const a = this.ready; this.ready = null; this.left = TB.MIN_WAIT - 1; return a; }
      if (!this.busy) {
        this.busy = true;
        const x = new this.ort.Tensor("uint8", TB.toRGB(TB.renderView(match, 1)), [1, TB.FRAME_H, TB.FRAME_W, 3]);
        const t0 = performance.now();
        this.sess.run({[this.input]: x}, ["action_logits"]).then(out => {
          const argmax = arr => { let k = 0; for (let i = 1; i < arr.length; i++) if (arr[i] > arr[k]) k = i; return k; };
          this.ms.push(performance.now() - t0); this.ready = argmax(Array.from(out.action_logits.data).slice(0, 8)); this.busy = false;
        }).catch(() => { this.ready = TB.NOOP; this.busy = false; });
      }
      return TB.NOOP;
    }
  }

  // root: 대결 팝업 안. o: 상대 {label, kind: "level1" | "onnx" | "heuristic", url, heuristic: {wait, weights}}
  // "heuristic" 은 화면 확인용 예시 데이터에서 학생 자리에 넣은 heuristic agent 를 그대로 두기 위한 것
  function mount(root, o) {
    root.innerHTML = `
      <div class="pl-head"><div class="tp-title">나 vs <span class="pl-title-opp"></span></div>
        <div class="pl-ctrl"><button class="pl-start">시작</button></div></div>
      <div class="pl-status"></div>
      <div class="tp-names"><span>나</span><span class="pl-oppname"></span></div>
      <div class="tp-stage"><canvas width="640" height="384" tabindex="0"></canvas></div>
      <p class="pl-keys">← → 이동 · ↓ 천천히 내리기 · Space 바로 내리기 · ↑/X 시계 회전 · Z 반시계 회전 · C/Shift hold · 5분이 지나면 보낸 줄 수로 승패</p>`;
    const $ = s => root.querySelector(s);
    const cv = $("canvas"), ctx = cv.getContext("2d"), img = ctx.createImageData(TB.FRAME_W, TB.FRAME_H);
    $(".pl-title-opp").textContent = o.label; $(".pl-oppname").textContent = o.label;
    const status = t => { $(".pl-status").textContent = t; };
    let match = null, human = null, opp = null, raf = null, last = 0, acc = 0, running = false;

    const draw = () => { img.data.set(TB.renderView(match, 0)); ctx.putImageData(img, 0, 0); };
    function loop(now) {
      if (!running) return;
      acc += Math.min(100, now - last) * 0.06; last = now;   // 60 tick = 1초
      while (acc >= 1 && !match.done) { acc -= 1; match.step(human.action(), opp.action(match)); }
      draw();
      if (match.done) {
        running = false;
        const w = match.result.winner, word = w === 0 ? "이겼습니다" : w === 1 ? "졌습니다" : "비겼습니다";
        const avg = opp.ms && opp.ms.length ? ` · 상대 결정당 ${(opp.ms.reduce((a, b) => a + b, 0) / opp.ms.length).toFixed(1)}ms` : "";
        status(`${word} (${match.result.reason === "time" ? "시간 종료, 보낸 줄 " + match.result.sent.join(" : ") : "먼저 넘침"})${avg}. 시작을 누르면 다시`);
        $(".pl-start").textContent = "다시";
        return;
      }
      raf = requestAnimationFrame(loop);
    }
    async function start() {
      stop();
      $(".pl-start").disabled = true;
      try {
        opp = o.kind === "onnx" ? await OnnxOpponent.create(o.url, status)
          : new SyncOpponent(o.heuristic ? new TB.HeuristicAgent(o.heuristic.wait, o.heuristic.weights) : new TB.HeuristicAgent());
      } catch (e) { status(`상대를 불러오지 못했습니다: ${e.message}`); $(".pl-start").disabled = false; return; }
      $(".pl-start").disabled = false; $(".pl-start").textContent = "다시 시작";
      const seed = Math.floor(Math.random() * 1e6);
      match = new TB.Match(seed); human = new Human();
      status(`seed ${seed}`);
      cv.focus(); running = true; acc = 0; last = performance.now(); raf = requestAnimationFrame(loop);
    }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }
    $(".pl-start").onclick = start;
    const onDown = e => {
      if (!running || !human || !(e.code in KEYS)) return;
      e.preventDefault();
      if (!e.repeat) human.down(e.code);   // 누르고 있을 때의 반복은 Human 이 직접 만든다
    };
    const onUp = e => { if (human) human.up(e.code); };
    window.addEventListener("keydown", onDown); window.addEventListener("keyup", onUp);
    status("시작을 누르면 바로 둡니다.");
    // 빈 판을 미리 보여 준다
    match = new TB.Match(0); draw();
    return {stop, stats: () => ({decisions: opp && opp.ms ? opp.ms.length : null, ms: opp && opp.ms ? opp.ms.slice(-5) : null,
      tick: match && match.tick, oppLines: match && match.games[1].lines, oppPieces: match && match.games[1].pieces}), destroy: () => { stop(); window.removeEventListener("keydown", onDown); window.removeEventListener("keyup", onUp); }};
  }

  window.TetrisPlay = {mount};
})();
