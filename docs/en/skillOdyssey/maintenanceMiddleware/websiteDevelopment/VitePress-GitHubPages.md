# VitePress + GitHub Pages to Build a Personal Website

---

### **What is VitePress?**

* **VitePress** is a static site generator based on **Vite** and **Vue 3**, mainly used for writing documentation, blogs, and other content.
* It is designed to be **lightweight**, **fast**, and **simple**, supporting **Markdown** writing, and automatically generating the structure of the site.
* VitePress uses **Vite** as the build tool, which makes the startup speed extremely fast and provides an excellent hot-reload experience.
* It is suitable for creating **technical documentation**, **personal blogs**, **project websites**, etc.

---

### **What is GitHub Pages?**

* **GitHub Pages** is a free static web hosting service provided by GitHub.
* You can directly push your static site code to a GitHub repository, and GitHub Pages will automatically deploy it and generate an accessible URL.
* It is ideal for hosting personal blogs, project homepages, documentation sites, and more.
* No server is needed, configuration is simple, and custom domain names are supported.

---

## Installation and Configuration of VitePress

**VitePress Official Website**: [VitePress](https://vitepress.dev/)

#### 1. Install VitePress

**1.1 Install Node.js and npm**

Check if Node.js and npm are installed:

```bash
node -v
npm -v
```

If not installed, please first install Node.js.

**1.2 Install VitePress**

Install VitePress using:

```bash
npm add -D vitepress@next
```

This will:

* Install the `vitepress` package
* Add VitePress as a development dependency (`devDependencies`) to your `package.json` file.

After installation, `node_modules` folder and `package-lock.json` file will be generated.

**1.3 Run the Installation Wizard**

Run the command:

```bash
npx vitepress init
```

The installation wizard will prompt with the following:

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

#### 2. Start VitePress

**2.1 Start the Local Development Server**

Run the following command:

```bash
npm run docs:dev
```

Or:

```bash
npx vitepress dev docs
```

**2.2 Modify Port and Server Settings**

Open `/docs/.vitepress/config.mts` and modify the following configuration:

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

#### 3. Configure VitePress

**3.1 Configure Localization**

Edit the `/docs/.vitepress/config.mts` file to configure localization:

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
**3.2 Configuration Entry**

Due to internationalization configuration, the root path in mts has been modified to zh. Therefore, the entry point needs to be rewritten to redirect accordingly. In the index.md file under the docs folder:
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

## Installation and Configuration of GitHub Pages

#### 1. Create a GitHub Repository

1. Create a new repository.
2. Choose **Public**, and do not initialize with a **README** file.

#### 2. Initialize Git in the Local Project

Run the following command in the root directory of the project:

```bash
git init
```

**2.1 Create `deploy.yml` File**

```bash
New-Item -ItemType File -Path .github\workflows\deploy.yml -Force
```

**2.2 Modify `deploy.yml` File**

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

**2.3 Add Remote Repository and Push Code**

```bash
git remote add origin https://github.com/username/repositoriesname.git  # Add remote repository
git remote -v                                                        # Verify remote repository added successfully

# The output should be:
# origin  https://github.com/username/repositoriesname.git (fetch)
# origin  https://github.com/username/repositoriesname.git (push)
````

```bash
git add .                        # 1. Add all changes in the current directory to the staging area
git commit -m "Initial commit"   # 2. Commit changes to the local Git repository with the message "Initial commit"
git branch -M main               # 3. Rename the current branch to 'main'
git push -u origin main          # 4. Push the 'main' branch from the local repository to the remote repository
```

**2.4 Enable GitHub Pages**

1. Go to the **Settings** of your GitHub repository → **Pages**.
2. In **Build and deployment**, select **Branch** and **Folder**, and then enable GitHub Pages.

---

### If the Workflow Fails to Trigger Automatically

1. Click on **Action**.
2. Select the workflow name defined in `deploy.yml`.
3. Click on **Run workflow** to trigger the workflow manually.
