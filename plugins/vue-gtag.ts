import vueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueGtag, {
    config: {
      id: 'G-46S77LEC56'
    },
    appName: 'createdoodle'
  }, nuxtApp.$router)
})
