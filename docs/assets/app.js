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
const HOME_SECTION_ORDER = ["light-series", "plain-book", "overview", "book", "extension-book", "terms", "ai-book"];
const PRIMARY_VOLUME_SECTION_IDS = Object.freeze(["plain-book", "book", "extension-book", "ai-book"]);
const VOLUME_ENTRY_SOURCE_PATHS = Object.freeze({
  "plain-book": "研究文稿/07_书稿/白话卷/00_卷首_怎么读这本白话卷.md",
  book: "研究文稿/07_书稿/00_卷首_怎么使用这本研究卷.md",
  "extension-book":
    "研究文稿/07_书稿/拓展卷/00_卷首_为什么要有拓展卷_让方法在阅读中直接变成能力.md",
  "ai-book": "研究文稿/07_书稿/AI协作卷/00_卷首_AI不是结论机器而是受主线约束的协作系统.md",
});
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
    "研究文稿/07_书稿/00_卷首_怎么使用这本研究卷.md",
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
  "研究文稿/07_书稿/00_卷首_怎么使用这本研究卷.md":
    "研究文稿/07_书稿/白话卷/00_卷首_怎么读这本白话卷.md",
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
    badge: "第一卷",
    eyebrow: "大众卷",
    hook: "先上手、先复述、先把判断动作练顺。",
    description: "第一次进入本站，优先从大众卷开始。它负责降低门槛，让方法先进入阅读、教学和自测。",
  },
  book: {
    badge: "第二卷",
    eyebrow: "研究卷",
    hook: "压定义、补桥梁、留接口，让主线真正站住。",
    description: "当你已经愿意继续追问这套方法哪里站住、哪里还没站住时，就从研究卷进入。",
  },
  "extension-book": {
    badge: "第三卷",
    eyebrow: "拓展卷",
    hook: "把方法从能懂推进到能练、能用、能迁移。",
    description: "当你想把方法直接练进思维、学习和行动里，而不只停在理解层时，就从拓展卷进入。",
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
    badge: "第四卷",
    eyebrow: "AI 协作卷",
    hook: "把扩写变成协作，把噪声变成残差，把修改变成回写。",
    description: "它不是第一次进入时的首读入口，而是让模型协作守主线、控噪声和做版本治理的卷册。",
  },
};
const DEFAULT_COMMENT_QUICK_ASK_PROVIDERS = Object.freeze([
  { id: "deepseek", label: "DeepSeek", url: "https://chat.deepseek.com/" },
  { id: "kimi", label: "Kimi", url: "https://www.kimi.com/" },
  { id: "doubao", label: "豆包", url: "https://www.doubao.com/chat/" },
  { id: "chatgpt", label: "ChatGPT", url: "https://chatgpt.com/" },
]);
const GRAPH_STATUS_LABELS = {
  lit: "已展开",
  mapped: "已标注",
  candidate: "候选",
};
const GRAPH_KIND_LABELS = {
  mother: "母网",
  core: "核心网",
  interface: "重点接口",
  secondary: "二级网",
};
const GRAPH_LEGEND = Object.freeze([
  {
    status: "lit",
    title: "已展开",
    copy: "这个节点已经在正文、白话卷、专题或协作卷里被明确谈到，点开可以直接继续读。",
  },
  {
    status: "mapped",
    title: "已标注",
    copy: "目前主要停留在图谱、附录或总纲中，说明它已经被登记，但还没有充分展开成主阅读入口。",
  },
  {
    status: "candidate",
    title: "候选",
    copy: "这层节点已经被提出，但还没真正进入站内章节体系，适合作为下一轮扩写与补桥候选。",
  },
]);
const GRAPH_FAMILY_PALETTE = Object.freeze({
  "mother-1": { accent: "#a65d31", soft: "rgba(166, 93, 49, 0.12)", line: "rgba(166, 93, 49, 0.3)" },
  "mother-2": { accent: "#b34b3a", soft: "rgba(179, 75, 58, 0.12)", line: "rgba(179, 75, 58, 0.3)" },
  "mother-3": { accent: "#8c6a24", soft: "rgba(140, 106, 36, 0.12)", line: "rgba(140, 106, 36, 0.3)" },
  "mother-4": { accent: "#2e6c89", soft: "rgba(46, 108, 137, 0.12)", line: "rgba(46, 108, 137, 0.3)" },
  "mother-5": { accent: "#2d7a70", soft: "rgba(45, 122, 112, 0.12)", line: "rgba(45, 122, 112, 0.3)" },
  "mother-6": { accent: "#8e4664", soft: "rgba(142, 70, 100, 0.12)", line: "rgba(142, 70, 100, 0.3)" },
  bridge: { accent: "#5c6578", soft: "rgba(92, 101, 120, 0.12)", line: "rgba(92, 101, 120, 0.3)" },
});
const GRAPH_MAP_LAYOUT = Object.freeze({
  paddingX: 34,
  paddingY: 26,
  groupWidth: 254,
  groupGap: 28,
  mother: { width: 196, height: 72, y: 52 },
  core: { width: 112, height: 92, startY: 166, colGap: 12, rowGap: 14 },
  interface: { width: 220, height: 74, startY: 544, gap: 12 },
  secondary: { width: 220, height: 74, gap: 12 },
});
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
  prompt: {
    title: "AI 导读台",
    intro:
      "先用提示词把问题收紧，再让站内导读助手带着章节入口返回，让读者能直接继续读下去。",
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
  prompt: {
    "prompt-scene": "study-plan",
    "prompt-object": "初中物理",
    "prompt-level": "会一点基础概念，但公式和现象总是分开记，做题时容易混。",
    "prompt-goal": "请帮我快速构建一套能执行的学习计划，并把力、运动、压强、浮力、电学等关键概念拉通。",
    "prompt-time": "每天 40 分钟，周末可额外投入 2 小时，预计连续学习 4 周。",
    "prompt-output": "plan-table",
    "prompt-focus": "不要空泛鼓励，优先找关键差异、易混边界、验证动作和复盘顺序。",
  },
};
const LAB_PROMPT_SCENES = [
  {
    id: "study-plan",
    label: "学习计划",
    description: "适合第一次系统学一个新学科或新模块时使用。",
    lead: "先找关键差异，再压成阶段计划和验证节奏。",
    instruction:
      "请优先拆出这个主题最该先分清的概念差异，再按阶段安排输入顺序、练习顺序和验证顺序。",
    deliverables: [
      "列出最关键的 3-6 组差异或易混点",
      "给出阶段计划、每日/每周动作和节奏",
      "把每一阶段对应的验证动作一起写清楚",
    ],
  },
  {
    id: "concept-bridge",
    label: "概念拉通",
    description: "适合已经学过一些内容，但总觉得知识点彼此断开时使用。",
    lead: "先看差异如何分出边界，再把概念接成一张可迁移的图。",
    instruction:
      "请重点构建概念之间的主线、从属关系、对立关系和迁移线，不要只平铺定义。",
    deliverables: [
      "指出核心概念之间的区别与联系",
      "标出最容易混淆的边界条件",
      "给出一张从基础到综合的概念桥接图",
    ],
  },
  {
    id: "mistake-diagnosis",
    label: "错题诊断",
    description: "适合成绩不上不下、反复错在相似位置时使用。",
    lead: "把错题当成差异暴露器，而不是只当成一道题。",
    instruction:
      "请优先识别哪些错误来自概念边界不清、哪些来自流程断裂、哪些来自验证缺失。",
    deliverables: [
      "分类诊断错误成因",
      "给出对应的补救动作和再练顺序",
      "设计一套下次做题前的自检清单",
    ],
  },
  {
    id: "life-stability",
    label: "生活稳态",
    description: "适合分析作息、情绪、关系、压力与能量分配时使用。",
    lead: "不是追求完美平衡，而是找出哪些落差值得收纳成稳态。",
    instruction:
      "请把生活问题拆成能量差、时间差、反馈差和环境差，帮助我搭出能维持的结构。",
    deliverables: [
      "识别主要失稳源和被忽略的反馈",
      "给出可持续的调整顺序",
      "告诉我什么情况下先不要再改了",
    ],
  },
  {
    id: "income-path",
    label: "能力变现",
    description: "适合梳理挣钱、找切口、做能力组合时使用。",
    lead: "先找市场差异和个人能力差，再决定路径而不是直接幻想结果。",
    instruction:
      "请优先分析我的能力、资源、时间和市场需求之间的差异，给出更现实的变现路线。",
    deliverables: [
      "识别最有价值的能力差与市场差",
      "给出短中期可执行路线",
      "说明每一步如何验证是否真有回报",
    ],
  },
  {
    id: "tempo-thinking",
    label: "快慢思维",
    description: "适合区分空想与充实、高低效思维，以及什么该快、什么该慢时使用。",
    lead: "不是一味求快或一味求慢，而是给快思找边界、给慢思找承重结构。",
    instruction:
      "请优先区分哪些内容适合快思直推，哪些必须慢思校验；同时识别哪些只是空想打转，哪些已经具备被充实、被验证、被落地的条件。",
    deliverables: [
      "列出空想与充实思考的关键区别",
      "指出高效思维与低效思维分别卡在哪里",
      "给出快思触发条件、慢思检查清单和切换条件",
    ],
  },
  {
    id: "research-collab",
    label: "研究协作",
    description: "适合和 AI 一起沉淀理论、整理材料、推进专题时使用。",
    lead: "把 AI 当协作接口，不把它当最终裁判。",
    instruction:
      "请把任务拆成差异识别、边界整理、证据归档、待验证点和下一步协作动作。",
    deliverables: [
      "列出当前最关键的问题差异与证据缺口",
      "给出协作步骤、文件结构或提问顺序",
      "明确哪些结论只是猜测，哪些已经较稳",
    ],
  },
];
const LAB_PROMPT_SCENE_MAP = Object.freeze(
  Object.fromEntries(LAB_PROMPT_SCENES.map((scene) => [scene.id, scene])),
);
const LAB_PROMPT_OUTPUTS = [
  {
    id: "plan-table",
    label: "计划表",
    description: "优先输出阶段计划、时间安排和验证节点。",
    instruction: "请优先给分阶段表格、每日动作、复盘节点和执行顺序。",
  },
  {
    id: "concept-map",
    label: "概念图",
    description: "优先输出主线概念、边界关系和迁移线。",
    instruction: "请优先给概念骨架、差异对照和一条能串联起来的主线。",
  },
  {
    id: "action-checklist",
    label: "行动清单",
    description: "优先输出短而硬的动作，不要铺陈过多解释。",
    instruction: "请优先给可执行清单、检查点和停止条件，不要长篇理论铺垫。",
  },
  {
    id: "dual-loop",
    label: "双模流程",
    description: "优先输出快思触发、慢思校验和快慢切换条件。",
    instruction: "请优先给快思/慢思双流程、切换触发器、停损线和复盘节点。",
  },
  {
    id: "coach-dialogue",
    label: "教练对话",
    description: "优先输出可直接继续追问的对话式引导。",
    instruction: "请优先以教练问答形式推进，每次只推进一层并保留下一轮提问口。",
  },
];
const LAB_PROMPT_OUTPUT_MAP = Object.freeze(
  Object.fromEntries(LAB_PROMPT_OUTPUTS.map((item) => [item.id, item])),
);
const LAB_CONTROL_OPTIONS = Object.freeze({
  "infer-domain": LAB_INFER_DOMAINS,
  "prompt-scene": LAB_PROMPT_SCENES.map((scene) => scene.id),
  "prompt-output": LAB_PROMPT_OUTPUTS.map((item) => item.id),
});
const LAB_TEXT_LIMITS = Object.freeze({
  "prompt-object": 48,
  "prompt-level": 120,
  "prompt-goal": 160,
  "prompt-time": 100,
  "prompt-focus": 180,
});
const LAB_ARCHITECTURE_LAYERS = [
  {
    title: "理论层",
    copy: "把落差、边界、反馈、稳态这些主轴压成可以连续阅读的理论语言。",
    pages: ["learn", "prompt"],
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
    title: "协作层",
    copy: "把方法压成可复制提示词、提问脚手架和协作顺序，让 AI 也按同一主线工作。",
    pages: ["prompt"],
  },
  {
    title: "接口层",
    copy: "为真实求解器、观测数据、批量扫描和研究日志预留挂接位置。",
    pages: ["learn", "play", "validate", "infer", "prompt"],
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
  prompt: {
    title: "把方法压成可直接提问的入口，再让回答回到站内章节",
    copy:
      "这一页不再只负责生成提示词，也负责把站内实时问答接起来。重点不是让 AI 脱离文本自由发挥，而是先在站内找相关章节，再按差异、边界、反馈、结构和验证的顺序组织回答。",
    focus:
      "当前这页更偏向理论层、协作层与接口层：前半部分把方法压成一句能问的话，后半部分则把问答重新接回章节、图谱与后续阅读线。",
    hookTitle: "AI 导读台后面能继续挂什么",
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
  prompt: [
    {
      title: "提示词模板库",
      copy: "把学习、工作、研究、生活等高频场景继续扩成可复用模板，降低新读者的上手门槛。",
    },
    {
      title: "结果回写接口",
      copy: "把 AI 回答过的有效结构沉淀成案例、清单与知识图谱节点，而不是每次都从零开始问。",
    },
    {
      title: "多模型对照",
      copy: "同一提示词可以同时拿给不同模型比较，观察哪类模型更擅长找差异、收边界和给验证动作。",
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
  prompt: [
    {
      id: "physics-study",
      label: "初中物理",
      description: "让 AI 从差异出发，生成可执行的初中物理学习计划。",
      values: {
        ...LAB_CONTROL_DEFAULTS.prompt,
        "prompt-scene": "study-plan",
        "prompt-object": "初中物理",
        "prompt-level": "会一点基础概念，但公式和现象总是分开记，做题时容易混。",
        "prompt-goal": "请帮我快速构建一套能执行的学习计划，并把力、运动、压强、浮力、电学等关键概念拉通。",
        "prompt-time": "每天 40 分钟，周末可额外投入 2 小时，预计连续学习 4 周。",
        "prompt-output": "plan-table",
        "prompt-focus": "不要空泛鼓励，优先找关键差异、易混边界、验证动作和复盘顺序。",
      },
    },
    {
      id: "concept-thread",
      label: "概念拉通",
      description: "适合把一门课里分散的概念重新接成一张主线图。",
      values: {
        ...LAB_CONTROL_DEFAULTS.prompt,
        "prompt-scene": "concept-bridge",
        "prompt-object": "牛顿力学与能量观点",
        "prompt-level": "知道力、运动、功、能这些词，但总觉得它们各管各的。",
        "prompt-goal": "请帮我把几个核心概念拉通，说明它们各自解决什么问题、在哪些条件下转换。",
        "prompt-time": "希望一次输出一张能直接复习的概念桥接图，并附 3 个迁移例子。",
        "prompt-output": "concept-map",
        "prompt-focus": "优先区分概念边界和适用条件，不要只给定义堆砌。",
      },
    },
    {
      id: "mistake-repair",
      label: "错题诊断",
      description: "适合把反复犯错的位置还原成结构性短板。",
      values: {
        ...LAB_CONTROL_DEFAULTS.prompt,
        "prompt-scene": "mistake-diagnosis",
        "prompt-object": "初中电学错题",
        "prompt-level": "做题时经常把串并联、电压、电流和电阻关系混在一起。",
        "prompt-goal": "请帮我诊断错误类型，安排补救练习，并给一套下次做题前的自检流程。",
        "prompt-time": "最近两周内准备做一次专题补漏，每天能抽 30 分钟。",
        "prompt-output": "action-checklist",
        "prompt-focus": "优先拆出真正的易混差异，而不是只说多做题。",
      },
    },
    {
      id: "life-reset",
      label: "生活稳态",
      description: "用差结构方法分析作息、情绪、精力与环境的关系。",
      values: {
        ...LAB_CONTROL_DEFAULTS.prompt,
        "prompt-scene": "life-stability",
        "prompt-object": "最近的作息与精力失稳",
        "prompt-level": "知道自己状态不稳，但说不清到底是睡眠、工作、情绪还是环境在拖垮我。",
        "prompt-goal": "请帮我找出主要失稳源，给出能维持两周以上的调整结构。",
        "prompt-time": "希望先做一个 10 天的低摩擦调整方案，每天额外投入不超过 45 分钟。",
        "prompt-output": "coach-dialogue",
        "prompt-focus": "不要追求完美日程，优先识别真正关键的落差和反馈点。",
      },
    },
    {
      id: "income-route",
      label: "能力变现",
      description: "适合梳理个人能力、市场差异和现实变现路径。",
      values: {
        ...LAB_CONTROL_DEFAULTS.prompt,
        "prompt-scene": "income-path",
        "prompt-object": "写作 + AI 工具使用能力",
        "prompt-level": "有一点表达和整理能力，也会用 AI，但还不知道怎样组合成能挣钱的服务。",
        "prompt-goal": "请帮我分析现实切口，给出 1 个月和 3 个月两个层级的变现路线。",
        "prompt-time": "平时每天最多投入 1 小时，预算有限，需要先做低成本验证。",
        "prompt-output": "action-checklist",
        "prompt-focus": "优先考虑现实需求、验证动作和失败成本，不要画太大的饼。",
      },
    },
    {
      id: "fast-slow-build",
      label: "快慢思维",
      description: "帮助区分空想/充实、高低效思维，并建立快慢切换规则。",
      values: {
        ...LAB_CONTROL_DEFAULTS.prompt,
        "prompt-scene": "tempo-thinking",
        "prompt-object": "我当前的学习、决策与思辨方式",
        "prompt-level": "我有很多想法，但经常在空想、拖延、过快下判断或过慢不行动之间来回摆动。",
        "prompt-goal": "请帮我构建一套更好的快慢思维结构，让我知道哪些问题要快，哪些问题要慢，怎样避免低效内耗。",
        "prompt-time": "希望先形成一套一周内就能开始执行的双模思维流程，并能长期复用。",
        "prompt-output": "dual-loop",
        "prompt-focus": "重点区分空想与充实、高效与低效，并给快慢切换条件、止损线和复盘动作。",
      },
    },
    {
      id: "research-loop",
      label: "研究协作",
      description: "把 AI 作为理论沉淀与结构整理的协作接口。",
      values: {
        ...LAB_CONTROL_DEFAULTS.prompt,
        "prompt-scene": "research-collab",
        "prompt-object": "差结构学习法的一个待扩写专题",
        "prompt-level": "我有一些片段、观点和争议点，但还没有把材料稳定压成章节骨架。",
        "prompt-goal": "请帮我识别证据缺口、主轴差异和下一步写作/验证顺序。",
        "prompt-time": "希望先产出一版专题骨架和待验证清单，后续再展开。",
        "prompt-output": "plan-table",
        "prompt-focus": "请把结论、猜测、证据缺口分开，不要替我假装已经论证完成。",
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
  searchTextCache: new Map(),
  activeId: null,
  activeDeckId: null,
  activeDeckCardId: null,
  activeGraphNodeId: null,
  activeLabPage: null,
  labParams: {},
  labActionTimer: null,
  labPlaygroundCleanups: [],
  assistantMessages: [],
  assistantPending: false,
  assistantAbortController: null,
  assistantStatus: {
    message: "",
    tone: "info",
  },
  assistantOpen: false,
  activePrimaryView: "home",
  drawerOpen: false,
  tocOpen: false,
  mobileFontPanelOpen: false,
  currentPrevId: null,
  currentNextId: null,
  commentCopyTimer: null,
  commentFocusTimer: null,
  commentFocusRevision: 0,
  commentFocusFrame: null,
  preferences: loadPreferences(),
};

const dom = {
  pageOverlay: document.getElementById("page-overlay"),
  assistantLauncher: document.getElementById("assistant-launcher"),
  assistantLauncherContext: document.getElementById("assistant-launcher-context"),
  assistantPanel: document.getElementById("assistant-panel"),
  assistantPanelTitle: document.getElementById("assistant-panel-title"),
  assistantPanelDescription: document.getElementById("assistant-panel-description"),
  assistantCloseButton: document.getElementById("assistant-close-button"),
  assistantContextTitle: document.getElementById("assistant-context-title"),
  assistantContextBadge: document.getElementById("assistant-context-badge"),
  assistantContextCopy: document.getElementById("assistant-context-copy"),
  assistantContextChips: document.getElementById("assistant-context-chips"),
  assistantQuickActions: document.getElementById("assistant-quick-actions"),
  assistantConversation: document.getElementById("assistant-conversation"),
  assistantQuestion: document.getElementById("assistant-question"),
  assistantSubmitButton: document.getElementById("assistant-submit-button"),
  assistantStopButton: document.getElementById("assistant-stop-button"),
  assistantClearButton: document.getElementById("assistant-clear-button"),
  assistantStatus: document.getElementById("assistant-status"),
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
  graphButton: document.getElementById("graph-button"),
  tabHomeButton: document.getElementById("tab-home-button"),
  tabLabButton: document.getElementById("tab-lab-button"),
  tabGraphButton: document.getElementById("tab-graph-button"),
  tabAiButton: document.getElementById("tab-ai-button"),
  homeView: document.getElementById("home-view"),
  deckView: document.getElementById("deck-view"),
  graphView: document.getElementById("graph-view"),
  labView: document.getElementById("lab-view"),
  docView: document.getElementById("doc-view"),
  heroTitle: document.getElementById("hero-title"),
  heroText: document.getElementById("hero-text"),
  positioningStatement: document.getElementById("positioning-statement"),
  positioningSupport: document.getElementById("positioning-support"),
  liveBookSection: document.getElementById("live-book-section"),
  liveBookTitle: document.getElementById("live-book-title"),
  liveBookSummary: document.getElementById("live-book-summary"),
  liveBookCadence: document.getElementById("live-book-cadence"),
  liveBookStatus: document.getElementById("live-book-status"),
  liveBookEntryLink: document.getElementById("live-book-entry-link"),
  liveBookOpenCatalog: document.getElementById("live-book-open-catalog"),
  liveBookWorkflow: document.getElementById("live-book-workflow"),
  liveBookHomeCards: document.getElementById("live-book-home-cards"),
  starterLinks: document.getElementById("starter-links"),
  lightSeriesLinks: document.getElementById("light-series-links"),
  cardDeckSection: document.getElementById("card-deck-section"),
  cardDeckSummary: document.getElementById("card-deck-summary"),
  cardDeckGrid: document.getElementById("card-deck-grid"),
  systemLinks: document.getElementById("system-links"),
  quickLinks: document.getElementById("quick-links"),
  featuredVolumeTitle: document.getElementById("featured-volume-title"),
  featuredVolumeCopy: document.getElementById("featured-volume-copy"),
  featuredVolumeMeta: document.getElementById("featured-volume-meta"),
  featuredVolumeLinks: document.getElementById("featured-volume-links"),
  graphTitle: document.getElementById("graph-title"),
  graphIntro: document.getElementById("graph-intro"),
  graphStats: document.getElementById("graph-stats"),
  graphLegend: document.getElementById("graph-legend"),
  graphClusters: document.getElementById("graph-clusters"),
  graphDetail: document.getElementById("graph-detail"),
  graphPreviewGrid: document.getElementById("graph-preview-grid"),
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
  deckContent: document.getElementById("deck-content"),
  catalogButton: document.getElementById("catalog-button"),
  tocButton: document.getElementById("toc-button"),
  labButton: document.getElementById("lab-button"),
  themeButton: document.getElementById("theme-button"),
  fontDownButton: document.getElementById("font-down-button"),
  fontUpButton: document.getElementById("font-up-button"),
  fontSizeIndicator: document.getElementById("font-size-indicator"),
  startReadingButton: document.getElementById("start-reading-button"),
  openGraphButton: document.getElementById("open-graph-button"),
  openGraphLaunchButton: document.getElementById("open-graph-launch-button"),
  openLabButton: document.getElementById("open-lab-button"),
  openCatalogButton: document.getElementById("open-catalog-button"),
  homeSearchButton: document.getElementById("home-search-button"),
  homeSearchStripButton: document.getElementById("home-search-strip-button"),
  homeGraphShortcutButton: document.getElementById("home-graph-shortcut-button"),
  homeThemeShortcutButton: document.getElementById("home-theme-shortcut-button"),
  homeLabShortcutButton: document.getElementById("home-lab-shortcut-button"),
  homeStartButton: document.getElementById("home-start-button"),
  homeCatalogButton: document.getElementById("home-catalog-button"),
  appHomeHeroTitle: document.getElementById("app-home-hero-title"),
  appHomeHeroText: document.getElementById("app-home-hero-text"),
  appHomeFeaturedVolumeTitle: document.getElementById("app-home-featured-volume-title"),
  appHomeFeaturedVolumeCopy: document.getElementById("app-home-featured-volume-copy"),
  appHomeFeaturedVolumeMeta: document.getElementById("app-home-featured-volume-meta"),
  appHomeFeaturedVolumeLinks: document.getElementById("app-home-featured-volume-links"),
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
  liveBookCommentPanel: document.getElementById("live-book-comment-panel"),
  commentCopyStatus: document.getElementById("comment-copy-status"),
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function sanitizeLabTextValue(key, value, fallback) {
  const maxLength = LAB_TEXT_LIMITS[key] || 120;
  const normalized = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
  return normalized || fallback;
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

      if (LAB_CONTROL_OPTIONS[key]) {
        return [key, LAB_CONTROL_OPTIONS[key].includes(rawParams[key]) ? rawParams[key] : fallback];
      }

      if (typeof fallback === "string") {
        return [key, sanitizeLabTextValue(key, rawParams[key], fallback)];
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
  if (hash === "deck") {
    return { type: "deck", deckId: null, params };
  }
  if (hash.startsWith("deck/")) {
    return { type: "deck", deckId: hash.slice(5), params };
  }
  if (hash.startsWith("doc/")) {
    return { type: "doc", id: hash.slice(4), params };
  }
  if (hash === "graph") {
    return { type: "graph", nodeId: null };
  }
  if (hash.startsWith("graph/")) {
    return { type: "graph", nodeId: hash.slice(6) };
  }
  if (hash === "lab") {
    return { type: "lab", page: "play", params: {} };
  }
  if (hash.startsWith("lab/")) {
    return { type: "lab", page: normalizeLabPage(hash.slice(4)), params };
  }
  return { type: "home" };
}

function sanitizeDocRouteParams(params = null) {
  if (!params) return null;

  const resolved = {};

  if (typeof params.focus === "string") {
    const focus = params.focus.trim().slice(0, 120);
    if (focus) {
      resolved.focus = focus;
    }
  }

  if (typeof params.anchor === "string") {
    const anchor = params.anchor.trim().slice(0, 160);
    if (anchor) {
      resolved.anchor = anchor;
    }
  }

  return Object.keys(resolved).length ? resolved : null;
}

function buildDocHash(id, params = null) {
  const baseHash = `doc/${encodeURIComponent(id)}`;
  const resolved = sanitizeDocRouteParams(params);
  if (!resolved) return baseHash;

  const search = new URLSearchParams();
  Object.entries(resolved).forEach(([key, value]) => {
    search.set(key, value);
  });

  const query = search.toString();
  return query ? `${baseHash}?${query}` : baseHash;
}

function setHashForDoc(id, params = null, { replace = false } = {}) {
  const hash = buildDocHash(id, params);
  if (replace) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
    return;
  }
  window.location.hash = hash;
}

function sanitizeDeckRouteParams(params = null) {
  if (!params) return null;

  const resolved = {};

  if (typeof params.card === "string") {
    const card = params.card.trim().slice(0, 120);
    if (card) {
      resolved.card = card;
    }
  }

  return Object.keys(resolved).length ? resolved : null;
}

function buildDeckHash(deckId = null, params = null) {
  const normalizedDeckId = String(deckId || "").trim();
  const baseHash = normalizedDeckId ? `deck/${encodeURIComponent(normalizedDeckId)}` : "deck";
  const resolved = sanitizeDeckRouteParams(params);
  if (!resolved) return baseHash;

  const search = new URLSearchParams();
  Object.entries(resolved).forEach(([key, value]) => {
    search.set(key, value);
  });

  const query = search.toString();
  return query ? `${baseHash}?${query}` : baseHash;
}

function setHashForDeck(deckId = null, params = null, { replace = false } = {}) {
  const hash = buildDeckHash(deckId, params);
  if (replace) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
    return;
  }
  window.location.hash = hash;
}

function buildGraphHash(nodeId = null) {
  return nodeId ? `graph/${encodeURIComponent(nodeId)}` : "graph";
}

function setHashForGraph(nodeId = null, { replace = false } = {}) {
  const hash = buildGraphHash(nodeId);
  if (replace) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
    return;
  }
  window.location.hash = hash;
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
  setAssistantOpen(false);
}

function closeNavigationPanels() {
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
  dom.mobileFontPanel?.classList.toggle("hidden", !open);
  dom.mobileFontPanel?.setAttribute("aria-hidden", String(!open));
  dom.mobileFontButton?.classList.toggle("is-active", open);
  syncOverlay();
}

function setAssistantOpen(open, { focusInput = false } = {}) {
  if (open) {
    setDrawerOpen(false);
    setTocOpen(false);
    setMobileFontPanelOpen(false);
  }

  state.assistantOpen = open;
  dom.assistantPanel?.classList.toggle("is-open", open);
  dom.assistantPanel?.setAttribute("aria-hidden", String(!open));
  dom.assistantLauncher?.setAttribute("aria-expanded", String(open));
  dom.assistantLauncher?.classList.toggle("is-active", open);
  syncOverlay();
  syncViewButtons();

  if (open) {
    renderAssistantShell();
    if (focusInput) {
      window.requestAnimationFrame(() => {
        dom.assistantQuestion?.focus();
      });
    }
  }
}

function syncOverlay() {
  const visible = state.drawerOpen || state.tocOpen || state.mobileFontPanelOpen || state.assistantOpen;
  dom.pageOverlay.classList.toggle("hidden", !visible);
  dom.pageOverlay.classList.toggle("is-visible", visible);
  document.body.classList.toggle(
    "lock-scroll",
    window.innerWidth <= MOBILE_BREAKPOINT && (state.drawerOpen || state.tocOpen || state.assistantOpen),
  );
}

function findItemById(id) {
  return state.payload.items.find((item) => item.id === id) || null;
}

function getKnowledgeGraph() {
  return state.payload?.knowledgeGraph || null;
}

function getGraphNodes(kind = null) {
  const graph = getKnowledgeGraph();
  if (!graph?.nodes) return [];
  return kind ? graph.nodes.filter((node) => node.kind === kind) : graph.nodes;
}

function findGraphNodeById(nodeId) {
  if (!nodeId) return null;
  return getGraphNodes().find((node) => node.id === nodeId) || null;
}

function getGraphDefaultNode() {
  const graph = getKnowledgeGraph();
  return (
    findGraphNodeById(graph?.defaultNodeId) ||
    getGraphNodes("core")[0] ||
    getGraphNodes("mother")[0] ||
    null
  );
}

function getGraphStatusLabel(status) {
  return GRAPH_STATUS_LABELS[status] || "候选";
}

function resolveGraphStatusLabel(nodeOrStatus) {
  if (nodeOrStatus && typeof nodeOrStatus === "object") {
    if (nodeOrStatus.statusLabel) return nodeOrStatus.statusLabel;
    return getGraphStatusLabel(nodeOrStatus.status);
  }

  return getGraphStatusLabel(nodeOrStatus);
}

function getGraphKindLabel(kind) {
  return GRAPH_KIND_LABELS[kind] || "节点";
}

function getGraphNodeCountLabel(node) {
  if (!node) return "尚未建立章节入口";
  if (node.discussedChapterCount > 0) {
    return `${node.discussedChapterCount} 篇已展开`;
  }
  if (node.chapterCount > 0) {
    return `${node.chapterCount} 篇已标注`;
  }
  return "等待正文点亮";
}

function sortGraphNodes(nodes) {
  const kindRank = new Map([
    ["mother", 0],
    ["core", 1],
    ["interface", 2],
    ["secondary", 3],
  ]);

  return [...nodes].sort((left, right) => {
    const priorityDelta = (right.priority || 0) - (left.priority || 0);
    if (priorityDelta !== 0) return priorityDelta;

    const kindDelta = (kindRank.get(left.kind) || 99) - (kindRank.get(right.kind) || 99);
    if (kindDelta !== 0) return kindDelta;

    const familyDelta = (left.familyOrder || 99) - (right.familyOrder || 99);
    if (familyDelta !== 0) return familyDelta;

    return (left.order || 0) - (right.order || 0);
  });
}

function getGraphNodeItems(node, { limit = 8 } = {}) {
  if (!node) return [];

  const ids = node.discussedChapterIds?.length ? node.discussedChapterIds : node.chapterIds || [];
  return ids
    .map((itemId) => findItemById(itemId))
    .filter(Boolean)
    .slice(0, limit);
}

function getGraphCandidateNodes(node) {
  if (!node) return [];

  let relatedIds = [];
  if (node.kind === "mother") {
    relatedIds = [...(node.childIds || []), ...(node.interfaceIds || [])];
  } else if (node.kind === "core") {
    relatedIds = [...(node.interfaceIds || []), ...(node.secondaryIds || [])];
  } else if (node.kind === "interface") {
    relatedIds = [...(node.secondaryIds || [])];
  } else if (node.kind === "secondary") {
    relatedIds = [...(node.relatedIds || [])];
  }

  const deduped = [...new Set(relatedIds)]
    .map((nodeId) => findGraphNodeById(nodeId))
    .filter(Boolean)
    .filter((entry) => entry.id !== node.id);

  return sortGraphNodes(deduped).slice(0, 12);
}

function getGraphCandidateHeading(node) {
  if (!node) return "下一层候选";
  if (node.kind === "mother") return "这一层已经长出的核心网与接口";
  if (node.kind === "core") return "与它相连的接口和下一层候选";
  if (node.kind === "interface") return "这个接口往下还能长出的二级网";
  return "它依附的上层主轴";
}

function getGraphContextIdSet(node) {
  const ids = new Set([node?.id]);
  (node?.childIds || []).forEach((id) => ids.add(id));
  (node?.interfaceIds || []).forEach((id) => ids.add(id));
  (node?.secondaryIds || []).forEach((id) => ids.add(id));
  (node?.relatedIds || []).forEach((id) => ids.add(id));
  if (node?.parentId) ids.add(node.parentId);
  if (node?.familyId) ids.add(node.familyId);
  return ids;
}

function getGraphFocusFamilyIds(node) {
  const familyIds = new Set();
  const collect = (entry) => {
    if (entry?.kind === "mother") {
      familyIds.add(entry.id);
      return;
    }
    if (entry?.familyId && entry.familyId !== "bridge") {
      familyIds.add(entry.familyId);
    }
  };

  collect(node);
  (node?.relatedIds || []).forEach((id) => collect(findGraphNodeById(id)));
  if (node?.parentId) collect(findGraphNodeById(node.parentId));
  return familyIds;
}

function getGraphFamilyPalette(familyId) {
  return GRAPH_FAMILY_PALETTE[familyId] || GRAPH_FAMILY_PALETTE.bridge;
}

function wrapGraphLabel(label, maxChars = 8, maxLines = 2) {
  if (!label) return [];

  const compact = label
    .replace(/网$/, "")
    .replace(/\s+/g, "")
    .replace(/[（(].+?[）)]/g, "");
  const lines = [];

  for (let index = 0; index < compact.length && lines.length < maxLines; index += maxChars) {
    const chunk = compact.slice(index, index + maxChars);
    if (chunk) lines.push(chunk);
  }

  if (compact.length > maxChars * maxLines && lines.length) {
    const lastIndex = lines.length - 1;
    lines[lastIndex] = `${lines[lastIndex].slice(0, Math.max(1, maxChars - 1))}…`;
  }

  return lines.length ? lines : [label];
}

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, String(value));
    }
  });
  return element;
}

function appendSvgTextLines(parent, lines, {
  x,
  y,
  lineHeight = 16,
  textAnchor = "middle",
  className = "",
  fill = "currentColor",
  fontSize = 14,
  fontWeight = 500,
} = {}) {
  const text = createSvgElement("text", {
    x,
    y,
    "text-anchor": textAnchor,
    class: className,
    fill,
    "font-size": fontSize,
    "font-weight": fontWeight,
  });

  lines.forEach((line, index) => {
    const tspan = createSvgElement("tspan", {
      x,
      dy: index === 0 ? 0 : lineHeight,
    });
    tspan.textContent = line;
    text.appendChild(tspan);
  });

  parent.appendChild(text);
  return text;
}

function getGraphMapGroups(graph) {
  const nodes = graph?.nodes || [];
  const groups = (graph?.families || []).map((family) => ({
    id: family.id,
    label: family.label,
    shortLabel: family.shortLabel || family.label,
    motherId: family.id,
    coreIds: family.coreIds || [],
    interfaceIds: sortGraphNodes(nodes.filter(
      (node) => node.kind === "interface" && node.familyId === family.id,
    )).map((node) => node.id),
    secondaryIds: sortGraphNodes(nodes.filter(
      (node) => node.kind === "secondary" && node.familyId === family.id,
    )).map((node) => node.id),
  }));

  const bridgeNodes = {
    interfaceIds: sortGraphNodes(nodes.filter(
      (node) => node.kind === "interface" && node.familyId === "bridge",
    )).map((node) => node.id),
    secondaryIds: sortGraphNodes(nodes.filter(
      (node) => node.kind === "secondary" && node.familyId === "bridge",
    )).map((node) => node.id),
  };

  if (bridgeNodes.interfaceIds.length || bridgeNodes.secondaryIds.length) {
    groups.push({
      id: "bridge",
      label: "跨层接口带",
      shortLabel: "跨层接口",
      motherId: null,
      coreIds: [],
      interfaceIds: bridgeNodes.interfaceIds,
      secondaryIds: bridgeNodes.secondaryIds,
    });
  }

  return groups;
}

function buildGraphMapLayout(graph) {
  const groups = getGraphMapGroups(graph);
  const config = GRAPH_MAP_LAYOUT;
  const boxes = new Map();
  const familyFrames = [];
  let maxBottom = config.paddingY + 720;

  groups.forEach((group, groupIndex) => {
    const frameX = config.paddingX + groupIndex * (config.groupWidth + config.groupGap);
    const frameY = config.paddingY;
    const innerX = frameX + 17;
    const palette = getGraphFamilyPalette(group.id);
    let groupBottom = frameY + 120;

    if (group.motherId) {
      const motherX = frameX + (config.groupWidth - config.mother.width) / 2;
      boxes.set(group.motherId, {
        x: motherX,
        y: config.mother.y,
        width: config.mother.width,
        height: config.mother.height,
      });
      groupBottom = Math.max(groupBottom, config.mother.y + config.mother.height + 24);
    }

    group.coreIds.forEach((nodeId, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = innerX + column * (config.core.width + config.core.colGap);
      const y = config.core.startY + row * (config.core.height + config.core.rowGap);
      boxes.set(nodeId, { x, y, width: config.core.width, height: config.core.height });
      groupBottom = Math.max(groupBottom, y + config.core.height + 16);
    });

    group.interfaceIds.forEach((nodeId, index) => {
      const x = frameX + (config.groupWidth - config.interface.width) / 2;
      const y = config.interface.startY + index * (config.interface.height + config.interface.gap);
      boxes.set(nodeId, { x, y, width: config.interface.width, height: config.interface.height });
      groupBottom = Math.max(groupBottom, y + config.interface.height + 16);
    });

    const secondaryStartY = Math.max(
      config.interface.startY + group.interfaceIds.length * (config.interface.height + config.interface.gap) + 34,
      config.interface.startY + 110,
    );

    group.secondaryIds.forEach((nodeId, index) => {
      const x = frameX + (config.groupWidth - config.secondary.width) / 2;
      const y = secondaryStartY + index * (config.secondary.height + config.secondary.gap);
      boxes.set(nodeId, { x, y, width: config.secondary.width, height: config.secondary.height });
      groupBottom = Math.max(groupBottom, y + config.secondary.height + 16);
    });

    familyFrames.push({
      ...group,
      x: frameX,
      y: frameY,
      width: config.groupWidth,
      height: groupBottom - frameY + 20,
      palette,
    });
    maxBottom = Math.max(maxBottom, groupBottom + 30);
  });

  const width = config.paddingX * 2
    + groups.length * config.groupWidth
    + Math.max(0, groups.length - 1) * config.groupGap;
  const height = maxBottom + config.paddingY;

  return { boxes, familyFrames, width, height };
}

function getGraphEdgePoints(sourceBox, targetBox) {
  const sourceCenterX = sourceBox.x + sourceBox.width / 2;
  const sourceCenterY = sourceBox.y + sourceBox.height / 2;
  const targetCenterX = targetBox.x + targetBox.width / 2;
  const targetCenterY = targetBox.y + targetBox.height / 2;
  const horizontalGap = Math.abs(sourceCenterX - targetCenterX);

  if (horizontalGap > 50) {
    const sourceRight = sourceCenterX < targetCenterX;
    return {
      from: {
        x: sourceRight ? sourceBox.x + sourceBox.width : sourceBox.x,
        y: sourceCenterY,
      },
      to: {
        x: sourceRight ? targetBox.x : targetBox.x + targetBox.width,
        y: targetCenterY,
      },
      mode: "horizontal",
    };
  }

  return {
    from: {
      x: sourceCenterX,
      y: sourceCenterY < targetCenterY ? sourceBox.y + sourceBox.height : sourceBox.y,
    },
    to: {
      x: targetCenterX,
      y: sourceCenterY < targetCenterY ? targetBox.y : targetBox.y + targetBox.height,
    },
    mode: "vertical",
  };
}

function makeGraphEdgePath(sourceBox, targetBox) {
  const points = getGraphEdgePoints(sourceBox, targetBox);

  if (points.mode === "horizontal") {
    const deltaX = (points.to.x - points.from.x) * 0.48;
    return `M ${points.from.x} ${points.from.y} C ${points.from.x + deltaX} ${points.from.y}, ${points.to.x - deltaX} ${points.to.y}, ${points.to.x} ${points.to.y}`;
  }

  const deltaY = (points.to.y - points.from.y) * 0.42;
  return `M ${points.from.x} ${points.from.y} C ${points.from.x} ${points.from.y + deltaY}, ${points.to.x} ${points.to.y - deltaY}, ${points.to.x} ${points.to.y}`;
}

function getGraphNodeVisualMeta(node) {
  if (node.kind === "mother") {
    return {
      label: node.shortLabel || node.label,
      code: "母网",
      lines: wrapGraphLabel(node.shortLabel || node.label, 7, 2),
      labelY: 34,
      metaY: 58,
    };
  }

  if (node.kind === "core") {
    return {
      label: node.shortLabel || node.label,
      code: node.code || "核心网",
      lines: wrapGraphLabel(node.shortLabel || node.label, 6, 2),
      labelY: 38,
      metaY: 72,
    };
  }

  if (node.kind === "interface") {
    return {
      label: node.shortLabel || node.label,
      code: node.code || "接口",
      lines: wrapGraphLabel(node.shortLabel || node.label, 10, 2),
      labelY: 30,
      metaY: 58,
    };
  }

  return {
    label: node.shortLabel || node.label,
    code: node.code || "二级网",
    lines: wrapGraphLabel(node.shortLabel || node.label, 10, 2),
    labelY: 30,
    metaY: 58,
  };
}

function buildGraphNodeStatusLabel(node) {
  if (node.statusLabel && node.status === "candidate") {
    return node.statusLabel;
  }
  if (node.discussedChapterCount > 0) {
    return `${node.discussedChapterCount} 篇已展开`;
  }
  if (node.chapterCount > 0) {
    return `${node.chapterCount} 篇已标注`;
  }
  return "候选待写";
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

function normalizeDocSearchText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createDocFocusRegex(focus) {
  const segments = String(focus || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((segment) => escapeRegExp(segment));

  if (!segments.length) return null;
  return new RegExp(segments.join("\\s+"), "gi");
}

function clearDocFocusHighlights() {
  if (!dom.docContent) return;

  dom.docContent.querySelectorAll('[data-doc-focus-match="true"]').forEach((node) => {
    const parent = node.parentNode;
    if (!parent) return;
    parent.replaceChild(document.createTextNode(node.textContent || ""), node);
    parent.normalize();
  });

  dom.docContent.querySelectorAll(".is-doc-focus-target").forEach((node) => {
    node.classList.remove("is-doc-focus-target");
  });
}

function highlightDocFocusMatches(target, focus) {
  const regex = createDocFocusRegex(focus);
  if (!target || !regex) return 0;

  const textNodes = [];
  const walker = document.createTreeWalker(
    target,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node?.nodeValue?.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        if (node.parentElement?.closest('[data-doc-focus-match="true"]')) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  let matchCount = 0;

  textNodes.forEach((node) => {
    const text = node.nodeValue || "";
    regex.lastIndex = 0;

    if (!regex.test(text)) {
      return;
    }

    regex.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match = null;

    while ((match = regex.exec(text))) {
      const start = match.index;
      const end = start + match[0].length;

      if (start > lastIndex) {
        fragment.append(text.slice(lastIndex, start));
      }

      const marker = document.createElement("mark");
      marker.className = "doc-focus-match";
      marker.dataset.docFocusMatch = "true";
      marker.textContent = text.slice(start, end);
      fragment.append(marker);

      lastIndex = end;
      matchCount += 1;
    }

    if (lastIndex < text.length) {
      fragment.append(text.slice(lastIndex));
    }

    node.parentNode?.replaceChild(fragment, node);
  });

  return matchCount;
}

function restartAnimationClass(elements, className) {
  elements.forEach((element) => {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  });
}

function flashDocFocusTarget(target, focus = "") {
  if (!target) return;

  clearDocFocusHighlights();
  const matchCount = focus ? highlightDocFocusMatches(target, focus) : 0;
  const markers = Array.from(target.querySelectorAll('[data-doc-focus-match="true"]'));

  if (matchCount > 0 && markers.length) {
    restartAnimationClass(markers, "is-flashing");
    return;
  }

  restartAnimationClass([target], "is-doc-focus-target");
}

function findDocFocusTarget(focus) {
  const normalizedFocus = normalizeDocSearchText(focus);
  if (!normalizedFocus) return null;

  const candidates = dom.docContent.querySelectorAll("h2, h3, h4, h5, h6, p, li, blockquote, pre, table, figcaption");
  return Array.from(candidates).find((element) =>
    normalizeDocSearchText(element.textContent).includes(normalizedFocus),
  ) || null;
}

function findDocAnchorTarget(anchor) {
  if (!anchor) return null;
  const target = document.getElementById(anchor);
  if (!target || !dom.docContent.contains(target)) return null;
  return target;
}

function scrollDocTargetIntoView(target) {
  if (!target) return false;

  const offset = window.innerWidth <= MOBILE_BREAKPOINT ? 96 : 118;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  return true;
}

function applyDocRouteFocus(params = {}) {
  const resolved = sanitizeDocRouteParams(params);
  const target =
    findDocFocusTarget(resolved?.focus) ||
    findDocAnchorTarget(resolved?.anchor);

  if (!target) {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  flashDocFocusTarget(target, resolved?.focus || "");
  scrollDocTargetIntoView(target);
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

function getCardDeckPayload() {
  return state.payload?.cardDecks || { featuredDeckId: "", decks: [] };
}

function getCardDecks() {
  const decks = getCardDeckPayload().decks;
  return Array.isArray(decks) ? decks : [];
}

function getFeaturedCardDeck() {
  const payload = getCardDeckPayload();
  return (
    findCardDeckById(payload.featuredDeckId) ||
    getCardDecks()[0] ||
    null
  );
}

function findCardDeckById(deckId) {
  if (!deckId) return null;
  return getCardDecks().find((deck) => deck.id === deckId) || null;
}

function findDeckCard(deck, cardId) {
  if (!deck || !cardId || !Array.isArray(deck.cards)) return null;
  return deck.cards.find((card) => card.id === cardId) || null;
}

function findDeckSuit(deck, suitId) {
  if (!deck || !suitId || !Array.isArray(deck.suits)) return null;
  return deck.suits.find((suit) => suit.id === suitId) || null;
}

function findDeckLayer(deck, layerId) {
  if (!deck || !layerId || !Array.isArray(deck.layers)) return null;
  return deck.layers.find((layer) => layer.id === layerId) || null;
}

function findDeckSpread(deck, spreadId) {
  if (!deck || !spreadId || !Array.isArray(deck.spreads)) return null;
  return deck.spreads.find((spread) => spread.id === spreadId) || null;
}

function findDeckGuideScenario(deck, guideId) {
  if (!deck || !guideId || !Array.isArray(deck.guideScenarios)) return null;
  return deck.guideScenarios.find((guide) => guide.id === guideId) || null;
}

function getDeckEntryCard(deck, requestedCardId = null) {
  return (
    findDeckCard(deck, requestedCardId) ||
    findDeckCard(deck, deck?.entryCardId) ||
    deck?.cards?.[0] ||
    null
  );
}

function getDeckSourceItem(deck) {
  return findItemBySourcePath(deck?.sourcePath);
}

function getDeckCardSourceItem(deck, card) {
  return findItemBySourcePath(card?.sourcePath || deck?.sourcePath);
}

function getDeckCardDocHash(deck, card) {
  const sourceItem = getDeckCardSourceItem(deck, card);
  if (!sourceItem) return "";

  const focus = String(card?.focus || "").trim();
  return buildDocHash(sourceItem.id, focus ? { focus } : null);
}

function buildDeckCardAssistantQuestion(deck, card) {
  const prompt = String(card?.assistantPrompt || deck?.assistantPrompt || "").trim();
  if (prompt) return prompt;

  const deckTitle = deck?.title || "未命名牌组";
  const cardTitle = card?.title || "当前卡片";
  return `我正在看《${deckTitle}》里的“${cardTitle}”。请先说清主线，再给一个我今天能立刻执行的动作。`;
}

function buildDeckCardBadgeLabel(deck, card) {
  const suit = findDeckSuit(deck, card?.suit);
  const layer = findDeckLayer(deck, card?.layer);
  return [suit?.label, layer?.shortLabel].filter(Boolean).join(" · ") || "牌组卡片";
}

function scrollDeckDetailIntoView({ smooth = false } = {}) {
  const target = document.getElementById("deck-card-detail");
  if (!target) return;

  const offset = window.innerWidth <= MOBILE_BREAKPOINT ? 96 : 118;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: smooth ? "smooth" : "auto",
  });
}

function openDeckCard(deck, cardId, { smooth = true } = {}) {
  if (!deck || !cardId) return;

  const nextHash = buildDeckHash(deck.id, { card: cardId });
  closeNavigationPanels();

  if (window.location.hash === `#${nextHash}`) {
    renderDeck(deck.id, { card: cardId }, { scrollToDetail: smooth }).catch(console.error);
    return;
  }

  setHashForDeck(deck.id, { card: cardId });
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

function getCommentQuickAskConfig() {
  return getCommentsConfig().quickAsk || {};
}

function getCommentQuickAskProviders() {
  const quickAsk = getCommentQuickAskConfig();
  const providers = Array.isArray(quickAsk.providers)
    ? quickAsk.providers
      .map((provider) => ({
        id: String(provider?.id || "").trim(),
        label: String(provider?.label || "").trim(),
        url: String(provider?.url || "").trim(),
      }))
      .filter((provider) => provider.id && provider.label && provider.url)
    : [];

  return providers.length ? providers : DEFAULT_COMMENT_QUICK_ASK_PROVIDERS;
}

function getDefaultCommentQuickAskProvider() {
  const quickAsk = getCommentQuickAskConfig();
  const providers = getCommentQuickAskProviders();
  const preferredId = String(quickAsk.defaultProvider || "").trim();

  return (
    providers.find((provider) => provider.id === preferredId) ||
    providers[0] ||
    DEFAULT_COMMENT_QUICK_ASK_PROVIDERS[0]
  );
}

function normalizeTwikooFieldConfig(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return null;
}

function isTwikooServiceUrl(envId) {
  return /^https?:\/\//i.test(String(envId || "").trim());
}

function isCommentFieldTarget(target) {
  return (
    target instanceof HTMLElement &&
    /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) &&
    target.closest("#comments-mount")
  );
}

function setCommentFocusMode(active) {
  document.documentElement.classList.toggle("is-comment-focus", active);
  document.body.classList.toggle("is-comment-focus", active);
}

function clearCommentFocusFrame() {
  if (!state.commentFocusFrame) return;
  window.cancelAnimationFrame(state.commentFocusFrame);
  state.commentFocusFrame = null;
}

function getCommentViewportHeight() {
  const visualViewportHeight = window.visualViewport?.height;
  return Number.isFinite(visualViewportHeight) ? visualViewportHeight : window.innerHeight;
}

function stabilizeCommentField(target = document.activeElement) {
  if (!isCommentFieldTarget(target)) return;

  const rect = target.getBoundingClientRect();
  const viewportHeight = getCommentViewportHeight();
  const keyboardInset = Math.max(0, window.innerHeight - viewportHeight);
  const topPadding = window.innerWidth <= MOBILE_BREAKPOINT ? 18 : 28;
  const bottomPadding = Math.max(window.innerWidth <= MOBILE_BREAKPOINT ? 132 : 88, keyboardInset + 28);
  const availableHeight = Math.max(120, viewportHeight - topPadding - bottomPadding);
  let nextTop = null;

  if (rect.height >= availableHeight) {
    nextTop = window.scrollY + rect.top - topPadding;
  } else if (rect.top < topPadding) {
    nextTop = window.scrollY + rect.top - topPadding;
  } else if (rect.bottom > viewportHeight - bottomPadding) {
    nextTop = window.scrollY + rect.bottom - (viewportHeight - bottomPadding);
  }

  if (nextTop === null) return;

  window.scrollTo({
    top: Math.max(0, nextTop),
    behavior: "auto",
  });
}

function queueCommentFieldStabilization(target = document.activeElement, withFollowUp = false) {
  if (!isCommentFieldTarget(target)) return;

  clearCommentFocusFrame();
  const revision = ++state.commentFocusRevision;
  const delays = withFollowUp ? [0, 140, 320] : [0];

  delays.forEach((delay) => {
    window.setTimeout(() => {
      if (revision !== state.commentFocusRevision || !isCommentFieldTarget(target)) {
        return;
      }

      clearCommentFocusFrame();
      state.commentFocusFrame = window.requestAnimationFrame(() => {
        if (revision !== state.commentFocusRevision) {
          state.commentFocusFrame = null;
          return;
        }
        state.commentFocusFrame = null;
        stabilizeCommentField(target);
      });
    }, delay);
  });
}

function clearCommentFocusTimer() {
  if (!state.commentFocusTimer) return;
  window.clearTimeout(state.commentFocusTimer);
  state.commentFocusTimer = null;
}

function releaseCommentFocusModeSoon() {
  clearCommentFocusTimer();
  const revision = ++state.commentFocusRevision;
  clearCommentFocusFrame();
  state.commentFocusTimer = window.setTimeout(() => {
    if (revision !== state.commentFocusRevision) {
      state.commentFocusTimer = null;
      return;
    }
    if (!isCommentFieldTarget(document.activeElement)) {
      setCommentFocusMode(false);
    }
    state.commentFocusTimer = null;
  }, 80);
}

function getCommentsSetupItem() {
  const comments = getCommentsConfig();
  if (!comments.setupSourcePath) return null;
  return findItemBySourcePath(comments.setupSourcePath);
}

function getCommentsSetupHref() {
  const item = getCommentsSetupItem();
  return item ? `#doc/${encodeURIComponent(item.id)}` : "";
}

function buildCommentsSetupPlaceholder(comments) {
  const target = String(comments.deploymentTarget || "").trim().toLowerCase();
  const setupHref = getCommentsSetupHref();
  const serviceExample = comments.serviceUrlExample
    ? `<code>${escapeHtml(comments.serviceUrlExample)}</code>`
    : `<code>https://your-site.netlify.app/.netlify/functions/twikoo</code>`;

  if (target === "netlify") {
    return `
      <p>评论后端已改走 <strong>Netlify + MongoDB Atlas</strong> 方案，前台会继续留在当前阅读站点。</p>
      <ol class="comments-placeholder-steps">
        <li>先在 Netlify 部署 Twikoo 后端，并配置 <code>MONGODB_URI</code>。</li>
        <li>部署成功后，拿到评论服务地址，例如 ${serviceExample}。</li>
        <li>把该地址填回 <code>site.config.json</code> 的 <code>comments.envId</code>，然后重新构建站点。</li>
      </ol>
      ${
        setupHref
          ? `<p class="comments-placeholder-action"><a href="${setupHref}">查看站内接入说明</a></p>`
          : ""
      }
    `;
  }

  return `
    <p>Twikoo 评论区已预留，但当前还没有填写可用的服务地址或环境 ID。</p>
  `;
}

function getLiveBookConfig() {
  return state.payload.site.liveBook || {};
}

function getLiveBookEntryItem() {
  const liveBook = getLiveBookConfig();
  if (!liveBook.entrySourcePath) return null;
  return findItemBySourcePath(liveBook.entrySourcePath);
}

function getLiveBookWorkflow() {
  const liveBook = getLiveBookConfig();
  return Array.isArray(liveBook.workflow) ? liveBook.workflow : [];
}

function getLiveBookHomeCards() {
  const liveBook = getLiveBookConfig();
  return Array.isArray(liveBook.homeCards) ? liveBook.homeCards : [];
}

function getLiveBookTemplates() {
  const liveBook = getLiveBookConfig();
  return Array.isArray(liveBook.templates) ? liveBook.templates : [];
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

  if (dom.fontSizeIndicator) dom.fontSizeIndicator.textContent = label;
  if (dom.mobileFontSizeIndicator) dom.mobileFontSizeIndicator.textContent = label;
  if (dom.fontDownButton) dom.fontDownButton.disabled = atMin;
  if (dom.fontUpButton) dom.fontUpButton.disabled = atMax;
  if (dom.mobileFontDownButton) dom.mobileFontDownButton.disabled = atMin;
  if (dom.mobileFontUpButton) dom.mobileFontUpButton.disabled = atMax;
  if (dom.fontResetButton) dom.fontResetButton.disabled = !state.preferences.hasCustomFontSize;
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
  const preferredPath = VOLUME_ENTRY_SOURCE_PATHS[sectionId];

  if (preferredPath) {
    const preferredItem = findItemBySourcePath(preferredPath);
    if (preferredItem) return preferredItem;
  }

  if (sectionId === "book") {
    return (
      items.find((item) => getDisplayTitle(item).includes("卷首")) ||
      items.find((item) => getDisplayTitle(item).includes("导读")) ||
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
        <small class="spotlight-link-meta">${item.sectionTitle || "推荐入口"}</small>
        <strong>${getDisplayTitle(item)}</strong>
        <em>${item.excerpt || item.sectionTitle}</em>
      </span>
      <span class="spotlight-link-arrow" aria-hidden="true">›</span>
    `;
    dom.featuredVolumeLinks.appendChild(link);
  });

  syncAppHomeMirror();
}

function syncAppHomeMirror() {
  if (dom.appHomeHeroTitle) {
    dom.appHomeHeroTitle.textContent = dom.heroTitle?.textContent || "";
  }
  if (dom.appHomeHeroText) {
    dom.appHomeHeroText.textContent = dom.heroText?.textContent || "";
  }
  if (dom.appHomeFeaturedVolumeTitle) {
    dom.appHomeFeaturedVolumeTitle.textContent = dom.featuredVolumeTitle?.textContent || "";
  }
  if (dom.appHomeFeaturedVolumeCopy) {
    dom.appHomeFeaturedVolumeCopy.textContent = dom.featuredVolumeCopy?.textContent || "";
  }
  if (dom.appHomeFeaturedVolumeMeta) {
    dom.appHomeFeaturedVolumeMeta.innerHTML = dom.featuredVolumeMeta?.innerHTML || "";
  }
  if (dom.appHomeFeaturedVolumeLinks) {
    dom.appHomeFeaturedVolumeLinks.innerHTML = dom.featuredVolumeLinks?.innerHTML || "";
  }
}

function buildCardDeckHomeSection() {
  if (!dom.cardDeckSection || !dom.cardDeckGrid || !dom.cardDeckSummary) return;

  const decks = getCardDecks();
  const featuredDeck = getFeaturedCardDeck();
  const hasDecks = decks.length > 0;

  dom.cardDeckSection.hidden = !hasDecks;
  if (!hasDecks) return;

  dom.cardDeckSummary.textContent =
    featuredDeck?.summary ||
    "先把章节压成卡片，再把卡片排成可进入、可迁移的学习路径。";

  dom.cardDeckGrid.innerHTML = decks
    .map((deck, index) => {
      const sourceItem = getDeckSourceItem(deck);
      const statLabels = [
        `${deck?.stats?.cardCount || deck.cards.length} 张牌`,
        `${deck?.stats?.suitCount || deck.suits.length} 个花色`,
        `${deck?.stats?.layerCount || deck.layers.length} 层`,
      ];
      const previewCards = (deck.cards || []).slice(0, 3);

      return `
        <article class="deck-home-card">
          <p class="eyebrow">${escapeHtml(deck.eyebrow || `Deck ${formatSerialIndex(index)}`)}</p>
          <h4>${escapeHtml(deck.title || "未命名牌组")}</h4>
          <p class="deck-home-copy">${escapeHtml(deck.subtitle || deck.summary || "")}</p>
          <p class="deck-home-summary">${escapeHtml(deck.description || deck.summary || "")}</p>
          <div class="deck-home-chip-row">
            ${statLabels.map((label) => `<span class="deck-meta-chip">${escapeHtml(label)}</span>`).join("")}
          </div>
          <div class="deck-home-preview-list">
            ${previewCards
              .map(
                (card) => `
                  <button class="deck-home-preview" type="button" data-deck-home-open="${escapeHtml(deck.id)}" data-deck-card="${escapeHtml(card.id)}">
                    <span>${escapeHtml(buildDeckCardBadgeLabel(deck, card))}</span>
                    <strong>${escapeHtml(card.title || "")}</strong>
                  </button>
                `,
              )
              .join("")}
          </div>
          <div class="hero-actions deck-home-actions">
            <a class="pill-button" href="#${buildDeckHash(deck.id, { card: deck.entryCardId || deck.cards?.[0]?.id || "" })}">展开牌组</a>
            ${sourceItem ? `<a class="pill-button pill-button-ghost" href="#${getDeckCardDocHash(deck, getDeckEntryCard(deck))}">回原章</a>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  dom.cardDeckGrid
    .querySelectorAll("[data-deck-home-open]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const deck = findCardDeckById(button.dataset.deckHomeOpen);
        const cardId = button.dataset.deckCard;
        openDeckCard(deck, cardId, { smooth: false });
      });
    });
}

function buildLiveBookHomeSection() {
  if (!dom.liveBookSection) return;

  const liveBook = getLiveBookConfig();
  const workflow = getLiveBookWorkflow();
  const homeCards = getLiveBookHomeCards();
  const entryItem = getLiveBookEntryItem();
  const hasContent =
    Boolean(liveBook.title || liveBook.summary || liveBook.cadence || liveBook.statusNote) ||
    workflow.length > 0 ||
    homeCards.length > 0;

  dom.liveBookSection.hidden = !hasContent;
  if (!hasContent) return;

  dom.liveBookTitle.textContent = liveBook.title || "活书计划";
  dom.liveBookSummary.textContent =
    liveBook.summary || "把评论、整理与回写接成循环，让书稿在读者反馈中持续更新。";
  dom.liveBookCadence.textContent =
    liveBook.cadence || "保持定期整理与重点章节优先回写的双轨节奏。";
  dom.liveBookStatus.textContent =
    liveBook.statusNote || "当前正在把读者评论、AI 归并与版本修改继续接通。";

  if (entryItem) {
    dom.liveBookEntryLink.href = `#doc/${encodeURIComponent(entryItem.id)}`;
    dom.liveBookEntryLink.textContent = `查看：${getDisplayTitle(entryItem)}`;
    dom.liveBookEntryLink.hidden = false;
  } else {
    dom.liveBookEntryLink.hidden = true;
  }

  dom.liveBookWorkflow.innerHTML = workflow.length
    ? workflow
      .map((step, index) => `
        <article class="live-book-step">
          <span class="live-book-step-index">${String(index + 1).padStart(2, "0")}</span>
          <p class="eyebrow">Step ${String(index + 1).padStart(2, "0")}</p>
          <h4>${escapeHtml(step.title || `步骤 ${index + 1}`)}</h4>
          <p>${escapeHtml(step.copy || "")}</p>
        </article>
      `)
      .join("")
    : `
      <article class="live-book-step">
        <span class="live-book-step-index">01</span>
        <p class="eyebrow">Step 01</p>
        <h4>活书流程待补</h4>
        <p>先把评论入口稳定下来，再把归并、回写与版本更新继续接进去。</p>
      </article>
    `;

  dom.liveBookHomeCards.innerHTML = homeCards
    .map((card) => `
      <article class="live-book-home-card">
        <p class="eyebrow">${escapeHtml(card.eyebrow || "Value")}</p>
        <h4>${escapeHtml(card.title || "")}</h4>
        <p>${escapeHtml(card.copy || "")}</p>
      </article>
    `)
    .join("");
}

function buildSystemLinks() {
  dom.systemLinks.innerHTML = "";

  PRIMARY_VOLUME_SECTION_IDS
    .map((sectionId) => state.payload.sections.find((section) => section.id === sectionId))
    .filter(Boolean)
    .forEach((section) => {
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

function buildDeckSuitChipMarkup(deck, suitId) {
  const suit = findDeckSuit(deck, suitId);
  if (!suit) {
    return `<span class="deck-meta-chip">未分类</span>`;
  }

  const label = [suit.symbol, suit.label].filter(Boolean).join(" ");
  const accent = suit.accent || "var(--accent)";
  const soft = suit.soft || "rgba(139, 63, 52, 0.12)";

  return `
    <span class="deck-meta-chip deck-meta-chip-suit" style="--deck-accent:${accent}; --deck-soft:${soft};">
      ${escapeHtml(label || suit.label)}
    </span>
  `;
}

function buildDeckLayerChipMarkup(deck, layerId) {
  const layer = findDeckLayer(deck, layerId);
  if (!layer) {
    return `<span class="deck-meta-chip">未分层</span>`;
  }

  const label = [layer.shortLabel, layer.label].filter(Boolean).join(" · ");
  return `<span class="deck-meta-chip">${escapeHtml(label)}</span>`;
}

function buildDeckCardTileMarkup(deck, card, index, activeCardId) {
  return `
    <button
      class="deck-card-tile${card.id === activeCardId ? " is-active" : ""}"
      type="button"
      data-deck-card-id="${escapeHtml(card.id)}"
    >
      <span class="deck-card-tile-index">${formatSerialIndex(index)}</span>
      <span class="deck-card-tile-copy">
        <span class="deck-card-tile-meta">${escapeHtml(buildDeckCardBadgeLabel(deck, card))}</span>
        <strong>${escapeHtml(card.title || "")}</strong>
        <p>${escapeHtml(card.lead || "")}</p>
      </span>
    </button>
  `;
}

function buildDeckSpreadMarkup(deck, spread, index) {
  const spreadCards = (spread.cardIds || [])
    .map((cardId) => findDeckCard(deck, cardId))
    .filter(Boolean);

  return `
    <article class="deck-spread-card">
      <p class="eyebrow">Spread ${formatSerialIndex(index)}</p>
      <h4>${escapeHtml(spread.title || "")}</h4>
      <p>${escapeHtml(spread.description || "")}</p>
      <div class="deck-spread-sequence">
        ${spreadCards
          .map(
            (card) => `
              <button
                class="deck-spread-node"
                type="button"
                data-deck-card-id="${escapeHtml(card.id)}"
              >
                <span>${escapeHtml(findDeckSuit(deck, card.suit)?.symbol || "•")}</span>
                <strong>${escapeHtml(card.title || "")}</strong>
              </button>
            `,
          )
          .join("")}
      </div>
      ${spread.rationale ? `<p class="deck-spread-rationale">${escapeHtml(spread.rationale)}</p>` : ""}
    </article>
  `;
}

function buildDeckGuideMarkup(deck, guide) {
  const spread = findDeckSpread(deck, guide.spreadId);
  const entryCardId = spread?.cardIds?.[0] || deck.entryCardId || deck.cards?.[0]?.id || "";

  return `
    <article class="deck-guide-card">
      <p class="eyebrow">Guide Scenario</p>
      <h4>${escapeHtml(guide.title || "")}</h4>
      <p>${escapeHtml(guide.description || "")}</p>
      ${Array.isArray(guide.steps) && guide.steps.length
        ? `
          <ol class="deck-guide-steps">
            ${guide.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
          </ol>
        `
        : ""}
      <div class="hero-actions deck-guide-actions">
        ${entryCardId
          ? `
            <button
              class="pill-button pill-button-ghost"
              type="button"
              data-deck-card-id="${escapeHtml(entryCardId)}"
            >
              按这条路径看
            </button>
          `
          : ""}
        ${guide.assistantPrompt
          ? `
            <button
              class="reader-button"
              type="button"
              data-deck-guide-ask="${escapeHtml(guide.id)}"
            >
              问 AI 导读
            </button>
          `
          : ""}
      </div>
    </article>
  `;
}

function buildDeckDetailMarkup(deck, activeCard) {
  if (!activeCard) {
    return `
      <article id="deck-card-detail" class="deck-card-detail-card">
        <p class="empty-state">当前牌组还没有可展示的卡片。</p>
      </article>
    `;
  }

  const docHash = getDeckCardDocHash(deck, activeCard);
  const relatedCards = (activeCard.relatedIds || [])
    .map((cardId) => findDeckCard(deck, cardId))
    .filter(Boolean);

  return `
    <article id="deck-card-detail" class="deck-card-detail-card">
      <div class="deck-card-detail-head">
        <div>
          <p class="eyebrow">${escapeHtml(deck.title || "Card Deck")}</p>
          <h3>${escapeHtml(activeCard.title || "")}</h3>
        </div>
        <div class="deck-card-detail-meta">
          ${buildDeckSuitChipMarkup(deck, activeCard.suit)}
          ${buildDeckLayerChipMarkup(deck, activeCard.layer)}
        </div>
      </div>

      <div class="deck-card-detail-body">
        <section class="deck-detail-section">
          <h4>主线</h4>
          <p>${escapeHtml(activeCard.lead || "")}</p>
        </section>
        <section class="deck-detail-section">
          <h4>例子</h4>
          <p>${escapeHtml(activeCard.example || "")}</p>
        </section>
        <section class="deck-detail-section">
          <h4>常见误读</h4>
          <p>${escapeHtml(activeCard.misread || "")}</p>
        </section>
        <section class="deck-detail-section">
          <h4>立即动作</h4>
          <p>${escapeHtml(activeCard.action || "")}</p>
        </section>
      </div>

      ${activeCard.focus ? `<p class="deck-inline-note">对应原文：${escapeHtml(activeCard.focus)}</p>` : ""}

      <div class="hero-actions deck-detail-actions">
        <button
          class="pill-button"
          type="button"
          data-deck-ask-ai="${escapeHtml(activeCard.id)}"
        >
          问 AI
        </button>
        ${docHash ? `<a class="pill-button pill-button-ghost" href="#${docHash}">回原文</a>` : ""}
      </div>

      ${relatedCards.length
        ? `
          <div class="deck-related-row">
            <span class="deck-related-label">连着看</span>
            <div class="deck-related-list">
              ${relatedCards
                .map(
                  (card) => `
                    <button
                      class="deck-related-link"
                      type="button"
                      data-deck-card-id="${escapeHtml(card.id)}"
                    >
                      ${escapeHtml(card.title || "")}
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>
        `
        : ""}
    </article>
  `;
}

function buildDeckViewMarkup(deck, activeCard) {
  const sourceItem = getDeckSourceItem(deck);
  const sourceHash = sourceItem ? buildDocHash(sourceItem.id) : "";
  const activeCardId = activeCard?.id || "";
  const statLabels = [
    `${deck?.stats?.cardCount || deck.cards.length} 张牌`,
    `${deck?.stats?.spreadCount || deck.spreads.length} 种摆法`,
    `${deck?.stats?.guideCount || deck.guideScenarios.length} 个导读场景`,
  ];

  return `
    <div class="hero-card deck-hero-card">
      <p class="eyebrow">${escapeHtml(deck.eyebrow || "Learning Deck")}</p>
      <h2>${escapeHtml(deck.title || "")}</h2>
      <p class="hero-text">${escapeHtml(deck.description || deck.summary || "")}</p>
      ${deck.subtitle ? `<p class="deck-hero-subtitle">${escapeHtml(deck.subtitle)}</p>` : ""}
      <div class="deck-meta-row">
        ${statLabels.map((label) => `<span class="deck-meta-chip">${escapeHtml(label)}</span>`).join("")}
      </div>
      <div class="hero-actions deck-hero-actions">
        <button class="pill-button" type="button" data-deck-ask-root="true">问 AI 导读整副牌</button>
        ${sourceHash ? `<a class="pill-button pill-button-ghost" href="#${sourceHash}">回原章</a>` : ""}
      </div>
    </div>

    <div class="deck-structure-grid">
      <article class="deck-panel-card">
        <p class="eyebrow">Suits</p>
        <h3>四个花色</h3>
        <div class="deck-spectrum-list">
          ${(deck.suits || [])
            .map(
              (suit) => `
                <div class="deck-spectrum-item">
                  ${buildDeckSuitChipMarkup(deck, suit.id)}
                  <p>${escapeHtml(suit.summary || "")}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>

      <article class="deck-panel-card">
        <p class="eyebrow">Layers</p>
        <h3>三层路径</h3>
        <div class="deck-spectrum-list">
          ${(deck.layers || [])
            .map(
              (layer) => `
                <div class="deck-spectrum-item">
                  ${buildDeckLayerChipMarkup(deck, layer.id)}
                  <p>${escapeHtml(layer.summary || "")}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
    </div>

    ${(deck.spreads || []).length
      ? `
        <section class="deck-section-card">
          <div class="section-heading">
            <p class="eyebrow">Spreads</p>
            <h3>先按摆法进入</h3>
            <p class="section-copy">一副牌不只是一张张看，也可以按情境排成一条学习路径。</p>
          </div>
          <div class="deck-spread-grid">
            ${(deck.spreads || []).map((spread, index) => buildDeckSpreadMarkup(deck, spread, index)).join("")}
          </div>
        </section>
      `
      : ""}

    ${(deck.guideScenarios || []).length
      ? `
        <section class="deck-section-card">
          <div class="section-heading">
            <p class="eyebrow">Guide</p>
            <h3>三种进入场景</h3>
            <p class="section-copy">先按真实情境进牌，再决定回原文、继续摆牌还是直接问 AI。</p>
          </div>
          <div class="deck-guide-grid">
            ${(deck.guideScenarios || []).map((guide) => buildDeckGuideMarkup(deck, guide)).join("")}
          </div>
        </section>
      `
      : ""}

    <section class="deck-section-card deck-browser-section">
      <div class="section-heading">
        <p class="eyebrow">Card Browser</p>
        <h3>选一张牌，立刻用起来</h3>
        <p class="section-copy">左边翻牌，右边看这张牌的主线、误读和立即动作。</p>
      </div>
      <div class="deck-browser-grid">
        <div class="deck-card-grid">
          ${(deck.cards || []).map((card, index) => buildDeckCardTileMarkup(deck, card, index, activeCardId)).join("")}
        </div>
        ${buildDeckDetailMarkup(deck, activeCard)}
      </div>
    </section>
  `;
}

function bindDeckViewEvents(deck) {
  if (!dom.deckContent) return;

  dom.deckContent
    .querySelectorAll("[data-deck-card-id]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        openDeckCard(deck, button.dataset.deckCardId);
      });
    });

  dom.deckContent
    .querySelector('[data-deck-ask-root="true"]')
    ?.addEventListener("click", () => {
      askAssistant(deck.assistantPrompt || `请带我进入《${deck.title || "当前牌组"}》这副牌。`).catch(console.error);
    });

  dom.deckContent
    .querySelectorAll("[data-deck-ask-ai]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const card = findDeckCard(deck, button.dataset.deckAskAi);
        if (!card) return;
        askAssistant(buildDeckCardAssistantQuestion(deck, card)).catch(console.error);
      });
    });

  dom.deckContent
    .querySelectorAll("[data-deck-guide-ask]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const guide = findDeckGuideScenario(deck, button.dataset.deckGuideAsk);
        if (!guide) return;
        askAssistant(
          guide.assistantPrompt
            || deck.assistantPrompt
            || `请带我进入《${deck.title || "当前牌组"}》这副牌。`,
        ).catch(console.error);
      });
    });
}

function getItemSearchText(item) {
  if (!item) return "";

  if (state.searchTextCache.has(item.id)) {
    return state.searchTextCache.get(item.id);
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = item.html || "";
  const text = (wrapper.textContent || "")
    .replace(/\s+/g, " ")
    .trim();

  state.searchTextCache.set(item.id, text);
  return text;
}

function buildSearchSnippet(text, keyword, radius = 24) {
  if (!text || !keyword) return "";

  const normalizedText = text.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase();
  const index = normalizedText.indexOf(normalizedKeyword);

  if (index === -1) return "";

  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + keyword.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";

  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

function getSearchMatch(item, keyword) {
  if (!keyword) {
    return {
      matches: true,
      score: 0,
      directoryHit: false,
      titleHit: false,
      bodyHit: false,
      snippet: "",
    };
  }

  const normalizedKeyword = keyword.toLowerCase();
  const displayTitle = getDisplayTitle(item);
  const headingText = (item.headings || []).map((heading) => heading.label).join(" ");
  const bodyText = getItemSearchText(item);

  const titleFields = [displayTitle, item.title].filter(Boolean);
  const directoryFields = [item.sectionTitle, item.excerpt, headingText].filter(Boolean);

  const titleHit = titleFields.some((value) => value.toLowerCase().includes(normalizedKeyword));
  const directoryHit = titleHit || directoryFields.some((value) => value.toLowerCase().includes(normalizedKeyword));
  const bodyHit = bodyText.toLowerCase().includes(normalizedKeyword);

  if (!directoryHit && !bodyHit) {
    return {
      matches: false,
      score: -1,
      directoryHit: false,
      titleHit: false,
      bodyHit: false,
      snippet: "",
    };
  }

  const exactTitleHit = titleFields.some((value) => value.trim().toLowerCase() === normalizedKeyword);
  const prefixTitleHit = titleFields.some((value) => value.toLowerCase().startsWith(normalizedKeyword));
  const snippet = bodyHit ? buildSearchSnippet(bodyText, keyword) : "";

  let score = 0;
  if (bodyHit) score = 100;
  if (directoryHit) score = 240;
  if (titleHit) score = 340;
  if (prefixTitleHit) score += 20;
  if (exactTitleHit) score += 40;

  return {
    matches: true,
    score,
    directoryHit,
    titleHit,
    bodyHit,
    snippet,
  };
}

function buildNav() {
  const keyword = dom.searchInput.value.trim();
  const searchMatches = new Map();

  state.filteredItems = state.payload.items.filter((item) => {
    const match = getSearchMatch(item, keyword);
    if (!match.matches) return false;
    searchMatches.set(item.id, match);
    return true;
  });

  dom.navSections.innerHTML = "";

  const orderedSections = getOrderedSections()
    .map((section, sectionIndex) => {
      const sectionItems = getSectionItems(section.id)
        .map((item, itemIndex) => ({
          item,
          itemIndex,
          match: searchMatches.get(item.id),
        }))
        .filter((entry) => entry.match);

      if (!sectionItems.length) return null;

      if (keyword) {
        sectionItems.sort((left, right) =>
          right.match.score - left.match.score ||
          left.itemIndex - right.itemIndex,
        );
      }

      return {
        section,
        sectionIndex,
        bestScore: sectionItems[0]?.match.score || 0,
        sectionItems,
      };
    })
    .filter(Boolean);

  if (keyword) {
    orderedSections.sort((left, right) =>
      right.bestScore - left.bestScore ||
      left.sectionIndex - right.sectionIndex,
    );
  }

  orderedSections.forEach(({ section, sectionItems }) => {

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

    sectionItems.forEach(({ item, match }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nav-item";
      button.title = getDisplayTitle(item);
      if (item.id === state.activeId) {
        button.classList.add("is-active");
      }

      const titleText = document.createElement("strong");
      titleText.textContent = getDisplayTitle(item);
      button.appendChild(titleText);

      if (keyword && match?.bodyHit && match.snippet) {
        const hint = document.createElement("small");
        hint.className = "nav-item-hint";
        hint.textContent = match.directoryHit
          ? `正文也命中：${match.snippet}`
          : `正文命中：${match.snippet}`;
        button.appendChild(hint);
      }

      button.addEventListener("click", () => {
        const focusParams = keyword ? { focus: keyword } : null;
        const nextHash = buildDocHash(item.id, focusParams);
        closeNavigationPanels();
        if (window.location.hash === `#${nextHash}`) {
          renderDoc(item.id, focusParams).catch(console.error);
          return;
        }
        setHashForDoc(item.id, focusParams);
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
  dom.graphButton?.classList.toggle("is-active", Boolean(state.activeGraphNodeId));
  dom.labButton?.classList.toggle("is-active", Boolean(state.activeLabPage));

  const activeTab = state.assistantOpen ? "ai" : state.activePrimaryView;
  dom.tabHomeButton?.classList.toggle("is-active", activeTab === "home");
  dom.tabLabButton?.classList.toggle("is-active", activeTab === "lab");
  dom.tabGraphButton?.classList.toggle("is-active", activeTab === "graph");
  dom.tabAiButton?.classList.toggle("is-active", activeTab === "ai");
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

        if (control.tagName === "SELECT") {
          return [id, control.value];
        }

        if (control.tagName === "TEXTAREA" || control.type === "text") {
          const fallback = LAB_CONTROL_DEFAULTS[state.activeLabPage]?.[id] ?? "";
          return [id, sanitizeLabTextValue(id, control.value, fallback)];
        }

        return [
          id,
          sanitizeRangeParamValue(control.value, 0),
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

function buildPromptFullText(values) {
  const scene = LAB_PROMPT_SCENE_MAP[values["prompt-scene"]] || LAB_PROMPT_SCENE_MAP["study-plan"];
  const output = LAB_PROMPT_OUTPUT_MAP[values["prompt-output"]] || LAB_PROMPT_OUTPUT_MAP["plan-table"];
  const deliverables = scene.deliverables.map((item, index) => `${index + 1}. ${item}`).join("\n");

  return [
    "你现在是我的“差结构学习法”协作教练。",
    "请把这套方法当作学习与分析方法，而不是终极存在论、万能解释词或空泛哲学口号。",
    "",
    `当前任务场景：${scene.label}`,
    `任务对象：${values["prompt-object"]}`,
    `我的当前水平 / 现状：${values["prompt-level"]}`,
    `我的目标：${values["prompt-goal"]}`,
    `我的时间与资源约束：${values["prompt-time"]}`,
    `期望输出形态：${output.label}（${output.description}）`,
    `额外关注：${values["prompt-focus"]}`,
    "",
    "请严格按下面的顺序工作：",
    "1. 先识别关键差异：找出这个主题最值得先分清的 3-6 组不同、落差、对比，区分哪些是真差异，哪些只是噪声。",
    "2. 再收边界：说明这些差异分别对应哪些概念边界、适用条件、易混条件和禁止混用点。",
    "3. 再看流向与反馈：如果从我当前状态推进到目标状态，输入、练习、验证、复盘应该怎样流动？哪里最容易断流？",
    "4. 再压结构：把内容整理成清晰的学习/行动结构，不要只给大词、口号或鸡汤。",
    "5. 最后做验证：给出每一步的自测动作、纠错动作、停止条件和下一层入口。",
    "",
    `这个场景的额外要求：${scene.instruction}`,
    "你至少要交付这些内容：",
    deliverables,
    "",
    `输出偏好补充：${output.instruction}`,
    "",
    "通用要求：",
    "- 先给总览，再给分阶段动作。",
    "- 把重要概念或任务主线拉通，不要只堆定义。",
    "- 标出 3 个最关键的易错差异或判断陷阱。",
    "- 每一阶段都给一个可执行的验证动作。",
    "- 如果信息不足，请先问我 3-5 个关键补充问题，再基于已有信息给出暂定版本。",
    "- 不要空泛鼓励，不要假装我已经具备不存在的条件。",
  ].join("\n");
}

function buildPromptLiteText(values) {
  const scene = LAB_PROMPT_SCENE_MAP[values["prompt-scene"]] || LAB_PROMPT_SCENE_MAP["study-plan"];
  const output = LAB_PROMPT_OUTPUT_MAP[values["prompt-output"]] || LAB_PROMPT_OUTPUT_MAP["plan-table"];

  return [
    `请把“差结构学习法”当作一种学习与分析方法，而不是终极解释。`,
    `围绕“${values["prompt-object"]}”这个主题，在“${scene.label}”场景下帮助我。`,
    `我的现状：${values["prompt-level"]}`,
    `我的目标：${values["prompt-goal"]}`,
    `我的时间约束：${values["prompt-time"]}`,
    `请先找关键差异，再收边界，再看反馈与断流点，最后压成${output.label}。`,
    `额外要求：${values["prompt-focus"]}`,
    "输出时请给总览、阶段动作、3 个最关键的易错点，以及每一阶段的验证动作。",
  ].join("\n");
}

function getAssistantConfig() {
  return state.payload?.site?.assistant || {};
}

function getAssistantSetupItem() {
  const assistant = getAssistantConfig();
  if (!assistant.setupSourcePath) return null;
  return findItemBySourcePath(assistant.setupSourcePath);
}

function getAssistantSetupHref() {
  const item = getAssistantSetupItem();
  return item ? `#doc/${encodeURIComponent(item.id)}` : "";
}

function getAssistantContextLimit() {
  return clamp(Number(getAssistantConfig().contextDocs) || 4, 1, 6);
}

function getAssistantSnippetLength() {
  return clamp(Number(getAssistantConfig().snippetLength) || 260, 120, 480);
}

function getAssistantHistoryLimit() {
  return clamp(Number(getAssistantConfig().maxTurns) || 6, 2, 10);
}

function getAssistantSuggestions() {
  const suggestions = getAssistantConfig().suggestions;
  return Array.isArray(suggestions)
    ? suggestions.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 6)
    : [];
}

function normalizeAssistantText(value, maxLength = 240) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function extractAssistantKeywords(question) {
  const rawSegments = String(question ?? "")
    .toLowerCase()
    .match(/[\u4e00-\u9fff]+|[a-z0-9][a-z0-9-]+/gi) || [];
  const keywords = [];
  const seen = new Set();
  const pushKeyword = (value) => {
    const normalized = String(value || "").trim();
    if (!normalized) return;
    const minLength = /^[\u4e00-\u9fff]+$/.test(normalized) ? 2 : 3;
    if (normalized.length < minLength || seen.has(normalized)) return;
    seen.add(normalized);
    keywords.push(normalized);
  };

  for (const segment of rawSegments) {
    if (keywords.length >= 12) break;
    const normalized = segment.trim();
    if (!normalized) continue;

    if (/^[\u4e00-\u9fff]+$/.test(normalized)) {
      if (normalized.length <= 4) {
        pushKeyword(normalized);
        continue;
      }

      pushKeyword(normalized.slice(0, 4));
      pushKeyword(normalized.slice(-4));

      for (let size = 4; size >= 2; size -= 1) {
        const step = size > 2 ? size - 1 : 1;
        for (let index = 0; index <= normalized.length - size; index += step) {
          pushKeyword(normalized.slice(index, index + size));
          if (keywords.length >= 12) break;
        }
        if (keywords.length >= 12) break;
      }
      continue;
    }

    pushKeyword(normalized);
  }

  return keywords.slice(0, 12);
}

function buildAssistantSnippet(text, keywords, maxLength = getAssistantSnippetLength()) {
  const normalizedText = normalizeAssistantText(text, 4000);
  if (!normalizedText) return "";

  const lowered = normalizedText.toLowerCase();
  const hit = [...keywords]
    .sort((left, right) => right.length - left.length)
    .find((keyword) => lowered.includes(keyword.toLowerCase()));

  if (!hit) {
    return normalizedText.length > maxLength
      ? `${normalizedText.slice(0, maxLength).trim()}…`
      : normalizedText;
  }

  const index = lowered.indexOf(hit.toLowerCase());
  const radius = Math.max(48, Math.floor((maxLength - hit.length) / 2));
  const start = Math.max(0, index - radius);
  const end = Math.min(normalizedText.length, index + hit.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < normalizedText.length ? "…" : "";
  return `${prefix}${normalizedText.slice(start, end).trim()}${suffix}`;
}

function scoreAssistantItem(item, keywords) {
  if (!item || !keywords.length) return 0;

  const titleText = `${getDisplayTitle(item)} ${item.title || ""}`.toLowerCase();
  const headingText = (item.headings || []).map((heading) => heading.label).join(" ").toLowerCase();
  const metaText = `${item.sectionTitle || ""} ${item.excerpt || ""} ${headingText}`.toLowerCase();
  const bodyText = getItemSearchText(item).toLowerCase();
  let score = 0;

  keywords.forEach((keyword, index) => {
    const weight = Math.min(keyword.length, 8);
    if (titleText.includes(keyword)) score += 120 + weight * 8;
    if (metaText.includes(keyword)) score += 52 + weight * 4;
    if (bodyText.includes(keyword)) score += 20 + weight * 2;
    if (index === 0 && bodyText.includes(keyword)) score += 10;
  });

  if (item.sectionId === "plain-book") score += 14;
  if (item.sectionId === "book") score += 10;
  if (item.sectionId === "overview") score += 6;

  return score;
}

function buildAssistantContextEntry(item, keywords = [], excerptOverride = "") {
  const bodyText = getItemSearchText(item);
  return {
    id: item.id,
    title: getDisplayTitle(item),
    sectionTitle: item.sectionTitle,
    excerpt: excerptOverride || item.excerpt || buildAssistantSnippet(bodyText, keywords, getAssistantSnippetLength()),
    url: `#doc/${encodeURIComponent(item.id)}`,
    sourcePath: item.sourcePath,
  };
}

function collectAssistantItems(candidates) {
  const seen = new Set();
  const items = [];
  candidates.flat().forEach((item) => {
    if (!item?.id || seen.has(item.id)) return;
    seen.add(item.id);
    items.push(item);
  });
  return items;
}

function getAssistantRouteContext() {
  if (state.activeId) {
    const item = findItemById(state.activeId);
    const sequence = getReadingSequence();
    const currentIndex = sequence.findIndex((entry) => entry.id === item?.id);
    const prev = currentIndex > 0 ? sequence[currentIndex - 1] : null;
    const next = currentIndex >= 0 ? sequence[currentIndex + 1] : null;
    const alternate = getAlternateVersionItem(item);
    const title = getDisplayTitle(item);

    return {
      badge: item?.sectionTitle || "章节",
      title: title || "当前章节",
      copy:
        item?.excerpt
        || buildAssistantSnippet(getItemSearchText(item), [], 180)
        || "可以直接追问这一章的主线、误区和下一步阅读入口。",
      chips: collectAssistantItems([item, alternate, prev, next]).map((entry) => getDisplayTitle(entry)).slice(0, 3),
      actions: [
        `这一章真正的主线是什么？`,
        `从《${title}》继续往下该读哪里？`,
        `这章最容易误解的地方是什么？`,
        `和这一章最相关的图谱节点有哪些？`,
      ],
      items: collectAssistantItems([item, alternate, prev, next]),
      launcherLabel: title || "当前章节",
    };
  }

  if (state.activeGraphNodeId) {
    const node = findGraphNodeById(state.activeGraphNodeId);
    const chapterItems = getGraphNodeItems(node, { limit: getAssistantContextLimit() });
    const relatedItems = getGraphCandidateNodes(node)
      .slice(0, 3)
      .flatMap((entry) => getGraphNodeItems(entry, { limit: 2 }));

    return {
      badge: getGraphStatusLabel(node?.status),
      title: node?.label || "当前图谱节点",
      copy:
        node?.description
        || `这个节点目前${getGraphNodeCountLabel(node)}，适合直接追问它该从哪些章节进入。`,
      chips: [
        getGraphKindLabel(node?.kind),
        node?.familyLabel,
        getGraphNodeCountLabel(node),
      ].filter(Boolean),
      actions: [
        `节点“${node?.label || "当前节点"}”第一次该从哪里进入？`,
        `“${node?.label || "当前节点"}”和相邻节点差别是什么？`,
        `哪些章节已经谈到了“${node?.label || "当前节点"}”？`,
        `顺着“${node?.label || "当前节点"}”继续往下读`,
      ],
      items: collectAssistantItems([chapterItems, relatedItems]),
      launcherLabel: node?.label || "图谱节点",
    };
  }

  if (state.activeDeckId) {
    const deck = findCardDeckById(state.activeDeckId);
    const card = getDeckEntryCard(deck, state.activeDeckCardId);
    const relatedCards = (card?.relatedIds || [])
      .map((cardId) => findDeckCard(deck, cardId))
      .filter(Boolean);

    return {
      badge: buildDeckCardBadgeLabel(deck, card),
      title: card?.title || deck?.title || "当前牌组",
      copy:
        card?.lead
        || deck?.summary
        || "可以直接围绕当前卡片追问主线、误读和下一步，再跳回原文继续压结构。",
      chips: [
        deck?.title,
        findDeckSuit(deck, card?.suit)?.label,
        findDeckLayer(deck, card?.layer)?.label,
      ].filter(Boolean),
      actions: [
        `把“${card?.title || "这张牌"}”翻成一个今天能执行的动作`,
        `“${card?.title || "这张牌"}”最容易被误解成什么？`,
        relatedCards[0]
          ? `我该把“${card?.title || "这张牌"}”和“${relatedCards[0].title}”连起来怎么用？`
          : "这张牌下一张最该接哪张？",
        "回到原文时，我最该补哪一个边界或条件？",
      ],
      items: collectAssistantItems([
        getDeckCardSourceItem(deck, card),
        getDeckSourceItem(deck),
        getSectionEntry("extension-book"),
        getSectionEntry("plain-book"),
        getSectionEntry("ai-book"),
      ]),
      launcherLabel: card?.title || deck?.title || "当前牌组",
    };
  }

  if (state.activeLabPage) {
    const page = LAB_PAGES[state.activeLabPage] || LAB_PAGES.learn;
    const isPromptPage = state.activeLabPage === "prompt";

    return {
      badge: "实验台",
      title: page.title,
      copy: page.intro || "这里更适合把问题压紧，再回到正文或图谱继续阅读。",
      chips: [page.title, isPromptPage ? "提示词" : "实验页", "可跳回正文"],
      actions: isPromptPage
        ? [
          "把我现在的问题压成一句更好追问的话",
          "我应该怎么问，才能让它带回章节入口？",
          "先给我一条最短阅读线",
          "适合从哪一卷开始追问？",
        ]
        : [
          "这一页最该配合哪几章一起看？",
          "从实验页回到正文，该读哪里？",
          "把这一页的主线翻成白话",
          "它在整站里对应哪些章节？",
        ],
      items: collectAssistantItems([
        getAssistantSetupItem(),
        getSectionEntry("plain-book"),
        getSectionEntry("overview"),
        getSectionEntry("ai-book"),
      ]),
      launcherLabel: page.title,
    };
  }

  const startItem = getPrimaryStartItem();
  return {
    badge: "首页",
    title: "分卷书架",
    copy: "适合先问第一次从哪里读起，或让它给你一条最短的进入路径。",
    chips: ["白话卷", "知识图谱", "轻内容", "评论回填"],
    actions: [
      "第一次来先从哪里读？",
      "给我一条最短阅读线",
      "先看白话卷还是知识图谱？",
      "哪些节点最适合先进入？",
    ],
    items: collectAssistantItems([
      startItem,
      getSectionEntry("plain-book"),
      getSectionEntry("overview"),
      getSectionEntry("light-series"),
      getSectionEntry("ai-book"),
    ]),
    launcherLabel: "当前页面",
  };
}

function buildAssistantFallbackContext() {
  const contextItems = getAssistantRouteContext().items;
  const fallbackItems = contextItems.length
    ? contextItems
    : collectAssistantItems([
      getSectionEntry("plain-book"),
      getSectionEntry("overview"),
      getSectionEntry("ai-book"),
    ]);

  return fallbackItems
    .slice(0, getAssistantContextLimit())
    .map((item) => buildAssistantContextEntry(item));
}

function buildAssistantContext(question) {
  const keywords = extractAssistantKeywords(question);
  const limit = getAssistantContextLimit();
  const prioritizedItems = getAssistantRouteContext().items;
  const prioritizedIds = new Set(prioritizedItems.map((item) => item.id));

  const matches = state.payload.items
    .map((item) => {
      let score = scoreAssistantItem(item, keywords);
      if (prioritizedIds.has(item.id)) {
        score += keywords.length ? 360 : 3200;
      }
      if (score <= 0 && prioritizedIds.has(item.id)) {
        score = 2400;
      }
      if (score <= 0) return null;
      const bodyText = getItemSearchText(item);
      return {
        item,
        score,
        excerpt: buildAssistantSnippet(bodyText, keywords, getAssistantSnippetLength()),
      };
    })
    .filter(Boolean)
    .sort((left, right) => (
      right.score - left.score
      || left.item.order - right.item.order
      || left.item.title.localeCompare(right.item.title, "zh-CN")
    ))
    .slice(0, limit)
    .map(({ item, excerpt }) => buildAssistantContextEntry(item, keywords, excerpt));

  if (matches.length) return matches;

  const prioritizedEntries = prioritizedItems
    .slice(0, limit)
    .map((item) => buildAssistantContextEntry(item, keywords));
  return prioritizedEntries.length ? prioritizedEntries : buildAssistantFallbackContext();
}

function getAssistantConversationHistory() {
  return state.assistantMessages
    .filter((entry) => entry && (entry.role === "user" || entry.role === "assistant"))
    .slice(-getAssistantHistoryLimit() * 2)
    .map((entry) => ({
      role: entry.role,
      content: normalizeAssistantText(entry.content, entry.role === "user" ? 600 : 1800),
    }))
    .filter((entry) => entry.content);
}

function buildAssistantMessageMarkup(message) {
  const isAssistant = message.role === "assistant";
  const roleLabel = isAssistant ? "导读助手" : "你";
  const roleMeta = isAssistant
    ? message.pending ? "正在整理章节…" : "站内导读"
    : "当前问题";
  const content = message.content || (message.pending ? "正在读取相关章节…" : "这一轮暂时没有可显示内容。");
  const sources = isAssistant && Array.isArray(message.sources) ? message.sources : [];

  return `
    <article
      class="assistant-message is-${message.role}${message.pending ? " is-pending" : ""}"
      data-assistant-message-id="${escapeHtml(message.id)}"
    >
      <div class="assistant-message-head">
        <span class="assistant-message-role">${escapeHtml(roleLabel)}</span>
        <span class="assistant-message-meta">${escapeHtml(roleMeta)}</span>
      </div>
      <div class="assistant-message-body">${escapeHtml(content)}</div>
      ${sources.length ? `
        <div class="assistant-source-grid">
          ${sources.map((source) => `
            <a class="assistant-source-card" href="${escapeHtml(source.url)}">
              <small>${escapeHtml(source.sectionTitle || "站内章节")}</small>
              <strong>${escapeHtml(source.title || "未命名章节")}</strong>
              <p>${escapeHtml(source.excerpt || "点击跳到相关章节继续阅读。")}</p>
            </a>
          `).join("")}
        </div>
      ` : ""}
    </article>
  `;
}

function renderAssistantConversation() {
  const container = dom.assistantConversation;
  if (!container) return;

  const assistant = getAssistantConfig();
  const messages = state.assistantMessages.length
    ? state.assistantMessages
    : [
      {
        id: "assistant-welcome",
        role: "assistant",
        content: assistant.greeting || "先问我一个概念该从哪里进入，我会把相关章节和阅读线一起带回来。",
        sources: buildAssistantFallbackContext().slice(0, 2),
      },
    ];

  container.innerHTML = messages.map((message) => buildAssistantMessageMarkup(message)).join("");
  container.scrollTop = container.scrollHeight;
}

function renderAssistantStatus() {
  const status = dom.assistantStatus;
  if (!status) return;

  status.textContent = state.assistantStatus.message || "";
  if (state.assistantStatus.message) {
    status.dataset.tone = state.assistantStatus.tone || "info";
  } else {
    delete status.dataset.tone;
  }
}

function setAssistantStatus(message, tone = "info") {
  state.assistantStatus = {
    message: message || "",
    tone,
  };
  renderAssistantStatus();
}

function getAssistantQuickActionItems() {
  const merged = [...getAssistantRouteContext().actions, ...getAssistantSuggestions()];
  const seen = new Set();
  return merged.filter((item) => {
    const normalized = String(item || "").trim();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  }).slice(0, 4);
}

function renderAssistantShell() {
  const assistant = getAssistantConfig();
  const routeContext = getAssistantRouteContext();

  if (dom.assistantPanelTitle) {
    dom.assistantPanelTitle.textContent = assistant.label || "站内导读助手";
  }
  if (dom.assistantPanelDescription) {
    dom.assistantPanelDescription.textContent =
      assistant.description || "优先结合当前页面和站内章节，给出更像对话而不是检索结果的阅读引导。";
  }
  if (dom.assistantLauncherContext) {
    dom.assistantLauncherContext.textContent = routeContext.launcherLabel || "可直接追问当前页面";
  }
  if (dom.assistantContextTitle) {
    dom.assistantContextTitle.textContent = routeContext.title || "当前页面";
  }
  if (dom.assistantContextBadge) {
    dom.assistantContextBadge.textContent = routeContext.badge || "当前页";
  }
  if (dom.assistantContextCopy) {
    dom.assistantContextCopy.textContent = routeContext.copy || "";
  }
  if (dom.assistantContextChips) {
    dom.assistantContextChips.innerHTML = routeContext.chips
      .map((item) => `<span class="graph-chip">${escapeHtml(item)}</span>`)
      .join("");
  }
  if (dom.assistantQuickActions) {
    dom.assistantQuickActions.innerHTML = getAssistantQuickActionItems()
      .map((item) => (
        `<button class="assistant-quick-action" type="button" data-assistant-suggestion="${escapeHtml(item)}">${escapeHtml(item)}</button>`
      ))
      .join("");
  }
  if (dom.assistantQuestion) {
    dom.assistantQuestion.placeholder = assistant.placeholder || "例如：这一页真正的主线是什么？";
  }

  renderAssistantConversation();
  renderAssistantStatus();
  syncAssistantComposerState();
}

function syncAssistantComposerState() {
  const submitButton = dom.assistantSubmitButton;
  const stopButton = dom.assistantStopButton;
  const clearButton = dom.assistantClearButton;
  const textarea = dom.assistantQuestion;

  if (submitButton) submitButton.disabled = state.assistantPending;
  if (stopButton) stopButton.hidden = !state.assistantPending;
  if (clearButton) clearButton.disabled = state.assistantPending || !state.assistantMessages.length;
  if (textarea) textarea.disabled = false;
}

function updateAssistantMessageContent(messageId, content, { pending = false } = {}) {
  const message = state.assistantMessages.find((entry) => entry.id === messageId);
  if (!message) return;

  message.content = content;
  message.pending = pending;

  const container = dom.assistantConversation;
  const item = container?.querySelector(`[data-assistant-message-id="${messageId}"]`);
  if (!item) {
    renderAssistantConversation();
    return;
  }

  item.classList.toggle("is-pending", Boolean(pending));
  const meta = item.querySelector(".assistant-message-meta");
  if (meta && message.role === "assistant") {
    meta.textContent = pending ? "正在整理章节…" : "站内导读";
  }

  const body = item.querySelector(".assistant-message-body");
  if (body) {
    body.textContent = content || (pending ? "正在读取相关章节…" : "这一轮暂时没有可显示内容。");
  }

  container.scrollTop = container.scrollHeight;
}

function extractAssistantResponseText(payload) {
  if (!payload) return "";
  if (typeof payload === "string") return payload;
  if (typeof payload.response === "string") return payload.response;
  if (typeof payload.output_text === "string") return payload.output_text;
  if (typeof payload.result?.response === "string") return payload.result.response;

  if (Array.isArray(payload.output)) {
    return payload.output
      .map((entry) => (
        typeof entry === "string"
          ? entry
          : entry?.content?.map((part) => part.text || "").join("")
      ))
      .filter(Boolean)
      .join("");
  }

  const choice = payload.choices?.[0];
  if (choice?.delta?.content) {
    return Array.isArray(choice.delta.content)
      ? choice.delta.content.map((part) => part.text || "").join("")
      : String(choice.delta.content);
  }
  if (choice?.message?.content) {
    return Array.isArray(choice.message.content)
      ? choice.message.content.map((part) => part.text || "").join("")
      : String(choice.message.content);
  }
  if (typeof choice?.text === "string") return choice.text;

  return "";
}

async function readAssistantResponse(response, onDelta) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = await response.json();
    const text = extractAssistantResponseText(payload);
    if (text) onDelta(text);
    return;
  }

  if (contentType.includes("text/event-stream") && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    const flush = (chunk) => {
      chunk
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith("data:"))
        .forEach((line) => {
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") return;
          try {
            const parsed = JSON.parse(payload);
            const text = extractAssistantResponseText(parsed);
            if (text) onDelta(text);
          } catch {
            onDelta(payload);
          }
        });
    };

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const blocks = buffer.split("\n\n");
      buffer = blocks.pop() || "";
      blocks.forEach((block) => flush(block));
    }

    buffer += decoder.decode();
    if (buffer.trim()) flush(buffer);
    return;
  }

  const text = await response.text();
  if (text) onDelta(text);
}

function buildAssistantPanelMarkup() {
  const assistant = getAssistantConfig();
  const hasEndpoint = Boolean(String(assistant.endpoint || "").trim());
  const setupHref = getAssistantSetupHref();
  const suggestions = getAssistantSuggestions();

  return `
    <section class="lab-grid lab-grid-two">
      <article class="lab-card lab-card-strong assistant-chat-card">
        <div class="assistant-panel-head">
          <div>
            <p class="eyebrow">Live Guide</p>
            <h3>${escapeHtml(assistant.label || "站内导读助手")}</h3>
            <p class="lab-section-copy">
              ${escapeHtml(assistant.description || "先在站内筛出相关章节，再用较白话的方式给出最短可走通的阅读线。")}
            </p>
          </div>
          <div class="assistant-chip-row">
            <span class="graph-chip is-lit">Cloudflare Workers AI</span>
            <span class="graph-chip">${getAssistantContextLimit()} 篇站内章节</span>
            <span class="graph-chip ${hasEndpoint ? "is-lit" : "is-candidate"}">${hasEndpoint ? "已接入 Worker" : "待填 Worker"}</span>
          </div>
        </div>

        <div id="assistant-conversation" class="assistant-conversation"></div>

        <label class="lab-textarea assistant-composer">
          <span>直接提问</span>
          <textarea
            id="assistant-question"
            rows="4"
            maxlength="360"
            placeholder="${escapeHtml(assistant.placeholder || "例如：第一次该从哪一章进入？")}"
          ></textarea>
        </label>

        <div class="lab-inline-actions assistant-actions">
          <button id="assistant-submit-button" class="reader-button" type="button">开始追问</button>
          <button id="assistant-stop-button" class="reader-button" type="button" hidden>停止回答</button>
          <button id="assistant-clear-button" class="reader-button" type="button">清空对话</button>
        </div>

        <p id="assistant-status" class="lab-action-status assistant-status" aria-live="polite"></p>
      </article>

      <article class="lab-card assistant-guide-card">
        <p class="eyebrow">Route Note</p>
        <h3>怎样问，最容易让它把你带回章节</h3>
        <div class="lab-mini-points assistant-mini-points">
          <span>最好直接问概念、阅读顺序、章节落点或“从哪里进入”，不要一开始就让它泛泛谈哲学。</span>
          <span>它现在优先从站内章节筛材料，不是外网搜索器，所以更适合做导读，不适合代替百科。</span>
          <span>如果回答没有指出章节、边界或下一步入口，就继续追问，不要直接把它当结论。</span>
        </div>

        ${suggestions.length ? `
          <div class="assistant-suggestion-shell">
            <p class="assistant-section-label">可以直接这样问</p>
            <div class="assistant-suggestion-grid">
              ${suggestions.map((item) => `
                <button class="lab-preset-button assistant-suggestion" type="button" data-assistant-suggestion="${escapeHtml(item)}">
                  <strong>${escapeHtml(item)}</strong>
                  <span>一键把问题送进导读助手</span>
                </button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        ${hasEndpoint ? `
          <div class="assistant-setup-note">
            <strong>当前已接入实时问答。</strong>
            <p>如果后面要换模型、调额度或加来源限制，优先改 Worker，而不是把密钥塞回前端。</p>
          </div>
        ` : `
          <div class="assistant-setup-note is-pending">
            <strong>${escapeHtml(assistant.emptyMessage || "当前还没有接入 Worker。")}</strong>
            <p>前端入口已经预留好了，下一步只要部署 Cloudflare Worker 并把地址回填到站点配置即可。</p>
            ${setupHref ? `<a class="pill-button pill-button-ghost" href="${setupHref}">查看接入说明</a>` : ""}
          </div>
        `}
      </article>
    </section>
  `;
}

function buildAssistantPromptEntryMarkup() {
  const assistant = getAssistantConfig();
  const hasEndpoint = Boolean(String(assistant.endpoint || "").trim());

  return `
    <section class="lab-grid lab-grid-two">
      <article class="lab-card lab-card-strong assistant-prompt-entry-card">
        <p class="eyebrow">Live Guide</p>
        <h3>实时导读已经改成全站悬浮窗</h3>
        <p class="lab-section-copy">
          问答不再塞在这个实验页里。现在你在任意章节、图谱节点、首页或实验页，都可以直接打开右下角导读窗继续追问。
        </p>
        <div class="assistant-chip-row">
          <span class="graph-chip is-lit">全站可用</span>
          <span class="graph-chip">自动带当前页上下文</span>
          <span class="graph-chip ${hasEndpoint ? "is-lit" : "is-candidate"}">${hasEndpoint ? "已接入 Worker" : "待填 Worker"}</span>
        </div>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-open-assistant="true">打开实时导读</button>
          <a class="reader-button" href="#graph/core-02">先从图谱节点试问</a>
        </div>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Use It</p>
        <h3>${escapeHtml(assistant.label || "站内导读助手")}</h3>
        <div class="lab-mini-points">
          <span>先在当前页里追问主线、入口、误区和下一步，而不是让它泛泛讲理论。</span>
          <span>回答里出现章节卡片后，直接点进去读，再回来继续追问，才有连续感。</span>
          <span>提示词页现在更适合先压缩问题，再交给右侧导读窗完成真正的站内导航。</span>
        </div>
      </article>
    </section>
  `;
}

function pruneAssistantConversation() {
  const maxMessages = getAssistantHistoryLimit() * 2;
  if (state.assistantMessages.length > maxMessages) {
    state.assistantMessages = state.assistantMessages.slice(-maxMessages);
  }
}

function resetAssistantConversation() {
  state.assistantMessages = [];
  setAssistantStatus("已清空当前对话。", "info");
  renderAssistantConversation();
  syncAssistantComposerState();
}

async function askAssistant(question) {
  const assistant = getAssistantConfig();
  const endpoint = String(assistant.endpoint || "").trim();
  if (!endpoint) {
    setAssistantOpen(true, { focusInput: true });
    setAssistantStatus(assistant.emptyMessage || "当前还没有接入 Worker。", "warning");
    return;
  }

  const normalizedQuestion = normalizeAssistantText(question, 360);
  if (!normalizedQuestion) {
    setAssistantOpen(true, { focusInput: true });
    setAssistantStatus("先写下你想追问的问题。", "warning");
    return;
  }

  setAssistantOpen(true);
  const contextItems = buildAssistantContext(normalizedQuestion);
  const history = getAssistantConversationHistory();
  const messageSeed = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const userMessage = {
    id: `user-${messageSeed}`,
    role: "user",
    content: normalizedQuestion,
  };
  const assistantMessage = {
    id: `assistant-${messageSeed}`,
    role: "assistant",
    content: "",
    pending: true,
    sources: contextItems,
  };

  state.assistantMessages.push(userMessage, assistantMessage);
  pruneAssistantConversation();
  renderAssistantConversation();

  const questionInput = dom.assistantQuestion;
  if (questionInput) {
    questionInput.value = "";
    questionInput.focus();
  }

  state.assistantPending = true;
  state.assistantAbortController?.abort();
  state.assistantAbortController = new AbortController();
  syncAssistantComposerState();
  setAssistantStatus(`已筛出 ${contextItems.length} 篇相关章节，正在请求导读助手…`, "info");

  let answer = "";

  try {
    const response = await fetch(endpoint, {
      method: String(assistant.method || "POST").toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: normalizedQuestion,
        history,
        context: contextItems,
        stream: assistant.stream !== false,
      }),
      signal: state.assistantAbortController.signal,
    });

    if (!response.ok) {
      const errorType = response.headers.get("content-type") || "";
      let detail = "";
      if (errorType.includes("application/json")) {
        const payload = await response.json();
        detail = payload.detail || payload.error || "";
      } else {
        detail = (await response.text()).trim();
      }
      throw new Error(detail || `请求失败：${response.status}`);
    }

    await readAssistantResponse(response, (chunk) => {
      answer += chunk;
      updateAssistantMessageContent(assistantMessage.id, answer, { pending: true });
    });

    answer = normalizeAssistantText(answer, 6000);
    if (!answer) {
      answer = "这一轮没有返回可显示的文字。可以换一种更具体的问法，再追一次。";
    }

    updateAssistantMessageContent(assistantMessage.id, answer, { pending: false });
    setAssistantStatus(`已结合 ${contextItems.length} 篇章节整理回答。`, "success");
  } catch (error) {
    if (error?.name === "AbortError") {
      updateAssistantMessageContent(
        assistantMessage.id,
        answer || "这一轮回答已被手动停止。你可以重新提问，或者把问题缩小一点再试。",
        { pending: false },
      );
      setAssistantStatus("已停止当前回答。", "warning");
    } else {
      updateAssistantMessageContent(
        assistantMessage.id,
        "这次没有成功连到导读助手。请先检查 Worker 地址、跨域配置和 Cloudflare AI 绑定是否已经就绪。",
        { pending: false },
      );
      setAssistantStatus(error?.message || "导读助手请求失败。", "warning");
    }
  } finally {
    state.assistantPending = false;
    state.assistantAbortController = null;
    syncAssistantComposerState();
  }
}

function bindAssistantPanel() {
  renderAssistantShell();

  dom.assistantLauncher?.addEventListener("click", () => {
    setAssistantOpen(!state.assistantOpen, { focusInput: !state.assistantOpen });
  });

  dom.assistantCloseButton?.addEventListener("click", () => {
    setAssistantOpen(false);
  });

  dom.assistantSubmitButton?.addEventListener("click", () => {
    askAssistant(dom.assistantQuestion?.value || "");
  });

  dom.assistantStopButton?.addEventListener("click", () => {
    state.assistantAbortController?.abort();
  });

  dom.assistantClearButton?.addEventListener("click", () => {
    resetAssistantConversation();
  });

  dom.assistantQuestion?.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      askAssistant(dom.assistantQuestion?.value || "");
    }
  });

  dom.assistantQuickActions?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-assistant-suggestion]");
    if (!button) return;
    const question = button.dataset.assistantSuggestion || "";
    if (dom.assistantQuestion) dom.assistantQuestion.value = question;
    askAssistant(question);
  });
}

function renderLabPrompt() {
  dom.labNote.textContent =
    "AI 导读台把两件事接到一起：前半段把问题压成更稳的提示词，后半段则把实时问答重新带回站内章节与阅读线。";
  dom.labContent.innerHTML = `
    ${renderLabArchitectureSection("prompt")}

    <section class="lab-grid lab-grid-two">
      ${renderLabToolkitCard(
        "prompt",
        "先选一个场景模板，再填成你自己的问题",
        "这些预设不是标准答案，而是让你迅速体验：同一套方法怎样压成学习、生活、挣钱和研究里的不同提问方式。",
      )}

      <article class="lab-card lab-card-strong">
        <p class="eyebrow">Prompt Builder</p>
        <h3>把你的处境填进去，直接生成可复制提示词</h3>
        <p class="lab-section-copy">
          建议先写对象、现状、目标和时间，再补额外关注。这样 AI 更容易把“差异”落回到你的现实情境，而不是泛泛分析。
        </p>
        <div class="lab-controls prompt-builder-grid">
          <label class="lab-select">
            <span>使用场景</span>
            <select id="prompt-scene">
              ${LAB_PROMPT_SCENES.map((scene) => `<option value="${scene.id}">${scene.label}</option>`).join("")}
            </select>
          </label>
          <label class="lab-select">
            <span>输出偏好</span>
            <select id="prompt-output">
              ${LAB_PROMPT_OUTPUTS.map((item) => `<option value="${item.id}">${item.label}</option>`).join("")}
            </select>
          </label>
          <label class="lab-text-field">
            <span>对象 / 主题</span>
            <input id="prompt-object" type="text" maxlength="48" />
          </label>
          <label class="lab-text-field">
            <span>当前水平 / 现状</span>
            <input id="prompt-level" type="text" maxlength="120" />
          </label>
          <label class="lab-text-field">
            <span>目标</span>
            <input id="prompt-goal" type="text" maxlength="160" />
          </label>
          <label class="lab-text-field">
            <span>时间 / 资源</span>
            <input id="prompt-time" type="text" maxlength="100" />
          </label>
          <label class="lab-textarea prompt-builder-full">
            <span>额外关注</span>
            <textarea id="prompt-focus" rows="4" maxlength="180"></textarea>
          </label>
        </div>
        <div class="lab-flow prompt-method-flow">
          <span>先找差异</span>
          <span>再收边界</span>
          <span>再看反馈</span>
          <span>再压结构</span>
          <span>最后做验证</span>
        </div>
      </article>
    </section>

    <section class="lab-grid lab-grid-two">
      <article class="lab-card">
        <p class="eyebrow">Scene Focus</p>
        <h3 id="prompt-scene-title"></h3>
        <p id="prompt-scene-copy" class="lab-section-copy"></p>
        <p id="prompt-scene-lead" class="lab-section-lead"></p>
        <ul id="prompt-scene-points" class="lab-bullet-list"></ul>
      </article>

      <article class="lab-card">
        <p class="eyebrow">Usage Route</p>
        <h3>怎么用这一页更顺手</h3>
        <div class="lab-mini-points">
          <span>先用上面的提示词生成器把问题缩紧，再把更具体的版本丢给导读助手，通常会更容易得到能继续读的回答。</span>
          <span>如果回答仍然很空，就继续缩小“对象”“目标”“时间”三项，或者直接改问“这个概念在站内落到哪些章节”。</span>
          <span>拿到回答后，不要停在聊天框里，直接点章节卡继续读，再回理论学习页、交互检验页或研究推演页补边界和验证。</span>
        </div>
        <div class="lab-inline-actions">
          <button class="reader-button" type="button" data-lab-nav="learn">回理论学习</button>
          <button class="reader-button" type="button" data-lab-nav="infer">接研究推演</button>
        </div>
      </article>
    </section>

    <section class="lab-grid lab-grid-two">
      <article class="lab-card lab-card-strong prompt-preview-card">
        <div class="prompt-preview-head">
          <div>
            <p class="eyebrow">Full Prompt</p>
            <h3>完整版提示词</h3>
          </div>
          <button class="reader-button" type="button" data-prompt-copy="full">复制完整版</button>
        </div>
        <p class="lab-section-copy">适合第一次完整提问，能把差异、边界、反馈、结构和验证都压进同一轮对话。</p>
        <pre id="prompt-full-output" class="lab-prompt-output"></pre>
      </article>

      <article class="lab-card prompt-preview-card">
        <div class="prompt-preview-head">
          <div>
            <p class="eyebrow">Quick Prompt</p>
            <h3>快问版提示词</h3>
          </div>
          <button class="reader-button" type="button" data-prompt-copy="lite">复制快问版</button>
        </div>
        <p class="lab-section-copy">适合临时追问、手机端提问，保留主轴但更短更快。</p>
        <pre id="prompt-lite-output" class="lab-prompt-output is-lite"></pre>
      </article>
    </section>

    <section class="lab-grid lab-grid-three">
      <article class="lab-card">
        <p class="eyebrow">Prompt Core</p>
        <h3>这套提示词在逼 AI 做什么</h3>
        <p id="prompt-core-summary" class="lab-lead"></p>
      </article>
      <article class="lab-card">
        <p class="eyebrow">Output Bias</p>
        <h3>当前输出偏好会强调什么</h3>
        <p id="prompt-output-summary" class="lab-lead"></p>
      </article>
      <article class="lab-card">
        <p class="eyebrow">Reality Check</p>
        <h3>什么时候该继续追问</h3>
        <p id="prompt-reality-check" class="lab-lead"></p>
      </article>
    </section>

    ${buildAssistantPromptEntryMarkup()}
  `;

  const controlIds = Object.keys(LAB_CONTROL_DEFAULTS.prompt);
  setLabControlValues(state.labParams);

  const syncPromptDetails = () => {
    const scene = LAB_PROMPT_SCENE_MAP[state.labParams["prompt-scene"]] || LAB_PROMPT_SCENE_MAP["study-plan"];
    const output = LAB_PROMPT_OUTPUT_MAP[state.labParams["prompt-output"]] || LAB_PROMPT_OUTPUT_MAP["plan-table"];
    const scenePoints = dom.labContent.querySelector("#prompt-scene-points");

    dom.labContent.querySelector("#prompt-scene-title").textContent = scene.label;
    dom.labContent.querySelector("#prompt-scene-copy").textContent = scene.description;
    dom.labContent.querySelector("#prompt-scene-lead").textContent = scene.lead;
    scenePoints.innerHTML = scene.deliverables.map((item) => `<li>${item}</li>`).join("");
    dom.labContent.querySelector("#prompt-full-output").textContent = buildPromptFullText(state.labParams);
    dom.labContent.querySelector("#prompt-lite-output").textContent = buildPromptLiteText(state.labParams);
    dom.labContent.querySelector("#prompt-core-summary").textContent =
      `这次 AI 会围绕“${state.labParams["prompt-object"]}”先找差异、收边界、看反馈，再把内容压成可执行结构，而不是直接给鸡汤式建议。`;
    dom.labContent.querySelector("#prompt-output-summary").textContent =
      `${output.label}模式会更强调：${output.description}`;
    dom.labContent.querySelector("#prompt-reality-check").textContent =
      "如果 AI 没有明确说出关键差异、边界条件、验证动作或停止条件，就继续追问，不要直接照单执行。";
  };

  const syncPromptState = (replaceHash = true) => {
    state.labParams = resolveLabParams("prompt", getLabControlSnapshot(controlIds));
    syncPromptDetails();
    if (replaceHash) {
      setHashForLab("prompt", state.labParams, { replace: true });
    }
  };

  dom.labContent
    .querySelectorAll("input, select, textarea")
    .forEach((input) => input.addEventListener("input", () => syncPromptState()));

  bindLabToolkit("prompt", (values) => {
    setLabControlValues(resolveLabParams("prompt", values));
    syncPromptState();
  });

  dom.labContent.querySelectorAll("[data-prompt-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.dataset.promptCopy === "lite" ? "#prompt-lite-output" : "#prompt-full-output";
      const text = dom.labContent.querySelector(targetId)?.textContent || "";
      const copied = await copyTextToClipboard(text);
      setLabActionStatus(
        copied ? "已复制提示词。" : "当前环境不支持自动复制，请手动复制。",
        copied ? "success" : "warning",
      );
    });
  });

  dom.labContent.querySelector('[data-open-assistant="true"]')?.addEventListener("click", () => {
    setAssistantOpen(true, { focusInput: true });
  });

  syncPromptState(false);
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
  } else if (activePage === "prompt") {
    renderLabPrompt();
  } else {
    renderLabInfer();
  }

  dom.labContent.querySelectorAll("[data-lab-nav]").forEach((button) => {
    button.addEventListener("click", () => setHashForLab(button.dataset.labNav));
  });
}

