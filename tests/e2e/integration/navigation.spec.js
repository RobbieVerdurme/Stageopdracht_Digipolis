/* eslint-disable no-undef */
describe('Navigate page', () => {
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
      response: 'fixture:POI.json'
    })

    // Navigate to page with mocked backendroute
    cy.contains('Volg route').click()

    cy.injectAxe()
  })

  // test if axe gives errors
  it('Has no detectable a11y violations on load (custom configuration)', () => {
    cy.axe()
  })

  // check if info is on navigation page
  it('info on navigaton page', () => {
    // info
    cy.get('h1').should('be.visible')
    cy.get('p').should('be.visible')
  })
})
