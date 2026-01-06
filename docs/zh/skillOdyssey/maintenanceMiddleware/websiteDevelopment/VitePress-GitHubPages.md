# VitePress + GitHub Pages 搭建个人网站

---

### **什么是 VitePress？**

* **VitePress** 是基于 **Vite** 和 **Vue 3** 的静态网站生成器，主要用于写文档、博客等内容。
* 它的设计目标是**轻量**、**快速**、**简洁**，支持 **Markdown** 写作，并能自动生成网站结构。
* VitePress 使用 **Vite** 作为构建工具，启动速度非常快，热更新体验优秀。
* 适合用来创建**技术文档**、**个人博客**、**项目网站**等。

---

### **什么是 GitHub Pages？**

* **GitHub Pages** 是 GitHub 提供的免费静态网页托管服务。
* 你可以直接把静态网站代码推送到 GitHub 仓库，GitHub Pages 会帮你自动部署并生成访问地址。
* 适合托管个人博客、项目主页、文档站点等。
* 不需要服务器，配置简单，支持自定义域名。

---

## VitePress 的安装及配置使用

**VitePress 官网**：[VitePress](https://vitepress.dev/)

#### 1、安装 VitePress

**1.1 安装 Node.js 和 npm**

验证 Node.js 和 npm 是否安装成功：

```bash
node -v
npm -v
```

如果没有安装，请先安装 Node.js。

**1.2 安装 VitePress**

安装 VitePress：

```bash
npm add -D vitepress@next
```

这将：

* 安装 `vitepress` 包
* 将 VitePress 作为开发依赖 (`devDependencies`) 添加到 `package.json` 文件中。

安装完成后，会生成 `node_modules` 文件夹和 `package-lock.json` 文件。

**1.3 运行安装向导**

运行命令：

```bash
npx vitepress init
```

安装向导交互内容如下：

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

---

#### 2、启动 VitePress

**2.1 启动本地开发服务器**

运行命令：

```bash
npm run docs:dev
```

或者：

```bash
npx vitepress dev docs
```

**2.2 修改端口及服务器设置**

找到 `/docs/.vitepress/config.mts` 文件，修改如下配置：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
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

---

#### 3、配置 VitePress

**3.1 配置国际化**

修改 `/docs/.vitepress/config.mts` 文件进行国际化配置：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Journey of Growth",
  description: "A VitePress Site",
  lang: 'zh-CN',
  base: process.env.NODE_ENV === 'production' ? '/Working-Experience/' : '/',

  // 页面配置
  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: "成长之旅",
      description: "个人成长与发展博客",
      themeConfig: {
        // 中文主题配置保持不变
        nav: [
          { text: '首页', link: '/zh/index' },
          { text: '技能探索', link: '/zh/skillOdyssey/skill-odyssey' },
          { text: '生活洞见', link: '/zh/lifeInsights' },
        ],
        sidebar: {
          '/zh/': [
            {
              text: '个人发展',
              items: [
                { text: '技能发展', link: '/zh/skillOdyssey' },
                { text: '个人成长', link: '/zh/lifeInsights' }
              ]
            }
          ],
          '/zh/skillOdyssey/': [
            // 编程技能
            {
              text: '编程之道',
              items: [
                { text: 'Java基础', link: '/zh/skillOdyssey/programmingWay/JavaBased/1.1.IO-NIO' },
                { text: '第三方工具', link: '/zh/skillOdyssey/programmingWay/Plugin/EasyExcel' }
              ],
            },
            // 算法与设计模式
            {
              text: '思维之源',
              items: [
                { text: '设计模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/design-patterns' }
              ]
            }
          ],
          '/zh/lifeInsights/': [
            { text: '正念', link: '/zh/lifeInsights/mindfulness' },
            { text: '生产力', link: '/zh/lifeInsights/productivity' },
            { text: '人际关系', link: '/zh/lifeInsights/relationships' }
          ],

          // 程序设计
          // 1.Java基础的左侧栏
          '/zh/skillOdyssey/programmingWay/JavaBased/': [
            {
              text: '基础知识',
              items: [
                { text: '输入/输出', link: '/zh/skillOdyssey/programmingWay/JavaBased/1.1.IO-NIO' }
              ]
            },
            {
              text: '并发编程',
              items: [
                { text: '锁机制', link: '/zh/skillOdyssey/programmingWay/JavaBased/2.Lock-Mechanism' }
              ]
            }
          ]
        // 其他中文配置...
      }
    },

    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: "Journey of Growth",
      description: "A personal growth and development blog",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/index' },
          { text: 'Skill-Odyssey', link: '/en/skillOdyssey/skill-odyssey' },
          { text: 'Life-Insights', link: '/en/lifeInsights' }
        ],
        sidebar: {
          '/en/': [
            {
              text: '个人发展',
              items: [
                { text: '技能发展', link: '/en/skillOdyssey' },
                { text: '个人成长', link: '/en/lifeInsights' }
              ]
            }
          ],
          '/en/skillOdyssey/': [
            // 编程之道
            {
              text: 'Programming Skills',
              items: [
                { text: 'Java', link: '/en/skillOdyssey/programmingWay/JavaBased/1.1.IO-NIO' },
                { text: 'Plugins', link: '/en/skillOdyssey/programmingWay/Plugin/EasyExcel' }
              ],
            }
          ],
          '/en/lifeInsights/': [
            { text: '正念', link: '/en/lifeInsights/mindfulness' },
            { text: '生产力', link: '/en/lifeInsights/productivity' },
            { text: '人际关系', link: '/en/lifeInsights/relationships' }
          ],


          // 程序设计
          // 1.Java基础的左侧栏
          '/en/skillOdyssey/programmingWay/JavaBased/': [
            {
              text: 'Base Knowledge',           // Java基础
              items: [
                { text: 'IO/NIO', link: '/en/skillOdyssey/programmingWay/JavaBased/1.1.IO-NIO' },
                { text: 'Annotation', link: '/en/skillOdyssey/programmingWay/JavaBased/1.2.Annotation' }
              ]
            },
            {
              text: 'Concurrency Programming',  // 并发编程
              items: [
                { text: 'Lock Mechanism', link: '/en/skillOdyssey/programmingWay/JavaBased/Lock-Mechanism' },  // 锁机制
                { text: 'Multithreading', link: '/en/skillOdyssey/programmingWay/JavaBased/Multithreading' },  // 多线程
                { text: 'Thread Pooling', link: '/en/skillOdyssey/programmingWay/JavaBased/Thread-Pooling' },  // 线程池
                { text: 'Concurrent Toolkit', link: '/en/skillOdyssey/programmingWay/JavaBased/Concurrent-Toolkit' },  // 并发工具包
              ]
            }
          ]
          // 其他英文配置...
        }
      }
    },

  },
  // vite服务器配置
  vite: {
    server: {
      // 配置开发服务器的端口、主机名
      port: 5173,
      host: '0.0.0.0',
      open: true,  // 设置为 true 时，Vite 会在启动开发服务器后自动打开浏览器访问该页面。

      // 是否启用 https（默认是 false）
      // https: false,

      // 配置代理
      proxy: {
        '/api': {
          target: 'http://localhost:8080',  // 将请求以 `/api` 开头的路径代理到 http://localhost:8080
          changeOrigin: true,               // 设置为 true 时，代理服务器会修改请求的 Origin 为目标服务器的地址。
          rewrite: (path) => path.replace(/^\/api/, ''),  // 将路径中的 `/api` 前缀去掉。例如请求 `/api/users` 会被重写为 `/users`，然后代理到 `http://localhost:8080/users`。
        }
      }
    }
  },

  // 定制网站的主题和功能
  themeConfig: {
    logo: '/logo.svg',// 设置了站点的 logo
    lastUpdated: {},  // 启用页面的最后更新时间显示
    editLink: {
      pattern: 'https://github.com/your-username/your-repo/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    // 控制页面的 目录大纲
    outline: {
      level: 'deep',  // 'shallow'：只显示顶级标题和二级标题。'deep'：显示更深的层级，通常会包含三级标题
      label: 'On this page'
    }
  },

  // 启用markdown 配置
  markdown: {
    math: true  // 启用 数学公式支持
  }
  
})
```

**3.2 配置入口**

由于配置国际化，mts中的root路径已经被修改为zh，所以需要重新编写入口，使其跳转过去。在docs下的index.md文件里：
```md
---
layout: home
---

