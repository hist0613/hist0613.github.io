const departments = [
  // General (Minerva)
  { id: "Minerva", name: "미네르바(교양)", group: "General", color: "#64748b", url: "https://minerva.hufs.ac.kr/" },

  // AI Majors
  { id: "ICE", name: "정보통신공학과", group: "AI", color: "#3b82f6", url: "https://ice.hufs.ac.kr/ice/998/subview.do" }, 
  { id: "CSE", name: "컴퓨터공학과", group: "AI", color: "#10b981", url: "https://computer.hufs.ac.kr/computer/10048/subview.do" },
  { id: "LAI", name: "Language & AI", group: "AI", color: "#f59e0b", url: "https://langai.hufs.ac.kr/langai/10805/subview.do" }, 
  { id: "SSAI", name: "Social Science & AI", group: "AI", color: "#ec4899", url: "https://ssai.hufs.ac.kr/ssai/10867/subview.do" }, 
  { id: "FAI", name: "Finance & AI", group: "AI", color: "#8b5cf6", url: "https://aifinance.hufs.ac.kr/aifinance/m03_s01.do" }, 
  { id: "AID", name: "AI 데이터융합", group: "AI", color: "#06b6d4", url: "https://aidata.hufs.ac.kr/aidata/16994/subview.do" }, 

  // AX Majors (Group A)
  { id: "IME", name: "산업경영공학과", group: "AX_A", color: "#f97316", url: "https://ime.hufs.ac.kr/ime/2828/subview.do" },
  { id: "SEM", name: "반도체공학과", group: "AX_A", color: "#475569", url: "https://semi.hufs.ac.kr/" },
  { id: "BME", name: "바이오메디컬공학부", group: "AX_A", color: "#0891b2", url: "https://bme.hufs.ac.kr/" },
  { id: "STAT", name: "통계학과", group: "AX_A", color: "#2563eb", url: "https://stat.hufs.ac.kr/" },

  // AX Majors (Group B)
  { id: "ELLT", name: "ELLT학과", group: "AX_B", color: "#ef4444", url: "https://ellt.hufs.ac.kr/ellt/m02_s01.do" },
  { id: "GBT", name: "Global Business & Technology", group: "AX_B", color: "#ca8a04", url: "https://gbt.hufs.ac.kr/" },
  { id: "MEDIA", name: "미디어커뮤니케이션학부", group: "AX_B", color: "#db2777", url: "https://commu.hufs.ac.kr/" },
  { id: "DC", name: "디지털콘텐츠학부", group: "AX_B", color: "#9333ea", url: "https://dicon.hufs.ac.kr/" },

  // AX Majors (Group C - newly added)
  { id: "MATH", name: "수학과", group: "AX_A", color: "#1d4ed8", url: "https://math.hufs.ac.kr/math/2981/subview.do" },
  { id: "PA", name: "행정학과", group: "AX_B", color: "#b45309", url: "https://hufspa.hufs.ac.kr/hufspa/4962/subview.do" },
  { id: "EE", name: "전자공학과", group: "AX_A", color: "#059669", url: "https://ee.hufs.ac.kr/ee/5093/subview.do" },
];


