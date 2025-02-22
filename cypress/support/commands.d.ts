import {Address} from '../data';
import {SearchResults} from "../interfaces";

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {

            /**
             * Custom command to assert if a field error message and icon are displayed correctly.
             * Assumes a structured way to access error messages in the DOM, involving a parent container and child elements for text and icons.
             * @param locator - The CSS selector for the input field related to the error.
             * @param expectedErrorMsg - The expected text of the error message.
             * @example cy.assertFieldErrorIsDisplayed('input[name="email"]', 'Email is required')
             */
            assertFieldErrorIsDisplayed(locator: Chainable<JQuery<HTMLElement>>, expectedErrorMsg: string): Chainable<Subject>;

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

            /**
             * Custom command to fetch addresses from the page.
             * This command iterates over elements with the class '.address__summary',
             * extracting details such as full name, telephone, address, city, postcode, province, and country,
             * and collects them into an array of Address objects.
             * @example cy.getAddresses().then((addresses) => {
             *   // addresses is now an array of Address objects
             * })
             */
            getShippingAddresses(): Chainable<Array<Address>>;

            /**
             * Custom command to retrieve search results from the page.
             * This command fetches listings from the page and constructs an array of SearchResults,
             * each containing name, price, and thumbnail link of a product.
             * @example cy.getSearchResults().then((results) => {
             *   // results is now an array of SearchResults
             * })
             */
            getSearchResults(): Chainable<SearchResults[]>;

            /**
             * Custom command to filter products by size on the UI.
             * This command finds the 'Size' label, navigates to the corresponding filter options list,
             * and clicks on the link that matches the provided size.
             * @param size - The product size to filter by (e.g., 'S', 'M', 'L').
             * @example cy.filterProductsBySize('L')
             */
            filterProductsBySize(size: string[]): Chainable<void>;
        }
    }
}

export {};
