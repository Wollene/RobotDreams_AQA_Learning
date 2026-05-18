
# Task 6. Async in JavaScript. Error Handling and Debugging

> Learn how JavaScript handles asynchronous operations using Promises, async/await, and try/catch error handling.

## Overview

This task explores three approaches to asynchronous programming in JavaScript. Each file focuses on a different mechanism for handling async HTTP requests and processing their results. The final file also covers error recovery and custom error creation.

---

## Project Structure

| File | Description |
|------|-------------|
| `src/promises.js` | Async HTTP request handled with `.then()` chains |
| `src/async-await.js` | Same logic rewritten using `async`/`await` |
| `src/try-catch.js` | Error handling with fallback requests and custom errors |

---

## Task 1 — Promises (`promises.js`)

You are practicing JavaScript Promises and asynchronous HTTP requests.

Your task is to create a function that sends an HTTP request using `fetch()` to a resource that returns JSON. Then use a `.then()` chain to process the response and pass the parsed JSON into another function.

The goal of this exercise is to understand how asynchronous requests work with Promises and how `.then()` chains sequence async operations.

**Key concepts:** `Promise`, `fetch()`, `.then()`, `.json()`, chaining, callback-style async

---

## Task 2 — Async/Await (`async-await.js`)

You are practicing asynchronous JavaScript using `async` and `await`.

Your task is to repeat the same logic from `promises.js` — fetching JSON data and passing it to another function — but rewritten using `async`/`await` instead of `.then()` chains.

The goal of this exercise is to understand how `async`/`await` makes asynchronous code look and behave more like synchronous code, improving readability.

**Key concepts:** `async`, `await`, `fetch()`, sequential async flow

---

## Task 3 — Error Handling (`try-catch.js`)

You are practicing JavaScript error handling with fallback logic.

Your task is to send a request to a resource that does not exist. When the request fails, the program should automatically send a second request to a valid resource. If the second request also returns an invalid response, you should throw a custom error.

The goal of this exercise is to understand how `try...catch` handles failures, how to implement fallback logic, and how to define and throw custom errors.

**Key concepts:** `try`, `catch`, `throw`, custom `Error`, fallback logic, `Response.ok`

---

## Topics Covered

- Asynchronous JavaScript fundamentals
- `Promise` API and `.then()` / `.catch()` chaining
- `async` / `await` syntax
- `fetch()` for HTTP requests
- `try...catch` for error handling
- Fallback request logic
- Custom error creation with `throw new Error()`
