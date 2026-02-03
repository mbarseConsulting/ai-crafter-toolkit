# Refine Prompt Patterns

Refine prompts improve existing outputs - deepening analysis, expanding coverage, or correcting issues.

## Template Structure

```markdown
# Refine: [What's Being Improved]

## Context

[What exists now that needs refinement]
[Why refinement is needed - gaps, errors, insufficient depth]

## Dependencies

@[original-output] - The work being refined
@[feedback or new requirements if any]

## Current State

[Brief summary of what exists]
[Specific issues or gaps identified]

## Refinement Goal

[Single, clear statement of what improvement means]

Example: "Deepen authentication research to include OAuth provider comparison with security analysis"

NOT: "Make it better" (too vague)

## Refinement Scope

[What will be added, changed, or expanded:]
1. [Specific addition 1]
2. [Specific change 2]
3. [Specific expansion 3]

[What will NOT change:]
- [Aspect to preserve 1]
- [Aspect to preserve 2]

## Guidance

### Areas to Deepen

[Specific sections or topics needing more depth]
[Questions to answer that weren't answered before]

### New Information to Integrate

[Recent findings, feedback, or requirements]
[How this should change the output]

### Quality Improvements

[Clarity, structure, completeness issues to fix]
[Format or organization changes needed]

## Acceptance Criteria

[Specific improvements that indicate refinement is complete:]
- [ ] [Gap 1 filled]
- [ ] [Issue 2 corrected]
- [ ] [Depth added to section 3]
- [ ] [New requirement addressed]
- [ ] [Original quality maintained]

## Output Format

[What the refined output should look like:]
- Updated: @[original-output] - [What changed]
- OR New: [refined-output-name] - [If creating new version]

## Success Criteria

[How to verify refinement achieved goal:]
1. [Specific improvement measurable]
2. [Original strengths preserved]
3. [New requirements satisfied]
```

## Examples

### Good Refine Prompt

```markdown
# Refine: Authentication Research with OAuth Provider Analysis

## Context

@001-auth-research.md provided good overview of auth approaches but lacks depth on OAuth providers. Security team raised concerns about provider security that need analysis.

## Dependencies

@001-auth-research.md - Original research
@docs/security-concerns.md - New security requirements

## Current State

Research covers JWT vs OAuth vs sessions at high level. Recommends OAuth but doesn't compare providers (Auth0, Firebase, AWS Cognito, etc.) or analyze security implications.

## Refinement Goal

Expand OAuth section with detailed provider comparison including security analysis, pricing, and integration complexity for our multi-tenant use case.

## Refinement Scope

**Will add:**
1. Provider comparison table (Auth0, Firebase, Cognito, Okta)
2. Security analysis per provider (MFA, breach history, compliance)
3. Pricing analysis for 10K-100K users
4. Integration complexity assessment
5. Updated recommendation with provider choice

**Will NOT change:**
- JWT vs OAuth vs sessions analysis (still valid)
- Existing architectural recommendations
- Overall document structure

## Guidance

### Areas to Deepen

- OAuth Providers section (currently 2 paragraphs → should be 2-3 pages)
- Security considerations (add formal threat model)
- Cost analysis (add TCO calculations)

### New Information to Integrate

From @docs/security-concerns.md:
- Must support MFA with biometric fallback
- Need SOC2 Type II compliant provider
- Prefer provider with < 1 breach in last 5 years

### Quality Improvements

- Add comparison table for visual clarity
- Include code snippets for integration examples
- Add decision tree for provider selection

## Acceptance Criteria

- [ ] Comparison table with 5+ providers and 8+ criteria
- [ ] Security analysis addresses all concerns in @docs/security-concerns.md
- [ ] Pricing analysis for our scale (10K-100K users)
- [ ] Integration complexity rated (Low/Med/High) with rationale
- [ ] Clear provider recommendation with reasoning
- [ ] Original auth approach analysis intact
- [ ] Document still cohesive and well-structured

## Output Format

Updated file:
- @001-auth-research.md - OAuth section expanded from 2 paragraphs to 3 pages with provider comparison, security analysis, and recommendation

## Success Criteria

1. Security team approves new security analysis
2. Comparison table makes provider choice obvious
3. Integration complexity helps with timeline planning
4. Original research quality maintained
```

### Pattern: Deepen Analysis

```markdown
# Refine: Deepen [Topic] Analysis

## Context
@[original-output] covered [topic] but needs more depth
[Specific gaps or shallow areas identified]

## Dependencies
@[original-output]
@[new-requirements or feedback]

## Current State
[What exists - 1-2 sentences]
[Why it's insufficient - specific gaps]

## Refinement Goal
Deepen [specific sections] to [depth level] by [approach]

## Refinement Scope

**Will add:**
[Specific content to add]

**Will NOT change:**
[What to preserve]

## Guidance

### Areas to Deepen
[Sections needing expansion]
[Questions to answer]

### New Information
[Recent findings to integrate]

## Acceptance Criteria
[Specific depth improvements]

## Success Criteria
[How to verify sufficient depth]
```

