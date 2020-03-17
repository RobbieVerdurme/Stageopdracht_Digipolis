
export default {
  mode: 'universal',
  // baseUrl
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** Headers of the page
  */
  head: {
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
        href: '/images/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/images/favicon-32x32.png'
      },
      {
        rel: 'mask-icon',
        href: '/images/safari-pinned-tab.svg'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
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
    { src: '~/plugins/vue-qrcode-reader.js', mode: 'client' }
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
    ['@nuxtjs/pwa', { icon: false, manifest: false }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config) {
      config.module.rules.push({
        test: /\.scss$/,
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
