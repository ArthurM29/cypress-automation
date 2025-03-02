import Chainable = Cypress.Chainable;

export class LandingPage {

    static blueBanner = (): Chainable<JQuery<HTMLDivElement>> => cy.get('main > div:nth-child(1) .prose');

    static visit = (): void => {
        cy.visit('/');
    }

    static shouldBeVisible(): void {
        LandingPage.blueBanner().should('be.visible');
    }
}