const tracks = [
  // CSE
  { id: "multimodal_ai", group_number: 1, dept: "CSE", title: "멀티모달 AI",
    description: "컴퓨터비전·NLP·생성AI를 결합한 멀티모달 AI 시스템 설계 전문가",
    required_similars: ["ai_intro", "prob_stat", "ds_intro", "ds", "ml", "dl", "cv", "nlp_intro", "lm_intro", "multimodal", "adv_dl", "linear_algebra", "discrete_math"],
    recommanded_grade: "컴퓨터공학", color: "#10b981" },
  { id: "medical_ai", group_number: 2, dept: "CSE", title: "의료 AI",
    description: "의료영상·유전체·임상 데이터 분석 및 AI 기반 진단·신약개발 전문가",
    required_similars: ["ai_intro", "prob_stat", "ds_intro", "ds", "ml", "dl", "cv", "dsp", "medical_data", "disease_pred", "linear_algebra", "calculus"],
    recommanded_grade: "컴퓨터공학", color: "#10b981" },
  // ICE
  { id: "ondevice_ai", group_number: 3, dept: "ICE", title: "온디바이스 AI",
    description: "엣지·임베디드 환경에서 경량 AI 모델을 설계·배포하는 온디바이스 AI 전문가",
    required_similars: ["ai_intro", "ds", "algo", "os", "db", "iot", "embedded", "cloud", "arch", "linear_algebra", "discrete_math", "calculus"],
    recommanded_grade: "정보통신공학", color: "#3b82f6" },
  { id: "comm_network_ai", group_number: 4, dept: "ICE", title: "통신·네트워크 AI",
    description: "차세대 이동통신·네트워크에 AI를 적용하는 무선·통신 AI 전문가",
    required_similars: ["ai_intro", "sig_sys", "info_theory", "dsp", "data_comm", "network", "ml", "ai_algo", "linear_algebra", "calculus", "prob_theory"],
    recommanded_grade: "정보통신공학", color: "#3b82f6" },
  // LAI
  { id: "multilingual_ai", group_number: 5, dept: "LAI", title: "다언어 AI",
    description: "다국어 NLP·기계번역·정보검색 분야 언어 AI 전문가",
    required_similars: ["ai_intro", "nlp_intro", "lm_intro", "practical_nlp", "ir_recsys", "mt", "advanced_llm", "ai_math", "lai_intro", "linear_algebra"],
    recommanded_grade: "Language & AI", color: "#f59e0b" },
  { id: "speech_ai", group_number: 6, dept: "LAI", title: "음성처리 AI",
    description: "음성인식·합성·자동통역 등 음성언어 AI 시스템 설계 전문가",
    required_similars: ["ai_intro", "speech_proc", "practical_speech", "adv_acoustic", "adv_ml", "asr_sys_design", "auto_interpre", "linear_algebra"],
    recommanded_grade: "Language & AI", color: "#f59e0b" },
  // AID
  { id: "physical_ai", group_number: 7, dept: "AID", title: "피지컬 AI",
    description: "로봇·컴퓨터비전·강화학습 기반 물리세계 AI 시스템 구축 전문가",
    required_similars: ["ai_intro", "ml", "dl", "rl", "cv", "robotics", "bigdata_model", "adv_dl", "linear_algebra", "calculus"],
    recommanded_grade: "AI데이터융합학", color: "#06b6d4" },
  { id: "data_science", group_number: 8, dept: "AID", title: "데이터사이언스",
    description: "대규모 데이터 마이닝·분석·시각화 및 도메인 의사결정 지원 전문가",
    required_similars: ["ai_intro", "ml", "bigdata", "stat_model", "dm", "unstruct_dm", "tsa_dm", "net_mining", "bigdata_model", "viz", "linear_algebra", "prob_theory"],
    recommanded_grade: "AI데이터융합학", color: "#06b6d4" },
  // FAI
  { id: "finance_ai", group_number: 9, dept: "FAI", title: "금융 AI",
    description: "딥러닝·LLM 기반 금융 서비스·리스크관리·추천 모델 설계 전문가",
    required_similars: ["ai_intro", "ml", "dl", "nlp_intro", "advanced_llm", "adv_dl", "dm", "fin_ds", "prompt_eng", "linear_algebra"],
    recommanded_grade: "Finance & AI", color: "#8b5cf6" },
  { id: "quant", group_number: 10, dept: "FAI", title: "Quant",
    description: "수리금융·계량분석·포트폴리오 최적화 기반 정량적 투자 전문가",
    required_similars: ["ai_intro", "prob_stat", "regression", "tsa_fin", "investment", "or1", "adv_tsa_fin", "convex", "portfolio", "linear_algebra", "calculus", "prob_theory"],
    recommanded_grade: "Finance & AI", color: "#8b5cf6" },
  // SSAI
  { id: "ai_public_policy", group_number: 11, dept: "SSAI", title: "AI 공공정책",
    description: "AI 거버넌스·공공정책 설계 및 사회혁신 문제 해결 전문가",
    required_similars: ["ai_intro", "ai_ethics", "social_method", "social_ds", "policy_ai", "ai_gov"],
    recommanded_grade: "Social Science & AI", color: "#ec4899" },
  { id: "social_data_science", group_number: 12, dept: "SSAI", title: "소셜데이터사이언스",
    description: "소셜미디어·여론·사회현상 데이터 분석 및 비즈니스 인사이트 도출 전문가",
    required_similars: ["ai_intro", "ml", "social_method", "social_ds", "media_data_lab", "biz_data_lab", "dm", "sna", "ai_gov"],
    recommanded_grade: "Social Science & AI", color: "#ec4899" }
];

// MD type 구분:
//   "context_non_ai" : 비AI전공 context MD (AX협력학과 과목 중심, 9학점)
//   "context_ai"     : AI전공 context MD (AI전공학과 과목 중심, 9학점)
//   "breadth"        : breadth MD (브릿지+전공 혼합 심화, 12학점)
const microDegrees = [
  // ─── 의료 AI 융합전공 (Medical AI) ─────────────────────────────
  {
    id: "medical_img_ai_basics",
    title: "의료영상AI 기초 MD",
    type: "context_non_ai",
    credits: 9,
    fusion: "medical_ai",
    dept: "BME",
    courses: ["ai_intro", "bio_ai", "med_img_proc"],
    desc: "의료영상 AI 입문 역량 인증 — 비전공자 context MD (9학점)"
  },
  {
    id: "medical_info_ai_basics",
    title: "의료정보학AI 기초 MD",
    type: "context_non_ai",
    credits: 9,
    fusion: "medical_ai",
    dept: "BME",
    courses: ["ai_intro", "dm", "bioinfo"],
    desc: "의료정보학 AI 입문 역량 인증 — 비전공자 context MD (9학점)"
  },
  {
    id: "medical_img_ai_advanced",
    title: "의료영상AI 심화 MD",
    type: "breadth",
    credits: 12,
    fusion: "medical_ai",
    dept: "BME",
    courses: ["bio_data_analysis", "med_img_ai_modeling", "dl", "cv"],
    desc: "의료영상 AI 심화 역량 인증 — breadth MD (12학점)"
  },
  {
    id: "medical_nlp_advanced",
    title: "의료자연어처리 심화 MD",
    type: "breadth",
    credits: 12,
    fusion: "medical_ai",
    dept: "BME",
    courses: ["bio_data_analysis", "nlp_bio", "med_text_llm_lab", "dl"],
    desc: "의료 자연어처리 심화 역량 인증 — breadth MD (12학점)"
  }
];

