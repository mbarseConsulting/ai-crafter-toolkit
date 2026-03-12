# Skill Template

## Minimal Skill

```markdown
---
name: skill-name
description: "Use when: (1) [trigger], (2) [trigger], (3) [trigger]"
---

# Skill Name

[Concise instructions — what to do when this skill is invoked]

## Workflow

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Guidelines

- [Key rule]
- [Constraint]
```

## Skill with References

```
.claude/skills/my-skill/
├── SKILL.md                  ← Entry point (<500 lines)
└── references/
    ├── standards.md           ← Rules, conventions
    ├── examples.md            ← Good/bad examples
    └── templates.md           ← Reusable templates
```

SKILL.md loads references on demand:

```markdown
Read `references/standards.md` (relative to this skill's base directory) before creating.
```

## Multi-Step Workflow Skill

```
.claude/skills/my-workflow/
├── SKILL.md                  ← Entry point, routes to steps
└── steps/
    ├── step-00-init.md        ← Setup
    ├── step-01-gather.md      ← Information gathering
    ├── step-02-generate.md    ← Generation
    └── step-03-finalize.md    ← Validation & output
```

SKILL.md routes to steps sequentially — never load all steps at once.

## Constraints

- Frontmatter: only `name` + `description`, ≤ 1024 chars total
- `name`: letters, numbers, hyphens only
- `description`: starts with "Use when...", no workflow summary (CSO)
- SKILL.md < 500 lines

## Description Best Practices

Good:

- `"Use when: (1) Python code needs formatting, (2) PR review requests style fixes"`
- `"Use when: (1) creating skills/agents/hooks, (2) auditing existing artifacts, (3) choosing which artifact type to use"`

Bad:

- `"A useful skill for doing things"` — too vague, no triggers
- `"Helps with code"` — no concrete scenarios
