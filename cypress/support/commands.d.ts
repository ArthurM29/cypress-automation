declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to log in to the application.
         * @param email - The email address to use for login.
         * @param password - The password to use for login.
         */
        login(email: string, password: string): Chainable<Subject>;

        /**
         * Custom command to get the field error container by field name.
         * @example cy.getFieldErrorContainer('email')
         */
        assertFieldErrorIsDisplayed(fieldName: string, expectedErrorMsg: string): Chainable<JQuery<HTMLElement>>
    }
}
