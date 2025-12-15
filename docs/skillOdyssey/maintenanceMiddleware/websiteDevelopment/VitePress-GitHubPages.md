# VitePress + GitHub Pages for Building Personal Websites  
<br>

**What is VitePress ？**  
* VitePress is a static site generator based on Vite and Vue 3, primarily used for writing documentation, blogs, and more.

* Its design goals are lightweight, fast, and simple, supporting Markdown for writing and auto-generating site structures.

* VitePress uses Vite as the build tool, which results in very fast startup and great hot-reload experience.

* It is suitable for writing technical documentation, personal blogs, or project websites.
<br>

**What is GitHub Pages ？**
* GitHub Pages is a free static website hosting service provided by GitHub.

* You can directly push static website code to a GitHub repository, and GitHub Pages will automatically deploy and generate a URL for the site.

* It is ideal for hosting personal blogs, project homepages, and documentation sites.

* No server setup required, simple configuration, and supports custom domains.

## Installation and Configuration Of VitePress
VitePress official website: VitePress：[VitePress](https://vitepress.dev/)<br>

#### 1、Install VitePress
For more details, see the official guide：[VitePress](https://vitepress.dev/guide/getting-started)

1. Install Node.js and npm
<br>
```bash
// Verify if Node.js and npm are installed
node -v
npm -v
```
If they are not installed, install them first.
<br>

2. Install VitePress 
```bash
npm add -D vitepress@next
```
Explanation:  
(1) Installs the vitepress package  
(2) Adds vitepress as a development dependency (devDependencies) in the package.json file.  

This will generate a node_modules folder and a package-lock.json file.
<br>

3. Run the installation wizard
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

#### 2、Launch VitePress
1. Start the local development server for VitePress
```bash
npm run docs:dev

or

npx vitepress dev docs
```  
2. To modify the port and server settings  
Find /docs/.vitepress/config.mts and change as follows:
```ts
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  // Development server configuration
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


#### 3、Configure VitePress
1. Configure the internationalization for VitePress  
Configuration file /docs/.vitepress/config.mts
```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Journey of Growth",
  description: "A VitePress Site",
  
  locales: {
    'root': {
      label: 'English',
      lang: 'en',
      title: "Journey of Growth",
      description: "A personal growth and development blog",
      themeConfig: {
        // Top navigation bar
        nav: [
          { text: 'Home', link: '/index.md' },
          { text: 'Skill-Odyssey', link: '/skill-odyssey/skill-odyssey' },
          { text: 'Life-Insights', link: '/life-insights/skill-odyssey' },
        ],
        // Sidebar
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
  // Development server configuration
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
  // Theme configuration
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

## GitHub Pages Installation and Configuration   
Write and then deploy.




**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
