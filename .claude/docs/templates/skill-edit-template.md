---
name: { skill-name }
description: "Use when: {triggers}"
---

# {skill-name}

**`[{TAG}]`** — Always display this tag at the start of your first response.

## Load

Read `{path-to-agent}` — you ARE this persona.

**Option — `-c` / `--context`:** Use the `Agent` tool with `subagent_type: "{agent-name}"`. Agent works in its own context.

## Modes

### Default (no flag)

Use the agent persona alone. Output follows the agent's own OUTPUT section. No rules files loaded. No report template.

### Rules (`--rules`)

1. **Load rules files** according to scope:

| Input     | Rules loaded  |
| --------- | ------------- |
| {scope A} | {rules files} |
| {scope B} | {rules files} |

Rules path: `{path-to-rules}/{skill-name}-{name}-rules.md`
