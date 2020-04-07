/* eslint-disable */

describe('POIpage', () => {
    // do before each test
    beforeEach(() => {
        // baseurl
        cy.visit('/')

        // Intercept backendcall for clusters
        cy.server()
        cy.route({
            method: 'GET',
            url: '/POI.json',
            status: 200,
            response: "fixture:POI.json"
        })

        //navigate to cluster page
        cy.contains('Overview route').click()
        cy.get('.read-more').first().click()

        // check 
        cy.url().should('include', 1)
        cy.get('#info').should('be.visible')

        // inject Axe
        cy.injectAxe()
    })

    //test if axe gives errors
    it('Has no detectable a11y violations on load (custom configuration)', () => {
        cy.axe()
    })

    // check if everything is on page
    it('info poi', () => {
        // check visibility
        cy.get('h1').should('be.visible')
        cy.get('#info').should('be.visible')
        cy.contains('Bekijk op kaart').should('be.visible')
    })
})