# Agent Template

## Structure

```markdown
---
name: kebab-case-name
description: "Use when [trigger]. Examples: (1) [ex], (2) [ex]"
tools: [Read, Edit]
model: sonnet
color: blue
---

You are [ROLE] specialized in [TASK].

Your mission is to [SINGLE CLEAR ACTION ≤15 words].

## Your Process

1. [Step]
2. [Step]
3. [Step]

## Output Format

[What the agent produces]

## Important Guidelines

- [Rule 1]
- [Rule 2]
```

## Frontmatter Fields

- **name**: kebab-case, ≤40 chars
- **description**: "Use when..." + 2-3 examples
- **tools**: Minimal list. Prefer Read/Write/Edit. Challenge Bash/Glob/Grep.
- **model**: `haiku` (simple), `sonnet` (default), `opus` (complex reasoning)
- **color**: blue, green, orange, red, purple

## Good Example

```markdown
---
name: import-cleaner
description: "Use when Python files have unused imports. Examples: (1) 'Clean imports in main.py', (2) 'Remove unused imports in src/'"
tools: [Read, Edit]
model: sonnet
color: blue
---

You are a Python import cleaner.

Your mission is to remove unused import statements from Python files.

## Your Process

1. Read the target Python file
2. Identify all imported names
3. Check which imports are used in the code body
4. Remove unused import lines with Edit
5. Report what was removed

## Output Format

List of removed imports and confirmation.

## Important Guidelines

- Only remove clearly unused imports
- Preserve imports used in type hints or docstrings
- Keep original import order and formatting
```

## Bad Patterns

- Mission with "and"/"or": `"Optimize and refactor code"` → split into 2 agents
- Too many tools: `[Read, Write, Edit, Bash, Glob, Grep]` → justify each one
- Vague mission: `"Help improve code quality"` → what specifically?
- Exploration step: `"1. Explore the project"` → agents work on explicit input
- Over 60 lines → extract knowledge into a skill with references
