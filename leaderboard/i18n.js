// 화면 문구 영어/한국어 전환(2026-11-07). 고른 언어는 이 브라우저에 저장해 다음에 와도 그 언어로 연다.
// - JS 문구: t('English {x}', { x }). 영어 원문이 key 이고, 한국어가 없으면 영어 그대로 보인다
// - index.html 문구: data-i18n="id" 인 요소의 HTML 을 HTML_KO[id] 로 바꾼다. 영어는 처음 HTML 을 기억해 두었다가 되돌린다
// - 속성: data-i18n-attr="placeholder title" 이면 그 속성 값을 t() 로 옮긴다
// - benchmark 설명은 benchmarks.json 의 description_ko·metric_label_ko 를 field() 로 읽는다
(() => {
  'use strict';

  const STORE = 'lb-lang';

  const KO = {
    // 칸 상태와 이유
    'no image input': '이미지 입력 없음',
    'This model does not take images.': '이미지를 받지 않는 모델입니다.',
    'no audio input': '오디오 입력 없음',
    'This model does not take audio.': '오디오를 받지 않는 모델입니다.',
    'no tool calling': 'tool calling 없음',
    "This model's chat template cannot render tool calls, so the tool scenarios of this benchmark cannot be built.": '이 모델의 chat template 이 tool call 을 표현하지 못해 이 benchmark 의 tool 시나리오를 만들 수 없습니다.',
    'context too short': 'context 부족',
    "This model's context window is shorter than the length this benchmark is run with.": '이 모델의 context window 가 이 benchmark 를 돌리는 길이보다 짧습니다.',
    'running': '평가 중',
    'queued': '대기',
    'not supported yet': '아직 미지원',
    'This leaderboard does not run {bench} with thinking {setting} yet. Left out of averages.': '이 leaderboard 는 아직 {bench} 를 thinking {setting} 으로 돌리지 않습니다. 평균에서 뺍니다.',
    'this benchmark': '이 benchmark',
    'Counted as 0 in averages.': '평균에는 0점으로 들어갑니다.',
    'Left out of averages.': '평균에서 뺍니다.',
    'to be added': '추가 예정',
    'Not evaluated yet and not in the queue yet. It will be added.': '아직 평가하지 않았고 대기열에도 없습니다. 추가할 예정입니다.',
    'Eval time is measured per benchmark only': '평가 시간은 benchmark 단위로만 잽니다',
    'Average over {m} of {n}': '{n}개 중 {m}개의 평균',
    'No models match the filters.': '조건에 맞는 모델이 없습니다.',

    // 언어·이미지 표시
    'English': '영어',
    'Korean': '한국어',
    'image': '이미지',
    'Questions come with images. Only models that take images are evaluated.': '문항에 이미지가 있습니다. 이미지를 받는 모델만 평가합니다.',

    // 표 머리글
    'Average': '평균',
    'Total time': '총 시간',
    'Per item': '문항당',
    'Model': '모델',
    'Params': '파라미터',
    'Summary': '요약',
    'macro of {n} benchmark ▾': 'benchmark {n}개 macro ▾',
    'macro of {n} benchmarks ▾': 'benchmark {n}개 macro ▾',
    'Choose the benchmarks in the average': '평균에 넣을 benchmark 고르기',
    'Avg rank': '평균 순위',
    'Score': '점수',
    'Time': '시간',
    'Tokens / item': 'Token / 문항',
    'Overall': '전체',
    'Hide what is inside': '안쪽 접기',
    'Show what is inside': '안쪽 펼치기',
    'Main metric': '대표 지표',
    'Dataset': '데이터셋',
    'Move {name} earlier': '{name} 앞으로',
    'Move {name} later': '{name} 뒤로',
    'Use ‹ › or drag to change the order (or Alt+←/→)': '‹ › 를 누르거나 끌어서 순서를 바꿉니다 (Alt+←/→ 도 됩니다)',
    'Remove the {name} row': '{name} 줄 빼기',
    'Add a header row': '머리글 줄 더하기',

    // 머리글 줄 이름(benchmarks.json 의 axes)
    'Benchmark': 'Benchmark',
    'Subtask': 'Subtask',
    'Language': '언어',
    'Language pair': '언어 쌍',
    'Input': '입력',
    'Task type': 'Task 유형',
    'Domain': '분야',
    'Cross-domain group': '분야 횡단 묶음',
    'Difficulty': '난이도',
    'Scoring': '채점 방식',
    // 묶음 값(benchmarks.json 의 tags)
    'Text': '텍스트',
    'Image': '이미지',
    'Knowledge': '지식',
    'Math reasoning': '수학 추론',
    'Instruction following': '지시 따르기',
    'Function calling': 'Function calling',
    'Conversational memory': '대화 기억',
    'Emotional intelligence': '감정 지능',
    'Visual understanding': '시각 이해',
    'College': '대학',
    'Expert': '전문가',
    'General': '일반',
    'Olympiad': '올림피아드',
    'Multiple choice': '객관식',
    'Exact match': 'Exact match',
    'Judge model': 'Judge model',
    'STEM': 'STEM',
    'AI4Science': 'AI4Science',
    'Rule-based': '규칙 기반',
    'Business': '경영',
    'Accounting': '회계',
    'Economics': '경제',
    'Management': '경영관리',
    'Humanities': '인문',
    'Arts': '예술',
    'History': '역사',
    'Linguistics': '언어학',
    'Philosophy': '철학',
    'Law': '법',
    'Medicine': '의학',
    'Agriculture': '농학',
    'Biology': '생물',
    'Chemistry': '화학',
    'Computer science': '컴퓨터과학',
    'Engineering': '공학',
    'Materials': '재료',
    'Math': '수학',
    'Physics': '물리',
    'Social science': '사회과학',
    'Psychology': '심리학',
    '(none)': '(없음)',

    // 행
    '{n} more setting': '설정 {n}개 더',
    '{n} more settings': '설정 {n}개 더',
    'Details of {model}': '{model} 상세',
    'Weights in {prec}': '{prec} weight',
    'Greedy decoding (runs before 2026-11-05)': 'Greedy decoding (2026-11-05 이전 결과)',
    '{m} models, {r} rows shown': '모델 {m}개, 행 {r}개',
    ' (settings grouped under each model; the top row is the best setting by the current sort)': ' (모델마다 설정을 묶었고, 맨 위 행이 지금 정렬 기준으로 가장 좋은 설정입니다)',

    // Average 패널
    'Benchmarks in the average': '평균에 넣을 benchmark',
    'All': '전체',
    'Text only': '텍스트만',
    'None': '없음',
    'Benchmarks a model cannot take (for example, images for a text-only model):': '모델이 받을 수 없는 benchmark (예: 텍스트 전용 모델의 이미지 문항):',
    'Count as 0': '0점으로 셈',
    'Leave out': '평균에서 뺌',

    // 툴팁
    'Average score': '평균 점수',
    'Total eval time': '총 평가 시간',
    'Output tokens per item, generative benchmarks': '문항당 출력 token (생성형 benchmark)',
    'Average rank (lower is better)': '평균 순위 (낮을수록 좋음)',
    'The benchmark column shows its official score.': 'benchmark 열은 공식 점수를 보입니다.',
    'This column holds only the {bench} subtasks in this group, so it shows their macro average.': '이 열에는 이 묶음에 든 {bench} subtask 만 있어서 그 macro average 를 보입니다.',
    '{n} items · {metric}': '문항 {n}개 · {metric}',
    '{axis}: macro average of the columns inside.': '{axis}: 안쪽 열들의 macro average.',
    '{n} items': '문항 {n}개',
    'No values in the current view.': '지금 보이는 값이 없습니다.',
    'Models': '모델 수',
    'Mean': '평균',
    'Median': '중앙값',
    'Std': '표준편차',
    'Min': '최소',
    'Max': '최대',
    'Being evaluated now': '지금 평가 중',
    'Waiting in the evaluation queue': '평가 대기열에 있음',
    'Not evaluated yet': '아직 평가 전',
    'Output': '출력',
    '{n} tokens per item': '문항당 {n} token',
    'Generation limit': '생성 한도',
    'Eval time': '평가 시간',
    '{time} on {gpu}': '{gpu} 에서 {time}',
    'Evaluated': '평가일',
    'Click the cell to see one item the model got right and one it got wrong': '칸을 누르면 모델이 맞힌 문항과 틀린 문항을 하나씩 볼 수 있습니다',
    'Benchmarks': 'Benchmark',
    'average of {n} of the {of} checked': '체크한 {of}개 중 {n}개의 평균',
    'Missing': '빠진 것',
    'greedy (runs before 2026-11-05)': 'greedy (2026-11-05 이전 결과)',
    'greedy (the model recommends no sampling)': 'greedy (모델 권장 sampling 없음)',
    "the model's recommended sampling: {parts}": '모델 권장 sampling: {parts}',
    'no item hit it ({n} items)': '걸린 문항 없음 (문항 {n}개)',
    '{c} of {n} items hit it': '문항 {n}개 중 {c}개가 걸림',
    ', {n} of them repeating the same text': ', 그중 {n}개는 같은 글을 되풀이',

    // 모델 상세 창
    'not evaluated': '평가 전',
    'request': '신청',
    'Precision': 'Precision',
    'Parameters': '파라미터 수',
    'Architecture': 'Architecture',
    'License': '라이선스',
    'Revision': 'Revision',
    'Generated tokens per item': '문항당 생성 token',
    'Weights plus the KV cache of one 8,192-token request': 'weight 와 8,192-token 요청 하나의 KV cache',
    'Min. memory': '최소 메모리',
    'Request': '신청',
    'Close': '닫기',

    // 점수 대 비용
    'Output tokens per item': '문항당 출력 token',
    'Minimum GPU memory (GiB)': '최소 GPU 메모리 (GiB)',
    'Output tokens': '출력 token',
    'GPU memory': 'GPU 메모리',
    'Average of the {n} checked benchmarks': '체크한 benchmark {n}개의 평균',
    'Columns of the table ({axes})': '표의 열 ({axes})',
    'Plotted: the average of {a} of the {n} benchmarks checked for Average in the table ({list}).': '그린 값: 표에서 평균에 체크한 benchmark {n}개 중 {a}개의 평균 ({list}).',
    "The table's Average uses every checked benchmark and marks missing ones with *. Here only the benchmarks that at least 80% of the rows in view have finished are used, and only rows that have all of them, so every point is compared on the same benchmarks.": '표의 평균은 체크한 benchmark 를 모두 쓰고 빠진 것이 있으면 * 를 붙입니다. 여기서는 보이는 행의 80% 이상이 끝낸 benchmark 만 쓰고 그것을 모두 가진 행만 찍어서, 모든 점을 같은 benchmark 로 비교합니다.',
    'Plotted: {label}, the same column as in the table.': '그린 값: {label}, 표의 같은 열입니다.',
    '{desc} Score: {metric}.': '{desc} 점수: {metric}.',
    'Plotted: {label} from the table, the macro average of {p} of its {all} columns ({list}{more}).': '그린 값: 표의 {label}, 그 안의 열 {all}개 중 {p}개의 macro average ({list}{more}).',
    ' and {n} more': ' 외 {n}개',
    'As with Average, only the columns that at least 80% of the rows in view have finished are used, and only rows that have all of them.': '평균과 같이 보이는 행의 80% 이상이 끝낸 열만 쓰고, 그것을 모두 가진 행만 찍습니다.',
    'Eval time is measured per whole benchmark, so this group, which holds only part of a benchmark, has no eval time.': '평가 시간은 benchmark 전체 단위로만 재서, benchmark 일부만 담은 이 묶음에는 평가 시간이 없습니다.',
    'Tokens are generated tokens per item, averaged the same way.': 'Token 은 문항당 생성 token 이고, 같은 방식으로 평균합니다.',
    'Eval time depends on the GPU (RTX 4090 or RTX 5090) that ran it.': '평가 시간은 돌린 GPU(RTX 4090 또는 RTX 5090)에 따라 다릅니다.',
    'Weights plus the KV cache of one 8,192-token request, as allocated by vLLM. vLLM reserves most of the card up front, so the peak reading of the GPU is not informative.': 'weight 와 8,192-token 요청 하나의 KV cache 를 더한 값으로, vLLM 이 잡은 크기입니다. vLLM 은 처음에 카드 대부분을 잡아 두므로 GPU 최대 사용량으로는 알 수 없습니다.',
    'Tokens are generated tokens per item over those benchmarks.': 'Token 은 그 benchmark 들의 문항당 생성 token 입니다.',
    '{name} is scored by log-likelihood, so it generates no tokens. Pick another cost axis.': '{name} 은 log-likelihood 로 채점해서 생성 token 이 없습니다. 다른 비용 축을 고르세요.',
    'No rows with both a score and this cost in the current view.': '지금 보이는 행 중 점수와 이 비용이 모두 있는 행이 없습니다.',
    '{label} (log scale) →': '{label} (log scale) →',
    'Score against {label}': '{label} 대비 점수',
    'Rows': '행',
    'Median score': '점수 중앙값',
    'Median over models evaluated both with thinking off and in this setting': 'thinking off 와 이 설정으로 모두 평가한 모델들의 중앙값',
    'Score vs. thinking off': 'thinking off 대비 점수',
    'Median ratio over the same models': '같은 모델들의 비율 중앙값',
    '{label} vs. thinking off': 'thinking off 대비 {label}',

    // 예시 답 패널
    'Image {i} of the item': '문항 이미지 {i}',
    '{n} worked examples (few-shot)': '풀이 예시 {n}개 (few-shot)',
    '{n} earlier turns': '앞선 대화 {n}턴',
    ' · {n} tokens in total': ' · 모두 {n} token',
    ' · hit the generation limit': ' · 생성 한도에 걸림',
    'model output': '모델 출력',
    '(empty)': '(비어 있음)',
    'every constraint of the higher-priority instruction': '우선순위가 높은 지시의 모든 제약',
    "the prompt's verifiable instructions": 'prompt 의 검증 가능한 지시',
    'Extracted': '추출한 답',
    'Result': '결과',
    'Correct': '정답',
    'Wrong': '오답',
    'Checked by': '검사 기준',
    'Reference': '기준 답',
    'Loading…': '불러오는 중…',
    'Sample answers for this cell are not ready yet.': '이 칸의 예시 답은 아직 준비되지 않았습니다.',
    '{bench} asks that its questions not be posted online in plain text, so this panel shows no question or output for it. The score in the table counts every item as usual.': '{bench} 는 문항을 온라인에 평문으로 올리지 말아 달라고 요청해서, 이 패널에는 문항과 출력을 보이지 않습니다. 표의 점수는 평소처럼 모든 문항으로 셉니다.',
    'The model answered every item correctly.': '모델이 모든 문항을 맞혔습니다.',
    'The model answered no item correctly.': '모델이 맞힌 문항이 없습니다.',
    'Item {id}': '문항 {id}',
    '. Picked at random from the items the model answered correctly.': '. 모델이 맞힌 문항 중 무작위로 골랐습니다.',
    '. Picked at random from the items the model answered wrongly.': '. 모델이 틀린 문항 중 무작위로 골랐습니다.',
    'Shown as messages. Each model received them through its own chat template; templates without a system role put the system message into the first user turn.': '메시지 단위로 보입니다. 모델마다 자기 chat template 으로 이 메시지를 받았고, system 역할이 없는 template 은 system 메시지를 첫 user 턴에 넣습니다.',
    'Which item': '어느 문항',
    'Correct item': '맞힌 문항',
    'Wrong item': '틀린 문항',
    ' · score {s}': ' · 점수 {s}',

    // 조건
    '{n} rows': '{n}행',
    'No results yet': '아직 결과 없음',
    'recommended': '권장',
    "Each model's recommended sampling, greedy when it recommends none": '모델마다 권장 sampling, 권장이 없으면 greedy',
    'Greedy decoding for every model (runs before 2026-11-05)': '모든 모델 greedy decoding (2026-11-05 이전 결과)',
    'Invalid regular expression': '정규식이 잘못되었습니다',

    // benchmark 목록
    ' (prompt and answer extraction from the {link})': ' (prompt 와 답 추출은 {link}를 따름)',
    'official {name} code': '공식 {name} 코드',
    'dataset': '데이터셋',
    'paper': '논문',
    'Click a benchmark to see how it is run and scored.': 'benchmark 를 누르면 어떻게 돌리고 채점하는지 보입니다.',

    // 갱신 시각
    'Last updated {t} KST.': '마지막 갱신 {t} KST.',
    ' Cells marked queued or running are still being evaluated.': ' 대기·평가 중으로 표시된 칸은 아직 평가하고 있습니다.',
    'Could not load leaderboard data: {msg}': 'leaderboard 데이터를 불러오지 못했습니다: {msg}',

    // index.html 속성
    'e.g. Qwen/*, *-Instruct, /llama|gemma/, !*-2B': '예: Qwen/*, *-Instruct, /llama|gemma/, !*-2B',
    'What the cells mean': '칸 표시의 뜻',
    'Previous benchmark (Shift + ←)': '이전 benchmark (Shift + ←)',
    'Next benchmark (Shift + →)': '다음 benchmark (Shift + →)',
    'Leaderboard table': 'Leaderboard 표',
    'Sample answers': '예시 답',
  };

  // index.html 의 data-i18n 요소. 영어는 index.html 에 있는 그대로다
  const HTML_KO = {
    lede: 'Weight 를 내려받을 수 있는 LLM 을 공개 benchmark 로 평가합니다. 모든 모델에 같은 harness, prompt, 채점을 씁니다. 신청은 GitHub issue 로 받아 차례로 평가하므로, 결과가 계속 늘어납니다.',
    contribute: '참여하기',
    contribute_request: '보고 싶은 모델이나 benchmark 가 있으면 <a id="submit-link" href="https://github.com/hist0613/hist0613.github.io/issues/new?template=eval-request.yml">평가 신청 양식</a>으로 GitHub issue 를 올려 주세요.',
    contribute_contact: 'LLM 평가 연구를 같이 하고 싶거나 데이터, GPU 시간, compute credit 을 지원해 주실 수 있으면 <a href="mailto:seungtaek.choi@hufs.ac.kr">seungtaek.choi@hufs.ac.kr</a> 로 연락 주세요.',
    sample_note: '이 숫자는 화면을 만들려고 넣은 가짜 데이터입니다. 평가 결과가 아닙니다.',
    model: '모델',
    search_help: '쉼표로 패턴을 나눕니다. <code>*</code> 는 아무 글자, <code>/…/</code> 는 정규식, 앞에 붙인 <code>!</code> 는 제외입니다.',
    size: '크기',
    cells_show: '칸에 보일 값',
    mode_score: '점수',
    mode_time: '평가 시간',
    mode_tokens: '출력 token',
    rows: '행',
    group_variants: '같은 모델의 설정 묶기',
    table_help: 'benchmark 이름을 누르면 subtask 가, 열 제목을 누르면 정렬이, 모델 이름을 누르면 상세 정보가 보입니다.',
    lg_todo: '<span class="lg st-todo"><span class="why">추가 예정</span></span> 아직 평가하지 않았고 대기열에도 없음',
    lg_queued: '<span class="lg st-queued"><span class="pend queued">대기</span></span> 대기열에 있음',
    lg_running: '<span class="lg st-running"><span class="pend running">평가 중</span></span> 지금 평가하고 있음',
    lg_cannot: '<span class="lg st-cannot">0.0</span> 모델이 받을 수 없는 benchmark (예: 텍스트 전용 모델의 이미지 문항). 평균에는 0점으로 들어가고, 마우스를 올리면 이유가 보임',
    lg_notyet: '<span class="lg st-notyet"><span class="why">아직 미지원</span></span> 이 leaderboard 가 이 설정으로는 아직 돌리지 않는 benchmark',
    lg_partial: '<span class="lg">68.1*</span> 체크한 benchmark 중 일부로만 낸 평균. 마우스를 올리면 빠진 것이 보임',
    lg_none: '<span class="lg">–</span> 값 없음',
    prev_bench: '◀ 이전 benchmark',
    scroll_hint: '표를 누른 상태에서 ← →, Shift + 휠, 또는 머리글 위에서 휠로 옆으로 넘깁니다.',
    next_bench: '다음 benchmark ▶',
    cost_title: '점수 대 비용',
    cost_help: '점 하나는 thinking 설정 하나로 평가한 모델 하나이고, 같은 모델의 설정끼리 선으로 잇습니다. 속이 빈 점은 thinking off 입니다. 점선은 Pareto front 로, 이보다 비용이 낮으면서 점수가 높은 점이 없습니다. 점에 마우스를 올리면 자세히 보입니다. 위 표의 모델 조건, 평균에 체크한 benchmark, 열 묶음이 여기에도 그대로 적용됩니다.',
    plot: '그릴 값',
    cost_axis: '비용 축',
    how_title: '평가 방식',
    how_harness: '모든 모델은 vLLM 위에서 <a href="https://github.com/EleutherAI/lm-evaluation-harness">lm-evaluation-harness</a> 로 평가하고, bfloat16, greedy decoding, 모델 자신의 chat template 을 씁니다.',
    how_decoding: '<b>Decoding</b> 은 모델마다 권장하는 값을 따릅니다. 카드가 그 thinking 모드에 주는 sampling 값이나 <code>generation_config.json</code> 을 쓰고, 권장이 없으면 greedy decoding 을 씁니다(seed 1234). 2026-11-05 이전 결과는 모든 모델을 greedy decoding 으로 돌린 것이라, thinking off 와 on 처럼 따로 <i>greedy</i> 행으로 남겨 둡니다. 칸에 마우스를 올리면 쓴 값과, 이 평가의 생성 한도에 걸린 문항 수가 보입니다.',
    how_thinking: '<b>Thinking</b> 은 chat template 의 thinking 모드입니다. <i>off</i> 와 <i>on</i> 은 켜고 끌 수 있는 모델용이고, <i>on</i> 은 모델 기본 thinking 양입니다. <i>low</i>, <i>medium</i>, <i>high</i> 는 effort 수준을 받는 모델용입니다. thinking 을 켜면 답에 모델이 권장하는 출력 길이를, 권장이 없으면 30,720 token 을 쓸 수 있고, context 는 그 길이에 prompt 몫 8,192 token 을 더한 만큼입니다(대화가 긴 LoCoMo 는 약 28,000). 모델 자신의 context window 를 넘지는 않습니다. 공식 코드로 돌리는 MIH, BFCL, ChemBench 는 그 context 에서 prompt 가 남긴 만큼 쓸 수 있습니다. 채점은 thinking 뒤의 글만 봅니다. 한도 안에 thinking 이 끝나지 않은 응답은 무응답으로 셉니다.',
    how_context: 'thinking off 에서는 benchmark 를 8,192-token context 로 돌립니다(AIME 2025, LoCoMo, 이미지 benchmark 는 32K). context window 가 이보다 짧은 모델은 자기 window 안에서 돌리고 그 절반까지 답에 씁니다. 들어가지 않는 문항은 오답으로 셉니다. LoCoMo 는 입력만 약 26,000 token 이어서, 그런 모델에서는 받을 수 없는 benchmark 로 보입니다.',
    how_image: '<span class="modality">이미지</span> 표시가 있는 benchmark 는 문항에 이미지가 있어서 이미지를 받는 모델에서만 돌리고, 모든 이미지는 긴 변이 2,048 pixel 이하가 되게 줄입니다.',
    how_average: '<b>평균</b>은 체크한 benchmark 공식 점수의 macro average 이고, 평균 순위도 같은 benchmark 로 냅니다. 기본으로 이미지 benchmark 까지 모두 체크되어 있습니다. 모델이 받을 수 없는 benchmark(예: 텍스트 전용 모델의 이미지 문항)는 빼기로 고르지 않으면 0점으로 세고, 이 leaderboard 가 그 설정으로 아직 돌리지 않는 benchmark 는 늘 뺍니다. 평균 아래 버튼으로 둘 다 바꿀 수 있습니다.',
    how_group: '모델 열 위의 이름표로 언어, task 유형, 분야 같은 benchmark 속성에 따라 열을 다시 묶을 수 있습니다. 묶음 칸은 그 아래 열들의 macro average 를 보이고(모든 열이 정확도면 문항 수로 가중한 micro average 도 툴팁에 보입니다), * 가 붙은 값은 빠진 열이 있다는 뜻입니다.',
    how_time: '평가 시간은 적힌 GPU 에서 benchmark 하나를 돌린 wall-clock 시간이고 모델 로딩을 포함합니다.',
    how_tokens: '출력 token 은 문항당 생성한 token 수로, 모델 자신의 tokenizer 로 세고 thinking 글도 포함합니다.',
    how_memory: 'GPU 메모리는 모델 weight 에 8,192-token 요청 하나의 KV cache 를 더한 값으로, vLLM 이 잡은 크기입니다.',
    how_auto: '표준 transformers 구조로 불러지는(remote code 가 없는) 모델만 자동으로 평가합니다. 나머지는 먼저 검토합니다.',
    flags: '국기 아이콘은 <a href="https://github.com/jdecked/twemoji">Twemoji</a> 것이고 CC-BY 4.0 으로 배포됩니다.',
  };

  let lang = '';
  try { lang = localStorage.getItem(STORE) || ''; } catch (e) { /* 저장소를 못 쓰면 브라우저 언어를 따른다 */ }
  if (lang !== 'en' && lang !== 'ko') lang = /^ko\b/i.test(navigator.language || '') ? 'ko' : 'en';

  const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : s);
  const t = (en, vars) => fill(lang === 'ko' && KO[en] != null ? KO[en] : en, vars);
  // benchmarks.json 의 글: 한국어면 <name>_ko 가 있을 때 그것을 쓴다
  const field = (obj, name) => (lang === 'ko' && obj?.[`${name}_ko`]) || obj?.[name];

  const origHtml = new WeakMap();
  const origAttr = new WeakMap();
  function apply(root = document) {
    document.documentElement.lang = lang;
    for (const el of root.querySelectorAll('[data-i18n]')) {
      if (!origHtml.has(el)) origHtml.set(el, el.innerHTML);
      const ko = HTML_KO[el.dataset.i18n];
      el.innerHTML = lang === 'ko' && ko != null ? ko : origHtml.get(el);
    }
    for (const el of root.querySelectorAll('[data-i18n-attr]')) {
      if (!origAttr.has(el)) origAttr.set(el, Object.fromEntries(el.dataset.i18nAttr.split(/\s+/).map((a) => [a, el.getAttribute(a)])));
      for (const [a, en] of Object.entries(origAttr.get(el))) if (en != null) el.setAttribute(a, t(en));
    }
    for (const b of root.querySelectorAll('[data-lang]')) b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  }

  function set(next) {
    if (next !== 'en' && next !== 'ko') return;
    lang = next;
    try { localStorage.setItem(STORE, lang); } catch (e) { /* 저장 못 하면 이번 방문에만 바꾼다 */ }
    apply();
  }

  globalThis.LBI18N = { t, field, apply, set, get lang() { return lang; }, dict: { KO, HTML_KO } };
})();
