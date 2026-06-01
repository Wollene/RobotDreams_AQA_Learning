
# Task 10. Test Frameworks. Writing Unit Tests

> Write unit tests for previously implemented TypeScript functions and classes using two frameworks side by side — Jest and Mocha + Chai.

## Overview

This task introduces automated unit testing by covering code from earlier tasks with two of the most popular JavaScript test frameworks. The Jest sub-project tests the generic `addEntitiesInArray()` function from Task 7. The Mocha sub-project tests the `User` class from Task 8, using a global setup hook to fetch a real user from a public API before the suite runs.

---

## Project Structure

```
├── jest/
│   ├── tests/
│   │   └── addEntitiesInArray.spec.ts   — Jest tests for the Task 7 utility function
│   ├── jest.config.ts
│   ├── tsconfig.json
│   └── package.json
└── mocha/
    ├── tests/
    │   ├── globals.ts                   — Mocha global setup: fetches a User before the suite
    │   └── baseUserTest.spec.ts         — Chai-based tests for the Task 8 User class
    ├── .mocharc.json
    ├── tsconfig.json
    └── package.json
```

---

## Running the Tests

**Jest**
```bash
cd jest
npm test
```

**Mocha**
```bash
cd mocha
npm test
```

---

## What Is Tested

### Jest — `addEntitiesInArray()` (Task 7)

| Suite | Case |
|-------|------|
| Adding numbers | `[10, 15, 20]` → `45` |
| Adding numbers | `[4, 8, 15, 16, 23, 42]` → `108` |
| Adding numbers | `[-10, -11, -12]` → `-33` |
| Concatenating strings | `['Hello', 'Hey', 'Hola']` → `'HelloHeyHola'` |
| Concatenating strings | `['Hello', ',', ' ', 'World']` → `'Hello, World'` |
| Empty number array | throws `'Array is empty!'` |
| Empty string array | throws `'Array is empty!'` |

### Mocha + Chai — `User` class (Task 8)

A global setup hook (`mochaGlobalSetup`) fetches a live user from `https://jsonplaceholder.typicode.com/users/10` and stores it on `globalThis.user` before any test runs.

| Suite | Case |
|-------|------|
| Instance creation | `user` is an instance of `User` |
| Property types | `firstName`, `lastName` are `string`; `id` is `number` |
| `getFullName()` | returns a `string` |
| `getAddressInfo()` | returns a `string` |
| `getCompanyInfo()` | returns a `string` |

---

## Topics Covered

- Jest: `describe`, `test`, `expect`, `toBe`, `toThrow`
- Mocha: `describe`, `it`, global setup with `mochaGlobalSetup`
- Chai: `expect(...).to.be.instanceof`, `.to.be.a('string')`
- TypeScript integration: `ts-jest` for Jest, `ts-mocha` + `tsx` for Mocha
- ESM support via `NODE_OPTIONS=--experimental-vm-modules`
- Testing error-throwing functions
- Global async setup before a test suite
