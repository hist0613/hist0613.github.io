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
];

const courseData = [
  // ===================================
  // 1. ICE (Information & Communication Engineering)
  // ===================================
  { dept: "ICE", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "ICE", grade: 1, semester: 1, name: "이산수학", category: "Major_Sel", credit: 3, similar_id: "discrete_math", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 1, name: "컴퓨터프로그래밍", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 1, name: "컴퓨팅사고", category: "Major_Req", credit: 3, similar_id: "comp_thinking", layer: "L0", layer_tag: "literacy" },
  { dept: "ICE", grade: 1, semester: 2, name: "컴퓨터프로그래밍및실습", category: "Major_Sel", credit: 3, similar_id: "prog_lab", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "논리회로및실험", category: "Major_Sel", credit: 3, similar_id: "logic_circuits", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "선형대수", category: "Major_Sel", credit: 3, similar_id: "linear_alg", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "오픈소스소프트웨어", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "AI정보이론", category: "Major_Sel", credit: 3, similar_id: "info_theory", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "eng_math2", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "알고리즘설계와해석", category: "Major_Sel", credit: 3, similar_id: "algo", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "컴퓨터구조", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "신호및시스템", category: "Major_Req", credit: 3, similar_id: "sig_sys", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "머신러닝", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "데이터통신", category: "Major_Req", credit: 3, similar_id: "data_comm", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "IoT시스템", category: "Major_Sel", credit: 3, similar_id: "iot", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "컴퓨터네트워크", category: "Major_Req", credit: 3, similar_id: "network", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "AI알고리즘", category: "Major_Sel", credit: 3, similar_id: "ai_algo", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "이산신호처리", category: "Major_Sel", credit: 3, similar_id: "dsp", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "정보통신종합설계및실습", category: "Capstone", credit: 3, similar_id: "capstone_ice", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "네트워크보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 2, name: "소프트웨어공학", category: "Major_Sel", credit: 3, similar_id: "se", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 2, name: "데이터사이언스", category: "Major_Sel", credit: 3, similar_id: "ds_app", layer: "L3", layer_tag: "core" },

  // ===================================
  // 2. CSE (Computer Science & Engineering)
  // ===================================
  { dept: "CSE", grade: 1, semester: 1, name: "이산수학", category: "Major_Sel", credit: 3, similar_id: "discrete_math", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "CSE", grade: 1, semester: 2, name: "컴퓨터프로그래밍실습", category: "BSM", credit: 3, similar_id: "prog_lab", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "컴퓨터시스템입문", category: "Major_Sel", credit: 3, similar_id: "sys_intro", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "선형대수", category: "Major_Sel", credit: 3, similar_id: "linear_alg", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "eng_math2", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "데이터사이언스기초", category: "Major_Sel", credit: 3, similar_id: "ds_intro", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "오픈소스및SW실습", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "논리회로", category: "Major_Sel", credit: 3, similar_id: "logic_circuits", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "프로그래밍언어론", category: "Major_Sel", credit: 3, similar_id: "pl", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "기계학습", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "디지털신호처리", category: "Major_Sel", credit: 3, similar_id: "dsp", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "알고리즘", category: "Major_Req", credit: 3, similar_id: "algo", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "웹프로그래밍", category: "Major_Sel", credit: 3, similar_id: "web", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터비전개론", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "빅데이터처리", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "시스템프로그래밍", category: "Major_Sel", credit: 3, similar_id: "sys_prog", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터구조", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터네트워크", category: "Major_Sel", credit: 3, similar_id: "network", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "소프트웨어공학", category: "Major_Sel", credit: 3, similar_id: "se", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "컴파일러구성론", category: "Major_Sel", credit: 3, similar_id: "compiler", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "캡스톤설계및실습", category: "Capstone", credit: 3, similar_id: "capstone_cse", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "IoT시스템", category: "Major_Sel", credit: 3, similar_id: "iot", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "데이터베이스설계", category: "Major_Sel", credit: 3, similar_id: "db_design", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "클라우드컴퓨팅", category: "Major_Sel", credit: 3, similar_id: "cloud", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "컴퓨터보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "인간컴퓨터상호작용", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "인공지능특강", category: "Major_Sel", credit: 3, similar_id: "ai_topics", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "강화학습기초", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L3", layer_tag: "core" },

  // ===================================
  // 3. LAI
  // ===================================
  { dept: "LAI", grade: 1, semester: 1, name: "컴퓨터프로그래밍기초", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "Language&AI수학", category: "Major_Req", credit: 3, similar_id: "lai_math", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "인공지능수학", category: "BSM", credit: 3, similar_id: "ai_math", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "LAI", grade: 1, semester: 2, name: "Language&AI개론", category: "Major_Req", credit: 3, similar_id: "lai_intro", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 1, name: "언어학개론", category: "Major_Req", credit: 3, similar_id: "ling_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "LAI", grade: 2, semester: 1, name: "언어처리를위한자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 1, name: "언어분석을위한데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 1, name: "고급인공지능수학", category: "Major_Req", credit: 3, similar_id: "adv_ai_math", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "자연어처리", category: "Major_Req", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "음성신호처리", category: "Major_Req", credit: 3, similar_id: "speech_proc", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "언어처리를위한알고리즘", category: "Major_Sel", credit: 3, similar_id: "algo", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 2, semester: 2, name: "기계학습의이해", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "멀티모달개론", category: "Major_Sel", credit: 3, similar_id: "multimodal", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "컴퓨터구조및설계", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "언어모델개론", category: "Major_Sel", credit: 3, similar_id: "lm_intro", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "정보검색및추천시스템", category: "Major_Sel", credit: 3, similar_id: "ir_recsys", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 1, name: "딥러닝", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "실용자연어처리", category: "Major_Sel", credit: 3, similar_id: "practical_nlp", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "실용음성처리", category: "Major_Sel", credit: 3, similar_id: "practical_speech", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "오픈소스프로그래밍", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "기계학습이론", category: "Major_Sel", credit: 3, similar_id: "ml_theory", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "언어모델특론", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "음향모델특론", category: "Major_Sel", credit: 3, similar_id: "adv_acoustic", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "지능형인터페이스", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "인공지능응용", category: "Major_Sel", credit: 3, similar_id: "ai_app", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "고급기계학습", category: "Major_Sel", credit: 3, similar_id: "adv_ml", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 1, name: "언어공학캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_lai", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "자연어처리시스템설계", category: "Major_Sel", credit: 3, similar_id: "nlp_sys_design", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "음성인식시스템설계", category: "Major_Sel", credit: 3, similar_id: "asr_sys_design", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "기계번역특론(다국어AI)", category: "Major_Sel", credit: 3, similar_id: "mt", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "자동통역특론(다국어AI)", category: "Major_Sel", credit: 3, similar_id: "auto_interpre", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "AI튜터링시스템", category: "Major_Sel", credit: 3, similar_id: "ai_tutor", suggested: true, layer: "L2", layer_tag: "core" },

  // ===================================
  // 4. SSAI
  // ===================================
  { dept: "SSAI", grade: 1, semester: 1, name: "인공지능기초수학", category: "Major_Req", credit: 3, similar_id: "ai_math", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 1, name: "기초프로그래밍(컴퓨팅사고)", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 1, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "SSAI", grade: 1, semester: 2, name: "소셜데이터프로그래밍기초1", category: "Major_Req", credit: 3, similar_id: "social_prog", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 2, name: "AI윤리", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L0", layer_tag: "literacy" },
  { dept: "SSAI", grade: 1, semester: 2, name: "사회과학과 데이터사이언스", category: "Major_Req", credit: 3, similar_id: "social_ds", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "사회과학연구방법론1", category: "Major_Req", credit: 3, similar_id: "social_method", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "기계학습", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "객체지향형프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "텍스트기반사회과학데이터분석1", category: "Major_Sel", credit: 3, similar_id: "text_social", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회과학데이터의자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "알고리즘", category: "Major_Req", credit: 3, similar_id: "algo", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회연결망데이터분석", category: "Major_Sel", credit: 3, similar_id: "sna", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회과학과빅데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "딥러닝및응용", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "인간인공지능상호작용", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "시계열분석", category: "Major_Sel", credit: 3, similar_id: "tsa", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "캡스톤디자인1", category: "Capstone", credit: 3, similar_id: "capstone_ssai1", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "빅데이터와공간지각", category: "Major_Sel", credit: 3, similar_id: "spatial", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "빅데이터와지역연구", category: "Major_Sel", credit: 3, similar_id: "regional_bigdata", layer: "L2", layer_tag: "core" }, 
  { dept: "SSAI", grade: 3, semester: 2, name: "패턴인식", category: "Major_Sel", credit: 3, similar_id: "pattern_rec", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "관계형데이터분석", category: "Major_Sel", credit: 3, similar_id: "rel_data", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "미디어데이터분석실습", category: "Major_Sel", credit: 3, similar_id: "media_data_lab", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "비즈니스데이터분석실습", category: "Major_Sel", credit: 3, similar_id: "biz_data_lab", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "AI를활용한정책분석", category: "Major_Sel", credit: 3, similar_id: "policy_ai", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "사회과학을위한GIS", category: "Major_Sel", credit: 3, similar_id: "gis", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "데이터사이언스캡스톤디자인2", category: "Capstone", credit: 3, similar_id: "capstone_ssai2", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "데이터보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "인공지능기반메타버스콘텐츠제작", category: "Major_Sel", credit: 3, similar_id: "metaverse", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "헬스애널리틱스실습", category: "Major_Sel", credit: 3, similar_id: "health_analytics", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "지역학데이터활용및분석", category: "Major_Sel", credit: 3, similar_id: "regional_data_analysis", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "비디오생성모델", category: "Major_Sel", credit: 3, similar_id: "video_gen", suggested: true, layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "문화특화언어모델", category: "Major_Sel", credit: 3, similar_id: "culture_llm", suggested: true, layer: "L2", layer_tag: "core" },

  // ===================================
  // 5. FAI
  // ===================================
  { dept: "FAI", grade: 1, semester: 1, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "FAI", grade: 1, semester: 1, name: "인공지능수학", category: "Major_Req", credit: 3, similar_id: "ai_math", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 1, semester: 2, name: "확률과통계", category: "Major_Req", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 1, semester: 2, name: "AI윤리및철학", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L0", layer_tag: "literacy" },
  { dept: "FAI", grade: 1, semester: 2, name: "미적분학", category: "BSM", credit: 3, similar_id: "calc", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 1, semester: 2, name: "고급인공지능수학", category: "Major_Req", credit: 3, similar_id: "adv_ai_math", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "선형대수", category: "Major_Req", credit: 3, similar_id: "linear_alg", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "이산수학", category: "Major_Req", credit: 3, similar_id: "discrete_math", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "금융회귀분석", category: "Major_Req", credit: 3, similar_id: "regression", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "중급파이썬프로그래밍", category: "Major_Sel", credit: 3, similar_id: "python_mid", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 1, name: "데이터구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "데이터관리와SQL", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "빅데이터분석", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "금융시계열분석", category: "Major_Req", credit: 3, similar_id: "tsa_fin", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "파이썬통계", category: "Major_Sel", credit: 3, similar_id: "python_stat", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 2, semester: 2, name: "빅데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "투자론", category: "Major_Sel", credit: 3, similar_id: "investment", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "머신러닝실습", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "게임이론", category: "Major_Sel", credit: 3, similar_id: "game_theory", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "OR기초", category: "Major_Sel", credit: 3, similar_id: "or1", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "금융데이터사이언스", category: "Major_Sel", credit: 3, similar_id: "fin_ds", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "딥러닝이론및응용", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "프롬프트엔지니어링", category: "Major_Sel", credit: 3, similar_id: "prompt_eng", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "생존분석", category: "Major_Sel", credit: 3, similar_id: "survival", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "Finance&AI캡스톤1", category: "Capstone", credit: 3, similar_id: "capstone_fai", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "고급금융시계열(Transformer)", category: "Major_Sel", credit: 3, similar_id: "adv_tsa_fin", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "고급딥러닝모델", category: "Major_Sel", credit: 3, similar_id: "adv_dl", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "퀀트트레이딩", category: "Major_Sel", credit: 3, similar_id: "algo_trading", suggested: true, layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "Finance&AI캡스톤2", category: "Capstone", credit: 3, similar_id: "capstone_fai2", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "금융상품추천모델", category: "Major_Sel", credit: 3, similar_id: "fin_recsys", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "컨벡스최적화", category: "Major_Sel", credit: 3, similar_id: "convex", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "거대언어모델(LLM)", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 2, name: "포트폴리오최적화", category: "Major_Sel", credit: 3, similar_id: "portfolio", layer: "L2", layer_tag: "core" },

  // ===================================
  // 6. AID
  // ===================================
  { dept: "AID", grade: 1, semester: 1, name: "인공지능기초수학", category: "Major_Req", credit: 3, similar_id: "ai_math", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 1, semester: 1, name: "인공지능개론", category: "Major_Req", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "AID", grade: 1, semester: 2, name: "확률과통계", category: "Major_Req", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 1, semester: 2, name: "AI윤리및철학", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L0", layer_tag: "literacy" },
  { dept: "AID", grade: 1, semester: 2, name: "인공지능프로그래밍", category: "Major_Sel", credit: 3, similar_id: "ai_prog", layer: "L1", layer_tag: "core" }, 
  { dept: "AID", grade: 1, semester: 2, name: "빅데이터분석기초", category: "Major_Req", credit: 3, similar_id: "bigdata", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "머신러닝(필수)", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "통계모델링", category: "Major_Sel", credit: 3, similar_id: "stat_model", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "자료구조와알고리즘", category: "Major_Req", credit: 3, similar_id: "ds_algo", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "빅데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "빅데이터모델링", category: "Major_Req", credit: 3, similar_id: "bigdata_model", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "딥러닝기초", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "텍스트마이닝기초", category: "Major_Sel", credit: 3, similar_id: "text_mining_basics", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "자연어처리기초", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "비정형데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "unstruct_dm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "빅데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "컴퓨터비전", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "거대언어모델의기초", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "네트워크마이닝", category: "Major_Sel", credit: 3, similar_id: "net_mining", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "시계열데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "tsa_dm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "연구프로젝트및실습", category: "Major_Sel", credit: 3, similar_id: "research_proj", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "AI데이터융합캡스톤", category: "Capstone", credit: 3, similar_id: "capstone_aid", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "딥러닝고급", category: "Major_Sel", credit: 3, similar_id: "adv_dl", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "다국어텍스트마이닝", category: "Major_Sel", credit: 3, similar_id: "multi_tm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "최신기술솔루션1", category: "Major_Sel", credit: 3, similar_id: "tech_sol1", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "로보틱스", category: "Major_Sel", credit: 3, similar_id: "robotics", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "스타트업비즈니스", category: "Major_Sel", credit: 3, similar_id: "startup", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "최신기술솔루션2", category: "Major_Sel", credit: 3, similar_id: "tech_sol2", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "의료데이터공학", category: "Major_Sel", credit: 3, similar_id: "medical_data", suggested: true, layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "질환예측모델", category: "Major_Sel", credit: 3, similar_id: "disease_pred", suggested: true, layer: "L2", layer_tag: "core" },

  // ===================================
  // 7. ELLT
  // ===================================
  { dept: "ELLT", grade: 1, semester: 1, name: "고급영어문법", category: "Major_Req", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "ELLT", grade: 1, semester: 1, name: "영어학개론(1)", category: "Major_Req", credit: 3, similar_id: "ling_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "ELLT", grade: 1, semester: 2, name: "언어공학개론", category: "Major_Req", credit: 3, similar_id: "lai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "ELLT", grade: 1, semester: 2, name: "영어학개론(2)", category: "Major_Req", credit: 3, similar_id: "ling_intro", layer: "L1", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 1, name: "영어음운론", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 1, name: "말뭉치와언어데이터", category: "Major_Req", credit: 3, similar_id: "corpus", layer: "L1", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 2, name: "영어와데이터베이스", category: "Major_Req", credit: 3, similar_id: "db", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 2, semester: 2, name: "영어데이터처리를위한프로그래밍(1)", category: "Major_Sel", credit: 3, similar_id: "python_mid", layer: "L1", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 1, name: "컴퓨터와영어학", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 1, name: "영어데이터분석을위한통계", category: "Major_Sel", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 1, name: "실용음성처리", category: "Major_Sel", credit: 3, similar_id: "practical_speech", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 2, name: "영어의미론", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "ELLT", grade: 3, semester: 2, name: "영어데이터분석", category: "Major_Sel", credit: 3, similar_id: "data_analysis", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 1, name: "실용자연어처리", category: "Major_Sel", credit: 3, similar_id: "practical_nlp", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 1, name: "영어데이터처리를위한프로그래밍(2)", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "응용자연어처리", category: "Major_Sel", credit: 3, similar_id: "applied_nlp", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "영어데이터분석을위한기계학습", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "언어모델을위한프롬프트엔지니어링", category: "Major_Sel", credit: 3, similar_id: "prompt_eng", layer: "L1", layer_tag: "app" },
  { dept: "ELLT", grade: 4, semester: 2, name: "언어공학캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_lai", layer: "L3", layer_tag: "app" },

  // ===================================
  // 8. IME
  // ===================================
  { dept: "IME", grade: 1, semester: 1, name: "산업경영공학개론", category: "Major_Req", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "IME", grade: 1, semester: 1, name: "경영수학", category: "BSM", credit: 3, similar_id: "calc1", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 1, name: "컴퓨터프로그래밍", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 2, name: "비즈니스애널리틱스개론", category: "Major_Sel", credit: 3, similar_id: "ba_intro", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 2, name: "기초확률통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 1, semester: 2, name: "공학경제", category: "Major_Req", credit: 3, similar_id: "eng_econ", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 1, name: "공학통계", category: "Major_Req", credit: 3, similar_id: "eng_stat", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 1, name: "자료구조및알고리즘", category: "Major_Sel", credit: 3, similar_id: "ds_algo", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 2, name: "생산계획및통제", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 2, name: "데이터사이언스개론", category: "Major_Sel", credit: 3, similar_id: "ds_intro", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 2, semester: 2, name: "데이터베이스설계및활용", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 1, name: "경영과학", category: "Major_Req", credit: 3, similar_id: "or1", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 1, name: "품질경영", category: "Major_Req", credit: 3, similar_id: "quality_mgmt", layer: "L2", layer_tag: "app" },

  // ===================================
  // 9. Minerva (General Ed)
  // ===================================
  { dept: "Minerva", grade: 1, semester: 1, name: "데이터리터러시", category: "BSM", credit: 3, similar_id: "data_lit", layer: "L0", layer_tag: "literacy" },
  { dept: "Minerva", grade: 1, semester: 1, name: "인공지능의이해", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "Minerva", grade: 1, semester: 1, name: "정보사회의통계활용", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L0", layer_tag: "literacy" },
  { dept: "Minerva", grade: 1, semester: 1, name: "컴퓨터프로그래밍", category: "BSM", credit: 3, similar_id: "intro_prog", layer: "L0", layer_tag: "literacy" },
  { dept: "Minerva", grade: 1, semester: 1, name: "컴퓨팅사고", category: "BSM", credit: 3, similar_id: "comp_thinking", layer: "L0", layer_tag: "literacy" },
  { dept: "IME", grade: 3, semester: 1, name: "응용데이터사이언스", category: "Major_Sel", credit: 3, similar_id: "applied_ds", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "응용최적화및강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "응용딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "텍스트애널리틱스", category: "Major_Sel", credit: 3, similar_id: "tm", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 3, semester: 2, name: "실험계획법", category: "Major_Req", credit: 3, similar_id: "doe", layer: "L1", layer_tag: "app" },
  { dept: "IME", grade: 4, semester: 1, name: "캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_ime", layer: "L3", layer_tag: "app" },
  { dept: "IME", grade: 4, semester: 1, name: "기업정보시스템", category: "Major_Sel", credit: 3, similar_id: "erp", layer: "L2", layer_tag: "app" },
  { dept: "IME", grade: 4, semester: 2, name: "빅데이터애널리틱스", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L2", layer_tag: "app" },

  // ===================================
  // 10. AX Group A: SEM (Semiconductor)
  // ===================================
  // ===================================
  // 10. AX Group A: SEM (Semiconductor)
  // ===================================
  { dept: "SEM", grade: 1, semester: 1, name: "미적분학1", category: "BSM", credit: 3, similar_id: "calc1", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 1, semester: 1, name: "일반물리1", category: "BSM", credit: 3, similar_id: "phys1", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 1, semester: 1, name: "컴퓨터프로그래밍", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "SEM", grade: 1, semester: 2, name: "미적분학2", category: "BSM", credit: 3, similar_id: "calc2", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 1, semester: 2, name: "일반물리2", category: "BSM", credit: 3, similar_id: "phys2", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 1, semester: 2, name: "컴퓨터프로그래밍및실습", category: "Major_Req", credit: 3, similar_id: "prog_lab", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 1, name: "회로이론", category: "Major_Req", credit: 3, similar_id: "circuit", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 1, name: "전자기학", category: "Major_Req", credit: 3, similar_id: "electromagnetics", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 1, name: "반도체공학실험1", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 1, name: "디지털논리회로", category: "Major_Req", credit: 3, similar_id: "logic_circuits", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 1, name: "자료구조및알고리즘", category: "Major_Req", credit: 3, similar_id: "ds_algo", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "eng_math2", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 2, name: "반도체물리", category: "Major_Req", credit: 3, similar_id: "semi_phys", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 2, name: "반도체공학실험2", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 2, name: "HDL응용설계", category: "Major_Req", credit: 3, similar_id: "hdl", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 2, name: "컴퓨터구조", category: "Major_Req", credit: 3, similar_id: "arch", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 2, semester: 2, name: "신호및시스템", category: "Major_Req", credit: 3, similar_id: "sig_sys", layer: "L1", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 1, name: "반도체소자", category: "Major_Req", credit: 3, similar_id: "semi_device", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 1, name: "반도체회로1", category: "Major_Req", credit: 3, similar_id: "semi_circuit1", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 1, name: "디지털신호처리", category: "Major_Req", credit: 3, similar_id: "dsp", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 1, name: "HDL및디지털설계", category: "Major_Req", credit: 3, similar_id: "hdl_design", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 1, name: "마이크로프로세서", category: "Major_Req", credit: 3, similar_id: "microprocessor", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 2, name: "반도체회로2", category: "Major_Req", credit: 3, similar_id: "semi_circuit2", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 2, name: "반도체공정", category: "Major_Req", credit: 3, similar_id: "semi_process", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 2, name: "아날로그집적회로", category: "Major_Req", credit: 3, similar_id: "analog_ic", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 2, name: "임베디드시스템", category: "Major_Req", credit: 3, similar_id: "embedded", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 3, semester: 2, name: "확률및랜덤프로세스", category: "Major_Req", credit: 3, similar_id: "stochastic", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 1, name: "기계학습", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 1, name: "디지털집적회로", category: "Major_Req", credit: 3, similar_id: "digital_ic", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 1, name: "RF설계", category: "Major_Req", credit: 3, similar_id: "rf_design", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 1, name: "반도체재료", category: "Major_Req", credit: 3, similar_id: "semi_material", layer: "L2", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 1, name: "캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_sem", layer: "L3", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 2, name: "인공지능반도체", category: "Major_Sel", credit: 3, similar_id: "ai_semi", layer: "L3", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 2, name: "SoC설계", category: "Major_Sel", credit: 3, similar_id: "soc_design", layer: "L3", layer_tag: "core" },
  { dept: "SEM", grade: 4, semester: 2, name: "통신공학", category: "Major_Req", credit: 3, similar_id: "comm_eng", layer: "L2", layer_tag: "core" },

  // ===================================
  // 11. AX Group A: BME (Biomedical)
  // ===================================
  // ===================================
  // 11. AX Group A: BME (Biomedical)
  // ===================================
  { dept: "BME", grade: 1, semester: 1, name: "일반생물학1", category: "Major_Req", credit: 3, similar_id: "bio1", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 1, name: "컴퓨터개론및실습", category: "Major_Req", credit: 3, similar_id: "intro_cs_lab", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "BME", grade: 1, semester: 1, name: "일반화학", category: "BSM", credit: 3, similar_id: "chem", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 1, name: "기초미적분학I", category: "BSM", credit: 3, similar_id: "calc1", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 1, name: "일반물리I", category: "BSM", credit: 2, similar_id: "phys1", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 2, name: "일반생물학2", category: "Major_Req", credit: 3, similar_id: "bio2", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 2, name: "디지털공학", category: "Major_Req", credit: 3, similar_id: "digital_eng", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 2, name: "바이오메디컬공학개론", category: "Major_Req", credit: 3, similar_id: "bme_intro", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 2, name: "컴퓨터프로그래밍및실습", category: "BSM", credit: 3, similar_id: "prog_lab", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 2, name: "기초물리학II", category: "BSM", credit: 3, similar_id: "phys2", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 1, semester: 2, name: "기초미적분학II", category: "BSM", credit: 2, similar_id: "calc2", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 2, semester: 1, name: "미생물학", category: "Major_Req", credit: 3, similar_id: "microbio", layer: "L1", layer_tag: "app" },
  { dept: "BME", grade: 2, semester: 1, name: "생체구조및생리학", category: "Major_Req", credit: 3, similar_id: "physiology", layer: "L1", layer_tag: "app" },
  { dept: "BME", grade: 2, semester: 1, name: "객체지향프로그래밍및실습", category: "Major_Req", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 2, semester: 1, name: "자료구조및실습", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 2, semester: 1, name: "바이오확률통계", category: "Major_Req", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 2, semester: 1, name: "의용전자및실습", category: "Major_Req", credit: 3, similar_id: "med_elec", layer: "L1", layer_tag: "app" },
  { dept: "BME", grade: 2, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 2, semester: 2, name: "의용회로및실습", category: "Major_Req", credit: 3, similar_id: "med_circuit", layer: "L1", layer_tag: "app" },
  { dept: "BME", grade: 2, semester: 2, name: "선형대수", category: "Major_Req", credit: 3, similar_id: "linear_alg", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 2, semester: 2, name: "의용기계공학", category: "Major_Req", credit: 3, similar_id: "med_mech", layer: "L1", layer_tag: "app" },
  { dept: "BME", grade: 2, semester: 2, name: "의학유전학", category: "Major_Req", credit: 3, similar_id: "genetics", layer: "L1", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 1, name: "생명정보학을위한데이터마이닝", category: "Major_Req", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 1, name: "의생명정보학", category: "Major_Req", credit: 3, similar_id: "bioinfo", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 1, name: "BME신호및시스템", category: "Major_Req", credit: 3, similar_id: "sig_sys", layer: "L1", layer_tag: "core" },
  { dept: "BME", grade: 3, semester: 1, name: "의료영상처리및실습", category: "Major_Req", credit: 3, similar_id: "med_img_proc", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 1, name: "생체신호계측기기설계및실습", category: "Major_Req", credit: 3, similar_id: "bio_signal_device", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 1, name: "생체전자기학", category: "Major_Req", credit: 3, similar_id: "bio_electromagnetics", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 1, name: "바이오메디컬인공지능", category: "Major_Req", credit: 3, similar_id: "bio_ai", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 2, name: "BME캡스톤기초", category: "Capstone", credit: 1, similar_id: "capstone_bme_pre", layer: "L3", layer_tag: "core" },
  { dept: "BME", grade: 3, semester: 2, name: "의료영상물리학", category: "Major_Req", credit: 3, similar_id: "med_img_phys", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 2, name: "바이오메디컬공학최신경향과창의설계", category: "Major_Req", credit: 3, similar_id: "bme_trends", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 2, name: "화학정보학", category: "Major_Req", credit: 3, similar_id: "cheminfo", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 2, name: "의생명자연어처리", category: "Major_Req", credit: 3, similar_id: "nlp_bio", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 2, name: "의료초음파입문", category: "Major_Req", credit: 3, similar_id: "ultrasound", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 2, name: "의용반도체공정및실습", category: "Major_Req", credit: 3, similar_id: "bio_semi", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 3, semester: 2, name: "웨어러블/임플란터블디바이스특론", category: "Major_Req", credit: 3, similar_id: "wearable", layer: "L3", layer_tag: "app" },
  { dept: "BME", grade: 4, semester: 1, name: "BME캡스톤디자인실습", category: "Capstone", credit: 3, similar_id: "capstone_bme", layer: "L3", layer_tag: "core" },
  { dept: "BME", grade: 4, semester: 1, name: "데이터시각화", category: "Major_Req", credit: 3, similar_id: "viz", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 4, semester: 1, name: "신약개발", category: "Major_Req", credit: 3, similar_id: "drug_dev", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 4, semester: 1, name: "고급의료영상처리및실습", category: "Major_Req", credit: 3, similar_id: "adv_med_img", layer: "L3", layer_tag: "app" },
  { dept: "BME", grade: 4, semester: 1, name: "자기공명영상이론", category: "Major_Req", credit: 3, similar_id: "mri", layer: "L3", layer_tag: "app" },
  { dept: "BME", grade: 4, semester: 2, name: "의생명데이터분석및실습", category: "Major_Req", credit: 3, similar_id: "bio_data_analysis", layer: "L2", layer_tag: "app" },
  { dept: "BME", grade: 4, semester: 2, name: "바이오메디컬공학특강", category: "Major_Req", credit: 2, similar_id: "bme_topics", layer: "L3", layer_tag: "app" },

  // ===================================
  // 12. AX Group A: STAT (Statistics)
  // ===================================
  // ===================================
  // 12. AX Group A: STAT (Statistics)
  // ===================================
  { dept: "STAT", grade: 1, semester: 1, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 1, semester: 1, name: "확률과통계연습", category: "BSM", credit: 1, similar_id: "prob_stat_lab", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 1, semester: 2, name: "통계학의활용및실습", category: "Major_Req", credit: 2, similar_id: "stat_lab", layer: "L1", layer_tag: "app" },
  { dept: "STAT", grade: 2, semester: 1, name: "의사결정론", category: "Major_Sel", credit: 3, similar_id: "decision_theory", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 2, semester: 1, name: "통계소프트웨어", category: "Major_Sel", credit: 3, similar_id: "stat_sw", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 2, semester: 1, name: "통계소프트웨어실습", category: "Major_Sel", credit: 1, similar_id: "stat_sw_lab", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 2, semester: 1, name: "통계행렬론", category: "Major_Req", credit: 3, similar_id: "linear_alg", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 2, semester: 1, name: "통계행렬론연습", category: "Major_Sel", credit: 1, similar_id: "linear_alg_lab", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 2, semester: 2, name: "회귀분석", category: "Major_Req", credit: 3, similar_id: "regression", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 2, semester: 2, name: "회귀분석연습", category: "Major_Sel", credit: 1, similar_id: "regression_lab", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 2, semester: 2, name: "통계계산및실습", category: "Major_Sel", credit: 3, similar_id: "stat_comp", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 2, semester: 2, name: "확률분포론", category: "Major_Req", credit: 3, similar_id: "prob_dist", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 2, semester: 2, name: "확률분포론연습", category: "Major_Sel", credit: 1, similar_id: "prob_dist_lab", layer: "L1", layer_tag: "core" },
  { dept: "STAT", grade: 2, semester: 2, name: "금융수학", category: "Major_Sel", credit: 3, similar_id: "fin_math", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 3, semester: 1, name: "범주형자료분석및실습", category: "Major_Sel", credit: 3, similar_id: "categorical_analysis", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 3, semester: 1, name: "생존분석및실습", category: "Major_Sel", credit: 3, similar_id: "survival", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 3, semester: 1, name: "수리통계학", category: "Major_Req", credit: 3, similar_id: "math_stat", layer: "L2", layer_tag: "core" },
  { dept: "STAT", grade: 3, semester: 1, name: "수리통계학연습", category: "Major_Sel", credit: 1, similar_id: "math_stat_lab", layer: "L2", layer_tag: "core" },
  { dept: "STAT", grade: 3, semester: 1, name: "시계열분석및실습", category: "Major_Sel", credit: 3, similar_id: "tsa", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 3, semester: 1, name: "실험계획법및실습", category: "Major_Sel", credit: 3, similar_id: "doe", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 3, semester: 2, name: "다변량분석및실습", category: "Major_Sel", credit: 3, similar_id: "multivar", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 3, semester: 2, name: "데이터마이닝및실습", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 3, semester: 2, name: "베이지안통계학", category: "Major_Sel", credit: 3, similar_id: "bayesian", layer: "L2", layer_tag: "core" },
  { dept: "STAT", grade: 3, semester: 2, name: "표본조사론", category: "Major_Sel", credit: 3, similar_id: "survey", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 4, semester: 1, name: "금융자료분석및실습", category: "Major_Sel", credit: 3, similar_id: "fin_data_analysis", layer: "L3", layer_tag: "app" },
  { dept: "STAT", grade: 4, semester: 1, name: "데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L2", layer_tag: "app" },
  { dept: "STAT", grade: 4, semester: 1, name: "통계세미나", category: "Major_Sel", credit: 1, similar_id: "sem", layer: "L3", layer_tag: "core" },
  { dept: "STAT", grade: 4, semester: 1, name: "통계적기계학습및실습", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "STAT", grade: 4, semester: 2, name: "데이터사이언스세미나", category: "Major_Sel", credit: 3, similar_id: "ds_seminar", layer: "L3", layer_tag: "app" },
  { dept: "STAT", grade: 4, semester: 2, name: "데이터어낼리틱스세미나", category: "Major_Sel", credit: 3, similar_id: "analytics_seminar", layer: "L3", layer_tag: "app" },
  { dept: "STAT", grade: 4, semester: 2, name: "통계적방법론", category: "Major_Sel", credit: 3, similar_id: "stat_method", layer: "L3", layer_tag: "app" },

  // ===================================
  // 13. AX Group B: GBT (Global Business & Technology)
  // ===================================
  // ===================================
  // 13. AX Group B: GBT (Global Business & Technology)
  // ===================================
  { dept: "GBT", grade: 1, semester: 1, name: "경영학원론", category: "Major_Req", credit: 3, similar_id: "mgmt_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "GBT", grade: 1, semester: 1, name: "경제학개론", category: "Major_Req", credit: 3, similar_id: "econ_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "GBT", grade: 1, semester: 1, name: "경영수학", category: "Major_Req", credit: 3, similar_id: "calc1", layer: "L1", layer_tag: "core" },
  { dept: "GBT", grade: 1, semester: 2, name: "통계학", category: "Major_Req", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "GBT", grade: 1, semester: 2, name: "컴퓨터프로그래밍", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "GBT", grade: 2, semester: 1, name: "회계원리", category: "Major_Req", credit: 3, similar_id: "accounting", layer: "L1", layer_tag: "app" },
  { dept: "GBT", grade: 2, semester: 1, name: "마케팅관리", category: "Major_Req", credit: 3, similar_id: "marketing", layer: "L1", layer_tag: "app" },
  { dept: "GBT", grade: 2, semester: 1, name: "자료구조", category: "Major_Sel", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "GBT", grade: 2, semester: 2, name: "재무관리", category: "Major_Req", credit: 3, similar_id: "finance_mgmt", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 2, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "GBT", grade: 2, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "GBT", grade: 2, semester: 2, name: "소비자행동론", category: "Major_Req", credit: 3, similar_id: "consumer_behavior", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 3, semester: 1, name: "빅데이터분석", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L2", layer_tag: "core" },
  { dept: "GBT", grade: 3, semester: 1, name: "모바일프로그래밍", category: "Major_Sel", credit: 3, similar_id: "mobile_prog", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 3, semester: 1, name: "IT와경영전략", category: "Major_Sel", credit: 3, similar_id: "it_strategy", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 3, semester: 1, name: "국제경영론", category: "Major_Req", credit: 3, similar_id: "intl_biz", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 3, semester: 2, name: "비즈니스텍스트마이닝", category: "Major_Sel", credit: 3, similar_id: "text_mining", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 3, semester: 2, name: "인공지능", category: "Major_Sel", credit: 3, similar_id: "ai_intro", layer: "L2", layer_tag: "core" },
  { dept: "GBT", grade: 3, semester: 2, name: "소셜콘텐츠분석", category: "Major_Sel", credit: 3, similar_id: "social_analytics", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 3, semester: 2, name: "운영관리", category: "Major_Req", credit: 3, similar_id: "ops_mgmt", layer: "L2", layer_tag: "app" },
  { dept: "GBT", grade: 4, semester: 1, name: "캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_gbt", layer: "L3", layer_tag: "app" },
  { dept: "GBT", grade: 4, semester: 1, name: "빅데이터기반의사결정", category: "Major_Sel", credit: 3, similar_id: "bigdata_decision", layer: "L3", layer_tag: "app" },
  { dept: "GBT", grade: 4, semester: 1, name: "디지털마케팅실습", category: "Major_Sel", credit: 3, similar_id: "digital_marketing", layer: "L3", layer_tag: "app" },

  // ===================================
  // 14. AX Group B: MEDIA (Media Communication)
  // ===================================
  // ===================================
  // 14. AX Group B: MEDIA (Media Communication)
  // ===================================
  { dept: "MEDIA", grade: 1, semester: 1, name: "미디어커뮤니케이션의이해", category: "Major_Req", credit: 3, similar_id: "media_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "MEDIA", grade: 1, semester: 2, name: "미디어커뮤니케이션연구방법론", category: "Major_Req", credit: 3, similar_id: "social_method", layer: "L1", layer_tag: "core" },
  { dept: "MEDIA", grade: 2, semester: 1, name: "저널리즘의이해", category: "Major_Sel", credit: 3, similar_id: "journalism", layer: "L1", layer_tag: "app" },
  { dept: "MEDIA", grade: 2, semester: 1, name: "글로벌커뮤니케이션", category: "Major_Sel", credit: 3, similar_id: "global_comm", layer: "L1", layer_tag: "app" },
  { dept: "MEDIA", grade: 2, semester: 1, name: "광고의이해", category: "Major_Sel", credit: 3, similar_id: "ad_intro", layer: "L1", layer_tag: "app" },
  { dept: "MEDIA", grade: 2, semester: 2, name: "PR의이해", category: "Major_Sel", credit: 3, similar_id: "pr_intro", layer: "L1", layer_tag: "app" },
  { dept: "MEDIA", grade: 2, semester: 2, name: "방송의이해", category: "Major_Sel", credit: 3, similar_id: "broadcasting", layer: "L1", layer_tag: "app" },
  { dept: "MEDIA", grade: 2, semester: 2, name: "뉴미디어테크놀로지", category: "Major_Req", credit: 3, similar_id: "new_media", layer: "L1", layer_tag: "app" },
  { dept: "MEDIA", grade: 3, semester: 1, name: "언론정보통계분석1", category: "Major_Req", credit: 3, similar_id: "stat_analysis", layer: "L1", layer_tag: "core" },
  { dept: "MEDIA", grade: 3, semester: 2, name: "언론정보윤리와법", category: "Major_Req", credit: 3, similar_id: "media_law", layer: "L2", layer_tag: "app" },
  { dept: "MEDIA", grade: 3, semester: 2, name: "브랜드의이해", category: "Major_Req", credit: 3, similar_id: "brand", layer: "L2", layer_tag: "app" },
  { dept: "MEDIA", grade: 3, semester: 2, name: "대중문화의이해", category: "Major_Req", credit: 3, similar_id: "culture_understanding", layer: "L2", layer_tag: "app" },

  // ===================================
  // 15. AX Group B: DC (Digital Contents)
  // ===================================
  // ===================================
  // 15. AX Group B: DC (Digital Contents)
  // ===================================
  { dept: "DC", grade: 1, semester: 1, name: "디지털콘텐츠입문", category: "Major_Req", credit: 3, similar_id: "dc_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "DC", grade: 1, semester: 1, name: "디지털콘텐츠디자인사고", category: "Major_Req", credit: 3, similar_id: "design_thinking", layer: "L0", layer_tag: "literacy" },
  { dept: "DC", grade: 1, semester: 1, name: "컴퓨팅사고", category: "BSM", credit: 3, similar_id: "comp_thinking", layer: "L0", layer_tag: "literacy" },
  { dept: "DC", grade: 1, semester: 2, name: "AI와콘텐츠창작기초", category: "Major_Req", credit: 3, similar_id: "ai_content_basic", layer: "L1", layer_tag: "app" },
  { dept: "DC", grade: 1, semester: 2, name: "기초프로그래밍", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "DC", grade: 1, semester: 2, name: "미디어프로그래밍", category: "Major_Req", credit: 3, similar_id: "media_prog", layer: "L1", layer_tag: "app" },
  { dept: "DC", grade: 2, semester: 1, name: "파이썬프로그래밍", category: "Major_Req", credit: 3, similar_id: "python_prog", layer: "L1", layer_tag: "core" },
  { dept: "DC", grade: 2, semester: 1, name: "비주얼콘텐츠트렌드", category: "Major_Req", credit: 3, similar_id: "visual_trend", layer: "L1", layer_tag: "app" },
  { dept: "DC", grade: 2, semester: 2, name: "비주얼콘텐츠테크놀로지", category: "Major_Req", credit: 3, similar_id: "visual_tech", layer: "L1", layer_tag: "app" },
  { dept: "DC", grade: 2, semester: 2, name: "게임스토리텔링", category: "Major_Sel", credit: 3, similar_id: "game_story", layer: "L2", layer_tag: "app" },
  { dept: "DC", grade: 3, semester: 1, name: "AI이미지메이킹", category: "Major_Sel", credit: 3, similar_id: "ai_image", layer: "L2", layer_tag: "app" },
  { dept: "DC", grade: 3, semester: 1, name: "데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L2", layer_tag: "app" },
  { dept: "DC", grade: 3, semester: 2, name: "AI스토리창작", category: "Major_Sel", credit: 3, similar_id: "ai_story", layer: "L2", layer_tag: "app" },
  { dept: "DC", grade: 3, semester: 2, name: "인터랙티브콘텐츠실습", category: "Major_Sel", credit: 3, similar_id: "interactive_content", layer: "L2", layer_tag: "app" },
  { dept: "DC", grade: 4, semester: 1, name: "AI콘텐츠비즈니스", category: "Major_Sel", credit: 3, similar_id: "ai_biz", layer: "L3", layer_tag: "app" },
  { dept: "DC", grade: 4, semester: 1, name: "디지털콘텐츠오픈마켓실습", category: "Capstone", credit: 3, similar_id: "capstone_dc", layer: "L3", layer_tag: "app" },

  // ===================================
  // 9. Graduate / New L4 Courses (Suggested)
  // ===================================
  // Technical (CSE/ICE Base)
  { dept: "CSE", grade: 4, semester: 1, name: "MLOps", category: "Major_Sel", credit: 3, similar_id: "mlops", layer: "L3", layer_tag: "core", suggested: true },
  { dept: "CSE", grade: 4, semester: 2, name: "분산학습시스템", category: "Major_Sel", credit: 3, similar_id: "distributed_ml", layer: "L3", layer_tag: "core", suggested: true },
  { dept: "ICE", grade: 4, semester: 2, name: "클라우드인프라구축", category: "Major_Sel", credit: 3, similar_id: "cloud_infra", layer: "L3", layer_tag: "core", suggested: true },

  // Non-Technical (SSAI/IME Base)
  { dept: "SSAI", grade: 4, semester: 1, name: "AI전략및기획", category: "Major_Sel", credit: 3, similar_id: "ai_strategy", layer: "L3", layer_tag: "core", suggested: true },
  { dept: "SSAI", grade: 4, semester: 2, name: "AI프로젝트관리(PM)", category: "Major_Sel", credit: 3, similar_id: "ai_pm", layer: "L3", layer_tag: "core", suggested: true },
  { dept: "IME",  grade: 4, semester: 2, name: "조직변화관리", category: "Major_Sel", credit: 3, similar_id: "change_mgmt", layer: "L3", layer_tag: "app", suggested: true }
];

const  tracks = [
  {
    id: "ai_core_agentic",
    group_number: 1,
    title: "AI 코어 & 에이전틱 AI",
    description: "AI/ML 핵심 알고리즘 설계 및 에이전틱 AI 시스템 구축 전문가",
    required_similars: ["ai_intro", "ml", "dl", "prob_stat", "linear_alg", "cv", "rl", "nlp_intro", "ai_algo", "distributed_ml", "intro_prog"],
    recommanded_grade: "컴퓨터공학부 + AI데이터융합 + Language&AI",
    color: "#4f46e5" 
  },
  {
    id: "physical_ai_smart",
    group_number: 2,
    title: "피지컬 AI & 스마트 시스템",
    description: "로봇, 자율주행 등 물리 세계를 인지·판단·행동하는 AI 시스템 설계",
    required_similars: ["ai_intro", "ml", "dl", "iot", "robotics", "sig_sys", "digital_twin", "edge_ai", "sensor_fusion", "embedded", "speech_proc", "vision", "os", "network", "sys_prog", "data_comm", "security", "logic_circuits", "capstone_ice"],
    recommanded_grade: "정보통신(개편) + 컴퓨터공학부 + Language&AI",
    color: "#ea580c"
  },
  {
    id: "language_ai_comm",
    group_number: 3,
    title: "언어 AI & 글로벌 커뮤니케이션",
    description: "다국어 NLP, 음성처리, 자동통번역 기술 개발 및 응용",
    required_similars: ["ai_intro", "ml", "dl", "lai_intro", "nlp_intro", "speech_proc", "practical_speech", "text_mining", "linguistics", "auto_interpre", "corpus", "culture_llm"],
    recommanded_grade: "Language&AI + 컴퓨터공학부 + Social Science&AI",
    color: "#10b981"
  },
  {
    id: "data_science_analytics",
    group_number: 4,
    title: "데이터사이언스 & AI 분석",
    description: "대규모 데이터 수집·분석 및 도메인 의사결정 지원 전문가",
    required_similars: ["ai_intro", "ml", "dl", "prob_stat", "linear_alg", "ds_intro", "bigdata", "db", "regression", "tsa", "dm", "social_method", "fin_data_analysis", "unstruct_dm"],
    recommanded_grade: "AI데이터융합 + Finance&AI + Social Science&AI",
    color: "#06b6d4"
  },
  {
    id: "dis_finance_biz",
    group_number: 5,
    title: "AI 금융 & 비즈니스",
    description: "핀테크, 금융공학, ESG 분석 등 금융 영역의 AI 응용",
    required_similars: ["ai_intro", "ml", "dl", "fin_intro", "fintech", "blockchain", "esg", "fin_data", "ai_ethics", "investment", "algo_trading", "tsa_fin"],
    recommanded_grade: "Finance&AI + AI데이터융합 + 컴퓨터공학부",
    color: "#7c3aed"
  },
  {
    id: "social_innovation_policy",
    group_number: 6,
    title: "AI 사회혁신 & 공공정책",
    description: "AI·데이터 기반 사회문제 해결 및 공공정책/거버넌스 설계",
    required_similars: ["ai_intro", "ml", "dl", "social_method", "regional_data", "ai_ethics", "sna", "text_social", "social_ds", "social_prog", "public_policy", "policy_ai"],
    recommanded_grade: "Social Science&AI + Language&AI + Finance&AI",
    color: "#e11d48"
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
