const contentUrl = "./assets/data/content.json";
const STORAGE_KEY = "readerPreferences";
const THEME_ORDER = ["paper", "sepia", "night"];
const FONT_MIN = 15;
const FONT_MAX = 28;
const MOBILE_BREAKPOINT = 760;
const DEFAULT_FONT_SIZE = {
  desktop: 20,
  mobile: 17,
};
const THEME_LABELS = {
  paper: "纸张",
  sepia: "暖棕",
  night: "夜读",
};
const HOME_SECTION_ORDER = ["light-series", "plain-book", "overview", "book", "terms", "ai-book"];
const STARTER_GUIDE = Object.freeze([
  {
    sourcePath: "研究文稿/04_议论与说明/差结构学习法是什么_对外主句与入口说明.md",
    eyebrow: "30 秒理解",
    title: "先把主句说稳",
    copy: "先用一句话弄清项目是什么、不是什么，再决定是否继续进入。",
  },
  {
    sourcePath: "研究文稿/08_轻内容连载/01_世界先给人的不是物，而是不同.md",
    eyebrow: "1 分钟进入",
    title: "先用一条轻内容上手",
    copy: "先体验这套方法怎样从“不同”开始，而不是一开始就撞进大词。",
  },
  {
    sourcePath: "研究文稿/07_书稿/白话卷/00_卷首_怎么读这本白话卷.md",
    eyebrow: "10 分钟起步",
    title: "再切到白话卷",
    copy: "当你准备连续阅读时，让白话卷接住后续主线，而不是直接冲向整套书稿。",
  },
]);
const PLAIN_TO_BOOK_VARIANT_PATHS = Object.freeze({
  "研究文稿/07_书稿/白话卷/00_卷首_怎么读这本白话卷.md":
    "研究文稿/07_书稿/第1章_绪论.md",
  "研究文稿/07_书稿/白话卷/第1章_世界先给人的不是物而是不同.md":
    "研究文稿/07_书稿/第2章_力的落差概念的严格化.md",
  "研究文稿/07_书稿/白话卷/第2章_不同怎样长成边界、对象和结构.md":
    "研究文稿/07_书稿/第3章_非均匀性与经典结构形成.md",
  "研究文稿/07_书稿/白话卷/第3章_规则不是天上掉下来的而是站住的重复.md":
    "研究文稿/07_书稿/第5章_规则形成的分层理论.md",
  "研究文稿/07_书稿/白话卷/第4章_光、生命与基因其实在同一条线上.md":
    "研究文稿/07_书稿/第6章_光速、因果结构与时空约束.md",
  "研究文稿/07_书稿/白话卷/第5章_思考、意识和自我是世界在自己里面再长一层.md":
    "研究文稿/07_书稿/第8章_思考的物理实现与认知生成.md",
  "研究文稿/07_书稿/白话卷/第6章_文明就是规则开始写到身体外面.md":
    "研究文稿/07_书稿/专题_生命、基因与文明的层级必然性.md",
  "研究文稿/07_书稿/白话卷/第7章_把整套理论压成一条人人能走通的线.md":
    "研究文稿/07_书稿/第11章_统一结论.md",
  "研究文稿/07_书稿/白话卷/第8章_影响是存在的_理论如何进入人的判断与行动.md":
    "研究文稿/07_书稿/专题_反思辩证模块_让质疑成为理论生长的回路.md",
});
const BOOK_TO_PLAIN_VARIANT_PATHS = Object.freeze({
  "研究文稿/07_书稿/第1章_绪论.md":
    "研究文稿/07_书稿/白话卷/00_卷首_怎么读这本白话卷.md",
  "研究文稿/07_书稿/第2章_力的落差概念的严格化.md":
    "研究文稿/07_书稿/白话卷/第1章_世界先给人的不是物而是不同.md",
  "研究文稿/07_书稿/第3章_非均匀性与经典结构形成.md":
    "研究文稿/07_书稿/白话卷/第2章_不同怎样长成边界、对象和结构.md",
  "研究文稿/07_书稿/第5章_规则形成的分层理论.md":
    "研究文稿/07_书稿/白话卷/第3章_规则不是天上掉下来的而是站住的重复.md",
  "研究文稿/07_书稿/第6章_光速、因果结构与时空约束.md":
    "研究文稿/07_书稿/白话卷/第4章_光、生命与基因其实在同一条线上.md",
  "研究文稿/07_书稿/第8章_思考的物理实现与认知生成.md":
    "研究文稿/07_书稿/白话卷/第5章_思考、意识和自我是世界在自己里面再长一层.md",
  "研究文稿/07_书稿/第9章_思考的力学运作机制及其与量子力学的异同.md":
    "研究文稿/07_书稿/白话卷/第5章_思考、意识和自我是世界在自己里面再长一层.md",
  "研究文稿/07_书稿/第10章_意识、自我、直觉、灵感与错误推理.md":
    "研究文稿/07_书稿/白话卷/第5章_思考、意识和自我是世界在自己里面再长一层.md",
  "研究文稿/07_书稿/第11章_统一结论.md":
    "研究文稿/07_书稿/白话卷/第7章_把整套理论压成一条人人能走通的线.md",
  "研究文稿/07_书稿/第12章_展望与研究计划.md":
    "研究文稿/07_书稿/白话卷/第8章_影响是存在的_理论如何进入人的判断与行动.md",
  "研究文稿/07_书稿/专题_反思辩证模块_让质疑成为理论生长的回路.md":
    "研究文稿/07_书稿/白话卷/第8章_影响是存在的_理论如何进入人的判断与行动.md",
  "研究文稿/07_书稿/专题_生命、基因与文明的层级必然性.md":
    "研究文稿/07_书稿/白话卷/第6章_文明就是规则开始写到身体外面.md",
  "研究文稿/07_书稿/专题_落差的稳态_结构形成与规则形成的共同基础.md":
    "研究文稿/07_书稿/白话卷/第3章_规则不是天上掉下来的而是站住的重复.md",
});
const SECTION_PRESENTATION = {
  "light-series": {
    badge: "适合转发",
    eyebrow: "轻内容连载",
    hook: "先把方法压成 10 条可以单发、可复述、能转发的入口。",
    description: "如果你想先感受这套方法怎样进入日常判断，就先从十条轻内容开始。每条都可以单独读，也能连成一条新读者路径。",
  },
  "plain-book": {
    badge: "推荐先读",
    eyebrow: "直观理解卷",
    hook: "先把主线读成一条能直接走进去的线。",
    description: "第一次进入本站，优先从白话卷开始。先建立直觉，再决定什么时候切到主书稿。",
  },
  book: {
    badge: "主线正文",
    eyebrow: "理论骨架卷",
    hook: "从绪论、正文到专题与附录，完整展开论证。",
    description: "当你想看更严密、更完整的版本，或者准备进入细部推导和接口扩展时，从这里进入。",
  },
  overview: {
    badge: "总述入口",
    eyebrow: "总览与校准",
    hook: "先看当前最稳的收束、边界与自我校验。",
    description: "适合在读完白话卷后回头校准全局主轴，快速确认理论当前站得最稳的表达。",
  },
  terms: {
    badge: "术语边界",
    eyebrow: "概念拆解卷",
    hook: "把最容易打架的词先拆清楚。",
    description: "当你被术语、边界、强命题或跨层接口卡住时，从这里翻最省时间。",
  },
  "ai-book": {
    badge: "协作系统",
    eyebrow: "AI 协作卷",
    hook: "给协作系统、版本治理与残差回写使用的卷册。",
    description: "它不是第一次进入时的首读入口，更像主线稳定后供协作、扩写和版本治理使用的后端卷册。",
  },
};
const LAB_PAGES = {
  learn: {
    title: "理论学习页",
    intro:
      "把展望里的实验想法先压成一条可读的学习链，先看每个实验究竟想检验什么，再看变量应该怎么读。",
  },
  play: {
    title: "游戏实验页",
    intro:
      "把落差、流向、结构和感知回路压成能玩的交互，让你不是只读概念，而是直接在玩法里感受它们怎样站住、怎样失稳。",
  },
  validate: {
    title: "交互检验页",
    intro:
      "这里用教学型交互器比较变量敏感性与解释力，不替代正式数值模拟，但可以先看哪些量最值得优先测。",
  },
  infer: {
    title: "研究推演页",
    intro:
      "从差结构条件出发，推演什么时候只会形成事件，什么时候能沉淀为结构、稳态甚至规则。",
  },
};
const LAB_INFER_DOMAINS = ["fluid", "disk", "galaxy", "ai"];
const LAB_CONTROL_DEFAULTS = {
  validate: {
    "fluid-gradient": 72,
    "fluid-rotation": 58,
    "fluid-boundary": 63,
    "fluid-dissipation": 34,
    "disk-tidal": 68,
    "disk-asymmetry": 54,
    "disk-dissipation": 29,
    "disk-duration": 61,
    "galaxy-anisotropy": 64,
    "galaxy-alignment": 57,
    "galaxy-merger": 33,
    "galaxy-observed": 52,
  },
  infer: {
    "infer-domain": "fluid",
    "infer-difference": 70,
    "infer-boundary": 58,
    "infer-feedback": 62,
    "infer-dissipation": 46,
    "infer-memory": 55,
  },
};
const LAB_ARCHITECTURE_LAYERS = [
  {
    title: "理论层",
    copy: "把落差、边界、反馈、稳态这些主轴压成可以连续阅读的理论语言。",
    pages: ["learn"],
  },
  {
    title: "变量层",
    copy: "把理论词转成可调参数、代理指标和观测提示，避免只剩抽象口号。",
    pages: ["learn", "play", "validate"],
  },
  {
    title: "交互层",
    copy: "把概念压成能玩、能误判、能被反馈修正的小游戏与思想实验。",
    pages: ["play"],
  },
  {
    title: "判别层",
    copy: "比较描述簇语言与传统基线在不同条件下各自解释得多深。",
    pages: ["validate"],
  },
  {
    title: "推演层",
    copy: "把当前条件推向事件、短命结构、准稳态或规则沉淀，给出下一步判断。",
    pages: ["infer"],
  },
  {
    title: "接口层",
    copy: "为真实求解器、观测数据、批量扫描和研究日志预留挂接位置。",
    pages: ["learn", "play", "validate", "infer"],
  },
];
const LAB_PAGE_ARCHITECTURE = {
  learn: {
    title: "先把理论骨架搭稳，再让交互去承重",
    copy:
      "学习页负责把整套实验台的语言系统先立住，让“落差如何站成结构”不只是抽象句子，而是后面所有调参、对比和推演的共同入口。",
    focus:
      "当前这页更偏向理论层与变量层：先把概念链和实验问题对齐，再进入真正的参数比较。",
    hookTitle: "学习页后面能继续挂什么",
  },
  play: {
    title: "先把概念做成能玩的回路，再看哪些反馈真的能改变判断",
    copy:
      "游戏页负责把‘落差、流向、结构、接口、误判’压成能直接上手的互动器，让你用手感、分数、连击和失误去体验哪些条件会留下结构，哪些只会留下短促效果。",
    focus:
      "当前这页更偏向变量层、交互层与接口层：重点不是宣布答案，而是让你通过玩法亲自碰到差异、补偿、噪声和结构沉淀。",
    hookTitle: "游戏页后面能继续挂什么",
  },
  validate: {
    title: "把理论词压成参数，再让解释力正面碰撞",
    copy:
      "检验页负责把前面的主轴落到参数与代理量上，让旋转流体、原行星盘和星系角动量分布可以在同一套阅读框架里被比较、被筛选、被追问。",
    focus:
      "当前这页更偏向变量层、判别层与接口层：先找解释力切换边界，再决定后面该接哪种模拟器或观测数据。",
    hookTitle: "检验页后面能继续挂什么",
  },
  infer: {
    title: "把当前条件向更高层推进，逼近结构之后的规则",
    copy:
      "推演页负责把已有的差结构条件推向更高层级，判断它们究竟会停在事件、短命结构、准稳态，还是继续压缩为可重复的规则。",
    focus:
      "当前这页更偏向推演层与接口层：不是直接宣布结论，而是把下一步实验、采样和系统升级的方向挑出来。",
    hookTitle: "推演页后面能继续挂什么",
  },
};
const LAB_EXTENSION_LAYERS = {
  learn: [
    {
      title: "术语映射",
      copy: "把正文、白话卷、实验变量和批注语言互相映射，减少切换成本。",
    },
    {
      title: "案例库",
      copy: "把流体、天体、生命、AI 等案例压进同一套理论主轴，形成可切换学习包。",
    },
    {
      title: "研究笔记",
      copy: "把读者反馈、章节疑问和新假设直接沉淀为后续实验任务。",
    },
  ],
  play: [
    {
      title: "关卡系统",
      copy: "把现在的开放试玩扩成阶段目标、闭环任务和失败条件，让结构形成真正变成通关条件。",
    },
    {
      title: "移动端操控",
      copy: "后续可以加入虚拟摇杆、触屏拖拽和双手操作，把手机端手感补得更完整。",
    },
    {
      title: "成绩与回放",
      copy: "记录每轮分数、连击、最佳结构状态，甚至导出回放帧，让玩法结果也能变成研究材料。",
    },
  ],
  validate: [
    {
      title: "真实求解器接口",
      copy: "后续可以接 CFD、盘面数值模拟或宇宙学快照，让教学代理指标过渡为正式求解。",
    },
    {
      title: "参数扫描",
      copy: "把单次调参扩成批量扫描，找出解释力切换最敏感的参数边界。",
    },
    {
      title: "观测模板",
      copy: "引入文献曲线、观测 catalog 或自定义快照，和当前理论模板做直接对照。",
    },
  ],
  infer: [
    {
      title: "AI 日志接口",
      copy: "把模型调用日志、工具链闭环和长期记忆状态接进来，验证“下一层”是否真的站住。",
    },
    {
      title: "报告导出",
      copy: "把当前推演结果自动整理为研究摘要、下一步任务和待验证变量列表。",
    },
    {
      title: "跨域比对",
      copy: "把流体、天体与 AI 系统的推演结果并排比较，检验同一主轴的可迁移性。",
    },
  ],
};
const LAB_PRESETS = {
  validate: [
    {
      id: "boundary-lock",
      label: "边界站稳",
      description: "抬高非均匀度和边界清晰度，看描述簇何时开始明显占优。",
      values: {
        ...LAB_CONTROL_DEFAULTS.validate,
        "fluid-gradient": 88,
        "fluid-rotation": 46,
        "fluid-boundary": 91,
        "fluid-dissipation": 21,
        "disk-tidal": 64,
        "disk-asymmetry": 74,
        "disk-dissipation": 24,
        "disk-duration": 58,
        "galaxy-anisotropy": 69,
        "galaxy-alignment": 72,
        "galaxy-merger": 18,
      },
    },
    {
      id: "traditional-core",
      label: "传统基线",
      description: "提高旋转和总强度，弱化非均匀边界效应，看看传统解释什么时候就够用。",
      values: {
        ...LAB_CONTROL_DEFAULTS.validate,
        "fluid-gradient": 31,
        "fluid-rotation": 85,
        "fluid-boundary": 42,
        "fluid-dissipation": 26,
        "disk-tidal": 74,
        "disk-asymmetry": 28,
        "disk-dissipation": 31,
        "disk-duration": 57,
        "galaxy-anisotropy": 34,
        "galaxy-alignment": 29,
        "galaxy-merger": 24,
      },
    },
    {
      id: "noise-washout",
      label: "噪声洗平",
      description: "提高耗散与并合噪声，观察结构如何被洗掉、趋势如何被遮蔽。",
      values: {
        ...LAB_CONTROL_DEFAULTS.validate,
        "fluid-gradient": 62,
        "fluid-rotation": 55,
        "fluid-boundary": 48,
        "fluid-dissipation": 78,
        "disk-tidal": 59,
        "disk-asymmetry": 47,
        "disk-dissipation": 76,
        "disk-duration": 43,
        "galaxy-anisotropy": 52,
        "galaxy-alignment": 44,
        "galaxy-merger": 84,
        "galaxy-observed": 57,
      },
    },
  ],
  infer: [
    {
      id: "event-threshold",
      label: "事件态",
      description: "差异已经出现，但几乎留不住结构。",
      values: {
        ...LAB_CONTROL_DEFAULTS.infer,
        "infer-domain": "fluid",
        "infer-difference": 41,
        "infer-boundary": 23,
        "infer-feedback": 28,
        "infer-dissipation": 81,
        "infer-memory": 18,
      },
    },
    {
      id: "quasi-steady",
      label: "准稳态",
      description: "结构能维持一段时间，但还没压到规则层。",
      values: {
        ...LAB_CONTROL_DEFAULTS.infer,
        "infer-domain": "disk",
        "infer-difference": 73,
        "infer-boundary": 64,
        "infer-feedback": 68,
        "infer-dissipation": 44,
        "infer-memory": 58,
      },
    },
    {
      id: "rule-formation",
      label: "规则沉淀",
      description: "反馈、边界和记忆同时站住，接近可重复压缩的稳定关系。",
      values: {
        ...LAB_CONTROL_DEFAULTS.infer,
        "infer-domain": "galaxy",
        "infer-difference": 88,
        "infer-boundary": 82,
        "infer-feedback": 86,
        "infer-dissipation": 47,
        "infer-memory": 83,
      },
    },
    {
      id: "ai-next-layer",
      label: "AI 下一层",
      description: "切到 AI 场景，观察长期记忆、验证链和现实接地怎样把系统推高一层。",
      values: {
        ...LAB_CONTROL_DEFAULTS.infer,
        "infer-domain": "ai",
        "infer-difference": 84,
        "infer-boundary": 71,
        "infer-feedback": 88,
        "infer-dissipation": 42,
        "infer-memory": 79,
      },
    },
  ],
};

const THOUGHT_COMPASS_AXES = [
  { key: "thought-difference", label: "差异" },
  { key: "thought-boundary", label: "边界" },
  { key: "thought-feedback", label: "反馈" },
  { key: "thought-validation", label: "验证" },
  { key: "thought-overclaim", label: "绝对化风险" },
];

const THOUGHT_COMPASS_DEFAULTS = {
  "thought-difference": 78,
  "thought-boundary": 56,
  "thought-feedback": 52,
  "thought-validation": 48,
  "thought-overclaim": 30,
};

const THOUGHT_COMPASS_PRESETS = [
  {
    id: "spark",
    label: "灵感一句",
    description: "差异很强，但边界、反馈和验证都还薄。",
    values: {
      "thought-difference": 84,
      "thought-boundary": 26,
      "thought-feedback": 22,
      "thought-validation": 18,
      "thought-overclaim": 64,
    },
  },
  {
    id: "structure",
    label: "结构判断",
    description: "开始补边界和反馈，已经能形成中层判断。",
    values: {
      "thought-difference": 76,
      "thought-boundary": 64,
      "thought-feedback": 58,
      "thought-validation": 54,
      "thought-overclaim": 26,
    },
  },
  {
    id: "rule",
    label: "规则候选",
    description: "验证密度和反馈闭环都比较够，接近可重复表达。",
    values: {
      "thought-difference": 69,
      "thought-boundary": 78,
      "thought-feedback": 72,
      "thought-validation": 77,
      "thought-overclaim": 18,
    },
  },
  {
    id: "grand-word",
    label: "万能大词",
    description: "词很大，但边界和验证都没有跟上，容易一问就塌。",
    values: {
      "thought-difference": 57,
      "thought-boundary": 21,
      "thought-feedback": 17,
      "thought-validation": 12,
      "thought-overclaim": 92,
    },
  },
];

const HIERARCHY_LIFT_LEVELS = [
  {
    key: "mind",
    label: "颅内想法",
    copy: "旧不稳定还主要停在个体感受和瞬时判断里。",
  },
  {
    key: "draft",
    label: "草稿外置",
    copy: "已经写出来，但还没被别人稳定接住。",
  },
  {
    key: "group",
    label: "小群汇聚",
    copy: "开始形成共享语言与局部共识。",
  },
  {
    key: "tool",
    label: "工具接口",
    copy: "可以被 workflow、技能或平台反复调用。",
  },
  {
    key: "rule",
    label: "规则沉淀",
    copy: "能跨人、跨时段、跨载体地稳定继承。",
  },
];

const HIERARCHY_LIFT_DEFAULTS = {
  "lift-instability": 74,
  "lift-externalize": 58,
  "lift-converge": 54,
  "lift-inherit": 46,
  "lift-interface": 40,
  "lift-noise": 32,
};

const HIERARCHY_LIFT_PRESETS = [
  {
    id: "spark-only",
    label: "灵感一闪",
    description: "有势能，但还主要困在个人脑内。",
    values: {
      "lift-instability": 86,
      "lift-externalize": 18,
      "lift-converge": 14,
      "lift-inherit": 12,
      "lift-interface": 10,
      "lift-noise": 30,
    },
  },
  {
    id: "drafting",
    label: "草稿成型",
    description: "开始外置，但还没有形成稳定汇聚。",
    values: {
      "lift-instability": 78,
      "lift-externalize": 68,
      "lift-converge": 34,
      "lift-inherit": 24,
      "lift-interface": 16,
      "lift-noise": 28,
    },
  },
  {
    id: "group-loop",
    label: "群聊汇聚",
    description: "交流很多，但接口和继承还不够硬。",
    values: {
      "lift-instability": 72,
      "lift-externalize": 74,
      "lift-converge": 79,
      "lift-inherit": 46,
      "lift-interface": 30,
      "lift-noise": 44,
    },
  },
  {
    id: "workflow",
    label: "工具成型",
    description: "外置、汇聚、接口开始同步，想法长成了可调用流程。",
    values: {
      "lift-instability": 68,
      "lift-externalize": 82,
      "lift-converge": 74,
      "lift-inherit": 68,
      "lift-interface": 78,
      "lift-noise": 24,
    },
  },
  {
    id: "rule-layer",
    label: "规则沉淀",
    description: "旧不稳定被收进更高层，开始跨主体和跨时间保存。",
    values: {
      "lift-instability": 71,
      "lift-externalize": 88,
      "lift-converge": 84,
      "lift-inherit": 86,
      "lift-interface": 84,
      "lift-noise": 18,
    },
  },
];

