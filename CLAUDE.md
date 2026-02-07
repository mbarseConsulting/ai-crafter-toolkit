# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Crafter Claude Toolkit — a workshop for creating, testing, and organizing Claude Code extensions (skills, agents, hooks). This is a configuration/documentation repository, not a traditional application. It contains Claude Code artifacts and tooling to build more of them.

## Repository Structure

```
.claude/
  skills/           # Skill definitions (SKILL.md + references/)
  agents/           # Agent definitions (.md files)
  hooks.json        # Event-driven automation (PreToolUse, SessionStart, etc.)
  settings.local.json
local/              # Local workspace (gitignored contents)
```

## Architecture

**Three artifact types**, each with strict templates in `.claude/skills/claude-expert/references/`:

- **Skills** (`SKILL.md` < 500 lines) — Reusable workflows/knowledge. YAML frontmatter: `name` + `description` only, ≤ 1024 chars. Description starts with "Use when...", no workflow summary. Progressive disclosure: entry point is concise, details in `references/` loaded on demand.
- **Agents** (single `.md` file, 30-60 lines) — Focused single-task units. Mission ≤ 15 words, no conjunctions. Minimal tools. 3-5 step process.
- **Hooks** (`hooks.json`) — Merge-only (never overwrite). PreToolUse can block via `{"decision": "block", "reason": "..."}`.

**Key skill**: `claude-expert` is the meta-skill for creating/auditing all artifact types. Invoke with `/claude-expert` or the Skill tool.

## Conventions

- **Naming**: kebab-case for all artifacts, `AIC-<type>-<description>` for branches (types: feat, fix, docs, refactor, test, chore)
- **Protected branches**: `main` (production), `develop` (integration) — both require PRs
- **Language**: Documentation may be in French; code artifacts in English
- **Hooks require `jq`** for JSON parsing in shell commands

## Enabled Plugins

- `superpowers@claude-plugins-official` — TDD, debugging, planning, code review workflows
- `commit-commands@claude-plugins-official` — Git commit/push/PR automation
