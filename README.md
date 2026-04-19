# 流态存在论网站项目

这个仓库现在已经包含一个可直接公开展示的静态网站方案，用来把 `研究文稿` 里的书稿和理论总述变成网页。

## 网站内容源

- `研究文稿/07_书稿`：书稿全文
- `研究文稿/04_议论与说明/流态存在论_归结、展望与自我校验.md`：理论总述
- `研究文稿/04_议论与说明/这些理论研究的价值_说明文章.md`：价值说明
- `研究文稿/02_指正与术语/术语决议_持续、维继与场流.md`：术语说明
- `研究文稿/01_正文/核心理论_巩固稿.md`：理论骨架
- `研究文稿/01_正文/多个宇宙、连续性的唯一性与膨胀前沿_宇宙论证明链.md`：宇宙学支线
- `研究文稿/01_正文/宇宙会回缩吗_从膨胀末端到状态切换.md`：宇宙命运支线

## 站点相关文件

- `site.config.json`：站点标题、描述、GitHub 仓库地址、自定义域名和内容分组
- `scripts/build_site.py`：从 Markdown 文稿生成网页数据
- `docs/`：可直接被 GitHub Pages 托管的站点目录
- `.github/workflows/deploy-pages.yml`：推送后自动构建并部署到 GitHub Pages

## 本地构建

先安装依赖：

```bash
python -m pip install -r requirements-site.txt
```

生成网站数据：

```bash
python scripts/build_site.py
```

本地预览：

```bash
python -m http.server 4173 -d docs
```

然后打开 <http://localhost:4173>。

## 发布到 GitHub Pages

第一次发布建议直接按下面这组命令走：

```bash
git remote add origin https://github.com/<你的 GitHub 用户名>/<仓库名>.git
git branch -M main
git add .
git commit -m "Publish theory site"
git push -u origin main
```

然后在 GitHub 仓库的 `Settings -> Pages` 里把部署来源设为 `GitHub Actions`。

之后你只需要继续更新 `研究文稿` 里的 Markdown 并再次 push，工作流就会自动重新构建并发布网站。

## 公共访问地址

如果不绑定自定义域名，默认公开地址通常是：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
```

## 自定义域名

如果你已经拥有域名：

1. 在 `site.config.json` 里填写 `repoUrl`、`siteUrl` 和 `customDomain`
2. 重新运行 `python scripts/build_site.py`
3. 提交并推送
4. 到域名服务商处把 DNS 指向 GitHub Pages

如果你还没有域名，这一步不能自动完成，因为域名注册本身涉及购买和实名流程。
