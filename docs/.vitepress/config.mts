import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Journey of Growth",
  description: "A VitePress Site",
  lang: 'zh-CN',
  base: process.env.NODE_ENV === 'production' ? '/Working-Experience/' : '/docs',

  // 页面配置
  locales: {
    root: {
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
                { text: '第三方工具', link: '/zh/skillOdyssey/programmingWay/Plugin/EasyExcel' }
              ],
            },
            // 算法与设计模式
            {
              text: '思维之源',
              items: [
                { text: '设计模式', link: '/zh/skillOdyssey/thoughtSource/designPatterns/design-patterns' }
              ]
            },
            // 硬件与运维
            {
              text: '运维之路',
              items: [
                { text: '网站搭建流程', link: '/zh/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' },
                { text: '版本控制', link: '/zh/skillOdyssey/maintenanceMiddleware/versionControl/Version-Control' },
                { text: '软件及插件', link: '/zh/skillOdyssey/maintenanceMiddleware/softWarePlugins/Software' },
              ]
            },
            // 基础 理论
            {
              text: '基础之本',
              items: []
            },
            // 业务 与 文档撰写等
            {
              text: '文笔之韵',
              items: [
                { text: '文档撰写', link: '/zh/skillOdyssey/businessRhythm/documentComposition/ProjectAndDesign' },
                { text: '微电网业务', link: '/zh/skillOdyssey/businessRhythm/businessLearning/Microgrid-related' },
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
    },

    en: {
      label: 'English',
      lang: 'en',
      title: "Journey of Growth",
      description: "A personal growth and development blog",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/index.md' },
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
                { text: 'Java', link: '/en/skillOdyssey/programmingWay/JavaBased/Lock-Mechanism' },
                { text: 'Plugins', link: '/en/skillOdyssey/programmingWay/Plugin/EasyExcel' }
              ],
            },
            // 算法与设计模式
            {
              text: 'Computational Thinking',
              items: [
                { text: 'Design Patterns', link: '/en/skillOdyssey/thoughtSource/designPatterns/design-patterns' },
              ]
            },
            // 硬件与运维
            {
              text: 'Operations and Maintenance',
              items: [
                { text: 'Website Develop', link: '/en/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' },
                { text: 'Version Control', link: '/en/skillOdyssey/maintenanceMiddleware/versionControl/Version-Control' },
                { text: 'Software & Plugins', link: '/en/skillOdyssey/maintenanceMiddleware/softWarePlugins/Software' },
              ]
            },
            // 基础 理论
            {
              text: 'Theoretical Foundation',
              items: [
              ]
            },
            // 业务 与 文档撰写等
            {
              text: 'Content Writing',
              items: [
                { text: 'Documentation', link: '/en/skillOdyssey/businessRhythm/documentComposition/ProjectAndDesign' },
                { text: 'Microgrid', link: '/en/skillOdyssey/businessRhythm/businessLearning/Microgrid-related' },
              ]
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
                { text: 'IO/NIO', link: '/en/skillOdyssey/programmingWay/JavaBased/IO-NIO' }
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
          ],
          '/en/skillOdyssey/programmingWay/Plugin/': [
            {
              text: 'Plugins',
              items: [
                { text: 'EasyExcel', link: '/en/skillOdyssey/programmingWay/Plugin/EasyExcel' }
              ]
            }
          ],

          // 算法与设计模式
          // 1.设计模式的左侧栏
          '/en/skillOdyssey/thoughtSource/designPatterns/': [
            {
              text: 'Design Patterns',  // 设计模式
              link: '/en/skillOdyssey/thoughtSource/designPatterns/Design-Patterns',
              items: [
                { text: 'Creational - Singleton', link: '/en/skillOdyssey/thoughtSource/designPatterns/Singleton' },  // 创建型-单例模式
                { text: 'Creational - Factory Method', link: '/en/skillOdyssey/thoughtSource/designPatterns/Factory-Method' },  // 创建型-工厂方法模式
                { text: 'Creational - Builder', link: '/en/skillOdyssey/thoughtSource/designPatterns/Builder' },  // 创建型-建造者模式
                { text: 'Creational - Prototype', link: '/en/skillOdyssey/thoughtSource/designPatterns/Prototype' },  // 创建型-原型模式
                { text: 'Structural - Adapter', link: '/en/skillOdyssey/thoughtSource/designPatterns/Adapter' },  // 结构型-适配器模式
                { text: 'Structural - Bridge', link: '/en/skillOdyssey/thoughtSource/designPatterns/Bridge' },  // 结构型-桥接模式
              ]
            }
          ],



          // 硬件与运维
          // 1.个人网站搭建页面的左侧栏
          '/en/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages': [
            { text: 'VitePress + GithubPages', link: '/en/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' },
            { text: 'Other', link: '/zh/skillOdyssey/maintenanceMiddleware/websiteDevelopment/VitePress-GitHubPages' }
          ],
          // 2.版本控制界面的左侧栏
          '/en/skillOdyssey/maintenanceMiddleware/versionControl/': [
            {
              text: 'Git',
              items: [
                { text: 'Git', link: '' },
                { text: 'GitHub', link: '' },
                { text: 'GitLab', link: '' },
                { text: 'Gitee', link: '' }
              ]
            },
            {
              text: 'SVN', link: '/en/skillOdyssey/maintenanceMiddleware/versionControl/Version-Control',
              items: [
                { text: 'TortoiseSVN', link: '/en/skillOdyssey/maintenanceMiddleware/versionControl/TortoiseSVN' },
                { text: 'GitHub', link: '' },
                { text: 'GitLab', link: '' },
                { text: 'Gitee', link: '' }
              ]
            }
          ],
          // 3.软件及插件的左侧栏
          '/en/skillOdyssey/maintenanceMiddleware/softwarePlugins': [
            {
              text: 'Commonly Used',
              items: [
                { text: 'Java & Idea', link: '/en/skillOdyssey/maintenanceMiddleware/softwarePlugins/JavaDev' },
                { text: 'Maven', link: '/en/skillOdyssey/maintenanceMiddleware/softwarePlugins/Maven' }
              ]
            }
          ],

          // 业务与文档撰写
          // 1.文档撰写的左侧栏
          '/en/skillOdyssey/businessRhythm/documentComposition/': [
            {
              text: 'Formatting Requirements',  // 格式要求
              items: [
                { text: 'Project Proposal and Design Plan', link: '/en/skillOdyssey/businessRhythm/documentComposition/ProjectAndDesign' },  // 项目书及设计方案
                { text: 'Technical Proposal and Design Documentation', link: '/en/skillOdyssey/businessRhythm/documentComposition/TechnicalAndDesign' }  // 技术方案及设计文档
              ]
            }
          ],
          // 2.微电网学习的左侧栏
          '/en/skillOdyssey/businessRhythm/businessLearning/': [
            {
              text: 'Microgrid Business',
              items: [
                { text: 'Concepts and Terminology', link: '/en/skillOdyssey/businessRhythm/businessLearning/Microgrid-Related' },
                { text: 'Power Control', link: '/en/skillOdyssey/businessRhythm/businessLearning/Microgrid-Control' },
                { text: 'Photovoltaic Systems', link: '/en/skillOdyssey/businessRhythm/businessLearning/Microgrid-PV' },
                { text: 'Energy Storage Systems', link: '/en/skillOdyssey/businessRhythm/businessLearning/Microgrid-ES' }
              ]
            },
            {
              text: 'Power System Business',
              items: [
                { text: 'Concepts and Terminology', link: '/en/skillOdyssey/businessRhythm/businessLearning/Relevant-Terminology' },
                { text: 'Technical Solutions and Design Documents', link: '/en/skillOdyssey/businessRhythm/documentComposition/TechnicalAndDesign' }
              ]
            }
          ]

          // 其他中文配置...
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