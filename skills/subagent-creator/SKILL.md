---
name: subagent-creator
description: Reference guide for agent design principles. Use when creating agents to ensure mission focus, minimal tools, and clear boundaries. Loaded by creator skill during agent creation.
---

# Subagent Creator

Reference guide for creating focused agents that stay within their mission scope.

## Core Principles

- **One mission only**: Mission ≤15 words, no "and"/"or" conjunctions
- **Minimal tools**: Only essential tools (Read/Write/Edit). Challenge Bash/Glob/Grep/WebFetch
- **No project exploration**: Agents work on explicit input, not project discovery
- **Clear boundaries**: Define what agent does; everything else is out of scope

## Agent Anatomy

Every agent file follows this structure:

**Frontmatter (required):**
- `name`: kebab-case identifier
- `description`: When to use + 2-3 examples
- `tools`: Array of tool names (prefer Read/Write/Edit)
- `model`: Usually "sonnet"
- `color`: Visual identifier

**Body sections (required):**
- **Mission statement**: ONE clear action the agent performs
- **Process**: 3-5 concrete steps the agent follows
- **Output format**: What the agent produces
- **Guidelines**: Key rules and constraints

**Target length:** 30-60 lines total for clarity and token efficiency.

## Good vs Bad Examples

### ✅ Good Agent: import-cleaner

```yaml
---
name: import-cleaner
description: Use when Python files have unused imports. Examples: (1) "Remove unused imports from main.py", (2) "Clean imports in src/"
tools: [Read, Edit]
model: sonnet
color: blue
---

You are a Python import cleaner focused on removing unused imports.

Your mission is to identify and remove unused import statements from Python files.

## Your Process

1. Read the Python file
2. Identify imported names
3. Check which imports are actually used in the code
4. Remove unused import lines
5. Preserve import order and formatting

## Output Format

Report which imports were removed and show the cleaned file.

## Important Guidelines

- Only remove imports that are clearly unused
- Don't remove imports used in type hints or docstrings
- Preserve comments and formatting
```

**Why it's good:**
- Mission: 8 words, crystal clear
- Tools: Only Read/Edit (justified)
- Process: 5 concrete steps
- No exploration: works on explicit file input

### ❌ Bad Agent: code-optimizer

```yaml
---
name: code-optimizer
description: Optimize and improve code quality
tools: [Read, Write, Edit, Bash, Grep, Glob]
model: sonnet
---

You are a code optimizer that helps improve code.

Your mission is to analyze codebases and optimize code for performance, readability, and best practices.

## Your Process

1. Explore the project structure
2. Find files that need optimization
3. Analyze code quality
4. Suggest or implement improvements
5. Run tests to verify changes

## Guidelines

- Focus on performance
- Improve readability
- Follow best practices
```

**Why it's bad:**
- Mission: Vague ("optimize", "improve"), has "and" (multiple missions)
- Tools: Too many, includes Bash/Grep/Glob without justification
- Process: Starts with "explore project" (violates no-exploration rule)
- Scope: Unclear boundaries (performance? readability? both? what else?)

## Reference

See [agent-template.md](references/agent-template.md) for the complete template structure.
