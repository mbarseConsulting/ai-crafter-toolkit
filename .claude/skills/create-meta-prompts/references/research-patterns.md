# Research Prompt Patterns

Research prompts gather information and context to inform subsequent planning or implementation.

## Template Structure

```markdown
# Research: [Topic]

## Context

[Explain why this research is needed and what problem it addresses]

## Research Questions

[List 3-5 specific questions that need answers, such as:]
1. What are the available options for [X]?
2. What are the trade-offs between approaches?
3. What are the best practices in this domain?
4. What constraints or requirements apply?
5. What examples or precedents exist?

## Sources to Explore

[Specify where to look:]
- Existing codebase (specific files/directories)
- Documentation (internal/external)
- Recent commits or issues
- Industry standards or frameworks

## Output Requirements

Produce a research report with:

**Structure:**
1. **Executive Summary** (2-3 sentences)
2. **Findings** (organized by research question)
3. **Comparison** (if applicable - table format preferred)
4. **Recommendations** (ranked by confidence)
5. **Open Questions** (what couldn't be answered)
6. **Next Steps** (what to do with this research)

**Format:**
- Use markdown with clear headings
- Include code examples where relevant
- Link to sources/files referenced
- Keep findings actionable and specific

## Success Criteria

- All research questions answered or marked as unanswerable
- Clear recommendation for next phase
- Sufficient detail to inform planning decisions
- Identified any blockers or constraints
```

## Examples

### Good Research Prompt

```markdown
# Research: Authentication Options for Multi-Tenant SaaS

## Context

We need to implement authentication for our new multi-tenant SaaS platform. Users include both end-users and admin users with different permission levels. We need to understand which approach best fits our architecture (Node.js backend, React frontend).

## Research Questions

1. What are the pros/cons of OAuth 2.0 vs JWT vs session-based auth for multi-tenant apps?
2. How do leading SaaS platforms handle tenant isolation in auth?
3. What libraries/frameworks exist for Node.js that support multi-tenancy?
4. What security considerations are specific to multi-tenant authentication?
5. How should admin vs end-user authentication differ?

## Sources to Explore

- Auth0, Firebase, AWS Cognito documentation
- Our existing user model (src/models/user.js)
- Security requirements doc (docs/security-reqs.md)
- Competitor research (if available)

## Output Requirements

[Standard structure as above]

## Success Criteria

- Clear recommendation on auth approach
- Identified security risks and mitigations
- List of required libraries/services
- Estimated complexity for each option
```

### Pattern: Technology Comparison

```markdown
# Research: [Technology A] vs [Technology B] for [Use Case]

## Context
[Why choosing between these specific technologies]

## Research Questions
1. What are the key differences in capabilities?
2. Which better fits our constraints (performance/scale/cost)?
3. What's the learning curve and community support?
4. What are the migration paths if we need to change later?

## Sources to Explore
- Official documentation for both
- Real-world usage examples
- Performance benchmarks
- Our current tech stack compatibility

## Output Requirements
Include comparison table with: Features, Performance, Cost, DX, Ecosystem

## Success Criteria
- Clear winner or justified "it depends" with criteria
```

### Pattern: Codebase Understanding

```markdown
# Research: How Does [Feature] Currently Work?

## Context
[Why understanding this feature is needed]

## Research Questions
1. What files/modules implement this feature?
2. What's the data flow through the system?
3. What external dependencies are involved?
4. What tests exist and what do they cover?
5. What are the known limitations or tech debt?

## Sources to Explore
- Codebase (use Grep/Glob to locate relevant files)
- Existing tests
- Git history for this feature
- Related issues or PRs

## Output Requirements
- Architecture diagram (ASCII or description)
- Key files and their responsibilities
- Data flow explanation
- Areas of concern for modifications

## Success Criteria
- Can explain feature to someone unfamiliar
- Identified safe vs risky areas for changes
```

## Best Practices

1. **Be specific**: Vague questions get vague answers
2. **Prioritize questions**: Put most critical questions first
3. **Define scope**: Limit research to what's needed for next phase
4. **Request structure**: Specify exact output format needed
5. **Plan for unknowns**: Ask for "open questions" section
6. **Make it actionable**: Research should inform decisions, not just document

## Common Mistakes

- ❌ "Research authentication" (too vague)
- ❌ No clear output format specified
- ❌ No success criteria
- ❌ Too many unrelated questions
- ❌ No sources specified (leads to generic answers)

## Integration with Other Prompts

Research outputs should feed into:
- **Plan prompts** - Use findings to design approach
- **Do prompts** - Reference decisions from research
- **Refine prompts** - Revisit if assumptions proved wrong
