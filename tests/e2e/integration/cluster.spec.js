/* eslint-disable */

describe('Clusterpage', () => {
    // do before each test
    beforeEach(() => {
        // baseurl
        cy.visit('/')

        // Intercept backendcall for clusters
        cy.server()
        cy.route({
            method: 'GET',
            url: '/clusters.json',
            status: 200,
            response: "fixture:clusters.json"
        })

        //navigate to cluster page
        cy.contains('Overview route').click()
        cy.get('.read-more').first().click()

        // check 
        cy.url().should('include', 1)

        // inject Axe
        cy.injectAxe()
    })

    //test if axe gives errors
    it('Has no detectable a11y violations on load (custom configuration)', () => {
        cy.axe()
    })

    // check if everything is on page
    it('info cluster', () => {
        // check visibility
        cy.get('h1').should('be.visible')
        cy.get('#info').should('be.visible')
        cy.contains('Bekijk op kaart').should('be.visible')
        cy.get('.programme-wrapper').should('be.visible')

        // check if there is text 
        cy.get('h1').contains('Hello there')
        cy.get('#info').contains('Hello there my dear friends')
    })
})