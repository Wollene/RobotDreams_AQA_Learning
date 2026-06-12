
# Mocha + Sinon — Mocking and Testing Isolated Components

> Tests `getUser()` and the `User` class in complete isolation — no real network calls — using Sinon stubs to replace `global.fetch` and Sinon spies to monitor method invocations.

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
mocha-sinon/
├── tests/
│   ├── globals.ts                — global setup: stores the target URL on globalThis
│   └── base-user-test.spec.ts    — all test suites
├── .mocharc.json                 — Mocha configuration
├── tsconfig.json
└── package.json

../src/
├── classes/
│   ├── BaseUser.ts               — abstract base class implementing IUser
│   └── User.ts                   — concrete class with getFullName / getAddressInfo / getCompanyInfo
├── interfaces/
│   └── user.interfaces.ts        — IUser, Address, Geo, Company interfaces
├── services/
│   └── api.services.ts           — getUser(url) — fetches and constructs a User
└── index.ts
```

---

## Test Suites

### Suite 1 — `getUser()` Verification (Sinon Stub)

`global.fetch` is replaced with a `sinon.stub` in `beforeEach` and restored in `afterEach`. All four tests run against a hardcoded `mockUser` object — no network traffic occurs.

| Test | What is verified |
|------|-----------------|
| Called once with the correct URL | `fetchStub.calledOnceWithExactly(url)` is `true` |
| Returns a `User` instance | result is `instanceof User` |
| All properties have correct types and values | `id` is `number` equal to `1`; `name`, `username`, `email`, `phone`, `website` are `string`s with expected values; `address` has all required keys; `company` has all required keys |
| Rejects → throws `'Failed to send a request.'` | `fetchStub.rejects(...)` → caught error message equals `'Failed to send a request.'` |

### Suite 2 — `User` Class Verification (Sinon Spy)

A `User` is instantiated from `mockUser`. Each method is wrapped in a `sinon.spy` before the test and cleaned up in `afterEach`.

| Test | What is verified |
|------|-----------------|
| `getFullName()` | spy records the call; `returnValues[0]` equals the actual return value |
| `getAddressInfo()` | spy records the call; `returnValues[0]` equals the actual return value |
| `getCompanyInfo()` | spy records the call; `returnValues[0]` equals the actual return value |

---

## The `mockUser` Object

```ts
const mockUser = {
    id: 1,
    name: 'Example User',
    username: 'exampleuser',
    email: 'user@example.com',
    phone: '111-2345',
    website: 'example.com',
    address: {
        street: 'Example St', suite: 'Apt 1',
        city: 'Example City', zipcode: '12345',
        geo: { lat: 40.7128, lng: -74.006 }
    },
    company: { name: 'Example Corp', catchPhrase: 'Example Phrase', bs: 'example dummy something' }
};
```

---

## Configuration Notes

Key settings in [.mocharc.json](.mocharc.json):

| Option | Value | Why |
|--------|-------|-----|
| `extension` | `["ts"]` | Tells Mocha to look for `.ts` test files |
| `require` | `["tsx", "./tests/globals.ts"]` | Loads the `tsx` transpiler and runs global setup before tests |
| `spec` | `tests/**/*.spec.ts` | Glob pattern for discovering test files |
| `timeout` | `10000` | 10-second limit per test |

---

## Key APIs Used

| API | Purpose |
|-----|---------|
| `sinon.stub(global, 'fetch')` | Replaces the real `fetch` with a controllable fake |
| `fetchStub.resolves({ json: sinon.stub().resolves(mockUser) })` | Makes the stub return a fake response with a nested stub for `.json()` |
| `fetchStub.rejects(new Error(...))` | Makes the stub simulate a network failure |
| `fetchStub.calledOnceWithExactly(url)` | Asserts the stub was called exactly once with the given argument |
| `sinon.spy(obj, 'method')` | Wraps a real method to record calls without changing its behavior |
| `spy.returnValues[0]` | The value returned by the first invocation of the spy |
| `fetchStub.restore()` | Removes the stub and restores the original `fetch` |
