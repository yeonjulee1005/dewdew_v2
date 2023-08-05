// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  routeRules: {
    '/**': { prerender: true, headers: { 's-maxage': '1', 'stale-while-revalidate': '59', 'x-magic-of': 'nuxt and vercel' } }
  },
  app: {
    keepalive: true,
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
        { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/dewdew-4c122.appspot.com/o/images%2Fassets%2Fmain_banner.webp?alt=media&token=71fc7e16-243f-498d-ad64-aa9fb0b80fdd' },
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
      chunkSizeWarningLimit: 1000,
      commonjsOptions: {
        esmExternals: true
      },
      rollupOptions: {
        output: {
          manualChunks: (id:string) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  },
  // modules
  modules: [
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    'nuxt-vercel-analytics'
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
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    prerender: {
      crawlLinks: true,
      routes: [
        '/'
      ]
    }
  },
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
  stylelint: {
    lintOnStart: true
  },
  i18n: {
    langDir: './locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'ko',
        file: 'ko.ts'
      },
      {
        code: 'en',
        file: 'en.ts'
      }
    ],
    defaultLocale: 'ko',
    strategy: 'no_prefix'
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
  cssMining: true,
  rollupOptions: {
    output: {
      manualChunks: {
        'element-plus': ['element-plus']
      }
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    srcDir: './public/worker',
    filename: 'sw.ts',
    manifest: {
      name: 'Dewdew',
      short_name: 'Dewdew',
      theme_color: '#fa7474',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    injectManifest: {
      globDirectory: './.nuxt/dev-sw-dist',
      globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
      globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js']
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },
  sitemap: {
    siteUrl: 'https://www.dewdew.kr'
  }
}
