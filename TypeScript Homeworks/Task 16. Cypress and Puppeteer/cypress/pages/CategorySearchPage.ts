export class CategorySearchPage {
    public findTitleAndAddToCart(itemName = 'Black T-Shirt'): void {
        let categoryIndex = 0;
        this.itemCardTitle
            .should('be.visible')
            .invoke('text')
            .then((card) => {
                categoryIndex = card.indexOf(itemName);
            });
        this.addToCardButton
            .should('be.visible')
            .eq(categoryIndex).click();
    }

    public get cartCount(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('span#cartCount');
    }

    private get itemCardList(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.product-item');
    }

    private get itemCardTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.product-item a.h6');
    }

    private get addToCardButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.product-item button');
    }
}