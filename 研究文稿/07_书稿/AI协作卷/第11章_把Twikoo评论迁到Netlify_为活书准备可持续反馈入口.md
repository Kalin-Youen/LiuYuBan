# 第11章 把 Twikoo 评论迁到 Netlify：为活书准备可持续反馈入口

## 一句话先说清

活书要持续生长，评论入口就不能继续卡在当前免费版 CloudBase 的套餐限制上。当前方案改为：`GitHub Pages 负责前台阅读，Netlify 负责 Twikoo 评论后端，MongoDB Atlas 负责评论数据存储。`

这次调整不是为了堆技术栈，而是为了守住一件更实际的事：让读者真的能在章节下留言，让留言能够进入整理、回写与版本更新，而不是继续停留在“评论区预留了，但实际发不出去”。

## 为什么从 CloudBase 转到 Netlify

当前站点前台托管在 GitHub Pages，而评论区最先接的是 Twikoo 的 CloudBase 方案。实测后暴露出两个问题：

1. 站点可以正常打开，但 Twikoo 初始化阶段会因为 CloudBase 浏览器侧认证链路失败而中断。
2. 当前 CloudBase 免费套餐无法添加所需的 Web 安全域名，导致 GitHub Pages 前台很难稳定完成这条访问链。

如果继续在这一点上反复打补丁，活书的反馈入口会一直被基础设施拖住。所以当前更稳的做法是把评论后端换成对静态站点更友好的 HTTP 服务型部署。

## 迁移后的最小结构

迁移完成后，结构可以压成四个点：

1. 前台仍放在 GitHub Pages，不动阅读站点主结构。
2. Twikoo 后端部署到 Netlify。
3. 评论数据放在 MongoDB Atlas。
4. 站内只保留一个需要填写的值：`site.config.json` 里的 `comments.envId`，它现在不再是腾讯云环境 ID，而是评论服务地址。

也就是说，评论区前台代码不需要换框架，只需要把原先的 CloudBase `envId` 改成一个 URL，例如：

```text
https://your-site.netlify.app/.netlify/functions/twikoo
```

## 最短部署步骤

### 第一步：准备 MongoDB Atlas

1. 创建一个免费集群。
2. 创建数据库用户，保存用户名与密码。
3. 在网络访问里允许 Netlify 访问。最省事的做法是先临时允许 `0.0.0.0/0`，后面再按需要收紧。
4. 复制连接串，整理成最终的 `MONGODB_URI`。

## 第二步：在 Netlify 部署 Twikoo 后端

优先使用 Twikoo 官方提供的 Netlify 方案，不自己手搓评论后端。这样维护成本最低，后续升级也更顺。

部署时只要抓住两件事：

1. 让 Netlify 成功部署出一个 Twikoo 函数。
2. 在环境变量里填好 `MONGODB_URI`。

部署成功后，你最终需要拿到的不是后台截图，而是这条服务地址：

```text
https://你的-netlify-站点.netlify.app/.netlify/functions/twikoo
```

## 第三步：把站点切到新评论后端

拿到服务地址后，只改一处：

```json
"comments": {
  "provider": "twikoo",
  "envId": "https://你的-netlify-站点.netlify.app/.netlify/functions/twikoo",
  "region": "",
  "lang": "zh-CN",
  "scriptUrl": "./assets/vendor/twikoo.all.min.js"
}
```

这里的要点有两个：

1. `envId` 现在填的是 HTTP 地址，不再是 CloudBase 环境 ID。
2. `region` 对 Netlify 方案不再需要，留空即可。

## 第四步：重新构建并发布前台

改完配置后，执行：

```bash
python scripts/build_site.py
```

然后把更新后的站点继续发布到 GitHub Pages。这样评论区就会从“等待配置”切换成真正可提交的游客评论区。

## 为什么这一步对活书很关键

“活书”不是一个修辞，而是一个结构要求。它至少需要四个动作连起来：

1. 读者能按章节留下反馈。
2. 评论能按线程稳定收集。
3. AI 能对评论做归并、压缩与候写分类。
4. 作者能把高价值反馈写回主线、候写清单与版本更新单。

如果第一步一直打不通，后面三步就只能停留在设想层。评论系统看起来只是网站小功能，实际上它决定了这套方法能不能形成现实里的反馈回路。

## 当前状态

当前仓库已经先做了三件事：

1. 站内评论提示改为以 Netlify 方案为主，不再继续把读者引到旧的 CloudBase 免费套餐上。
2. 评论区前端改成同时兼容 CloudBase 环境 ID 和 URL 型 `envId`。
3. 当前线上站点先进入“等待服务地址”的稳态，避免继续向读者展示已经确认打不通的旧配置。

所以现在真正缺的，只剩下这最后一步：`把 Netlify 的 Twikoo 服务地址填回 comments.envId。`

## 这一章的定位

这一章不是理论正文，而是活书基础设施的一部分。它记录的是：为了让“读者评论 -> AI 归并 -> 版本回写”这条链真的运行起来，当前项目在评论后端上做了什么现实选择。