### Pattern: Fix Issues

```markdown
# Refine: Fix Issues in [Output]

## Context
@[original-output] has [specific problems]
[Issues identified through review, feedback, or testing]

## Dependencies
@[original-output]
@[feedback or test results]

## Current State
[List of specific issues:]
1. [Issue 1 with location]
2. [Issue 2 with location]
3. [Issue 3 with location]

## Refinement Goal
Correct all identified issues while maintaining output quality

## Refinement Scope

**Will fix:**
1. [Issue 1] → [Correction]
2. [Issue 2] → [Correction]

**Will NOT change:**
[Working parts to preserve]

## Guidance

### Issues to Fix
[Detailed explanation of each issue and correct approach]

### Validation
[How to verify fixes work]

## Acceptance Criteria
- [ ] Issue 1 resolved
- [ ] Issue 2 resolved
- [ ] No new issues introduced
- [ ] Tests pass

## Success Criteria
[Verification that fixes work]
```

### Pattern: Expand Coverage

```markdown
# Refine: Expand [Output] to Cover [New Scope]

## Context
@[original-output] covered [original scope]
New requirements expand scope to include [additions]

## Dependencies
@[original-output]
@[new-requirements]

## Current State
[Original scope: A, B, C]
[New scope: A, B, C, D, E, F]

## Refinement Goal
Extend coverage to include [D, E, F] while maintaining quality of [A, B, C]

## Refinement Scope

**Will add:**
- [New area D]
- [New area E]
- [New area F]

**Will NOT change:**
- [Original area A - still valid]
- [Original area B - still valid]
- [Original area C - still valid]

## Guidance

### New Areas to Cover
[For each new area: what to include, depth level, format]

### Integration
[How new content fits with existing]

## Acceptance Criteria
- [ ] New area D covered at [depth]
- [ ] New area E covered at [depth]
- [ ] New area F covered at [depth]
- [ ] Original quality maintained
- [ ] Document remains cohesive

## Success Criteria
[Verification of expanded coverage]
```

### Pattern: Update with New Information

```markdown
# Refine: Update [Output] with [New Information]

## Context
@[original-output] was accurate at time of creation
New information changes [specific aspects]

## Dependencies
@[original-output]
@[new-information-source]

## Current State
[What original output says]
[What new information changes]

## Refinement Goal
Update output to reflect [new information] while preserving valid parts

## Refinement Scope

**Will update:**
- [Section 1]: [Old info] → [New info]
- [Section 2]: [Old info] → [New info]

**Will preserve:**
- [Valid section A]
- [Valid section B]

## Guidance

### Updates Needed
[Detailed changes per section]

### Validation
[How to verify updates are correct]

## Acceptance Criteria
- [ ] Outdated info replaced
- [ ] New info integrated smoothly
- [ ] No contradictions
- [ ] Still cohesive

## Success Criteria
[Verification of accuracy]
```

## Best Practices

1. **Reference original**: Always `@mention` the output being refined
2. **Be specific about gaps**: "Add OAuth provider comparison" not "needs more detail"
3. **Preserve what works**: Explicitly state what NOT to change
4. **Scope the refinement**: List specific additions/changes, not open-ended improvement
5. **Maintain quality**: Refinement shouldn't make original work worse
6. **Integrate smoothly**: New content should feel like part of original, not tacked on
7. **Verify improvements**: Clear criteria for knowing refinement succeeded

## Common Mistakes

- ❌ "Make the plan better" (what specifically?)
- ❌ No reference to original output
- ❌ Doesn't specify what to preserve
- ❌ "Add more detail" without saying where or what kind
- ❌ Open-ended scope (refinement never ends)
- ❌ Changes working parts unnecessarily

## When to Refine vs Start Over

**Refine when:**
- Core approach/analysis is sound
- Specific gaps or errors identified
- Most of original work is valuable
- Want to preserve existing structure

**Start over when:**
- Fundamental approach was wrong
- Easier to rewrite than patch
- Requirements completely changed
- Original output has little salvageable value

## Integration with Other Prompts

Refine prompts can improve outputs from:
- **Research** - Deepen analysis, add comparisons, update with new info
- **Plan** - Address feedback, expand detail, fix flaws in approach
- **Do** - Fix bugs, improve quality, add features to existing code
- **Refine** - Yes, you can refine refinements iteratively