// 융합전공 정의 (AX융합 이중전공 42학점 기준)
// trackId : departmentTracks 내 해당 트랙의 id
// mds     : 위 microDegrees 의 id 배열 (context_non_ai × 1 + breadth × 1 = 최소 조합)
const fusionMajors = [
  {
    id: "medical_ai",
    title: "의료 AI 융합전공",
    credits: 42,
    trackId: "medical_ai",        // CSE departmentTracks.medical_ai (30학점)
    trackCredits: 30,
    axPartnerDept: "BME",
    mds: [
      "medical_img_ai_basics",    // 비AI전공 context MD 9학점 (택1)
      "medical_info_ai_basics",   // 비AI전공 context MD 9학점 (택1)
      "medical_img_ai_advanced",  // breadth MD 12학점 (택1)
      "medical_nlp_advanced"      // breadth MD 12학점 (택1)
    ],
    desc: "컴퓨터공학부(CSE) × 바이오메디컬공학부(BME) 의료 AI 융합이중전공"
  }
];

// ===================================
// Department-level Track System (12 tracks, 2 per dept)
// Source: II_2_1_학과별교육과정및트랙_2026양식
// ===================================
// Course category legend:
// bsm    = 기초/교양 (gray)
// req    = 전공필수 (yellow)
// common = 전공선택 공통 (green)
// track  = 전공선택 트랙별 특화 (dept accent color)
// cap    = 캡스톤/PBL (coral)
const departmentTracks = [
  {
    dept: "CSE", deptName: "컴퓨터공학", color: "#10b981",
    axPartners: ["바이오메디컬공학부", "전자공학과"],
    tracks: [
      {
        number: 1, name: "멀티모달 AI",
        description: "컴퓨터비전·자연어처리·생성AI를 결합한 멀티모달 AI 시스템 설계 전문가",
        courses: [
          { name: "AI공학개론", cat: "bsm" },       { name: "공업수학1", cat: "bsm" },
          { name: "확률과통계", cat: "bsm" },        { name: "공업수학2", cat: "bsm" },
          { name: "데이터사이언스기초", cat: "common" },{ name: "자료구조", cat: "req" },
          { name: "기계학습", cat: "track" },         { name: "딥러닝", cat: "track" },
          { name: "자연어처리개론", cat: "track" },   { name: "컴퓨터비전개론", cat: "track" },
          { name: "AI언어모델", cat: "track" },       { name: "AI기반컴퓨터비전", cat: "track" },
          { name: "그래프마이닝", cat: "track" },     { name: "멀티모달인공지능", cat: "track" },
          { name: "심층생성모델", cat: "track" },     { name: "캡스톤프로젝트(1,2학기)", cat: "cap" }
        ]
      },
      {
        number: 2, name: "의료 AI",
        description: "의료영상·유전체·임상 데이터 분석 및 AI 기반 진단·신약개발 전문가",
        courses: [
          { name: "확률과통계", cat: "bsm" },              { name: "공업수학1(or 기초미적분1)", cat: "bsm" },
          { name: "선형대수", cat: "bsm" },                { name: "공업수학2(or 기초미적분2)", cat: "bsm" },
          { name: "데이터사이언스기초", cat: "common" },    { name: "자료구조", cat: "req" },
          { name: "기계학습", cat: "track" },               { name: "의학유전학", cat: "track" },
          { name: "의생명정보학", cat: "track" },           { name: "디지털신호처리", cat: "track" },
          { name: "컴퓨터비전개론", cat: "track" },         { name: "딥러닝", cat: "track" },
          { name: "신약개발", cat: "track" },               { name: "의생명데이터분석및실습", cat: "track" },
          { name: "고급의료영상처리및실습", cat: "track" }, { name: "캡스톤프로젝트(1,2학기)", cat: "cap" }
        ]
      }
    ]
  },
  {
    dept: "ICE", deptName: "정보통신공학", color: "#3b82f6",
    axPartners: ["반도체공학과", "전자공학과"],
    tracks: [
      {
        number: 3, name: "온디바이스 AI",
        description: "엣지·임베디드 환경에서 경량 AI 모델을 설계·배포하는 온디바이스 AI 전문가",
        courses: [
          { name: "AI공학개론", cat: "bsm" },          { name: "AI 프로그래밍(Python)", cat: "req" },
          { name: "공업수학1", cat: "bsm" },            { name: "자료구조", cat: "req" },
          { name: "오픈소스소프트웨어", cat: "common" },{ name: "알고리즘 설계와 해석", cat: "common" },
          { name: "AI 컴퓨터 구조", cat: "track" },     { name: "엣지컴퓨팅시스템", cat: "track" },
          { name: "운영체제", cat: "track" },            { name: "데이터베이스", cat: "track" },
          { name: "클라우드 네이티브 컴퓨팅", cat: "track" },{ name: "경량 AI 모델 설계", cat: "track" },
          { name: "온디바이스 AI 시스템", cat: "track" },
          { name: "정보통신기초종합설계", cat: "cap" }, { name: "정보통신종합설계 및 실습", cat: "cap" }
        ]
      },
      {
        number: 4, name: "통신·네트워크 AI",
        description: "차세대 이동통신·네트워크에 AI를 적용하는 무선·통신 AI 전문가",
        courses: [
          { name: "AI공학개론", cat: "bsm" },       { name: "공업수학1", cat: "bsm" },
          { name: "확률과통계", cat: "bsm" },        { name: "선형대수", cat: "bsm" },
          { name: "신호 및 시스템", cat: "req" },     { name: "AI 정보이론", cat: "req" },
          { name: "이산신호처리", cat: "common" },    { name: "AI 최적화", cat: "common" },
          { name: "디지털 통신", cat: "track" },      { name: "데이터통신", cat: "track" },
          { name: "무선통신공학", cat: "track" },     { name: "컴퓨터 네트워크", cat: "track" },
          { name: "차세대 이동통신", cat: "track" },
          { name: "정보통신기초종합설계", cat: "cap" },{ name: "정보통신종합설계 및 실습", cat: "cap" }
        ]
      }
    ]
  },
  {
    dept: "LAI", deptName: "Language & AI", color: "#f59e0b",
    axPartners: ["ELLT학과", "국가전략언어대학", "아시아언어문화대학"],
    tracks: [
      {
        number: 5, name: "다언어 AI",
        description: "다국어 자연어처리·기계번역·정보검색 분야 언어 AI 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },         { name: "인공지능개론", cat: "bsm" },
          { name: "AI윤리와철학", cat: "bsm" },          { name: "컴퓨터프로그래밍", cat: "bsm" },
          { name: "언어학개론", cat: "req" },             { name: "자연어처리", cat: "req" },
          { name: "언어모델개론", cat: "common" },        { name: "정보검색및추천시스템", cat: "common" },
          { name: "실용자연어처리", cat: "track" },       { name: "언어모델특론", cat: "track" },
          { name: "기계번역특론", cat: "track" },         { name: "자연어처리시스템설계", cat: "track" },
          { name: "언어공학캡스톤디자인1", cat: "cap" }, { name: "언어공학캡스톤디자인2", cat: "cap" }
        ]
      },
      {
        number: 6, name: "음성처리 AI",
        description: "음성인식·합성·자동통역 등 음성언어 AI 시스템 설계 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },         { name: "인공지능개론", cat: "bsm" },
          { name: "AI윤리와철학", cat: "bsm" },          { name: "컴퓨터프로그래밍", cat: "bsm" },
          { name: "언어학개론", cat: "req" },             { name: "고급인공지능수학", cat: "req" },
          { name: "고급기계학습", cat: "common" },        { name: "실용음성처리", cat: "common" },
          { name: "음향모델특론", cat: "track" },         { name: "지능형인터페이스", cat: "track" },
          { name: "자동통역특론", cat: "track" },         { name: "음성처리시스템설계", cat: "track" },
          { name: "언어공학캡스톤디자인1", cat: "cap" }, { name: "언어공학캡스톤디자인2", cat: "cap" }
        ]
      }
    ]
  },
  {
    dept: "AID", deptName: "AI데이터융합학", color: "#06b6d4",
    axPartners: ["전자공학과", "산업경영공학과", "통계학과"],
    tracks: [
      {
        number: 7, name: "피지컬 AI",
        description: "로봇·컴퓨터비전·강화학습 기반 물리세계 AI 시스템 구축 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },   { name: "확률과통계", cat: "bsm" },
          { name: "인공지능개론", cat: "bsm" },   { name: "AI철학과윤리", cat: "bsm" },
          { name: "AI프로그래밍", cat: "req" },
          { name: "머신러닝", cat: "common" },     { name: "빅데이터모델링", cat: "common" },
          { name: "딥러닝기초", cat: "track" },    { name: "딥러닝고급", cat: "track" },
          { name: "강화학습", cat: "track" },      { name: "컴퓨터비전", cat: "track" },
          { name: "로보틱스", cat: "track" },      { name: "영상처리", cat: "track" },
          { name: "AI데이터융합논문", cat: "cap" },{ name: "AI데이터종합설계", cat: "cap" }
        ]
      },
      {
        number: 8, name: "데이터사이언스",
        description: "대규모 데이터 마이닝·분석·시각화 및 도메인 의사결정 지원 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },     { name: "확률과통계", cat: "bsm" },
          { name: "인공지능개론", cat: "bsm" },     { name: "AI철학과윤리", cat: "bsm" },
          { name: "빅데이터분석기초", cat: "req" },
          { name: "머신러닝", cat: "common" },       { name: "빅데이터모델링", cat: "common" },
          { name: "통계모델링", cat: "track" },      { name: "빅데이터시각화", cat: "track" },
          { name: "빅데이터마이닝", cat: "track" },  { name: "비정형데이터마이닝", cat: "track" },
          { name: "네트워크데이터마이닝", cat: "track" },{ name: "시계열데이터마이닝", cat: "track" },
          { name: "AI데이터융합논문", cat: "cap" },  { name: "AI데이터종합설계", cat: "cap" }
        ]
      }
    ]
  },
  {
    dept: "FAI", deptName: "Finance & AI", color: "#8b5cf6",
    axPartners: ["통계학과", "수학과", "Global Business & Technology"],
    tracks: [
      {
        number: 9, name: "금융 AI",
        description: "딥러닝·LLM 기반 금융 서비스·리스크관리·추천 모델 설계 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },     { name: "확률과통계", cat: "bsm" },
          { name: "인공지능개론", cat: "bsm" },     { name: "AI윤리및철학", cat: "bsm" },
          { name: "고급인공지능수학", cat: "req" },
          { name: "중급파이썬프로그래밍", cat: "common" },{ name: "빅데이터분석", cat: "common" },
          { name: "머신러닝실습", cat: "track" },   { name: "자연어처리", cat: "track" },
          { name: "데이터마이닝", cat: "track" },   { name: "프롬프트엔지니어링", cat: "track" },
          { name: "딥러닝이론및응용", cat: "track" },{ name: "금융데이터사이언스", cat: "track" },
          { name: "거대언어모델", cat: "track" },   { name: "고급딥러닝모델", cat: "track" },
          { name: "Finance&AI 캡스톤디자인", cat: "cap" }
        ]
      },
      {
        number: 10, name: "Quant",
        description: "수리금융·계량분석·포트폴리오 최적화 기반 정량적 투자 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },   { name: "확률과통계", cat: "bsm" },
          { name: "인공지능개론", cat: "bsm" },   { name: "AI윤리및철학", cat: "bsm" },
          { name: "미적분학", cat: "bsm" },
          { name: "이산수학", cat: "req" },        { name: "선형대수", cat: "req" },
          { name: "금융시계열분석", cat: "common" },{ name: "금융회귀분석", cat: "common" },
          { name: "투자론", cat: "track" },         { name: "OR기초", cat: "track" },
          { name: "수리금융이론", cat: "track" },   { name: "고급금융시계열분석", cat: "track" },
          { name: "포트폴리오최적화", cat: "track" },{ name: "컨벡스최적화", cat: "track" },
          { name: "Finance&AI 캡스톤디자인", cat: "cap" }
        ]
      }
    ]
  },
  {
    dept: "SSAI", deptName: "Social Science & AI", color: "#ec4899",
    axPartners: ["행정학과", "미디어커뮤니케이션학부"],
    tracks: [
      {
        number: 11, name: "AI 공공정책",
        description: "AI 거버넌스·공공정책 설계 및 사회혁신 문제 해결 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },              { name: "확률과통계", cat: "bsm" },
          { name: "인공지능개론", cat: "bsm" },              { name: "AI윤리와철학", cat: "bsm" },
          { name: "사회과학기반디자인씽킹BM", cat: "req" },  { name: "사회과학과데이터사이언스", cat: "req" },
          { name: "사회이해기반제품과글로벌비즈", cat: "common" },{ name: "산업데이터시각화", cat: "common" },
          { name: "기술개발연구의이해", cat: "track" },       { name: "사회과학연구방법론", cat: "track" },
          { name: "사회비즈니스에널리틱스", cat: "track" },   { name: "멀티모달생산성AI활용", cat: "track" },
          { name: "융합사회과학데이터활용연구", cat: "track" },{ name: "기술적글쓰기", cat: "cap" }
        ]
      },
      {
        number: 12, name: "소셜데이터사이언스",
        description: "소셜미디어·여론·사회현상 데이터 분석 및 비즈니스 인사이트 도출 전문가",
        courses: [
          { name: "인공지능수학", cat: "bsm" },            { name: "확률과통계", cat: "bsm" },
          { name: "인공지능개론", cat: "bsm" },            { name: "AI윤리와철학", cat: "bsm" },
          { name: "사회과학연구방법론", cat: "req" },       { name: "기계학습", cat: "req" },
          { name: "사회과학과데이터사이언스", cat: "common" },{ name: "산업데이터시각화", cat: "common" },
          { name: "미디어데이터분석실습", cat: "track" },   { name: "비즈니스데이터분석", cat: "track" },
          { name: "사회과학데이터분석실습", cat: "track" }, { name: "사회비즈니스에널리틱스", cat: "track" },
          { name: "융합사회과학데이터활용연구", cat: "track" },{ name: "Product구현의실무", cat: "cap" }
        ]
      }
    ]
  }
];

