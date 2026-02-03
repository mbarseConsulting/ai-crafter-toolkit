# SUMMARY.md Template

This template guides creation of SUMMARY.md files that accompany completed prompts. Summaries provide quick context without reading full outputs.

## Basic Template

```markdown
# Summary: [Prompt Topic]

## One-liner

[Single substantive sentence describing what was accomplished]

NOT: "Completed the authentication research" (generic)
YES: "Compared OAuth providers (Auth0, Firebase, Cognito) and recommended Auth0 for multi-tenant SaaS based on security, cost, and integration complexity"

## Version

v1 [or v2, v3 if refined]

## Key Findings

[3-5 actionable takeaways - bullets or numbered list]

1. [Specific finding with impact]
2. [Specific finding with impact]
3. [Specific finding with impact]

## Files Created

[Only for "Do" prompts - list actual files created]

- `path/to/file1.js` - [Brief description]
- `path/to/file2.js` - [Brief description]

## Decisions Needed

[What requires user input before proceeding]

- [Decision 1] - [Why it matters]
- [Decision 2] - [Options available]

OR: "None - ready to proceed"

## Blockers

[External impediments that prevent progress]

- [Blocker 1] - [What's needed to unblock]

OR: "None"

## Next Step

[Single, concrete action to take next]

Example: "Execute @002-auth-plan.md to implement JWT middleware"
NOT: "Continue with implementation" (too vague)
```

## Purpose-Specific Variations

### Research Summary

```markdown
# Summary: [Research Topic]

## One-liner

[What was researched and key recommendation]

## Version

v1

## Key Findings

1. [Main finding about options/approaches]
2. [Important constraint or requirement discovered]
3. [Trade-off or consideration identified]
4. [Recommendation with rationale]

## Research Quality

- **Confidence**: High/Medium/Low
- **Gaps**: [What couldn't be answered]
- **Assumptions**: [What was assumed]

## Decisions Needed

[Questions for user to decide]

## Blockers

[External info needed]

## Next Step

[Usually: create plan based on research]
```

### Plan Summary

```markdown
# Summary: [Plan Topic]

## One-liner

[What's being planned and chosen approach]

## Version

v1

## Key Findings

1. [Chosen architecture/approach]
2. [Key technology decisions]
3. [Main implementation phases]
4. [Critical risks identified]

## Plan Quality

- **Confidence**: High/Medium/Low
- **Complexity**: Low/Medium/High
- **Estimated Scope**: [Small/Medium/Large]

## Decisions Needed

[Architectural choices requiring user input]

## Blockers

[Dependencies or unknowns]

## Next Step

[Usually: begin implementation of first step]
```

### Do Summary

```markdown
# Summary: [Implementation Topic]

## One-liner

[What was built/implemented]

## Version

v1

## Key Findings

1. [What was implemented]
2. [How it works (high level)]
3. [What tests were added]
4. [Any deviations from plan]

## Files Created

- `path/to/file1.js` - [Purpose and size]
- `path/to/file2.test.js` - [Test coverage]

## Files Modified

- `path/to/existing.js` - [What changed]

## Implementation Notes

- **Test Coverage**: [X]%
- **Lint Status**: Pass/Fail
- **Manual Testing**: [What was verified]

## Decisions Needed

[Follow-up work or alternatives]

## Blockers

[Issues preventing deployment]

## Next Step

[Usually: test in staging, create PR, or implement next feature]
```

### Refine Summary

```markdown
# Summary: [Refined Output]

## One-liner

[What was refined and key improvements]

## Version

v2 [or higher]

## Key Findings

1. [What was added/fixed]
2. [What was improved]
3. [What's now possible that wasn't before]

## Changes Made

- [Change 1]: [Impact]
- [Change 2]: [Impact]
- [Change 3]: [Impact]

## What Was Preserved

[Important aspects that weren't changed]

## Decisions Needed

[New questions from refinement]

## Blockers

[New issues discovered]

## Next Step

[What to do with refined output]
```

## Examples

### Good Research Summary

