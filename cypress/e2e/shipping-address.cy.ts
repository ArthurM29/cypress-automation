import {user} from "../data";
import {removeObjectKeys} from "../utils";
import {faker} from '@faker-js/faker';
import {LoginPage} from "../pages/LoginPage";
import {MyAccountPage} from "../pages/MyAccountPage";
import {Header} from "../pages/Header";
import {AddressForm} from "../pages/AddressForm";
import Chainable = Cypress.Chainable;


beforeEach(() => {
    LoginPage.loginWithSession(user.email, user.password);
    MyAccountPage.visit();
    Header.visitMyAccount();
    MyAccountPage.clickAddNewAddressButton();
})


describe('Required fields', () => {
    interface AddressFieldData {
        field: string;
        emptyFormField: () => Chainable<JQuery<HTMLElement>>;
        expectedMessage: string;
    }

    const addressRequiredFields: AddressFieldData[] = [
        {field: 'fullname', emptyFormField: () => AddressForm.fullnameInput(), expectedMessage: 'Full name is required'},
        {field: 'telephone', emptyFormField: () => AddressForm.telephoneInput(), expectedMessage: 'Telephone is required'},
        {field: 'address', emptyFormField: () => AddressForm.addressInput(), expectedMessage: 'Address is required'},
        {field: 'city', emptyFormField: () => AddressForm.cityInput(), expectedMessage: 'City is required'},
        {field: 'country', emptyFormField: () => AddressForm.countryDropdown(), expectedMessage: 'Country is required'},
        {field: 'province', emptyFormField: () => AddressForm.provinceDropdown(), expectedMessage: 'Province is required'},
        {field: 'postcode', emptyFormField: () => AddressForm.postcodeInput(), expectedMessage: 'Postcode is required'}
    ];

    addressRequiredFields.forEach(({field, emptyFormField, expectedMessage}) => {
        it(`should not allow to create an address without populating required field '${field}'`, () => {
            AddressForm.fillOutAddressForm(removeObjectKeys(user.address, [field]));
            AddressForm.saveButton().click();

            emptyFormField().shouldDisplayInputError(expectedMessage);
        });
    });
});

describe('Cancel', () => {
    const expectedAddress = {
        ...user.address,
        fullname: `${user.address.fullname}_${faker.string.alpha(5)}`
    };

    it(`should cancel address creation if user clicks 'Close' after entering data`, () => {
        AddressForm.fillOutAddressForm(expectedAddress);
        AddressForm.closeButton().click();

        AddressForm.editAddressForm().should('not.exist');
        AddressForm.noAddressesSavedLabel().should('have.text', 'You have no addresses saved');
    });
})

describe('Create new Address', () => {
    const expectedAddress = {
        ...user.address,
        fullname: `${user.address.fullname}_${faker.string.alpha(5)}`
    };

    afterEach(() => {
        // delete created shipping address
        AddressForm.deleteShippingAddress(expectedAddress.fullname);
    })

    it('should be able to create a new address with all populated fields stored correctly', () => {
        AddressForm.fillOutAddressForm(expectedAddress);
        AddressForm.saveButton().click();

        AddressForm.confirmationToast().should('be.visible').and('have.text', 'Address has been saved successfully!');
        AddressForm.confirmationToast({ timeout: 10000 }).should('not.exist');

        MyAccountPage.getShippingAddresses().should('have.length', 1);
        MyAccountPage.getShippingAddressByFullname(expectedAddress.fullname).then((address) => {
            expect(address).to.deep.equal(expectedAddress);
        });
    });
})




