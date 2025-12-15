# TortoiseSVN  
<br>

**什么是 TortoiseSVN ？**  
TortoiseSVN 是一个基于 Subversion (SVN) 的版本控制系统的图形化客户端。它的主要功能是提供一个直观易用的界面，帮助用户进行版本管理，而无需使用命令行工具。
<br>

## TortoiseSVN 的
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
写完再部署




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
