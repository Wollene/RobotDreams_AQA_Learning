
# Task 7. Introduction to TypeScript. Data Types in TypeScript

> Rewrite JavaScript functions using TypeScript's static type system, adding explicit type annotations throughout.

## Overview

This task introduces TypeScript as a typed superset of JavaScript. The goal is to understand how adding type annotations changes how you write functions — catching errors at compile time rather than at runtime. The exercises mirror Task 5, but with TypeScript syntax.

---

## Project Structure

| File | Description |
|------|-------------|
| `src/functions.ts` | Typed function declarations with explicit parameter and return types |
| `src/arrow-functions.ts` | Typed arrow functions using TypeScript syntax |

---

## Task 1 — Typed Functions (`functions.ts`)

You are rewriting regular JavaScript functions using TypeScript type annotations.

Your task is to create typed functions that accept parameters with explicit types and declare their return type. The function logic mirrors `functions.js` from Task 5, but now TypeScript enforces that only the correct types are passed.

The goal of this exercise is to understand how TypeScript's type system prevents type-related bugs at compile time.

**Key concepts:** type annotations, `: string`, `: number`, `: boolean`, typed parameters, typed return values

---

## Task 2 — Typed Arrow Functions (`arrow-functions.ts`)

You are rewriting arrow functions using TypeScript.

Your task is to repeat the same logic as `arrow-functions.js` from Task 5, but using TypeScript's type annotation syntax for arrow functions.

The goal of this exercise is to understand how arrow functions are typed in TypeScript, including how to annotate parameters and return types in the arrow function shorthand.

**Key concepts:** typed arrow functions, `(param: Type): ReturnType => ...`, `Array<T>`, generic types

---

## Topics Covered

- TypeScript as a superset of JavaScript
- Primitive types: `string`, `number`, `boolean`
- Typed function declarations and arrow functions
- Return type annotations
- Array types: `number[]` / `Array<number>`
- TypeScript compilation with `npx tsx`