// PBL 교과목 데이터 (트랙번호 → PBL 정보)
// Source: HUFS_12트랙_PBL교과목_설계_v3.1(수정).docx
const pblData = {
  1: {
    courseName: "멀티모달 AI 시스템 개발 프로젝트",
    companies: ["업스테이지(Upstage)", "네이버클라우드"],
    objective: "텍스트·이미지·문서 등 다양한 모달리티를 통합 처리하는 AI 시스템을 설계·구현하고, 멀티모달 AI 모델 개발의 실무 역량을 체득한다.",
    content: "업스테이지의 Document Parse API와 Solar LLM을 활용하여 문서 이해와 시각-언어 통합 추론 과제를 수행한다. 팀별로 멀티모달 RAG 구축, 이미지-텍스트 크로스모달 검색 등의 프로젝트를 8주간 진행하며, 네이버클라우드 HyperCLOVA X의 비전-언어 기능을 활용한 서비스 프로토타이핑도 포함한다."
  },
  2: {
    courseName: "AI 기반 의료영상 분석 프로젝트",
    companies: ["딥노이드", "지이헬스케어코리아"],
    objective: "의료영상 데이터에 딥러닝 기법을 적용하여 질환 탐지·분류·판독 보조 모델을 개발하고, 임상 적용 가능 수준의 프로토타입을 구현하여 의료 AI 전문가 역량을 확보한다.",
    content: "딥노이드의 M4CXR(ViT+LLM 결합 흉부 X-ray 판독) 기술을 벤치마크하여 의료영상 분류·탐지 모델을 구축한다. 팀별로 흉부 X-ray 이상 소견 탐지, CT 영상 분할 과제를 수행하며, 지이헬스케어코리아의 AIR Recon DL 기술을 활용한 영상 재구성과 FDA AI 의료기기 승인 프로세스 분석으로 임상 품질 기준을 학습한다."
  },
  3: {
    courseName: "온디바이스 AI 경량 추론 시스템 개발",
    companies: ["노타AI", "에어로로보틱스이노베이션"],
    objective: "엣지 디바이스에서 실시간 추론이 가능한 경량 AI 모델을 설계·최적화·배포하고, 드론·IoT 등 실제 하드웨어 위에서의 온디바이스 AI 시스템 구현 역량을 확보한다.",
    content: "노타AI의 경량화 프레임워크로 대규모 AI 모델의 양자화·프루닝·지식증류를 수행하고 엣지 디바이스 추론 성능을 벤치마크한다. 에어로로보틱스이노베이션의 AI 드론 플랫폼 위에서 실시간 객체 인식·추적 과제를 수행하며, 온보드 컴퓨팅 환경에서의 모델 최적화를 실습한다."
  },
  4: {
    courseName: "AI 기반 네트워크 최적화 및 보안 프로젝트",
    companies: ["네이버클라우드", "리서치랩"],
    objective: "AI 기법을 활용한 네트워크 트래픽 분석·최적화·보안 시스템을 설계·구현하고, 클라우드 인프라 환경에서의 AI 네트워크 운영 및 사이버보안 역량을 함양한다.",
    content: "네이버클라우드 인프라에서 트래픽 이상 탐지·예측·QoS 최적화 AI 모델을 구축하고, 클라우드 네트워크 자동 스케일링에 AI를 적용한다. 리서치랩의 사이버보안 분석 도구를 활용하여 NIDS, 악성 트래픽 분류, DDoS 탐지 등의 보안 AI 과제를 수행한다."
  },
  5: {
    courseName: "다국어 LLM 응용 서비스 개발",
    companies: ["네이버클라우드", "마음AI"],
    objective: "HUFS의 45개 언어 자원을 활용하여 다국어 LLM 기반 서비스를 기획·개발하고, LLM API와 언어 데이터를 결합한 프로토타입을 구현함으로써 다언어 AI 전문가로서의 차별화된 역량을 갖춘다.",
    content: "네이버클라우드 HyperCLOVA X의 다국어 기능으로 소수언어 번역·요약·QA 시스템을 개발하고, 팀별 다국어 RAG 시스템 구축 및 문화 맥락 반영 챗봇을 구현한다. 마음AI의 다국어 TTS·STT 기술을 연동하여 음성 기반 다국어 인터페이스 프로토타입을 구현하며, 각 팀은 최소 2개 언어 이상을 다루는 서비스를 구현한다."
  },
  6: {
    courseName: "AI 음성처리 및 더빙 콘텐츠 생성 프로젝트",
    companies: ["이스트소프트", "마음AI"],
    objective: "음성 인식·합성·AI 더빙 기술과 생성형 AI를 결합한 음성 콘텐츠 서비스를 개발하고, 기업의 실제 기술 스택 위에서 사용자 경험까지 고려한 프로토타입을 구현한다.",
    content: "이스트소프트의 AI 더빙 기술과 마음AI의 STT/TTS 엔진을 결합하여 다국어 영상 더빙·자막 생성·AI 아나운서 서비스를 팀별로 개발한다. 마음AI는 WoRV 조직을 필두로 로봇AI·피지컬AI에 본격 피벗 중이며, 음성 인터페이스는 embodied AI의 핵심 기술로 주목받고 있어 이 과제는 피지컬 AI 트랙(T7)과의 연계도 자연스럽게 모색한다. 이스트소프트 멘토가 영상+음성 융합 파이프라인을, 마음AI 멘토가 다국어 TTS 커스터마이징과 로봇AI 응용 관점을 지도한다."
  },
  7: {
    courseName: "피지컬 AI 융합 시스템 개발",
    companies: ["이스트소프트", "라이드플럭스"],
    objective: "센서 데이터 수집부터 로봇·자율주행 제어까지 피지컬 AI 전체 스택을 팀 단위로 구현하고, 기업 현장의 로봇·모빌리티 과제를 해결함으로써 물리 세계와 AI를 연결하는 실무 역량을 확보한다.",
    content: "이스트소프트의 AI 휴머노이드 커리큘럼(ROS 기반 모바일 매니퓰레이터)을 기반으로 물류·서비스 로봇의 자율주행·물체 인식·매니퓰레이션 과제를 수행한다. 라이드플럭스의 레벨4 자율주행 풀스택 SW를 시뮬레이션 환경에서 실습하며 SLAM·End-to-End AI 기반 제어를 통합 구현한다."
  },
  8: {
    courseName: "대규모 데이터 분석 및 AI 파이프라인 구축",
    companies: ["AWS 코리아", "쿠팡"],
    objective: "클라우드 기반 빅데이터 인프라 위에서 대용량 데이터의 수집·정제·분석·시각화 전 과정을 수행하고, 기업 실데이터를 활용한 AI 분석 파이프라인 구축 역량을 체득한다.",
    content: "AWS의 빅데이터 서비스(S3·EMR·SageMaker·Glue)를 활용하여 대규모 데이터 분석 파이프라인을 구축한다. 쿠팡의 익명화된 이커머스 데이터로 데이터 레이크 설계→ETL→ML 모델링→대시보드 구현의 전 과정을 수행하며, 추천 시스템·물류 수요 예측·사용자 행동 분석 등 실무 과제를 다룬다."
  },
  9: {
    courseName: "AI 기반 금융 리스크 분석 프로젝트",
    companies: ["이스트소프트", "일루텍"],
    objective: "금융 시계열 데이터에 AI 기법을 적용하여 리스크 평가·신용평가·시장 예측 모델을 개발하고, 금융 도메인 특화 AI 솔루션의 기획부터 백테스팅까지 수행하는 실무 역량을 함양한다.",
    content: "이스트소프트의 AI 금융 커리큘럼(딥러닝 기반 시계열 예측, 금융 특화 LLM)을 기반으로 신용평가 모델 구축, LSTM/Transformer 기반 주가 예측, 금융 RAG 챗봇 등을 수행한다. 일루텍의 금융 AI AutoML 솔루션 'ABACUS'로 금융 예측 모델링 자동화 파이프라인을 구축하고 실무 AutoML 워크플로우를 체험한다."
  },
  10: {
    courseName: "AI 퀀트 전략 개발 및 서비스 프로토타이핑",
    companies: ["업스테이지(Upstage)", "일루텍"],
    objective: "AI 기반 퀀트 전략을 설계·백테스트·프로토타이핑하고, 금융 문서 자동 분석과 알고리즘 트레이딩 시스템을 구현하여 AI 퀀트 전문가 역량을 축적한다.",
    content: "업스테이지의 Document Parse API를 활용하여 금융 보고서·공시 자동 분석 시스템을 구축하고, Solar LLM 기반으로 시장 뉴스에서 투자 시그널을 추출하는 NLP 파이프라인을 설계한다. 일루텍의 빅데이터 플랫폼 위에서 강화학습 기반 자동 매매 에이전트 또는 팩터 기반 포트폴리오 최적화 모델을 구현한다."
  },
  11: {
    courseName: "AI 규제·윤리 정책 분석 프로젝트",
    companies: ["LG CNS", "네이버클라우드"],
    objective: "글로벌 AI 규제 동향과 국내 AI 정책을 비교 분석하고, 기업의 AI 윤리 가이드라인 수립 및 AI 영향평가 프레임워크를 설계함으로써 AI 거버넌스 전문가로서의 역량을 갖춘다.",
    content: "LG CNS의 기업 AI 도입 사례(스마트팩토리·스마트시티)를 바탕으로 AI 윤리 영향평가를 수행하고, 네이버클라우드의 소버린 AI 정책(데이터 주권·AI 안전성)에 대한 분석 리포트를 작성한다. EU AI Act, 한국 AI 기본법 등 글로벌 규제를 비교 분석하여 특정 산업 분야에 대한 AI 규제 적용 가이드라인을 팀별로 설계한다."
  },
  12: {
    courseName: "AI 기반 사회데이터 분석 및 공공서비스 혁신 프로젝트",
    companies: ["LG CNS", "쿠팡"],
    objective: "공공 데이터와 사회 데이터에 AI·데이터사이언스 기법을 적용하여 사회 현상을 분석하고, 데이터 기반 정책 제안 및 공공서비스 프로토타입을 개발하는 역량을 함양한다.",
    content: "공공데이터포털 개방 데이터와 소셜미디어 데이터를 활용해 여론 분석·인구 이동·민원 텍스트 마이닝 등 사회 현상 분석을 수행한다. LG CNS의 스마트시티 분석 경험을 바탕으로 도시 문제 해결형 AI 서비스를 개발하고, 쿠팡의 A/B 테스트·인과추론 방법론을 사회 데이터 분석에 적용하여 정책 효과를 분석한다."
  }
};

