// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (email = '', password = '') => {
    cy.visit('https://demo.evershop.io/account/login');
    cy.url().should('include', '/account/login');

    // Type email (explicitly type an empty string if passed)
    cy.get('input[name="email"]').clear().type(email);

    // Type password (explicitly type an empty string if passed)
    cy.get('input[name="password"]').clear().type(password);

    // Submit the form
    cy.get('button[type="submit"]').click();
});
