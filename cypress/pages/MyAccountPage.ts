import Chainable = Cypress.Chainable;
import {LandingPage} from "./LandingPage";

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
}
