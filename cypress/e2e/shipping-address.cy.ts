import {Address, user} from "../data";
import {removeObjectKeys} from "../utils";
import {faker} from '@faker-js/faker';

beforeEach(() => {
    cy.loginWithSession(user.email, user.password);
    cy.visit('https://demo.evershop.io/account');
    cy.get('a[href*="account"]').as('account-icon').click();
    cy.contains('Add new address').click();
})


describe('Required fields', () => {
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

describe('Cancel', () => {
    const expectedAddress = {
        ...user.address,
        fullname: `${user.address.fullname}_${faker.string.alpha(5)}`
    };

    it('should cancel address creation if user clicks \'Close\' after entering data', () => {
        cy.fillOutAddressForm(expectedAddress);
        cy.contains('Close').click();

        cy.get('.modal').as('Edit Address screen').should('not.exist');
        cy.get('.order-history-empty').should('have.text', 'You have no addresses saved');
    });
})

describe('Create new Address', () => {
    const expectedAddress = {
        ...user.address,
        fullname: `${user.address.fullname}_${faker.string.alpha(5)}`
    };

    afterEach(() => {
        // delete created shipping address
        cy.contains(expectedAddress.fullname).closest('.border.rounded').contains('Delete').click();
    })

    it('should be able to create a new address with all populated fields stored correctly', () => {
        cy.fillOutAddressForm(expectedAddress);
        cy.get('.button.primary').click();

        cy.get('.Toastify__toast-body').should('be.visible').and('have.text', 'Address has been saved successfully!');
        cy.get('.Toastify__toast-body', {timeout: 10000}).should('not.exist');

        cy.getShippingAddresses().then((shippingAddresses: Address[]) => {
            cy.wrap(shippingAddresses).should('have.length', 1);
            const createdAddress = shippingAddresses.find(address =>
                address.fullname.toLowerCase() === expectedAddress.fullname.toLocaleLowerCase());

            cy.wrap(createdAddress).should((address) => {
                expect(address).to.deep.equal(expectedAddress);
            });
        });
    });
})




