import { defineNuxtPlugin } from 'nuxt/app'
import ElementPlus from 'element-plus'
import ko from 'element-plus/es/locale/lang/ko'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin((nuxtApp) => {
  // ElementPlus
  nuxtApp.vueApp.use(ElementPlus, {
    locale: ko
    // size: 'small',
    // zIndex: 3000
  })
  // ElementPlus Icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component)
  }
})