function buildGraphPreview() {
  if (!dom.graphPreviewGrid) return;

  const graph = getKnowledgeGraph();
  const spotlightNodes = (graph?.spotlightIds || [])
    .map((nodeId) => findGraphNodeById(nodeId))
    .filter(Boolean);

  dom.graphPreviewGrid.innerHTML = "";

  if (!spotlightNodes.length) {
    dom.graphPreviewGrid.innerHTML = `<p class="empty-state">知识图谱数据正在生成中。</p>`;
    return;
  }

  spotlightNodes.forEach((node) => {
    const link = document.createElement("a");
    link.className = `graph-preview-card is-${node.status}`;
    link.href = `#graph/${encodeURIComponent(node.id)}`;
    link.dataset.family = node.familyId || "";
    link.innerHTML = `
      <span class="graph-preview-meta">${getGraphKindLabel(node.kind)} · ${node.code || node.shortCode || ""}</span>
      <strong>${node.shortLabel || node.label}</strong>
      <p>${node.description || "从这个节点开始，先看它已经落到哪些章节。"}</p>
      <em>${getGraphNodeCountLabel(node)}</em>
    `;
    dom.graphPreviewGrid.appendChild(link);
  });
}

function renderGraphLegend() {
  if (!dom.graphLegend) return;

  dom.graphLegend.innerHTML = GRAPH_LEGEND.map((entry) => `
    <article class="graph-legend-card is-${entry.status}">
      <span class="graph-legend-dot"></span>
      <div>
        <strong>${entry.title}</strong>
        <p>${entry.copy}</p>
      </div>
    </article>
  `).join("");
}

