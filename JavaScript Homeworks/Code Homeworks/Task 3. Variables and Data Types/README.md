
# Task 3. Variables and Data Types

> Explore JavaScript's type system through arithmetic operations, comparison operators, conditional structures, and control flow.

## Overview

This task covers the fundamentals of JavaScript variables and data types. Each file focuses on a distinct area — from how JavaScript handles mixed-type arithmetic, to making decisions with `if/else` and `switch`.

The project is initialized following the [JavaScript project setup guide](https://coda.io/d/_d3DDrmEyeIe/JS_su7Ia38Z).

---

## Project Structure

| File | Description |
|------|-------------|
| `src/arifmetics.js` | Arithmetic and type coercion with different data types |
| `src/logical.js` | Comparison operators and logical expressions |
| `src/decision-tree.js` | Conditional branching with `if`, `else if`, and `else` |
| `src/switch.js` | Control flow with `switch`, `case`, `break`, and `default` |

---

## Task 1 — Arithmetic and Type Coercion (`arifmetics.js`)

You are exploring how JavaScript handles arithmetic operations across different data types.

Your task is to create variables of several types — numbers, strings, booleans, `null`, and `undefined` — and observe what happens when you perform operations between them.

The goal of this exercise is to understand JavaScript's implicit type coercion and why mixing types can produce unexpected results like `NaN` or string concatenation instead of addition.

**Key concepts:** `const`, type coercion, `NaN`, template literals, `typeof`

---

## Task 2 — Logical and Comparison Operators (`logical.js`)

You are exploring how JavaScript compares values of different types.

Your task is to create variables of different types and test how `==` and `===` behave, along with logical operators `&&`, `||`, and `!`.

The goal of this exercise is to understand the difference between loose equality (type coercion) and strict equality (no coercion), and to practice building logical expressions.

**Key concepts:** `==`, `===`, `&&`, `||`, `!`, truthy/falsy values

---

## Task 3 — Decision Tree (`decision-tree.js`)

You are writing a simple user access verification system.

The system should decide what action to take based on a user's age, status, balance, or role. Your task is to use `if`, `else if`, and `else` to create branching decision logic.

The goal of this exercise is to learn how to build readable decision trees in JavaScript.

**Key concepts:** `if`, `else if`, `else`, conditions, nested branching

---

## Task 4 — Command Handler (`switch.js`)

You are creating a simple command handler. A user can provide a command as a string, and the program should perform the corresponding action.

Your task is to use the `switch...case` structure to handle different command options and provide a fallback for unknown commands.

The goal of this exercise is to understand when to use `switch` over `if/else`, and how `break` and `default` control flow.

**Key concepts:** `switch`, `case`, `break`, `default`

---

## Topics Covered

- Variable declarations: `var`, `let`, `const`
- Primitive types: `number`, `string`, `boolean`, `null`, `undefined`
- Type coercion and `NaN`
- Equality operators: `==` vs `===`
- Logical operators: `&&`, `||`, `!`
- Conditional structures: `if/else if/else`
- Control flow: `switch/case`
