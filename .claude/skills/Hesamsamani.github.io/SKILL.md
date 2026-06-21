```markdown
# Hesamsamani.github.io Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `Hesamsamani.github.io` repository, a TypeScript project built with the Astro framework. You'll learn how to structure files, write code, follow commit conventions, and manage testing in this codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `myComponent.ts`, `userProfile.astro`

### Import Style
- Use **relative imports** for modules within the project.
  ```typescript
  import { myFunction } from './utils/myFunction';
  ```

### Export Style
- Use **named exports** for all modules.
  ```typescript
  // utils/myFunction.ts
  export function myFunction() {
    // ...
  }
  ```

### Commit Messages
- Follow **conventional commit** format.
- Use the `chore` prefix for maintenance tasks.
- Keep commit messages concise (average ~46 characters).
  ```
  chore: update dependencies
  chore: fix typo in userProfile component
  ```

## Workflows

### Making a Code Change
**Trigger:** When you need to add or update a feature or fix a bug  
**Command:** `/make-change`

1. Create a new branch for your change.
2. Make your code changes following the coding conventions above.
3. Write or update tests as needed.
4. Stage and commit your changes using a conventional commit message.
5. Push your branch and open a pull request.

### Running Tests
**Trigger:** When you want to verify your code changes  
**Command:** `/run-tests`

1. Locate test files matching the `*.test.*` pattern.
2. Run the test suite using your preferred test runner (framework is unspecified; check project scripts or documentation).
3. Review test results and fix any failures.

## Testing Patterns

- Test files use the `*.test.*` naming pattern (e.g., `myComponent.test.ts`).
- The specific testing framework is **unknown**; check the repository for further details.
- Place tests alongside the code they test or in a dedicated `tests` directory.
- Example test file:
  ```typescript
  // utils/myFunction.test.ts
  import { myFunction } from './myFunction';

  describe('myFunction', () => {
    it('should return expected result', () => {
      expect(myFunction()).toBe(/* expected value */);
    });
  });
  ```

## Commands
| Command        | Purpose                                 |
|----------------|-----------------------------------------|
| /make-change   | Start the process for making code changes|
| /run-tests     | Run the test suite                      |
```
