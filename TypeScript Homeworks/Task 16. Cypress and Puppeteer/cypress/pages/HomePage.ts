export class HomePage {
    public goTo(): void {
        cy.visit('https://shop.qaautomationlabs.com/shop.php');
    }

    public goToCategory(categoryName = 'Men Fashion'): void {
        let categoryIndex = 0;
        this.categoryCardTitle
            .should('be.visible')
            .invoke('text')
            .then((titleName) => {
                categoryIndex = titleName.indexOf(categoryName);
            });
        this.categoryCardButton
            .should('be.visible')
            .eq(categoryIndex).click();
        cy.wait(3000);
    }

    private get categoryCardList(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.col-md-6 div.offer-text');
    }

    private get categoryCardTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.col-md-6 div.offer-text h3');
    }

    private get categoryCardButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.col-md-6 div.offer-text a');
    }
}