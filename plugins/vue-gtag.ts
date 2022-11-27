import vueGtag from 'vue-gtag'

import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(vueGtag, {
    config: {
      id: config.public.GOOGLE_FIREBASE_ID
    },
    appName: 'createdoodle'
  }, nuxtApp.$router)
})
