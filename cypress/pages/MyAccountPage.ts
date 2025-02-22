import Chainable = Cypress.Chainable;

export class MyAccountPage {
    static myAccountTitle = (): Chainable<JQuery<HTMLHeadingElement>> => cy.contains('My Account');

    static logoutButton = (): Chainable<JQuery<HTMLAnchorElement>> => cy.get('a.text-interactive');
}
