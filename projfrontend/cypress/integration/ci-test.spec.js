/// <reference types="Cypress" />

describe('Sample CI test', () => {
  it("CI",() => {
    cy.visit("http://localhost:3000/")
    cy.wait(2000)
    cy.get(".details .sucess").invoke("text").should("eq","Test")    
  })
})
