import Chainable = Cypress.Chainable;

export class HomePage {

    static blueBanner = (): Chainable<JQuery<HTMLDivElement>> => cy.get('main > div:nth-child(1) .prose');

    static visit = (): void => {
        cy.visit('https://demo.evershop.io/');
    }
}
