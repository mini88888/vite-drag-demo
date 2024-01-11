import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import setupAssets from './pluginCss'
import setUpComponents from './custom-component' // 注册自定义组件

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }


setupAssets()
setUpComponents(app)

app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')
