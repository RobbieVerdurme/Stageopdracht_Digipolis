/* eslint-disable */
// the things that axe has to check
const config = [
    { id: 'heading-order', enabled: true },
    { id: 'label-title-only', enabled: true },
    { id: 'link-in-text-block', enabled: true },
    { id: 'button-name', enabled: true },
    { id: 'skip-link', enabled: true },
    { id: 'help-same-as-label', enabled: true },
    { id: 'dlitem', enabled: true },
    { id: 'definition-list', enabled: true }
]

describe('Homepage', () => {
    // do before each test
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
    })

    //test if axe gives errors
    it('Has no detectable a11y violations on load (custom configuration)', () => {
        // Configure aXe and test the page at initial load
        cy.configureAxe({
            disableOtherRules: true,
            reporter: 'no-passes',
            rules: config
        })
        cy.checkA11y()
    })


    // check if info is on homepage
    it('info on homepage', () => {
        // info route
        cy.get('h1').should('be.visible')
        cy.get('#info').should('be.visible')

        // bekijk op kaart 
        cy.contains('Bekijk op kaart').should('be.visible')

        // cta block
        cy.get('[download]').should('be.visible')
    })

    // test redirect
    it('redirect to map from button', () => {
        // click on button bekijk op kaart
        cy.contains('Bekijk op kaart').click()

        // check url
        cy.url().should('include', '/map')
    })

    // test menu
    it('test menuitems redirect', () => {
        // check menu if links are visible then click link
        cy.get('ul#links').children().each(function($el, index){
            //visibility menu
            cy.get($el).should('be.visible')

            //click on menu item
            cy.get($el).click()

            // check what link you clicked on
            var includeUrl
            switch(index){
                case 0:
                    includeUrl = '/'
                    break;
                case 1:
                    includeUrl = 'overview'
                    break;
                case 2:
                    includeUrl = 'scanner'
                    break;
            }

            // check if that comes in the url
            cy.url().should('include', includeUrl)
        })
    })
})