function renderGraphStats() {
  if (!dom.graphStats) return;

  const graph = getKnowledgeGraph();
  if (!graph?.stats) {
    dom.graphStats.innerHTML = "";
    return;
  }

  const stats = [
    { label: "母网", value: graph.stats.motherCount },
    { label: "核心网", value: graph.stats.coreCount },
    { label: "重点接口", value: graph.stats.interfaceCount },
    { label: "候选二级网", value: graph.stats.secondaryCount },
    { label: "已点亮节点", value: graph.stats.litNodeCount },
  ];

  dom.graphStats.innerHTML = stats.map((entry) => `
    <span class="graph-stat-chip">
      <strong>${entry.value}</strong>
      <em>${entry.label}</em>
    </span>
  `).join("");
}

function createGraphNodeButton(node, {
  variant = node.kind === "mother" ? "mother" : "core",
  isSelected = false,
  isRelated = false,
} = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `graph-node graph-node-${variant} is-${node.status}`;
  button.dataset.nodeId = node.id;
  button.dataset.kind = node.kind;
  button.dataset.family = node.familyId || "";
  button.style.setProperty("--graph-signal", String(Math.max(node.signal || 0.08, 0.08)));

  if (isSelected) {
    button.classList.add("is-selected");
  } else if (isRelated) {
    button.classList.add("is-related");
  }

  button.innerHTML = `
    <span class="graph-node-code">${getGraphKindLabel(node.kind)}${node.code ? ` · ${node.code}` : ""}</span>
    <strong>${node.shortLabel || node.label}</strong>
    <span class="graph-node-meta">${getGraphNodeCountLabel(node)}</span>
  `;

  button.addEventListener("click", () => setHashForGraph(node.id));
  return button;
}

