import {user} from "../data";


describe('Valid login', () => {
    beforeEach(() => {
        cy.visit('https://demo.evershop.io/');
        cy.get('a[href*="account"]').as('account-icon').click();
    })

    it('should allow a user to sign in with valid credentials', () => {
        cy.login(user.email, user.password);
        cy.get('main > div:nth-child(1) .prose').as('blue-banner').should('be.visible');
        cy.get('a[href*="account"]').as('account-icon').click();

        cy.contains('My Account').should('be.visible');
        cy.get('a.text-interactive').contains('Logout').should('be.visible');
    });

    it('should set the cookie after a successful login ', () => {
        cy.login(user.email, user.password);
        cy.get('main > div:nth-child(1) .prose').as('blue-banner').should('be.visible');
        cy.get('a[href*="account"]').as('account-icon').click();

        cy.contains('My Account').should('be.visible');
        cy.get('a.text-interactive').contains('Logout').should('be.visible');

        // our auth cookie should be present
        cy.getCookie('sid').should('exist');
        cy.getCookie('sid').its('domain').should('equal', 'demo.evershop.io');
        cy.getCookie('sid').its('value').should('not.be.empty');
    });

    it('should allow a user to sign in with case-insensitive email', () => {
        cy.login(user.email.toUpperCase(), user.password);

        cy.url().should('include', '/');
        cy.get('main > div:nth-child(1) .prose').as('blue-banner');
        cy.get('@blue-banner').should('be.visible');
    });
})

describe('Negative scenarios', () => {
    beforeEach(() => {
        cy.visit('https://demo.evershop.io/account/login');
    })

    describe('Empty credentials', () => {
        it('should display an error message when trying to login with empty email', () => {
            cy.login('', user.password);

            cy.get('form#loginForm').should('be.visible');
            cy.assertFieldErrorIsDisplayed('input[name="email"]', 'This field can not be empty');
        });

        it('should display an error message when trying to login with empty password', () => {
            cy.login(user.email, '');

            cy.get('form#loginForm').should('be.visible');
            cy.assertFieldErrorIsDisplayed('input[name="password"]', 'This field can not be empty');
        });

        it('should display error messages for both email/password fields when trying to log in with both fields empty', () => {
            cy.login('', '');

            cy.get('form#loginForm').should('be.visible');
            cy.assertFieldErrorIsDisplayed('input[name="email"]', 'This field can not be empty');
            cy.assertFieldErrorIsDisplayed('input[name="password"]', 'This field can not be empty');
        });
    })

    describe("Invalid credentials", () => {
        it('should display an error message when trying to login with an email having invalid format', () => {
            cy.login('incorrectgmail.com', user.password);

            cy.get('form#loginForm').should('be.visible');
            cy.assertFieldErrorIsDisplayed('input[name="email"]', 'Invalid email');
        });
    })

    describe('Incorrect credentials', () => {
        it('should display an error message when trying to login with an incorrect email', () => {
            cy.login('incorrect@gmail.com', user.password);

            cy.get('form#loginForm').should('be.visible');
            cy.get('.login-form-inner .text-critical').as('invalid-credentials-mdg')
                .should('be.visible')
                .and('have.text', 'Invalid email or password');
        });

        it('should display an error message when trying to login with an incorrect password', () => {
            cy.login(user.email, 'incorrect-password');

            cy.get('form#loginForm').should('be.visible');
            cy.get('.login-form-inner .text-critical').as('invalid-credentials-mdg')
                .should('be.visible')
                .and('have.text', 'Invalid email or password');
        });

        it('should display an error message when trying to login with incorrect email and incorrect password', () => {
            cy.login('incorrect@gmail.com', 'incorrect-password');

            cy.get('form#loginForm').should('be.visible');
            cy.get('.login-form-inner .text-critical').as('invalid-credentials-mdg')
                .should('be.visible')
                .and('have.text', 'Invalid email or password');
        });
    });
})
