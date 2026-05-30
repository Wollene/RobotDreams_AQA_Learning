
# Jest — Unit Tests for `addEntitiesInArray()`

> Tests the generic `addEntitiesInArray()` utility from Task 7 using Jest and `ts-jest` with full ESM support.

## Setup

```bash
npm install
```

## Running Tests

```bash
# cross-platform (recommended)
npm test

# Windows only
npm run debug:win

# Linux / macOS only
npm run debug:nix
```

> `NODE_OPTIONS=--experimental-vm-modules` is required because the project uses `"type": "module"` (ESM). The `npm test` script sets this automatically via `cross-env`.

---

## Project Structure

```
jest/
├── tests/
│   └── addEntitiesInArray.spec.ts   — all test suites
├── jest.config.ts                   — Jest configuration
├── tsconfig.json
└── package.json
```

---

## Test Cases

### Number arrays

| Input | Expected output |
|-------|----------------|
| `[10, 15, 20]` | `45` |
| `[4, 8, 15, 16, 23, 42]` | `108` |
| `[-10, -11, -12]` | `-33` |

### String arrays

| Input | Expected output |
|-------|----------------|
| `['Hello', 'Hey', 'Hola']` | `'HelloHeyHola'` |
| `['Hello', ',', ' ', 'World']` | `'Hello, World'` |

### Empty array error handling

| Input | Expected behavior |
|-------|------------------|
| `[]` (number array) | throws `'Array is empty!'` |
| `[]` (string array) | throws `'Array is empty!'` |

---

## Configuration Notes

Key settings in [jest.config.ts](jest.config.ts):

| Option | Value | Why |
|--------|-------|-----|
| `preset` | `ts-jest/presets/default-esm` | Enables TypeScript + ESM in one preset |
| `extensionsToTreatAsEsm` | `['.ts']` | Tells Jest to treat `.ts` files as ES modules |
| `transform` | `ts-jest` with `useESM: true` | Transpiles TypeScript on the fly |
| `verbose` | `true` | Prints each individual test name in the output |
| `clearMocks` | `true` | Resets all mock state between tests |
| `testMatch` | `**/tests/**/*.ts` | Picks up any `.spec.ts` / `.test.ts` inside `tests/` |

---

## Key APIs Used

| API | Purpose |
|-----|---------|
| `describe()` | Groups related tests into a named suite |
| `test()` | Defines a single test case |
| `expect(...).toBe()` | Strict equality assertion |
| `expect(...).toThrow()` | Asserts the function throws with a given message |