function renderGraphClusters(selectedNode) {
  if (!dom.graphClusters) return;

  const graph = getKnowledgeGraph();
  const selectedIds = getGraphContextIdSet(selectedNode);
  const focusFamilyIds = getGraphFocusFamilyIds(selectedNode);

  if (!graph?.nodes?.length) {
    dom.graphClusters.innerHTML = `<p class="empty-state">知识图谱数据正在生成中。</p>`;
    return;
  }

  const layout = buildGraphMapLayout(graph);
  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const shell = document.createElement("div");
  shell.className = "graph-map-shell";

  const hint = document.createElement("div");
  hint.className = "graph-map-hint";
  hint.innerHTML = `
    <span>可视化图谱</span>
    <p>点击任意节点查看章节映射。桌面端可直接浏览整张图，移动端可以左右滚动查看跨层连线。</p>
  `;
  shell.appendChild(hint);

  const scroll = document.createElement("div");
  scroll.className = "graph-map-scroll";

  const svg = createSvgElement("svg", {
    class: "graph-map-svg",
    viewBox: `0 0 ${layout.width} ${layout.height}`,
    "aria-label": "差结构学习法知识图谱关系图",
    role: "img",
  });

  const defs = createSvgElement("defs");
  const shadow = createSvgElement("filter", {
    id: "graph-node-shadow",
    x: "-20%",
    y: "-20%",
    width: "140%",
    height: "160%",
  });
  shadow.appendChild(createSvgElement("feDropShadow", {
    dx: "0",
    dy: "10",
    stdDeviation: "12",
    "flood-color": "#4a3022",
    "flood-opacity": "0.16",
  }));
  defs.appendChild(shadow);
  svg.appendChild(defs);

  const backgrounds = createSvgElement("g", { class: "graph-map-backgrounds" });
  layout.familyFrames.forEach((frame) => {
    const panel = createSvgElement("rect", {
      x: frame.x,
      y: frame.y,
      width: frame.width,
      height: frame.height,
      rx: 28,
      fill: frame.palette.soft,
      stroke: focusFamilyIds.has(frame.id) ? frame.palette.accent : "rgba(125, 105, 86, 0.16)",
      "stroke-width": focusFamilyIds.has(frame.id) ? 2.4 : 1.2,
    });
    backgrounds.appendChild(panel);

    appendSvgTextLines(backgrounds, [frame.shortLabel], {
      x: frame.x + 18,
      y: frame.y + 24,
      textAnchor: "start",
      fill: frame.palette.accent,
      fontSize: 12,
      fontWeight: 700,
      className: "graph-map-family-label",
    });
  });
  svg.appendChild(backgrounds);

  const edgeLayer = createSvgElement("g", { class: "graph-map-edges" });
  (graph.edges || []).forEach((edge) => {
    const sourceBox = layout.boxes.get(edge.source);
    const targetBox = layout.boxes.get(edge.target);
    if (!sourceBox || !targetBox) return;

    const sourceNode = nodesById.get(edge.source);
    const targetNode = nodesById.get(edge.target);
    const familyId = sourceNode?.familyId === "bridge"
      ? targetNode?.familyId || "bridge"
      : sourceNode?.familyId || targetNode?.familyId || "bridge";
    const palette = getGraphFamilyPalette(familyId);
    const highlight = selectedIds.has(edge.source) && selectedIds.has(edge.target);
    const path = createSvgElement("path", {
      d: makeGraphEdgePath(sourceBox, targetBox),
      fill: "none",
      stroke: palette.line,
      "stroke-width": highlight ? 2.6 : 1.3,
      "stroke-opacity": highlight ? 0.92 : 0.28,
      class: `graph-map-edge${highlight ? " is-highlight" : ""}`,
    });
    edgeLayer.appendChild(path);
  });
  svg.appendChild(edgeLayer);

  const nodeLayer = createSvgElement("g", { class: "graph-map-nodes" });
  sortGraphNodes(graph.nodes).forEach((node) => {
    const box = layout.boxes.get(node.id);
    if (!box) return;

    const palette = getGraphFamilyPalette(node.familyId || node.id);
    const selected = node.id === selectedNode.id;
    const related = !selected && selectedIds.has(node.id);
    const group = createSvgElement("g", {
      class: `graph-map-node graph-map-node-${node.kind} is-${node.status}${selected ? " is-selected" : ""}${related ? " is-related" : ""}`,
      tabindex: "0",
      role: "button",
      "aria-label": `${getGraphKindLabel(node.kind)} ${node.label}`,
    });
    group.style.cursor = "pointer";

    const fill = node.status === "candidate"
      ? "rgba(255,255,255,0.78)"
      : node.status === "mapped"
        ? "rgba(255,255,255,0.88)"
        : "rgba(255,255,255,0.96)";
    const rect = createSvgElement("rect", {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      rx: node.kind === "mother" ? 24 : 18,
      fill,
      stroke: palette.accent,
      "stroke-width": selected ? 3 : related ? 2.2 : 1.4,
      "stroke-dasharray": node.status === "candidate" ? "6 4" : null,
      filter: selected ? "url(#graph-node-shadow)" : null,
      opacity: selected ? 1 : related ? 0.96 : node.status === "candidate" ? 0.9 : 0.94,
    });
    group.appendChild(rect);

    const statusDot = createSvgElement("circle", {
      cx: box.x + box.width - 14,
      cy: box.y + 14,
      r: 4.6,
      fill: node.status === "lit" ? palette.accent : node.status === "mapped" ? "#2e6c89" : "#7a7f8d",
    });
    group.appendChild(statusDot);

    const visual = getGraphNodeVisualMeta(node);
    appendSvgTextLines(group, [visual.code], {
      x: box.x + box.width / 2,
      y: box.y + 16,
      textAnchor: "middle",
      fill: palette.accent,
      fontSize: node.kind === "mother" ? 11 : 10,
      fontWeight: 700,
      className: "graph-map-node-code",
    });
    appendSvgTextLines(group, visual.lines, {
      x: box.x + box.width / 2,
      y: box.y + visual.labelY,
      textAnchor: "middle",
      fill: "#2b241d",
      fontSize: node.kind === "mother" ? 16 : node.kind === "core" ? 13 : 12,
      fontWeight: node.kind === "mother" ? 700 : 600,
      lineHeight: node.kind === "mother" ? 18 : 16,
      className: "graph-map-node-label",
    });
    appendSvgTextLines(group, [buildGraphNodeStatusLabel(node)], {
      x: box.x + box.width / 2,
      y: box.y + visual.metaY,
      textAnchor: "middle",
      fill: "#6b5e51",
      fontSize: 10,
      fontWeight: 500,
      className: "graph-map-node-meta",
    });

    const activate = () => setHashForGraph(node.id);
    group.addEventListener("click", activate);
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
    nodeLayer.appendChild(group);
  });
  svg.appendChild(nodeLayer);

  scroll.appendChild(svg);
  shell.appendChild(scroll);
  dom.graphClusters.innerHTML = "";
  dom.graphClusters.appendChild(shell);

  const selectedBox = layout.boxes.get(selectedNode.id);
  if (selectedBox) {
    requestAnimationFrame(() => {
      const targetLeft = Math.max(0, selectedBox.x - scroll.clientWidth * 0.35);
      scroll.scrollTo({ left: targetLeft, behavior: "auto" });
    });
  }
}

