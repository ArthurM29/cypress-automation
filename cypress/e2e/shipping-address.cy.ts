import {user} from "../data";
import {removeObjectKeys} from "../utils";
import { faker } from '@faker-js/faker';

beforeEach(() => {
    cy.loginWithSession(user.email, user.password);
    cy.visit('https://demo.evershop.io/account');
    cy.get('a[href*="account"]').as('account-icon').click();
    cy.contains('Add new address').click();
})


describe('Address form required fields', () => {

    interface AddressFieldData {
        field: string;
        locator: string;
        expectedMessage: string;
    }

    const addressRequiredFields: AddressFieldData[] = [
        {field: 'fullname', locator: 'input[name="address[full_name]"]', expectedMessage: 'Full name is required'},
        {field: 'telephone', locator: 'input[name="address[telephone]"]', expectedMessage: 'Telephone is required'},
        {field: 'address', locator: 'input[name="address[address_1]"]', expectedMessage: 'Address is required'},
        {field: 'city', locator: 'input[name="address[city]"]', expectedMessage: 'City is required'},
        {field: 'country', locator: 'select[name="address[country]"]', expectedMessage: 'Country is required'},
        {field: 'province', locator: 'select[name="address[province]"]', expectedMessage: 'Province is required'},
        {field: 'postcode', locator: 'input[name="address[postcode]"]', expectedMessage: 'Postcode is required'}
    ];

    addressRequiredFields.forEach(({field, locator, expectedMessage}) => {
        it(`should not allow to create an address without populating required field '${field}'`, () => {
            cy.fillOutAddressForm(removeObjectKeys(user.address, [field]));
            cy.contains('Save').click();
            cy.assertFieldErrorIsDisplayed(locator, expectedMessage);
        });
    });
});


it('should not all to create an address without populating all the fields', () => {
    user.address.fullname = `user.address.fullname_${faker.string.alpha(5)}`;
    cy.fillOutAddressForm(user.address);
    cy.get('.button.primary').click();

    cy.get('.Toastify__toast-body').should('be.visible').and('have.text', 'Address has been saved successfully!');
    cy.get('.Toastify__toast-body', { timeout: 10000 }).should('not.exist');
});


