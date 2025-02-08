/// <reference path="./commands.d.ts" />

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


Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('https://demo.evershop.io/account/login');
    cy.url().should('include', '/account/login');

    if (email) {
        cy.get('input[name="email"]').type(email);
    }
    if (password) {
        cy.get('input[name="password"]').type(password);
    }

    cy.get('button[type="submit"]').click();
});
