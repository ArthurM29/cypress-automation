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


import {Address} from '../data';

Cypress.Commands.add('login', (email: string, password: string): void => {
    cy.url().should('include', '/account/login');

    if (email) {
        cy.get('input[name="email"]').type(email);
    }
    if (password) {
        cy.get('input[name="password"]').type(password);
    }

    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('loginWithSession', (email: string, password: string): void => {
    cy.session(
        email,
        () => {
            cy.visit('https://demo.evershop.io/account/login');
            cy.login(email, password);
        },
        {
            validate: () => {
                cy.getCookie('sid').should('exist');
            },
        }
    )
});

Cypress.Commands.add('assertFieldErrorIsDisplayed', (locator: string, expectedErrorMsg: string): void => {
    cy.get(locator).parents('.form-field-container').find('.field-error')
        .within(() => {
            cy.get('span').as(`${locator}-error-msg`).should('be.visible').and('have.text', expectedErrorMsg);
            cy.get('svg').as(`${locator}-error-icon`).should('be.visible');
        });
});

Cypress.Commands.add('fillOutAddressForm', (address: Partial<Address>): void => {
    if (address.fullname) {
        cy.get('input[name="address[full_name]"]').type(address.fullname);
    }
    if (address.telephone) {
        cy.get('input[name="address[telephone]"]').type(address.telephone);
    }
    if (address.address) {
        cy.get('input[name="address[address_1]"]').type(address.address);
    }
    if (address.city) {
        cy.get('input[name="address[city]"]').type(address.city);
    }
    if (address.country) {
        cy.get('select[name="address[country]"]').select(address.country);

        if (address.province) {
            cy.get('select[name="address[province]"]').select(address.province);
        }
    }
    if (address.postcode) {
        cy.get('input[name="address[postcode]"]').type(address.postcode);
    }
});