const PLAYGROUND_CANVAS = Object.freeze({
  width: 420,
  height: 260,
});

const FLOW_SNAKE_PARTICLE_COUNT = 11;
const SWARM_DIFFERENCE_COUNT = 18;
const SWARM_NOISE_COUNT = 10;
const VAT_EXPERIMENT_ACTIONS = [
  {
    id: "repeat-stimulus",
    label: "重复刺激",
    hint: "同样条件下再来一次，看反馈是老实波动，还是被接口抹得过于平滑。",
  },
  {
    id: "body-jolt",
    label: "扰动身体",
    hint: "故意制造动作偏差，测试世界给你的阻力到底来自外界还是界面补偿。",
  },
  {
    id: "peer-check",
    label: "问他者同证",
    hint: "找另一个主体复核，看它是否真的保留自己的偏差和盲区。",
  },
  {
    id: "input-cut",
    label: "切断输入",
    hint: "抽掉一部分感官输入，看系统是诚实留白，还是自动把空白补满。",
  },
  {
    id: "memory-audit",
    label: "回查记忆链",
    hint: "沿着记忆回溯，检查细节是否能被外部钉住，还是在回忆时被顺滑改写。",
  },
  {
    id: "trace-source",
    label: "追问输入源",
    hint: "不断追问感知来源，看系统会不会把问题重新绕回你的内部状态。",
  },
];

const VAT_EXPERIMENT_SCENARIOS = [
  {
    id: "reality",
    label: "外界回路",
    reveal:
      "这一轮的世界更接近外界回路：它不一定优雅，但会给你真实阻力、他者偏差和不被立即补满的缺口。",
    profile: {
      resistance: 0.84,
      memory: 0.82,
      peer: 0.79,
      fill: 0.16,
      mask: 0.18,
      closure: 0.72,
      latency: 0.34,
    },
  },
  {
    id: "vat",
    label: "缸中接口",
    reveal:
      "这一轮更接近缸中接口：内部一致性很高，但外界阻力、他者独立和诚实留白都偏弱，系统更擅长把差异抹平。",
    profile: {
      resistance: 0.31,
      memory: 0.4,
      peer: 0.26,
      fill: 0.85,
      mask: 0.83,
      closure: 0.9,
      latency: 0.16,
    },
  },
  {
    id: "layered",
    label: "混合层",
    reveal:
      "这一轮更接近混合层：你接触到的既有外界约束，也有强接口补偿，所以最难被一次性判断清楚。",
    profile: {
      resistance: 0.58,
      memory: 0.57,
      peer: 0.49,
      fill: 0.55,
      mask: 0.58,
      closure: 0.67,
      latency: 0.42,
    },
  },
];

const state = {
  payload: null,
  filteredItems: [],
  activeId: null,
  activeLabPage: null,
  labParams: {},
  labActionTimer: null,
  labPlaygroundCleanups: [],
  drawerOpen: false,
  tocOpen: false,
  mobileFontPanelOpen: false,
  currentPrevId: null,
  currentNextId: null,
  preferences: loadPreferences(),
};

const dom = {
  pageOverlay: document.getElementById("page-overlay"),
  catalogDrawer: document.getElementById("catalog-drawer"),
  tocDrawer: document.getElementById("toc-drawer"),
  siteTitle: document.getElementById("site-title"),
  siteTagline: document.getElementById("site-tagline"),
  siteStats: document.getElementById("site-stats"),
  repoLink: document.getElementById("repo-link"),
  navSections: document.getElementById("nav-sections"),
  searchInput: document.getElementById("search-input"),
  viewTitle: document.getElementById("view-title"),
  homeButton: document.getElementById("home-button"),
  homeView: document.getElementById("home-view"),
  labView: document.getElementById("lab-view"),
  docView: document.getElementById("doc-view"),
  heroTitle: document.getElementById("hero-title"),
  heroText: document.getElementById("hero-text"),
  positioningStatement: document.getElementById("positioning-statement"),
  positioningSupport: document.getElementById("positioning-support"),
  starterLinks: document.getElementById("starter-links"),
  lightSeriesLinks: document.getElementById("light-series-links"),
  systemLinks: document.getElementById("system-links"),
  quickLinks: document.getElementById("quick-links"),
  featuredVolumeTitle: document.getElementById("featured-volume-title"),
  featuredVolumeCopy: document.getElementById("featured-volume-copy"),
  featuredVolumeMeta: document.getElementById("featured-volume-meta"),
  featuredVolumeLinks: document.getElementById("featured-volume-links"),
  labTitle: document.getElementById("lab-title"),
  labIntro: document.getElementById("lab-intro"),
  labTabs: document.getElementById("lab-tabs"),
  labContent: document.getElementById("lab-content"),
  labNote: document.getElementById("lab-note"),
  docBreadcrumb: document.getElementById("doc-breadcrumb"),
  docTitle: document.getElementById("doc-title"),
  docUpdated: document.getElementById("doc-updated"),
  docSource: document.getElementById("doc-source"),
  docContent: document.getElementById("doc-content"),
  docToc: document.getElementById("doc-toc"),
  docPagination: document.getElementById("doc-pagination"),
  catalogButton: document.getElementById("catalog-button"),
  tocButton: document.getElementById("toc-button"),
  labButton: document.getElementById("lab-button"),
  themeButton: document.getElementById("theme-button"),
  fontDownButton: document.getElementById("font-down-button"),
  fontUpButton: document.getElementById("font-up-button"),
  fontSizeIndicator: document.getElementById("font-size-indicator"),
  startReadingButton: document.getElementById("start-reading-button"),
  openLabButton: document.getElementById("open-lab-button"),
  openCatalogButton: document.getElementById("open-catalog-button"),
  mobileHomeButton: document.getElementById("mobile-home-button"),
  mobileCatalogButton: document.getElementById("mobile-catalog-button"),
  mobileFontButton: document.getElementById("mobile-font-button"),
  mobileFontPanel: document.getElementById("mobile-font-panel"),
  mobileFontDownButton: document.getElementById("mobile-font-down-button"),
  mobileFontUpButton: document.getElementById("mobile-font-up-button"),
  mobileFontSizeIndicator: document.getElementById("mobile-font-size-indicator"),
  mobileThemeButton: document.getElementById("mobile-theme-button"),
  fontResetButton: document.getElementById("font-reset-button"),
  mobilePrevButton: document.getElementById("mobile-prev-button"),
  mobileNextButton: document.getElementById("mobile-next-button"),
  readerProgressBar: document.getElementById("reader-progress-bar"),
  readerPaper: document.getElementById("reader-paper"),
  commentsNote: document.getElementById("comments-note"),
  commentsMount: document.getElementById("comments-mount"),
};

function getDefaultFontSize() {
  return window.innerWidth <= MOBILE_BREAKPOINT
    ? DEFAULT_FONT_SIZE.mobile
    : DEFAULT_FONT_SIZE.desktop;
}

function loadPreferences() {
  const fallback = {
    theme: "paper",
    fontSize: getDefaultFontSize(),
    hasCustomFontSize: false,
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const parsedFontSize = Number(saved.fontSize);
    const hasCustomFontSize = Number.isFinite(parsedFontSize);
    return {
      theme: THEME_ORDER.includes(saved.theme) ? saved.theme : fallback.theme,
      fontSize: hasCustomFontSize
        ? clamp(parsedFontSize, FONT_MIN, FONT_MAX)
        : fallback.fontSize,
      hasCustomFontSize,
    };
  } catch {
    return fallback;
  }
}

function savePreferences() {
  const payload = {
    theme: state.preferences.theme,
  };

  if (state.preferences.hasCustomFontSize) {
    payload.fontSize = state.preferences.fontSize;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value) {
  return clamp(value, 0, 1);
}

function formatDate(isoString) {
  if (!isoString) return "未知";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function relativeTime(isoString) {
  if (!isoString) return "";
  const diff = Date.now() - new Date(isoString).getTime();
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) return "今天更新";
  if (diff < day * 7) return `${Math.max(1, Math.round(diff / day))} 天前更新`;
  return `更新于 ${formatDate(isoString)}`;
}

function normalizeLabPage(page) {
  return LAB_PAGES[page] ? page : "learn";
}

function sanitizeRangeParamValue(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return clamp(Math.round(parsed), 0, 100);
}

function resolveLabParams(page, rawParams = {}) {
  const activePage = normalizeLabPage(page);
  const defaults = LAB_CONTROL_DEFAULTS[activePage];

  if (!defaults) return {};

  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => {
      if (typeof fallback === "number") {
        return [key, sanitizeRangeParamValue(rawParams[key], fallback)];
      }

      if (key === "infer-domain") {
        return [key, LAB_INFER_DOMAINS.includes(rawParams[key]) ? rawParams[key] : fallback];
      }

      return [key, rawParams[key] ?? fallback];
    }),
  );
}

function getHashRoute() {
  const rawHash = window.location.hash.replace(/^#/, "");
  const queryIndex = rawHash.indexOf("?");
  const path = queryIndex === -1 ? rawHash : rawHash.slice(0, queryIndex);
  const params = queryIndex === -1
    ? {}
    : Object.fromEntries(new URLSearchParams(rawHash.slice(queryIndex + 1)).entries());
  const hash = decodeURIComponent(path);

  if (!hash) return { type: "home" };
  if (hash.startsWith("doc/")) {
    return { type: "doc", id: hash.slice(4) };
  }
  if (hash === "lab") {
    return { type: "lab", page: "learn", params: {} };
  }
  if (hash.startsWith("lab/")) {
    return { type: "lab", page: normalizeLabPage(hash.slice(4)), params };
  }
  return { type: "home" };
}

function setHashForDoc(id) {
  window.location.hash = `doc/${encodeURIComponent(id)}`;
}

function buildLabHash(page = "learn", params = null) {
  const activePage = normalizeLabPage(page);
  const baseHash = `lab/${encodeURIComponent(activePage)}`;

  if (!params) return baseHash;

  const defaults = LAB_CONTROL_DEFAULTS[activePage];
  const resolved = resolveLabParams(activePage, params);

  if (!defaults) return baseHash;

  const search = new URLSearchParams();
  Object.entries(resolved).forEach(([key, value]) => {
    if (String(value) !== String(defaults[key])) {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `${baseHash}?${query}` : baseHash;
}

function setHashForLab(page = "learn", params = null, { replace = false } = {}) {
  const hash = buildLabHash(page, params);
  if (replace) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
    return;
  }
  window.location.hash = hash;
}

function closePanels() {
  setDrawerOpen(false);
  setTocOpen(false);
  setMobileFontPanelOpen(false);
}

function setDrawerOpen(open) {
  state.drawerOpen = open;
  dom.catalogDrawer.classList.toggle("is-open", open);
  syncOverlay();
}

function setTocOpen(open) {
  state.tocOpen = open;
  dom.tocDrawer.classList.toggle("is-open", open);
  syncOverlay();
}

function setMobileFontPanelOpen(open) {
  state.mobileFontPanelOpen = open;
  dom.mobileFontPanel.classList.toggle("hidden", !open);
  dom.mobileFontPanel.setAttribute("aria-hidden", String(!open));
  dom.mobileFontButton.classList.toggle("is-active", open);
  syncOverlay();
}

function syncOverlay() {
  const visible = state.drawerOpen || state.tocOpen || state.mobileFontPanelOpen;
  dom.pageOverlay.classList.toggle("hidden", !visible);
  dom.pageOverlay.classList.toggle("is-visible", visible);
  document.body.classList.toggle(
    "lock-scroll",
    window.innerWidth <= MOBILE_BREAKPOINT && (state.drawerOpen || state.tocOpen),
  );
}

function findItemById(id) {
  return state.payload.items.find((item) => item.id === id) || null;
}

function getSectionPresentation(sectionId) {
  return SECTION_PRESENTATION[sectionId] || {};
}

function getSectionItems(sectionId) {
  return state.payload.items
    .filter((item) => item.sectionId === sectionId)
    .sort((a, b) => a.order - b.order);
}

function getReadableSectionItems(sectionId) {
  const items = getSectionItems(sectionId);
  const filtered = items.filter((item) => !getDisplayTitle(item).includes("备忘录"));
  return filtered.length ? filtered : items;
}

function getOrderedSections() {
  const rank = new Map(HOME_SECTION_ORDER.map((id, index) => [id, index]));
  return [...state.payload.sections].sort((left, right) => {
    const leftRank = rank.has(left.id) ? rank.get(left.id) : Number.MAX_SAFE_INTEGER;
    const rightRank = rank.has(right.id) ? rank.get(right.id) : Number.MAX_SAFE_INTEGER;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return left.title.localeCompare(right.title, "zh-CN");
  });
}

function getReadingSequence() {
  return getOrderedSections().flatMap((section) => getSectionItems(section.id));
}

function getDisplayTitle(item) {
  if (!item) return "";
  const firstSubheading = item.headings?.find((heading) => heading.level >= 2);
  if (item.title === item.sectionTitle && firstSubheading?.label) {
    return firstSubheading.label;
  }
  return item.title;
}

function getRenderedDocHtml(item) {
  if (!item?.html) return "";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = item.html;

  const firstElement = wrapper.firstElementChild;
  const removableTitles = new Set([item.title, item.sectionTitle, getDisplayTitle(item)].filter(Boolean));

  if (
    firstElement &&
    firstElement.tagName === "H1" &&
    removableTitles.has(firstElement.textContent.trim())
  ) {
    firstElement.remove();
  }

  return wrapper.innerHTML;
}

function normalizeSourcePath(sourcePath) {
  return (sourcePath || "").replace(/\\/g, "/");
}

function findItemBySourcePath(sourcePath) {
  const normalizedSourcePath = normalizeSourcePath(sourcePath);

  if (!normalizedSourcePath) {
    return null;
  }

  return (
    state.payload.items.find(
      (entry) => normalizeSourcePath(entry.sourcePath) === normalizedSourcePath,
    ) || null
  );
}

function getAlternateVersionLabel(item) {
  if (item?.sectionId === "plain-book") return "正文版";
  if (item?.sectionId === "book") return "白话版";
  return "互转阅读";
}

function getAlternateVersionEmptyTitle(item) {
  if (item?.sectionId === "plain-book") return "暂未建立直达正文";
  if (item?.sectionId === "book") return "暂未建立直达白话";
  return "当前页暂无互转版本";
}

function getAlternateVersionItem(item) {
  const normalizedSourcePath = normalizeSourcePath(item?.sourcePath);

  if (!normalizedSourcePath) {
    return null;
  }

  if (item.sectionId === "plain-book") {
    return findItemBySourcePath(PLAIN_TO_BOOK_VARIANT_PATHS[normalizedSourcePath]);
  }

  if (item.sectionId === "book") {
    return findItemBySourcePath(BOOK_TO_PLAIN_VARIANT_PATHS[normalizedSourcePath]);
  }

  return null;
}

function formatVolumeEntryIndex(item, index) {
  const displayTitle = getDisplayTitle(item);
  if (displayTitle.includes("卷首")) return "卷首";
  const chapterMatch = displayTitle.match(/第(\d+)章/);
  if (chapterMatch) return chapterMatch[1].padStart(2, "0");
  const appendixMatch = displayTitle.match(/附录([A-Z])/i);
  if (appendixMatch) return `附${appendixMatch[1].toUpperCase()}`;
  return String(index + 1).padStart(2, "0");
}

function getCommentsConfig() {
  return state.payload.site.comments || {};
}

function getPrimaryStartItem() {
  return (
    getSectionEntry("plain-book") ||
    getSectionEntry("book") ||
    getReadingSequence()[0] ||
    null
  );
}

function getAppliedFontSize() {
  return state.preferences.hasCustomFontSize
    ? state.preferences.fontSize
    : getDefaultFontSize();
}

function syncFontControls(fontSize) {
  const label = `${fontSize}px`;
  const atMin = fontSize <= FONT_MIN;
  const atMax = fontSize >= FONT_MAX;

  dom.fontSizeIndicator.textContent = label;
  dom.mobileFontSizeIndicator.textContent = label;
  dom.fontDownButton.disabled = atMin;
  dom.fontUpButton.disabled = atMax;
  dom.mobileFontDownButton.disabled = atMin;
  dom.mobileFontUpButton.disabled = atMax;
  dom.fontResetButton.disabled = !state.preferences.hasCustomFontSize;
}

function applyPreferences() {
  const fontSize = getAppliedFontSize();

  document.documentElement.dataset.theme = state.preferences.theme;
  document.documentElement.style.setProperty("--reader-font-size", `${fontSize}px`);

  const themeLabel = THEME_LABELS[state.preferences.theme];
  dom.themeButton.textContent = `主题 · ${themeLabel}`;
  dom.mobileThemeButton.textContent = `主题 · ${themeLabel}`;
  syncFontControls(fontSize);
}

function cycleTheme() {
  const currentIndex = THEME_ORDER.indexOf(state.preferences.theme);
  state.preferences.theme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
  savePreferences();
  applyPreferences();
}

function adjustFont(delta) {
  state.preferences.fontSize = clamp(getAppliedFontSize() + delta, FONT_MIN, FONT_MAX);
  state.preferences.hasCustomFontSize = true;
  savePreferences();
  applyPreferences();
}

function resetFontSize() {
  state.preferences.fontSize = getDefaultFontSize();
  state.preferences.hasCustomFontSize = false;
  savePreferences();
  applyPreferences();
}

function formatSerialIndex(index) {
  return String(index + 1).padStart(2, "0");
}

function buildStarterLinks() {
  if (!dom.starterLinks) return;

  dom.starterLinks.innerHTML = "";

  STARTER_GUIDE.forEach((entry, index) => {
    const item = findItemBySourcePath(entry.sourcePath);
    if (!item) return;

    const link = document.createElement("a");
    link.className = "starter-card";
    link.href = `#doc/${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <span class="starter-index">${formatSerialIndex(index)}</span>
      <span class="starter-copy">
        <span class="starter-eyebrow">${entry.eyebrow}</span>
        <strong>${entry.title}</strong>
        <p>${entry.copy}</p>
        <em>进入：${getDisplayTitle(item)}</em>
      </span>
    `;
    dom.starterLinks.appendChild(link);
  });

  if (!dom.starterLinks.childElementCount) {
    dom.starterLinks.innerHTML = `<p class="empty-state">新读者入口正在整理中。</p>`;
  }
}

function buildLightSeriesLinks() {
  if (!dom.lightSeriesLinks) return;

  const items = getReadableSectionItems("light-series").slice(0, 10);
  dom.lightSeriesLinks.innerHTML = "";

  items.forEach((item, index) => {
    const link = document.createElement("a");
    link.className = "book-card light-card";
    link.href = `#doc/${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <div class="book-card-index">${formatSerialIndex(index)}</div>
      <div class="book-card-copy">
        <p class="book-card-meta">轻内容 ${formatSerialIndex(index)}</p>
        <h4>${getDisplayTitle(item)}</h4>
        <p>${item.excerpt || item.sectionTitle}</p>
      </div>
    `;
    dom.lightSeriesLinks.appendChild(link);
  });

  if (!dom.lightSeriesLinks.childElementCount) {
    dom.lightSeriesLinks.innerHTML = `<p class="empty-state">轻内容连载正在整理中。</p>`;
  }
}

function buildQuickLinks() {
  const items = getReadableSectionItems("plain-book")
    .slice(0, 4);

  dom.quickLinks.innerHTML = "";

  items.forEach((item, index) => {
    const link = document.createElement("a");
    link.className = "book-card";
    link.href = `#doc/${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <div class="book-card-index">${formatVolumeEntryIndex(item, index)}</div>
      <div class="book-card-copy">
        <p class="book-card-meta">白话卷</p>
        <h4>${getDisplayTitle(item)}</h4>
        <p>${item.excerpt || item.sectionTitle}</p>
      </div>
    `;
    dom.quickLinks.appendChild(link);
  });
}

function getSectionEntry(sectionId) {
  const items = getSectionItems(sectionId);

  if (sectionId === "book") {
    return (
      items.find((item) => getDisplayTitle(item).includes("第1章")) ||
      items.find((item) => getDisplayTitle(item).includes("绪论")) ||
      items[0] ||
      null
    );
  }

  if (sectionId === "plain-book") {
    return (
      items.find((item) => getDisplayTitle(item).includes("卷首")) ||
      items[0] ||
      null
    );
  }

  if (sectionId === "ai-book") {
    return (
      items.find((item) => getDisplayTitle(item).includes("卷首")) ||
      items[0] ||
      null
    );
  }

  return items[0] || null;
}

function buildFeaturedVolume() {
  const items = getReadableSectionItems("plain-book");
  const firstReadable = getSectionEntry("plain-book");

  dom.featuredVolumeTitle.textContent = "白话卷 · 直观理解卷";
  dom.featuredVolumeCopy.textContent =
    "最适合作为第一次进入本站的入口。先把这套理论读成能直接理解、直接跟上的版本，再回头切换到主书稿。";

  dom.featuredVolumeMeta.innerHTML = "";
  [
    "推荐首读",
    `${items.length} 篇可连读`,
    firstReadable ? `起点：${getDisplayTitle(firstReadable)}` : "可直接开始",
  ].forEach((label) => {
    const chip = document.createElement("span");
    chip.className = "spotlight-chip";
    chip.textContent = label;
    dom.featuredVolumeMeta.appendChild(chip);
  });

  dom.featuredVolumeLinks.innerHTML = "";

  items.slice(0, 4).forEach((item, index) => {
    const link = document.createElement("a");
    link.className = "spotlight-link";
    link.href = `#doc/${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <span class="spotlight-link-index">${formatVolumeEntryIndex(item, index)}</span>
      <span class="spotlight-link-copy">
        <strong>${getDisplayTitle(item)}</strong>
        <em>${item.excerpt || item.sectionTitle}</em>
      </span>
    `;
    dom.featuredVolumeLinks.appendChild(link);
  });
}

function buildSystemLinks() {
  dom.systemLinks.innerHTML = "";

  getOrderedSections().forEach((section) => {
    const sectionId = section.id;
    const entry = getSectionEntry(sectionId);
    const presentation = getSectionPresentation(sectionId);
    const readableCount = getReadableSectionItems(sectionId).length;

    if (!entry) return;

    const link = document.createElement("a");
    link.className = "system-card";
    if (sectionId === "plain-book") {
      link.classList.add("is-featured");
    }
    link.href = `#doc/${encodeURIComponent(entry.id)}`;
    link.innerHTML = `
      <div class="system-card-cover">
        <span class="system-card-badge">${presentation.badge || section.title}</span>
        <h4>${section.title}</h4>
        <p class="system-card-hook">${presentation.hook || getDisplayTitle(entry)}</p>
      </div>
      <div class="system-card-body">
        <div class="system-card-meta">
          <p class="system-label">${presentation.eyebrow || "卷册入口"}</p>
          <span class="system-count">${readableCount} 篇</span>
        </div>
        <strong class="system-entry">${getDisplayTitle(entry)}</strong>
        <p>${presentation.description || entry.excerpt || entry.sectionTitle}</p>
      </div>
    `;
    dom.systemLinks.appendChild(link);
  });
}

function matchesSearch(item, keyword) {
  if (!keyword) return true;
  const haystack = `${item.title} ${getDisplayTitle(item)} ${item.excerpt} ${item.sectionTitle}`.toLowerCase();
  return haystack.includes(keyword.toLowerCase());
}

function buildNav() {
  const keyword = dom.searchInput.value.trim();
  state.filteredItems = state.payload.items.filter((item) => matchesSearch(item, keyword));
  const filteredIds = new Set(state.filteredItems.map((item) => item.id));

  dom.navSections.innerHTML = "";

  getOrderedSections().forEach((section) => {
    const sectionItems = getSectionItems(section.id)
      .filter((item) => filteredIds.has(item.id));

    if (!sectionItems.length) return;

    const group = document.createElement("section");
    group.className = "nav-group";
    if (section.id === "plain-book") {
      group.classList.add("is-featured");
    }

    const title = document.createElement("h3");
    title.className = "nav-group-title";
    title.textContent = section.title;
    group.appendChild(title);

    const list = document.createElement("div");
    list.className = "nav-list";

    sectionItems.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nav-item";
      button.title = getDisplayTitle(item);
      if (item.id === state.activeId) {
        button.classList.add("is-active");
      }

      button.innerHTML = `<strong>${getDisplayTitle(item)}</strong>`;

      button.addEventListener("click", () => {
        closePanels();
        setHashForDoc(item.id);
      });

      list.appendChild(button);
    });

    group.appendChild(list);
    dom.navSections.appendChild(group);
  });

  if (!dom.navSections.childElementCount) {
    dom.navSections.innerHTML = `<p class="empty-state">没有匹配到相关章节。</p>`;
  }
}

function syncViewButtons() {
  dom.labButton.classList.toggle("is-active", Boolean(state.activeLabPage));
}

function setRangeOutput(id, label) {
  const output = dom.labContent.querySelector(`[data-range-output="${id}"]`);
  if (output) {
    output.textContent = label;
  }
}

function setMeter(id, value) {
  const fill = dom.labContent.querySelector(`#${id}-fill`);
  const text = dom.labContent.querySelector(`#${id}-value`);
  const percent = Math.round(clamp01(value) * 100);

  if (fill) fill.style.width = `${percent}%`;
  if (text) text.textContent = `${percent}%`;
}

function setPlaygroundMetric(id, ratio, label) {
  const fill = dom.labContent.querySelector(`#${id}-fill`);
  const text = dom.labContent.querySelector(`#${id}-value`);

  if (fill) fill.style.width = `${Math.round(clamp01(ratio) * 100)}%`;
  if (text) text.textContent = label;
}

function setPlayText(id, value) {
  const node = dom.labContent.querySelector(`#${id}`);
  if (node) {
    node.textContent = value;
  }
}

function getRatio(id) {
  const input = dom.labContent.querySelector(`#${id}`);
  return clamp01(Number(input?.value || 0) / 100);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function distanceBetween(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function normalizeVector(vector, fallback = { x: 1, y: 0 }) {
  const length = Math.hypot(vector.x, vector.y);
  if (length < 0.0001) {
    return { ...fallback };
  }

  return {
    x: vector.x / length,
    y: vector.y / length,
  };
}

function drawVectorArrow(ctx, x, y, vector, length, color, alpha = 1) {
  const direction = normalizeVector(vector);
  const endX = x + direction.x * length;
  const endY = y + direction.y * length;
  const wingLength = length * 0.28;
  const left = {
    x: endX - direction.x * wingLength - direction.y * wingLength * 0.68,
    y: endY - direction.y * wingLength + direction.x * wingLength * 0.68,
  };
  const right = {
    x: endX - direction.x * wingLength + direction.y * wingLength * 0.68,
    y: endY - direction.y * wingLength - direction.x * wingLength * 0.68,
  };

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.moveTo(left.x, left.y);
  ctx.lineTo(endX, endY);
  ctx.lineTo(right.x, right.y);
  ctx.stroke();
  ctx.restore();
}

function getCanvasPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: clamp((event.clientX - rect.left) * scaleX, 0, canvas.width),
    y: clamp((event.clientY - rect.top) * scaleY, 0, canvas.height),
  };
}

function bindPlaygroundPointer(canvas, onAim) {
  let pointerDown = false;

  const updateAim = (event) => {
    onAim(getCanvasPoint(canvas, event), event);
  };

  const handlePointerDown = (event) => {
    pointerDown = true;
    canvas.setPointerCapture?.(event.pointerId);
    updateAim(event);
  };

  const handlePointerMove = (event) => {
    if (pointerDown || event.pointerType === "mouse") {
      updateAim(event);
    }
  };

  const handlePointerUp = () => {
    pointerDown = false;
  };

  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointercancel", handlePointerUp);
  canvas.addEventListener("pointerleave", handlePointerUp);

  return () => {
    canvas.removeEventListener("pointerdown", handlePointerDown);
    canvas.removeEventListener("pointermove", handlePointerMove);
    canvas.removeEventListener("pointerup", handlePointerUp);
    canvas.removeEventListener("pointercancel", handlePointerUp);
    canvas.removeEventListener("pointerleave", handlePointerUp);
  };
}

function startPlaygroundLoop(step) {
  let animationFrame = 0;
  let disposed = false;
  let previousTime = performance.now();

  const frame = (now) => {
    if (disposed) return;

    const dt = Math.min(0.035, Math.max(0.012, (now - previousTime) / 1000));
    previousTime = now;
    step(dt, now);
    animationFrame = window.requestAnimationFrame(frame);
  };

  animationFrame = window.requestAnimationFrame(frame);

  return () => {
    disposed = true;
    window.cancelAnimationFrame(animationFrame);
  };
}

function normalizeDistribution(values) {
  const safe = values.map((value) => Math.max(0.001, value));
  const total = safe.reduce((sum, value) => sum + value, 0);
  return safe.map((value) => value / total);
}

function distributionDistance(a, b) {
  return a.reduce((sum, value, index) => sum + Math.abs(value - b[index]), 0);
}

function renderDistributionSeries(prefix, values) {
  const labels = ["low", "mid", "high"];
  labels.forEach((label, index) => {
    const bar = dom.labContent.querySelector(`#${prefix}-${label}`);
    const text = dom.labContent.querySelector(`#${prefix}-${label}-value`);
    const percent = Math.round(values[index] * 100);

    if (bar) bar.style.height = `${Math.max(8, percent)}%`;
    if (text) text.textContent = `${percent}%`;
  });
}

function renderLabTabs(page) {
  dom.labTabs.querySelectorAll("[data-lab-page]").forEach((button) => {
    const active = button.dataset.labPage === page;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function setLabControlValues(values) {
  Object.entries(values).forEach(([id, value]) => {
    const control = dom.labContent.querySelector(`#${id}`);
    if (!control) return;
    control.value = String(value);
  });
}

function getLabControlSnapshot(controlIds) {
  return Object.fromEntries(
    controlIds
      .map((id) => {
        const control = dom.labContent.querySelector(`#${id}`);
        if (!control) return null;
        return [
          id,
          control.tagName === "SELECT"
            ? control.value
            : sanitizeRangeParamValue(control.value, 0),
        ];
      })
      .filter(Boolean),
  );
}

function setLabActionStatus(message, tone = "info") {
  const status = dom.labContent.querySelector("#lab-action-status");
  if (!status) return;

  status.textContent = message;
  status.dataset.tone = tone;

  if (state.labActionTimer) {
    window.clearTimeout(state.labActionTimer);
  }

  state.labActionTimer = window.setTimeout(() => {
    if (status.isConnected) {
      status.textContent = "";
      delete status.dataset.tone;
    }
    state.labActionTimer = null;
  }, 2400);
}

function registerLabPlaygroundCleanup(cleanup) {
  if (typeof cleanup === "function") {
    state.labPlaygroundCleanups.push(cleanup);
  }
}

function cleanupLabPlaygrounds() {
  state.labPlaygroundCleanups.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      console.error(error);
    }
  });
  state.labPlaygroundCleanups = [];
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}

function renderLabArchitectureSection(page) {
  const meta = LAB_PAGE_ARCHITECTURE[page];
  const extensions = LAB_EXTENSION_LAYERS[page] || [];

  return `
    <section class="lab-grid lab-grid-two">
      <article class="lab-card lab-card-strong">
        <p class="eyebrow">Lab Architecture</p>
        <h3>${meta.title}</h3>
        <p>${meta.copy}</p>
        <div class="lab-stack-grid">
          ${LAB_ARCHITECTURE_LAYERS.map((layer, index) => `
            <div class="lab-stack-card${layer.pages.includes(page) ? " is-active" : ""}">
              <small>${String(index + 1).padStart(2, "0")}</small>
              <strong>${layer.title}</strong>
              <p>${layer.copy}</p>
            </div>
          `).join("")}
        </div>
        <p class="lab-section-lead">${meta.focus}</p>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Expansion Layer</p>
        <h3>${meta.hookTitle}</h3>
        <div class="lab-extension-grid">
          ${extensions.map((item) => `
            <div class="lab-extension-card">
              <strong>${item.title}</strong>
              <p>${item.copy}</p>
            </div>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderLabToolkitCard(page, title, description) {
  const presets = LAB_PRESETS[page] || [];

  return `
    <article class="lab-card">
      <p class="eyebrow">Scenario Presets</p>
      <h3>${title}</h3>
      <p class="lab-section-copy">${description}</p>
      <div class="lab-preset-grid">
        ${presets.map((preset) => `
          <button
            class="lab-preset-button"
            type="button"
            data-lab-page="${page}"
            data-lab-preset="${preset.id}"
            data-lab-preset-label="${preset.label}"
            title="${preset.description}"
          >
            <strong>${preset.label}</strong>
            <span>${preset.description}</span>
          </button>
        `).join("")}
      </div>
      <div class="lab-inline-actions">
        <button class="reader-button" type="button" data-lab-action="share">复制当前实验链接</button>
        <button class="reader-button" type="button" data-lab-action="reset" data-lab-page="${page}">恢复默认参数</button>
      </div>
      <p id="lab-action-status" class="lab-action-status" aria-live="polite"></p>
    </article>
  `;
}

function bindLabToolkit(page, onApplyValues) {
  const presetMap = new Map((LAB_PRESETS[page] || []).map((preset) => [preset.id, preset]));

  dom.labContent.querySelectorAll(`[data-lab-page="${page}"][data-lab-preset]`).forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presetMap.get(button.dataset.labPreset);
      if (!preset) return;
      onApplyValues(preset.values);
      setLabActionStatus(`已切换到“${preset.label}”。`, "success");
    });
  });

  dom.labContent.querySelector('[data-lab-action="share"]')?.addEventListener("click", async () => {
    const copied = await copyTextToClipboard(window.location.href);
    setLabActionStatus(
      copied ? "已复制当前实验链接。" : "当前环境不支持自动复制，请手动复制地址栏。",
      copied ? "success" : "warning",
    );
  });

  dom.labContent.querySelector(`[data-lab-action="reset"][data-lab-page="${page}"]`)?.addEventListener("click", () => {
    onApplyValues(LAB_CONTROL_DEFAULTS[page]);
    setLabActionStatus("已恢复默认参数。", "info");
  });
}

