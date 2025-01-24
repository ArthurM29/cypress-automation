import {user} from "../../data";

describe('Login', () => {

  it('able to login with valid credentials', () => {
    cy.login(user.email, user.password);

    cy.url().should('include', '/');
    cy.get('main > div:nth-child(1) .prose').as('blue-banner');
    cy.get('@blue-banner').should('be.visible');
  });

  it.only('able to login with empty email', () => {
    cy.login('', user.password);
  });
})