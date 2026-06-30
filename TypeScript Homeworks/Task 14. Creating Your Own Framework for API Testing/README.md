
# Task 14. Creating Your Own Framework for API Testing

> Refactor ad-hoc `fetch()` calls into a small, reusable, typed framework for testing [The Cat API](https://thecatapi.com/) — an `ApiService` HTTP layer, one API Object per resource, and DTO interfaces for every request/response — then drive a full end-to-end lifecycle test through it.

## Overview

Task 13 sent raw `fetch()` calls straight from the test files. This task pulls that logic into a framework with three layers:

- **`ApiService`** — a single class that knows how to make `GET` / `POST` / `DELETE` requests, attach the `x-api-key` header, serialize bodies, and parse responses.
- **API Objects** (`BreedsApiObject`, `ImagesApiObject`, `FavouriteApiObject`, `VotesApiObject`) — one per resource, each wrapping `ApiService` calls behind typed, intention-revealing methods (`getImages()`, `postVote()`, etc.).
- **DTOs** — TypeScript interfaces describing every request and response shape, mirrored from the `openapi.yaml` contract.

The included `e2e.spec.ts` proves the framework by replaying Task 13's image -> favourite -> vote lifecycle entirely through API Objects instead of raw `fetch`.

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
Task 14. Creating Your Own Framework for API Testing/
├── src/
│   ├── api/
│   │   ├── BreedsApiObjects.ts      — GET /breeds, GET /breeds/:id
│   │   ├── FavouriteApiObject.ts    — GET/POST/DELETE /favourites
│   │   ├── ImagesApiObject.ts       — GET /images/search, GET/POST/DELETE /images
│   │   └── VotesApiObject.ts        — GET/POST/DELETE /votes
│   ├── interfaces/
│   │   ├── breeds.dto.ts            — breed response shape
│   │   ├── common.dto.ts            — IInnerImage, shared across DTOs
│   │   ├── favourite.dto.ts         — favourite request/response shapes
│   │   ├── images.dto.ts            — image upload/search response shapes
│   │   └── votes.dto.ts             — vote request/response shapes
│   └── services/
│       └── ApiService.ts            — generic GET/POST/DELETE HTTP layer
├── tests/
│   ├── fixtures/
│   │   └── cat.jpg                  — image fixture used by the upload step
│   └── e2e.spec.ts                  — full lifecycle test, built on the framework above
├── globals.ts                       — loads API_KEY / BASE_URL from .env
├── openapi.yaml                     — OpenAPI 3.0 contract for The Cat API
├── .env.example                     — template for required environment variables
├── .mocharc.json                    — Mocha configuration
├── tsconfig.json
└── package.json
```

---

## The Framework

### `ApiService` ([src/services/ApiService.ts](src/services/ApiService.ts))

| Member | What it does |
|--------|---------------|
| `getDefaultHeaders` | Builds the `x-api-key` header from the API key passed to the constructor |
| `getRequest<T>(path, customHeaders?)` | Sends `GET`; returns `{ data: T, status: number }` |
| `postRequest<T>(path, body, customHeaders?)` | Sends `POST`; JSON-stringifies plain objects, passes `FormData` through untouched (for uploads) |
| `deleteRequest<T>(path, customHeaders?)` | Sends `DELETE`; returns `{ data: T, status: number }` |
| `parseBody<T>(response)` *(private)* | Parses the response as JSON, falling back to `{ message: text }` if the body isn't valid JSON |

Every public method returns both the parsed `data` and the HTTP `status`, so a test can assert on the payload and the status code from a single call.

### API Objects (`src/api/`)

| Class | Resource | Methods |
|-------|----------|---------|
| `BreedsApiObject` | `/breeds` | `getBreeds()`, `getBreedById(id)` |
| `ImagesApiObject` | `/images` | `getImages()`, `getImageById(id)`, `postImage(formData)`, `deleteImage(id)` |
| `FavouriteApiObject` | `/favourites` | `getFavourites()`, `getFavouriteById(id)`, `postFavourite(body, headers?)`, `deleteFavourite(id)` |
| `VotesApiObject` | `/votes` | `getVotes()`, `getVoteById(id)`, `postVote(body, headers?)`, `deleteVote(id)` |

Each API Object is constructed with a shared `ApiService` instance and exposes only the operations that resource supports — tests call `imageApiObject.postImage(body)` instead of building the request by hand.

### DTOs (`src/interfaces/`)

Typed interfaces for every request and response body (`IGetImageResponse`, `IPostVoteRequest`, `IPostFavouriteResponse`, etc.), mirroring the schemas defined in `openapi.yaml`. They give every API Object method compile-time-checked inputs and outputs instead of `any`.

---

## Test Suite

### `e2e.spec.ts` — End-to-End (Image, Favourite, Vote) Verification

The same full lifecycle covered in Task 13, now exercised entirely through the framework's `ApiService` + API Objects rather than raw `fetch` calls.

| Step | Call | What is verified |
|------|------|-------------------|
| 1 | `imageApiObject.postImage(formData)` (multipart, `tests/fixtures/cat.jpg`) | Returns an object with `id`/`url`; status `201`; captures `image_id`, `image_url` |
| 2 | `imageApiObject.getImageById(image_id)` | Returned image's `id` matches; status `200` |
| 3 | `favouriteApiObject.postFavourite(body, headers)` | `message` is `'SUCCESS'`; `id` is a `number`; status `200`; captures `favourite_id` |
| 4 | `favouriteApiObject.getFavouriteById(favourite_id)` | Nested `image.id` and `image.url` match the uploaded image; status `200` |
| 5 | `votesApiObject.postVote(body, headers)` (`value: 10`) | `message` is `'SUCCESS'`; `image_id` and `value` match; status `201`; captures `vote_id` |
| 6 | `votesApiObject.getVoteById(vote_id)` | Nested `image.id`/`image.url` and `value` match; status `200` |
| 7 | `favouriteApiObject.deleteFavourite(favourite_id)` | `message` is `'SUCCESS'`; status `200` |
| 8 | `votesApiObject.deleteVote(vote_id)` | `message` is `'SUCCESS'`; status `200` |
| 9 | `imageApiObject.deleteImage(image_id)` | Status `204` |
| 10 | `imageApiObject.getImageById(image_id)` (post-deletion) | Status `400` — confirms the image no longer exists |

An `after()` hook removes the favourite, vote, and image if the suite fails before the explicit cleanup steps complete.

---

## OpenAPI Contract (`openapi.yaml`)

Reuses the same Cat API contract introduced in Task 13 — schemas for `Breed`, `Image`, `Vote`, and `Favourite`, plus the paths exercised by the framework above (`/breeds`, `/images/search`, `/images/upload`, `/images/{image_id}`, `/votes`, `/votes/{vote_id}`, `/favourites`, `/favourites/{favourite_id}`). Authentication is defined via `ApiKeyAuth` — an `x-api-key` header — matching the header `ApiService.getDefaultHeaders` attaches to every request.

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

- Designing a reusable API-testing framework (Service layer + API Objects + DTOs)
- Separating HTTP plumbing (`ApiService`) from resource-specific behavior (API Objects)
- Typed request/response DTOs validated against an OpenAPI contract
- Returning `{ data, status }` pairs so tests can assert on payload and status independently
- Refactoring ad-hoc integration tests onto a shared, typed framework
- Full CRUD lifecycle e2e testing with cleanup hooks
