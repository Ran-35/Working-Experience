# VitePress  + GitHub Pages 搭建个人网站  
<br>

**什么是 VitePress ？** 
* VitePress 是基于 Vite 和 Vue 3 的静态网站生成器，主要用来写文档、博客等。
* 它的设计目标是轻量、快速、简洁，支持 Markdown 写作，自动生成网站结构。
* VitePress 使用了 Vite 作为构建工具，启动速度非常快，热更新体验好。
* 适合用于写技术文档、个人博客、项目网站。 
<br>

**什么是 GitHub Pages ？**
* GitHub Pages 是 GitHub 提供的免费静态网页托管服务。
* 你可以直接把静态网站代码推送到 GitHub 仓库，GitHub Pages 会帮你自动部署并生成访问地址。
* 适合托管个人博客、项目主页、文档站点等。
* 不需要服务器、配置简单，支持自定义域名。

## VitePress 的安装及配置使用
VitePress 的官方网站：[VitePress](https://vitepress.dev/)<br>

#### 1、安装 VitePress
详情见官网：[VitePress](https://vitepress.dev/guide/getting-started)

1. 安装 Node.js 和 npm
<br>
```bash
// 验证 Node.js 和 npm 是否安装成功
node -v
npm -v
```
若没有安装则先安装
<br>

2. 安装 VitePress 
```bash
npm add -D vitepress@next
```
作用：  
(1) 安装 vitepress 包  
(2) 将 vitepress 作为开发依赖 (devDependencies) 添加到 package.json 文件中。  

结果：会生成一个文件夹 node_modules 和 一个文件 package-lock.json
<br>

3. 运行安装向导
```bash
npx vitepress init
```
```bash
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Where should VitePress look for your markdown files?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
◇  Add a prefix for VitePress npm scripts?
│  Yes
│
◇  Prefix for VitePress npm scripts:
│  docs
│
└  Done! Now run pnpm run docs:dev and start writing.
```

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

#### 2、启动 VitePress  
1. 启动 VitePress 的本地开发服务器
```bash
npm run docs:dev

或者

npx vitepress dev docs
```  
2. 若要修改端口及服务器设置  
找到 /docs/.vitepress/config.mts 文件，修改如下：
```ts
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  // 开发服务器配置
  vite: {
    server: {
      port: 3001,
      host: '0.0.0.0',
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
```


#### 3、配置 VitePress
1. 配置 VitePress 的国际化
配置文件 /docs/.vitepress/config.mts
```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Journey of Growth",
  description: "A VitePress Site",
  
  // 会根据运行命令时的环境自动设置
  // npm run dev 会自动把 process.env.NODE_ENV 设置为 "development"
  // npm run build 会自动把 process.env.NODE_ENV 设置为 "production"
  base: process.env.NODE_ENV === 'production' ? '/repositoriesname/' : '/docs',  
  locales: {
    'root': {
      label: 'English',
      lang: 'en',
      title: "Journey of Growth",
      description: "A personal growth and development blog",
      themeConfig: {
        // 上方展示的内容
        nav: [
          { text: 'Home', link: '/index.md' },
          { text: 'Skill-Odyssey', link: '/skill-odyssey/skill-odyssey' },
          { text: 'Life-Insights', link: '/life-insights/skill-odyssey' },
        ],
        // 左侧固定的内容，选择展示的文件夹
        sidebar: {
          '/skill-odyssey/': [
            {
              text: 'Fundamental Theory',
              items: [
                { text: 'Programming', link: '/skill-odyssey/programming' },
                { text: 'Design', link: '/skill-odyssey/design' },
                { text: 'Operation', link: '/skill-odyssey/languages' },
                { text: 'Infrastructure', link: '/skill-odyssey/other-skills' }
              ]
            }
          ],
          '/life-insights/': [
            {
              text: 'Personal Growth',
              items: [
                { text: 'Mindfulness', link: '/en/life-insights/mindfulness' },
                { text: 'Productivity', link: '/en/life-insights/productivity' },
                { text: 'Relationships', link: '/en/life-insights/relationships' }
              ]
            }
          ]
        }
        // 其他英文配置...
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: "成长之旅",
      description: "个人成长与发展博客",
      themeConfig: {
        nav: [
          { text: '首页', link: '/index.md' },
          { text: '技能探索', link: '/zh/skill-odyssey' },
          { text: '生活洞见', link: '/zh/life-insights' },
        ],
        sidebar: {
          '/zh/': [
            {
              text: '个人发展',
              items: [
                { text: '技能发展', link: '/zh/skill-odyssey' },
                { text: '个人成长', link: '/zh/life-insights' }
              ]
            }
          ],
          '/zh/life-insights/': [
            { text: '正念', link: '/zh/life-insights/mindfulness' },
            { text: '生产力', link: '/zh/life-insights/productivity' },
            { text: '人际关系', link: '/zh/life-insights/relationships' }
          ]
        }
      }
    }
  },
  // 开发服务器配置
  vite: {
    server: {
      port: 5173,
      host: '0.0.0.0',
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  },
  // 主题配置
  themeConfig: {
    logo: '/logo.svg',
    lastUpdated: {},
    editLink: {
      pattern: 'https://github.com/your-username/your-repo/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
```

## GitHub Pages 的安装及配置使用  
#### 1、GitHub创建仓库  
(1) 填写仓库信息  
(2) Public ->（推荐）  
(3) 不初始化 README

#### 2、本地项目下初始化Git
(1) 在项目的根目录下运行，此时会生成一个.git文件夹
```powershell
git init
```
(2) 创建deploy.yml文件：
```powershell
New-Item -ItemType File -Path .github\workflows\deploy.yml -Force
```
(3) 修改deploy.yml文件  
注：📌 最新 GitHub Pages 自定义 workflow 必须使用以下版本(2025-01)：
| Action                          | 正确版本   |
| ------------------------------- | ------ |
| `actions/configure-pages`       | **v5** |
| `actions/upload-pages-artifact` | **v4** |
| `actions/deploy-pages`          | **v4** |

```yml
name: Deploy VitePress site to Pages  # 工作流名称，可随意修改，不影响功能

on:
  push:
    branches: [main]  # 当 main 分支有推送时触发部署
  workflow_dispatch:  # 允许手动触发工作流

permissions:
  contents: read      # 允许读取仓库内容
  pages: write        # 允许写入 GitHub Pages
  id-token: write     # 用于 GitHub Pages 部署的身份验证

concurrency:
  group: pages        # 避免同时运行多个部署
  cancel-in-progress: false  # 不取消正在运行的部署

jobs:
  build:
    runs-on: ubuntu-latest  # 使用最新的 Ubuntu 虚拟环境

    steps:
      - name: Checkout
        uses: actions/checkout@v4  # 检出仓库代码
        with:
          fetch-depth: 0           # 获取完整 git 历史，必要时（比如版本标签）用

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24        # Node.js 版本，可根据项目需要修改
          cache: npm              # 启用 npm 缓存，加快构建速度

      - name: Setup Pages
        uses: actions/configure-pages@v5  # 配置 GitHub Pages 相关权限

      - name: Install dependencies
        run: npm ci  # 安装依赖，保证干净的安装（推荐用于 CI）

      - name: Build with VitePress
        run: npm run docs:build  
        # 构建 VitePress 网站
        # ⚠️ 注意：这里命令要与你 package.json 中的构建命令一致
        # 如果你是 npm run build 或 npm run docs:build，则按实际修改

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: docs/.vitepress/dist  
          # ⚠️ 注意：这里是构建输出目录
          # 默认 VitePress 生成的 dist 文件夹在 .vitepress/dist 或 docs/.vitepress/dist
          # 根据你的项目结构修改

  deploy:
    environment:
      name: github-pages  # GitHub Pages 环境名，通常无需改
      url: ${{ steps.deployment.outputs.page_url }}  # 自动获取部署 URL
    runs-on: ubuntu-latest
    needs: build  # 依赖 build 任务完成后再执行

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4  # 将构建好的站点部署到 GitHub Pages

```
(4) 添加远程仓库：
```powershell
# 添加远程仓库：
git remote add origin https://github.com/username/repositoriesname.git

# 检查远程仓库是否添加成功
git remote -v 
```
```powershell
# 若添加成功应该会有如下输出：
origin  https://github.com/username/repositoriesname.git (fetch)
origin  https://github.com/username/repositoriesname.git (push)
```
(5)提交代码并推送到 GitHub
```powershell
# 1. 将当前目录下的所有更改添加到暂存区
git add .
# 2. 提交更改到本地 Git 仓库，附带提交信息 "Initial commit"
git commit -m "Initial commit"
# 3. 将当前分支重命名为 'main'
git branch -M main
# 4. 将本地 'main' 分支的内容推送到远程仓库 'origin'
git push -u origin main
```
注：可能会提示如下错误
```powershell
# 1. fatal: detected dubious ownership in repository at 'D:/Home-Website'
# 原因：Git 2.35+ 版本在 Windows 上的安全提示：Git 发现当前仓库的所有者和你当前登录的用户不同，所以出于安全考虑拒绝操作。
# 解决：这条命令会告诉 Git：“这个目录可以信任”
git config --global --add safe.directory D:/Home-Website 

# 2. Author identity unknown
# 原因：Git 还不知道你的用户名和邮箱，所以无法提交。
# 解决：配置全局用户名和邮箱(若只想针对该项目，可以去掉 --global)
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```
(6)启用 GitHub Pages  
1. 点击 "Settings" → "Pages"
2. "Build and deployment" -> "Branch" -> "选择分支" -> "选择文件夹"

(7)若无法自动推送并执行工作流  
1. 点击 "Action" -> 选择自己在deploy.yml中定义的工作流名字
2. 点击 "Run workflow" 执行该工作流