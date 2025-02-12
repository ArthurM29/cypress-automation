import {user} from "../../data";

beforeEach(() => {
    cy.loginWithSession(user.email, user.password);
})

it('should test 1', () => {
    cy.visit('https://demo.evershop.io/account');
    cy.get('a[href*="account"]').as('account-icon').click();

});

it('should test 2', () => {
    cy.visit('https://demo.evershop.io/account');
    cy.get('a[href*="account"]').as('account-icon').click();

});

it('should test 3', () => {
    cy.visit('https://demo.evershop.io/account');
    cy.get('a[href*="account"]').as('account-icon').click();

});
