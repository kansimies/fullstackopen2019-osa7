context('Login', () => {

  const user = {
    name: 'Jonathan Schröder',
    username: 'jonathan',
    password: 'test'
  }

  before(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  beforeEach(() => {
    cy.visit("/login")
  })

  it('Login page is shown', () => {
    cy.contains("Log in to application")
    cy.get("form").within(() => {
      cy.get("#username").should('be.visible')
      cy.get("#password").should('be.visible')
    })
    cy.get("button").contains("Log In")
  })

  it('Valid credentials work', () => {
    cy.get("form").within(() => {
      cy.get("#username").should('be.visible').type(user.username)
      cy.get("#password").should('be.visible').type(user.password)
    })
    cy.get("button").contains("Log In").click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/blogs')
    })
    cy.contains(`Logged in as ${user.name}`)
    cy.contains("No blogs yet in the application!")
  })

  it('Invalid credentials return error', () => {
    cy.get("form").within(() => {
      cy.get("#username").should('be.visible').type("falseusername")
      cy.get("#password").should('be.visible').type("falsepassword")
    })
    cy.get("button").contains("Log In").click()
    cy.get(".MuiSnackbarContent-message").should('be.visible')
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login')
    })
  })

})

context('Logout', () => {

  const user = {
    name: 'Jonathan Schröder',
    username: 'jonathan',
    password: 'test'
  }

  before(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit("/login")
    cy.get("form").within(() => {
      cy.get("#username").should('be.visible').type(user.username)
      cy.get("#password").should('be.visible').type(user.password)
    })
    cy.get("button").contains("Log In").click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/blogs')
    })
  })

  it('A user can log out', () => {
    cy.contains('Log out').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login')
    })

  })

})

context('Creating a blog post', () => {

  const user = {
    name: 'Jonathan Schröder',
    username: 'jonathan',
    password: 'test'
  }

  before(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('/login')
    cy.get("form").within(() => {
      cy.get("#username").should('be.visible').type(user.username)
      cy.get("#password").should('be.visible').type(user.password)
    })
    cy.get("button").contains("Log In").click()
  })

  it('Creating a blog post works', () => {
    cy.location().should((loc) => expect(loc.pathname).to.eq('/blogs'))
    cy.contains("No blogs yet in the application!")
    cy.contains("Create New Blog").click()
    cy.location().should((loc) => expect(loc.pathname).to.eq('/create'))

    cy.get("form").within(() => {
      cy.get("#title").should('be.visible').type("Test title")
      cy.get("#author").should('be.visible').type("Jonathan S")
      cy.get("#url").should('be.visible').type("http://www.com")
      cy.get("button").contains("Create").click()
    })
    cy.location().should((loc) => expect(loc.pathname).to.eq('/blogs'))
    cy.contains("Test title")
  })

})