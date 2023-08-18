import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import setupAssets from './pluginCss'
import setUpComponents from './custom-component' // 注册自定义组件

const app = createApp(App)

setupAssets()
setUpComponents(app)

app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')
