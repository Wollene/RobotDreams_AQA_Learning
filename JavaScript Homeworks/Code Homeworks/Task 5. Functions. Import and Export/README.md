
# Task 5. Functions. Import/Export

> Practice function declarations, arrow functions, and object accessors using getters and setters.

## Overview

This task focuses on the different ways to define and use functions in JavaScript. It also introduces getters and setters as a way to control access to object properties. Each concept is practiced in a separate file.

---

## Project Structure

| File | Description |
|------|-------------|
| `src/functions.js` | Classic function declaration that processes arrays |
| `src/arrow-functions.js` | Arrow function equivalent of the same logic |
| `src/getter-setters.js` | Object with nested structure, getters, setters, and a method |

---

## Task 1 — Function Declarations (`functions.js`)

You are practicing basic JavaScript functions.

Your task is to create a regular function that accepts an array, adds all its elements together, and returns the result. Then create two arrays — one of strings and one of numbers — and pass each to the function.

The goal of this exercise is to understand how functions receive arguments, process data, and return a result.

**Key concepts:** `function` declaration, parameters, `return`, function calls, string concatenation vs numeric addition

---

## Task 2 — Arrow Functions (`arrow-functions.js`)

You are practicing arrow functions in JavaScript.

Your task is to replicate the logic from `functions.js` using an arrow function. The function should accept one array, sum its elements, and return the result.

The goal of this exercise is to understand the syntactic differences between function declarations and arrow functions, and when each form is appropriate.

**Key concepts:** arrow function syntax (`=>`), implicit vs explicit `return`, `const` functions

---

## Task 3 — Getters and Setters (`getter-setters.js`)

You are practicing JavaScript objects with controlled property access.

Your task is to create an object with at least two levels of nesting. The object should include `get` and `set` accessors for selected properties, along with a method that reads and returns data from the object.

The goal of this exercise is to understand how getters and setters provide a controlled interface to internal object data, including input validation inside setters.

**Key concepts:** `get`, `set`, nested objects, object methods, `this`, input validation

---

## Topics Covered

- Function declarations vs arrow functions
- Parameters, arguments, and `return` values
- Arrow function syntax and shorthand forms
- Object getters (`get`) and setters (`set`)
- Nested object structures
- `this` context inside methods
