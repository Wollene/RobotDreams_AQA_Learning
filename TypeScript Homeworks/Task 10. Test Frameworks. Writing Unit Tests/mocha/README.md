
# Mocha + Chai — Unit Tests for the `User` Class

> Tests the `User` class from Task 8 using Mocha, Chai, and a global async setup hook that fetches a live user from a public API before any test runs.

## Setup

```bash
npm install
```

## Running Tests

```bash
npm test
```

---

## Project Structure

```
mocha/
├── tests/
│   ├── globals.ts                — global setup: fetches a User before the suite
│   └── baseUserTest.spec.ts      — all test suites
├── .mocharc.json                 — Mocha configuration
├── tsconfig.json
└── package.json
```

---

## How the Global Setup Works

[tests/globals.ts](tests/globals.ts) exports `mochaGlobalSetup`, which Mocha calls once before any test file is loaded. It fetches user #10 from the JSONPlaceholder API and stores the result on `globalThis.user`:

```ts
export async function mochaGlobalSetup(): Promise<void> {
    globalThis.user = await getUser('https://jsonplaceholder.typicode.com/users/10');
}
```

The `.mocharc.json` wires this up via `"require": ["tsx", "./tests/globals.ts"]`. A 10-second `timeout` is set to account for the network request.

---

## Test Cases

### Instance creation

| Assertion | Expected |
|-----------|----------|
| `user` is an instance of `User` | `true` |

### Property types

| Property | Expected type |
|----------|--------------|
| `firstName` | `string` |
| `lastName` | `string` |
| `id` | `number` |

### Method return types

| Method | Expected return type |
|--------|---------------------|
| `getFullName()` | `string` |
| `getAddressInfo()` | `string` |
| `getCompanyInfo()` | `string` |

---

## Configuration Notes

Key settings in [.mocharc.json](.mocharc.json):

| Option | Value | Why |
|--------|-------|-----|
| `extension` | `["ts"]` | Tells Mocha to look for `.ts` test files |
| `require` | `["tsx", "./tests/globals.ts"]` | Loads the `tsx` transpiler and runs global setup before tests |
| `spec` | `tests/**/*.spec.ts` | Glob pattern for discovering test files |
| `timeout` | `10000` | 10-second limit per test — needed for the async API fetch in setup |

---

## Key APIs Used

| API | Purpose |
|-----|---------|
| `describe()` | Groups related tests into a named suite |
| `it()` | Defines a single test case (Mocha's alias for `test`) |
| `expect(...).to.be.instanceof()` | Asserts the value is an instance of a class |
| `expect(...).to.be.a('string')` | Asserts the value's type is a string |
| `mochaGlobalSetup` | Mocha lifecycle hook — runs once before all tests |
