// import { defineAsyncComponent } from 'vue';
import type { App } from 'vue';
import ComponentList from './component-list';
import VText from './VText/Component.vue'

const setUpComponents = (app: App) => {
  ComponentList.forEach(item => {
    // const { component } = item
    // app.component(component, () => defineAsyncComponent(() =>
    //   import(`@/custom-component/${component}/Component.vue`)
    // ))
    app.component('VText', VText)
  })
}

export default setUpComponents