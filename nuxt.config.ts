const lifecycle = process.env.npm_lifecycle_event

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  routes: {
    '/_nuxt/**': { Headers: { 'cache-control': 's-maxage=0' } },
    '/blog/*/*': { static: true }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0',
      title: 'Dewdew',
      htmlAttrs: {
        lang: 'ko'
      },
      meta: [
        { name: 'Author', content: 'Dewdew' },
        { name: 'description', content: '안녕하세요. FE 개발자 이연주입니다.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#705757' },
        { name: 'keywords', content: 'developer,develop,web,portfolio,개발자,FE웹개발자,웹개발자,포트폴리오,개발자 포트폴리오' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'FE 개발자 이연주' },
        { property: 'og:url', content: 'https://dewdew.kr' },
        { property: 'og:image', content: 'https://dewdew.kr/img/resume_img.cde4e42c.jpg' },
        { property: 'og:description', content: '안녕하세요. FE 개발자 이연주입니다.' },
        { property: 'Imagetoolbar', content: 'no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  loadingIndicator: {
    name: 'chasing-dots',
    color: 'purple',
    background: 'green'
  },
  // css
  css: ['~/assets/scss/style.scss'],
  // plugins
  plugins: [
    { src: '~/plugins/vercel.ts', mode: 'client' }
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
      lifecycle === 'build' || lifecycle === 'generate' ? ['element-plus'] : []
  },
  // modules
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/robots'
  ],
  // build modules
  buildModules: [
    '@nuxtjs/pwa',
    'vue3-carousel',
    '@emailjs/browser',
    'unplugin-icons/nuxt'
  ],
  runtimeConfig: {
    public: {
      GOOGLE_FIREBASE_ID: process.env.GOOGLE_FIREBASE_ID
    }
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
    ssrHandlers: false
  },
  robots: {
    UserAgent: '*',
    Allow: '/'
  },
  sourcemap: {
    server: true,
    client: true
  },
  typescript: {
    shim: false
  },
  pwa: {
    meta: {
      title: 'Dewdew',
      description: 'FE개발자 이연주 입니다.',
      author: '이연주',
      theme_color: '#35453e'
    },
    manifest: {
      id: '/',
      name: 'Dewdew',
      short_name: 'Dewdew',
      description: 'FE개발자 이연주 입니다.',
      lang: 'ko',
      icons: [],
      useWebmanifestExtension: true,
      display: 'standalone',
      background_color: '#35453e'
    },
    icon: {
      source: 'public/favicon_black.png',
      purpose: 'any'
    },
    workbox: {
      autoRegister: true,
      offlineAnalytics: true,
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          method: 'GET'
        }
      ]
    }
  }
}