function renderGraphDetail(selectedNode) {
  if (!dom.graphDetail) return;

  const chapterItems = getGraphNodeItems(selectedNode, { limit: 8 });
  const candidateNodes = getGraphCandidateNodes(selectedNode);
  const chapterHeading = selectedNode.discussedChapterCount > 0
    ? "已经谈到它的章节"
    : "当前最接近它的图谱入口";
  const chapterCopy = selectedNode.discussedChapterCount > 0
    ? "这些章节里已经把这个节点展开成了可阅读内容。"
    : "它目前还主要停留在图谱或附录层，可以先从这些入口继续往里读。";

  dom.graphDetail.innerHTML = `
    <div class="graph-detail-head" data-family="${selectedNode.familyId || ""}">
      <p class="eyebrow">${getGraphKindLabel(selectedNode.kind)}</p>
      <h3>${selectedNode.label}</h3>
      <p class="graph-detail-copy">${selectedNode.description || "这个节点已经被登记进图谱，但还需要继续补桥、扩写或回到正文中展开。"}</p>
      <div class="graph-chip-row">
        <span class="graph-chip is-${selectedNode.status}">${getGraphStatusLabel(selectedNode.status)}</span>
        <span class="graph-chip">${selectedNode.code || "节点"}</span>
        <span class="graph-chip">${selectedNode.familyLabel || "层级节点"}</span>
        <span class="graph-chip">${getGraphNodeCountLabel(selectedNode)}</span>
      </div>
    </div>

    <section class="graph-detail-section">
      <div class="graph-detail-section-head">
        <h4>${chapterHeading}</h4>
        <p>${chapterCopy}</p>
      </div>
      <div class="graph-chapter-list" data-graph-chapters></div>
    </section>

    <section class="graph-detail-section">
      <div class="graph-detail-section-head">
        <h4>${getGraphCandidateHeading(selectedNode)}</h4>
        <p>点击下面的节点，可以继续看它和当前主轴的关系，以及它对应的章节入口。</p>
      </div>
      <div class="graph-candidate-list" data-graph-candidates></div>
    </section>
  `;

  const chapterList = dom.graphDetail.querySelector("[data-graph-chapters]");
  const candidateList = dom.graphDetail.querySelector("[data-graph-candidates]");

  if (!chapterItems.length) {
    chapterList.innerHTML = `<p class="empty-state">这个节点暂时还没有可直接跳转的章节入口。</p>`;
  } else {
    chapterItems.forEach((item) => {
      const link = document.createElement("a");
      link.className = "graph-chapter-card";
      link.href = `#doc/${encodeURIComponent(item.id)}`;
      link.innerHTML = `
        <small>${item.sectionTitle}</small>
        <strong>${getDisplayTitle(item)}</strong>
        <p>${item.excerpt || item.sectionTitle}</p>
      `;
      chapterList.appendChild(link);
    });
  }

  if (!candidateNodes.length) {
    candidateList.innerHTML = `<p class="empty-state">这一层目前还没有更下游的候选节点。</p>`;
  } else {
    const contextIds = getGraphContextIdSet(selectedNode);
    candidateNodes.forEach((node) => {
      candidateList.appendChild(createGraphNodeButton(node, {
        variant: "candidate",
        isSelected: node.id === selectedNode.id,
        isRelated: node.id !== selectedNode.id && contextIds.has(node.id),
      }));
    });
  }
}

