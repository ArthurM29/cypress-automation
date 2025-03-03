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


import Chainable = Cypress.Chainable;
import {SearchResults} from '../interfaces';
import {Address} from "../data";


Cypress.Commands.add('getShippingAddresses', (): Chainable<Address[]> => {
    const addressesData: Address[] = [];

    return cy.get('.address__summary').each(($address) => {
        let addressData = {} as Address;

        return cy.wrap($address).within(() => {
            cy.get('.full-name').invoke('text').then(fullname => {
                addressData.fullname = fullname;
            });

            cy.get('.telephone').invoke('text').then(telephone => {
                addressData.telephone = telephone;
            });

            cy.get('.city-province-postcode').within(() => {
                cy.get('div').eq(0).invoke('text').then(postcodeCityTxt => {
                    const [postcode, city] = postcodeCityTxt.split(',').map(value => value.trim());
                    addressData.postcode = postcode;
                    addressData.city = city;
                });

                cy.get('div').eq(1).invoke('text').then(provinceCountryTxt => {
                    const [province, country] = provinceCountryTxt.split(',').map(value => value.trim());
                    addressData.province = province;
                    addressData.country = country;
                });
            });

            cy.get('.address-one').invoke('text').then(address => {
                addressData.address = address;
            });
        }).then(() => {
            addressesData.push(addressData);
        });
    }).then(() => {
        return addressesData;
    });
});

Cypress.Commands.add('shouldDisplayInputError', { prevSubject: true }, (subject: JQuery<HTMLElement>, expectedErrorMsg: string): void => {
    // Find the error container relative to the input field
    cy.wrap(subject)
        .parents('.form-field-container')
        .find('.field-error')
        .within(() => {
            cy.get('span').should('be.visible').and('have.text', expectedErrorMsg);
            cy.get('svg').should('be.visible');
        });
});


Cypress.Commands.add('filterProductsBySize', (sizes: string[]): void => {
    sizes.forEach(size => {
        cy.contains('span', 'Size').parent().next('.filter-option-list').contains('span', size).click();
        cy.wait(300); //TODO when the click happens fast, only one size is checked, find a way to wait without hard sleep
    });
});


Cypress.Commands.add('getSearchResults', (): Chainable<SearchResults[]> => {
    const products: SearchResults[] = [];

    return cy.get('.listing-tem').each(($product) => {
        let product = {} as SearchResults;

        return cy.wrap($product).within(() => {
            cy.get('.product-name').invoke('text').then(name => {
                product.name = name;
            });

            cy.get('.product-price-listing').invoke('text').then(price => {
                product.price = price;
            });

            cy.get('.product-thumbnail-listing img').invoke('attr', 'src').then(thumbnailLink => {
                product.thumbnailLink = thumbnailLink;
            });

        }).then(() => {
            products.push(product);
        });
    }).then(() => {
        return products;
    });
});









