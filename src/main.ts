import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import setupAssets from './pluginCss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

setupAssets()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)

app.mount('#app')
