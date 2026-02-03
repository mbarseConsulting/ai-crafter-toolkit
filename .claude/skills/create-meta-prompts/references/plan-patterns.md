# Plan Prompt Patterns

Plan prompts create implementation strategies and architectural designs based on requirements or research.

## Template Structure

```markdown
# Plan: [Feature/Task]

## Context

[Background: What are we building and why?]
[Prerequisites: What research/decisions informed this plan?]
[Constraints: Technical limitations, time, resources]

## Dependencies

[@reference to research outputs, design docs, or existing code]

## Goals

[List 2-4 specific, measurable outcomes:]
1. [Goal 1 - must be concrete]
2. [Goal 2 - must be testable]
3. [Goal 3 - must be clear]

## Approach

[High-level strategy in 2-3 paragraphs]

### Architecture

[System design: components, data flow, interactions]
[Use ASCII diagrams if helpful]

### Technology Choices

[Specific libraries, frameworks, patterns with rationale]

### Implementation Steps

[Ordered list of 5-10 concrete steps:]
1. **[Step name]**: [What to do and why]
   - File(s): [Specific files to create/modify]
   - Dependencies: [What must be done first]
   - Validation: [How to know this step is done]

### Testing Strategy

[How to verify each step and overall success]

## Trade-offs

**Chosen approach:**
- ✅ Advantages
- ❌ Disadvantages

**Alternative approaches considered:**
- [Alternative 1]: Why not chosen
- [Alternative 2]: Why not chosen

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk 1] | High/Med/Low | [How to handle] |

## Success Criteria

[Specific, testable conditions that indicate completion:]
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Open Questions

[What still needs clarification before implementation?]

## Next Steps

[Immediate actions after plan approval]
```

## Examples

### Good Plan Prompt

```markdown
# Plan: Multi-Tenant Authentication System

## Context

Build authentication system for multi-tenant SaaS based on research findings (@001-auth-research.md). Need to support both end-users and admin users with tenant isolation.

**Prerequisites:**
- Research recommended JWT + tenant middleware approach
- Existing user model at src/models/user.js
- Node.js/Express backend, React frontend

**Constraints:**
- Must work with existing PostgreSQL database
- Zero downtime migration from current session-based auth
- Budget: Can use managed auth service if cost < $100/month

## Dependencies

@001-auth-research.md - Technology comparison and recommendations
@docs/security-reqs.md - Security requirements
@src/models/user.js - Current user model

## Goals

1. Secure multi-tenant authentication with 99.9% uptime
2. Support both email/password and OAuth providers
3. Zero downtime migration from existing system
4. Admin users can access multiple tenants

## Approach

[Detailed strategy...]

## Implementation Steps

1. **Add tenant_id to user model**: Extend database schema
   - Files: src/models/user.js, migrations/add-tenant-id.sql
   - Dependencies: None
   - Validation: Migration runs successfully, tests pass

2. **Implement JWT generation**: Create token service
   - Files: src/services/auth.js, src/utils/jwt.js
   - Dependencies: Step 1 complete
   - Validation: Can generate and verify tokens with tenant claims

[Continue with remaining steps...]

## Success Criteria

- [ ] Users can log in with email/password
- [ ] JWT tokens include tenant_id claim
- [ ] Middleware enforces tenant isolation
- [ ] All existing users migrated without data loss
- [ ] Admin users can switch between tenants
- [ ] 100% test coverage on auth flows

[Rest of plan...]
```

### Pattern: Feature Addition

```markdown
# Plan: Add [Feature] to [System]

## Context
[Why this feature, what problem it solves]
[@existing-research if any]

## Goals
1. [User-facing outcome]
2. [Technical outcome]

## Approach

### Architecture
[How feature fits into existing system]

### Implementation Steps
1. **Backend API**: [endpoint details]
2. **Database changes**: [schema modifications]
3. **Frontend UI**: [component structure]
4. **Integration**: [connecting pieces]
5. **Testing**: [coverage plan]

## Trade-offs
[Chosen approach vs alternatives]

## Success Criteria
- [ ] [Acceptance criterion 1]
- [ ] [Acceptance criterion 2]
```

### Pattern: Refactoring Plan

```markdown
# Plan: Refactor [Component/Module]

## Context
[Why refactoring is needed - tech debt, performance, maintainability]
[@research-findings about current implementation]

## Goals
1. [Improvement target - e.g., "Reduce complexity by 50%"]
2. [Maintain: "Zero functional changes"]

## Approach

### Current State
[Brief description of what exists]
[Key problems to solve]

### Target State
[What it will look like after refactoring]
[How it's better]

### Migration Strategy
[How to get from current to target without breaking things]

### Implementation Steps
1. **Add tests to freeze behavior**: Lock in current functionality
2. **Extract [X]**: Isolate first piece
3. **Refactor [X]**: Apply new pattern
4. **Repeat for [Y, Z]**: Systematic approach
5. **Remove old code**: Clean up

## Risks & Mitigations
[Focus on "How do we avoid breaking things?"]

## Success Criteria
- [ ] All existing tests still pass
- [ ] [Measurable improvement - e.g., "Cyclomatic complexity < 10"]
- [ ] No functional regressions
```

### Pattern: Bug Fix Plan

```markdown
# Plan: Fix [Bug Description]

## Context
[Bug symptoms and impact]
[@debugging-session-findings]

## Root Cause
[Specific cause identified in debugging]
[Why this happened]

## Solution

### Approach
[How to fix it - specific code changes]

### Implementation Steps
1. **Add regression test**: Reproduce bug in test
2. **Implement fix**: [Specific changes]
3. **Verify fix**: Test passes
4. **Prevent recurrence**: [Additional safeguards]

## Trade-offs
[Quick fix vs thorough solution]

## Success Criteria
- [ ] Bug no longer reproduces
- [ ] Regression test added and passes
- [ ] No new bugs introduced
```

## Best Practices

1. **Reference dependencies**: Always `@mention` research or context files
2. **Be specific about files**: Name exact files to modify, not "backend files"
3. **Concrete steps**: "Add JWT middleware to Express app" not "Set up authentication"
4. **Testable criteria**: Success criteria should be checkboxes you can actually verify
5. **Consider alternatives**: Show you evaluated trade-offs
6. **Plan for testing**: Testing strategy is part of the plan, not an afterthought
7. **Risk awareness**: Identify what could go wrong

## Common Mistakes

- ❌ "Implement authentication" (too vague - how? which files?)
- ❌ No dependencies listed when research was done
- ❌ Steps like "Do the backend" (not concrete)
- ❌ Success criteria: "Everything works" (not testable)
- ❌ No trade-offs discussed (seems like no thinking happened)
- ❌ Architecture described in words when diagram would be clearer

## Integration with Other Prompts

Plan outputs should:
- **Reference research** - Base decisions on prior findings
- **Feed into Do prompts** - Provide clear steps to execute
- **Enable Refine prompts** - Can be improved if approach was wrong
