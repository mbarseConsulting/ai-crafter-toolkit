# Skill Template

Covers both Standalone and Skill+Agent patterns.

**Instructions:**
1. Copy template below
2. Delete conditional sections you don't need
3. Fill placeholders

---

```markdown
---
name: skill-name
description: "Use when: (1) [trigger], (2) [trigger], (3) [trigger]"
tools: []  # Add if needed: [WebFetch, FileRead]
---

<!-- ============================================ -->
<!-- CHOOSE MODE: Keep ONE, delete the other two -->
<!-- ============================================ -->

# SKILL NAME

<!-- MODE: PERSISTENT -->
**`[TAG — ON]`** — Display this immediately.
**Persistent mode. Stays active until deactivated.**

<!-- MODE: ONE-SHOT -->
**`[TAG]`** — Display this immediately.
**Applies to this response only. Auto-resets after.**

<!-- MODE: HYBRID -->
**`[TAG]`** — Display this immediately.
**Mode:** One-shot by default. Use `--stay` to keep active.

<!-- ============================================ -->
<!-- END MODE SELECTION -->
<!-- ============================================ -->

<!-- ============================================ -->
<!-- AGENT LOADING: Only for Skill+Agent pattern -->
<!-- Delete this entire section if Standalone    -->
<!-- ============================================ -->

## LOAD AGENT

Read `agents/{agent-name}.md` — you ARE this persona.

**Option — `-c` / `--context`:** Use the `Agent` tool with `subagent_type: "{agent-name}"`. Agent works in its own context.

<!-- ============================================ -->
<!-- END AGENT LOADING -->
<!-- ============================================ -->


## OPTIONS

<!-- If HYBRID mode, keep this: -->
**`--stay`:** Keep skill active across conversation. Say "exit [skill-name]" or "mode normal" to deactivate.

<!-- Add your custom options: -->
**`-f` / `--flag`:** [Description with MUST/NEVER if critical]

<!-- If no options at all: -->
**NONE** — This skill has no configurable options.

---

## CORE PROCESS — **MUST APPLY ALL**

1. **MUST [action]** — [explanation]
2. **NEVER [anti-pattern]** — [explanation]
3. [Add more rules as needed]

**Focus:**
- [Key aspect 1]
- [Key aspect 2]
- [Key aspect 3]

## REFERENCES

Read `references/{reference-name}.md` before processing.

---

## OUTPUT

**Structure:**
- [Define expected structure]
- [Add formatting requirements]

**Tone:** [Adjectives describing voice]

**Example (optional):**

[Show example output if format is complex]


<!-- ============================================ -->
<!-- DEACTIVATION: Only needed for PERSISTENT or HYBRID with --stay -->
<!-- Delete this section if ONE-SHOT mode -->
<!-- ============================================ -->

---

## DEACTIVATION

User says "[keyword 1]", "[keyword 2]", "mode normal" → drop these rules, return to default behavior.

Confirm with **`[TAG — OFF]`**.

<!-- ============================================ -->
<!-- END DEACTIVATION -->
<!-- ============================================ -->
```

## Frontmatter Fields

> Reference: https://code.claude.com/docs/en/skills

**Required:** `name`, `description`

| Field | Description |
|---|---|
| `name` | Display name. If omitted, uses directory name |
| `description` | What the skill does and when to use it |
| `argument-hint` | Hint shown during autocomplete, e.g. `[issue-number]` |
| `disable-model-invocation` | `true` = only user can invoke (not Claude auto-load) |
| `user-invocable` | `false` = hidden from `/` menu, only Claude can invoke |
| `allowed-tools` | Tools Claude can use without permission prompt when skill is active |
| `model` | Model to use when this skill is active |
| `context` | Set to `fork` to run in an isolated subagent context |
| `agent` | Subagent type to use when `context: fork` is set |
| `hooks` | Hooks scoped to this skill's lifecycle |
