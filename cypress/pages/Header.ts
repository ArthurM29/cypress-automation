import Chainable = Cypress.Chainable;

export class Header {

    static myAccountIcon = (): Chainable<JQuery<HTMLAnchorElement>> => cy.get('.self-center > a[href*="account"]');

    static clickMyAccountIcon = (): void => {
        Header.myAccountIcon().click();
    }
}
