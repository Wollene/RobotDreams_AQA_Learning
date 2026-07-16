import { CategorySearchPage } from '../pages/CategorySearchPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

describe('Positive Testing -> Searching for a Product and Adding it to the Cart:', () => {
    const loginPage = new LoginPage;
    const homePage = new HomePage;
    const categorySearchPage = new CategorySearchPage;

    before(() => {
        cy.viewport(1920, 1080);
        loginPage.goTo();
        loginPage.logIn(true);
    });

    it('Searching for \'Men Fashion\' category and clicking on the card.', () => {
        homePage.goToCategory('Men Fashion');
    })

    it('Searching for \'Black T-Shirt\' and adding it to cart.', () => {
        categorySearchPage.findTitleAndAddToCart('Black T-Shirt');
    })

    it('Ensuring the item is added to the cart.', () => {
        categorySearchPage.cartCount
            .should('be.visible')
            .invoke('text')
            .then((index) => {
                Number(index);
            })
            .eq(1);
    })
})