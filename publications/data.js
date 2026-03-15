// Publications data — add new entries at the top of the array.
// Fields:
//   id, type (conference|journal|workshop|arxiv), title, authors, venue, year, url
//   authors[].self          — underlined (you)
//   authors[].equal         — * equal contribution
//   authors[].corresponding — † corresponding author
//   note                    — optional plain-text note shown in parentheses
//   related                 — optional [{text, url}] for model/code links
const PUBLICATIONS = [
  {
    "id": "C25",
    "type": "conference",
    "title": "Towards Fully-Automated Materials Discovery via Large-Scale Synthesis Dataset and Expert-Level LLM-as-a-Judge",
    "authors": [
      {"name": "Heegyu Kim"},
      {"name": "Taeyang Jeon"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Ji Hoon Hong"},
      {"name": "Dong Won Jeon"},
      {"name": "Ga-Yeon Baek"},
      {"name": "Gyeong-Won Kwak"},
      {"name": "Dong-Hee Lee"},
      {"name": "Jisu Bae"},
      {"name": "Chihoon Lee"},
      {"name": "Yunseo Kim"},
      {"name": "Seon-Jin Choi"},
      {"name": "Jin-Seong Park"},
      {"name": "Sung Beom Cho"},
      {"name": "Hyunsouk Cho", "corresponding": true}
    ],
    "venue": "CIKM",
    "year": 2025,
    "url": "https://arxiv.org/pdf/2502.16457",
    "note": null
  },
  {
    "id": "C24",
    "type": "conference",
    "title": "Rethinking the Training Paradigm of Discrete Token-Based Multimodal LLMs: An Analysis of Text-Centric Bias",
    "authors": [
      {"name": "Wansik Jo"},
      {"name": "Jooyeong Na"},
      {"name": "Soyeon Hong"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Hyunsouk Cho", "corresponding": true}
    ],
    "venue": "CIKM",
    "year": 2025,
    "url": "https://dl.acm.org/doi/10.1145/3746252.3761264",
    "note": null
  },
  {
    "id": "J4",
    "type": "journal",
    "title": "Overcoming Source Object Grounding for Semantic Image Editing",
    "authors": [
      {"name": "Yeonjoon Jung"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "TACL",
    "year": 2025,
    "url": "https://direct.mit.edu/tacl/article/doi/10.1162/TACL.a.34/133180/Overcoming-Source-Object-Grounding-for-Semantic",
    "note": null
  },
  {
    "id": "A2",
    "type": "arxiv",
    "title": "Trillion 7B Technical Report",
    "authors": [
      {"name": "Sungjun Han"},
      {"name": "Juyoung Suk"},
      {"name": "Suyeong An"},
      {"name": "Hyungguk Kim"},
      {"name": "Kyuseok Kim"},
      {"name": "Wonsuk Yang"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Jamin Shin"}
    ],
    "affiliation": "Trillion Labs",
    "venue": "arXiv",
    "year": 2025,
    "url": "https://arxiv.org/pdf/2504.15431",
    "note": "technical report",
    "related": [
      {"text": "Trillion-7B-preview", "url": "https://huggingface.co/trillionlabs/Trillion-7B-preview"}
    ]
  },
  {
    "id": "C23",
    "type": "conference",
    "title": "FLEX: Expert-level False-Less EXecution Metric for Reliable Text-to-SQL Benchmark",
    "authors": [
      {"name": "Heegyu Kim"},
      {"name": "Taeyang Jeong"},
      {"name": "Seunghwan Choi"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Hyunsouk Cho", "corresponding": true}
    ],
    "venue": "NAACL",
    "year": 2025,
    "url": "https://arxiv.org/pdf/2409.19014",
    "note": null
  },
  {
    "id": "J3",
    "type": "journal",
    "title": "ScoreCL: Augmentation-Adaptive Contrastive Learning via Score-Matching Function",
    "authors": [
      {"name": "Jin-Young Kim", "corresponding": true},
      {"name": "Soonwoo Kwon"},
      {"name": "Hyojun Go"},
      {"name": "Yunsung Lee"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Hyun-Gyoon Kim", "corresponding": true}
    ],
    "venue": "Machine Learning",
    "year": 2025,
    "url": "https://arxiv.org/pdf/2306.04175",
    "note": null
  },
  {
    "id": "C22",
    "type": "conference",
    "title": "Interventional Speech Noise Injection for ASR Generalizable Spoken Language Understanding",
    "authors": [
      {"name": "Yeonjoon Jung"},
      {"name": "Jaseseong Lee"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Dohyeon Lee"},
      {"name": "Minsoo Kim"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "EMNLP",
    "year": 2024,
    "url": "https://arxiv.org/pdf/2410.15609",
    "note": null
  },
  {
    "id": "A1",
    "type": "arxiv",
    "title": "Efficient and Effective Vocabulary Expansion Towards Multilingual Large Language Models",
    "authors": [
      {"name": "Seungduk Kim", "equal": true},
      {"name": "Seungtaek Choi", "self": true, "equal": true},
      {"name": "Myeongho Jeong"}
    ],
    "venue": "arXiv",
    "year": 2024,
    "url": "https://arxiv.org/pdf/2402.14714.pdf",
    "note": "technical report",
    "related": [
      {"text": "EEVE-Korean-10.8B", "url": "https://huggingface.co/yanolja/EEVE-Korean-10.8B-v1.0"}
    ]
  },
  {
    "id": "C21",
    "type": "conference",
    "title": "Multi-Architecture Multi-Expert Diffusion Models",
    "authors": [
      {"name": "Yunsung Lee", "equal": true},
      {"name": "JinYoung Kim", "equal": true},
      {"name": "Hyojun Go", "equal": true},
      {"name": "Myeongho Jeong"},
      {"name": "Shinhyeok Oh"},
      {"name": "Seungtaek Choi", "self": true, "corresponding": true}
    ],
    "venue": "AAAI",
    "year": 2024,
    "url": "https://arxiv.org/pdf/2306.04990.pdf",
    "note": null
  },
  {
    "id": "C20",
    "type": "conference",
    "title": "Addressing Negative Transfer in Diffusion Models",
    "authors": [
      {"name": "Hyojun Go", "equal": true},
      {"name": "JinYoung Kim", "equal": true},
      {"name": "Yunsung Lee", "equal": true},
      {"name": "Seunghyun Lee", "equal": true},
      {"name": "Shinhyeok Oh"},
      {"name": "Hyeongdon Moon"},
      {"name": "Seungtaek Choi", "self": true, "corresponding": true}
    ],
    "venue": "NeurIPS",
    "year": 2023,
    "url": "https://arxiv.org/pdf/2306.00354.pdf",
    "note": null
  },
  {
    "id": "C19",
    "type": "conference",
    "title": "Addressing Cold Start Problem for End-to-end Automatic Speech Scoring",
    "authors": [
      {"name": "Jungbae Park"},
      {"name": "Seungtaek Choi", "self": true, "corresponding": true}
    ],
    "venue": "INTERSPEECH",
    "year": 2023,
    "url": "https://arxiv.org/pdf/2306.14310.pdf",
    "note": null
  },
  {
    "id": "C18",
    "type": "conference",
    "title": "Cross Encoding As Augmentation: Towards Effective Educational Text Classification",
    "authors": [
      {"name": "Hyun Seung Lee", "equal": true},
      {"name": "Seungtaek Choi", "self": true, "equal": true, "corresponding": true},
      {"name": "Yunsung Lee"},
      {"name": "Hyeongdon Moon"},
      {"name": "Shinhyeok Oh"},
      {"name": "Myeongho Jeong"},
      {"name": "Hyojun Go"},
      {"name": "Christian Wallraven"}
    ],
    "venue": "Findings of ACL",
    "year": 2023,
    "url": "https://arxiv.org/pdf/2305.18977.pdf",
    "note": null
  },
  {
    "id": "C17",
    "type": "conference",
    "title": "Evaluation of Question Generation Needs More References",
    "authors": [
      {"name": "Shinhyeok Oh", "equal": true},
      {"name": "Hyojun Go", "equal": true},
      {"name": "Hyeongdon Moon"},
      {"name": "Yunsung Lee"},
      {"name": "Myeongho Jeong"},
      {"name": "Hyun Seung Lee"},
      {"name": "Seungtaek Choi", "self": true, "corresponding": true}
    ],
    "venue": "Findings of ACL",
    "year": 2023,
    "url": "https://arxiv.org/pdf/2305.16626.pdf",
    "note": null
  },
  {
    "id": "C16",
    "type": "conference",
    "title": "Retrieval-augmented Instructional Video Encoding for Dense Video Captioning",
    "authors": [
      {"name": "Yeonjoon Jung"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Seung-won Hwang", "corresponding": true},
      {"name": "Jihyuk Kim"},
      {"name": "Minji Seo"},
      {"name": "Minsoo Kim"}
    ],
    "venue": "Findings of ACL",
    "year": 2023,
    "url": "https://aclanthology.org/2023.findings-acl.543.pdf",
    "note": null
  },
  {
    "id": "C15",
    "type": "conference",
    "title": "On Complementarity Objectives for Hybrid Retrieval",
    "authors": [
      {"name": "Dohyeon Lee"},
      {"name": "Seung-won Hwang", "corresponding": true},
      {"name": "Kyungjae Lee"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Sunghyun Park"}
    ],
    "venue": "ACL",
    "year": 2023,
    "url": "https://aclanthology.org/2023.acl-long.746.pdf",
    "note": null
  },
  {
    "id": "C14",
    "type": "conference",
    "title": "Towards Practical Plug-and-Play Diffusion Models",
    "authors": [
      {"name": "Hyojun Go", "equal": true},
      {"name": "Yunsung Lee", "equal": true},
      {"name": "JinYoung Kim", "equal": true},
      {"name": "Seunghyun Lee"},
      {"name": "Myeongho Jeong"},
      {"name": "Hyun Seung Lee"},
      {"name": "Seungtaek Choi", "self": true, "corresponding": true}
    ],
    "venue": "CVPR",
    "year": 2023,
    "url": "https://arxiv.org/pdf/2212.05973.pdf",
    "note": null
  },
  {
    "id": "C13",
    "type": "conference",
    "title": "Evaluating the Knowledge Dependency of Questions",
    "authors": [
      {"name": "Hyeongdon Moon", "equal": true},
      {"name": "Yoonseok Yang", "equal": true},
      {"name": "Jamin Shin"},
      {"name": "Hangyeol Yu"},
      {"name": "Seunghyun Lee"},
      {"name": "Myeongho Jeong"},
      {"name": "Juneyoung Park"},
      {"name": "Minsam Kim"},
      {"name": "Seungtaek Choi", "self": true, "corresponding": true}
    ],
    "venue": "EMNLP",
    "year": 2022,
    "url": "https://aclanthology.org/2022.emnlp-main.718.pdf",
    "note": null
  },
  {
    "id": "C12",
    "type": "conference",
    "title": "Towards Compositional Generalization in Code Search",
    "authors": [
      {"name": "Hojae Han"},
      {"name": "Seung-won Hwang", "corresponding": true},
      {"name": "Shuai Lu"},
      {"name": "Nan Duan"},
      {"name": "Seungtaek Choi", "self": true}
    ],
    "venue": "EMNLP",
    "year": 2022,
    "url": "https://aclanthology.org/2022.emnlp-main.737.pdf",
    "note": "short"
  },
  {
    "id": "C11",
    "type": "conference",
    "title": "Debiasing Event Understanding for Visual Commonsense Tasks",
    "authors": [
      {"name": "Minji Seo", "equal": true},
      {"name": "Yeonjoon Jung", "equal": true},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Seung-won Hwang", "corresponding": true},
      {"name": "Bei Liu"}
    ],
    "venue": "Findings of ACL",
    "year": 2022,
    "url": "https://aclanthology.org/2022.findings-acl.65.pdf",
    "note": null
  },
  {
    "id": "C10",
    "type": "conference",
    "title": "C\u00B2L: Causally Contrastive Learning for Robust Text Classification",
    "authors": [
      {"name": "Seungtaek Choi", "self": true, "equal": true},
      {"name": "Myeongho Jeong", "equal": true},
      {"name": "Hojae Han"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "AAAI",
    "year": 2022,
    "url": "https://ojs.aaai.org/index.php/AAAI/article/view/21296",
    "note": null
  },
  {
    "id": "C9",
    "type": "conference",
    "title": "Structure-Augmented Keyphrase Generation",
    "authors": [
      {"name": "Jihyuk Kim"},
      {"name": "Myeongho Jeong"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "EMNLP",
    "year": 2021,
    "url": "https://aclanthology.org/2021.emnlp-main.209.pdf",
    "note": null
  },
  {
    "id": "C8",
    "type": "conference",
    "title": "Counterfactual Generative Smoothing for Imbalanced Natural Language Classification",
    "authors": [
      {"name": "Hojae Han"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Myeongho Jeong"},
      {"name": "Jin-woo Park"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "CIKM",
    "year": 2021,
    "url": "https://dl.acm.org/doi/pdf/10.1145/3459637.3482077",
    "note": "short"
  },
  {
    "id": "J2",
    "type": "journal",
    "title": "Label and Context Augmentation for Response Selection at DSTC8",
    "authors": [
      {"name": "Myeongho Jeong", "equal": true},
      {"name": "Seungtaek Choi", "self": true, "equal": true},
      {"name": "Jinyoung Yeo"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "TASLP",
    "year": 2021,
    "url": "https://ieeexplore.ieee.org/document/9420274",
    "note": "2nd/3rd prize at DSTC8 Track2 Sub-task1"
  },
  {
    "id": "W1",
    "type": "workshop",
    "title": "Label-Efficient Training for Next Response Selection",
    "authors": [
      {"name": "Seungtaek Choi", "self": true, "equal": true},
      {"name": "Myeongho Jeong", "equal": true},
      {"name": "Jinyoung Yeo"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "SustaiNLP @ EMNLP",
    "year": 2020,
    "url": "https://www.aclweb.org/anthology/2020.sustainlp-1.22.pdf",
    "note": null
  },
  {
    "id": "C7",
    "type": "conference",
    "title": "Retrieval-Augmented Controllable Review Generation",
    "authors": [
      {"name": "Jihyeok Kim"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Reinald Kim Amplayo"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "COLING",
    "year": 2020,
    "url": "https://www.aclweb.org/anthology/2020.coling-main.207.pdf",
    "note": null
  },
  {
    "id": "C6",
    "type": "conference",
    "title": "Less is More: Attention Supervision with Counterfactuals for Text Classification",
    "authors": [
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Haeju Park"},
      {"name": "Jinyoung Yeo"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "EMNLP",
    "year": 2020,
    "url": "https://www.aclweb.org/anthology/2020.emnlp-main.543.pdf",
    "note": null
  },
  {
    "id": "C5",
    "type": "conference",
    "title": "Conditional Response Augmentation for Dialogue using Knowledge Distillation",
    "authors": [
      {"name": "Myeongho Jeong", "equal": true},
      {"name": "Seungtaek Choi", "self": true, "equal": true},
      {"name": "Hojae Han"},
      {"name": "Kyungho Kim"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "INTERSPEECH",
    "year": 2020,
    "url": "http://www.interspeech2020.org/uploadfile/pdf/Thu-1-9-2.pdf",
    "note": null
  },
  {
    "id": "J1",
    "type": "journal",
    "title": "Meta-Supervision for Attention using Counterfactual Estimation",
    "authors": [
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Haeju Park"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "DSEJ",
    "year": 2020,
    "url": "https://link.springer.com/content/pdf/10.1007/s41019-020-00119-z.pdf",
    "note": "Highly Rated ICDM Issue Invitation"
  },
  {
    "id": "C4",
    "type": "conference",
    "title": "Counterfactual Attention Supervision",
    "authors": [
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Haeju Park"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "ICDM",
    "year": 2019,
    "url": "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=8970893",
    "note": "short"
  },
  {
    "id": "C3",
    "type": "conference",
    "title": "MICRON: Multigranular Interaction for Contextualizing Representation in Non-factoid Question Answering",
    "authors": [
      {"name": "Hojae Han", "equal": true},
      {"name": "Seungtaek Choi", "self": true, "equal": true},
      {"name": "Haeju Park"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "EMNLP",
    "year": 2019,
    "url": "https://www.aclweb.org/anthology/D19-1601.pdf",
    "note": "short"
  },
  {
    "id": "C2",
    "type": "conference",
    "title": "Visual Choice of Plausible Alternatives: An Evaluation of Image-based Commonsense Causal Reasoning",
    "authors": [
      {"name": "Jinyoung Yeo"},
      {"name": "Gyungbok Lee", "equal": true},
      {"name": "Gengyu Wang", "equal": true},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Hyunsouk Cho"},
      {"name": "Reinald Kim Amplayo"},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "LREC",
    "year": 2018,
    "url": "https://www.aclweb.org/anthology/L18-1316.pdf",
    "note": null
  },
  {
    "id": "C1",
    "type": "conference",
    "title": "Machine-translated Knowledge Transfer for Commonsense Causal Reasoning",
    "authors": [
      {"name": "Jinyoung Yeo"},
      {"name": "Gengyu Wang"},
      {"name": "Hyunsouk Cho"},
      {"name": "Seungtaek Choi", "self": true},
      {"name": "Seung-won Hwang", "corresponding": true}
    ],
    "venue": "AAAI",
    "year": 2018,
    "url": "https://ojs.aaai.org/index.php/AAAI/article/view/11575/11434",
    "note": null
  }
];