```markdown
# Summary: Authentication Options Research

## One-liner

Compared session-based, JWT, and OAuth authentication for multi-tenant SaaS; recommended OAuth with Auth0 provider for best balance of security, developer experience, and multi-tenancy support.

## Version

v1

## Key Findings

1. **OAuth with managed provider** best fits multi-tenant requirements - built-in tenant isolation, SSO support, and compliance certifications
2. **Auth0 recommended** over Firebase/Cognito - superior multi-tenancy support, better pricing for our scale (10K-100K users at $0.02/user vs $0.05), SOC2 compliant
3. **JWT + tenant middleware** works but requires building MFA, SSO, compliance ourselves - 3-6 month additional dev time
4. **Session-based ruled out** - doesn't scale for multi-region deployment, complicates mobile apps

## Research Quality

- **Confidence**: High - compared 4 providers, reviewed security docs, validated pricing
- **Gaps**: Haven't tested Auth0 multi-tenant setup hands-on
- **Assumptions**: User base will reach 100K within 2 years

## Decisions Needed

- Approve Auth0 budget ($2K-$10K/month depending on growth)
- Decide if custom branding is required (affects Auth0 tier)

## Blockers

None

## Next Step

Create implementation plan (@002-auth-plan.md) for Auth0 integration with tenant isolation
```

### Good Do Summary

```markdown
# Summary: JWT Authentication Middleware Implementation

## One-liner

Implemented Express authentication middleware with JWT validation and tenant isolation; all routes now verify tokens and enforce tenant boundaries with 100% test coverage.

## Version

v1

## Key Findings

1. **Middleware working** - validates JWT, extracts tenant_id, enforces isolation
2. **Performance good** - <5ms overhead per request (JWT verification + DB lookup)
3. **Test coverage 100%** - all auth scenarios covered including edge cases
4. **One deviation** - added caching for user lookups (200ms → 5ms) not in original plan

## Files Created

- `src/middleware/auth.js` (142 lines) - Main authentication middleware
- `src/utils/jwt.js` (67 lines) - JWT token utilities
- `src/utils/cache.js` (45 lines) - User cache (added for performance)
- `src/middleware/__tests__/auth.test.js` (238 lines) - Complete test suite

## Files Modified

- `src/app.js` - Registered auth middleware on /api/* routes
- `package.json` - Added jsonwebtoken and node-cache dependencies

## Implementation Notes

- **Test Coverage**: 100% (47/47 tests passing)
- **Lint Status**: Pass (0 errors, 0 warnings)
- **Manual Testing**: Verified with curl and Postman - valid/invalid/expired tokens work correctly

## Decisions Needed

None - ready for staging deployment

## Blockers

None

## Next Step

Deploy to staging and test with real multi-tenant data
```

## Best Practices

1. **Substantive one-liner**: Capture actual outcome, not just "completed task"
2. **Actionable findings**: Focus on insights that inform decisions
3. **Specific next step**: Concrete action, not vague "continue work"
4. **Honest about gaps**: List what's unknown or uncertain
5. **Track decisions**: Explicit about what needs user input
6. **Note deviations**: Call out changes from original plan

## Common Mistakes

- ❌ One-liner: "Completed auth research" (not substantive)
- ❌ Key findings: "Found good options" (not specific)
- ❌ Next step: "Continue implementation" (not concrete)
- ❌ No decisions listed when choices exist
- ❌ Version missing or incorrect
- ❌ Files created for Research/Plan prompts (only Do prompts create files)

## When to Create Summary

**Always create** when using full workflow option (D)

**Optional** for create-only (A) or create-and-execute (C)

**Required** when outputs feed into other prompts

## Summary Storage

Place SUMMARY.md in same directory as prompt:

```
.prompts/
├── 001-auth-research/
│   ├── auth-research.md (prompt)
│   ├── auth-research-output.md (execution output)
│   └── SUMMARY.md (this summary)
```

Or for simple structure:
```
.prompts/
├── auth-research.md (prompt)
├── auth-research-output.md (execution output)
└── auth-research-SUMMARY.md
```
