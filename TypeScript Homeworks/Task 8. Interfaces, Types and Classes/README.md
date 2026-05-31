
# Task 8. Interfaces and Types. Classes

> Fetch a real JSON API, model its response with TypeScript types, transform the data using a class constructor, and explore abstraction and inheritance.

## Overview

This task combines TypeScript's type system with object-oriented programming. You fetch a multi-level JSON response from a public API (building on the async work from Task 6), describe its shape with an interface or class, transform the data into a new typed object through a class constructor, and then design an inheritance hierarchy in a separate file.

---

## Project Structure

| File | Description |
|------|-------------|
| `src/api.ts` | Interface/class describing the API response, and a typed fetch function |
| `src/transform.ts` | Class that accepts the fetched object and transforms it into a new shape |
| `src/abstraction.ts` | Abstract class and subclass(es) demonstrating abstraction and inheritance |
| `src/index.ts` | Entry point — creates class instances and exercises their methods |

---

## Task Description

1. **Set up the TS project** with `tsconfig.json` and required dependencies.

2. **Find a public API** that returns a multi-level JSON response (e.g. the one used in Task 6 homework).

3. **Describe the JSON response** using a TypeScript `interface` or `class` with typed properties at every level.

4. **Write a fetch function** that sends a request to the API and returns the typed object from step 3.

5. **Write a transformation class** that takes the fetched object as a constructor argument and converts it into a new shape — for example, extracting a summary, summing numeric fields, etc.:
   ```ts
   const obj2 = new Obj2(obj1);
   ```

6. **Create `abstraction.ts`** — design a class composition for inheritance, implement an abstract class and at least one subclass.

7. **Create `index.ts`** — instantiate the classes and manipulate the objects through their methods.

---

## Topics Covered

- TypeScript interfaces and type annotations for API responses
- Typed `fetch` with generics and `async/await`
- Class constructors that accept and transform typed objects
- Access modifiers: `public`, `private`, `protected`
- Abstract classes and inheritance with `extends`
- `implements` for enforcing interface contracts
