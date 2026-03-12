# Do Prompt Patterns

Do prompts execute tasks and produce artifacts. They focus on implementation, not exploration.

## Template Structure

```markdown
# Do: [Concrete Action/Artifact]

## Context

[Brief background: Why is this being done?]
[Current state: What exists now?]

## Dependencies

[@plan-file or @research-file that informs this work]
[@existing-code or @design-doc to reference]

## Task

[Single, clear imperative statement of what to produce]

Example: "Implement JWT authentication middleware for Express with tenant isolation"

NOT: "Set up authentication" (too vague)
NOT: "Implement auth and add tests and document it" (too many things)

## Requirements

[Specific, testable requirements:]
1. [Functional requirement 1]
2. [Functional requirement 2]
3. [Non-functional requirement - performance, security, etc.]

## Implementation Guidance

### Files to Create/Modify

**Create:**
- `path/to/new-file.js` - [Purpose]

**Modify:**
- `path/to/existing-file.js` - [What changes]

### Code Structure

[Key interfaces, classes, functions to implement]
[Patterns to follow from existing codebase]

### Integration Points

[Where this code connects to existing system]
[What other modules will call this]

### Error Handling

[Specific errors to handle and how]
[Edge cases to consider]

## Acceptance Criteria

[Checklist of done-ness:]
- [ ] [Specific behavior 1 works]
- [ ] [Specific behavior 2 works]
- [ ] [Edge case handled]
- [ ] [Tests added and passing]
- [ ] [No lint errors]
- [ ] [Documented if needed]

## Output Format

[What files should exist after this task:]
- [File path 1]: [What it contains]
- [File path 2]: [What it contains]

## Success Criteria

[How to verify the task is complete:]
1. [Test command passes]
2. [Demo scenario works]
3. [Metrics or behavior achieved]
```

## Examples

### Good Do Prompt

```markdown
# Do: Implement JWT Authentication Middleware

## Context

Building multi-tenant auth system per @002-auth-plan.md. Currently using session-based auth; migrating to JWT with tenant isolation.

## Dependencies

@002-auth-plan.md - Architecture and implementation strategy
@src/models/user.js - Existing user model with tenant_id
@docs/security-reqs.md - Security requirements

## Task

Implement Express middleware that validates JWT tokens and enforces tenant isolation on all API routes.

## Requirements

1. Middleware validates JWT signature using HS256
2. Middleware extracts tenant_id from token claims
3. Middleware attaches user and tenant to req object
4. Middleware returns 401 for invalid/expired tokens
5. Middleware returns 403 if user tries to access wrong tenant
6. Middleware runs on all /api/* routes except /api/auth/*

## Implementation Guidance

### Files to Create

- `src/middleware/auth.js` - Main authentication middleware
- `src/utils/jwt.js` - JWT token generation and verification utilities
- `src/middleware/__tests__/auth.test.js` - Test suite

### Code Structure

```javascript
// src/middleware/auth.js
async function authenticate(req, res, next) {
  // 1. Extract token from Authorization header
  // 2. Verify token signature
  // 3. Check expiration
  // 4. Load user from database
  // 5. Verify tenant access
  // 6. Attach to req object
  // 7. Call next() or return error
}
```

### Integration Points

- Apply to Express app at src/app.js
- Use before existing routes
- Skip on auth routes

### Error Handling

- Missing token → 401 "No token provided"
- Invalid signature → 401 "Invalid token"
- Expired token → 401 "Token expired"
- User not found → 401 "User not found"
- Tenant mismatch → 403 "Access denied"

## Acceptance Criteria

- [ ] Valid JWT with correct tenant allows access
- [ ] Invalid JWT returns 401
- [ ] Expired JWT returns 401
- [ ] JWT for different tenant returns 403
- [ ] Auth routes bypass middleware
- [ ] req.user and req.tenant populated correctly
- [ ] All tests pass (aim for 100% coverage)
- [ ] No ESLint errors

## Output Format

Files created:
- `src/middleware/auth.js` - Authentication middleware (~100 lines)
- `src/utils/jwt.js` - JWT utilities (~50 lines)
- `src/middleware/__tests__/auth.test.js` - Tests (~200 lines)

Files modified:
- `src/app.js` - Add middleware registration

## Success Criteria

1. `npm test` passes with new tests
2. Can make authenticated request: `curl -H "Authorization: Bearer <token>" http://localhost:3000/api/users`
3. Cannot access with invalid token
4. Cannot access other tenant's resources
```

### Pattern: Create New Feature

```markdown
# Do: Create [Feature Name]

