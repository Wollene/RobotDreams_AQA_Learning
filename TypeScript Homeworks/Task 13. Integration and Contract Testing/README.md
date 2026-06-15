
# Task 13. Integration and Contract Testing

> Run integration tests against a real public API — [The Cat API](https://thecatapi.com/) — covering cross-resource flows, end-to-end lifecycles, and a formal OpenAPI contract describing the service.

## Overview

This task moves beyond mocked unit tests into real integration testing. Every test in this suite sends actual HTTP requests to The Cat API using the native `fetch`, asserts on real responses with Chai, and cleans up any data it creates. An `openapi.yaml` contract documents the schemas and endpoints under test, describing the shape integration responses are expected to match.

---

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example environment file and add your own API key from [thecatapi.com](https://thecatapi.com/):
   ```bash
   cp .env.example .env
   ```
   ```env
   API_KEY=your_api_key_here
   BASE_URL=https://api.thecatapi.com/v1
   ```

## Running Tests

```bash
npm test
```

---

## Project Structure

```
Task 13. Integration and Contract Testing/
├── tests/
│   ├── fixtures/
│   │   └── cat.jpg                 — image fixture used by the upload test
│   ├── breed-image.spec.ts         — breed <-> image cross-resource check
│   ├── e2e.spec.ts                 — full image/favourite/vote lifecycle
│   ├── image-favourite.spec.ts     — image -> favourite flow
│   └── image-vote.spec.ts          — image -> vote flow
├── globals.ts                      — loads API_KEY / BASE_URL from .env
├── openapi.yaml                    — OpenAPI 3.0 contract for The Cat API
├── .env.example                    — template for required environment variables
├── .mocharc.json                   — Mocha configuration
├── tsconfig.json
└── package.json
```

---

## Test Suites

### `breed-image.spec.ts` — Breed -> Image Verification

| Test | What is verified |
|------|-------------------|
| `GET /breeds` | Returns a non-empty array; first breed has `name` and `reference_image_id`; status `200` |
| `GET /images/:image_id` | Returned image's `id` matches the breed's `reference_image_id`; its `breeds` array includes the original breed name; status `200` |

### `image-vote.spec.ts` — Image -> Vote Verification

| Test | What is verified |
|------|-------------------|
| `GET /images/search` | Returns a non-empty array of images; captures `image_id` |
| `POST /votes` | Vote is created for `image_id` with `value: 10`; response `message` is `'SUCCESS'`; status `201`; captures `vote_id` |
| `GET /votes/:vote_id` | Returned vote matches `image_id` and `value`; status `200` |
| `DELETE /votes/:vote_id` (cleanup) | Response `message` is `'SUCCESS'`; status `200` |

`after()` hook deletes the created vote if a test fails before the explicit cleanup step runs.

### `image-favourite.spec.ts` — Image -> Favourite Verification

| Test | What is verified |
|------|-------------------|
| `GET /images/search` | Returns a non-empty array of images; captures `image_id` |
| `POST /favourites` | Favourite is created for `image_id`; response `message` is `'SUCCESS'`; `id` is a `number`; status `200`; captures `favourite_id` |
| `GET /favourites/:favourite_id` | Returned favourite's `image_id` matches; status `200` |
| `DELETE /favourites/:favourite_id` (cleanup) | Response `message` is `'SUCCESS'`; status `200` |

`after()` hook deletes the created favourite if a test fails before the explicit cleanup step runs.

### `e2e.spec.ts` — End-to-End (Image, Favourite, Vote) Verification

A full lifecycle test that uploads a real image, exercises every resource against it, then tears everything down and confirms the deletion.

| Step | Request | What is verified |
|------|---------|-------------------|
| 1 | `POST /images/upload` (multipart, `tests/fixtures/cat.jpg`) | Returns an object with an `id`; status `201`; captures `image_id` |
| 2 | `GET /images/:image_id` | Returned image's `id` matches; status `200` |
| 3 | `POST /favourites` | Image marked as favourite; `message` is `'SUCCESS'`; `id` is a `number`; status `200`; captures `favourite_id` |
| 4 | `GET /favourites/:favourite_id` | Returned favourite's `image_id` matches; status `200` |
| 5 | `POST /votes` (`value: 10`) | Vote created for the image; `message` is `'SUCCESS'`; `value` and `image_id` match; status `201`; captures `vote_id` |
| 6 | `GET /votes/:vote_id` | Returned vote's `image_id` and `value` match; status `200` |
| 7 | `DELETE /favourites/:favourite_id` | `message` is `'SUCCESS'`; status `200` |
| 8 | `DELETE /votes/:vote_id` | `message` is `'SUCCESS'`; status `200` |
| 9 | `DELETE /images/:image_id` | Status `204` |
| 10 | `GET /images/:image_id` (post-deletion) | Status `400` — confirms the image no longer exists |

An `after()` hook removes the favourite, vote, and image if the suite fails before the cleanup steps complete.

---

## OpenAPI Contract (`openapi.yaml`)

Defines the contract for The Cat API endpoints exercised by the tests above:

| Schema | Purpose |
|--------|---------|
| `Breed`, `Breed-Image` | Shape of a cat breed and its reference image |
| `Image`, `Image-Breed`, `Image-Create` | Shape of an image resource and upload response |
| `Vote`, `Post-Vote-Request`, `Post-Vote-Response` | Shape of vote resources and request/response bodies |
| `Favourite`, `Post-Favourite-Request`, `Post-Favourite-Response` | Shape of favourite resources and request/response bodies |

| Path | Methods |
|------|---------|
| `/images/{image_id}` | `GET`, `DELETE` |
| `/images/search` | `GET` |
| `/images/upload` | `POST` |
| `/breeds` | `GET` |
| `/votes`, `/votes/{vote_id}` | `GET`, `POST`, `DELETE` |
| `/favourites`, `/favourites/{favourite_id}` | `GET`, `POST`, `DELETE` |

Authentication is defined via `ApiKeyAuth` — an `x-api-key` header, matching the header sent by every test.

---

## Configuration Notes

Key settings in [.mocharc.json](.mocharc.json):

| Option | Value | Why |
|--------|-------|-----|
| `extension` | `["ts"]` | Tells Mocha to look for `.ts` test files |
| `require` | `["tsx", "./globals.ts"]` | Loads the `tsx` transpiler and the `API_KEY`/`BASE_URL` env config before tests |
| `spec` | `tests/**/*.spec.ts` | Glob pattern for discovering test files |
| `timeout` | `10000` | 10-second limit per test — needed for real network requests |

[globals.ts](globals.ts) loads `.env` via `dotenv/config` and exports `API_KEY` and `BASE_URL` for use in every spec file.

---

## Topics Covered

- Integration testing against a real, live REST API
- Designing an OpenAPI 3.0 contract for an existing API
- Authenticated requests with an `x-api-key` header
- Multipart form-data uploads with `FormData` and `Blob`
- Chaining requests — using IDs returned from one call as input to the next
- Full CRUD lifecycle testing (create -> read -> delete -> verify deletion)
- Test cleanup via explicit teardown steps and `after()` safety-net hooks
- Managing secrets with `.env` / `.env.example` and `dotenv`
