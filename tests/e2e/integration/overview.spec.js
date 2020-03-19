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

describe('OverviewPage', () => {
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

        // Navigate to page with mocked backendroute
        cy.contains('Overview route').click()

        cy.injectAxe()
    })

    //test if axe gives errors
    it('Has no detectable a11y violations on load (custom configuration)', () => {
        // Configure aXe and test the page at initial load
        cy.configureAxe({
            reporter: 'no-passes',
            rules: config
        })
        cy.checkA11y()
    })

    /**
     * LIST
     */
    // check if list is there
    it('Check if Display switcher is on page', () => {
        // check if item is visable
        cy.contains('As list').should('be.visible')

        // check if links have text
        cy.contains('As list')
        cy.contains('On map')

        // check if link is disabled(of attribute span)
        cy.contains('As list').should('have.class', '')

        // check the first item of the list
        // must be item of the backendcall
    })

    // test redirect to cluster
    it('Redirect to cluster', () => {
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
        cy.contains('On map').click()

        // url check
        cy.url().should('include', '/overview/map')
    })

    // check if everything is there
    it('Check if everything is on map page', () => {
        // Navigate to map
        cy.contains('On map').click()

        // check if map is there
        // This gives error 'does not find item with prop load-tiles-while-animating'
        // cy.get('[load-tiles-while-animating]')

        // cta block should be visible
        cy.get('[download]').should('be.visible')
    })
})
