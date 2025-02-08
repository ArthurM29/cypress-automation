import {user} from "../../data";

describe('Login', () => {

    it('should allow a user to sign in with valid credentials', () => {
        cy.login(user.email, user.password);

        cy.url().should('include', '/');
        cy.get('main > div:nth-child(1) .prose').as('blue-banner');
        cy.get('@blue-banner').should('be.visible');
    });

    describe('Empty credentials', () => {
        it('should display an error message when trying to login with empty email', () => {
            cy.login('', user.password);

            cy.get('form#loginForm').should('be.visible');
            cy.assertFieldErrorIsDisplayed('email', 'This field can not be empty' );
        });

        it('should display an error message when trying to login with empty password', () => {
            cy.login(user.email, '');

            cy.get('form#loginForm').should('be.visible');
            cy.assertFieldErrorIsDisplayed('password', 'This field can not be empty' );
        });

        it('should display error messages for both email/password fields when trying to log in with both fields empty', () => {
            cy.login('', '');

            cy.get('form#loginForm').should('be.visible');
            cy.assertFieldErrorIsDisplayed('email', 'This field can not be empty' );
            cy.assertFieldErrorIsDisplayed('password', 'This field can not be empty' );
        });
    })

    describe("Invalid credentials", () => {

        it('should display an error message when attempting to log in with an incorrectly formatted email address', () => {
            cy.login('invalidgmail.com', user.password);

            cy.get('form#loginForm').should('be.visible');
            cy.get('#loginForm .field-error span').as('email-error-msg').should('be.visible')
                .and('have.text', 'Invalid email');
            cy.get('#loginForm .field-error').as('email-error-icon').should('be.visible');
        });

        it('unable to login with incorrect email', () => {
            cy.login('incorrect@gmail.com', user.password);

            cy.get('form#loginForm').should('be.visible');
            cy.get('.text-critical').as('invalid-credentials-error').should('be.visible')
                .and('have.text', 'Invalid email or password');
        });
    })

    describe('Invalid password', () => {

    })

})