<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vitepress'

const { go } = useRouter()

onBeforeMount(() => {
  // 生产环境跳转需要考虑 base，开发环境直接跳 /zh/
  const base = import.meta.env.BASE_URL
  window.location.replace(`${base}zh/`)
})
</script>
```
---

## GitHub Pages 的安装及配置使用

#### 1、GitHub创建仓库

1. 创建一个新的仓库。
2. 选择 **Public**，不初始化 **README** 文件。

#### 2、本地项目下初始化 Git

在项目根目录下运行命令：

```bash
git init
```

**2.1 创建 deploy.yml 文件**

```bash
New-Item -ItemType File -Path .github\workflows\deploy.yml -Force
```

**2.2 修改 deploy.yml 文件**

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

**2.3 添加远程仓库并推送代码**

```bash
git remote add origin https://github.com/username/repositoriesname.git	# 添加远程仓库
git remote -v 															# 检查远程仓库是否添加成功

# 若添加成功应该会有如下输出：
# origin  https://github.com/username/repositoriesname.git (fetch)
# origin  https://github.com/username/repositoriesname.git (push)
```

```bash
git add .						# 1. 将当前目录下的所有更改添加到暂存区
git commit -m "Initial commit"	# 2. 提交更改到本地 Git 仓库，附带提交信息 "Initial commit"
git branch -M main				# 3. 将当前分支重命名为 'main'
git push -u origin main			# 4. 将本地 'main' 分支的内容推送到远程仓库 'origin'
````

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

**2.4 启用 GitHub Pages**

1. 进入 GitHub 仓库 **Settings** → **Pages**。
2. 在 **Build and deployment** 中选择 **Branch** 和 **Folder**，然后启用 GitHub Pages。

---

### 若无法自动推送并执行工作流

1. 点击 **Action**。
2. 选择自己在 `deploy.yml` 中定义的工作流名称。
3. 点击 **Run workflow** 执行该工作流。
