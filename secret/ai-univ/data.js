const departments = [
  { id: "ICE", name: "정보통신공학과", color: "#3b82f6", url: "https://ice.hufs.ac.kr/ice/998/subview.do" }, 
  { id: "CSE", name: "컴퓨터공학과", color: "#10b981", url: "https://computer.hufs.ac.kr/computer/10048/subview.do" },
  { id: "LAI", name: "Language & AI", color: "#f59e0b", url: "https://langai.hufs.ac.kr/langai/10805/subview.do" }, 
  { id: "SSAI", name: "Social Science & AI", color: "#ec4899", url: "https://ssai.hufs.ac.kr/ssai/10867/subview.do" }, 
  { id: "FAI", name: "Finance & AI", color: "#8b5cf6", url: "https://aifinance.hufs.ac.kr/aifinance/m03_s01.do" }, 
  { id: "AID", name: "AI 데이터융합", color: "#06b6d4", url: "https://aidata.hufs.ac.kr/aidata/16994/subview.do" }, 
  { id: "ELLT", name: "ELLT학과", color: "#ef4444", url: "https://ellt.hufs.ac.kr/ellt/m02_s01.do" }, 
  { id: "IME", name: "산업경영공학과", color: "#f97316", url: "https://ime.hufs.ac.kr/ime/2828/subview.do" }, 
];