async function renderGraph(nodeId) {
  cleanupLabPlaygrounds();
  const graph = getKnowledgeGraph();

  const selectedNode = findGraphNodeById(nodeId) || getGraphDefaultNode();
  if (!selectedNode) {
    renderHome();
    return;
  }

  state.activeId = null;
  state.activeDeckId = null;
  state.activeDeckCardId = null;
  state.activeLabPage = null;
  state.activeGraphNodeId = selectedNode.id;
  state.activePrimaryView = "graph";
  state.currentPrevId = null;
  state.currentNextId = null;

  document.title = `${state.payload.site.title} · 知识图谱`;
  document.body.classList.remove("is-reading");
  document.body.classList.add("is-app-ui");
  document.body.classList.remove("is-home-hub");
  dom.viewTitle.textContent = "知识图谱";
  dom.homeView.classList.add("hidden");
  dom.deckView.classList.add("hidden");
  dom.labView.classList.add("hidden");
  dom.docView.classList.add("hidden");
  dom.graphView.classList.remove("hidden");
  dom.graphTitle.textContent = "层级知识图谱";
  dom.graphIntro.textContent = graph?.stats
    ? `当前图谱已经整理出 ${graph.stats.motherCount} 个母网、${graph.stats.coreCount} 个核心网、${graph.stats.interfaceCount} 个重点接口和 ${graph.stats.secondaryCount} 个候选二级网。先看哪些已经在章节里点亮，再决定从哪里继续读。`
    : "把六个母网、三十六个核心网、接口和候选二级网放到同一页里，先看它们现在亮到了哪。";
  dom.readerProgressBar.style.transform = "scaleX(0)";
  dom.tocButton.disabled = true;
  updateChapterButtons(null, null);
  closeNavigationPanels();
  buildNav();
  renderGraphStats();
  renderGraphLegend();
  renderGraphClusters(selectedNode);
  renderGraphDetail(selectedNode);
  renderAssistantShell();
  syncViewButtons();
  window.scrollTo({ top: 0, behavior: "auto" });
}

