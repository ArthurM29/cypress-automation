import Chainable = Cypress.Chainable;

export class LoginPage {

    // =======================================
    // Elements
    // =======================================
    static emailInput = (): Chainable<JQuery<HTMLInputElement>> => cy.get('input[name="email"]');
    static passwordInput = (): Chainable<JQuery<HTMLInputElement>> => cy.get('input[name="password"]');
    static signInButton = (): Chainable<JQuery<HTMLButtonElement>> => cy.get('button[type="submit"]');
    static loginForm = (): Chainable<JQuery<HTMLFormElement>> => cy.get('form#loginForm');
    static invalidCredentialsError = (): Chainable<JQuery<HTMLDivElement>> => cy.get('.login-form-inner .text-critical');

    static emailInputErrorContainer = (): Chainable<JQuery<HTMLDivElement>> => {
        return LoginPage.emailInput().parents('.form-field-container').find('.field-error');
    }

    static passwordInputErrorContainer = (): Chainable<JQuery<HTMLDivElement>> => {
        return LoginPage.passwordInput().parents('.form-field-container').find('.field-error');
    }

    // =======================================
    // Actions
    // =======================================
    static visit = (): void => {
        cy.visit('/account/login');
    }

    static shouldBeVisible(): void {
        LoginPage.loginForm().should('be.visible');
    }

    static login = (email: string, password: string): void => {
        cy.url().should('include', '/account/login');

        if (email) {
            LoginPage.emailInput().type(email);
        }
        if (password) {
            LoginPage.passwordInput().type(password);
        }

        LoginPage.signInButton().click();
    }

    static loginWithSession = (email: string, password: string): void => {
        cy.session(
            email,
            () => {
                LoginPage.visit();
                LoginPage.login(email, password);
            },
            {
                validate: () => {
                    cy.getCookie('sid').should('exist');
                },
            }
        );
    }

}
