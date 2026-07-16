export class LoginPage {
    public goTo(): void {
        cy.visit('https://shop.qaautomationlabs.com/');
    }

    public logIn(useLoginButton = false): void {
        this.fetchEmail.then((email) => {
            cy.get('input[type="email"]').type(email);
        });
        this.fetchPassword.then((password) => {
            cy.get('input[type="password"]').type(password);
        });
        if (useLoginButton) {
            this.loginButton.click();
        } else {
            this.loginButton.type('{enter}');
        }
    }

    private get loginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('button#loginBtn');
    }

    private get fetchEmail(): Cypress.Chainable<string> {
        return this.emailBlock
                .should('be.visible')
                .invoke('text')
                .then((element) => element.split(' ')[1].trim());
    }

    private get fetchPassword(): Cypress.Chainable<string> {
        return this.passwordBlock
                .should('be.visible')
                .invoke('text')
                .then((element) => element.split(' ')[1].trim());
    }

    private get emailBlock(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('p.help-block:first-child');
    }

    private get passwordBlock(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('p.help-block:last-child');
    }
}