import Vue from 'vue'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  const VueAxe = require('vue-axe')
  Vue.use(VueAxe, {
    config: {
      reporter: 'no-passes',
      rules: [
        { tags: ['wcag2a', 'wcag2aa'] }
      ]
    }
  }
  )
}
