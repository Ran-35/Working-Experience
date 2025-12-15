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
  base: process.env.NODE_ENV === 'production' ? '/repositoriesname/' : '/docs',
  locales: {
    'root': {
      label: 'English',
      lang: 'en',
      title: "Journey of Growth",
      description: "A personal growth and development blog",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/index.md' },
          { text: 'Skill-Odyssey', link: '/skill-odyssey/skill-odyssey' },
          { text: 'Life-Insights', link: '/life-insights/skill-odyssey' },
        ],
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
