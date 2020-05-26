/* eslint-disable */
describe('ScannerPage', () => {
    // do before each test
    beforeEach(() => {
        cy.visit('/scanner')
        cy.injectAxe()
    })

    //test if axe gives errors
    it('Has no detectable a11y violations on load (custom configuration)', () => {
        cy.axe()
    })

    //check if info is on scanner page
    it('info scanner', () => {
        cy.get('h1').should('be.visible')
        cy.get('p').should('be.visible')
    })




})