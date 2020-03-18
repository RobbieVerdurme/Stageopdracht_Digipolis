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

describe('ScannerPage', () => {
    // do before each test
    beforeEach(() => {
        cy.visit('/scanner')
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

    //check if info is on scanner page
    it('info scanner', () => {
        cy.get('h1').should('be.visible')
        cy.get('p').should('be.visible')
    })




})