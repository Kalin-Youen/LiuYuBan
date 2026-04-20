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
const LAB_PAGES = {
  learn: {
    title: "理论学习页",
    intro:
      "把展望里的实验想法先压成一条可读的学习链，先看每个实验究竟想检验什么，再看变量应该怎么读。",
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
    pages: ["learn", "validate"],
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
    pages: ["learn", "validate", "infer"],
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

const state = {
  payload: null,
  filteredItems: [],
  activeId: null,
  activeLabPage: null,
  labParams: {},
  labActionTimer: null,
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
  systemLinks: document.getElementById("system-links"),
  quickLinks: document.getElementById("quick-links"),
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

function getCommentsConfig() {
  return state.payload.site.comments || {};
}

function getPrimaryStartItem() {
  return (
    state.payload.items.find((item) => item.sectionId === "book") ||
    state.payload.items[0] ||
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

function buildQuickLinks() {
  const items = state.payload.items
    .filter((item) => item.sectionId === "book")
    .slice(0, 6);

  dom.quickLinks.innerHTML = "";

  items.forEach((item, index) => {
    const link = document.createElement("a");
    link.className = "book-card";
    link.href = `#doc/${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <div class="book-card-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="book-card-copy">
        <h4>${item.title}</h4>
        <p>${item.excerpt || item.sectionTitle}</p>
      </div>
    `;
    dom.quickLinks.appendChild(link);
  });
}

function getSectionEntry(sectionId) {
  const items = state.payload.items.filter((item) => item.sectionId === sectionId);

  if (sectionId === "book") {
    return (
      items.find((item) => item.title.includes("第1章")) ||
      items.find((item) => item.title.includes("绪论")) ||
      items[0] ||
      null
    );
  }

  if (sectionId === "plain-book") {
    return (
      items.find((item) => item.title.includes("卷首")) ||
      items[0] ||
      null
    );
  }

  if (sectionId === "ai-book") {
    return (
      items.find((item) => item.title.includes("卷首")) ||
      items[0] ||
      null
    );
  }

  return items[0] || null;
}

function buildSystemLinks() {
  const sectionOrder = ["book", "plain-book", "ai-book", "terms"];
  dom.systemLinks.innerHTML = "";

  sectionOrder.forEach((sectionId) => {
    const section = state.payload.sections.find((item) => item.id === sectionId);
    const entry = getSectionEntry(sectionId);

    if (!section || !entry) return;

    const link = document.createElement("a");
    link.className = "system-card";
    link.href = `#doc/${encodeURIComponent(entry.id)}`;
    link.innerHTML = `
      <p class="system-label">${section.title}</p>
      <h4>${entry.title}</h4>
      <p>${entry.excerpt || entry.sectionTitle}</p>
    `;
    dom.systemLinks.appendChild(link);
  });
}

function matchesSearch(item, keyword) {
  if (!keyword) return true;
  const haystack = `${item.title} ${item.excerpt} ${item.sectionTitle}`.toLowerCase();
  return haystack.includes(keyword.toLowerCase());
}

function buildNav() {
  const keyword = dom.searchInput.value.trim();
  state.filteredItems = state.payload.items.filter((item) => matchesSearch(item, keyword));
  const filteredIds = new Set(state.filteredItems.map((item) => item.id));

  dom.navSections.innerHTML = "";

  state.payload.sections.forEach((section) => {
    const sectionItems = section.items
      .map((id) => findItemById(id))
      .filter(Boolean)
      .filter((item) => filteredIds.has(item.id));

    if (!sectionItems.length) return;

    const group = document.createElement("section");
    group.className = "nav-group";

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
      if (item.id === state.activeId) {
        button.classList.add("is-active");
      }

      button.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.excerpt || item.sectionTitle}</span>
      `;

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

function getRatio(id) {
  const input = dom.labContent.querySelector(`#${id}`);
  return clamp01(Number(input?.value || 0) / 100);
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

function renderLabLearn() {
  dom.labNote.textContent =
    "学习页强调主线与实验问题的对应关系，先弄清每个模拟器到底在检验哪种变量耦合，再进入参数比较。";
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
  state.activeId = null;
  state.activeLabPage = null;
  state.currentPrevId = null;
  state.currentNextId = null;

  document.title = `${state.payload.site.title} · 在线书稿`;
  document.body.classList.remove("is-reading");
  dom.viewTitle.textContent = "书架";
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

function renderPagination(item) {
  const currentIndex = state.payload.items.findIndex((entry) => entry.id === item.id);
  const prev = state.payload.items[currentIndex - 1] || null;
  const next = state.payload.items[currentIndex + 1] || null;

  updateChapterButtons(prev, next);
  dom.docPagination.innerHTML = "";

  const cards = [
    prev
      ? `<a class="pager-card" href="#doc/${encodeURIComponent(prev.id)}"><small>上一章</small><strong>${prev.title}</strong></a>`
      : `<div class="pager-card"><small>上一章</small><strong>已经到头了</strong></div>`,
    next
      ? `<a class="pager-card" href="#doc/${encodeURIComponent(next.id)}"><small>下一章</small><strong>${next.title}</strong></a>`
      : `<div class="pager-card"><small>下一章</small><strong>已经到底了</strong></div>`,
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

  state.activeId = item.id;
  state.activeLabPage = null;
  document.body.classList.add("is-reading");
  dom.homeView.classList.add("hidden");
  dom.labView.classList.add("hidden");
  dom.docView.classList.remove("hidden");
  dom.viewTitle.textContent = item.title;
  dom.tocButton.disabled = false;

  buildNav();
  syncViewButtons();
  closePanels();

  dom.docBreadcrumb.textContent = item.sectionTitle;
  dom.docTitle.textContent = item.title;
  dom.docUpdated.textContent = relativeTime(item.updatedAt);
  dom.docSource.textContent = `源文件：${item.sourcePath}`;
  dom.docContent.innerHTML = item.html;
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
  dom.openLabButton.addEventListener("click", () => setHashForLab("learn"));
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
  applyPreferences();
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