function buildThoughtRadarPoints(values, radius, center) {
  return values.map((value, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
    const x = center + Math.cos(angle) * radius * clamp01(value);
    const y = center + Math.sin(angle) * radius * clamp01(value);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function buildThoughtRadarMarkup(values) {
  const center = 120;
  const radius = 82;
  const rings = [0.25, 0.5, 0.75, 1];

  const ringMarkup = rings.map((ratio) => `
    <polygon
      class="thought-radar-ring"
      points="${buildThoughtRadarPoints(new Array(values.length).fill(ratio), radius, center)}"
    />
  `).join("");

  const axisMarkup = values.map((axis, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    const labelX = center + Math.cos(angle) * (radius + 22);
    const labelY = center + Math.sin(angle) * (radius + 22);

    return `
      <line class="thought-radar-axis" x1="${center}" y1="${center}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />
      <text class="thought-radar-label" x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">
        ${axis.label}
      </text>
    `;
  }).join("");

  const shapePoints = buildThoughtRadarPoints(values.map((axis) => axis.value), radius, center);
  const pointMarkup = values.map((axis, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
    const x = center + Math.cos(angle) * radius * clamp01(axis.value);
    const y = center + Math.sin(angle) * radius * clamp01(axis.value);
    return `<circle class="thought-radar-point" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.2"></circle>`;
  }).join("");

  return `
    ${ringMarkup}
    ${axisMarkup}
    <polygon class="thought-radar-shape" points="${shapePoints}" />
    ${pointMarkup}
  `;
}

function renderThoughtCompassSection() {
  return `
    <section class="lab-grid lab-grid-two">
      <article class="lab-card lab-card-strong">
        <p class="eyebrow">Thought Visualizer</p>
        <h3>思辨罗盘：把一句判断放进五个轴里看</h3>
        <p class="lab-section-copy">
          这个互动器不替你下结论，它只逼你把一句话摊开：它到底抓住了多少差异，补了多少边界，
          接上了多少反馈，留下了多少验证，又有没有把自己说成万能大词。
        </p>
        <div class="lab-preset-grid thought-preset-grid">
          ${THOUGHT_COMPASS_PRESETS.map((preset) => `
            <button
              class="lab-preset-button"
              type="button"
              data-thought-preset="${preset.id}"
              title="${preset.description}"
            >
              <strong>${preset.label}</strong>
              <span>${preset.description}</span>
            </button>
          `).join("")}
        </div>
        <div class="lab-controls">
          ${THOUGHT_COMPASS_AXES.map((axis) => `
            <label class="lab-range">
              <span>${axis.label} <strong data-range-output="${axis.key}"></strong></span>
              <input id="${axis.key}" type="range" min="0" max="100" value="${THOUGHT_COMPASS_DEFAULTS[axis.key]}" />
            </label>
          `).join("")}
        </div>
        <div class="lab-metrics">
          <div class="lab-metric">
            <span>方法贴合度</span>
            <strong id="thought-method-value"></strong>
            <div class="lab-meter"><span id="thought-method-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>结构站稳度</span>
            <strong id="thought-stability-value"></strong>
            <div class="lab-meter"><span id="thought-stability-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>绝对化风险</span>
            <strong id="thought-risk-value"></strong>
            <div class="lab-meter"><span id="thought-risk-fill"></span></div>
          </div>
        </div>
      </article>

      <article class="lab-card">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Visual Verdict</p>
            <h3>当前这句话更像什么</h3>
          </div>
          <span class="simulation-badge">差异 · 边界 · 反馈 · 验证 · 风险</span>
        </div>
        <div class="thought-radar-shell">
          <div class="thought-radar-stage">
            <svg id="thought-radar" class="thought-radar" viewBox="0 0 240 240" role="img" aria-label="思辨罗盘可视化"></svg>
          </div>
          <div class="thought-radar-copy">
            <p class="lab-section-copy">这不是“越大越好”的五边形。前四个角越大越稳，最后一个角越大越危险。</p>
            <div id="thought-verdict" class="thought-verdict-grid"></div>
          </div>
        </div>
        <div class="thought-gate-grid">
          <div class="thought-gate" data-thought-gate="difference">
            <strong>先认出不同</strong>
            <span>没有差异，后面就只剩大词。</span>
          </div>
          <div class="thought-gate" data-thought-gate="boundary">
            <strong>再补出边界</strong>
            <span>没有边界，结构就站不起来。</span>
          </div>
          <div class="thought-gate" data-thought-gate="feedback">
            <strong>接上反馈</strong>
            <span>没有反馈，判断不会自我修正。</span>
          </div>
          <div class="thought-gate" data-thought-gate="validation">
            <strong>留下验证</strong>
            <span>没有验证，再顺也只是漂亮句子。</span>
          </div>
        </div>
        <div id="thought-summary" class="lab-result-card"></div>
      </article>
    </section>
  `;
}

function renderHierarchyLiftSection() {
  return `
    <section class="lab-grid lab-grid-two">
      <article class="lab-card">
        <p class="eyebrow">Hierarchy Visualizer</p>
        <h3>层级收纳器：看旧不稳定怎样变成新层势能</h3>
        <p class="lab-section-copy">
          这一组交互对应你的那句判断：层级不是在消除落差，而是在收纳落差。
          你可以直接看一个想法怎样从个人不稳定，慢慢长成草稿、共识、工具接口，最后逼近规则。
        </p>
        <div class="lab-preset-grid thought-preset-grid">
          ${HIERARCHY_LIFT_PRESETS.map((preset) => `
            <button
              class="lab-preset-button"
              type="button"
              data-lift-preset="${preset.id}"
              title="${preset.description}"
            >
              <strong>${preset.label}</strong>
              <span>${preset.description}</span>
            </button>
          `).join("")}
        </div>
        <div class="lab-controls">
          <label class="lab-range">
            <span>旧不稳定强度 <strong data-range-output="lift-instability"></strong></span>
            <input id="lift-instability" type="range" min="0" max="100" value="${HIERARCHY_LIFT_DEFAULTS["lift-instability"]}" />
          </label>
          <label class="lab-range">
            <span>外置程度 <strong data-range-output="lift-externalize"></strong></span>
            <input id="lift-externalize" type="range" min="0" max="100" value="${HIERARCHY_LIFT_DEFAULTS["lift-externalize"]}" />
          </label>
          <label class="lab-range">
            <span>汇聚程度 <strong data-range-output="lift-converge"></strong></span>
            <input id="lift-converge" type="range" min="0" max="100" value="${HIERARCHY_LIFT_DEFAULTS["lift-converge"]}" />
          </label>
          <label class="lab-range">
            <span>继承连续性 <strong data-range-output="lift-inherit"></strong></span>
            <input id="lift-inherit" type="range" min="0" max="100" value="${HIERARCHY_LIFT_DEFAULTS["lift-inherit"]}" />
          </label>
          <label class="lab-range">
            <span>接口清晰度 <strong data-range-output="lift-interface"></strong></span>
            <input id="lift-interface" type="range" min="0" max="100" value="${HIERARCHY_LIFT_DEFAULTS["lift-interface"]}" />
          </label>
          <label class="lab-range">
            <span>噪声冲击 <strong data-range-output="lift-noise"></strong></span>
            <input id="lift-noise" type="range" min="0" max="100" value="${HIERARCHY_LIFT_DEFAULTS["lift-noise"]}" />
          </label>
        </div>
      </article>

      <article class="lab-card lab-card-strong">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Lift Track</p>
            <h3>当前最可能停在哪一层</h3>
          </div>
          <span class="simulation-badge">外置 · 汇聚 · 继承 · 接口 · 抗噪</span>
        </div>
        <div id="lift-levels" class="layer-lift-shell">
          ${HIERARCHY_LIFT_LEVELS.map((level) => `
            <div class="layer-lift-node" data-lift-level="${level.key}">
              <small>${level.label}</small>
              <strong class="layer-lift-value" data-lift-value="${level.key}">0%</strong>
              <div class="layer-lift-bar">
                <span data-lift-fill="${level.key}"></span>
              </div>
              <p>${level.copy}</p>
            </div>
          `).join("")}
        </div>
        <div class="lab-metrics">
          <div class="lab-metric">
            <span>外置转译率</span>
            <strong id="lift-translation-value"></strong>
            <div class="lab-meter"><span id="lift-translation-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>继承保留率</span>
            <strong id="lift-retention-value"></strong>
            <div class="lab-meter"><span id="lift-retention-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>规则沉淀度</span>
            <strong id="lift-rule-value"></strong>
            <div class="lab-meter"><span id="lift-rule-fill"></span></div>
          </div>
        </div>
        <div id="lift-summary" class="lab-result-card"></div>
      </article>
    </section>
  `;
}

function initThoughtCompass() {
  const presetMap = new Map(THOUGHT_COMPASS_PRESETS.map((preset) => [preset.id, preset.values]));

  const setValues = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      const input = dom.labContent.querySelector(`#${key}`);
      if (input) {
        input.value = String(value);
      }
    });
  };

  const updateThoughtCompass = () => {
    const axisValues = THOUGHT_COMPASS_AXES.map((axis) => ({
      ...axis,
      value: getRatio(axis.key),
    }));

    axisValues.forEach((axis) => {
      setRangeOutput(axis.key, `${Math.round(axis.value * 100)}%`);
    });

    const [difference, boundary, feedback, validation, overclaim] = axisValues.map((axis) => axis.value);
    const method = clamp01(0.33 * difference + 0.22 * boundary + 0.2 * feedback + 0.25 * validation);
    const stability = clamp01(0.24 * difference + 0.26 * boundary + 0.22 * feedback + 0.28 * validation);
    const risk = clamp01(0.7 * overclaim + 0.18 * (1 - validation) + 0.12 * (1 - boundary));
    const usable = clamp01((0.56 * stability + 0.44 * method) - risk * 0.38);

    setMeter("thought-method", method);
    setMeter("thought-stability", stability);
    setMeter("thought-risk", risk);

    const radar = dom.labContent.querySelector("#thought-radar");
    if (radar) {
      radar.innerHTML = buildThoughtRadarMarkup(axisValues);
    }

    const bottlenecks = [
      ["边界", boundary],
      ["反馈", feedback],
      ["验证", validation],
      ["克制", 1 - overclaim],
    ].sort((a, b) => a[1] - b[1]);

    const gateStates = [
      { key: "difference", value: difference, summary: difference > 0.46 ? "已经抓到显著不同。" : "差异还太薄，先别急着上结论。" },
      { key: "boundary", value: boundary, summary: boundary > 0.48 ? "边界开始清楚。" : "边界模糊，容易把背景起伏误当结构。" },
      { key: "feedback", value: feedback, summary: feedback > 0.48 ? "反馈链已经开始闭合。" : "反馈太弱，判断还不会自我修正。" },
      { key: "validation", value: validation, summary: validation > 0.48 ? "验证入口已经出现。" : "验证不足，语句还经不起反问。" },
    ];

    gateStates.forEach((gate) => {
      const node = dom.labContent.querySelector(`[data-thought-gate="${gate.key}"]`);
      if (!node) return;
      node.dataset.state = gate.value > 0.48 ? "active" : "waiting";
      node.querySelector("span").textContent = gate.summary;
    });

    let type = "灵感句";
    let nextStep = "先补边界和验证，不要急着把它抬到终极高度。";
    if (risk > 0.78 && validation < 0.4) {
      type = "万能词警报";
      nextStep = "先降强度，把“绝对解释”改回工作假设和可反问句。";
    } else if (usable >= 0.72 && stability >= 0.72 && validation >= 0.68 && risk < 0.28) {
      type = "规则候选";
      nextStep = "已经接近可重复表达，下一步该补失败条件和适用边界。";
    } else if (usable >= 0.46) {
      type = "结构判断";
      nextStep = "可以先当中层判断使用，但还要继续补反馈和验证密度。";
    }

    const verdict = dom.labContent.querySelector("#thought-verdict");
    if (verdict) {
      verdict.innerHTML = `
        <span class="thought-chip">${type}</span>
        <span class="thought-chip">最短板：${bottlenecks[0][0]}</span>
        <span class="thought-chip ${risk > 0.62 ? "is-alert" : ""}">可用度：${Math.round(usable * 100)}%</span>
      `;
    }

    const summary = dom.labContent.querySelector("#thought-summary");
    if (summary) {
      summary.innerHTML = `
        <h4>当前判断</h4>
        <p>
          这句话当前更像<strong>${type}</strong>。
          方法贴合度是 ${Math.round(method * 100)}%，结构站稳度是 ${Math.round(stability * 100)}%，
          绝对化风险是 ${Math.round(risk * 100)}%。
        </p>
        <p>
          现在最短板是“${bottlenecks[0][0]}”。${nextStep}
        </p>
      `;
    }
  };

  dom.labContent.querySelectorAll("[data-thought-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presetMap.get(button.dataset.thoughtPreset);
      if (!preset) return;
      setValues(preset);
      updateThoughtCompass();
    });
  });

  THOUGHT_COMPASS_AXES.forEach((axis) => {
    dom.labContent.querySelector(`#${axis.key}`)?.addEventListener("input", updateThoughtCompass);
  });

  setValues(THOUGHT_COMPASS_DEFAULTS);
  updateThoughtCompass();
}

