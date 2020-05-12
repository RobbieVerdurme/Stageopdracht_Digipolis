
export default {
  mode: 'universal',
  // Config env values
  env: {
    baseUrl: process.env.HOST || 'localhost',
    port: process.env.PORT || '3000'
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: { lang: 'nl' },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      /** manifest */
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      /** icons */
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/images/cyan/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/images/cyan/favicon-32x32.png'
      },
      {
        rel: 'mask-icon',
        href: '/images/cyan/safari-pinned-tab.svg'
      },
      {
        rel: 'icon',
        type: 'image/cyan/x-icon',
        href: '/favicon.ico'
      },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' }
    ],
    bodyAttrs: {
      class: 'cs--cyan'
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#009de0' },
  /*
  ** Global CSS
  */
  css: [
    // gent_styleguide
    '~/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // https://vuelayers.github.io/#/
    { src: '~/plugins/vuelayers.js', mode: 'client' },

    // https://github.com/gruhn/vue-qrcode-reader
    { src: '~/plugins/vue-qrcode-reader.js', mode: 'client' },

    // https://github.com/vue-a11y/vue-axe
    { src: '~/plugins/axe.js' },

    // https://vuetifyjs.com/en/getting-started/quick-start/
    { src: '~/plugins/vuetify.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/pwa', { icon: false, manifest: false }],
    '@nuxtjs/toast'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseUrl: process.env.baseUrl,
    proxy: true
  },
  proxy: {
    '/api/': { target: 'https://licht18qa.stad.gent/nl/jsonapi', pathRewrite: { '^/api/': '' } }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config) {
      config.module.rules.push({
        test: /\.s(c|a)ss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                'node_modules/breakpoint-sass/stylesheets',
                'node_modules/susy/sass',
                'node_modules/gent_styleguide/build/styleguide'
              ]
            }
          }
        ]
      })
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  // makes the service worker
  workbox: {
    runtimeCaching: [
      {
        // make site offline available
        urlPattern: `${process.env.baseUrl}/*`,
        method: 'GET',
        strategyOptions: {
          cachename: 'route',
          cacheableResponse: { statuses: [0, 200] }
        }
      }
    ]
  }
}
