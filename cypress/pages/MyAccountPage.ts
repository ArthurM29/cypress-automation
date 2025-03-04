import Chainable = Cypress.Chainable;
import {LandingPage} from "./LandingPage";
import {Address} from "../data";

export class MyAccountPage {
    static myAccountTitle = (): Chainable<JQuery<HTMLHeadingElement>> => cy.contains('My Account');

    static logoutButton = (): Chainable<JQuery<HTMLAnchorElement>> => cy.contains('Logout');

    static addNewAddressButton = (): Chainable<JQuery<HTMLAnchorElement>> => cy.contains('Add new address');

    static visit = (): void => {
        cy.visit('/account');
    }

    static logout(): void {
        MyAccountPage.logoutButton().click();
        LandingPage.shouldBeVisible();
    }

    static clickAddNewAddressButton() {
        MyAccountPage.addNewAddressButton().click();
    }

    static getShippingAddresses(): Chainable<Address[]> {
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
    }

    static getShippingAddressByFullname = (fullname: string): Cypress.Chainable<Address | undefined> => {
        return MyAccountPage.getShippingAddresses().then((addresses: Address[]) => {
            const matchedAddress = addresses.find(address =>
                address.fullname.toLowerCase() === fullname.toLowerCase()
            );

            return cy.wrap(matchedAddress);
        });
    };
}