async function renderDeck(deckId = null, params = {}, options = {}) {
  const deck = deckId ? findCardDeckById(deckId) : getFeaturedCardDeck();
  if (!deck) {
    renderHome();
    return;
  }

  const previousDeckId = state.activeDeckId;
  const previousCardId = state.activeDeckCardId;
  const activeCard = getDeckEntryCard(deck, params?.card);

  cleanupLabPlaygrounds();
  state.activeId = null;
  state.activeGraphNodeId = null;
  state.activeLabPage = null;
  state.activeDeckId = deck.id;
  state.activeDeckCardId = activeCard?.id || null;
  state.activePrimaryView = "home";
  state.currentPrevId = null;
  state.currentNextId = null;

  document.title = `${state.payload.site.title} 路 ${deck.title || "牌组"}`;
  document.body.classList.remove("is-reading");
  document.body.classList.add("is-app-ui");
  document.body.classList.remove("is-home-hub");
  dom.viewTitle.textContent = deck.title || "牌组";
  dom.homeView.classList.add("hidden");
  dom.graphView.classList.add("hidden");
  dom.labView.classList.add("hidden");
  dom.docView.classList.add("hidden");
  dom.deckView.classList.remove("hidden");
  dom.readerProgressBar.style.transform = "scaleX(0)";
  dom.tocButton.disabled = true;
  updateChapterButtons(null, null);
  closeNavigationPanels();
  buildNav();
  dom.deckContent.innerHTML = buildDeckViewMarkup(deck, activeCard);
  bindDeckViewEvents(deck);
  renderAssistantShell();
  syncViewButtons();

  const shouldScrollToDetail =
    options.scrollToDetail !== false
    && previousDeckId === deck.id
    && previousCardId
    && previousCardId !== activeCard?.id;

  if (shouldScrollToDetail) {
    scrollDeckDetailIntoView({ smooth: true });
  } else if (previousDeckId !== deck.id) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function renderHome() {
  cleanupLabPlaygrounds();
  state.activeId = null;
  state.activeDeckId = null;
  state.activeDeckCardId = null;
  state.activeGraphNodeId = null;
  state.activeLabPage = null;
  state.activePrimaryView = "home";
  state.currentPrevId = null;
  state.currentNextId = null;

  document.title = `${state.payload.site.title} · 在线书稿`;
  document.body.classList.remove("is-reading");
  document.body.classList.add("is-app-ui");
  document.body.classList.add("is-home-hub");
  syncAppHomeMirror();
  dom.viewTitle.textContent = "分卷书架";
  dom.homeView.classList.remove("hidden");
  dom.deckView.classList.add("hidden");
  dom.graphView.classList.add("hidden");
  dom.labView.classList.add("hidden");
  dom.docView.classList.add("hidden");
  dom.readerProgressBar.style.transform = "scaleX(0)";
  dom.tocButton.disabled = true;
  updateChapterButtons(null, null);
  renderAssistantShell();
  syncViewButtons();
  closeNavigationPanels();
  buildNav();
  window.scrollTo({ top: 0, behavior: "auto" });
}

async function renderLab(page) {
  const activePage = normalizeLabPage(page);
  cleanupLabPlaygrounds();
  state.activeId = null;
  state.activeDeckId = null;
  state.activeDeckCardId = null;
  state.activeGraphNodeId = null;
  state.activePrimaryView = "lab";
  state.currentPrevId = null;
  state.currentNextId = null;
  state.labParams = resolveLabParams(activePage, state.labParams);
  document.title = `${state.payload.site.title} · ${LAB_PAGES[activePage].title}`;
  document.body.classList.remove("is-reading");
  document.body.classList.add("is-app-ui");
  document.body.classList.remove("is-home-hub");
  dom.viewTitle.textContent = "理论实验台";
  dom.homeView.classList.add("hidden");
  dom.deckView.classList.add("hidden");
  dom.graphView.classList.add("hidden");
  dom.docView.classList.add("hidden");
  dom.labView.classList.remove("hidden");
  dom.readerProgressBar.style.transform = "scaleX(0)";
  dom.tocButton.disabled = true;
  updateChapterButtons(null, null);
  closeNavigationPanels();
  buildNav();
  renderLabPage(activePage);
  renderAssistantShell();
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
    closeNavigationPanels();
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
  if (dom.mobilePrevButton) dom.mobilePrevButton.disabled = !prev;
  if (dom.mobileNextButton) dom.mobileNextButton.disabled = !next;
}

function setCommentCopyStatus(message) {
  if (!dom.commentCopyStatus) return;

  dom.commentCopyStatus.textContent = message || "";

  if (state.commentCopyTimer) {
    window.clearTimeout(state.commentCopyTimer);
    state.commentCopyTimer = null;
  }

  if (message) {
    state.commentCopyTimer = window.setTimeout(() => {
      dom.commentCopyStatus.textContent = "";
      state.commentCopyTimer = null;
    }, 3200);
  }
}

function getDocHashUrl(item) {
  return `#doc/${encodeURIComponent(item?.id || "")}`;
}

function getDocAbsoluteUrl(item) {
  const fallback = `${window.location.href.split("#")[0]}${getDocHashUrl(item)}`;
  const siteUrl = String(state.payload?.site?.siteUrl || "").trim();

  if (!siteUrl) {
    return fallback;
  }

  try {
    return new URL(getDocHashUrl(item), siteUrl).toString();
  } catch {
    return fallback;
  }
}

function normalizeCommentPromptSnippet(value, limit = 320) {
  const compact = String(value || "").replace(/\s+/g, " ").trim();
  if (!compact) return "";
  if (compact.length <= limit) return compact;
  return `${compact.slice(0, limit).trimEnd()}…`;
}

function buildCommentQuickAskPrompt(item) {
  const chapterTitle = getDisplayTitle(item);
  const excerpt = normalizeCommentPromptSnippet(item?.excerpt, 320);
  const chapterUrl = getDocAbsoluteUrl(item);

  return [
    `我正在阅读《${chapterTitle}》这一章。`,
    `章节链接：${chapterUrl}`,
    item?.sourcePath ? `源文件：${item.sourcePath}` : "",
    excerpt ? `章节摘要：${excerpt}` : "",
    "",
    "请不要泛泛赞美，也不要只复述标题。请按下面顺序帮助我：",
    "1. 用 1 句话说清这章真正的主线。",
    "2. 列出 2 个最关键的差异、边界或判断动作。",
    "3. 指出 1 个最容易误解、最需要补桥或最该降强的地方。",
    "4. 给出 1 个能落到现实里的具体用法。",
    "5. 最后帮我写一段适合发在章节评论区的短评，控制在 120-180 字。",
    "",
    "如果仅凭这些信息还不够，请先明确指出你最想追问我的 1 个问题，再给暂定版本。",
  ]
    .filter(Boolean)
    .join("\n");
}

function resolveLiveBookTemplateBody(template, item) {
  const replacements = {
    "{{chapterTitle}}": getDisplayTitle(item),
    "{{commentPath}}": getCommentPath(item),
    "{{sourcePath}}": item?.sourcePath || "",
  };

  return Object.entries(replacements).reduce((body, [token, value]) => {
    return body.split(token).join(value);
  }, template?.body || "");
}

function renderCommentTemplateCards(templates, item) {
  if (!templates.length) {
    return `<div class="comments-placeholder">结构化评论模板正在整理中。</div>`;
  }

  return templates
    .map((template, index) => {
      const body = resolveLiveBookTemplateBody(template, item);
      return `
        <article class="comment-template-card">
          <p class="eyebrow">Structured Comment</p>
          <h4>${escapeHtml(template.title || `模板 ${index + 1}`)}</h4>
          <p>${escapeHtml(template.description || "")}</p>
          <pre class="comment-template-preview">${escapeHtml(body)}</pre>
          <div class="comment-template-actions">
            <button class="reader-button comment-mini-button" type="button" data-template-index="${index}">复制模板</button>
          </div>
        </article>
      `;
    })
    .join("");
}

async function openCommentQuickAsk(provider, item) {
  const prompt = buildCommentQuickAskPrompt(item);
  const copied = await copyTextToClipboard(prompt);
  let opened = null;

  try {
    opened = window.open(provider.url, "_blank", "noopener,noreferrer");
    if (opened) {
      opened.opener = null;
    }
  } catch {
    opened = null;
  }

  if (!opened) {
    window.location.href = provider.url;
  }

  setCommentCopyStatus(
    copied
      ? `已复制提问内容，并打开 ${provider.label}。到新页面粘贴后直接发送即可。`
      : `已打开 ${provider.label}。当前环境不支持自动复制，请手动复制提问内容后发送。`,
  );
}

function renderLiveBookCommentPanel(item) {
  if (!dom.liveBookCommentPanel) return;

  const liveBook = getLiveBookConfig();
  const templates = getLiveBookTemplates();
  const workflow = getLiveBookWorkflow();
  const entryItem = getLiveBookEntryItem();
  const quickAsk = getCommentQuickAskConfig();
  const providers = getCommentQuickAskProviders();
  const defaultProvider = getDefaultCommentQuickAskProvider();
  const alternateProviders = providers.filter((provider) => provider.id !== defaultProvider?.id);
  const chapterTitle = getDisplayTitle(item);
  const threadLabel = `章节：${chapterTitle}\n线程：${getCommentPath(item)}`;
  const summary =
    liveBook.summary ||
    "章节评论不会只停留在留言区，而会进入后续的整理、回写与版本更新流程。";
  const badges = workflow.length
    ? workflow.map((step) => step.title).filter(Boolean).slice(0, 4)
    : ["读者评论入站", "AI 归并整理", "修改模块回写"];
  const morePanelId = `comment-more-${item.id}`;
  const templateCards = renderCommentTemplateCards(templates, item);
  const buttonLabel = quickAsk.buttonLabel || "问AI";
  const moreLabel = quickAsk.moreLabel || "更多";
  const collapseLabel = quickAsk.collapseLabel || "收起";

  dom.liveBookCommentPanel.innerHTML = `
    <div class="comment-compact-toolbar">
      <button
        class="reader-button comment-mini-button comment-mini-button-strong"
        type="button"
        data-ask-ai-provider="${escapeHtml(defaultProvider.id)}"
      >
        ${escapeHtml(buttonLabel)}
      </button>
      <button
        class="reader-button comment-mini-button comment-mini-button-ghost"
        type="button"
        data-toggle-comment-more="true"
        data-more-label="${escapeHtml(moreLabel)}"
        data-collapse-label="${escapeHtml(collapseLabel)}"
        aria-expanded="false"
        aria-controls="${escapeHtml(morePanelId)}"
      >
        ${escapeHtml(moreLabel)}
      </button>
    </div>
    <div
      id="${escapeHtml(morePanelId)}"
      class="comments-more-panel"
      data-comment-more-panel="true"
      hidden
    >
      <div class="feedback-guide feedback-guide-inline">
        <h4>什么反馈最有价值</h4>
        <ul class="feedback-list">
          <li>哪一段最容易进入，哪一段最容易无感。</li>
          <li>哪里需要补桥、补白话、补术语或降强度。</li>
          <li>哪些内容应升为主线，哪些更适合转入专题或备忘录。</li>
        </ul>
      </div>
      ${alternateProviders.length
        ? `
          <div class="comment-ai-provider-row">
            <span class="comment-ai-provider-label">其他 AI</span>
            ${alternateProviders
              .map(
                (provider) => `
                  <button
                    class="reader-button comment-mini-button"
                    type="button"
                    data-ask-ai-provider="${escapeHtml(provider.id)}"
                  >
                    ${escapeHtml(provider.label)}
                  </button>
                `,
              )
              .join("")}
          </div>
        `
        : ""}
      <div class="live-book-comment-head">
        <div>
          <p class="eyebrow">Living Book Loop</p>
          <h4>这条评论会进入活书回写链路</h4>
          <p>${escapeHtml(summary)}</p>
        </div>
        <div class="live-book-inline-actions">
          ${entryItem
            ? `<a class="reader-button comment-mini-button comment-mini-button-ghost" href="#doc/${encodeURIComponent(entryItem.id)}">查看活书说明</a>`
            : ""}
          <button class="reader-button comment-mini-button" type="button" data-copy-comment-path="true">复制线程</button>
        </div>
      </div>
      <div class="live-book-thread">${escapeHtml(threadLabel)}</div>
      <div class="live-book-badges">
        ${badges.map((label) => `<span class="live-book-badge">${escapeHtml(label)}</span>`).join("")}
      </div>
      <div class="comment-template-grid">
        ${templateCards}
      </div>
    </div>
  `;

  setCommentCopyStatus("");

  const moreToggleButton = dom.liveBookCommentPanel.querySelector('[data-toggle-comment-more="true"]');
  const morePanel = dom.liveBookCommentPanel.querySelector('[data-comment-more-panel="true"]');

  moreToggleButton?.addEventListener("click", () => {
    if (!morePanel) return;
    const expanded = moreToggleButton.getAttribute("aria-expanded") === "true";
    const nextExpanded = !expanded;
    morePanel.hidden = !nextExpanded;
    moreToggleButton.setAttribute("aria-expanded", String(nextExpanded));
    moreToggleButton.textContent = nextExpanded
      ? moreToggleButton.dataset.collapseLabel || "收起"
      : moreToggleButton.dataset.moreLabel || "更多";
  });

  dom.liveBookCommentPanel
    .querySelectorAll("[data-ask-ai-provider]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const providerId = button.dataset.askAiProvider;
        const provider =
          providers.find((entry) => entry.id === providerId) || defaultProvider;
        if (!provider) return;
        await openCommentQuickAsk(provider, item);
      });
    });

  dom.liveBookCommentPanel
    .querySelector('[data-copy-comment-path="true"]')
    ?.addEventListener("click", async () => {
      const copied = await copyTextToClipboard(getCommentPath(item));
      setCommentCopyStatus(
        copied ? "已复制当前章节的评论线程路径。" : "当前环境不支持自动复制，请手动复制线程路径。",
      );
    });

  dom.liveBookCommentPanel.querySelectorAll("[data-template-index]").forEach((button) => {
    button.addEventListener("click", async () => {
      const index = Number(button.dataset.templateIndex);
      const template = templates[index];
      if (!template) return;
      const copied = await copyTextToClipboard(resolveLiveBookTemplateBody(template, item));
      setCommentCopyStatus(
        copied
          ? `已复制“${template.title || "评论模板"}”。`
          : "当前环境不支持自动复制，请手动复制模板内容。",
      );
    });
  });
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

