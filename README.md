# 差结构学习法

一句话先说清：这不是一种“解释一切”的终极存在论命名，而是一套跨学科学习与训练方法。

它的顺序很简单：先分辨不同，再看边界、持续、反馈与耗散，最后判断什么能站住、能重复、能验证。项目当前用“落差”把不同学科里的梯度、势差、温差、压差、浓度差与耦合不均串成同一条学习线，使它既能接入大模型训练，也能转成人类学习副本。仓库同时包含：

- 可持续扩写的书稿源文件
- 面向普通读者的白话卷
- 面向协作流程的 AI 协作卷
- 可部署的静态网站
- 供机器读取的站点索引数据

仓库地址：

- GitHub: <https://github.com/Kalin-Youen/LiuYuBan>
- 在线站点: <https://kalin-youen.github.io/LiuYuBan/>

当前公开名称已统一调整为“差结构学习法”。原因也很直接：此前用过的“流态存在论”“差异结构存在论”“差异结构持续论”等名字，都太像某种终极存在论命名，容易让人误会这里是在再造一个“解释一切”的大词。现在更明确的定位是：**这里提供的是一套学习、推理与检验的方法。**

## 这是什么仓库

这个仓库不是单篇文章，而是一套成体系的研究书架。当前主要分成四条线：

1. 主书稿：相对完整地陈述理论主轴。
2. 白话卷：用更轻松、更直观的方式把同一套理论压成可连续进入的阅读路径。
3. AI 协作卷：记录如何让 AI 在本项目中协作，而不是胡乱扩写。
4. 网站系统：把全部内容整理成可部署、可搜索、可分页、可交互浏览的静态站点。

## 快速入口

如果你是第一次进入，建议按这个顺序：

1. 先读白话卷卷首：`研究文稿/07_书稿/白话卷/00_卷首_怎么读这本白话卷.md`
2. 再读白话卷第1章：`研究文稿/07_书稿/白话卷/第1章_世界先给人的不是物而是不同.md`
3. 然后读主书稿摘要：`研究文稿/07_书稿/00_摘要与关键词.md`
4. 最后根据兴趣进入主书稿章节、专题、术语与 AI 协作卷

网站内的推荐入口：

1. 白话卷
2. 主书稿
3. 理论总述
4. 术语与边界
5. 理论实验台

## 仓库结构

核心目录与文件如下：

- `研究文稿/07_书稿`
  主书稿正文、专题、附录，以及白话卷和 AI 协作卷的主目录。
- `研究文稿/07_书稿/白话卷`
  面向普通读者的白话版长篇编排。
- `研究文稿/07_书稿/AI协作卷`
  面向 AI 协作流程的专卷与备忘录。
- `研究文稿/04_议论与说明`
  理论总述与说明文章。
- `研究文稿/02_指正与术语`
  术语与边界说明。
- `docs/`
  GitHub Pages 直接发布目录。
- `docs/assets/data/content.json`
  站点生成后的机器可读内容索引，包含分卷、文章元数据与 HTML 内容。
- `scripts/build_site.py`
  从 Markdown 文稿生成站点数据的脚本。
- `site.config.json`
  站点标题、描述、分卷分组与仓库地址配置。

## 当前阅读主轴

项目当前的主要内容可以概括为：

1. 以“差异 / 非均匀性”为更根本出发点，并把“落差”作为对多种差结构与方向性条件的上位命名。
2. 讨论差结构如何在边界、反馈、耗散与稳态中留下结构。
3. 讨论结构如何进一步沉淀为规则。
4. 把这条主线延展到光、生命、基因、意识、文明、信息边界与 AI 系统。
5. 把理论阅读、交互检验、研究推演逐步整合进同一个网站系统。

## 对 AI / 大模型最重要的说明

如果你是模型、检索器、自动化代理，最重要的是这几条：

1. 这是公开仓库。
2. 默认分支是 `main`。
3. 仓库主要内容是中文 Markdown，文件名也大量使用中文。
4. 如果你读 GitHub 页面失败，不代表仓库不存在，可能只是网页解析失败。
5. 对机器最稳的入口通常不是仓库首页，而是 `README.md`、`content.json` 或具体文件的原始文本链接。

最推荐的机器入口按优先级排序如下：

1. 仓库说明：
   `https://raw.githubusercontent.com/Kalin-Youen/LiuYuBan/main/README.md`
2. 站点机器索引：
   `https://raw.githubusercontent.com/Kalin-Youen/LiuYuBan/main/docs/assets/data/content.json`
3. 在线站点首页：
   `https://kalin-youen.github.io/LiuYuBan/`
4. 具体 Markdown 原文：
   `https://raw.githubusercontent.com/Kalin-Youen/LiuYuBan/main/研究文稿/07_书稿/第12章_展望与研究计划.md`

如果需要优先进入某个分卷，建议从这些路径找：

- 主书稿目录：`研究文稿/07_书稿`
- 白话卷目录：`研究文稿/07_书稿/白话卷`
- AI 协作卷目录：`研究文稿/07_书稿/AI协作卷`

## 推荐给 AI 的访问方式

如果要让另一个模型稳定读取本项目，最稳的做法不是只丢一个仓库首页链接，而是按下面这种方式给：

1. 先给它 `README.md` 的 raw 链接，让它先知道这是什么仓库。
2. 再给它 `content.json` 的 raw 链接，让它获得机器可读目录。
3. 再给它你想让它重点读的具体 Markdown raw 链接。
4. 同时明确写一句：
   `这是公开仓库，默认分支是 main，请优先读取 raw 链接，不要只依赖仓库首页网页解析。`

适合喂给模型的例子：

```text
这是一个公开 GitHub 仓库，默认分支是 main。
请先读 README：
https://raw.githubusercontent.com/Kalin-Youen/LiuYuBan/main/README.md

再读机器索引：
https://raw.githubusercontent.com/Kalin-Youen/LiuYuBan/main/docs/assets/data/content.json

然后重点阅读这篇：
https://raw.githubusercontent.com/Kalin-Youen/LiuYuBan/main/研究文稿/07_书稿/第12章_展望与研究计划.md
```

## 本地构建

安装依赖：

```bash
python -m pip install -r requirements-site.txt
```

生成站点数据：

```bash
python scripts/build_site.py
```

本地预览：

```bash
python -m http.server 4173 -d docs
```

然后打开：

```text
http://localhost:4173
```

## 发布与部署

这个仓库的站点目录在 `docs/`，适合使用 GitHub Pages 发布。

如果使用 GitHub Actions：

1. 确认仓库的 Pages 来源设置为 `GitHub Actions`
2. 推送到默认分支
3. 等待工作流完成

站点配置集中在：

- `site.config.json`
- `docs/assets/data/content.json`
- `docs/index.html`
- `docs/assets/app.js`
- `docs/assets/styles.css`

## 适合人读，也适合机器读

这个 `README.md` 的目的不是只做仓库门面，而是充当一个稳定入口：

1. 人类读者可以先知道从哪里开始。
2. 协作者可以先知道仓库结构和构建方法。
3. AI 可以先知道默认分支、机器入口和最稳的读取方式。

如果你是从别的模型、别的平台或自动化工具跳过来的，建议先读本文件，再去读 `content.json` 或具体书稿文件。
