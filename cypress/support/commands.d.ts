declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to log in to the application.
         * @param email - The email address to use for login.
         * @param password - The password to use for login.
         */
        login(email: string, password: string): Chainable<Subject>;

        /**
         * Custom command to perform login using cy.session() for efficient session handling.
         * @param email - The email address used for logging in.
         * @param password - The password used for logging in.
         * @example cy.loginWithSession('user@example.com', 'password123')
         */
        loginWithSession(email: string, password: string): Chainable<Subject>;

        /**
         * Custom command to get the field error container by field name.
         * @example cy.getFieldErrorContainer('email')
         */
        assertFieldErrorIsDisplayed(fieldName: string, expectedErrorMsg: string): Chainable<JQuery<HTMLElement>>
    }
}
