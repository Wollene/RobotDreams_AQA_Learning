
# Task 16. Cypress and Puppeteer

> End-to-end UI test for a demo e-commerce shop using **Cypress** and the **Page Object Model** — logs in, navigates to a product category, adds an item to the cart, and verifies the cart counter.

## Overview

This task implements a positive e2e scenario against [shop.qaautomationlabs.com](https://shop.qaautomationlabs.com/) — a dedicated QA automation practice store. The tests are written in Cypress 15 with TypeScript. Three Page Object classes (`LoginPage`, `HomePage`, `CategorySearchPage`) encapsulate all selectors and actions, keeping the spec file clean and readable.

A noteworthy detail: the login page displays the demo credentials directly in the UI (`p.help-block` hint elements). `LoginPage` reads them from the DOM rather than from a `.env` file or fixture — intentional for a public demo site with no real secrets to protect.

---

## Setup

Install dependencies:

```bash
npm install
```

No `.env` or credentials file needed — the site exposes demo credentials on the login page itself.

## Running Tests

| Command | Mode |
|---------|------|
| `npm run cy:open` | Interactive (Cypress Test Runner UI) |
| `npx cypress run` | Headless (CI / command line) |

---

## Project Structure

```
Task 16. Cypress and Puppeteer/
├── cypress/
│   ├── e2e/
│   │   └── search-and-cart.cy.ts   — single spec: login → category → add to cart
│   ├── pages/
│   │   ├── LoginPage.ts             — login form interactions and credential discovery
│   │   ├── HomePage.ts              — category card navigation
│   │   └── CategorySearchPage.ts   — product search, add-to-cart, cart counter
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.ts              — custom Cypress commands (scaffold)
│       └── e2e.ts                   — global support file, imports commands
├── cypress.config.ts                — Cypress configuration
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## Page Objects (`cypress/pages/`)

### `LoginPage`

| Member | Type | Selector | What it does |
|--------|------|----------|--------------|
| `goTo()` | method | — | Visits `https://shop.qaautomationlabs.com/` |
| `logIn(useLoginButton?)` | method | — | Reads email/password from the page's hint text, types them, then clicks the login button (or presses Enter if `useLoginButton` is `false`) |
| `emailBlock` | private getter | `p.help-block:first-child` | Hint element that displays the demo email |
| `passwordBlock` | private getter | `p.help-block:last-child` | Hint element that displays the demo password |
| `loginButton` | private getter | `button#loginBtn` | The submit button |

`fetchEmail` and `fetchPassword` invoke `.text()` on the hint elements, split by whitespace, and trim to extract the credential value.

### `HomePage`

| Member | Type | Selector | What it does |
|--------|------|----------|--------------|
| `goTo()` | method | — | Visits `https://shop.qaautomationlabs.com/shop.php` |
| `goToCategory(categoryName?)` | method | — | Finds the index of the matching category by title, clicks the corresponding button; waits 3 s for the page to render |
| `categoryCardTitle` | private getter | `div.col-md-6 div.offer-text h3` | Category card headings |
| `categoryCardButton` | private getter | `div.col-md-6 div.offer-text a` | Category card "Browse" links |

### `CategorySearchPage`

| Member | Type | Selector | What it does |
|--------|------|----------|--------------|
| `findTitleAndAddToCart(itemName?)` | method | — | Finds the index of the matching product by title, clicks the corresponding "Add to Cart" button |
| `cartCount` | **public** getter | `span#cartCount` | Cart item counter badge — exposed publicly for test assertions |
| `itemCardTitle` | private getter | `div.product-item a.h6` | Product card title links |
| `addToCardButton` | private getter | `div.product-item button` | "Add to Cart" buttons |

---

## Test Suite

### `search-and-cart.cy.ts` — Positive Testing: Search for a Product and Add to Cart

`before()` hook sets the viewport to `1920×1080`, navigates to the login page, and logs in by clicking the button.

| Test | What is verified |
|------|-----------------|
| `Searching for 'Men Fashion' category and clicking on the card` | `homePage.goToCategory('Men Fashion')` finds and clicks the matching category card |
| `Searching for 'Black T-Shirt' and adding it to cart` | `categorySearchPage.findTitleAndAddToCart('Black T-Shirt')` finds the product and clicks "Add to Cart" |
| `Ensuring the item is added to the cart` | `categorySearchPage.cartCount` is visible and resolves to `1` |

---

## Configuration Notes

Key settings in [cypress.config.ts](cypress.config.ts):

| Option | Value | Why |
|--------|-------|-----|
| `allowCypressEnv` | `false` | Disables `CYPRESS_*` environment variable overrides for a cleaner, more predictable config |
| `retries.runMode` | `1` | Retries a failing test once when running headlessly (e.g. in CI) |
| `retries.openMode` | `0` | No retries in the interactive Test Runner — failures are shown immediately |

`Cypress.on('uncaught:exception', () => false)` is registered in the spec to suppress third-party JS errors thrown by the demo site that would otherwise fail the test.

---

## Topics Covered

- Cypress e2e testing with TypeScript
- Page Object Model — encapsulating selectors and interactions per page
- Reading dynamic credentials from page UI elements (`invoke('text')`)
- CSS selector strategies: attribute selectors, pseudo-selectors, descendant combinators
- Index-based element selection from a list (`cy.get(...).eq(index)`)
- Cypress retry-ability and assertion chaining (`.should()`, `.invoke()`, `.then()`)
- Cypress viewport configuration and test lifecycle hooks (`before()`)