// 협력기업 프로필 (공개 정보 기반)
const companyProfiles = {
  "업스테이지(Upstage)":     "Document AI·Solar LLM 전문 AI 스타트업",
  "네이버클라우드":           "HyperCLOVA X 기반 AI·클라우드·소버린 AI 서비스",
  "딥노이드":                "의료영상 AI 진단 전문기업 (M4CXR)",
  "지이헬스케어코리아":       "글로벌 의료기기·AI 영상재구성(AIR Recon DL) 기술",
  "노타AI":                  "AI 모델 경량화·최적화(양자화·프루닝·지식증류) 전문기업",
  "에어로로보틱스이노베이션":  "AI 드론·자율비행 플랫폼",
  "리서치랩":                "사이버보안·네트워크 AI 연구기관",
  "마음AI":                  "TTS·STT 음성AI 기업 — WoRV 조직 주도로 로봇AI·피지컬AI에 본격 피벗 중",
  "이스트소프트":             "AI 더빙·휴머노이드 로봇·금융AI 솔루션 전문기업",
  "라이드플럭스":             "레벨4 자율주행 풀스택 SW 전문기업",
  "AWS 코리아":              "클라우드 빅데이터·ML 인프라(S3·EMR·SageMaker)",
  "쿠팡":                    "이커머스 대규모 데이터·추천시스템 실무 과제 제공",
  "일루텍":                  "금융 AI AutoML 솔루션 'ABACUS' 개발사",
  "LG CNS":                 "스마트팩토리·스마트시티 기업 AI 도입 사례 보유"
};