function initHierarchyLift() {
  const presetMap = new Map(HIERARCHY_LIFT_PRESETS.map((preset) => [preset.id, preset.values]));

  const setValues = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      const input = dom.labContent.querySelector(`#${key}`);
      if (input) {
        input.value = String(value);
      }
    });
  };

  const updateHierarchyLift = () => {
    const instability = getRatio("lift-instability");
    const externalize = getRatio("lift-externalize");
    const converge = getRatio("lift-converge");
    const inherit = getRatio("lift-inherit");
    const iface = getRatio("lift-interface");
    const noise = getRatio("lift-noise");

    [
      "lift-instability",
      "lift-externalize",
      "lift-converge",
      "lift-inherit",
      "lift-interface",
      "lift-noise",
    ].forEach((id) => {
      setRangeOutput(id, `${Math.round(getRatio(id) * 100)}%`);
    });

    const levels = {
      mind: instability,
      draft: clamp01(instability * (0.4 + externalize * 0.6) * (0.95 - noise * 0.18)),
      group: 0,
      tool: 0,
      rule: 0,
    };

    levels.group = clamp01(levels.draft * (0.36 + converge * 0.54) * (0.96 - noise * 0.2));
    levels.tool = clamp01(levels.group * (0.32 + inherit * 0.3 + iface * 0.28) * (0.98 - noise * 0.12));
    levels.rule = clamp01(levels.tool * (0.3 + inherit * 0.34 + iface * 0.22 + converge * 0.12) * (0.99 - noise * 0.1));

    const translation = clamp01(0.38 * externalize + 0.36 * converge + 0.26 * iface);
    const retention = clamp01(0.46 * inherit + 0.24 * iface + 0.18 * converge + 0.12 * (1 - noise));
    const ruleDepth = levels.rule;

    setMeter("lift-translation", translation);
    setMeter("lift-retention", retention);
    setMeter("lift-rule", ruleDepth);

    const orderedLevels = HIERARCHY_LIFT_LEVELS.map((level) => ({
      ...level,
      value: levels[level.key],
    }));
    const activeIndex = orderedLevels.reduce((bestIndex, level, index) => (
      level.value >= 0.22 ? index : bestIndex
    ), 0);

    orderedLevels.forEach((level, index) => {
      const node = dom.labContent.querySelector(`[data-lift-level="${level.key}"]`);
      const fill = dom.labContent.querySelector(`[data-lift-fill="${level.key}"]`);
      const valueText = dom.labContent.querySelector(`[data-lift-value="${level.key}"]`);
      if (!node || !fill || !valueText) return;
      valueText.textContent = `${Math.round(level.value * 100)}%`;
      fill.style.height = `${Math.max(8, Math.round(level.value * 100))}%`;
      node.classList.toggle("is-reached", level.value >= 0.22);
      node.classList.toggle("is-current", index === activeIndex);
    });

    const bottlenecks = [
      ["外置", externalize],
      ["汇聚", converge],
      ["继承", inherit],
      ["接口", iface],
      ["抗噪", 1 - noise],
    ].sort((a, b) => a[1] - b[1]);

    const stageLine = [
      "旧不稳定还主要停在个体里，最需要的是把它先写出来。",
      "已经外置成草稿，但还缺少稳定汇聚。",
      "已经能被小群接住，下一步要让它脱离具体说话场景。",
      "已经长成工具和 workflow，可以开始稳定回写。",
      "已经接近规则沉淀，开始具有跨主体、跨时段的寿命。",
    ][activeIndex];

    const summary = dom.labContent.querySelector("#lift-summary");
    if (summary) {
      summary.innerHTML = `
        <h4>当前停层</h4>
        <p>
          当前最可能停在<strong>${orderedLevels[activeIndex].label}</strong>层。
          ${stageLine}
        </p>
        <p>
          现在最大的瓶颈是“${bottlenecks[0][0]}”。如果想再上一层，
          就别只继续堆不稳定本身，而要优先补这一项。
        </p>
      `;
    }
  };

  dom.labContent.querySelectorAll("[data-lift-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presetMap.get(button.dataset.liftPreset);
      if (!preset) return;
      setValues(preset);
      updateHierarchyLift();
    });
  });

  [
    "lift-instability",
    "lift-externalize",
    "lift-converge",
    "lift-inherit",
    "lift-interface",
    "lift-noise",
  ].forEach((id) => {
    dom.labContent.querySelector(`#${id}`)?.addEventListener("input", updateHierarchyLift);
  });

  setValues(HIERARCHY_LIFT_DEFAULTS);
  updateHierarchyLift();
}

function getSnakeFlowVector(x, y, width, height) {
  return normalizeVector({
    x: 0.88 + ((height * 0.48) - y) / height * 0.34,
    y: ((height * 0.5) - y) / height * 1.12 + Math.sin((x / width) * Math.PI * 2) * 0.18,
  });
}

function getSwarmFlowVector(x, y, width, height) {
  const basinX = width * 0.68;
  const basinY = height * 0.52;

  return normalizeVector({
    x: 0.24 + (basinX - x) / width * 1.42,
    y: (basinY - y) / height * 1.08 + Math.cos(((x + y) / width) * Math.PI * 1.7) * 0.08,
  });
}

