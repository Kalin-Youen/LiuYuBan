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

const state = {
  payload: null,
  filteredItems: [],
  activeId: null,
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
  docView: document.getElementById("doc-view"),
  heroTitle: document.getElementById("hero-title"),
  heroText: document.getElementById("hero-text"),
  quickLinks: document.getElementById("quick-links"),
  docBreadcrumb: document.getElementById("doc-breadcrumb"),
  docTitle: document.getElementById("doc-title"),
  docUpdated: document.getElementById("doc-updated"),
  docSource: document.getElementById("doc-source"),
  docContent: document.getElementById("doc-content"),
  docToc: document.getElementById("doc-toc"),
  docPagination: document.getElementById("doc-pagination"),
  catalogButton: document.getElementById("catalog-button"),
  tocButton: document.getElementById("toc-button"),
  themeButton: document.getElementById("theme-button"),
  fontDownButton: document.getElementById("font-down-button"),
  fontUpButton: document.getElementById("font-up-button"),
  fontSizeIndicator: document.getElementById("font-size-indicator"),
  startReadingButton: document.getElementById("start-reading-button"),
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

function getDocIdFromHash() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!hash.startsWith("doc/")) return null;
  return hash.slice(4);
}

function setHashForDoc(id) {
  window.location.hash = `doc/${encodeURIComponent(id)}`;
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

function renderHome() {
  state.activeId = null;
  state.currentPrevId = null;
  state.currentNextId = null;

  document.title = `${state.payload.site.title} · 在线书稿`;
  document.body.classList.remove("is-reading");
  dom.viewTitle.textContent = "书架";
  dom.homeView.classList.remove("hidden");
  dom.docView.classList.add("hidden");
  dom.readerProgressBar.style.transform = "scaleX(0)";
  dom.tocButton.disabled = true;
  updateChapterButtons(null, null);
  closePanels();
  buildNav();
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
    "评论区已接入 Twikoo。当前每个章节会使用独立评论线程，适合书稿式连续阅读。";

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
  if (window.MathJax?.typesetPromise) {
    await window.MathJax.typesetPromise([dom.docContent]);
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
  document.body.classList.add("is-reading");
  dom.homeView.classList.add("hidden");
  dom.docView.classList.remove("hidden");
  dom.viewTitle.textContent = item.title;
  dom.tocButton.disabled = false;

  buildNav();
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
  const id = getDocIdFromHash();
  if (!id) {
    renderHome();
    return;
  }
  await renderDoc(id);
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
