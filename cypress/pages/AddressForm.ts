import Chainable = Cypress.Chainable;
import {LandingPage} from "./LandingPage";
import {Address} from "../data";

export class AddressForm {
    static fullnameInput = (): Chainable<JQuery<HTMLInputElement>> => cy.get('input[name="address[full_name]"]');
    static telephoneInput = (): Chainable<JQuery<HTMLInputElement>> => cy.get('input[name="address[telephone]"]');
    static addressInput = (): Chainable<JQuery<HTMLInputElement>> => cy.get('input[name="address[address_1]"]');
    static cityInput = (): Chainable<JQuery<HTMLInputElement>> => cy.get('input[name="address[city]"]');
    static countryDropdown = (): Chainable<JQuery<HTMLSelectElement>> => cy.get('select[name="address[country]"]');
    static provinceDropdown = (): Chainable<JQuery<HTMLSelectElement>> => cy.get('select[name="address[province]"]');
    static postcodeInput = (): Chainable<JQuery<HTMLInputElement>> => cy.get('input[name="address[postcode]"]');
    static saveButton = (): Chainable<JQuery<HTMLSpanElement>> => cy.contains('Save');
    static closeButton = (): Chainable<JQuery<HTMLSpanElement>> => cy.contains('Close');
    static editAddressForm = (): Chainable<JQuery<HTMLDivElement>> => cy.get('.modal');
    static noAddressesSavedLabel = (): Chainable<JQuery<HTMLDivElement>> => cy.get('.order-history-empty');
    static confirmationToast = (options?: { timeout?: number }): Chainable<JQuery<HTMLDivElement>> =>
        cy.get('.Toastify__toast-body', options);

    static fillOutAddressForm(address: Partial<Address>): void {
        if (address.fullname) {
            cy.get('input[name="address[full_name]"]').type(address.fullname);
        }
        if (address.telephone) {
            cy.get('input[name="address[telephone]"]').type(address.telephone);
        }
        if (address.address) {
            cy.get('input[name="address[address_1]"]').type(address.address);
        }
        if (address.city) {
            cy.get('input[name="address[city]"]').type(address.city);
        }
        if (address.country) {
            cy.get('select[name="address[country]"]').select(address.country);

            if (address.province) {
                cy.get('select[name="address[province]"]').select(address.province);
            }
        }
        if (address.postcode) {
            cy.get('input[name="address[postcode]"]').type(address.postcode);
        }
    }

    static getShippingAddress(fullname: string): Chainable<JQuery<HTMLDivElement>> {
        return cy.contains(fullname).closest('.border.rounded');
    }

    static deleteShippingAddress(fullname: string): void {
        AddressForm.getShippingAddress(fullname).contains('Delete').click();
    }

}
