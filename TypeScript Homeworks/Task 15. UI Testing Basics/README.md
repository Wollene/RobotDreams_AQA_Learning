
# Task 15. UI Testing Basics

> CSS and XPath locator practice on a real e-commerce site — a 13-step positive test scenario written in both selector syntaxes, targeting [Rozetka](https://rozetka.com.ua/).

## Overview

This is a non-code task. The deliverable is a `.txt` file documenting a manual test case — **"Searching for a Product and Adding it to the Cart"** — on Ukraine's largest online store, Rozetka. The scenario is written twice: once using CSS selectors, once using XPath expressions, covering the same 13 steps in both syntaxes.

---

## Files

| File | Contents |
|------|----------|
| [CSS and xPath Practice.txt](CSS%20and%20xPath%20Practice.txt) | 13-step test scenario with CSS selectors and XPath expressions side by side |

---

## Test Scenario: Search for "Dyson HD07" and Add to Cart

| Step | Action | CSS Selector | XPath |
|------|--------|--------------|-------|
| 1 | Navigate to [rozetka.com.ua](https://rozetka.com.ua/) | — | — |
| 2 | Click the search input | `input[placeholder="Я шукаю..."]` | `//input[@placeholder="Я шукаю..."]` |
| 3 | Type `"Dyson HD07"` | — | — |
| 4 | Click the search submit button | `button[type="submit"]` | `//button[@type="submit"]` |
| 5 | Wait for results page to render | — | — |
| 6 | Find and click the first result matching `"Dyson HD07"`; capture its title | `a.tile-title` *(iterate array)* | `//a[contains(@class, 'tile-title')]` *(iterate array)* |
| 7 | Wait for product page to render | — | — |
| 8 | Assert page title matches the captured title from step 6 | `h1.title__font` | `//h1[@class="title__font"]` |
| 9 | Click the "Buy" button | `span.buy-button__label` | `//span[text()=" Купити "]` |
| 10 | Assert the cart modal opens automatically | `rz-modal` | `//rz-modal` |
| 11 | Assert cart product title matches the captured title from step 6 | `rz-cart-purchases span.cart-product__title` | `//rz-cart-purchases//span[@class="cart-product__title"]` |
| 12 | Close the modal | `rz-modal-close-btn` | `//rz-modal-close-btn` |
| 13 | Assert the cart badge shows `"1"` | `button[aria-label="Відкрити корзину"] div.badge` | `//button[@aria-label="Відкрити корзину"]//div[contains(@class, "badge")]` |

---

## Locator Syntax Notes

| Concept | CSS | XPath |
|---------|-----|-------|
| Element by attribute | `input[type="submit"]` | `//input[@type="submit"]` |
| Element by class | `h1.title__font` | `//h1[@class="title__font"]` |
| Attribute contains | `div[class*="badge"]` | `//div[contains(@class, "badge")]` |
| Text match | *(not natively supported)* | `//span[text()=" Купити "]` |
| Descendant combinator | `parent child` | `//parent//child` |
| Direct child | `parent > child` | `//parent/child` |

---

## Topics Covered

- CSS selector syntax: attribute selectors, class selectors, descendant combinators
- XPath expression syntax: `@attribute`, `text()`, `contains()`, `//` vs `/` traversal
- Iterating a list of matching elements to find a specific item by text content
- Testing a real-world CRUD-like UI flow (search → product page → cart)
- Cross-referencing locators between CSS and XPath for the same target element
