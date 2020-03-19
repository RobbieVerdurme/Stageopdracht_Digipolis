import Vue from 'vue'
import VueAxe from 'vue-axe'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
    Vue.use(VueAxe, {
        config: {
            reporter: 'no-passes',
            rules: [
                { id: 'heading-order', enabled: true },
                { id: 'label-title-only', enabled: true },
                { id: 'link-in-text-block', enabled: true },
                { id: 'button-name', enabled: true},
                { id: 'skip-link', enabled: true },
                { id: 'help-same-as-label', enabled: true },
                {id: 'dlitem', enabled: true},
                {id: 'definition-list', enabled: true}
            ]
        }
    }
    )
}
