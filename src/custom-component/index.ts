import { defineAsyncComponent } from 'vue';
import type { App } from 'vue';
import ComponentList from './component-list';
// import VText from './VText/Component.vue'

const setUpComponents = (app: App) => {
  ComponentList.forEach(item => {
    const { component } = item
    app.component(component, defineAsyncComponent(() => import(`@/custom-component/${component}/Component.vue`)))
    app.component(`${component}Attr`, defineAsyncComponent(() => import(`@/custom-component/${component}/Attr.vue`)))
  })
}

export default setUpComponents