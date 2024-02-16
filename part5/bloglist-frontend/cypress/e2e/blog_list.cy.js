describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    })
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('123')
      cy.get('input:last').type('123')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.createBlog({ title: 'title', author: 'author', url: 'url' })

      cy.get('.blog').within(() => {
        cy.contains('title')
        cy.contains('view')
      })
    })

    it('Users can like a blog', function () {
      cy.createBlog({ title: 'title', author: 'author', url: 'url' })

      cy.get('.blog').within(() => {
        cy.get('#btn-show').click()
        cy.get('#btn-likes').click()
        cy.contains('likes 1')
      })
    })
  })
})
