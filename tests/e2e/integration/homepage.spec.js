/* eslint-disable */

describe('Homepage', () => {
    // do before each test
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
    })

    //test if axe gives errors
    it('Has no detectable a11y violations on load (custom configuration)', () => {
        cy.axe()
    })


    // check if info is on homepage
    it('info on homepage', () => {
        // info route
        cy.get('h1').should('be.visible')

        // bekijk op kaart 
        cy.contains('Bekijk op kaart').should('be.visible')

        // cta block
        cy.get('[download]').should('be.visible')
    })

    // test redirect
    it('redirect to map from button', () => {
        // click on button bekijk op kaart
        cy.contains('Bekijk op kaart').click()

        cy.wait(4000)
        
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
                    includeUrl= 'navigate'
                    break;
                case 3:
                    includeUrl = 'scanner'
                    break;
            }

            // check if that comes in the url
            cy.url().should('include', includeUrl)
        })
    })
})