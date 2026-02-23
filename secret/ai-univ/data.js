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

const courseData = [
  // ===================================
  // 1. ICE (Information & Communication Engineering)
  // ===================================
  { dept: "ICE", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "ICE", grade: 1, semester: 1, name: "이산수학", category: "Major_Sel", credit: 3, similar_id: "discrete_math", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 1, name: "AI프로그래밍기초", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 1, name: "컴퓨팅사고", category: "Major_Req", credit: 3, similar_id: "comp_thinking", layer: "L0", layer_tag: "literacy" },
  { dept: "ICE", grade: 1, semester: 2, name: "신호및시스템", category: "Major_Req", credit: 3, similar_id: "sig_sys", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "AI프로그래밍실습", category: "Major_Sel", credit: 3, similar_id: "prog_lab", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "논리회로및실험", category: "Major_Sel", credit: 3, similar_id: "logic_circuits", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "선형대수", category: "Major_Sel", credit: 3, similar_id: "linear_alg", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "데이터통신", category: "Major_Req", credit: 3, similar_id: "data_comm", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "오픈소스소프트웨어", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 1, name: "AI정보이론", category: "Major_Sel", credit: 3, similar_id: "info_theory", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "eng_math2", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "알고리즘설계와해석", category: "Major_Sel", credit: 3, similar_id: "algo", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "AI컴퓨터구조", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "컴퓨터네트워크", category: "Major_Req", credit: 3, similar_id: "network", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 2, semester: 2, name: "이산신호처리", category: "Major_Sel", credit: 3, similar_id: "dsp", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "머신러닝", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 1, name: "통신공학", category: "Major_Sel", credit: 3, similar_id: "comm_eng", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "디지털통신", category: "Major_Sel", credit: 3, similar_id: "data_comm", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "AI최적화", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "엣지컴퓨팅시스템", category: "Major_Sel", credit: 3, similar_id: "embedded", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 3, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "정보통신기초종합설계", category: "Capstone", credit: 3, similar_id: "capstone_ice", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 1, name: "무선통신공학", category: "Major_Sel", credit: 3, similar_id: "comm_eng", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 2, name: "정보통신종합설계및실습", category: "Capstone", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 2, name: "소프트웨어공학", category: "Major_Sel", credit: 3, similar_id: "se", layer: "L3", layer_tag: "core" },
  { dept: "ICE", grade: 4, semester: 2, name: "차세대이동통신", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },

  // ===================================
  // 2. CSE (Computer Science & Engineering)
  // ===================================
  { dept: "CSE", grade: 1, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "eng_math1", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "CSE", grade: 1, semester: 1, name: "AI프로그래밍(Python)", category: "Major_Sel", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 1, name: "컴퓨터프로그래밍(C)", category: "Major_Sel", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "컴퓨터프로그래밍및실습(C++)", category: "BSM", credit: 3, similar_id: "prog_lab", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "컴퓨터시스템입문", category: "Major_Sel", credit: 3, similar_id: "sys_intro", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "eng_math2", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "데이터사이언스기초", category: "Major_Sel", credit: 3, similar_id: "ds_intro", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "AI·SW프론티어특강", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "오픈소스SW및실습", category: "Major_Sel", credit: 3, similar_id: "opensource", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "논리회로", category: "Major_Sel", credit: 3, similar_id: "logic_circuits", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "선형대수", category: "Major_Sel", credit: 3, similar_id: "linear_alg", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "프로그래밍언어론", category: "Major_Sel", credit: 3, similar_id: "pl", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 1, name: "전기회로", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "기계학습", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "인공지능API활용실습", category: "Major_Sel", credit: 3, similar_id: "ai_app", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "디지털신호처리", category: "Major_Sel", credit: 3, similar_id: "dsp", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "알고리즘", category: "Major_Req", credit: 3, similar_id: "algo", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "웹프로그래밍", category: "Major_Sel", credit: 3, similar_id: "web", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 2, semester: 2, name: "마이크로프로세서및실습", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터비전개론", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "자연어처리개론", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "시스템프로그래밍", category: "Major_Sel", credit: 3, similar_id: "sys_prog", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터구조", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "설계패턴", category: "Major_Sel", credit: 3, similar_id: "se", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 1, name: "컴퓨터그래픽스", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "AI기반컴퓨터비전", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "AI언어모델", category: "Major_Sel", credit: 3, similar_id: "lm_intro", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "딥러닝", category: "Major_Sel", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "소프트웨어공학", category: "Major_Sel", credit: 3, similar_id: "se", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "컴파일러구성론", category: "Major_Sel", credit: 3, similar_id: "compiler", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "지능형메타버스", category: "Major_Sel", credit: 3, similar_id: "metaverse", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "SW산학프로젝트", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 3, semester: 2, name: "게임프로그래밍", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "캡스톤프로젝트", category: "Capstone", credit: 3, similar_id: "capstone_cse", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "그래프마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "온디바이스AI", category: "Major_Sel", credit: 3, similar_id: "embedded", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "AIoT시스템및실습", category: "Major_Sel", credit: 3, similar_id: "iot", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "데이터베이스설계", category: "Major_Sel", credit: 3, similar_id: "db_design", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "클라우드컴퓨팅", category: "Major_Sel", credit: 3, similar_id: "cloud", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "멀티코어컴퓨팅", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "고급문제해결기법및실습", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 1, name: "컴퓨터네트워크", category: "Major_Sel", credit: 3, similar_id: "network", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "멀티모달인공지능", category: "Major_Sel", credit: 3, similar_id: "multimodal", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "AI연구프로젝트및실습", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "심층생성모델", category: "Major_Sel", credit: 3, similar_id: "adv_dl", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "컴퓨터보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "인간컴퓨터상호작용", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "빅데이터처리", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L2", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "SW연구프로젝트및실습", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "CSE", grade: 4, semester: 2, name: "모바일프로그래밍", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },

  // ===================================
  // 3. LAI
  // ===================================
  { dept: "LAI", grade: 1, semester: 1, name: "컴퓨터프로그래밍기초", category: "Major_Req", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "Language&AI수학", category: "Major_Req", credit: 3, similar_id: "lai_math", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 1, name: "인공지능수학", category: "BSM", credit: 3, similar_id: "ai_math", layer: "L1", layer_tag: "core" },
  { dept: "LAI", grade: 1, semester: 2, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
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
  { dept: "LAI", grade: 4, semester: 1, name: "언어공학캡스톤디자인1", category: "Capstone", credit: 3, similar_id: "capstone_lai", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "자연어처리시스템설계", category: "Major_Sel", credit: 3, similar_id: "nlp_sys_design", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "음성처리시스템설계", category: "Major_Sel", credit: 3, similar_id: "asr_sys_design", layer: "L3", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "기계번역특론", category: "Major_Sel", credit: 3, similar_id: "mt", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 4, semester: 2, name: "자동통역특론", category: "Major_Sel", credit: 3, similar_id: "auto_interpre", layer: "L2", layer_tag: "core" },
  { dept: "LAI", grade: 3, semester: 2, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L1", layer_tag: "core" },

  // ===================================
  // 4. SSAI
  // ===================================
  { dept: "SSAI", grade: 1, semester: 1, name: "인공지능수학", category: "Major_Req", credit: 3, similar_id: "ai_math", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 1, name: "컴퓨팅사고", category: "Major_Req", credit: 3, similar_id: "comp_thinking", layer: "L0", layer_tag: "literacy" },
  { dept: "SSAI", grade: 1, semester: 1, name: "인공지능개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "SSAI", grade: 1, semester: 1, name: "AI윤리와철학", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L0", layer_tag: "literacy" },
  { dept: "SSAI", grade: 1, semester: 1, name: "프로그래밍과사회과학", category: "Major_Sel", credit: 3, similar_id: "intro_prog", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 1, name: "사회과학기반디자인씽킹BM", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "SSAI", grade: 1, semester: 2, name: "소셜데이터프로그래밍기초1", category: "Major_Req", credit: 3, similar_id: "social_prog", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "사회과학과데이터사이언스", category: "Major_Req", credit: 3, similar_id: "social_ds", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "기계학습", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "객체지향형프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 1, name: "텍스트기반사회과학데이터분석1", category: "Major_Sel", credit: 3, similar_id: "text_social", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회과학데이터의자료구조", category: "Major_Req", credit: 3, similar_id: "ds", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "알고리즘", category: "Major_Req", credit: 3, similar_id: "algo", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회연결망데이터분석", category: "Major_Sel", credit: 3, similar_id: "sna", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "산업데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "사회과학연구방법론", category: "Major_Req", credit: 3, similar_id: "social_method", layer: "L1", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "딥러닝및응용", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "시계열분석", category: "Major_Sel", credit: 3, similar_id: "tsa", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 1, name: "사회이해기반제품과글로벌비즈", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "SSAI", grade: 3, semester: 1, name: "기술개발연구의이해", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "SSAI", grade: 3, semester: 2, name: "캡스톤디자인1", category: "Capstone", credit: 3, similar_id: "capstone_ssai1", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "AI공정성과편향제거", category: "Major_Sel", credit: 3, similar_id: "ai_gov", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "데이터베이스", category: "Major_Sel", credit: 3, similar_id: "db", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 3, semester: 2, name: "미디어데이터분석실습", category: "Major_Sel", credit: 3, similar_id: "media_data_lab", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "인간인공지능상호작용", category: "Major_Sel", credit: 3, similar_id: "hci", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "AI를활용한정책분석", category: "Major_Sel", credit: 3, similar_id: "policy_ai", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "비즈니스데이터분석실습", category: "Major_Sel", credit: 3, similar_id: "biz_data_lab", layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 1, name: "데이터사이언스캡스톤디자인2", category: "Capstone", credit: 3, similar_id: "capstone_ssai2", layer: "L3", layer_tag: "core" },
  { dept: "SSAI", grade: 4, semester: 2, name: "사회비즈니스애널리틱스", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "SSAI", grade: 4, semester: 2, name: "융합사회과학데이터활용연구", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "SSAI", grade: 4, semester: 2, name: "기술적글쓰기", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "SSAI", grade: 3, semester: 1, name: "비디오생성모델", category: "Major_Sel", credit: 3, similar_id: "video_gen", suggested: true, layer: "L2", layer_tag: "core" },
  { dept: "SSAI", grade: 2, semester: 2, name: "문화특화언어모델", category: "Major_Sel", credit: 3, similar_id: "culture_llm", suggested: true, layer: "L2", layer_tag: "core" },

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
  { dept: "FAI", grade: 2, semester: 1, name: "금융AI보안", category: "Major_Sel", credit: 3, similar_id: "security", layer: "L1", layer_tag: "core" },
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
  { dept: "FAI", grade: 3, semester: 1, name: "Finance&AI전공설계", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 1, name: "AI in Finance사례분석", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "금융데이터사이언스", category: "Major_Sel", credit: 3, similar_id: "fin_ds", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "딥러닝이론및응용", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "자연어처리", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "프롬프트엔지니어링", category: "Major_Sel", credit: 3, similar_id: "prompt_eng", layer: "L1", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "생존분석", category: "Major_Sel", credit: 3, similar_id: "survival", layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 3, semester: 2, name: "Finance&AI진로설계", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "Finance&AI캡스톤디자인", category: "Capstone", credit: 3, similar_id: "capstone_fai", layer: "L3", layer_tag: "core" },
  { dept: "FAI", grade: 4, semester: 1, name: "고급금융시계열분석", category: "Major_Sel", credit: 3, similar_id: "adv_tsa_fin", layer: "L3", layer_tag: "core" },
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
  { dept: "AID", grade: 1, semester: 2, name: "AI프로그래밍", category: "Major_Sel", credit: 3, similar_id: "ai_prog", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 1, semester: 2, name: "빅데이터분석기초", category: "Major_Req", credit: 3, similar_id: "bigdata", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "머신러닝(필수)", category: "Major_Req", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "통계모델링", category: "Major_Sel", credit: 3, similar_id: "stat_model", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "자료구조와알고리즘", category: "Major_Req", credit: 3, similar_id: "ds_algo", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "빅데이터시각화", category: "Major_Sel", credit: 3, similar_id: "viz", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 1, name: "AI거버넌스", category: "Major_Sel", credit: 3, similar_id: "ai_gov", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "빅데이터모델링", category: "Major_Req", credit: 3, similar_id: "bigdata_model", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "딥러닝기초", category: "Major_Req", credit: 3, similar_id: "dl", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "객체지향프로그래밍", category: "Major_Sel", credit: 3, similar_id: "oop", layer: "L1", layer_tag: "core" },
  { dept: "AID", grade: 2, semester: 2, name: "텍스트마이닝기초", category: "Major_Sel", credit: 3, similar_id: "text_mining_basics", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "자연어처리기초", category: "Major_Sel", credit: 3, similar_id: "nlp_intro", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "비정형데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "unstruct_dm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "빅데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "dm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "컴퓨터비전", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "AI데이터융합세미나", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 1, name: "운영체제", category: "Major_Sel", credit: 3, similar_id: "os", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "거대언어모델의기초", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "AI공정성과편향제거", category: "Major_Sel", credit: 3, similar_id: "ai_gov", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "네트워크마이닝", category: "Major_Sel", credit: 3, similar_id: "net_mining", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "시계열데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "tsa_dm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "연구프로젝트및실습", category: "Major_Sel", credit: 3, similar_id: "research_proj", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 3, semester: 2, name: "AI거버넌스프로젝트", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "AI데이터종합설계", category: "Capstone", credit: 3, similar_id: "capstone_aid", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "딥러닝고급", category: "Major_Sel", credit: 3, similar_id: "adv_dl", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "강화학습", category: "Major_Sel", credit: 3, similar_id: "rl", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "다국어텍스트마이닝", category: "Major_Sel", credit: 3, similar_id: "multi_tm", layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 1, name: "앱/웹서비스", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "AI데이터융합논문", category: "Capstone", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "로보틱스", category: "Major_Sel", credit: 3, similar_id: "robotics", layer: "L3", layer_tag: "core" },
  { dept: "AID", grade: 4, semester: 2, name: "스타트업비즈니스", category: "Major_Sel", credit: 3, similar_id: "startup", layer: "L3", layer_tag: "core" },
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
  // 9. MATH (수학과)
  // ===================================
  { dept: "MATH", grade: 1, semester: 1, name: "미적분학및연습1", category: "Major_Req", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy" },
  { dept: "MATH", grade: 1, semester: 2, name: "미적분학및연습2", category: "Major_Req", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy" },
  { dept: "MATH", grade: 1, semester: 1, name: "이산수학및연습", category: "Major_Req", credit: 3, similar_id: "discrete_math", layer: "L0", layer_tag: "literacy" },
  { dept: "MATH", grade: 1, semester: 1, name: "논리 및 기초 프로그래밍", category: "Major_Req", credit: 3, similar_id: "prog_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "MATH", grade: 1, semester: 1, name: "확률과통계", category: "Major_Req", credit: 3, similar_id: "prob_stat", layer: "L0", layer_tag: "literacy" },
  { dept: "MATH", grade: 2, semester: 1, name: "해석학개론1", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "MATH", grade: 2, semester: 2, name: "해석학개론2", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "MATH", grade: 2, semester: 1, name: "선형대수및연습1", category: "Major_Req", credit: 3, similar_id: "linear_algebra", layer: "L1", layer_tag: "core" },
  { dept: "MATH", grade: 2, semester: 2, name: "선형대수및연습2", category: "Major_Req", credit: 3, similar_id: "linear_algebra", layer: "L1", layer_tag: "core" },
  { dept: "MATH", grade: 2, semester: 1, name: "미분방정식", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "MATH", grade: 2, semester: 2, name: "거리공간론", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "MATH", grade: 2, semester: 1, name: "전산수학", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "MATH", grade: 2, semester: 1, name: "컴퓨팅사고입문", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "literacy" },
  { dept: "MATH", grade: 3, semester: 1, name: "다변수해석학", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "MATH", grade: 3, semester: 1, name: "현대대수학1", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "MATH", grade: 3, semester: 1, name: "위상수학", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "MATH", grade: 3, semester: 1, name: "확률론", category: "Major_Sel", credit: 3, similar_id: "prob_theory", layer: "L2", layer_tag: "core" },
  { dept: "MATH", grade: 3, semester: 2, name: "수리금융학", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "MATH", grade: 3, semester: 1, name: "수학으로이해하는기계학습1", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "MATH", grade: 3, semester: 2, name: "수학으로이해하는기계학습2", category: "Major_Sel", credit: 3, similar_id: "ml", layer: "L2", layer_tag: "core" },
  { dept: "MATH", grade: 4, semester: 1, name: "현대대수학2", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "MATH", grade: 4, semester: 1, name: "실변수함수론", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "MATH", grade: 4, semester: 2, name: "복소변수함수론", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "MATH", grade: 4, semester: 1, name: "보험수학", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "MATH", grade: 4, semester: 2, name: "채권수학", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "MATH", grade: 4, semester: 1, name: "알고리즘및계산이론", category: "Major_Sel", credit: 3, similar_id: "algo", layer: "L3", layer_tag: "core" },

  // ===================================
  // 10. PA (행정학과)
  // ===================================
  { dept: "PA", grade: 1, semester: 1, name: "행정학개론", category: "Major_Req", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "PA", grade: 1, semester: 2, name: "정책학개론", category: "Major_Req", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "PA", grade: 1, semester: 1, name: "행정과 경제이론", category: "Major_Sel", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "PA", grade: 1, semester: 2, name: "사회문제와 행정", category: "Major_Sel", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "PA", grade: 2, semester: 1, name: "공공관리론", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "PA", grade: 2, semester: 1, name: "행정조직론", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "PA", grade: 2, semester: 1, name: "재정학과 공공정책", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "PA", grade: 2, semester: 1, name: "지방정부론", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "PA", grade: 2, semester: 2, name: "조사방법론", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "PA", grade: 2, semester: 2, name: "인사행정론", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "PA", grade: 2, semester: 2, name: "재무행정론", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "PA", grade: 2, semester: 2, name: "조세재정론", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 1, name: "행정계량분석", category: "Major_Req", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "PA", grade: 3, semester: 1, name: "정책평가론", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 1, name: "정책PR론", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 1, name: "국제행정론", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 2, name: "빅데이터와증거기반정책", category: "Major_Sel", credit: 3, similar_id: "bigdata", layer: "L2", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 2, name: "AI와 행정", category: "Major_Sel", credit: 3, similar_id: "ai_gov", layer: "L2", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 2, name: "정책분석론", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 2, name: "조직관리론", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "app" },
  { dept: "PA", grade: 3, semester: 1, name: "정책사례연구(캡스톤디자인)", category: "Capstone", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "PA", grade: 4, semester: 1, name: "정부규제론", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "PA", grade: 4, semester: 1, name: "정책논증", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "PA", grade: 4, semester: 1, name: "행정문화론", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "PA", grade: 4, semester: 2, name: "환경정책론", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "PA", grade: 4, semester: 2, name: "사회복지정책론", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "PA", grade: 4, semester: 2, name: "공공리더십론", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "PA", grade: 4, semester: 2, name: "행정학특강", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app" },

  // ===================================
  // 11. EE (전자공학과)
  // ===================================
  // 1학년
  { dept: "EE", grade: 1, semester: 1, name: "기초미적분학1", category: "BSM", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 1, semester: 2, name: "기초미적분학2", category: "BSM", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 1, semester: 1, name: "일반물리1", category: "BSM", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 1, semester: 2, name: "일반물리2", category: "BSM", credit: 3, layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 1, semester: 1, name: "AI공학개론", category: "BSM", credit: 3, similar_id: "ai_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 1, semester: 1, name: "컴퓨터프로그래밍", category: "BSM", credit: 3, similar_id: "prog_intro", layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 1, semester: 2, name: "확률과통계", category: "BSM", credit: 3, similar_id: "prob_stat", layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 1, semester: 2, name: "디지털공학", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  // 2학년
  { dept: "EE", grade: 2, semester: 1, name: "공업수학1", category: "BSM", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 2, semester: 2, name: "공업수학2", category: "BSM", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy" },
  { dept: "EE", grade: 2, semester: 1, name: "신호및시스템", category: "Major_Req", credit: 3, similar_id: "sig_sys", layer: "L1", layer_tag: "core" },
  { dept: "EE", grade: 2, semester: 1, name: "자료구조및알고리즘", category: "Major_Sel", credit: 3, similar_id: "algo", layer: "L1", layer_tag: "core" },
  { dept: "EE", grade: 2, semester: 1, name: "디지털기초설계및실습", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "EE", grade: 2, semester: 1, name: "전기회로", category: "Major_Req", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "EE", grade: 2, semester: 1, name: "전자기학", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "EE", grade: 2, semester: 2, name: "컴퓨터구조", category: "Major_Sel", credit: 3, similar_id: "arch", layer: "L1", layer_tag: "core" },
  { dept: "EE", grade: 2, semester: 2, name: "전자공학실험", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  { dept: "EE", grade: 2, semester: 2, name: "물리전자", category: "Major_Sel", credit: 3, layer: "L1", layer_tag: "core" },
  // 3학년
  { dept: "EE", grade: 3, semester: 1, name: "디지털신호처리", category: "Major_Sel", credit: 3, similar_id: "dsp", layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 1, name: "통신이론", category: "Major_Sel", credit: 3, similar_id: "data_comm", layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 1, name: "공학설계프로그래밍", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 1, name: "마이크로프로세서및실습", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 1, name: "HDL응용설계", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 1, name: "전자회로설계", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 1, name: "집적회로공학", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 2, name: "디지털통신", category: "Major_Sel", credit: 3, similar_id: "data_comm", layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 2, name: "데이터통신", category: "Major_Sel", credit: 3, similar_id: "network", layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 2, name: "프로세서응용종합설계", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  { dept: "EE", grade: 3, semester: 2, name: "전자회로응용및실습", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core" },
  // 4학년
  { dept: "EE", grade: 4, semester: 1, name: "이동통신", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "EE", grade: 4, semester: 1, name: "디지털집적회로설계", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "EE", grade: 4, semester: 1, name: "RF집적회로설계", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "EE", grade: 4, semester: 1, name: "전자공학종합설계프로젝트", category: "Capstone", credit: 3, layer: "L3", layer_tag: "app" },
  { dept: "EE", grade: 4, semester: 2, name: "통신네트워크프로그래밍", category: "Major_Sel", credit: 3, similar_id: "network", layer: "L3", layer_tag: "core" },
  { dept: "EE", grade: 4, semester: 2, name: "SOC설계", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },
  { dept: "EE", grade: 4, semester: 2, name: "아날로그집적회로설계", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core" },

  // ===================================
  // 12. Track-Proposed New Courses (Suggested — from departmentTracks plan)
  // ===================================
  // CSE — 의료 AI 트랙 (기초과학 대용 과목들)
  { dept: "CSE", grade: 1, semester: 1, name: "공업수학1(or 기초미적분1)", category: "BSM", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy", suggested: true },
  { dept: "CSE", grade: 1, semester: 2, name: "공업수학2(or 기초미적분2)", category: "BSM", credit: 3, similar_id: "calculus", layer: "L0", layer_tag: "literacy", suggested: true },

  // ICE — 온디바이스 AI 트랙
  { dept: "ICE", grade: 3, semester: 2, name: "클라우드네이티브컴퓨팅", category: "Major_Sel", credit: 3, similar_id: "cloud", layer: "L2", layer_tag: "core", suggested: true },
  { dept: "ICE", grade: 4, semester: 1, name: "경량AI모델설계", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core", suggested: true },
  { dept: "ICE", grade: 4, semester: 2, name: "온디바이스AI시스템", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "core", suggested: true },

  // LAI — 다언어 AI 트랙
  { dept: "LAI", grade: 1, semester: 2, name: "AI윤리와철학", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L0", layer_tag: "literacy", suggested: true },
  { dept: "LAI", grade: 4, semester: 2, name: "언어공학캡스톤디자인2", category: "Capstone", credit: 3, layer: "L3", layer_tag: "app", suggested: true },

  // AID — 피지컬 AI 트랙
  { dept: "AID", grade: 1, semester: 1, name: "AI철학과윤리", category: "BSM", credit: 3, similar_id: "ai_ethics", layer: "L0", layer_tag: "literacy", suggested: true },
  { dept: "AID", grade: 3, semester: 1, name: "영상처리", category: "Major_Sel", credit: 3, similar_id: "cv", layer: "L2", layer_tag: "core", suggested: true },
  // AID — 데이터사이언스 트랙
  { dept: "AID", grade: 3, semester: 2, name: "네트워크데이터마이닝", category: "Major_Sel", credit: 3, similar_id: "net_mining", layer: "L2", layer_tag: "core", suggested: true },

  // FAI — 금융 AI 트랙
  { dept: "FAI", grade: 3, semester: 1, name: "거대언어모델", category: "Major_Sel", credit: 3, similar_id: "advanced_llm", layer: "L2", layer_tag: "core", suggested: true },
  { dept: "FAI", grade: 4, semester: 1, name: "Finance&AI 캡스톤디자인", category: "Capstone", credit: 3, layer: "L3", layer_tag: "app", suggested: true },
  // FAI — Quant 트랙
  { dept: "FAI", grade: 3, semester: 2, name: "수리금융이론", category: "Major_Sel", credit: 3, layer: "L2", layer_tag: "core", suggested: true },

  // SSAI — 소셜데이터사이언스 트랙
  { dept: "SSAI", grade: 4, semester: 1, name: "멀티모달생산성AI활용", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app", suggested: true },
  { dept: "SSAI", grade: 4, semester: 1, name: "Product구현의실무", category: "Major_Sel", credit: 3, layer: "L3", layer_tag: "app", suggested: true },

  // ===================================
  // 12. Graduate / New L4 Courses (Suggested)
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
    axPartners: ["ELLT학과", "국가전략언어대학", "아시아언어문화대학", "통번역대학원"],
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
  { name: "장익범", dept: "CSE", position: "조교수", major: "전기및컴퓨터공학",  keywords: ["자율비행 AI 소프트웨어"] },
  { name: "지수연", dept: "CSE", position: "조교수", major: "전기정보공학",      keywords: ["의료인공지능"] },
  { name: "전병환", dept: "CSE", position: "조교수", major: "의과학",            keywords: ["의료 AI", "의료영상 분석", "딥러닝"] },
  { name: "이재혁", dept: "CSE", position: "교수",   major: "전기및전자공학",    keywords: ["로봇 제어시스템"] },
  { name: "윤일동", dept: "CSE", position: "교수",   major: "제어계측공학",      keywords: ["영상처리"] },
  { name: "정유진", dept: "CSE", position: "교수",   major: "컴퓨터공학",        keywords: ["알고리즘"] },
  { name: "최재영", dept: "CSE", position: "교수",   major: "전기및전자공학",    keywords: ["머신러닝"] },
  { name: "이준현", dept: "CSE", position: "조교수", major: "컴퓨터과학",        keywords: ["그래프 AI", "딥러닝"] },
  { name: "곽호진", dept: "CSE", position: "조교수", major: "",                  keywords: [] },

  // ── Language & AI (LAI) ────────────────────────────────────────────
  { name: "장태엽", dept: "LAI", position: "교수",   major: "언어학",        keywords: ["음성처리·음성공학", "기계번역", "음성 자동평가", "다국어 AI"], role: "AI융합대학장" },
  { name: "이재홍", dept: "LAI", position: "조교수", major: "융합전자",      keywords: ["통계 머신러닝", "음성/오디오 AI"] },
  { name: "박준형", dept: "LAI", position: "조교수", major: "소프트웨어",    keywords: ["자연어처리(NLP)", "언어모델"] },
  { name: "김예찬", dept: "LAI", position: "조교수", major: "인공지능학",    keywords: ["자연어처리", "음성·언어 AI"] },
  { name: "최승택", dept: "LAI", position: "조교수", major: "컴퓨터과학",    keywords: ["생성형 AI", "멀티모달 AI"] },
  { name: "김주애", dept: "LAI", position: "조교수", major: "컴퓨터공학",    keywords: ["자연어처리", "AI 교육"], deptNote: "LAI·ELLT 겸임" },

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
  { name: "차민철", dept: "SSAI", position: "조교수", major: "산업공학",          keywords: ["인간-AI 상호작용"], deptNote: "SSAI·미디어 겸임" },

  // ── ELLT학과 (AX 협력) ─────────────────────────────────────────────
  { name: "김지은", dept: "ELLT", position: "교수", major: "전산언어학",  keywords: ["전산언어학", "언어·AI", "언어정보처리"] },
  { name: "권익수", dept: "ELLT", position: "교수", major: "언어학",      keywords: ["인지언어학", "AI 언어처리", "언어표준화"] },
  { name: "조수경", dept: "ELLT", position: "교수", major: "언어습득론",  keywords: ["언어 습득", "영어교육·AI"] },

  // ── 미디어커뮤니케이션학부 (AX 협력) ──────────────────────────────
  { name: "이상욱", dept: "MEDIA", position: "조교수", major: "커뮤니케이션학", keywords: ["뉴미디어 기술", "과학 커뮤니케이션"] },

  // ── 산업경영공학과 (AX 협력) ──────────────────────────────────────
  { name: "Bernardo Nugroho Yahya", dept: "IME", position: "교수", major: "산업공학",       keywords: ["데이터마이닝", "프로세스마이닝", "IoT 기반 자동화"] },
  { name: "이충목",                 dept: "IME", position: "교수", major: "산업시스템공학", keywords: ["최적화(OR)", "스마트 제조"] },
];

// Assign to window
window.departments = departments;
window.courseData = courseData;
window.tracks = tracks;
window.microDegrees = microDegrees;
window.departmentTracks = departmentTracks;
window.facultyData = facultyData;
