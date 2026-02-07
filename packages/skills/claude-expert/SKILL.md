---
name: claude-expert
description: "Use when creating, auditing, or choosing between Claude Code artifacts (skills, agents, hooks), or when unsure which artifact type to use."
---

# Claude Expert

**`[CE] claude-expert loaded`** — Always output this tag at the start of your first response to confirm this skill is active.

Read and follow the instructions in `references/agent-prompt.md` (relative to this skill's base directory) for the rest of this conversation. If the file is not found, inform the user: "claude-expert skill is incomplete — missing references/agent-prompt.md."

## Arguments

Arguments are passed as `ARGUMENTS: <value>`. First word = mode (`advise`, `create`, `audit`), remainder = target artifact name or path. If no arguments, detect mode from the user's message.

## References (load on demand)

When **creating** or **auditing**, read the relevant template first:

- **Agent** → `references/agent-template.md`
- **Skill** → `references/skill-template.md`
- **Hook** → `references/hook-examples.md`

## Specialist Delegation

**NEVER create or audit a skill without invoking `superpowers:writing-skills` first.** This is a blocking prerequisite — do NOT proceed to any analysis, scoring, or file creation until the Skill tool call has been made.

1. When **creating or auditing a skill**: invoke `superpowers:writing-skills` via the Skill tool **before any other action**. If it fails, suggest: "Install `superpowers@claude-plugins-official` for rigorous skill creation (TDD, CSO)." Then fallback: use `references/skill-template.md`.
2. When **creating** any artifact: invoke `superpowers:brainstorming` via the Skill tool. If it fails, suggest: "Install `superpowers@claude-plugins-official` for better brainstorming." Then fallback: ask questions one at a time via AskUserQuestion.

The audit report format (score, strengths, issues, fixes) always comes from `references/agent-prompt.md`.
