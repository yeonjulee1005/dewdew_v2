const lifecycle = process.env.npm_lifecycle_event

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  ssr: false,
  target: 'static',
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Admin Page'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // css
  css: ['~/assets/scss/style.scss'],
  // plugins
  plugins: [
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 3000,
      commonjsOptions: {
        esmExternals: true
      }
    }
  },
  // build
  build: {
    transpile:
      lifecycle === 'build' || lifecycle === 'generate' ? ['element-plus', 'vue-echarts', 'resize-detector'] : ['vue-echarts', 'resize-detector']
  },
  // modules
  modules: [
    '@vueuse/nuxt'
  ],
  // build modules
  buildModules: [
    '@pinia/nuxt',
    'unplugin-icons/nuxt'
  ],
  typescript: {
    shim: false
  },
  // auto import components
  components: {
    dirs: [
      '~/components'
    ]
  },
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  // vueuse
  vueuse: {
    ssrHandlers: true
  },
  publicRuntimeConfig: {
    API_BASE_URL:
      lifecycle === 'build' || lifecycle === 'generate' ? process.env.API_LIVE_URL : process.env.API_BASE_URL
  }
}
