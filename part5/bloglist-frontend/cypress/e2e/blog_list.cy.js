describe('Blog app', function () {
  beforeEach(function () {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('Login form is shown', function () {
    // cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')

    // cy.get('#login-button').click()

    // cy.contains('Matti Luukkainen logged in')
  })
})