function describeTwikooError(error) {
  const raw = String(error?.stack || error?.message || error || "").trim();
  const escapedRaw = escapeHtml(raw || "未知错误");
  const comments = getCommentsConfig();
  const envId = comments.envId || "";
  const serviceUrlMode = isTwikooServiceUrl(envId);

  if (/ACCESS_TOKEN_DISABLED|匿名登录/.test(raw) && !serviceUrlMode) {
    return `
      <strong>Twikoo 已加载，但 CloudBase 匿名登录没有开通。</strong>
      <br />
      当前报错表明评论脚本已经运行到 Twikoo 初始化阶段，只是在云开发身份认证这一步被拒绝了。
      <br />
      请前往腾讯云云开发控制台，为环境 <code>${escapeHtml(getCommentsConfig().envId || "")}</code> 开启匿名登录。
      <br />
      常见位置：云开发控制台 &gt; 身份认证 / 登录方式 &gt; 匿名登录。
      <br />
      原始错误：<code>${escapedRaw}</code>
    `;
  }

  if (serviceUrlMode && /network request error|failed to fetch|fetch failed|ERR_NAME_NOT_RESOLVED|404|502|503/i.test(raw)) {
    return `
      <strong>Twikoo 已切到 URL 型服务地址，但评论服务当前没有成功连通。</strong>
      <br />
      请检查 <code>${escapeHtml(envId)}</code> 是否是实际可访问的 Twikoo 服务地址，并确认路径末尾包含 <code>/.netlify/functions/twikoo</code>。
      <br />
      同时检查 Netlify 部署是否成功、环境变量 <code>MONGODB_URI</code> 是否已配置。
      <br />
      原始错误：<code>${escapedRaw}</code>
    `;
  }

  if (/Failed to load Twikoo script/i.test(raw)) {
    return `
      <strong>Twikoo 脚本文件没有成功加载。</strong>
      <br />
      请检查 <code>${escapeHtml(getCommentsConfig().scriptUrl || "")}</code> 是否能被当前页面访问。
      <br />
      原始错误：<code>${escapedRaw}</code>
    `;
  }

  return `
    <strong>Twikoo 初始化失败。</strong>
    <br />
    请检查 ${
      serviceUrlMode
        ? "Twikoo 服务地址、Netlify 函数部署状态与评论脚本地址"
        : "CloudBase 环境、envId、匿名登录与评论脚本地址"
    } 是否配置完整。
    <br />
    原始错误：<code>${escapedRaw}</code>
  `;
}

function ensureTwikooLoaded(scriptUrl) {
  if (window.twikoo) {
    return Promise.resolve(window.twikoo);
  }

  if (window.__twikooLoadingPromise) {
    return window.__twikooLoadingPromise;
  }

  const resolveTwikooScriptCandidates = (value) => {
    const fallback = "./assets/vendor/twikoo.all.min.js";
    const candidates = new Set();
    const configured = String(value || "").trim() || fallback;
    const addCandidate = (candidate, base) => {
      try {
        candidates.add(new URL(candidate, base).toString());
      } catch {}
    };

    addCandidate(configured, document.baseURI);
    addCandidate(fallback, document.baseURI);

    const appScript = document.querySelector('script[src*="/assets/app.js"], script[src$="assets/app.js"], script[src*="assets/app.js?"]');
    const appScriptSrc = String(appScript?.src || "").trim();
    if (appScriptSrc) {
      addCandidate("./vendor/twikoo.all.min.js", appScriptSrc);
    }

    return Array.from(candidates);
  };

  const loadTwikooScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.twikooScript = "true";
    script.dataset.twikooScriptState = "loading";
    script.onload = () => {
      script.dataset.twikooScriptState = "loaded";
      if (window.twikoo) {
        resolve(window.twikoo);
        return;
      }
      script.remove();
      reject(new Error(`Twikoo script loaded but window.twikoo is unavailable: ${src}`));
    };
    script.onerror = () => {
      script.dataset.twikooScriptState = "error";
      script.remove();
      reject(new Error(`Failed to load Twikoo script: ${src}`));
    };
    (document.head || document.body).appendChild(script);
  });

  window.__twikooLoadingPromise = (async () => {
    const existing = document.querySelector('script[data-twikoo-script="true"]');
    if (existing) {
      const loadState = existing.dataset.twikooScriptState || "";
      if (loadState === "loaded" && window.twikoo) {
        return window.twikoo;
      }
      if (loadState === "loading") {
        return await new Promise((resolve, reject) => {
          existing.addEventListener("load", () => resolve(window.twikoo), { once: true });
          existing.addEventListener("error", reject, { once: true });
        });
      }
      existing.remove();
    }

    const candidates = resolveTwikooScriptCandidates(scriptUrl);
    let lastError = null;
    for (const candidate of candidates) {
      try {
        return await loadTwikooScript(candidate);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error(`Failed to load Twikoo script: ${scriptUrl}`);
  })().catch((error) => {
    window.__twikooLoadingPromise = null;
    throw error;
  });

  return window.__twikooLoadingPromise;
}

async function mountTwikoo(item, comments) {
  await ensureTwikooLoaded(comments.scriptUrl || "./assets/vendor/twikoo.all.min.js");

  dom.commentsMount.innerHTML = "";

  const options = {
    el: "#comments-mount",
    envId: comments.envId,
    lang: comments.lang || "zh-CN",
    path: getCommentPath(item),
  };
  const displayedFields = normalizeTwikooFieldConfig(comments.displayedFields);
  const requiredFields = normalizeTwikooFieldConfig(comments.requiredFields);

  if (comments.region && !isTwikooServiceUrl(comments.envId)) {
    options.region = comments.region;
  }

  if (displayedFields?.length) {
    options.DISPLAYED_FIELDS = displayedFields;
  }

  if (requiredFields?.length) {
    options.REQUIRED_FIELDS = requiredFields;
  }

  if (comments.commentPlaceholder) {
    options.COMMENT_PLACEHOLDER = comments.commentPlaceholder;
  }

  await window.twikoo.init(options);
}

async function renderComments(item) {
  const comments = getCommentsConfig();
  const liveBook = getLiveBookConfig();

  if (comments.provider !== "twikoo") {
    renderCommentsPlaceholder(
      "当前站点还没有启用评论服务。",
      "评论功能尚未接入具体服务。",
    );
    return;
  }

  if (!comments.envId) {
    renderCommentsPlaceholder(
      comments.deploymentTarget === "netlify"
        ? "评论区已切换到 Twikoo Netlify 方案，当前在等待评论服务地址。"
        : "Twikoo 已预留，但还没有填写评论服务地址。",
      buildCommentsSetupPlaceholder(comments),
    );
    return;
  }

  dom.commentsNote.textContent =
    liveBook.title
      ? `按章节留言，或先点“问AI”把这一章带去外部模型继续追问。`
      : "按章节留言，优先留下真正卡住你的地方。";

  try {
    await mountTwikoo(item, comments);
  } catch (error) {
    console.error(error);
    renderCommentsPlaceholder(
      "Twikoo 评论区加载失败。",
      describeTwikooError(error),
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

async function renderDoc(id, params = {}) {
  const item = findItemById(id);
  if (!item) {
    renderHome();
    return;
  }

  cleanupLabPlaygrounds();
  state.activeId = item.id;
  state.activeDeckId = null;
  state.activeDeckCardId = null;
  state.activeGraphNodeId = null;
  state.activeLabPage = null;
  state.activePrimaryView = "home";
  document.body.classList.add("is-reading");
  document.body.classList.add("is-app-ui");
  document.body.classList.remove("is-home-hub");
  dom.homeView.classList.add("hidden");
  dom.deckView.classList.add("hidden");
  dom.graphView.classList.add("hidden");
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
  renderLiveBookCommentPanel(item);
  await renderComments(item);

  renderToc(item);
  renderPagination(item);
  renderAssistantShell();
  await typesetMath();
  applyDocRouteFocus(params);
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
  clearCommentFocusTimer();
  state.commentFocusRevision += 1;
  clearCommentFocusFrame();
  setCommentFocusMode(false);
  const routeState = getHashRoute();
  if (routeState.type === "home") {
    renderHome();
    return;
  }
  if (routeState.type === "deck") {
    await renderDeck(routeState.deckId, routeState.params);
    return;
  }
  if (routeState.type === "graph") {
    await renderGraph(routeState.nodeId);
    return;
  }
  if (routeState.type === "lab") {
    state.labParams = resolveLabParams(routeState.page, routeState.params);
    await renderLab(routeState.page);
    return;
  }
  await renderDoc(routeState.id, routeState.params);
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
  dom.graphButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    setHashForGraph(state.activeGraphNodeId || getGraphDefaultNode()?.id || null);
  });
  dom.labButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    setHashForLab(state.activeLabPage || "play");
  });
  dom.themeButton.addEventListener("click", cycleTheme);
  dom.fontDownButton.addEventListener("click", () => adjustFont(-1));
  dom.fontUpButton.addEventListener("click", () => adjustFont(1));
  dom.mobileFontDownButton?.addEventListener("click", () => adjustFont(-1));
  dom.mobileFontUpButton?.addEventListener("click", () => adjustFont(1));
  dom.fontResetButton.addEventListener("click", resetFontSize);
  dom.homeButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    window.location.hash = "";
  });

  dom.tabHomeButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    window.location.hash = "";
  });
  dom.tabLabButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    setHashForLab(state.activeLabPage || "play");
  });
  dom.tabGraphButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    setHashForGraph(state.activeGraphNodeId || getGraphDefaultNode()?.id || null);
  });
  dom.tabAiButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(true, { focusInput: true });
  });

  dom.startReadingButton.addEventListener("click", () => {
    const item = getPrimaryStartItem();
    if (item) setHashForDoc(item.id);
  });
  dom.openGraphButton?.addEventListener("click", () => {
    const defaultNode = getGraphDefaultNode();
    setHashForGraph(defaultNode?.id || null);
  });
  dom.openGraphLaunchButton?.addEventListener("click", () => {
    const defaultNode = getGraphDefaultNode();
    setHashForGraph(defaultNode?.id || null);
  });
  dom.openLabButton?.addEventListener("click", () => {
    const item = getSectionEntry("light-series") || getSectionEntry("book");
    if (item) setHashForDoc(item.id);
  });
  dom.openCatalogButton.addEventListener("click", () => setDrawerOpen(true));
  dom.liveBookOpenCatalog?.addEventListener("click", () => setDrawerOpen(true));
  dom.homeCatalogButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    setDrawerOpen(true);
  });
  dom.homeStartButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    const item = getPrimaryStartItem();
    if (item) setHashForDoc(item.id);
  });
  const openHomeSearch = () => {
    setAssistantOpen(false);
    setTocOpen(false);
    setMobileFontPanelOpen(false);
    setDrawerOpen(true);
    window.requestAnimationFrame(() => dom.searchInput?.focus());
  };
  dom.homeSearchButton?.addEventListener("click", openHomeSearch);
  dom.homeSearchStripButton?.addEventListener("click", openHomeSearch);
  dom.homeGraphShortcutButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    setHashForGraph(state.activeGraphNodeId || getGraphDefaultNode()?.id || null);
  });
  dom.homeLabShortcutButton?.addEventListener("click", () => {
    closeNavigationPanels();
    setAssistantOpen(false);
    setHashForLab(state.activeLabPage || "play");
  });
  dom.homeThemeShortcutButton?.addEventListener("click", cycleTheme);
  document.querySelectorAll("[data-home-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-home-tab]").forEach((tab) => {
        tab.classList.toggle("is-active", tab === button);
      });

      if (button.dataset.homeTab === "start") {
        const item = getPrimaryStartItem();
        if (item) setHashForDoc(item.id);
        return;
      }

      if (button.dataset.homeTab === "continue") {
        dom.appHomeFeaturedVolumeLinks?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  dom.mobileHomeButton?.addEventListener("click", () => {
    closeNavigationPanels();
    window.location.hash = "";
  });
  dom.mobileCatalogButton?.addEventListener("click", () => {
    setMobileFontPanelOpen(false);
    setTocOpen(false);
    setDrawerOpen(!state.drawerOpen);
  });
  dom.mobileFontButton?.addEventListener("click", () => {
    setDrawerOpen(false);
    setTocOpen(false);
    setMobileFontPanelOpen(!state.mobileFontPanelOpen);
  });
  dom.mobileThemeButton?.addEventListener("click", cycleTheme);
  dom.mobilePrevButton?.addEventListener("click", () => {
    if (state.currentPrevId) {
      closeNavigationPanels();
      setHashForDoc(state.currentPrevId);
    }
  });
  dom.mobileNextButton?.addEventListener("click", () => {
    if (state.currentNextId) {
      closeNavigationPanels();
      setHashForDoc(state.currentNextId);
    }
  });

  dom.pageOverlay.addEventListener("click", closePanels);

  dom.labTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lab-page]");
    if (!button) return;
    setHashForLab(button.dataset.labPage);
  });

  document.addEventListener("focusin", (event) => {
    if (!isCommentFieldTarget(event.target)) return;
    clearCommentFocusTimer();
    state.commentFocusRevision += 1;
    setCommentFocusMode(true);
    queueCommentFieldStabilization(event.target, true);
  });

  document.addEventListener("focusout", (event) => {
    if (!isCommentFieldTarget(event.target)) return;
    releaseCommentFocusModeSoon();
  });

  document.addEventListener("input", (event) => {
    if (!isCommentFieldTarget(event.target)) return;
    queueCommentFieldStabilization(event.target);
  });

  window.addEventListener("hashchange", () => {
    route().catch(console.error);
  });

  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener(
    "scroll",
    () => {
      if (!isCommentFieldTarget(document.activeElement)) return;
      queueCommentFieldStabilization(document.activeElement);
    },
    { passive: true },
  );
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      document.body.classList.remove("lock-scroll");
      setMobileFontPanelOpen(false);
    }
    applyPreferences();
    updateReadingProgress();
    if (isCommentFieldTarget(document.activeElement)) {
      queueCommentFieldStabilization(document.activeElement, true);
    }
  });

  window.visualViewport?.addEventListener("resize", () => {
    if (!isCommentFieldTarget(document.activeElement)) return;
    queueCommentFieldStabilization(document.activeElement, true);
  });

  window.visualViewport?.addEventListener("scroll", () => {
    if (!isCommentFieldTarget(document.activeElement)) return;
    queueCommentFieldStabilization(document.activeElement);
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
  renderAssistantShell();
  buildStarterLinks();
  buildFeaturedVolume();
  syncAppHomeMirror();
  buildCardDeckHomeSection();
  buildLiveBookHomeSection();
  buildGraphPreview();
  applyPreferences();
  buildLightSeriesLinks();
  buildQuickLinks();
  buildSystemLinks();
  buildNav();
  bindEvents();
  bindAssistantPanel();
  await route();
}

init().catch((error) => {
  console.error(error);
  dom.homeView.classList.remove("hidden");
  dom.docView.classList.add("hidden");
  dom.heroTitle.textContent = "站点加载失败";
  dom.heroText.textContent = "内容数据没有成功加载。你可以先重新运行构建脚本，再刷新网页。";
});
