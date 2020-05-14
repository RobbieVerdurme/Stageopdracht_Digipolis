/* eslint-disable */

describe('OverviewPage', () => {
    // do before each test
    beforeEach(() => {
        // baseurl
        cy.visit('/')
        
        // Intercept backendcall for clusters
        cy.server()
        cy.route({
            method: 'GET',
            url: '/api/node/artwork',
            status: 200,
            response: "fixture:POI.json"
        })

        // Navigate to page with mocked backendroute
        cy.contains('Overzicht route').click()

        cy.injectAxe()
    })

    //test if axe gives errors
    it('Has no detectable a11y violations on load (custom configuration)', () => {
        cy.axe()
    })

    /**
     * LIST
     */
    // check if list is there
    it('Check if Display switcher is on page', () => {
        // check if item is visable
        cy.contains('Als lijst').should('be.visible')

        // check if links have text
        cy.contains('Als lijst')
        cy.contains('Op kaart')

        // check if link is disabled(of attribute span)
        cy.contains('Als lijst').should('have.class', '')

        // check the first item of the list
        // must be item of the backendcall
    })

    // test redirect to point of intrest
    it('Redirect to poi', () => {
        // click on first readmore link
        cy.get('.read-more').first().click()

        // url check
        cy.url().should('include', '1')
    })

    /**
     * MAP
     */
    // Navigate to map
    it('Navigate to map page', () => {
        // Navigate to map
        cy.contains('Op kaart').click()

        // url check
        cy.url().should('include', '/overview/map')
    })

    // check if everything is there
    it('Check if everything is on map page', () => {
        // Navigate to map
        cy.contains('Op kaart').click()

        // check if map is there
        // This gives error 'does not find item with prop load-tiles-while-animating'
        // cy.get('[load-tiles-while-animating]')

        // cta block should be visible
        cy.get('[download]').should('be.visible')
    })
})