function renderPlayIcon(kind) {
  const icons = {
    snake: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7c3-3 6-3 9 0s5 3 7 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M6 13c2.5-2.4 5.3-2.4 8 0s4.7 2.4 6.5 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="18.4" cy="12.9" r="1.5" fill="currentColor"/>
      </svg>
    `,
    swarm: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.4" fill="currentColor"/>
        <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <circle cx="12" cy="12" r="10.2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2.6 2.6"/>
      </svg>
    `,
    brain: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.2 5.1a3.2 3.2 0 0 0-3 3.2c-1.4.5-2.2 1.7-2.2 3.1 0 1.6 1 2.8 2.5 3.2.3 2 1.9 3.3 3.9 3.3 1 0 1.9-.3 2.6-.9.8.6 1.7.9 2.7.9 2 0 3.6-1.4 3.9-3.4 1.4-.5 2.4-1.7 2.4-3.1 0-1.5-.9-2.7-2.3-3.2a3.2 3.2 0 0 0-3.1-3.1c-1.1 0-2.1.5-2.8 1.2A4 4 0 0 0 12 4c-1.1 0-2.1.4-2.8 1.1Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M12 7.3v9.4M9.4 9.2c1 .3 1.7 1 2 2m4.2-2c-1 .3-1.7 1-2 2m-1.8 2c-.4.9-1.1 1.5-2 1.8m4.1-1.8c.4.9 1.1 1.5 2 1.8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
      </svg>
    `,
    play: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 7.5v9l8-4.5-8-4.5Z" fill="currentColor"/>
        <rect x="3.5" y="4.5" width="17" height="15" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
  };

  return `<span class="game-icon" aria-hidden="true">${icons[kind] || icons.play}</span>`;
}

function renderPlayNavigatorSection() {
  return `
    <section class="lab-grid lab-grid-three">
      <article class="lab-card game-launch-card">
        <p class="eyebrow">Game 01</p>
        <h3 class="game-card-title">${renderPlayIcon("snake")}差流游蛇</h3>
        <p>更像贪吃蛇。你不是只追求变长，而是要顺着流把差异拖成稳住的尾迹。</p>
        <div class="lab-mini-points">
          <span>核心词：落差、流向、断裂</span>
          <span>更适合感受“结构不是吃出来，而是站住的”</span>
        </div>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-play-jump="play-snake">去玩这个</button>
        </div>
      </article>

      <article class="lab-card game-launch-card">
        <p class="eyebrow">Game 02</p>
        <h3 class="game-card-title">${renderPlayIcon("swarm")}结构吞并场</h3>
        <p>更像球球大作战。你会不断变大，但真正的目标是把体量沉成稳定轨道和结构环。</p>
        <div class="lab-mini-points">
          <span>核心词：吞并、汇聚、沉淀</span>
          <span>更适合感受“变大”与“成结构”不是一回事</span>
        </div>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-play-jump="play-swarm">去玩这个</button>
        </div>
      </article>

      <article class="lab-card game-launch-card">
        <p class="eyebrow">Game 03</p>
        <h3 class="game-card-title">${renderPlayIcon("brain")}缸中之脑实验台</h3>
        <p>更像思想实验。你不能直接看底层，只能通过测试和残差去逼近“自己到底身处哪一层”。</p>
        <div class="lab-mini-points">
          <span>核心词：反馈、他者、记忆、接口</span>
          <span>更适合感受“判断依赖什么测试”</span>
        </div>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-play-jump="play-brain">去玩这个</button>
        </div>
      </article>
    </section>
  `;
}

function renderPlayableLabSection() {
  return `
    <section class="lab-grid lab-grid-two">
      <article id="play-snake" class="lab-card lab-card-strong" data-playground="snake">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Playable A</p>
            <h3 class="game-card-title">${renderPlayIcon("snake")}差流游蛇：顺着流吃差异，尾迹会长成结构</h3>
          </div>
          <span class="simulation-badge">落差 · 流向 · 结构</span>
        </div>
        <p class="lab-section-copy">
          这一块故意做得更像贪吃蛇。亮球是可吸收的差异，背景箭头是流向，
          你留下的尾迹就是最直观的结构。只顾着吃会变长，但只有顺流和少断裂，尾迹才会真正站稳。
        </p>
        <div class="play-scoreboard">
          <div class="play-score-chip">
            <span>得分</span>
            <strong id="snake-score-value"></strong>
          </div>
          <div class="play-score-chip">
            <span>连击</span>
            <strong id="snake-combo-value"></strong>
          </div>
          <div class="play-score-chip">
            <span>成环</span>
            <strong id="snake-loop-value"></strong>
          </div>
        </div>
        <div class="playground-shell">
          <canvas
            id="snake-canvas"
            class="playground-canvas"
            width="${PLAYGROUND_CANVAS.width}"
            height="${PLAYGROUND_CANVAS.height}"
            aria-label="差流游蛇交互画布"
          ></canvas>
        </div>
        <div class="playground-toolbar">
          <p class="playground-hint">移动指针、点击或拖动画面转向。亮球是落差，箭头是流向，发亮尾迹就是正在形成的结构。</p>
          <button class="reader-button" type="button" data-playground-reset="snake">重新开局</button>
        </div>
        <div class="lab-mini-points">
          <span>吃到落差球会增长</span>
          <span>顺流会更快更稳</span>
          <span>撞边界会让结构断裂</span>
        </div>
        <div class="lab-metrics">
          <div class="lab-metric">
            <span>吸收落差</span>
            <strong id="snake-difference-value"></strong>
            <div class="lab-meter"><span id="snake-difference-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>顺流率</span>
            <strong id="snake-harmony-value"></strong>
            <div class="lab-meter"><span id="snake-harmony-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>结构度</span>
            <strong id="snake-structure-value"></strong>
            <div class="lab-meter"><span id="snake-structure-fill"></span></div>
          </div>
        </div>
        <div id="snake-summary" class="lab-result-card"></div>
      </article>

      <article id="play-swarm" class="lab-card" data-playground="swarm">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Playable B</p>
            <h3 class="game-card-title">${renderPlayIcon("swarm")}结构吞并场：先吞入差异，再把体量沉成稳定环</h3>
          </div>
          <span class="simulation-badge">吞并 · 汇聚 · 沉淀</span>
        </div>
        <p class="lab-section-copy">
          这一块更接近球球大作战。你可以不断吞入差异，但“变大”不等于“形成结构”。
          只有在流场里慢慢收束，吞进去的体量才会沉成卫星环，变成更稳定的结构。
        </p>
        <div class="play-scoreboard">
          <div class="play-score-chip">
            <span>得分</span>
            <strong id="swarm-score-value"></strong>
          </div>
          <div class="play-score-chip">
            <span>连击</span>
            <strong id="swarm-combo-value"></strong>
          </div>
          <div class="play-score-chip">
            <span>沉淀环</span>
            <strong id="swarm-loop-value"></strong>
          </div>
        </div>
        <div class="playground-shell playground-shell-cool">
          <canvas
            id="swarm-canvas"
            class="playground-canvas"
            width="${PLAYGROUND_CANVAS.width}"
            height="${PLAYGROUND_CANVAS.height}"
            aria-label="结构吞并场交互画布"
          ></canvas>
        </div>
        <div class="playground-toolbar">
          <p class="playground-hint">拖动或点击画面改变聚集方向。金色粒子是差异，灰色噪声会打断沉淀，外圈卫星就是结构开始站稳。</p>
          <button class="reader-button" type="button" data-playground-reset="swarm">重新开局</button>
        </div>
        <div class="lab-mini-points">
          <span>吞差异只会先变大</span>
          <span>顺着流聚集更易沉淀</span>
          <span>卫星环代表结构稳定</span>
        </div>
        <div class="lab-metrics">
          <div class="lab-metric">
            <span>总体量</span>
            <strong id="swarm-mass-value"></strong>
            <div class="lab-meter"><span id="swarm-mass-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>流向协同</span>
            <strong id="swarm-harmony-value"></strong>
            <div class="lab-meter"><span id="swarm-harmony-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>沉淀结构度</span>
            <strong id="swarm-structure-value"></strong>
            <div class="lab-meter"><span id="swarm-structure-fill"></span></div>
          </div>
        </div>
        <div id="swarm-summary" class="lab-result-card"></div>
      </article>
    </section>
  `;
}

function renderBrainVatExperimentSection() {
  return `
    <section class="lab-grid lab-grid-two">
      <article id="play-brain" class="lab-card lab-card-strong" data-playground="brain-vat">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Thought Experiment</p>
            <h3 class="game-card-title">${renderPlayIcon("brain")}缸中之脑实验台：只靠回路，你能判断自己在哪吗</h3>
          </div>
          <span class="simulation-badge">反馈 · 阻力 · 他者 · 记忆</span>
        </div>
        <p class="lab-section-copy">
          这里不直接回答“你是不是缸中之脑”，而是让你亲手做判断。
          你只能通过差异、反馈、记忆、他者和输入缺口去逼近底层模式：
          是更像外界回路、缸中接口，还是介于两者之间的混合层。
        </p>
        <div class="lab-preset-grid brain-vat-action-grid">
          ${VAT_EXPERIMENT_ACTIONS.map((action) => `
            <button class="lab-preset-button brain-vat-action" type="button" data-vat-action="${action.id}" title="${action.hint}">
              <strong>${action.label}</strong>
              <span>${action.hint}</span>
            </button>
          `).join("")}
        </div>
        <p class="lab-section-copy">
          你可以先多测几步，再做判断；也可以直接押注。重点不是宣布终极，而是看哪些测试真正能撬动判断。
        </p>
        <div class="brain-vat-guess-grid">
          ${VAT_EXPERIMENT_SCENARIOS.map((scenario) => `
            <button class="reader-button brain-vat-guess" type="button" data-vat-guess="${scenario.id}">
              判断为${scenario.label}
            </button>
          `).join("")}
        </div>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-vat-reset="true">新一轮</button>
          <button class="reader-button" type="button" data-vat-reveal="true">直接揭示底层</button>
        </div>
      </article>

      <article class="lab-card">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Sensory Tank</p>
            <h3>当前感官场与推断残差</h3>
          </div>
          <span class="simulation-badge">你只能看见界面，不直接看见底层</span>
        </div>
        <div class="playground-shell brain-vat-shell">
          <canvas
            id="vat-canvas"
            class="playground-canvas brain-vat-canvas"
            width="${PLAYGROUND_CANVAS.width}"
            height="${PLAYGROUND_CANVAS.height}"
            aria-label="缸中之脑感官回路画布"
          ></canvas>
        </div>
        <div id="vat-status" class="thought-verdict-grid brain-vat-status"></div>
        <div class="lab-metrics brain-vat-metrics">
          <div class="lab-metric">
            <span>外界阻力</span>
            <strong id="vat-resistance-value"></strong>
            <div class="lab-meter"><span id="vat-resistance-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>他者独立</span>
            <strong id="vat-peer-value"></strong>
            <div class="lab-meter"><span id="vat-peer-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>记忆连续</span>
            <strong id="vat-memory-value"></strong>
            <div class="lab-meter"><span id="vat-memory-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>缸中疑度</span>
            <strong id="vat-suspicion-value"></strong>
            <div class="lab-meter"><span id="vat-suspicion-fill"></span></div>
          </div>
        </div>
        <div id="vat-summary" class="lab-result-card"></div>
        <div id="vat-log" class="brain-vat-log"></div>
      </article>
    </section>
  `;
}

function initBrainVatExperiment() {
  const root = dom.labContent.querySelector('[data-playground="brain-vat"]');
  const canvas = dom.labContent.querySelector("#vat-canvas");
  const summary = dom.labContent.querySelector("#vat-summary");
  const log = dom.labContent.querySelector("#vat-log");
  const status = dom.labContent.querySelector("#vat-status");

  if (!root || !canvas || !summary || !log || !status) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const actionMap = new Map(VAT_EXPERIMENT_ACTIONS.map((action) => [action.id, action]));
  const scenarioMap = new Map(VAT_EXPERIMENT_SCENARIOS.map((scenario) => [scenario.id, scenario]));
  const bounds = PLAYGROUND_CANVAS;

  let scenario = VAT_EXPERIMENT_SCENARIOS[0];
  let usedActions = new Set();
  let observations = [];
  let lastActionId = null;
  let resolved = false;
  let guessId = null;
  let estimates = {};
  let counts = {};

  const resetEstimates = () => {
    estimates = {
      resistance: 0.5,
      memory: 0.5,
      peer: 0.5,
      fill: 0.5,
      mask: 0.5,
      closure: 0.5,
      latency: 0.5,
    };
    counts = {
      resistance: 0,
      memory: 0,
      peer: 0,
      fill: 0,
      mask: 0,
      closure: 0,
      latency: 0,
    };
  };

  const observe = (key, value) => {
    const nextCount = counts[key] + 1;
    estimates[key] = (estimates[key] * counts[key] + value) / nextCount;
    counts[key] = nextCount;
  };

  const getEstimate = (key) => (counts[key] ? estimates[key] : 0.5);
  const sample = (base, span = 0.08) => clamp01(base + randomBetween(-span, span));

  const deriveViewModel = () => {
    const resistance = getEstimate("resistance");
    const memory = getEstimate("memory");
    const peer = getEstimate("peer");
    const fill = getEstimate("fill");
    const mask = getEstimate("mask");
    const closure = getEstimate("closure");

    const vatSuspicion = clamp01(
      0.24 * (1 - resistance)
      + 0.2 * (1 - memory)
      + 0.2 * (1 - peer)
      + 0.18 * fill
      + 0.18 * mask,
    );
    const realityConfidence = clamp01(
      0.34 * resistance
      + 0.24 * memory
      + 0.22 * peer
      + 0.12 * (1 - fill)
      + 0.08 * closure,
    );
    const mixedConfidence = clamp01(
      1 - Math.abs(vatSuspicion - realityConfidence) * 1.15 - Math.abs(fill - 0.5) * 0.12,
    );

    let suggestion = "layered";
    if (vatSuspicion - realityConfidence > 0.12) {
      suggestion = "vat";
    } else if (realityConfidence - vatSuspicion > 0.12) {
      suggestion = "reality";
    }

    return {
      resistance,
      memory,
      peer,
      fill,
      mask,
      closure,
      vatSuspicion,
      realityConfidence,
      mixedConfidence,
      suggestion,
    };
  };

  const buildSignalLine = (viewModel) => {
    const lines = [];

    if (viewModel.fill > 0.66) lines.push("输入缺口会被快速补满");
    if (viewModel.mask > 0.64) lines.push("系统会主动遮住输入源");
    if (viewModel.peer < 0.42) lines.push("他者回应独立度偏低");
    if (viewModel.resistance > 0.66) lines.push("外界阻力偏高");
    if (viewModel.memory < 0.42) lines.push("记忆细节容易被磨平");
    if (viewModel.closure > 0.78) lines.push("反馈回路过于顺滑");

    return lines.slice(0, 2).join("、") || "当前信号还不够分明";
  };

  const getRecommendedAction = (viewModel) => {
    const candidates = [
      {
        id: "body-jolt",
        score: Math.abs(viewModel.resistance - 0.5),
        reason: "它最能分出你感到的阻力到底是外界约束，还是界面补偿。",
      },
      {
        id: "peer-check",
        score: Math.abs(viewModel.peer - 0.5),
        reason: "它最能看出“他者”是不是独立主体，还是共享同一生成源。",
      },
      {
        id: "memory-audit",
        score: Math.abs(viewModel.memory - 0.5),
        reason: "它能检验你的连续性到底被什么维持住。",
      },
      {
        id: "input-cut",
        score: Math.abs(viewModel.fill - 0.5),
        reason: "它最能暴露系统会不会自动补白。",
      },
      {
        id: "trace-source",
        score: Math.abs(viewModel.mask - 0.5),
        reason: "它能测试界面是否主动把问题从源头引回你的内部。",
      },
      {
        id: "repeat-stimulus",
        score: Math.abs(viewModel.closure - 0.5),
        reason: "它能看出反馈是自然稳定，还是被抹得过于平整。",
      },
    ]
      .filter((item) => !usedActions.has(item.id))
      .sort((left, right) => left.score - right.score);

    return candidates[0] || null;
  };

  const generateObservation = (actionId) => {
    const profile = scenario.profile;

    if (actionId === "repeat-stimulus") {
      const closure = sample(profile.closure, 0.08);
      const latency = sample(profile.latency, 0.07);
      return {
        title: "重复刺激",
        probes: { closure, latency },
        text:
          closure > 0.82 && latency < 0.24
            ? "你重复了同一刺激，回路几乎秒回，细部差异被抹得很干净。"
            : closure > 0.68
              ? "你重复了同一刺激，主链能复现，但仍能感觉到惯性、滞后和一些边角摩擦。"
              : "同样刺激也带出明显漂移，像是外界约束和接口补偿都没有把它完全钉死。",
      };
    }

    if (actionId === "body-jolt") {
      const resistance = sample(profile.resistance, 0.09);
      return {
        title: "扰动身体",
        probes: { resistance },
        text:
          resistance > 0.64
            ? "你故意扰动动作后，世界留下了可感的惰性和回摆，像在撞真实阻力。"
            : "你一偏离，系统就迅速把扰动补平，阻力更像来自柔性的界面层。",
      };
    }

    if (actionId === "peer-check") {
      const peer = sample(profile.peer, 0.1);
      return {
        title: "问他者同证",
        probes: { peer },
        text:
          peer > 0.62
            ? "他者保留了自己的误解、盲区和迟疑，回应没有完全跟着你同步。"
            : "他者回应和你的预期过于同频，像从同一模板里出声。",
      };
    }

    if (actionId === "input-cut") {
      const fill = sample(profile.fill, 0.1);
      return {
        title: "切断部分输入",
        probes: { fill },
        text:
          fill > 0.66
            ? "你抽掉一部分输入后，系统没有老实留白，而是迅速补出连续画面和叙事。"
            : "输入一断，空白就真的露出来了，世界并没有立刻替你把洞补上。",
      };
    }

    if (actionId === "memory-audit") {
      const memory = sample(profile.memory, 0.1);
      return {
        title: "回查记忆链",
        probes: { memory },
        text:
          memory > 0.62
            ? "记忆不完美，但主链还能被旧痕迹和外证钉住，不像随回忆一起重写。"
            : "回忆链表面顺滑，但边角细节互相覆盖，越追越像被磨平的摘要。",
      };
    }

    const mask = sample(profile.mask, 0.09);
    return {
      title: "追问输入源",
      probes: { mask },
      text:
        mask > 0.64
          ? "你一追问输入源头，系统就迅速把问题改写成你的体验问题，像在主动遮住接口层。"
          : "你继续追问时，系统反而承认了边界、未知和暂时解释不到的部分。",
    };
  };

  const updateUi = () => {
    const viewModel = deriveViewModel();
    const recommended = getRecommendedAction(viewModel);
    const suggestionLabel = scenarioMap.get(viewModel.suggestion)?.label || "混合层";
    const usedCount = usedActions.size;

    setPlaygroundMetric("vat-resistance", viewModel.resistance, `${Math.round(viewModel.resistance * 100)}%`);
    setPlaygroundMetric("vat-peer", viewModel.peer, `${Math.round(viewModel.peer * 100)}%`);
    setPlaygroundMetric("vat-memory", viewModel.memory, `${Math.round(viewModel.memory * 100)}%`);
    setPlaygroundMetric("vat-suspicion", viewModel.vatSuspicion, `${Math.round(viewModel.vatSuspicion * 100)}%`);

    status.innerHTML = `
      <span class="thought-chip">已做测试：${usedCount}/${VAT_EXPERIMENT_ACTIONS.length}</span>
      <span class="thought-chip">当前更像：${suggestionLabel}</span>
      <span class="thought-chip ${viewModel.vatSuspicion > 0.64 ? "is-alert" : ""}">补画强度：${Math.round(viewModel.fill * 100)}%</span>
      <span class="thought-chip">反馈闭合：${Math.round(viewModel.closure * 100)}%</span>
    `;

    root.querySelectorAll("[data-vat-action]").forEach((button) => {
      const actionId = button.dataset.vatAction;
      const used = usedActions.has(actionId);
      button.disabled = used || resolved;
      button.dataset.state = used ? "used" : "ready";
    });

    root.querySelectorAll("[data-vat-guess]").forEach((button) => {
      const currentId = button.dataset.vatGuess;
      button.disabled = resolved;
      button.classList.toggle("is-selected", guessId === currentId);
      button.classList.toggle("is-correct", resolved && scenario.id === currentId);
      button.classList.toggle("is-wrong", resolved && guessId === currentId && scenario.id !== currentId);
    });

    if (!resolved) {
      summary.innerHTML = `
        <h4>当前判断</h4>
        <p>
          现在它更像<strong>${suggestionLabel}</strong>，但这只是基于你已经做的 ${usedCount} 次测试得到的临时推断，
          还不是“终局真相”。目前最显著的信号是：${buildSignalLine(viewModel)}。
        </p>
        <p>
          ${recommended
            ? `下一步最值得做的是“${actionMap.get(recommended.id)?.label}”。${recommended.reason}`
            : "你已经把六个测试都做过了，现在可以直接给出判断，或者揭示这一轮的底层。"}
        </p>
      `;
    } else {
      const guessedLabel = guessId ? scenarioMap.get(guessId)?.label : "直接揭示";
      const verdict = guessId
        ? guessId === scenario.id
          ? `你的判断落在了正确层级上：你把它判成了${scenario.label}。`
          : `你把它判成了${guessedLabel}，这一轮实际更像${scenario.label}。`
        : "你选择了直接揭示底层。";

      summary.innerHTML = `
        <h4>本轮揭示</h4>
        <p>
          ${verdict}${scenario.reveal}
        </p>
        <p>
          这一轮最关键的线索是：${buildSignalLine(viewModel)}。
          它提醒我们的不是“宣布终极”，而是知道该用什么测试去逼近底层。
        </p>
      `;
    }

    log.innerHTML = observations.length
      ? observations.map((entry) => `
          <div class="brain-vat-log-item" data-tone="${entry.tone}">
            <small>${entry.title}</small>
            <p>${entry.text}</p>
          </div>
        `).join("")
      : `
          <div class="brain-vat-log-item is-empty">
            <small>实验日志</small>
            <p>先从左侧点一个测试。这里会记录你刚刚在回路里观察到的差异。</p>
          </div>
        `;
  };

  const drawScene = (now) => {
    const viewModel = deriveViewModel();
    const suspicion = viewModel.vatSuspicion;
    const reality = viewModel.realityConfidence;
    const fill = viewModel.fill;
    const closure = viewModel.closure;
    const interfaceMask = viewModel.mask;
    const liquidTop = 94 + fill * 28 + Math.sin(now * 0.0023) * 2.4;
    const brainCenter = { x: bounds.width * 0.5, y: bounds.height * 0.55 };
    const tank = { x: 52, y: 22, width: 316, height: 202 };
    const nodes = [
      { x: 96, y: 48, key: "repeat-stimulus" },
      { x: 314, y: 48, key: "input-cut" },
      { x: 348, y: 128, key: "peer-check" },
      { x: 72, y: 128, key: "trace-source" },
      { x: 210, y: 208, key: "body-jolt" },
      { x: 210, y: 82, key: "memory-audit" },
    ];

    ctx.clearRect(0, 0, bounds.width, bounds.height);

    const background = ctx.createLinearGradient(0, 0, bounds.width, bounds.height);
    background.addColorStop(0, suspicion > 0.58 ? "#eef5ff" : "#fff8ee");
    background.addColorStop(1, reality > 0.56 ? "#efe5da" : "#edf0f5");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, bounds.width, bounds.height);

    ctx.save();
    ctx.fillStyle = suspicion > 0.58 ? "rgba(84, 111, 140, 0.12)" : "rgba(216, 154, 87, 0.1)";
    ctx.beginPath();
    ctx.arc(58, 42, 28, 0, Math.PI * 2);
    ctx.arc(bounds.width - 48, bounds.height - 28, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(117, 100, 88, 0.22)";
    ctx.lineWidth = 2;
    ctx.strokeRect(tank.x, tank.y, tank.width, tank.height);
    ctx.restore();

    const liquidGradient = ctx.createLinearGradient(0, tank.y, 0, tank.y + tank.height);
    liquidGradient.addColorStop(0, suspicion > 0.58 ? "rgba(154, 194, 229, 0.52)" : "rgba(221, 187, 145, 0.44)");
    liquidGradient.addColorStop(1, suspicion > 0.58 ? "rgba(82, 130, 174, 0.38)" : "rgba(196, 139, 89, 0.28)");
    ctx.save();
    ctx.fillStyle = liquidGradient;
    ctx.beginPath();
    ctx.moveTo(tank.x, liquidTop);
    for (let x = tank.x; x <= tank.x + tank.width; x += 12) {
      const wave = Math.sin((x * 0.05) + now * 0.0033) * (3 + closure * 5);
      ctx.lineTo(x, liquidTop + wave);
    }
    ctx.lineTo(tank.x + tank.width, tank.y + tank.height);
    ctx.lineTo(tank.x, tank.y + tank.height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(139, 63, 52, 0.82)";
    ctx.fillText("感官液面", tank.x + 10, liquidTop - 10);
    ctx.fillText("接口边界", tank.x + tank.width - 60, tank.y + 16);
    ctx.restore();

    nodes.forEach((node, index) => {
      ctx.save();
      ctx.strokeStyle = "rgba(117, 100, 88, 0.28)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(brainCenter.x, brainCenter.y);
      ctx.stroke();

      const pulse = (Math.sin(now * 0.004 + index * 0.9) + 1) * 0.5;
      const pulseX = node.x + (brainCenter.x - node.x) * pulse;
      const pulseY = node.y + (brainCenter.y - node.y) * pulse;
      ctx.fillStyle = lastActionId === node.key ? "rgba(216, 154, 87, 0.95)" : "rgba(92, 118, 152, 0.55)";
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, lastActionId === node.key ? 4.4 : 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = lastActionId === node.key ? "#d89a57" : "#5a7697";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(92, 118, 152, 0.25)";
      ctx.beginPath();
      ctx.arc(node.x, node.y, 7.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    if (interfaceMask > 0.58) {
      ctx.save();
      ctx.strokeStyle = "rgba(84, 111, 140, 0.18)";
      ctx.lineWidth = 1;
      for (let y = 32; y < bounds.height - 16; y += 10) {
        ctx.beginPath();
        ctx.moveTo(34, y + Math.sin(now * 0.003 + y * 0.1) * 1.2);
        ctx.lineTo(bounds.width - 34, y + Math.cos(now * 0.003 + y * 0.1) * 1.2);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.save();
    const halo = ctx.createRadialGradient(brainCenter.x, brainCenter.y, 12, brainCenter.x, brainCenter.y, 56);
    halo.addColorStop(0, suspicion > 0.56 ? "rgba(140, 182, 223, 0.28)" : "rgba(229, 186, 132, 0.24)");
    halo.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(brainCenter.x, brainCenter.y, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const lobes = [
      { x: -18, y: -8, r: 17 },
      { x: 0, y: -12, r: 19 },
      { x: 18, y: -7, r: 16 },
      { x: -10, y: 10, r: 15 },
      { x: 12, y: 10, r: 14 },
    ];
    lobes.forEach((lobe, index) => {
      ctx.save();
      ctx.fillStyle = index % 2 === 0 ? "#f2d7b5" : "#f7e3c6";
      ctx.strokeStyle = suspicion > 0.56 ? "#5a7697" : "#8b3f34";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(brainCenter.x + lobe.x, brainCenter.y + lobe.y, lobe.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    ctx.save();
    ctx.strokeStyle = "rgba(117, 100, 88, 0.34)";
    ctx.lineWidth = 1.2;
    for (let curve = -16; curve <= 16; curve += 8) {
      ctx.beginPath();
      ctx.moveTo(brainCenter.x - 22, brainCenter.y + curve);
      ctx.bezierCurveTo(
        brainCenter.x - 8,
        brainCenter.y + curve - 8,
        brainCenter.x + 8,
        brainCenter.y + curve + 8,
        brainCenter.x + 22,
        brainCenter.y + curve,
      );
      ctx.stroke();
    }
    ctx.restore();

    if (reality > 0.56) {
      for (let index = 0; index < 12; index += 1) {
        const px = 24 + (index * 31 + now * 0.02) % (bounds.width - 48);
        const py = 18 + ((index * 47) % (bounds.height - 36));
        ctx.save();
        ctx.fillStyle = "rgba(139, 63, 52, 0.18)";
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  };

  const performAction = (actionId) => {
    if (resolved || usedActions.has(actionId)) return;

    const observation = generateObservation(actionId);
    Object.entries(observation.probes).forEach(([key, value]) => observe(key, value));

    observations = [
      {
        id: actionId,
        title: observation.title,
        text: observation.text,
        tone: actionId === "trace-source" || actionId === "input-cut" ? "glitch" : "note",
      },
      ...observations,
    ].slice(0, VAT_EXPERIMENT_ACTIONS.length);
    usedActions = new Set([...usedActions, actionId]);
    lastActionId = actionId;
    updateUi();
  };

  const reveal = (nextGuessId = null) => {
    resolved = true;
    guessId = nextGuessId;
    updateUi();
  };

  const resetRound = () => {
    scenario = VAT_EXPERIMENT_SCENARIOS[Math.floor(Math.random() * VAT_EXPERIMENT_SCENARIOS.length)];
    usedActions = new Set();
    observations = [];
    lastActionId = null;
    resolved = false;
    guessId = null;
    resetEstimates();
    updateUi();
  };

  const handleReset = () => resetRound();
  const handleReveal = () => reveal(null);

  const actionButtons = [...root.querySelectorAll("[data-vat-action]")];
  const guessButtons = [...root.querySelectorAll("[data-vat-guess]")];
  const resetButton = root.querySelector("[data-vat-reset]");
  const revealButton = root.querySelector("[data-vat-reveal]");

  actionButtons.forEach((button) => {
    const handler = () => performAction(button.dataset.vatAction);
    button.__vatHandler = handler;
    button.addEventListener("click", handler);
  });

  guessButtons.forEach((button) => {
    const handler = () => reveal(button.dataset.vatGuess);
    button.__vatGuessHandler = handler;
    button.addEventListener("click", handler);
  });

  resetButton?.addEventListener("click", handleReset);
  revealButton?.addEventListener("click", handleReveal);

  resetRound();

  const loopCleanup = startPlaygroundLoop((dt, now) => {
    void dt;
    drawScene(now);
  });

  registerLabPlaygroundCleanup(() => {
    loopCleanup();
    actionButtons.forEach((button) => {
      if (button.__vatHandler) {
        button.removeEventListener("click", button.__vatHandler);
        delete button.__vatHandler;
      }
    });
    guessButtons.forEach((button) => {
      if (button.__vatGuessHandler) {
        button.removeEventListener("click", button.__vatGuessHandler);
        delete button.__vatGuessHandler;
      }
    });
    resetButton?.removeEventListener("click", handleReset);
    revealButton?.removeEventListener("click", handleReveal);
  });
}

function initDifferenceSnakePlayground() {
  const root = dom.labContent.querySelector('[data-playground="snake"]');
  const canvas = root?.querySelector("#snake-canvas");
  const summary = root?.querySelector("#snake-summary");

  if (!root || !canvas || !summary) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const bounds = PLAYGROUND_CANVAS;
  let snake = [];
  let particles = [];
  let targetLength = 7;
  let totalDifference = 0;
  let harmony = 0.46;
  let structure = 0.22;
  let instability = 0;
  let score = 0;
  let combo = 0;
  let ringsClosed = 0;
  let loopCharge = 0;
  let comboTimer = 0;
  let direction = { x: 1, y: 0 };
  let targetDirection = { x: 1, y: 0 };

  const spawnParticle = () => ({
    x: randomBetween(34, bounds.width - 34),
    y: randomBetween(30, bounds.height - 30),
    radius: randomBetween(4, 6.6),
    value: Math.random() > 0.72 ? 2 : 1,
    pulse: randomBetween(0, Math.PI * 2),
  });

  const resetGame = () => {
    targetLength = 7;
    totalDifference = 0;
    harmony = 0.46;
    structure = 0.22;
    instability = 0;
    score = 0;
    combo = 0;
    ringsClosed = 0;
    loopCharge = 0;
    comboTimer = 0;
    direction = { x: 1, y: 0 };
    targetDirection = { x: 1, y: 0 };
    snake = Array.from({ length: targetLength }, (_, index) => ({
      x: 104 - index * 11,
      y: bounds.height * 0.55,
    }));
    particles = Array.from({ length: FLOW_SNAKE_PARTICLE_COUNT }, spawnParticle);
  };

  const fracture = () => {
    targetLength = Math.max(5, targetLength - 3);
    harmony = clamp01(harmony * 0.78);
    instability = clamp01(instability + 0.28);
    score = Math.max(0, score - 18);
    combo = 0;
    comboTimer = 0;
    loopCharge = Math.max(0, loopCharge - 0.36);
    direction = { x: 1, y: 0 };
    targetDirection = { x: 1, y: 0 };
    snake = Array.from({ length: targetLength }, (_, index) => ({
      x: 104 - index * 11,
      y: bounds.height * 0.55,
    }));
  };

  const updateUi = () => {
    setPlaygroundMetric("snake-difference", totalDifference / 28, `${totalDifference}`);
    setPlaygroundMetric("snake-harmony", harmony, `${Math.round(harmony * 100)}%`);
    setPlaygroundMetric("snake-structure", structure, `${Math.round(structure * 100)}%`);
    setPlayText("snake-score-value", `${Math.round(score)}`);
    setPlayText("snake-combo-value", combo > 0 ? `x${combo}` : "x0");
    setPlayText("snake-loop-value", `${ringsClosed} (${Math.round(clamp01(loopCharge) * 100)}%)`);

    let verdict = "先顺着箭头走，让尾迹少断几次，差异才更容易排成结构。";
    if (structure > 0.72) {
      verdict = "你已经把吸进来的差异拖成了可见结构，流向正在帮你维持它。";
    } else if (harmony > 0.62) {
      verdict = "你正在借流向收差，尾迹已经开始站稳，但还没完全锁住。";
    } else if (instability > 0.14) {
      verdict = "尾迹刚刚断过。吃到差异不等于留下结构，边界和走向也在起作用。";
    }

    summary.innerHTML = `
      <h4>玩法解释</h4>
      <p>
        当前尾迹长度是 <strong>${targetLength}</strong>，已经收进了 <strong>${totalDifference}</strong> 份落差。
        顺流率为 ${Math.round(harmony * 100)}%，结构度为 ${Math.round(structure * 100)}%。
      </p>
      <p>${verdict}</p>
    `;
  };

  const drawScene = (now) => {
    ctx.clearRect(0, 0, bounds.width, bounds.height);

    const background = ctx.createLinearGradient(0, 0, bounds.width, bounds.height);
    background.addColorStop(0, "#fff8ee");
    background.addColorStop(1, "#efe8de");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, bounds.width, bounds.height);

    ctx.save();
    ctx.fillStyle = "rgba(217, 156, 91, 0.18)";
    ctx.beginPath();
    ctx.arc(54, 46, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(90, 118, 151, 0.12)";
    ctx.beginPath();
    ctx.arc(bounds.width - 46, bounds.height - 34, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    for (let y = 24; y < bounds.height; y += 44) {
      for (let x = 24; x < bounds.width; x += 44) {
        drawVectorArrow(
          ctx,
          x,
          y,
          getSnakeFlowVector(x, y, bounds.width, bounds.height),
          15,
          "rgba(117, 100, 88, 0.35)",
          0.85,
        );
      }
    }

    ctx.save();
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(139, 63, 52, 0.8)";
    ctx.fillText("高差", 28, 26);
    ctx.fillText("低势", bounds.width - 58, bounds.height - 12);
    ctx.restore();

    particles.forEach((particle) => {
      const pulse = 0.7 + Math.sin(now * 0.004 + particle.pulse) * 0.12;
      ctx.save();
      ctx.globalAlpha = pulse;
      ctx.fillStyle = particle.value > 1 ? "#d98f43" : "#e1b66f";
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(217, 156, 91, 0.5)";
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    if (snake.length > 1) {
      ctx.save();
      ctx.strokeStyle = `rgba(226, 175, 109, ${0.18 + structure * 0.26})`;
      ctx.lineWidth = 18;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.moveTo(segment.x, segment.y);
        } else {
          ctx.lineTo(segment.x, segment.y);
        }
      });
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = "#8b3f34";
      ctx.lineWidth = 10;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.moveTo(segment.x, segment.y);
        } else {
          ctx.lineTo(segment.x, segment.y);
        }
      });
      ctx.stroke();
      ctx.restore();
    }

    if (structure > 0.56 && snake.length > 8) {
      const braceIndexes = [0, 3, 6, Math.min(snake.length - 1, 9)];
      ctx.save();
      ctx.strokeStyle = `rgba(84, 111, 140, ${0.2 + structure * 0.28})`;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      braceIndexes.forEach((index, order) => {
        const node = snake[index];
        if (!node) return;
        if (order === 0) {
          ctx.moveTo(node.x, node.y);
        } else {
          ctx.lineTo(node.x, node.y);
        }
      });
      ctx.stroke();
      ctx.restore();
    }

    const head = snake[0];
    if (head) {
      ctx.save();
      ctx.fillStyle = "#f7ecd7";
      ctx.strokeStyle = "#8b3f34";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 9.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const flow = getSnakeFlowVector(head.x, head.y, bounds.width, bounds.height);
      drawVectorArrow(ctx, head.x, head.y, flow, 20, "rgba(84, 111, 140, 0.78)", 1);
      ctx.restore();
    }
  };

  const updateGame = (dt) => {
    const head = snake[0];
    if (!head) return;

    comboTimer = Math.max(0, comboTimer - dt);
    if (comboTimer === 0) {
      combo = 0;
    }

    direction = normalizeVector({
      x: direction.x * 0.88 + targetDirection.x * 0.12,
      y: direction.y * 0.88 + targetDirection.y * 0.12,
    }, direction);

    const flow = getSnakeFlowVector(head.x, head.y, bounds.width, bounds.height);
    const rawAlignment = direction.x * flow.x + direction.y * flow.y;
    const alignment = clamp01((rawAlignment + 1) / 2);

    harmony = clamp01(harmony * 0.93 + alignment * 0.07 - dt * 0.06 * Math.max(0, -rawAlignment));
    instability = Math.max(0, instability - dt * 0.08);

    const speed = 78 + alignment * 54;
    const nextHead = {
      x: head.x + direction.x * speed * dt,
      y: head.y + direction.y * speed * dt,
    };

    let collided = (
      nextHead.x < 14
      || nextHead.x > bounds.width - 14
      || nextHead.y < 14
      || nextHead.y > bounds.height - 14
    );

    if (!collided) {
      for (let index = 5; index < snake.length; index += 1) {
        if (distanceBetween(nextHead, snake[index]) < 10) {
          collided = true;
          break;
        }
      }
    }

    if (collided) {
      fracture();
    } else {
      snake.unshift(nextHead);
      while (snake.length > targetLength) {
        snake.pop();
      }
    }

    particles = particles.map((particle) => {
      const drift = getSnakeFlowVector(particle.x, particle.y, bounds.width, bounds.height);
      let nextX = particle.x + drift.x * dt * (16 + particle.value * 8);
      let nextY = particle.y + drift.y * dt * (12 + particle.value * 5);

      if (nextX > bounds.width + 12) nextX = -12;
      if (nextY > bounds.height + 12) nextY = -12;
      if (nextX < -12) nextX = bounds.width + 12;
      if (nextY < -12) nextY = bounds.height + 12;

      return {
        ...particle,
        x: nextX,
        y: nextY,
        pulse: particle.pulse + dt * 2.2,
      };
    });

    particles.forEach((particle, index) => {
      if (distanceBetween(snake[0], particle) < particle.radius + 10) {
        totalDifference += particle.value;
        targetLength = Math.min(28, targetLength + particle.value);
        harmony = clamp01(harmony + 0.03);
        combo = Math.min(12, comboTimer > 0 ? combo + 1 : 1);
        comboTimer = 2.4;
        score += particle.value * 12 + combo * 5 + Math.round(harmony * 10);
        loopCharge = Math.min(1.24, loopCharge + 0.04 * particle.value);
        particles[index] = spawnParticle();
      }
    });

    structure = clamp01(((targetLength - 6) / 18) * 0.62 + harmony * 0.38 - instability * 0.55);

    if (snake.length > 10) {
      const tail = snake[snake.length - 1];
      const headTailGap = tail ? distanceBetween(snake[0], tail) : 120;
      const loopSignal =
        clamp01((structure - 0.56) / 0.34) *
        clamp01((harmony - 0.54) / 0.34) *
        clamp01(1 - headTailGap / 88);

      if (loopSignal > 0.12) {
        loopCharge = Math.min(1.24, loopCharge + dt * (0.2 + loopSignal * 0.92));
      } else {
        loopCharge = Math.max(0, loopCharge - dt * 0.28);
      }

      if (loopCharge >= 1) {
        ringsClosed += 1;
        loopCharge = 0;
        score += 64 + ringsClosed * 14;
        combo = Math.max(combo, 2);
        comboTimer = Math.max(comboTimer, 1.8);
        harmony = clamp01(harmony + 0.08);
      }
    } else {
      loopCharge = Math.max(0, loopCharge - dt * 0.32);
    }
  };

  const handleAim = ({ x, y }) => {
    const head = snake[0];
    if (!head || distanceBetween(head, { x, y }) < 10) return;
    targetDirection = normalizeVector({
      x: x - head.x,
      y: y - head.y,
    }, targetDirection);
  };

  const pointerCleanup = bindPlaygroundPointer(canvas, handleAim);
  const resetButton = root.querySelector('[data-playground-reset="snake"]');
  const handleReset = () => {
    resetGame();
    updateUi();
  };

  resetButton?.addEventListener("click", handleReset);
  resetGame();
  updateUi();

  const loopCleanup = startPlaygroundLoop((dt, now) => {
    updateGame(dt);
    drawScene(now);
    updateUi();
  });

  registerLabPlaygroundCleanup(() => {
    pointerCleanup();
    loopCleanup();
    resetButton?.removeEventListener("click", handleReset);
  });
}

function initStructureSwarmPlayground() {
  const root = dom.labContent.querySelector('[data-playground="swarm"]');
  const canvas = root?.querySelector("#swarm-canvas");
  const summary = root?.querySelector("#swarm-summary");

  if (!root || !canvas || !summary) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const bounds = PLAYGROUND_CANVAS;
  let target = { x: bounds.width * 0.66, y: bounds.height * 0.5 };
  let core;
  let particles = [];
  let unstableMass = 1.8;
  let stableMass = 0.6;
  let harmony = 0.48;
  let structure = 0.18;
  let collectedDifference = 0;
  let noiseHits = 0;
  let boundaryStress = 0;
  let score = 0;
  let combo = 0;
  let settleLoops = 0;
  let loopCharge = 0;
  let comboTimer = 0;

  const spawnParticle = (kind) => ({
    kind,
    x: randomBetween(34, bounds.width - 34),
    y: randomBetween(28, bounds.height - 28),
    radius: kind === "difference" ? randomBetween(3.4, 5.8) : randomBetween(2.8, 4.4),
    phase: randomBetween(0, Math.PI * 2),
  });

  const resetGame = () => {
    target = { x: bounds.width * 0.66, y: bounds.height * 0.5 };
    core = {
      x: 98,
      y: bounds.height * 0.5,
      vx: 0,
      vy: 0,
      radius: 15,
    };
    unstableMass = 1.8;
    stableMass = 0.6;
    harmony = 0.48;
    structure = 0.18;
    collectedDifference = 0;
    noiseHits = 0;
    boundaryStress = 0;
    score = 0;
    combo = 0;
    settleLoops = 0;
    loopCharge = 0;
    comboTimer = 0;
    particles = [
      ...Array.from({ length: SWARM_DIFFERENCE_COUNT }, () => spawnParticle("difference")),
      ...Array.from({ length: SWARM_NOISE_COUNT }, () => spawnParticle("noise")),
    ];
  };

  const updateUi = () => {
    const totalMass = unstableMass + stableMass;
    const orbiterCount = Math.min(6, Math.floor(stableMass / 1.9));

    setPlaygroundMetric("swarm-mass", totalMass / 18, totalMass.toFixed(1));
    setPlaygroundMetric("swarm-harmony", harmony, `${Math.round(harmony * 100)}%`);
    setPlaygroundMetric("swarm-structure", structure, `${Math.round(structure * 100)}%`);
    setPlayText("swarm-score-value", `${Math.round(score)}`);
    setPlayText("swarm-combo-value", combo > 0 ? `x${combo}` : "x0");
    setPlayText("swarm-loop-value", `${settleLoops} (${Math.round(clamp01(loopCharge) * 100)}%)`);

    let verdict = "先别只顾着吞。想把体量变成结构，还得让它在流场里慢慢沉下来。";
    if (structure > 0.72) {
      verdict = "你已经把吞入的差异沉成了稳定环，这时长大的不只是体量，而是结构。";
    } else if (unstableMass > stableMass * 1.6) {
      verdict = "你现在主要是在堆体量。只会吞并，不会沉淀，结构就还没真正长出来。";
    } else if (noiseHits > 3 && structure < 0.46) {
      verdict = "噪声正在打断沉淀。过滤和维持，也是结构形成的一部分。";
    }

    summary.innerHTML = `
      <h4>玩法解释</h4>
      <p>
        你已经吞进了 <strong>${collectedDifference}</strong> 份差异，总体量是 <strong>${totalMass.toFixed(1)}</strong>。
        当前有 <strong>${orbiterCount}</strong> 个卫星节点开始围绕核心稳定旋转。
      </p>
      <p>${verdict}</p>
    `;
  };

  const drawScene = (now) => {
    ctx.clearRect(0, 0, bounds.width, bounds.height);

    const background = ctx.createLinearGradient(0, 0, bounds.width, bounds.height);
    background.addColorStop(0, "#f4f7fb");
    background.addColorStop(1, "#ece6dd");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, bounds.width, bounds.height);

    ctx.save();
    ctx.fillStyle = "rgba(90, 118, 151, 0.12)";
    ctx.beginPath();
    ctx.arc(bounds.width * 0.72, bounds.height * 0.52, 46, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    for (let y = 24; y < bounds.height; y += 44) {
      for (let x = 24; x < bounds.width; x += 44) {
        drawVectorArrow(
          ctx,
          x,
          y,
          getSwarmFlowVector(x, y, bounds.width, bounds.height),
          14,
          "rgba(84, 111, 140, 0.38)",
          0.88,
        );
      }
    }

    ctx.save();
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(84, 111, 140, 0.82)";
    ctx.fillText("汇聚盆地", bounds.width * 0.66, 24);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(84, 111, 140, 0.26)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(target.x, target.y, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    particles.forEach((particle) => {
      ctx.save();
      if (particle.kind === "difference") {
        ctx.fillStyle = "#d89a57";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(216, 154, 87, 0.45)";
      } else {
        ctx.fillStyle = "rgba(108, 120, 138, 0.7)";
      }
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    const orbiterCount = Math.min(6, Math.floor(stableMass / 1.9));
    for (let index = 0; index < orbiterCount; index += 1) {
      const angle = now * 0.0014 + index * ((Math.PI * 2) / Math.max(1, orbiterCount));
      const orbitRadius = core.radius + 14 + index * 3.2;
      const orbiterX = core.x + Math.cos(angle) * orbitRadius;
      const orbiterY = core.y + Math.sin(angle) * orbitRadius;

      ctx.save();
      ctx.fillStyle = "rgba(92, 118, 152, 0.9)";
      ctx.beginPath();
      ctx.arc(orbiterX, orbiterY, 4.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (unstableMass > 0.16) {
      ctx.save();
      ctx.setLineDash([7, 6]);
      ctx.strokeStyle = `rgba(216, 154, 87, ${0.22 + unstableMass * 0.06})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(core.x, core.y, core.radius + 8 + unstableMass * 2.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const coreGradient = ctx.createRadialGradient(
      core.x - core.radius * 0.25,
      core.y - core.radius * 0.25,
      core.radius * 0.18,
      core.x,
      core.y,
      core.radius,
    );
    coreGradient.addColorStop(0, "#fff3da");
    coreGradient.addColorStop(1, "#9b4f3f");
    ctx.save();
    ctx.fillStyle = coreGradient;
    ctx.strokeStyle = "#5a7697";
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(core.x, core.y, core.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  const updateGame = (dt, now) => {
    comboTimer = Math.max(0, comboTimer - dt);
    if (comboTimer === 0) {
      combo = 0;
    }

    const flow = getSwarmFlowVector(core.x, core.y, bounds.width, bounds.height);
    const deltaX = target.x - core.x;
    const deltaY = target.y - core.y;
    const targetDistance = Math.hypot(deltaX, deltaY);
    const targetDirection = targetDistance > 8
      ? { x: deltaX / targetDistance, y: deltaY / targetDistance }
      : { x: 0, y: 0 };

    core.vx = clamp(core.vx + (targetDirection.x * 62 + flow.x * 34) * dt, -135, 135);
    core.vy = clamp(core.vy + (targetDirection.y * 62 + flow.y * 34) * dt, -135, 135);
    core.vx *= 0.985;
    core.vy *= 0.985;

    core.x += core.vx * dt;
    core.y += core.vy * dt;

    if (core.x < core.radius) {
      core.x = core.radius;
      core.vx = Math.abs(core.vx) * 0.42;
      stableMass = Math.max(0, stableMass - 0.34);
      boundaryStress = clamp01(boundaryStress + 0.18);
      score = Math.max(0, score - 6);
    }
    if (core.x > bounds.width - core.radius) {
      core.x = bounds.width - core.radius;
      core.vx = -Math.abs(core.vx) * 0.42;
      stableMass = Math.max(0, stableMass - 0.34);
      boundaryStress = clamp01(boundaryStress + 0.18);
      score = Math.max(0, score - 6);
    }
    if (core.y < core.radius) {
      core.y = core.radius;
      core.vy = Math.abs(core.vy) * 0.42;
      stableMass = Math.max(0, stableMass - 0.34);
      boundaryStress = clamp01(boundaryStress + 0.18);
      score = Math.max(0, score - 6);
    }
    if (core.y > bounds.height - core.radius) {
      core.y = bounds.height - core.radius;
      core.vy = -Math.abs(core.vy) * 0.42;
      stableMass = Math.max(0, stableMass - 0.34);
      boundaryStress = clamp01(boundaryStress + 0.18);
      score = Math.max(0, score - 6);
    }

    const speed = Math.hypot(core.vx, core.vy);
    const velocityDirection = speed > 4
      ? { x: core.vx / speed, y: core.vy / speed }
      : flow;
    const rawAlignment = velocityDirection.x * flow.x + velocityDirection.y * flow.y;
    const alignment = clamp01((rawAlignment + 1) / 2);

    harmony = clamp01(harmony * 0.93 + alignment * 0.07);
    boundaryStress = Math.max(0, boundaryStress - dt * 0.16);

    particles = particles.map((particle) => {
      if (particle.kind === "difference") {
        const drift = getSwarmFlowVector(particle.x, particle.y, bounds.width, bounds.height);
        return {
          ...particle,
          x: (particle.x + drift.x * dt * (18 + particle.radius * 3) + bounds.width) % bounds.width,
          y: (particle.y + drift.y * dt * (15 + particle.radius * 2.4) + Math.sin(now * 0.002 + particle.phase) * dt * 5 + bounds.height) % bounds.height,
        };
      }

      return {
        ...particle,
        x: (particle.x + Math.cos(now * 0.0018 + particle.phase) * dt * 16 + bounds.width) % bounds.width,
        y: (particle.y + Math.sin(now * 0.0021 + particle.phase) * dt * 14 + bounds.height) % bounds.height,
      };
    });

    particles.forEach((particle, index) => {
      if (distanceBetween(core, particle) < core.radius + particle.radius) {
        if (particle.kind === "difference") {
          unstableMass += 0.82;
          collectedDifference += 1;
          combo = Math.min(12, comboTimer > 0 ? combo + 1 : 1);
          comboTimer = 2.1;
          score += 14 + combo * 6 + Math.round(stableMass * 2);
          loopCharge = Math.min(1.24, loopCharge + 0.04);
        } else {
          unstableMass = Math.max(0, unstableMass - 0.72);
          stableMass = Math.max(0, stableMass - 0.45);
          noiseHits += 1;
          boundaryStress = clamp01(boundaryStress + 0.12);
          score = Math.max(0, score - 22);
          combo = 0;
          comboTimer = 0;
          loopCharge = Math.max(0, loopCharge - 0.24);
        }
        particles[index] = spawnParticle(particle.kind);
      }
    });

    const settleRatio = clamp01(0.62 * harmony + 0.38 * (1 - clamp01(speed / 140)));
    const converted = Math.min(unstableMass, (0.18 + settleRatio * 0.68) * dt);

    unstableMass = Math.max(0, unstableMass - converted);
    stableMass = Math.max(
      0,
      stableMass + converted - dt * Math.max(0, speed / 145 - 0.68) * 0.24 - boundaryStress * dt * 0.22,
    );
    core.radius = 14 + unstableMass * 0.78 + stableMass * 1.12;
    structure = clamp01(stableMass / 10.8);

    const settleSignal =
      clamp01((structure - 0.42) / 0.36) *
      clamp01((harmony - 0.55) / 0.3) *
      clamp01(1 - boundaryStress) *
      clamp01(1 - targetDistance / 160);

    if (settleSignal > 0.12) {
      loopCharge = Math.min(1.24, loopCharge + dt * (0.18 + settleSignal * 0.86));
    } else {
      loopCharge = Math.max(0, loopCharge - dt * 0.24);
    }

    if (loopCharge >= 1) {
      settleLoops += 1;
      loopCharge = 0;
      stableMass += 0.24;
      score += 78 + settleLoops * 18;
      combo = Math.max(combo, 2);
      comboTimer = Math.max(comboTimer, 1.8);
    }
  };

  const handleAim = ({ x, y }) => {
    target = { x, y };
  };

  const pointerCleanup = bindPlaygroundPointer(canvas, handleAim);
  const resetButton = root.querySelector('[data-playground-reset="swarm"]');
  const handleReset = () => {
    resetGame();
    updateUi();
  };

  resetButton?.addEventListener("click", handleReset);
  resetGame();
  updateUi();

  const loopCleanup = startPlaygroundLoop((dt, now) => {
    updateGame(dt, now);
    drawScene(now);
    updateUi();
  });

  registerLabPlaygroundCleanup(() => {
    pointerCleanup();
    loopCleanup();
    resetButton?.removeEventListener("click", handleReset);
  });
}

function initPlayableLabSection() {
  initDifferenceSnakePlayground();
  initStructureSwarmPlayground();
}

function renderLabPlay() {
  dom.labNote.textContent =
    "游戏页把差异、流向、结构和判断压成可玩的反馈回路：你会直接看到得分、连击、成环与失稳，而不是只在文字里理解它们。";
  dom.labContent.innerHTML = `
    ${renderLabArchitectureSection("play")}

    <section class="lab-grid lab-grid-two">
      <article class="lab-card lab-card-strong">
        <p class="eyebrow">Game Hall</p>
        <h3>小游戏现在单独放在这里，不再藏在学习页里</h3>
        <p class="lab-section-copy">
          这一页优先做“能上手、能反馈、能留痕”的小游戏。先让你通过得分、连击、成环和失稳感到差异如何站成结构，
          再回到理论页看概念，会更容易把抽象语言和手感对上。
        </p>
        <div class="lab-mini-points">
          <span>差流游蛇：更偏贪吃蛇，重点是顺流吸差异并尽量闭环。</span>
          <span>结构吞并场：更偏球球式吞并，重点是把体量沉成稳定轨道，而不是只长大。</span>
          <span>缸中之脑实验台：更偏思想实验，用回路、记忆和反馈来逼近判断。</span>
        </div>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Play Route</p>
        <h3>先玩，再回看理论与检验</h3>
        <ul class="lab-bullet-list">
          <li>先看顶部入口，选你想玩的项目直接跳转。</li>
          <li>优先注意分数、连击和成环读数，而不只是“有没有吃到”或“有没有变大”。</li>
          <li>如果某个玩法让你明显感到失稳，再回理论学习页看概念链，理解会更快。</li>
        </ul>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-lab-nav="learn">回理论学习</button>
          <button class="reader-button" type="button" data-lab-nav="validate">去交互检验</button>
        </div>
      </article>
    </section>

    ${renderPlayNavigatorSection()}

    ${renderPlayableLabSection()}

    ${renderBrainVatExperimentSection()}
  `;

  dom.labContent.querySelectorAll("[data-play-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = dom.labContent.querySelector(`#${button.dataset.playJump}`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  initPlayableLabSection();
  initBrainVatExperiment();
}

function renderLabLearn() {
  dom.labNote.textContent =
    "学习页强调主线、思辨和实验问题的对应关系：先把判断放进方法里，再进入参数比较。";
  dom.labContent.innerHTML = `
    ${renderLabArchitectureSection("learn")}

    <section class="lab-grid lab-grid-two">
      <article class="lab-card lab-card-strong">
        <p class="eyebrow">Core Chain</p>
        <h3>把实验目标压回主轴</h3>
        <div class="lab-flow">
          <span>落差</span>
          <span>边界</span>
          <span>通量</span>
          <span>反馈</span>
          <span>稳态</span>
          <span>结构</span>
          <span>规则</span>
        </div>
        <p>
          这三个实验之所以值得做，不是因为它们都带“旋转”或都很炫，而是因为它们都卡在同一个问题上：
          非均匀性到底只是局部扰动，还是会在边界、反馈与耗散中站成可重复的结构？
        </p>
      </article>

      <article class="lab-card">
        <p class="eyebrow">How To Use</p>
        <h3>先学什么，再验什么</h3>
        <ul class="lab-bullet-list">
          <li>先看每个系统的关键落差是什么，而不是先盯结果图样。</li>
          <li>再看边界、耗散、耦合路径有没有把这些差异维持住。</li>
          <li>最后比较：描述簇语言是否比单一涡量、剪切或均匀背景假设更解释得通。</li>
        </ul>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-lab-nav="validate">去做交互检验</button>
          <button class="reader-button" type="button" data-lab-nav="infer">去做研究推演</button>
        </div>
      </article>
    </section>

    <section class="lab-grid lab-grid-two">
      <article class="lab-card">
        <p class="eyebrow">Play Lab</p>
        <h3>小游戏已经移到独立的游戏实验页</h3>
        <p>
          现在学习页只保留概念链、阅读路径和思辨工具。差流游蛇、结构吞并场以及缸中之脑实验台都已经拆到单独页面，
          这样入口更明显，也不会再和理论阅读混在一起。
        </p>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-lab-nav="play">前往游戏实验页</button>
          <button class="reader-button" type="button" data-lab-nav="validate">继续交互检验</button>
        </div>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Reading Hint</p>
        <h3>理论页先抓主链，不必在这里试玩</h3>
        <div class="lab-mini-points">
          <span>先把差异、边界、反馈、耗散与结构的关系读顺。</span>
          <span>再去游戏页感受“站稳”和“失稳”到底是什么手感。</span>
          <span>如果想做参数对照，再切到交互检验页继续看解释力。</span>
        </div>
      </article>
    </section>

    ${renderThoughtCompassSection()}

    ${renderHierarchyLiftSection()}

    <section class="lab-grid lab-grid-three">
      <article class="lab-card">
        <p class="eyebrow">Experiment A</p>
        <h3>旋转流体实验</h3>
        <p>观察在受控非均匀外场与边界约束下，涡旋是更受单纯剪切支配，还是更受“落差 + 边界 + 耗散”联合控制。</p>
        <div class="lab-mini-points">
          <span>看什么：涡核偏移、边界回流、结构持续度</span>
          <span>为什么重要：它最适合把描述簇和传统涡量语言放在同一台架上比</span>
        </div>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Experiment B</p>
        <h3>原行星盘模拟</h3>
        <p>考察非均匀引力场中的潮汐力矩、盘面不对称和耗散平衡如何共同影响角动量积累。</p>
        <div class="lab-mini-points">
          <span>看什么：潮汐力矩指数、角动量通量、盘面偏心与螺旋臂强度</span>
          <span>为什么重要：它把“稳态落差如何累积成规则性输运”写得更清楚</span>
        </div>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Experiment C</p>
        <h3>星系角动量分布</h3>
        <p>检验大尺度环境各向异性、潮汐对齐与并合噪声，是否足以改变最终自旋分布并优于简单基线模型。</p>
        <div class="lab-mini-points">
          <span>看什么：低 / 中 / 高自旋占比、环境对齐、与观测模板的一致度</span>
          <span>为什么重要：它把结构形成语言推进到宇宙学统计层</span>
        </div>
      </article>
    </section>

    <section class="lab-grid lab-grid-two">
      <article class="lab-card">
        <p class="eyebrow">Key Reading</p>
        <h3>做这些交互前，脑子里最好先放三句话</h3>
        <ol class="lab-number-list">
          <li>单有落差，不一定留下结构；被维持的落差，才开始留下结构。</li>
          <li>单有结构，不一定形成规则；可重复的稳态结构，才开始沉淀成规则。</li>
          <li>想检验理论，不只是看结果像不像，还要看它要求优先测哪些变量。</li>
        </ol>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Lab Scope</p>
        <h3>这个实验台现在能做什么</h3>
        <p>当前版本先做“教学型效验”：帮助你快速看出变量敏感性、解释差异和下一步采样方向。等后面需要，我们还可以继续接入更正式的数值求解器、数据文件导入和图表导出。</p>
      </article>
    </section>
  `;

  initThoughtCompass();
  initHierarchyLift();
}

function renderLabValidate() {
  dom.labNote.textContent =
    "检验页当前使用教学型代理指标，不替代真实流体求解、N 体模拟或观测拟合；它的作用是先看理论会优先要求你测什么。";
  dom.labContent.innerHTML = `
    ${renderLabArchitectureSection("validate")}

    <section class="lab-grid lab-grid-two">
      ${renderLabToolkitCard(
        "validate",
        "用预设场景快速找解释力切换点",
        "这一步不是代替正式扫描，而是先把“哪些量一动就会改写判断”直观地挑出来，便于后面接真实模拟。",
      )}

      <article class="lab-card">
        <p class="eyebrow">Reading Strategy</p>
        <h3>怎样把这页继续扩成更正式的检验台</h3>
        <div class="lab-mini-points">
          <span>先用预设快速找到哪一组参数最容易造成解释力翻转。</span>
          <span>再把那组参数附近做密一点的扫描，逼近真正的切换边界。</span>
          <span>最后再决定是否值得接真实求解器、观测模板或导出图表。</span>
        </div>
      </article>
    </section>

    <section class="lab-grid">
      <article class="lab-card simulation-card">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Validate A</p>
            <h3>旋转流体实验</h3>
          </div>
          <span class="simulation-badge">描述簇 vs 涡量/剪切</span>
        </div>
        <div class="lab-controls">
          <label class="lab-range">
            <span>外场非均匀度 <strong data-range-output="fluid-gradient"></strong></span>
            <input id="fluid-gradient" type="range" min="0" max="100" value="72" />
          </label>
          <label class="lab-range">
            <span>旋转强度 <strong data-range-output="fluid-rotation"></strong></span>
            <input id="fluid-rotation" type="range" min="0" max="100" value="58" />
          </label>
          <label class="lab-range">
            <span>边界约束清晰度 <strong data-range-output="fluid-boundary"></strong></span>
            <input id="fluid-boundary" type="range" min="0" max="100" value="63" />
          </label>
          <label class="lab-range">
            <span>耗散抹平强度 <strong data-range-output="fluid-dissipation"></strong></span>
            <input id="fluid-dissipation" type="range" min="0" max="100" value="34" />
          </label>
        </div>
        <div class="lab-metrics">
          <div class="lab-metric">
            <span>描述簇解释力</span>
            <strong id="fluid-cluster-value"></strong>
            <div class="lab-meter"><span id="fluid-cluster-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>传统涡量 / 剪切解释力</span>
            <strong id="fluid-traditional-value"></strong>
            <div class="lab-meter"><span id="fluid-traditional-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>涡旋形成指数</span>
            <strong id="fluid-vortex-value"></strong>
            <div class="lab-meter"><span id="fluid-vortex-fill"></span></div>
          </div>
        </div>
        <div id="fluid-summary" class="lab-result-card"></div>
      </article>

      <article class="lab-card simulation-card">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Validate B</p>
            <h3>原行星盘模拟</h3>
          </div>
          <span class="simulation-badge">潮汐力矩与角动量积累</span>
        </div>
        <div class="lab-controls">
          <label class="lab-range">
            <span>非均匀引力场强度 <strong data-range-output="disk-tidal"></strong></span>
            <input id="disk-tidal" type="range" min="0" max="100" value="68" />
          </label>
          <label class="lab-range">
            <span>盘面不对称度 <strong data-range-output="disk-asymmetry"></strong></span>
            <input id="disk-asymmetry" type="range" min="0" max="100" value="54" />
          </label>
          <label class="lab-range">
            <span>耗散抹平强度 <strong data-range-output="disk-dissipation"></strong></span>
            <input id="disk-dissipation" type="range" min="0" max="100" value="29" />
          </label>
          <label class="lab-range">
            <span>积累时长 <strong data-range-output="disk-duration"></strong></span>
            <input id="disk-duration" type="range" min="0" max="100" value="61" />
          </label>
        </div>
        <div class="lab-metrics">
          <div class="lab-metric">
            <span>潮汐力矩指数</span>
            <strong id="disk-torque-value"></strong>
            <div class="lab-meter"><span id="disk-torque-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>传统基线解释力</span>
            <strong id="disk-baseline-value"></strong>
            <div class="lab-meter"><span id="disk-baseline-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>角动量积累倾向</span>
            <strong id="disk-angmom-value"></strong>
            <div class="lab-meter"><span id="disk-angmom-fill"></span></div>
          </div>
        </div>
        <div id="disk-summary" class="lab-result-card"></div>
      </article>

      <article class="lab-card simulation-card">
        <div class="simulation-head">
          <div>
            <p class="eyebrow">Validate C</p>
            <h3>星系角动量分布</h3>
          </div>
          <span class="simulation-badge">潮汐对齐 vs 教学观测模板</span>
        </div>
        <div class="lab-controls">
          <label class="lab-range">
            <span>环境各向异性 <strong data-range-output="galaxy-anisotropy"></strong></span>
            <input id="galaxy-anisotropy" type="range" min="0" max="100" value="64" />
          </label>
          <label class="lab-range">
            <span>潮汐对齐强度 <strong data-range-output="galaxy-alignment"></strong></span>
            <input id="galaxy-alignment" type="range" min="0" max="100" value="57" />
          </label>
          <label class="lab-range">
            <span>并合噪声 <strong data-range-output="galaxy-merger"></strong></span>
            <input id="galaxy-merger" type="range" min="0" max="100" value="33" />
          </label>
          <label class="lab-range">
            <span>教学观测模板偏向高自旋 <strong data-range-output="galaxy-observed"></strong></span>
            <input id="galaxy-observed" type="range" min="0" max="100" value="52" />
          </label>
        </div>
        <div class="lab-metrics">
          <div class="lab-metric">
            <span>扩展潮汐理论一致度</span>
            <strong id="galaxy-model-fit-value"></strong>
            <div class="lab-meter"><span id="galaxy-model-fit-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>简单基线一致度</span>
            <strong id="galaxy-baseline-fit-value"></strong>
            <div class="lab-meter"><span id="galaxy-baseline-fit-fill"></span></div>
          </div>
          <div class="lab-metric">
            <span>对齐敏感度</span>
            <strong id="galaxy-alignment-index-value"></strong>
            <div class="lab-meter"><span id="galaxy-alignment-index-fill"></span></div>
          </div>
        </div>
        <div class="dist-shell">
          <div class="dist-group">
            <p>扩展潮汐理论</p>
            <div class="dist-bars">
              <div class="dist-bar-wrap"><span id="galaxy-model-low" class="dist-bar"></span><small id="galaxy-model-low-value"></small><em>低</em></div>
              <div class="dist-bar-wrap"><span id="galaxy-model-mid" class="dist-bar"></span><small id="galaxy-model-mid-value"></small><em>中</em></div>
              <div class="dist-bar-wrap"><span id="galaxy-model-high" class="dist-bar"></span><small id="galaxy-model-high-value"></small><em>高</em></div>
            </div>
          </div>
          <div class="dist-group">
            <p>教学观测模板</p>
            <div class="dist-bars">
              <div class="dist-bar-wrap"><span id="galaxy-observed-low" class="dist-bar dist-bar-alt"></span><small id="galaxy-observed-low-value"></small><em>低</em></div>
              <div class="dist-bar-wrap"><span id="galaxy-observed-mid" class="dist-bar dist-bar-alt"></span><small id="galaxy-observed-mid-value"></small><em>中</em></div>
              <div class="dist-bar-wrap"><span id="galaxy-observed-high" class="dist-bar dist-bar-alt"></span><small id="galaxy-observed-high-value"></small><em>高</em></div>
            </div>
          </div>
          <div class="dist-group">
            <p>简单基线</p>
            <div class="dist-bars">
              <div class="dist-bar-wrap"><span id="galaxy-baseline-low" class="dist-bar dist-bar-faint"></span><small id="galaxy-baseline-low-value"></small><em>低</em></div>
              <div class="dist-bar-wrap"><span id="galaxy-baseline-mid" class="dist-bar dist-bar-faint"></span><small id="galaxy-baseline-mid-value"></small><em>中</em></div>
              <div class="dist-bar-wrap"><span id="galaxy-baseline-high" class="dist-bar dist-bar-faint"></span><small id="galaxy-baseline-high-value"></small><em>高</em></div>
            </div>
          </div>
        </div>
        <div id="galaxy-summary" class="lab-result-card"></div>
      </article>
    </section>
  `;

  const controlIds = Object.keys(LAB_CONTROL_DEFAULTS.validate);
  setLabControlValues(state.labParams);

  const updateFluidSimulation = () => {
    const gradient = getRatio("fluid-gradient");
    const rotation = getRatio("fluid-rotation");
    const boundary = getRatio("fluid-boundary");
    const dissipation = getRatio("fluid-dissipation");

    setRangeOutput("fluid-gradient", `${Math.round(gradient * 100)}%`);
    setRangeOutput("fluid-rotation", `${Math.round(rotation * 100)}%`);
    setRangeOutput("fluid-boundary", `${Math.round(boundary * 100)}%`);
    setRangeOutput("fluid-dissipation", `${Math.round(dissipation * 100)}%`);

    const cluster = clamp01(
      0.34 * gradient +
      0.24 * rotation +
      0.18 * boundary +
      0.12 * (1 - dissipation) +
      0.20 * gradient * boundary,
    );
    const traditional = clamp01(
      0.52 * rotation +
      0.22 * (1 - dissipation) +
      0.16 * boundary +
      0.10 * (1 - gradient),
    );
    const vortex = clamp01(
      0.45 * cluster + 0.20 * rotation + 0.20 * boundary + 0.15 * (1 - dissipation),
    );

    setMeter("fluid-cluster", cluster);
    setMeter("fluid-traditional", traditional);
    setMeter("fluid-vortex", vortex);

    const delta = cluster - traditional;
    const dominant =
      gradient * boundary > rotation
        ? "当前更像是“非均匀外场 + 边界耦合”在主导涡旋站稳。"
        : "当前旋转与剪切的解释力仍然占优。";
    const observation =
      gradient > boundary
        ? "优先观察涡核是否沿外场梯度方向发生系统性偏移。"
        : "优先观察边界附近是否出现回流带与局域涡核锁定。";

    dom.labContent.querySelector("#fluid-summary").innerHTML = `
      <h4>当前判断</h4>
      <p>${dominant}</p>
      <p>${
        delta > 0.08
          ? "在这组参数下，描述簇语言明显优于单看涡量/剪切。"
          : delta < -0.05
            ? "在这组参数下，传统旋转-剪切解释已足够强。"
            : "在这组参数下，两种解释都需要，差别主要体现在边界与维持机制。"
      }</p>
      <p class="result-note">${observation}</p>
    `;
  };

  const updateDiskSimulation = () => {
    const tidal = getRatio("disk-tidal");
    const asymmetry = getRatio("disk-asymmetry");
    const dissipation = getRatio("disk-dissipation");
    const duration = getRatio("disk-duration");

    setRangeOutput("disk-tidal", `${Math.round(tidal * 100)}%`);
    setRangeOutput("disk-asymmetry", `${Math.round(asymmetry * 100)}%`);
    setRangeOutput("disk-dissipation", `${Math.round(dissipation * 100)}%`);
    setRangeOutput("disk-duration", `${Math.round(duration * 100)}%`);

    const torque = clamp01(
      0.32 * tidal +
      0.28 * asymmetry +
      0.16 * duration +
      0.16 * (1 - dissipation) +
      0.16 * tidal * asymmetry,
    );
    const baseline = clamp01(
      0.50 * tidal +
      0.20 * duration +
      0.18 * (1 - dissipation) +
      0.12 * (1 - asymmetry),
    );
    const angmom = clamp01(
      0.55 * torque + 0.20 * duration + 0.15 * asymmetry + 0.10 * (1 - dissipation),
    );

    setMeter("disk-torque", torque);
    setMeter("disk-baseline", baseline);
    setMeter("disk-angmom", angmom);

    dom.labContent.querySelector("#disk-summary").innerHTML = `
      <h4>当前判断</h4>
      <p>${
        torque > baseline
          ? "非均匀引力场与盘面不对称的耦合，开始比简单基线更能解释角动量积累。"
          : "当前参数下，传统基线仍能解释大部分变化，潮汐力矩增益还不够明显。"
      }</p>
      <p>${
        duration > 0.6
          ? "如果继续拉长积累时长，应重点跟踪通量是否真正累积而非只是在局部摆动。"
          : "如果想让理论差异更显著，优先提高时长或不对称度，而不是只加总强度。"
      }</p>
      <p class="result-note">${
        asymmetry > tidal
          ? "优先看盘面偏心、环结构偏移和螺旋臂不对称。"
          : "优先看潮汐力矩随半径变化的分布与角动量输运通道。"
      }</p>
    `;
  };

  const updateGalaxySimulation = () => {
    const anisotropy = getRatio("galaxy-anisotropy");
    const alignment = getRatio("galaxy-alignment");
    const merger = getRatio("galaxy-merger");
    const observedBias = getRatio("galaxy-observed");

    setRangeOutput("galaxy-anisotropy", `${Math.round(anisotropy * 100)}%`);
    setRangeOutput("galaxy-alignment", `${Math.round(alignment * 100)}%`);
    setRangeOutput("galaxy-merger", `${Math.round(merger * 100)}%`);
    setRangeOutput("galaxy-observed", `${Math.round(observedBias * 100)}%`);

    const model = normalizeDistribution([
      0.37 - 0.18 * anisotropy - 0.10 * alignment + 0.22 * merger,
      0.38 + 0.02 * (1 - merger) - 0.04 * anisotropy,
      0.25 + 0.18 * anisotropy + 0.14 * alignment - 0.18 * merger,
    ]);
    const baseline = normalizeDistribution([
      0.35 - 0.08 * anisotropy + 0.24 * merger,
      0.42,
      0.23 + 0.08 * anisotropy - 0.18 * merger,
    ]);
    const observed = normalizeDistribution([
      0.34 - 0.18 * observedBias + 0.12 * merger,
      0.36 + 0.04 * (1 - merger),
      0.30 + 0.18 * observedBias - 0.10 * merger,
    ]);

    const modelFit = clamp01(1 - distributionDistance(model, observed) / 2);
    const baselineFit = clamp01(1 - distributionDistance(baseline, observed) / 2);
    const alignmentIndex = clamp01(0.55 * anisotropy + 0.35 * alignment - 0.25 * merger + 0.2);

    setMeter("galaxy-model-fit", modelFit);
    setMeter("galaxy-baseline-fit", baselineFit);
    setMeter("galaxy-alignment-index", alignmentIndex);

    renderDistributionSeries("galaxy-model", model);
    renderDistributionSeries("galaxy-observed", observed);
    renderDistributionSeries("galaxy-baseline", baseline);

    dom.labContent.querySelector("#galaxy-summary").innerHTML = `
      <h4>当前判断</h4>
      <p>${
        modelFit > baselineFit + 0.05
          ? "扩展潮汐解释对当前教学观测模板的拟合更优，说明环境各向异性和对齐项值得被单独追踪。"
          : modelFit + 0.05 < baselineFit
            ? "当前模板下简单基线仍更贴近，说明并合噪声可能遮蔽了潮汐对齐信号。"
            : "两种解释接近，真正区分它们的关键会落在更细的环境选择与观测分组上。"
      }</p>
      <p class="result-note">${
        anisotropy > merger
          ? "优先看自旋向量与大尺度丝状结构 / 潮汐张量主轴的对齐。"
          : "优先把并合历史和环境分开统计，否则高层落差会被噪声洗掉。"
      }</p>
    `;
  };

  const syncValidateState = (replaceHash = true) => {
    updateFluidSimulation();
    updateDiskSimulation();
    updateGalaxySimulation();

    state.labParams = resolveLabParams("validate", getLabControlSnapshot(controlIds));
    if (replaceHash) {
      setHashForLab("validate", state.labParams, { replace: true });
    }
  };

  dom.labContent
    .querySelectorAll("input[type='range']")
    .forEach((input) =>
      input.addEventListener("input", () => {
        syncValidateState();
      }),
    );

  bindLabToolkit("validate", (values) => {
    setLabControlValues(resolveLabParams("validate", values));
    syncValidateState();
  });
  syncValidateState(false);
}

function renderLabInfer() {
  dom.labNote.textContent =
    "推演页不是替你宣布结论，而是帮助你判断：当前条件更像一次事件、短命结构、准稳态，还是已经接近规则沉淀。";
  dom.labContent.innerHTML = `
    ${renderLabArchitectureSection("infer")}

    <section class="lab-grid lab-grid-two">
      ${renderLabToolkitCard(
        "infer",
        "先切预设，再看系统究竟会停在哪一层",
        "推演页更适合拿来比较不同层级状态：它不直接替你做结论，而是帮你把最短板、最该测的量和下一步动作压出来。",
      )}

      <article class="lab-card">
        <p class="eyebrow">Inference Setup</p>
        <h3>研究推演器</h3>
        <label class="lab-select">
          <span>系统类型</span>
          <select id="infer-domain">
            <option value="fluid">旋转流体</option>
            <option value="disk">原行星盘</option>
            <option value="galaxy">星系角动量</option>
            <option value="ai">AI / 大模型系统</option>
          </select>
        </label>
        <div class="lab-controls">
          <label class="lab-range">
            <span>差结构强度 <strong data-range-output="infer-difference"></strong></span>
            <input id="infer-difference" type="range" min="0" max="100" value="70" />
          </label>
          <label class="lab-range">
            <span>边界清晰度 <strong data-range-output="infer-boundary"></strong></span>
            <input id="infer-boundary" type="range" min="0" max="100" value="58" />
          </label>
          <label class="lab-range">
            <span>反馈闭环强度 <strong data-range-output="infer-feedback"></strong></span>
            <input id="infer-feedback" type="range" min="0" max="100" value="62" />
          </label>
          <label class="lab-range">
            <span>耗散平衡度 <strong data-range-output="infer-dissipation"></strong></span>
            <input id="infer-dissipation" type="range" min="0" max="100" value="46" />
          </label>
          <label class="lab-range">
            <span>记忆 / 继承连续性 <strong data-range-output="infer-memory"></strong></span>
            <input id="infer-memory" type="range" min="0" max="100" value="55" />
          </label>
        </div>
      </article>
    </section>

    <section class="lab-grid lab-grid-two">
      <article class="lab-card">
        <p class="eyebrow">Emergence Track</p>
        <h3>当前更可能停在哪一层</h3>
        <div class="stage-track" id="infer-stage-track">
          <div class="stage-node" data-stage="0"><strong>事件</strong><span>有差但留不住</span></div>
          <div class="stage-node" data-stage="1"><strong>短命结构</strong><span>能显现但不稳</span></div>
          <div class="stage-node" data-stage="2"><strong>准稳态</strong><span>能维持一段时间</span></div>
          <div class="stage-node" data-stage="3"><strong>规则沉淀</strong><span>可重复、可压缩</span></div>
        </div>
        <div class="lab-metric">
          <span>规则沉淀倾向</span>
          <strong id="infer-score-value"></strong>
          <div class="lab-meter"><span id="infer-score-fill"></span></div>
        </div>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Decision Gate</p>
        <h3>怎样把推演继续接到下一步工作</h3>
        <div class="lab-mini-points">
          <span>如果最短板一直是边界，就优先补约束条件，而不是继续堆强度。</span>
          <span>如果最短板一直是记忆，就说明系统还没把结构真正继承下来。</span>
          <span>如果 AI 场景里反馈最强但仍不过层，通常意味着验证链还没接上现实。</span>
        </div>
      </article>
    </section>

    <section class="lab-grid lab-grid-three">
      <article class="lab-card">
        <p class="eyebrow">Prediction</p>
        <h3>当前更像什么</h3>
        <p id="infer-stage-text" class="lab-lead"></p>
      </article>
      <article class="lab-card">
        <p class="eyebrow">Observable</p>
        <h3>最值得优先测什么</h3>
        <p id="infer-observable" class="lab-lead"></p>
      </article>
      <article class="lab-card">
        <p class="eyebrow">Bottleneck</p>
        <h3>最可能卡在哪里</h3>
        <p id="infer-bottleneck" class="lab-lead"></p>
      </article>
    </section>

    <section class="lab-grid lab-grid-two">
      <article class="lab-card">
        <p class="eyebrow">Next Step</p>
        <h3>建议下一步</h3>
        <p id="infer-next-step"></p>
      </article>
      <article class="lab-card">
        <p class="eyebrow">Why</p>
        <h3>这一判断是怎么来的</h3>
        <p id="infer-explain"></p>
      </article>
    </section>
  `;

  const controlIds = Object.keys(LAB_CONTROL_DEFAULTS.infer);
  setLabControlValues(state.labParams);

  const domainProfiles = {
    fluid: {
      observables: [
        "优先看速度场中的涡核偏移与边界回流带是否共定位。",
        "优先看边界附近的结构寿命，而不只是瞬时涡量峰值。",
      ],
      next: "把容器边界、外场梯度和耗散参数拆开扫一遍，再看哪一项真正控制了涡旋能否站住。",
    },
    disk: {
      observables: [
        "优先看潮汐力矩随半径变化的分布，而不是只看总角动量。",
        "优先看盘面不对称与螺旋臂强度是否同步增强。",
      ],
      next: "把盘面不对称度与积累时长做联合参数扫描，检验角动量输运究竟是瞬时扰动还是可持续通量。",
    },
    galaxy: {
      observables: [
        "优先看自旋向量与大尺度环境主轴的对齐关系。",
        "优先把并合历史与环境各向异性分层统计，避免噪声把趋势洗平。",
      ],
      next: "先做环境分箱与观测模板对照，再判断是否值得把潮汐对齐项正式加入拟合模型。",
    },
    ai: {
      observables: [
        "优先看长时记忆、工具调用和验证接口是否形成闭环，而不只是看回答是否流畅。",
        "优先看 logit 差、检索命中和外部反馈能否持续回灌到系统行为中。",
      ],
      next: "如果想跨到下一层，就不要只加参数量，而应补长期记忆、现实接地、权限控制与验证链。",
    },
  };

  const updateInference = () => {
    const domain = dom.labContent.querySelector("#infer-domain").value;
    const difference = getRatio("infer-difference");
    const boundary = getRatio("infer-boundary");
    const feedback = getRatio("infer-feedback");
    const dissipation = getRatio("infer-dissipation");
    const memory = getRatio("infer-memory");
    const balance = clamp01(1 - Math.abs(dissipation - 0.45) * 2);

    setRangeOutput("infer-difference", `${Math.round(difference * 100)}%`);
    setRangeOutput("infer-boundary", `${Math.round(boundary * 100)}%`);
    setRangeOutput("infer-feedback", `${Math.round(feedback * 100)}%`);
    setRangeOutput("infer-dissipation", `${Math.round(dissipation * 100)}%`);
    setRangeOutput("infer-memory", `${Math.round(memory * 100)}%`);

    const emergence = clamp01(
      0.24 * difference +
      0.22 * boundary +
      0.24 * feedback +
      0.18 * memory +
      0.12 * balance,
    );

    setMeter("infer-score", emergence);

    const stageIndex =
      emergence < 0.28 ? 0 :
      emergence < 0.52 ? 1 :
      emergence < 0.76 ? 2 : 3;

    dom.labContent.querySelectorAll(".stage-node").forEach((node) => {
      node.classList.toggle("is-active", Number(node.dataset.stage) <= stageIndex);
      node.classList.toggle("is-current", Number(node.dataset.stage) === stageIndex);
    });

    const weakest = [
      ["差结构强度", difference],
      ["边界清晰度", boundary],
      ["反馈闭环", feedback],
      ["记忆 / 继承连续性", memory],
      ["耗散平衡", balance],
    ].sort((a, b) => a[1] - b[1])[0];

    const stageText = [
      "当前更像一次事件：差异已经出现，但还不足以留下可维持的组织形态。",
      "当前更像短寿命结构：能显现出局部图样，但还缺少足够的维持条件。",
      "当前更像准稳态：已经具备一段时间内可重复维持的潜力，但还未稳到可压缩成规则。",
      "当前已经逼近规则沉淀：如果继续保持这些条件，就有机会把结构压成可重复、可迁移的稳定关系。",
    ][stageIndex];

    const profile = domainProfiles[domain];
    const observation =
      emergence > 0.6 ? profile.observables[0] : profile.observables[1];

    dom.labContent.querySelector("#infer-stage-text").textContent = stageText;
    dom.labContent.querySelector("#infer-observable").textContent = observation;
    dom.labContent.querySelector("#infer-bottleneck").textContent =
      `当前最短板是“${weakest[0]}”。如果这项不补强，系统大概率会在更高层之前先失稳或回落。`;
    dom.labContent.querySelector("#infer-next-step").textContent = profile.next;
    dom.labContent.querySelector("#infer-explain").textContent =
      `这次推演主要根据差结构强度、边界清晰度、反馈闭环、耗散平衡和记忆连续性五项共同计算。当“有差”还不能被边界收住、被反馈回灌、被记忆继承时，现象就更像短事件；当这些条件同时站住，结构才会向稳态与规则推进。`;
  };

  const syncInferState = (replaceHash = true) => {
    updateInference();
    state.labParams = resolveLabParams("infer", getLabControlSnapshot(controlIds));
    if (replaceHash) {
      setHashForLab("infer", state.labParams, { replace: true });
    }
  };

  dom.labContent
    .querySelectorAll("input, select")
    .forEach((input) => input.addEventListener("input", () => syncInferState()));

  bindLabToolkit("infer", (values) => {
    setLabControlValues(resolveLabParams("infer", values));
    syncInferState();
  });
  syncInferState(false);
}

function renderLabPage(page) {
  const activePage = normalizeLabPage(page);
  state.activeLabPage = activePage;
  dom.labTitle.textContent = LAB_PAGES[activePage].title;
  dom.labIntro.textContent = LAB_PAGES[activePage].intro;
  renderLabTabs(activePage);

  if (activePage === "learn") {
    renderLabLearn();
  } else if (activePage === "play") {
    renderLabPlay();
  } else if (activePage === "validate") {
    renderLabValidate();
  } else {
    renderLabInfer();
  }

  dom.labContent.querySelectorAll("[data-lab-nav]").forEach((button) => {
    button.addEventListener("click", () => setHashForLab(button.dataset.labNav));
  });
}

function renderHome() {
  cleanupLabPlaygrounds();
  state.activeId = null;
  state.activeLabPage = null;
  state.currentPrevId = null;
  state.currentNextId = null;

  document.title = `${state.payload.site.title} · 在线书稿`;
  document.body.classList.remove("is-reading");
  dom.viewTitle.textContent = "分卷书架";
  dom.homeView.classList.remove("hidden");
  dom.labView.classList.add("hidden");
  dom.docView.classList.add("hidden");
  dom.readerProgressBar.style.transform = "scaleX(0)";
  dom.tocButton.disabled = true;
  updateChapterButtons(null, null);
  syncViewButtons();
  closePanels();
  buildNav();
  window.scrollTo({ top: 0, behavior: "auto" });
}

async function renderLab(page) {
  const activePage = normalizeLabPage(page);
  cleanupLabPlaygrounds();
  state.activeId = null;
  state.currentPrevId = null;
  state.currentNextId = null;
  state.labParams = resolveLabParams(activePage, state.labParams);
  document.title = `${state.payload.site.title} · ${LAB_PAGES[activePage].title}`;
  document.body.classList.remove("is-reading");
  dom.viewTitle.textContent = "理论实验台";
  dom.homeView.classList.add("hidden");
  dom.docView.classList.add("hidden");
  dom.labView.classList.remove("hidden");
  dom.readerProgressBar.style.transform = "scaleX(0)";
  dom.tocButton.disabled = true;
  updateChapterButtons(null, null);
  closePanels();
  buildNav();
  renderLabPage(activePage);
  syncViewButtons();
  await typesetElement(dom.labContent);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function buildTocLink(label, anchor, level) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "toc-link";
  button.dataset.level = String(level);
  button.textContent = label;
  button.addEventListener("click", () => {
    const target = document.getElementById(anchor);
    if (!target) return;
    closePanels();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  return button;
}

function renderToc(item) {
  dom.docToc.innerHTML = "";

  const title = document.createElement("h3");
  title.className = "toc-title";
  title.textContent = "本章目录";
  dom.docToc.appendChild(title);

  if (!item.headings?.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "当前章节暂无小节目录。";
    dom.docToc.appendChild(empty);
    return;
  }

  item.headings.forEach((heading) => {
    dom.docToc.appendChild(buildTocLink(heading.label, heading.anchor, heading.level));
  });
}

function updateChapterButtons(prev, next) {
  state.currentPrevId = prev?.id || null;
  state.currentNextId = next?.id || null;
  dom.mobilePrevButton.disabled = !prev;
  dom.mobileNextButton.disabled = !next;
}

function getCommentPath(item) {
  return `/doc/${item.id}`;
}

function renderCommentsPlaceholder(note, body) {
  dom.commentsNote.textContent = note;
  dom.commentsMount.innerHTML = `
    <div class="comments-placeholder">
      ${body}
    </div>
  `;
}

function ensureTwikooLoaded(scriptUrl) {
  if (window.twikoo) {
    return Promise.resolve(window.twikoo);
  }

  if (window.__twikooLoadingPromise) {
    return window.__twikooLoadingPromise;
  }

  window.__twikooLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-twikoo-script="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.twikoo), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.dataset.twikooScript = "true";
    script.onload = () => resolve(window.twikoo);
    script.onerror = () => reject(new Error(`Failed to load Twikoo script: ${scriptUrl}`));
    (document.head || document.body).appendChild(script);
  });

  return window.__twikooLoadingPromise;
}

async function mountTwikoo(item, comments) {
  await ensureTwikooLoaded(comments.scriptUrl || "./assets/vendor/twikoo.all.min.js");

  dom.commentsMount.innerHTML = "";

  await window.twikoo.init({
    el: "#comments-mount",
    envId: comments.envId,
    region: comments.region || undefined,
    lang: comments.lang || "zh-CN",
    path: getCommentPath(item),
  });
}

async function renderComments(item) {
  const comments = getCommentsConfig();

  if (comments.provider !== "twikoo") {
    renderCommentsPlaceholder(
      "当前站点还没有启用评论服务。",
      "评论功能尚未接入具体服务。",
    );
    return;
  }

  if (!comments.envId) {
    renderCommentsPlaceholder(
      "本站已切换为 Twikoo。只要创建腾讯云云开发环境并填入 envId，就能启用大陆可访问的游客评论。",
      "Twikoo 已预留，但还没有填写腾讯云 CloudBase 的 envId。",
    );
    return;
  }

  dom.commentsNote.textContent =
    "评论区已接入 Twikoo。当前每个章节会使用独立评论线程，适合按章节收集阅读反馈、主线修订意见与结构调整建议。";

  try {
    await mountTwikoo(item, comments);
  } catch (error) {
    console.error(error);
    renderCommentsPlaceholder(
      "Twikoo 评论区加载失败。",
      "评论脚本或云环境暂时不可用。你可以稍后刷新重试，或检查 envId 与云环境部署是否完成。",
    );
  }
}

function renderPagerCard(entry, label, emptyTitle, className = "") {
  const classes = ["pager-card", className];

  if (!entry) {
    classes.push("is-disabled");
  }

  const classAttr = classes.filter(Boolean).join(" ");

  if (!entry) {
    return `<div class="${classAttr}"><small>${label}</small><strong>${emptyTitle}</strong></div>`;
  }

  return `<a class="${classAttr}" href="#doc/${encodeURIComponent(entry.id)}"><small>${label}</small><strong>${getDisplayTitle(entry)}</strong></a>`;
}

function renderPagination(item) {
  const sequence = getReadingSequence();
  const currentIndex = sequence.findIndex((entry) => entry.id === item.id);
  const prev = sequence[currentIndex - 1] || null;
  const next = sequence[currentIndex + 1] || null;
  const alternate = getAlternateVersionItem(item);
  const alternateLabel = getAlternateVersionLabel(item);

  updateChapterButtons(prev, next);
  dom.docPagination.innerHTML = "";

  const cards = [
    renderPagerCard(prev, "上一章", "已经到头了"),
    renderPagerCard(
      alternate,
      alternateLabel,
      getAlternateVersionEmptyTitle(item),
      "is-variant",
    ),
    renderPagerCard(next, "下一章", "已经到底了"),
  ];

  dom.docPagination.innerHTML = cards.join("");
}

async function typesetMath() {
  await typesetElement(dom.docContent);
}

async function typesetElement(element) {
  if (window.MathJax?.typesetPromise && element) {
    await window.MathJax.typesetPromise([element]);
  }
}

function updateReadingProgress() {
  if (!state.activeId || dom.docView.classList.contains("hidden")) {
    dom.readerProgressBar.style.transform = "scaleX(0)";
    return;
  }

  const paper = dom.readerPaper;
  const start = window.scrollY + paper.getBoundingClientRect().top - 120;
  const distance = Math.max(1, paper.offsetHeight - window.innerHeight * 0.72);
  const progress = clamp((window.scrollY - start) / distance, 0, 1);

  dom.readerProgressBar.style.transform = `scaleX(${progress})`;
}

async function renderDoc(id) {
  const item = findItemById(id);
  if (!item) {
    renderHome();
    return;
  }

  cleanupLabPlaygrounds();
  state.activeId = item.id;
  state.activeLabPage = null;
  document.body.classList.add("is-reading");
  dom.homeView.classList.add("hidden");
  dom.labView.classList.add("hidden");
  dom.docView.classList.remove("hidden");
  dom.viewTitle.textContent = getDisplayTitle(item);
  dom.tocButton.disabled = false;

  buildNav();
  syncViewButtons();
  closePanels();

  dom.docBreadcrumb.textContent = item.sectionTitle;
  dom.docTitle.textContent = getDisplayTitle(item);
  dom.docUpdated.textContent = relativeTime(item.updatedAt);
  dom.docSource.textContent = `源文件：${item.sourcePath}`;
  dom.docContent.innerHTML = getRenderedDocHtml(item);
  await renderComments(item);

  renderToc(item);
  renderPagination(item);
  window.scrollTo({ top: 0, behavior: "auto" });
  await typesetMath();
  updateReadingProgress();
}

function updateShell() {
  const site = state.payload.site;
  const stats = state.payload.stats;

  dom.siteTitle.textContent = site.title;
  dom.siteTagline.textContent = site.tagline;
  dom.heroTitle.textContent = site.heroTitle;
  dom.heroText.textContent = site.heroText;
  if (dom.positioningStatement) {
    dom.positioningStatement.textContent = site.positioningStatement || site.tagline;
  }
  if (dom.positioningSupport) {
    dom.positioningSupport.textContent = site.positioningSupport || site.description;
  }
  dom.siteStats.textContent = `共 ${stats.documentCount} 篇文稿，最近更新 ${formatDate(stats.newestUpdate)}。`;

  if (site.repoUrl) {
    dom.repoLink.href = site.repoUrl;
    dom.repoLink.hidden = false;
  } else {
    dom.repoLink.hidden = true;
  }
}

async function route() {
  const routeState = getHashRoute();
  if (routeState.type === "home") {
    renderHome();
    return;
  }
  if (routeState.type === "lab") {
    state.labParams = resolveLabParams(routeState.page, routeState.params);
    await renderLab(routeState.page);
    return;
  }
  await renderDoc(routeState.id);
}

function bindEvents() {
  dom.searchInput.addEventListener("input", buildNav);
  dom.catalogButton.addEventListener("click", () => {
    setMobileFontPanelOpen(false);
    setTocOpen(false);
    setDrawerOpen(!state.drawerOpen);
  });
  dom.tocButton.addEventListener("click", () => {
    if (!state.activeId) return;
    setMobileFontPanelOpen(false);
    setDrawerOpen(false);
    setTocOpen(!state.tocOpen);
  });
  dom.labButton.addEventListener("click", () => {
    closePanels();
    setHashForLab(state.activeLabPage || "learn");
  });
  dom.themeButton.addEventListener("click", cycleTheme);
  dom.fontDownButton.addEventListener("click", () => adjustFont(-1));
  dom.fontUpButton.addEventListener("click", () => adjustFont(1));
  dom.mobileFontDownButton.addEventListener("click", () => adjustFont(-1));
  dom.mobileFontUpButton.addEventListener("click", () => adjustFont(1));
  dom.fontResetButton.addEventListener("click", resetFontSize);
  dom.homeButton.addEventListener("click", () => {
    closePanels();
    window.location.hash = "";
  });

  dom.startReadingButton.addEventListener("click", () => {
    const item = getPrimaryStartItem();
    if (item) setHashForDoc(item.id);
  });
  dom.openLabButton.addEventListener("click", () => {
    const item = getSectionEntry("light-series") || getSectionEntry("book");
    if (item) setHashForDoc(item.id);
  });
  dom.openCatalogButton.addEventListener("click", () => setDrawerOpen(true));

  dom.mobileHomeButton.addEventListener("click", () => {
    closePanels();
    window.location.hash = "";
  });
  dom.mobileCatalogButton.addEventListener("click", () => {
    setMobileFontPanelOpen(false);
    setTocOpen(false);
    setDrawerOpen(!state.drawerOpen);
  });
  dom.mobileFontButton.addEventListener("click", () => {
    setDrawerOpen(false);
    setTocOpen(false);
    setMobileFontPanelOpen(!state.mobileFontPanelOpen);
  });
  dom.mobileThemeButton.addEventListener("click", cycleTheme);
  dom.mobilePrevButton.addEventListener("click", () => {
    if (state.currentPrevId) {
      closePanels();
      setHashForDoc(state.currentPrevId);
    }
  });
  dom.mobileNextButton.addEventListener("click", () => {
    if (state.currentNextId) {
      closePanels();
      setHashForDoc(state.currentNextId);
    }
  });

  dom.pageOverlay.addEventListener("click", closePanels);

  dom.labTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lab-page]");
    if (!button) return;
    setHashForLab(button.dataset.labPage);
  });

  window.addEventListener("hashchange", () => {
    route().catch(console.error);
  });

  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      document.body.classList.remove("lock-scroll");
      setMobileFontPanelOpen(false);
    }
    applyPreferences();
    updateReadingProgress();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanels();
    }

    if (!state.activeId) return;

    if (event.key === "ArrowLeft" && state.currentPrevId) {
      setHashForDoc(state.currentPrevId);
    }

    if (event.key === "ArrowRight" && state.currentNextId) {
      setHashForDoc(state.currentNextId);
    }
  });
}

async function init() {
  const response = await fetch(contentUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load content: ${response.status}`);
  }

  state.payload = await response.json();
  updateShell();
  buildStarterLinks();
  buildFeaturedVolume();
  applyPreferences();
  buildLightSeriesLinks();
  buildQuickLinks();
  buildSystemLinks();
  buildNav();
  bindEvents();
  await route();
}

init().catch((error) => {
  console.error(error);
  dom.homeView.classList.remove("hidden");
  dom.docView.classList.add("hidden");
  dom.heroTitle.textContent = "站点加载失败";
  dom.heroText.textContent = "内容数据没有成功加载。你可以先重新运行构建脚本，再刷新网页。";
});
