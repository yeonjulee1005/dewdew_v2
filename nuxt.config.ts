
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
      viewport: 'width=device-width, initial-scale=1',
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
      chunkSizeWarningLimit: 4000,
      commonjsOptions: {
        esmExternals: true
      }
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    prerender: {
      routes: ['/', '/about']
    }
  },
  // modules
  modules: [
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/robots'
  ],
  // build modules
  buildModules: [
    'vue3-carousel',
    '@emailjs/browser',
    'unplugin-icons/nuxt'
  ],
  runtimeConfig: {
    public: {
      GOOGLE_FIREBASE_ID: process.env.GOOGLE_FIREBASE_ID
    }
  },
  // webpack: {
  //   extractCSS: true,
  //   optimization: {
  //     splitChunks: {
  //       maxSize: 300000,
  //       cacheGroups: {
  //         styles: {
  //           name: 'styles',
  //           test: /\.(css|vue)$/,
  //           chunks: 'all',
  //           enforce: true
  //         }
  //       }
  //     }
  //   }
  // },
  // auto import components
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  imports: {
    dirs: [
      'composables/**',
      'stores'
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
    registerType: 'autoUpdate',
    manifest: {
      name: 'Dev Dewdew',
      short_name: 'Dev Dewdew',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'favicon_black.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
}