## Context
[Why this feature exists]
[@plan reference]

## Task
[Single sentence: Build/Create/Implement X that does Y]

## Requirements
[Functional requirements 1-5]
[Non-functional requirements if applicable]

## Implementation Guidance

### Files to Create
[List with purposes]

### Code Structure
[Key components to build]

### Integration Points
[How it connects to existing code]

## Acceptance Criteria
[Testable checklist]

## Output Format
[Files that will exist]
```

### Pattern: Fix Bug

```markdown
# Do: Fix [Specific Bug]

## Context
[Bug symptoms and impact]
[@debugging session that found root cause]

## Task
Fix [exact problem] in [exact location]

## Requirements
1. Bug no longer reproduces
2. No new bugs introduced
3. Regression test added

## Implementation Guidance

### Files to Modify
- [file.js] - [Specific change needed]

### Root Cause
[What's wrong and why]

### Fix Strategy
[Exactly what code to change]

## Acceptance Criteria
- [ ] Regression test added that fails before fix
- [ ] Regression test passes after fix
- [ ] All other tests still pass
- [ ] Bug verified fixed in manual testing

## Success Criteria
1. Run `npm test` - all pass
2. Reproduce original bug scenario - no longer occurs
```

### Pattern: Add Tests

```markdown
# Do: Add Test Coverage for [Component]

## Context
[Why tests are needed - new code, refactor, found bug]

## Task
Create comprehensive test suite for [component] achieving [X]% coverage

## Requirements
1. Test happy path scenarios
2. Test error cases
3. Test edge cases
4. Achieve minimum [X]% coverage
5. All tests pass

## Implementation Guidance

### Files to Create
- [component.test.js] - Test suite

### Test Structure
```
describe('[Component]', () => {
  describe('[method/function]', () => {
    it('should [behavior]', () => {})
    it('should handle [error case]', () => {})
  })
})
```

### Scenarios to Cover
1. [Happy path 1]
2. [Happy path 2]
3. [Error case 1]
4. [Edge case 1]

## Acceptance Criteria
- [ ] All tests pass
- [ ] Coverage >= [X]%
- [ ] Tests are readable and maintainable
- [ ] No flaky tests

## Success Criteria
1. `npm test` passes
2. `npm run coverage` shows >= [X]%
```

### Pattern: Refactor Code

```markdown
# Do: Refactor [Component]

## Context
[Why refactoring - tech debt, performance, readability]
[@refactor-plan with strategy]

## Task
Refactor [component] to [improvement goal] while maintaining identical behavior

## Requirements
1. All existing tests continue to pass (no functional changes)
2. [Measurable improvement - e.g., "Reduce complexity to < 10"]
3. No new dependencies added

## Implementation Guidance

### Files to Modify
[List with nature of changes]

### Refactoring Strategy
[Step-by-step approach to avoid breaking things]

### Testing Strategy
[How to ensure no regressions]

## Acceptance Criteria
- [ ] All existing tests pass unchanged
- [ ] [Measurable improvement achieved]
- [ ] Code more maintainable (subjective but clear)
- [ ] No functional changes

## Success Criteria
1. `npm test` - 100% pass rate
2. [Complexity metric] improved by [X]%
3. No behavior changes (verified by tests)
```

## Best Practices

1. **One task per prompt**: "Implement X" not "Implement X and Y and document Z"
2. **Reference dependencies**: Always `@mention` plans or research that inform this work
3. **Be specific about files**: Name exact files, not "the backend files"
4. **Testable acceptance criteria**: Must be able to check off each item objectively
5. **Include error handling**: Specify how errors should be handled
6. **Define success**: Exact commands to run to verify completion
7. **Output format clarity**: List files that will exist after task completes

## Common Mistakes

- ❌ "Implement authentication" (too broad - what specifically?)
- ❌ No dependencies listed when plan exists
- ❌ Acceptance criteria: "Works correctly" (not testable)
- ❌ No file list (which files to create/modify?)
- ❌ Multiple tasks in one prompt (implement + test + document)
- ❌ Vague requirements ("Should be fast" vs "Should respond in < 100ms")

## Integration with Other Prompts

Do prompts should:
- **Follow plans** - Implement specific steps from plan
- **Reference research** - Use decisions made in research phase
- **Enable refinement** - Produce outputs that can be improved
- **Be composable** - One Do prompt per logical unit of work
