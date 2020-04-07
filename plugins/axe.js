import Vue from 'vue'
import VueAxe from 'vue-axe'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
    Vue.use(VueAxe, {
        config: {
            reporter: 'no-passes',
            rules: [
                { tags: ['wcag2a', 'wcag2aa']}
            ]
        }
    }
    )
}