const courseData = [
  // ===================================
  // 1. ICE (Information & Communication Engineering)
  // ===================================
  { dept: "ICE", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "ICE", grade: 1, semester: 1, name: "이산수학", category: "Major_Sel", credit: 3, similar_id: "discrete_math", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 1, name: "컴퓨터프로그래밍", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 1, name: "컴퓨팅사고", category: "Major_Req", credit: 3, similar_id: "comp_thinking", layer: "L1", layer_tag: "literacy" },
  { dept: "ICE", grade: 1, semester: 2, name: "컴퓨터프로그래밍및실습", category: "Major_Sel", credit: 3, similar_id: "prog_lab", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "논리회로및실험", category: "Major_Sel", credit: 3, similar_id: "logic_circuits", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "선형대수", category: "Major_Sel", credit: 3, similar_id: "linear_alg", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "오픈소스소프트웨어", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "AI정보이론", category: "Major_Sel", credit: 3, similar_id: "info_theory", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "eng_math2", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "알고리즘설계와해석", category: "Major_Sel", credit: 3, similar_id: "algo", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "컴퓨터구조", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "신호및시스템", category: "Major_Req", credit: 3, similar_id: "sig_sys", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "머신러닝", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "데이터통신", category: "Major_Req", credit: 3, similar_id: "data_comm", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "IoT시스템", category: "Major_Sel", credit: 3, similar_id: "iot", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "컴퓨터네트워크", category: "Major_Req", credit: 3, similar_id: "network", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "AI알고리즘", category: "Major_Sel", credit: 3, similar_id: "ai_algo", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "이산신호처리", category: "Major_Sel", credit: 3, similar_id: "dsp", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "정보통신종합설계및실습", category: "Capstone", credit: 3, similar_id: "capstone_ice", layer: "L4", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "네트워크보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L4", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 2, name: "소프트웨어공학", category: "Major_Sel", credit: 3, similar_id: "se", layer: "L4", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 2, name: "데이터사이언스", category: "Major_Sel", credit: 3, similar_id: "ds_app", layer: "L4", layer_tag: "core" },

  // ===================================
  // 2. CSE (Computer Science & Engineering)
  // ===================================
  { dept: "CSE", grade: 1, semester: 1, name: "이산수학", category: "Major_Sel", credit: 3, similar_id: "discrete_math", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "CSE", grade: 1, semester: 2, name: "컴퓨터프로그래밍실습", category: "BSM", credit: 3, similar_id: "prog_lab", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "컴퓨터시스템입문", category: "Major_Sel", credit: 3, similar_id: "sys_intro", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "선형대수", category: "Major_Sel", credit: 3, similar_id: "linear_alg", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "eng_math2", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "데이터사이언스기초", category: "Major_Sel", credit: 3, similar_id: "ds_intro", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "오픈소스및SW실습", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "논리회로", category: "Major_Sel", credit: 3, similar_id: "logic_circuits", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "프로그래밍언어론", category: "Major_Sel", credit: 3, similar_id: "pl", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "기계학습", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "디지털신호처리", category: "Major_Sel", credit: 3, similar_id: "dsp", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "알고리즘", category: "Major_Req", credit: 3, similar_id: "algo", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "웹프로그래밍", category: "Major_Sel", credit: 3, similar_id: "web", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터비전개론", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "빅데이터처리", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "시스템프로그래밍", category: "Major_Sel", credit: 3, similar_id: "sys_prog", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터구조", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터네트워크", category: "Major_Sel", credit: 3, similar_id: "network", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "소프트웨어공학", category: "Major_Sel", credit: 3, similar_id: "se", layer: "L4", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "컴파일러구성론", category: "Major_Sel", credit: 3, similar_id: "compiler", layer: "L4", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "캡스톤설계및실습", category: "Capstone", credit: 3, similar_id: "capstone_cse", layer: "L4", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "IoT시스템", category: "Major_Sel", credit: 3, similar_id: "iot", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "데이터베이스설계", category: "Major_Sel", credit: 3, similar_id: "db_design", layer: "L4", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "클라우드컴퓨팅", category: "Major_Sel", credit: 3, similar_id: "cloud", layer: "L4", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "컴퓨터보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L4", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "인간컴퓨터상호작용", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "인공지능특강", category: "Major_Sel", credit: 3, similar_id: "ai_topics", layer: "L4", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "강화학습기초", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L4", layer_tag: "core" },

  // ===================================
  // 3. LAI
  // ===================================
  { dept: "LAI", grade: 1, semester: 1, name: "컴퓨터프로그래밍기초", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "Language&AI수학", category: "Major_Req", credit: 3, similar_id: "lai_math", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "인공지능수학", category: "BSM", credit: 3, similar_id: "ai_math", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "LAI", grade: 1, semester: 2, name: "Language&AI개론", category: "Major_Req", credit: 3, similar_id: "lai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "LAI", grade: 1, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 1, name: "언어학개론", category: "Major_Req", credit: 3, similar_id: "ling_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "LAI", grade: 2, semester: 1, name: "언어처리를위한자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 1, name: "언어분석을위한데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 1, name: "고급인공지능수학", category: "Major_Req", credit: 3, similar_id: "adv_ai_math", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "자연어처리", category: "Major_Req", credit: 3, similar_id: "nlp_intro", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "음성신호처리", category: "Major_Req", credit: 3, similar_id: "speech_proc", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "언어처리를위한알고리즘", category: "Major_Sel", credit: 3, similar_id: "algo", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "기계학습의이해", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "멀티모달개론", category: "Major_Sel", credit: 3, similar_id: "multimodal", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "컴퓨터구조및설계", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "언어모델개론", category: "Major_Sel", credit: 3, similar_id: "lm_intro", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "정보검색및추천시스템", category: "Major_Sel", credit: 3, similar_id: "ir_recsys", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "딥러닝", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "실용자연어처리", category: "Major_Sel", credit: 3, similar_id: "practical_nlp", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "실용음성처리", category: "Major_Sel", credit: 3, similar_id: "practical_speech", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "오픈소스프로그래밍", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "기계학습이론", category: "Major_Sel", credit: 3, similar_id: "ml_theory", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "언어모델특론", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L4", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "음향모델특론", category: "Major_Sel", credit: 3, similar_id: "adv_acoustic", layer: "L4", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "지능형인터페이스", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "인공지능응용", category: "Major_Sel", credit: 3, similar_id: "ai_app", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "고급기계학습", category: "Major_Sel", credit: 3, similar_id: "adv_ml", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "언어공학캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_lai", layer: "L4", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "자연어처리시스템설계", category: "Major_Sel", credit: 3, similar_id: "nlp_sys_design", layer: "L4", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "음성인식시스템설계", category: "Major_Sel", credit: 3, similar_id: "asr_sys_design", layer: "L4", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "기계번역특론(다국어AI)", category: "Major_Sel", credit: 3, similar_id: "mt", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "자동통역특론(다국어AI)", category: "Major_Sel", credit: 3, similar_id: "auto_interpre", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "AI튜터링시스템", category: "Major_Sel", credit: 3, similar_id: "ai_tutor", suggested: true, layer: "L3", layer_tag: "core" },

  // ===================================
  // 4. SSAI
  // ===================================
  { dept: "SSAI", grade: 1, semester: 1, name: "인공지능기초수학", category: "Major_Req", credit: 3, similar_id: "ai_math", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 1, name: "기초프로그래밍(컴퓨팅사고)", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 1, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "SSAI", grade: 1, semester: 2, name: "소셜데이터프로그래밍기초1", category: "Major_Req", credit: 3, similar_id: "social_prog", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 2, name: "AI윤리", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L1", layer_tag: "literacy" },
  { dept: "SSAI", grade: 1, semester: 2, name: "사회과학과 데이터사이언스", category: "Major_Req", credit: 3, similar_id: "social_ds", layer: "L1", layer_tag: "literacy" },
  { dept: "SSAI", grade: 2, semester: 1, name: "사회과학연구방법론1", category: "Major_Req", credit: 3, similar_id: "social_method", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "기계학습", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "객체지향형프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "텍스트기반사회과학데이터분석1", category: "Major_Sel", credit: 3, similar_id: "text_social", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회과학데이터의자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "알고리즘", category: "Major_Req", credit: 3, similar_id: "algo", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회연결망데이터분석", category: "Major_Sel", credit: 3, similar_id: "sna", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회과학과빅데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "딥러닝및응용", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "인간인공지능상호작용", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "시계열분석", category: "Major_Sel", credit: 3, similar_id: "tsa", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "캡스톤디자인1", category: "Capstone", credit: 3, similar_id: "capstone_ssai1", layer: "L4", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "빅데이터와공간지각", category: "Major_Sel", credit: 3, similar_id: "spatial", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "빅데이터와지역연구", category: "Major_Sel", credit: 3, similar_id: "regional_bigdata", layer: "L3", layer_tag: "core" }, 
  { dept: "SSAI", grade: 3, semester: 2, name: "패턴인식", category: "Major_Sel", credit: 3, similar_id: "pattern_rec", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "관계형데이터분석", category: "Major_Sel", credit: 3, similar_id: "rel_data", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "미디어데이터분석실습", category: "Major_Sel", credit: 3, similar_id: "media_data_lab", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "비즈니스데이터분석실습", category: "Major_Sel", credit: 3, similar_id: "biz_data_lab", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "AI를활용한정책분석", category: "Major_Sel", credit: 3, similar_id: "policy_ai", layer: "L4", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "사회과학을위한GIS", category: "Major_Sel", credit: 3, similar_id: "gis", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "데이터사이언스캡스톤디자인2", category: "Capstone", credit: 3, similar_id: "capstone_ssai2", layer: "L4", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "데이터보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L4", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "인공지능기반메타버스콘텐츠제작", category: "Major_Sel", credit: 3, similar_id: "metaverse", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "헬스애널리틱스실습", category: "Major_Sel", credit: 3, similar_id: "health_analytics", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "지역학데이터활용및분석", category: "Major_Sel", credit: 3, similar_id: "regional_data_analysis", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "비디오생성모델", category: "Major_Sel", credit: 3, similar_id: "video_gen", suggested: true, layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "문화특화언어모델", category: "Major_Sel", credit: 3, similar_id: "culture_llm", suggested: true, layer: "L3", layer_tag: "core" },

  // ===================================
  // 5. FAI
  // ===================================
  { dept: "FAI", grade: 1, semester: 1, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "FAI", grade: 1, semester: 1, name: "인공지능수학", category: "Major_Req", credit: 3, similar_id: "ai_math", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 1, semester: 2, name: "확률과통계", category: "Major_Req", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 1, semester: 2, name: "AI윤리및철학", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L1", layer_tag: "literacy" },
  { dept: "FAI", grade: 1, semester: 2, name: "미적분학", category: "BSM", credit: 3, similar_id: "calc", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 1, semester: 2, name: "고급인공지능수학", category: "Major_Req", credit: 3, similar_id: "adv_ai_math", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "선형대수", category: "Major_Req", credit: 3, similar_id: "linear_alg", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "이산수학", category: "Major_Req", credit: 3, similar_id: "discrete_math", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "금융회귀분석", category: "Major_Req", credit: 3, similar_id: "regression", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "중급파이썬프로그래밍", category: "Major_Sel", credit: 3, similar_id: "python_mid", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "데이터구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "데이터관리와SQL", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "빅데이터분석", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "금융시계열분석", category: "Major_Req", credit: 3, similar_id: "tsa_fin", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "파이썬통계", category: "Major_Sel", credit: 3, similar_id: "python_stat", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "빅데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "투자론", category: "Major_Sel", credit: 3, similar_id: "investment", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "머신러닝실습", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "게임이론", category: "Major_Sel", credit: 3, similar_id: "game_theory", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "OR기초", category: "Major_Sel", credit: 3, similar_id: "or1", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "금융데이터사이언스", category: "Major_Sel", credit: 3, similar_id: "fin_ds", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "딥러닝이론및응용", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "프롬프트엔지니어링", category: "Major_Sel", credit: 3, similar_id: "prompt_eng", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "생존분석", category: "Major_Sel", credit: 3, similar_id: "survival", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "Finance&AI캡스톤1", category: "Capstone", credit: 3, similar_id: "capstone_fai", layer: "L4", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "고급금융시계열(Transformer)", category: "Major_Sel", credit: 3, similar_id: "adv_tsa_fin", layer: "L4", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "고급딥러닝모델", category: "Major_Sel", credit: 3, similar_id: "adv_dl", layer: "L4", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L4", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "퀀트트레이딩", category: "Major_Sel", credit: 3, similar_id: "algo_trading", suggested: true, layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "Finance&AI캡스톤2", category: "Capstone", credit: 3, similar_id: "capstone_fai2", layer: "L4", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "금융상품추천모델", category: "Major_Sel", credit: 3, similar_id: "fin_recsys", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "컨벡스최적화", category: "Major_Sel", credit: 3, similar_id: "convex", layer: "L4", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "거대언어모델(LLM)", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L4", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "포트폴리오최적화", category: "Major_Sel", credit: 3, similar_id: "portfolio", layer: "L3", layer_tag: "core" },

  // ===================================
  // 6. AID
  // ===================================
  { dept: "AID", grade: 1, semester: 1, name: "인공지능기초수학", category: "Major_Req", credit: 3, similar_id: "ai_math", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 1, semester: 1, name: "인공지능개론", category: "Major_Req", credit: 3, similar_id: "ai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "AID", grade: 1, semester: 2, name: "확률과통계", category: "Major_Req", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 1, semester: 2, name: "AI윤리및철학", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L1", layer_tag: "literacy" },
  { dept: "AID", grade: 1, semester: 2, name: "인공지능프로그래밍", category: "Major_Sel", credit: 3, similar_id: "ai_prog", layer: "L2", layer_tag: "core" }, 
  { dept: "AID", grade: 1, semester: 2, name: "빅데이터분석기초", category: "Major_Req", credit: 3, similar_id: "bigdata", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "머신러닝(필수)", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "통계모델링", category: "Major_Sel", credit: 3, similar_id: "stat_model", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "자료구조와알고리즘", category: "Major_Req", credit: 3, similar_id: "ds_algo", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "빅데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "빅데이터모델링", category: "Major_Req", credit: 3, similar_id: "bigdata_model", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "딥러닝기초", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "텍스트마이닝기초", category: "Major_Sel", credit: 3, similar_id: "text_mining_basics", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "자연어처리기초", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "비정형데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "unstruct_dm", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "빅데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "컴퓨터비전", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "거대언어모델의기초", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "네트워크마이닝", category: "Major_Sel", credit: 3, similar_id: "net_mining", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "시계열데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "tsa_dm", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "연구프로젝트및실습", category: "Major_Sel", credit: 3, similar_id: "research_proj", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "AI데이터융합캡스톤", category: "Capstone", credit: 3, similar_id: "capstone_aid", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "딥러닝고급", category: "Major_Sel", credit: 3, similar_id: "adv_dl", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "다국어텍스트마이닝", category: "Major_Sel", credit: 3, similar_id: "multi_tm", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "최신기술솔루션1", category: "Major_Sel", credit: 3, similar_id: "tech_sol1", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "로보틱스", category: "Major_Sel", credit: 3, similar_id: "robotics", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "스타트업비즈니스", category: "Major_Sel", credit: 3, similar_id: "startup", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "최신기술솔루션2", category: "Major_Sel", credit: 3, similar_id: "tech_sol2", layer: "L4", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "의료데이터공학", category: "Major_Sel", credit: 3, similar_id: "medical_data", suggested: true, layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "질환예측모델", category: "Major_Sel", credit: 3, similar_id: "disease_pred", suggested: true, layer: "L3", layer_tag: "core" },

  // ===================================
  // 7. ELLT
  // ===================================
  { dept: "ELLT", grade: 1, semester: 1, name: "고급영어문법", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "literacy" },
  { dept: "ELLT", grade: 1, semester: 1, name: "영어학개론(1)", category: "Major_Req", credit: 3, similar_id: "ling_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "ELLT", grade: 1, semester: 2, name: "언어공학개론", category: "Major_Req", credit: 3, similar_id: "lai_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "ELLT", grade: 1, semester: 2, name: "영어학개론(2)", category: "Major_Req", credit: 3, similar_id: "ling_intro", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 1, name: "영어음운론", category: "Major_Req", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 1, name: "말뭉치와언어데이터", category: "Major_Req", credit: 3, similar_id: "corpus", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 2, name: "영어와데이터베이스", category: "Major_Req", credit: 3, similar_id: "db", layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 2, name: "영어데이터처리를위한프로그래밍(1)", category: "Major_Sel", credit: 3, similar_id: "python_mid", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 1, name: "컴퓨터와영어학", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 1, name: "영어데이터분석을위한통계", category: "Major_Sel", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 1, name: "실용음성처리", category: "Major_Sel", credit: 3, similar_id: "practical_speech", layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 2, name: "영어의미론", category: "Major_Req", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 2, name: "영어데이터분석", category: "Major_Sel", credit: 3, similar_id: "data_analysis", layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 1, name: "실용자연어처리", category: "Major_Sel", credit: 3, similar_id: "practical_nlp", layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 1, name: "영어데이터처리를위한프로그래밍(2)", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "응용자연어처리", category: "Major_Sel", credit: 3, similar_id: "applied_nlp", layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "영어데이터분석을위한기계학습", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L3", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "언어모델을위한프롬프트엔지니어링", category: "Major_Sel", credit: 3, similar_id: "prompt_eng", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "언어공학캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_lai", layer: "L4", layer_tag: "app" },

  // ===================================
  // 8. IME
  // ===================================
  { dept: "IME", grade: 1, semester: 1, name: "산업경영공학개론", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "literacy" },
  { dept: "IME", grade: 1, semester: 1, name: "경영수학", category: "BSM", credit: 3, similar_id: "calc1", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 1, name: "컴퓨터프로그래밍", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 2, name: "비즈니스애널리틱스개론", category: "Major_Sel", credit: 3, similar_id: "ba_intro", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 2, name: "기초확률통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 2, name: "공학경제", category: "Major_Req", credit: 3, similar_id: "eng_econ", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 1, name: "공학통계", category: "Major_Req", credit: 3, similar_id: "eng_stat", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 1, name: "자료구조및알고리즘", category: "Major_Sel", credit: 3, similar_id: "ds_algo", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 2, name: "생산계획및통제", category: "Major_Req", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 2, name: "데이터사이언스개론", category: "Major_Sel", credit: 3, similar_id: "ds_intro", layer: "L1", layer_tag: "literacy" },
  { dept: "IME", grade: 2, semester: 2, name: "데이터베이스설계및활용", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 1, name: "경영과학", category: "Major_Req", credit: 3, similar_id: "or1", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 1, name: "품질경영", category: "Major_Req", credit: 3, similar_id: "quality_mgmt", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 1, name: "응용데이터사이언스", category: "Major_Sel", credit: 3, similar_id: "applied_ds", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "응용최적화및강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L4", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "응용딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "텍스트애널리틱스", category: "Major_Sel", credit: 3, similar_id: "tm", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "실험계획법", category: "Major_Req", credit: 3, similar_id: "doe", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 4, semester: 1, name: "캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_ime", layer: "L4", layer_tag: "app" },
  { dept: "IME", grade: 4, semester: 1, name: "기업정보시스템", category: "Major_Sel", credit: 3, similar_id: "erp", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 4, semester: 2, name: "빅데이터애널리틱스", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L3", layer_tag: "app" },

  // ===================================
  // 9. Graduate / New L4 Courses (Suggested)
  // ===================================
  // Technical (CSE/ICE Base)
  { dept: "CSE", grade: 4, semester: 1, name: "MLOps", category: "Major_Sel", credit: 3, similar_id: "mlops", layer: "L4", layer_tag: "core", suggested: true },
  { dept: "CSE", grade: 4, semester: 2, name: "분산학습시스템", category: "Major_Sel", credit: 3, similar_id: "distributed_ml", layer: "L4", layer_tag: "core", suggested: true },
  { dept: "ICE", grade: 4, semester: 2, name: "클라우드인프라구축", category: "Major_Sel", credit: 3, similar_id: "cloud_infra", layer: "L4", layer_tag: "core", suggested: true },

  // Non-Technical (SSAI/IME Base)
  { dept: "SSAI", grade: 4, semester: 1, name: "AI전략및기획", category: "Major_Sel", credit: 3, similar_id: "ai_strategy", layer: "L4", layer_tag: "core", suggested: true },
  { dept: "SSAI", grade: 4, semester: 2, name: "AI프로젝트관리(PM)", category: "Major_Sel", credit: 3, similar_id: "ai_pm", layer: "L4", layer_tag: "core", suggested: true },
  { dept: "IME",  grade: 4, semester: 2, name: "조직변화관리", category: "Major_Sel", credit: 3, similar_id: "change_mgmt", layer: "L4", layer_tag: "app", suggested: true }
];

const  tracks = [
  {
    id: "edu_ai",
    group_number: 1,
    title: "교육 AI (Edu AI)",
    description: "AI 기반 개인화 교육 및 튜터링 시스템 개발 전문가",
    required_similars: ["lai_intro", "nlp_intro", "ai_tutor", "prompt_eng", "hci"],
    recommanded_grade: "ELLT + LAI 협력 과정"
  },
  {
    id: "regional_ai",
    group_number: 2,
    title: "지역학 AI (Area Studies AI)",
    description: "다국어 처리 및 지역 특화 데이터 분석 전문가 양성",
    required_similars: ["mt", "auto_interpre", "regional_bigdata", "regional_data_analysis", "multimodal", "culture_llm"],
    recommanded_grade: "국제지역대학/서양어대학 + LAI/SSAI 협력 과정"
  },
  {
    id: "finance_ai",
    group_number: 3,
    title: "금융 AI (Finance AI)",
    description: "금융 데이터 분석 및 핀테크 기술 습득",
    required_similars: ["regression", "tsa_fin", "ml", "advanced_llm", "algo_trading", "fin_ds"],
    recommanded_grade: "IME + FAI 협력 과정"
  },
  {
    id: "media_ai",
    group_number: 4,
    title: "미디어 AI (Media AI)",
    description: "멀티모달 콘텐츠 생성 및 추천 시스템 개발",
    required_similars: ["metavese", "bigdata", "video_gen", "media_data_lab", "dl", "multimodal"],
    recommanded_grade: "MEDIA + SSAI 협력 과정"
  },
  {
    id: "healthcare_ai",
    group_number: 5,
    title: "헬스케어 AI",
    description: "의료 데이터 분석 및 질병 예측 모델링",
    required_similars: ["prob_stat", "ml", "medical_data", "disease_pred", "dm", "survival"],
    recommanded_grade: "IME + AID 협력 과정"
  }
];

const microDegrees = [
  {
    title: "AI 서비스 개발 마이크로디그리",
    courses: ["ai_intro", "intro_prog", "ml", "capstone_lai", "capstone_aid", "capstone_fai", "capstone_ssai"],
    desc: "AI 모델을 활용한 서비스 개발 기초 역량 인증"
  },
  {
    title: "LLM 어플리케이션 마이크로디그리",
    courses: ["nlp_intro", "lm_intro", "practical_nlp", "dl", "prompt_eng", "advanced_llm", "culture_llm"],
    desc: "최신 거대언어모델 활용 및 튜닝 역량 인증"
  },
  {
    title: "금융 데이터 분석 마이크로디그리",
    courses: ["regression", "tsa_fin", "ml", "investment", "fin_ds"],
    desc: "금융 데이터에 특화된 정량적 분석 능력 인증"
  }
];

// Assign to window
window.departments = departments;
window.courseData = courseData;
window.tracks = tracks;
window.microDegrees = microDegrees;
