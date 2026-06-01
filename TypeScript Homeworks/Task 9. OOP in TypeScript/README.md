
# Task 9. OOP in TypeScript. Principles. SOLID. DRY

> Design a TypeScript class hierarchy that demonstrates OOP principles, adheres to SOLID and DRY, and shows practical use of encapsulation, inheritance, polymorphism, and abstraction.

## Overview

This task puts OOP theory into practice with TypeScript. You design a multi-class system where each class has a single clear responsibility, shared logic is extracted to avoid repetition, and behavior is composed through interfaces and abstract classes. The result demonstrates all four OOP pillars and at least the first two SOLID principles.

---

## Project Structure

| File | Description |
|------|-------------|
| `src/interfaces.ts` | Shared interfaces that define contracts across the hierarchy |
| `src/abstract.ts` | Abstract base class with shared logic and abstract method signatures |
| `src/classes.ts` | Concrete subclasses implementing the abstract base and interfaces |
| `src/index.ts` | Entry point — instantiates classes and exercises polymorphic behavior |

---

## Task Description

1. **Set up the TS project** with `tsconfig.json` and required dependencies.

2. **Define interfaces** that describe the contracts for your domain objects.

3. **Create an abstract base class** that:
   - Contains shared, reusable logic (DRY).
   - Declares at least one abstract method that subclasses must implement.
   - Uses access modifiers (`public`, `private`, `protected`) deliberately.

4. **Write at least two concrete subclasses** that:
   - `extend` the abstract base class.
   - `implement` one or more of the shared interfaces.
   - Override/implement abstract methods with their own behavior (polymorphism).

5. **Apply SOLID principles**:
   - **S** — each class has one responsibility.
   - **O** — extend behavior via subclasses, not by modifying existing classes.
   - **L** — subclasses can substitute the base class without breaking callers.
   - **I** — interfaces are small and focused, not monolithic.
   - **D** — high-level modules depend on abstractions, not concrete types.

6. **Apply DRY** — extract any repeated logic into the base class or a utility, not duplicated across subclasses.

7. **Create `index.ts`** — instantiate objects, call methods through the base-class/interface type, and log results that show polymorphic dispatch in action.

---

## Topics Covered

- OOP pillars: encapsulation, inheritance, polymorphism, abstraction
- Abstract classes and concrete subclasses with `extends`
- Interface contracts with `implements`
- Access modifiers: `public`, `private`, `protected`, `readonly`
- SOLID principles applied in TypeScript
- DRY — eliminating duplication through base-class logic
- Type narrowing and polymorphic method calls
