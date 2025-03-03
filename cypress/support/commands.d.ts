import {Address} from '../data';
import {SearchResults} from "../interfaces";

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {

            /**
             * Custom command to assert that an input field displays a specific error message.
             * This command should be chained to an input field element and will find the related error container,
             * then verify that the error message matches and the error icon is visible.
             * @param expectedErrorMsg - The exact error message text that should be displayed.
             * @example LoginPage.emailInput().shouldDisplayFieldError('Email is required')
             */
            shouldDisplayInputError(expectedErrorMsg: string): Chainable<Subject>;

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
