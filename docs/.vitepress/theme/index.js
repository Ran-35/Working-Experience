// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  ...DefaultTheme,
  // 如果需要覆盖组件，可以在这里添加
  // enhanceApp({ app, router, siteData }) {
  //   // 可以在这里注册全局组件等
  // }
}