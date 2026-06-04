
# Task 12. API Testing Basics

> Test a public REST API end-to-end using Postman — covering response status, body structure, data types, and chained environment variables across requests.

## Overview

This task introduces API testing through Postman. A collection of four requests targets the [Official Joke API](https://official-joke-api.appspot.com). Each request has an embedded test script that validates the response. The first request captures a `jokeId` from the response and stores it as an environment variable, which the third request then uses to verify it gets back the exact same joke — demonstrating request chaining.

---

## Files

| File | Description |
|------|-------------|
| `Jokes API.postman_collection.json` | Postman collection with 4 requests and their test scripts |
| `Jokes API.postman_environment.json` | Postman environment with the `jokeId` variable |

---

## Importing into Postman

1. Open Postman.
2. Click **Import** and select `Jokes API.postman_collection.json`.
3. Click **Import** again and select `Jokes API.postman_environment.json`.
4. Select the **Jokes API** environment from the environment dropdown (top-right).
5. Run the requests in order, or use the **Collection Runner** to run all four at once.

---

## Requests & Tests

### 1. Get Random Joke — `GET /random_joke`

Fetches a random joke and saves its `id` to the `jokeId` environment variable for use by request 3.

| Test | Assertion |
|------|-----------|
| Status code | `200` |
| `type` exists and is a `string` | `pm.expect(respBody.type).to.be.a('string')` |
| `setup` exists and is a `string` | `pm.expect(respBody.setup).to.be.a('string')` |
| `punchline` exists and is a `string` | `pm.expect(respBody.punchline).to.be.a('string')` |
| `id` exists and is a `number` | `pm.expect(respBody.id).to.be.a('number')` |

**Side effect:** `pm.environment.set("jokeId", respBody.id)`

---

### 2. Get Joke Types — `GET /types`

Fetches the list of available joke categories.

| Test | Assertion |
|------|-----------|
| Status code | `200` |
| Response body is an array | `pm.expect(respBody).to.be.an('array')` |

---

### 3. Get Joke By ID — `GET /jokes/:jokeId`

Fetches a specific joke using the `jokeId` saved in step 1. Verifies that the API returns the same joke that was randomly selected.

| Test | Assertion |
|------|-----------|
| Status code | `200` |
| Response `id` matches saved `jokeId` | `pm.expect(respBody.id).to.be.equal(pm.environment.get("jokeId"))` |

---

### 4. Get Random 10 Jokes — `GET /jokes/ten`

Fetches a batch of ten random jokes and validates the array length.

| Test | Assertion |
|------|-----------|
| Status code | `200` |
| Response body is an array | `pm.expect(respBody).to.be.an('array')` |
| Array contains exactly 10 items | `pm.expect(respBody.length).to.be.equal(10)` |

---

## Environment Variables

| Variable | Set by | Used by |
|----------|--------|---------|
| `jokeId` | Get Random Joke (request 1) | Get Joke By ID (request 3) |

---

## Topics Covered

- Sending GET requests and inspecting JSON responses in Postman
- Writing test scripts with the `pm.test` and `pm.expect` API (Chai-based)
- Asserting HTTP status codes
- Asserting response body structure and property types
- Saving response values to environment variables with `pm.environment.set()`
- Reading environment variables in subsequent requests with `pm.environment.get()`
- Request chaining — using data from one response to validate another