// Faculty Data (참여 교수진)
// Source: 교수진 현황.xlsx (2026-01-AI중심대학) + 각 학과 홈페이지 (공개 정보)
const facultyData = [
  // ── 정보통신공학과 (ICE) ─────────────────────────────────────────
  { name: "김세화", dept: "ICE", position: "교수",   major: "전기컴퓨터공학",   keywords: ["임베디드 SW", "실시간 운영체제", "심층 강화학습"] },
  { name: "손경락", dept: "ICE", position: "조교수", major: "전기및전자공학",   keywords: ["무선통신", "정보/부호이론"] },
  { name: "한희일", dept: "ICE", position: "교수",   major: "전기및컴퓨터공학", keywords: ["이미지 처리", "컴퓨터 비전", "멀티미디어"] },
  { name: "정성호", dept: "ICE", position: "교수",   major: "전기및컴퓨터공학", keywords: ["차세대 이동통신", "AI", "네트워크 보안"] },
  { name: "박상원", dept: "ICE", position: "교수",   major: "컴퓨터공학",       keywords: ["데이터베이스", "플래시메모리", "웹 서비스"] },
  { name: "전홍배", dept: "ICE", position: "교수",   major: "글로벌융합공학",   keywords: ["무선통신", "신호처리"] },

  // ── 컴퓨터공학부 (CSE) ────────────────────────────────────────────
  { name: "김승욱", dept: "CSE", position: "조교수", major: "소프트웨어학",      keywords: ["컴퓨터그래픽스"] },
  { name: "박천준", dept: "CSE", position: "조교수", major: "전기전자공학",      keywords: ["AI 경량화"] },
  { name: "신찬수", dept: "CSE", position: "교수",   major: "전산학",            keywords: ["알고리즘", "프로그래밍 교육"] },
  { name: "임승호", dept: "CSE", position: "교수",   major: "전기및전자공학",    keywords: ["임베디드 시스템", "온디바이스 AI"] },
  { name: "장익범", dept: "CSE", position: "조교수", major: "전기및컴퓨터공학",  keywords: ["딥러닝", "의료영상분석", "생성형AI"] },
  { name: "지수연", dept: "CSE", position: "조교수", major: "전기정보공학",      keywords: ["의료인공지능"] },
  { name: "전병환", dept: "CSE", position: "조교수", major: "의과학",            keywords: ["딥러닝", "의료 AI", "의료영상 분석"] },
  { name: "이재혁", dept: "CSE", position: "교수",   major: "전기및전자공학",    keywords: ["로봇 제어시스템"] },
  { name: "윤일동", dept: "CSE", position: "교수",   major: "제어계측공학",      keywords: ["영상처리"] },
  { name: "정유진", dept: "CSE", position: "교수",   major: "컴퓨터공학",        keywords: ["알고리즘"] },
  { name: "최재영", dept: "CSE", position: "교수",   major: "전기및전자공학",    keywords: ["머신러닝"] },
  { name: "이준현", dept: "CSE", position: "조교수", major: "컴퓨터과학",        keywords: ["그래프 AI", "딥러닝"] },
  { name: "곽호진", dept: "CSE", position: "조교수", major: "",                  keywords: ["영상처리", "음향처리", "비전공자 SW교육"] },

  // ── Language & AI (LAI) ────────────────────────────────────────────
  { name: "장태엽", dept: "LAI", position: "교수",   major: "언어학",        keywords: ["음성처리·음성공학", "기계번역", "음성 자동평가", "다국어 AI"], role: "AI융합대학장" },
  { name: "이재홍", dept: "LAI", position: "조교수", major: "융합전자",      keywords: ["통계 머신러닝", "음성/오디오 AI"] },
  { name: "박준형", dept: "LAI", position: "조교수", major: "소프트웨어",    keywords: ["자연어처리(NLP)", "언어모델"] },
  { name: "김예찬", dept: "LAI", position: "조교수", major: "인공지능학",    keywords: ["자연어처리", "음성·언어 AI"] },
  { name: "최승택", dept: "LAI", position: "조교수", major: "컴퓨터과학",    keywords: ["생성형 AI", "멀티모달 AI", "AI 평가"] },
  { name: "김주애", dept: "LAI", position: "조교수", major: "컴퓨터공학",    keywords: ["자연어처리", "AI 교육"], deptNote: "LAI·ELLT 겸임" },
  { name: "류형곤", dept: "LAI", position: "조교수", major: "전기및전자공학", keywords: ["컴퓨터비전", "멀티모달"] },
  // { name: "김지은", dept: "LAI", position: "교수",   major: "전산언어학",    keywords: ["전산언어학", "언어·AI", "언어정보처리"], deptNote: "LAI·ELLT 겸임" },

  // ── AI 데이터융합학부 (AID) ────────────────────────────────────────
  { name: "장혜진", dept: "AID", position: "조교수", major: "산업시스템공학", keywords: ["데이터마이닝"] },
  { name: "최재걸", dept: "AID", position: "조교수", major: "지능정보융합",   keywords: ["검색엔진 AI", "자연어 검색"] },
  { name: "장원제", dept: "AID", position: "조교수", major: "전기전자공학",   keywords: ["자율주행시스템", "AI"] },
  { name: "박성민", dept: "AID", position: "조교수", major: "인공지능학",     keywords: ["추천시스템", "AI"] },

  // ── Finance & AI (FAI) ─────────────────────────────────────────────
  { name: "공형우", dept: "FAI", position: "조교수", major: "산업및시스템공학", keywords: ["Finance 데이터 AI 응용"] },
  { name: "안시현", dept: "FAI", position: "조교수", major: "산업공학",         keywords: ["AI기반 부동산 가격추정", "핀테크"] },
  { name: "조소윤", dept: "FAI", position: "조교수", major: "수학",             keywords: ["XAI", "생성 모형 금융 활용"] },

  // ── Social Science & AI (SSAI) ─────────────────────────────────────
  { name: "홍승혁", dept: "SSAI", position: "조교수", major: "바이오엔지니어링", keywords: ["Physical AI", "거대언어모델(LLM)"] },
  { name: "이동현", dept: "SSAI", position: "부교수", major: "기술경영",          keywords: ["AI 기술정책", "환경 빅데이터", "기술경영"] },
  { name: "안서영", dept: "SSAI", position: "조교수", major: "심리학",            keywords: ["뇌인지 기반 AI"], deptNote: "SSAI·미디어 겸임" },
  { name: "차민철", dept: "SSAI", position: "조교수", major: "산업공학",          keywords: ["인간-AI 상호작용"], deptNote: "SSAI·미디어 겸임" },
];

// Assign to window
window.departments = departments;
window.tracks = tracks;
window.microDegrees = microDegrees;
window.fusionMajors = fusionMajors;
window.departmentTracks = departmentTracks;
window.facultyData = facultyData;
window.pblData = pblData;
window.companyProfiles = companyProfiles;
