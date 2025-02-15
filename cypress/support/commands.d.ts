import {Address} from '../data';

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            /**
             * Custom command to log in to the application.
             * @param email - The email address to use for login.
             * @param password - The password to use for login.
             */
            login(email: string, password: string): Chainable<Subject>;

            /**
             * Custom command to perform login using cy.session() for efficient session handling.
             * This uses session caching to avoid repeated logins in a test suite.
             * @param email - The email address used for logging in.
             * @param password - The password used for logging in.
             * @example cy.loginWithSession('user@example.com', 'password123')
             */
            loginWithSession(email: string, password: string): Chainable<Subject>;

            /**
             * Custom command to assert if a field error message and icon are displayed correctly.
             * Assumes a structured way to access error messages in the DOM, involving a parent container and child elements for text and icons.
             * @param locator - The CSS selector for the input field related to the error.
             * @param expectedErrorMsg - The expected text of the error message.
             * @example cy.assertFieldErrorIsDisplayed('input[name="email"]', 'Email is required')
             */
            assertFieldErrorIsDisplayed(locator: string, expectedErrorMsg: string): Chainable<Subject>;

            /**
             * Custom command to comprehensively fill out an address form with the provided data.
             * Targets designated fields within the form and inputs corresponding values from the data object.
             * Allows for partial form completion if not all data is provided.
             * @param data - Object containing fields of the form with values to be entered.
             * @example cy.fillOutAddressForm({
             *      fullname: 'John Doe',
             *      telephone: '(555) 123-4567',
             *      address: '1500 Pennsylvania Avenue NW',
             *      city: 'Austin',
             *      country: 'United States',
             *      postcode: '20500'
             * })
             */
            fillOutAddressForm(data: Partial<Address>): Chainable<void>;
        }
    }
}

export {};
