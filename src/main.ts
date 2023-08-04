import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import setupAssets from './pluginCss'

setupAssets()

const app = createApp(App)


app.use(ElementPlus)

app.mount('#app')