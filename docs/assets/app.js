const contentUrl = "./assets/data/content.json";

const state = {
  payload: null,
  filteredItems: [],
  activeId: null,
};

const dom = {
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
};

function formatDate(isoString) {
  if (!isoString) return "未知";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getDocIdFromHash() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!hash.startsWith("doc/")) return null;
  return hash.slice(4);
}

function setHashForDoc(id) {
  window.location.hash = `doc/${encodeURIComponent(id)}`;
}

function buildQuickLinks() {
  const items = state.payload.items.slice(0, 6);
  dom.quickLinks.innerHTML = "";
  items.forEach((item) => {
    const link = document.createElement("a");
    link.className = "quick-link";
    link.href = `#doc/${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.excerpt || item.sectionTitle}</p>
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
      .map((id) => state.payload.items.find((item) => item.id === id))
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
      if (item.id === state.activeId) button.classList.add("is-active");
      button.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.excerpt || item.sectionTitle}</span>
      `;
      button.addEventListener("click", () => setHashForDoc(item.id));
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
  dom.viewTitle.textContent = "理论总览";
  dom.homeView.classList.remove("hidden");
  dom.docView.classList.add("hidden");
  buildNav();
}

function renderToc(item) {
  if (!item.headings?.length) {
    dom.docToc.innerHTML = `<p class="empty-state">当前文稿没有可用目录。</p>`;
    return;
  }

  dom.docToc.innerHTML = `<h3>章节目录</h3>`;
  item.headings.forEach((heading) => {
    const anchor = document.createElement("a");
    anchor.href = `#${heading.anchor}`;
    anchor.textContent = heading.label;
    anchor.dataset.level = String(heading.level);
    dom.docToc.appendChild(anchor);
  });
}

function renderPagination(item) {
  const currentIndex = state.payload.items.findIndex((entry) => entry.id === item.id);
  const prev = state.payload.items[currentIndex - 1];
  const next = state.payload.items[currentIndex + 1];

  dom.docPagination.innerHTML = "";

  if (prev) {
    const prevLink = document.createElement("a");
    prevLink.className = "pager-card";
    prevLink.href = `#doc/${encodeURIComponent(prev.id)}`;
    prevLink.innerHTML = `<small>上一篇</small><strong>${prev.title}</strong>`;
    dom.docPagination.appendChild(prevLink);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "pager-card";
    placeholder.innerHTML = `<small>上一篇</small><strong>已经到头</strong>`;
    dom.docPagination.appendChild(placeholder);
  }

  if (next) {
    const nextLink = document.createElement("a");
    nextLink.className = "pager-card";
    nextLink.href = `#doc/${encodeURIComponent(next.id)}`;
    nextLink.innerHTML = `<small>下一篇</small><strong>${next.title}</strong>`;
    dom.docPagination.appendChild(nextLink);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "pager-card";
    placeholder.innerHTML = `<small>下一篇</small><strong>已经到底</strong>`;
    dom.docPagination.appendChild(placeholder);
  }
}

async function typesetMath() {
  if (window.MathJax?.typesetPromise) {
    await window.MathJax.typesetPromise([dom.docContent]);
  }
}

async function renderDoc(id) {
  const item = state.payload.items.find((entry) => entry.id === id);
  if (!item) {
    renderHome();
    return;
  }

  state.activeId = item.id;
  buildNav();
  dom.viewTitle.textContent = item.title;
  dom.homeView.classList.add("hidden");
  dom.docView.classList.remove("hidden");

  dom.docBreadcrumb.textContent = item.sectionTitle;
  dom.docTitle.textContent = item.title;
  dom.docUpdated.textContent = `更新于 ${formatDate(item.updatedAt)}`;
  dom.docSource.textContent = `源文件：${item.sourcePath}`;
  dom.docContent.innerHTML = item.html;
  dom.docContent.scrollTop = 0;
  renderToc(item);
  renderPagination(item);
  await typesetMath();
}

function updateShell() {
  const site = state.payload.site;
  const stats = state.payload.stats;
  document.title = `${site.title} · 在线书稿`;
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

async function init() {
  const response = await fetch(contentUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load content: ${response.status}`);
  }

  state.payload = await response.json();
  updateShell();
  buildQuickLinks();
  buildNav();

  dom.searchInput.addEventListener("input", buildNav);
  dom.homeButton.addEventListener("click", () => {
    window.location.hash = "";
  });

  window.addEventListener("hashchange", () => {
    route().catch(console.error);
  });

  await route();
}

init().catch((error) => {
  console.error(error);
  dom.homeView.classList.remove("hidden");
  dom.docView.classList.add("hidden");
  dom.heroTitle.textContent = "站点加载失败";
  dom.heroText.textContent = "内容数据没有成功加载。你可以先运行一次构建脚本，再重新打开网页。";
});
