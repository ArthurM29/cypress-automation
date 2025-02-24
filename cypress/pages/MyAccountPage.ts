import Chainable = Cypress.Chainable;
import {LandingPage} from "./LandingPage";

export class MyAccountPage {
    static myAccountTitle = (): Chainable<JQuery<HTMLHeadingElement>> => cy.contains('My Account');

    static logoutButton = (): Chainable<JQuery<HTMLAnchorElement>> => cy.contains('Logout');

    static logout(): void {
        MyAccountPage.logoutButton().click();
        LandingPage.shouldBeVisible();
    }
}
