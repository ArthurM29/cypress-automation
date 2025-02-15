import {user} from "../data";

beforeEach(() => {
    cy.visit('https://demo.evershop.io/account/login');
    cy.login(user.email, user.password);
    cy.get('main > div:nth-child(1) .prose').as('blue-banner').should('be.visible');
})

it('should be able to logout user', () => {
    cy.get('a[href*="account"]').as('account-icon').click();
    cy.contains('Logout').click();
    cy.get('main > div:nth-child(1) .prose').as('blue-banner').should('be.visible');
    cy.get('a[href*="account"]').as('account-icon').click();
    cy.get('.login-form').should('be.visible');
});