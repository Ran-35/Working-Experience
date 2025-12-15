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
        // 英文主题配置保持不变

        // 上方展示的内容
        nav: [
          { text: 'Home', link: '/index.md' },
          { text: 'Skill-Odyssey', link: '/skillOdyssey/skill-odyssey' },
          { text: 'Life-Insights', link: '/lifeInsights/skill-odyssey' },
        ],

        // 左侧固定的内容，选择展示的文件夹
        sidebar: {
          '/skillOdyssey/': [
            // 开发技能
            {
              text: 'Skill Development',
              items: [
                { text: 'Java Basics', link: '/skillOdyssey/programming' },
                { text: 'Spring', link: '/skillOdyssey/design' },
                { text: 'Mysql', link: '/skillOdyssey/languages' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ]
            },
            // 算法与设计模式
            {
              text: 'Algorithms and Patterns',
              items: [
                { text: 'Programming', link: '/skillOdyssey/programming' },
                { text: 'Design', link: '/skillOdyssey/design' },
                { text: 'Operation', link: '/skillOdyssey/languages' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ]
            },
            // 硬件与运维
            {
              text: 'Maintenance and Middleware',
              items: [
                { text: 'Website Development', link: '/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' },
                { text: 'Version Control', link: '/skillOdyssey/maintenanceMiddleware/versionControl/Version-Control' },
                { text: 'Operation', link: '/skillOdyssey/languages' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ]
            },
            // 基础 理论
            {
              text: 'Fundamental Theory',
              items: [
                { text: 'Programming', link: '/skillOdyssey/programming' },
                { text: 'Design', link: '/skillOdyssey/design' },
                { text: 'Operation', link: '/skillOdyssey/languages' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ]
            }
          ],
          '/lifeInsights/': [
            {
              text: 'Personal Growth',
              items: [
                { text: 'Mindfulness', link: '/en/lifeInsights/mindfulness' },
                { text: 'Productivity', link: '/en/lifeInsights/productivity' },
                { text: 'Relationships', link: '/en/lifeInsights/relationships' }
              ]
            }
          ],
          '/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages': [
            {
              items: [
                { text: 'VitePress + GithubPages', link: '/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' },
                { text: '其他方式', link: '' }
              ]
            }
          ],
          // 版本控制界面的左侧栏
          '/skillOdyssey/maintenanceMiddleware/versionControl/': [
            {
              text: 'Git Version Control',
              items: [
                { text: 'Git', link: '' },
                { text: 'GitHub', link: '' },
                { text: 'GitLab', link: '' },
                { text: 'Gitee', link: '' }
              ]
            },
            {
              text: 'Subversion Version Control',
              items: [
                { text: 'TortoiseSVN', link: '/zh/skillOdyssey/maintenanceMiddleware/versionControl/TortoiseSVN' },
                { text: 'GitHub', link: '' },
                { text: 'GitLab', link: '' },
                { text: 'Gitee', link: '' }
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
        // 中文主题配置保持不变
        nav: [
          { text: '首页', link: '/index.md' },
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
                { text: 'Java基础', link: '/zh/skillOdyssey/programmingWay/JavaBased/Lock-Mechanism' },
                { text: '第三方工具', link: '/zh/skillOdyssey/programmingWay/Plugin/EasyExcel' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ],
            },
            // 算法与设计模式
            {
              text: '思维之源',
              items: [
                { text: '设计模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/design-patterns' },
                { text: 'Design', link: '/skillOdyssey/design' },
                { text: 'Operation', link: '/skillOdyssey/languages' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ]
            },
            // 硬件与运维
            {
              text: '运维之路',
              items: [
                { text: '网站搭建流程', link: '/zh/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' },
                { text: '版本控制', link: '/zh/skillOdyssey/maintenanceMiddleware/versionControl/Version-Control' },
                { text: '软件及插件', link: '/zh/skillOdyssey/maintenanceMiddleware/softWarePlugins/Software' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ]
            },
            // 基础 理论
            {
              text: '基础之本',
              items: [
                { text: 'Programming', link: '/skillOdyssey/programming' },
                { text: 'Design', link: '/skillOdyssey/design' },
                { text: 'Operation', link: '/skillOdyssey/languages' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
              ]
            },
            // 业务 与 文档撰写等
            {
              text: '文笔之韵',
              items: [
                { text: '文档撰写', link: '/zh/skillOdyssey/businessRhythm/documentComposition/ProjectAndDesign' },
                { text: '微电网业务', link: '/zh/skillOdyssey/businessRhythm/businessLearning/Microgrid-related' },
                { text: 'Operation', link: '/skillOdyssey/languages' },
                { text: 'Infrastructure', link: '/skillOdyssey/other-skills' }
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
                { text: '输入/输出', link: '/zh/skillOdyssey/programmingWay/JavaBased/IO-NIO' }
              ]
            },
            {
              text: '并发编程',
              items: [
                { text: '锁机制', link: '/zh/skillOdyssey/programmingWay/JavaBased/Lock-Mechanism' },
                { text: '多线程', link: '/zh/skillOdyssey/programmingWay/JavaBased/Multithreading' },
                { text: '线程池', link: '/zh/skillOdyssey/programmingWay/JavaBased/Thread-Pooling' },
                { text: '并发工具包', link: '/zh/skillOdyssey/programmingWay/JavaBased/Concurrent-Toolkit' },
              ]
            }
          ],
          '/zh/skillOdyssey/programmingWay/Plugin/': [
            {
              text: '第三方工具',
              items: [
                { text: 'EasyExcel', link: '/zh/skillOdyssey/programmingWay/Plugin/EasyExcel' }
              ]
            }
          ],



          // 算法与设计模式
          // 1.设计模式的左侧栏
          '/zh/skillOdyssey/thoughtSource/designPatterns/': [
            {
              text: '设计模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/Design-Patterns',
              items: [
                { text: '创建型-单例模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/Singleton' },
                { text: '创建型-工厂方法模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/Factory-Method' },
                { text: '创建型-建造者模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/Builder' },
                { text: '创建型-原型模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/Prototype' },
                { text: '结构型-适配器模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/Adapter' },
                { text: '结构型-桥接模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/Bridge' },
              ]
            }
          ],


          // 硬件与运维
          // 1.个人网站搭建页面的左侧栏
          '/zh/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages': [
            { text: 'VitePress + GithubPages', link: '/zh/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' },
            { text: '其他方式', link: '' }
          ],
          // 2.版本控制界面的左侧栏
          '/zh/skillOdyssey/maintenanceMiddleware/versionControl/': [
            {
              text: 'Git 版本控制',
              items: [
                { text: 'Git', link: '' },
                { text: 'GitHub', link: '' },
                { text: 'GitLab', link: '' },
                { text: 'Gitee', link: '' }
              ]
            },
            {
              text: 'SVN 版本控制', link: '/zh/skillOdyssey/maintenanceMiddleware/versionControl/Version-Control',
              items: [
                { text: 'TortoiseSVN', link: '/zh/skillOdyssey/maintenanceMiddleware/versionControl/TortoiseSVN' },
                { text: 'GitHub', link: '' },
                { text: 'GitLab', link: '' },
                { text: 'Gitee', link: '' }
              ]
            }
          ],
          // 3.软件及插件的左侧栏
          '/zh/skillOdyssey/maintenanceMiddleware/softwarePlugins': [
            {
              text: '常用软件',
              items: [
                { text: 'Java 开发环境', link: '/zh/skillOdyssey/maintenanceMiddleware/softwarePlugins/JavaDev' },
                { text: 'Maven 模块', link: '/zh/skillOdyssey/maintenanceMiddleware/softwarePlugins/Maven' }
              ]
            }
          ],

          // 业务与文档撰写
          // 1.文档撰写的左侧栏
          '/zh/skillOdyssey/businessRhythm/documentComposition/': [
            {
              text: '格式要求',
              items: [
                { text: '项目书及设计方案', link: '/zh/skillOdyssey/businessRhythm/documentComposition/ProjectAndDesign' },
                { text: '技术方案及设计文档', link: '/zh/skillOdyssey/businessRhythm/documentComposition/TechnicalAndDesign' }
              ]
            }
          ],
          // 2.微电网学习的左侧栏
          '/zh/skillOdyssey/businessRhythm/businessLearning/': [
            {
              text: '微电网业务',
              items: [
                { text: '概念及术语', link: '/zh/skillOdyssey/businessRhythm/businessLearning/Microgrid-Related' },
                { text: '电力控制', link: '/zh/skillOdyssey/businessRhythm/businessLearning/Microgrid-Control' },
                { text: '光伏系统', link: '/zh/skillOdyssey/businessRhythm/businessLearning/Microgrid-PV' },
                { text: '储能系统', link: '/zh/skillOdyssey/businessRhythm/businessLearning/Microgrid-ES' }
              ]
            },
            {
              text: '电力系统业务',
              items: [
                { text: '概念及术语', link: '/zh/skillOdyssey/businessRhythm/businessLearning/Relevant-Terminology' },
                { text: '技术方案及设计文档', link: '/zh/skillOdyssey/businessRhythm/documentComposition/TechnicalAndDesign' }
              ]
            }
          ]
        },
        // 其他中文配置...
      }
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/Working-Experience/' : '/docs',
  vite: {
    server: {
      port: 5173,
      host: '0.0.0.0',
      open: true,
      // https: false,
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
    },
    outline: {
      level: 'deep',
      label: 'On this page'
    }
  },

  markdown: {
    math: true
  }


})