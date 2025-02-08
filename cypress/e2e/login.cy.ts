import {user} from "../../data";

describe('Login', () => {

  it('able to login with valid credentials', () => {
    cy.login(user.email, user.password);

    cy.url().should('include', '/');
    cy.get('main > div:nth-child(1) .prose').as('blue-banner');
    cy.get('@blue-banner').should('be.visible');
  });

  it('unable to login with empty email', () => {
    cy.login('', user.password);

    cy.get('form#loginForm').should('be.visible');
    cy.get('#loginForm .field-error span').as('email-error-msg').should('be.visible')
        .and('have.text', 'This field can not be empty');
  });

  it('unable to login with invalid email', () => {
    cy.login('invalidgmail.com', user.password);

    cy.get('form#loginForm').should('be.visible');
    cy.get('#loginForm .field-error span').as('email-error-msg').should('be.visible')
        .and('have.text', 'Invalid email');
    cy.get('#loginForm .field-error').as('email-error-icon').should('be.visible');
  })
})