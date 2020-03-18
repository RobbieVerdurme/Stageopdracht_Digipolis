import Vue from 'vue'
import VueAxe from 'vue-axe'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
    Vue.use(VueAxe, {
        config: {
            // disableOtherRules : true,
            reporter: 'no-passes',
            rules: [
                {tags: ['wcag2a', 'wcag2aa'], enabled: true},
                {id: 'dlitem', enabled: true},
                {id: 'definition-list', enabled: true}
            ]
        }
    }
    )
}

/* TO Convert 
    headless: true,
    iframes: false
 */
