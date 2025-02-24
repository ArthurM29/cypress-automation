import {user} from "../data";
import {LoginPage} from "../pages/LoginPage";
import {Header} from "../pages/Header";
import {LandingPage} from "../pages/LandingPage";
import {MyAccountPage} from "../pages/MyAccountPage";


describe('Valid login', () => {
    beforeEach(() => {
        LandingPage.visit();
        Header.visitMyAccount();
    })

    it('should allow a user to sign in with valid credentials', () => {
        LoginPage.login(user.email, user.password);

        //TODO this is to make sure it has switched from Login screen to Home page and clicks MyAccount from the state
        LandingPage.shouldBeVisible();
        Header.visitMyAccount();
        MyAccountPage.logoutButton().should('be.visible');
    });

    it('should set the cookie after a successful login ', () => {
        LoginPage.login(user.email, user.password);
        LandingPage.blueBanner().should('be.visible');

        Header.visitMyAccount();
        MyAccountPage.logoutButton().should('be.visible');

        // our auth cookie should be present
        cy.getCookie('sid').should('exist');
        cy.getCookie('sid').its('domain').should('equal', 'demo.evershop.io');
        cy.getCookie('sid').its('value').should('not.be.empty');
    });

    it('should allow a user to sign in with case-insensitive email', () => {
        LoginPage.login(user.email.toUpperCase(), user.password);

        LandingPage.blueBanner().should('be.visible');
    });
})

describe('Negative scenarios', () => {
    beforeEach(() => {
        LoginPage.visit();
    })

    describe('Empty credentials', () => {
        it('should display an error message when trying to login with empty email', () => {
            LoginPage.login('', user.password);

            LoginPage.loginForm().should('be.visible');
            cy.assertFieldErrorIsDisplayed(LoginPage.emailInputErrorContainer(), 'This field can not be empty');
        });

        it('should display an error message when trying to login with empty password', () => {
            LoginPage.login(user.email, '');

            LoginPage.loginForm().should('be.visible');
            cy.assertFieldErrorIsDisplayed(LoginPage.passwordInputErrorContainer(), 'This field can not be empty');
        });

        it('should display error messages for both email/password fields when trying to log in with both fields empty', () => {
            LoginPage.login('', '');

            LoginPage.loginForm().should('be.visible');
            cy.assertFieldErrorIsDisplayed(LoginPage.emailInputErrorContainer(), 'This field can not be empty');
            cy.assertFieldErrorIsDisplayed(LoginPage.passwordInputErrorContainer(), 'This field can not be empty');
        });
    })

    describe("Invalid credentials", () => {
        it('should display an error message when trying to login with an email having invalid format', () => {
            LoginPage.login('incorrectgmail.com', user.password);


            LoginPage.loginForm().should('be.visible');
            cy.assertFieldErrorIsDisplayed(LoginPage.emailInputErrorContainer(), 'Invalid email');
        });
    })

    describe('Incorrect credentials', () => {
        it('should display an error message when trying to login with wrong email', () => {
            LoginPage.login('wrong@gmail.com', user.password);

            LoginPage.loginForm().should('be.visible');
            LoginPage.invalidCredentialsError()
                .should('be.visible')
                .and('have.text', 'Invalid email or password');
        });

        it('should display an error message when trying to login with an wrong password', () => {
            LoginPage.login(user.email, 'wrong-password');

            LoginPage.loginForm().should('be.visible');
            LoginPage.invalidCredentialsError()
                .should('be.visible')
                .and('have.text', 'Invalid email or password');
        });

        it('should display an error message when trying to login with wrong email and wrong password', () => {
            LoginPage.login('incorrect@gmail.com', 'wrong-password');

            LoginPage.loginForm().should('be.visible');
            LoginPage.invalidCredentialsError()
                .should('be.visible')
                .and('have.text', 'Invalid email or password');
        });
    });
})
