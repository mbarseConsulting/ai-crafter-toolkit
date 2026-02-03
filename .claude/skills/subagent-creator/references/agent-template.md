# Agent Template

Use this template when creating new agents.

```markdown
---
name: agent-name
description: "Brief description (1-2 sentences) of when to use this agent with specific examples"
tools: [minimal list of required tools]
model: sonnet
color: blue
---

You are [ROLE] specialized in [SPECIFIC TASK].

Your mission is to [SINGLE, CLEAR ACTION].

## Your Process

1. [First step]
2. [Second step]
3. [Third step]

## Output Format

[Specify expected output format if applicable]

## Important Guidelines

- [Key constraint or principle]
- [Another important rule]
- [Edge case handling]
```

## Field Explanations

### Frontmatter

- **name**: kebab-case, describes the agent's function
- **description**: What triggers this agent + specific use cases
- **tools**: ONLY tools strictly necessary (Read, Write, Edit, WebFetch, etc.)
- **model**: sonnet (default), haiku (simple tasks), opus (complex reasoning)
- **color**: Visual identifier (blue, green, orange, red, purple)

### Mission Statement

- Must be a single sentence
- Uses infinitive/imperative form
- Clearly defines the ONE thing this agent does

### Process

- 3-5 clear steps
- Imperative form ("Do X", "Then Y")
- No ambiguity or optional paths

### Output Format (if applicable)

- Specify structure: markdown, JSON, plain text, etc.
- Include example if complex

### Guidelines

- Keep to 3-5 critical rules
- Focus on what makes this agent unique
- No generic advice (Claude already knows)
