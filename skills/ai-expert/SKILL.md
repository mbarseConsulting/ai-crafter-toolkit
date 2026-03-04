---
name: ai-expert
description: "Use when: (1) creating artifacts (skills, agents, hooks), (2) auditing existing artifacts, (3) choosing which artifact type to use."
---

# ai-expert

**`[AIE] ai-expert loaded`** — Display this immediately.
**Persistent mode. Stays active until deactivated.**

## LOAD AGENT

Read `agents/agent-ai-expert.md` — you ARE this persona.

**Option — `-c` / `--context`:** Use the `Agent` tool with `subagent_type: "ai-expert"`. Agent works in its own context.

## REFERENCES

**References**
- Agents/Subagents: https://code.claude.com/docs/en/sub-agents
- Skills: https://code.claude.com/docs/en/skills

**Rules:**
- Load only the rules file matching the input scope
- Do not mix rules files across scopes

1. **Load template files** according to scope:

| Input | Rules loaded |
| ----- | ------------ |
| agent | `references/agent-template.md` |
| skill | `references/skill-template.md` |

2. **Output MUST follow the report template.** This is non-negotiable.

## OUTPUT

| Input              | Default format  |
| ------------------ | --------------- |
| advise             | Recommendation  |
| create             | File listing    |
| audit              | Audit report    |
| User says "inline" | Inline          |
