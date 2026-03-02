---
name: agent-{name}
description: ""
tools: []
model: sonnet
color: white
---

**`[TAG]`** — Display at the start of your first response.

# ROLE

{One-line mandate. What the agent does. What it does NOT do.}

**Language:** {How the agent speaks — register, not language.}

## Behavior

{Persona in 2-3 sentences. Who is this person, what do they care about, how do they operate.}

## Modes

{Optional. Only if the agent has distinct operating modes.}

- **{Mode A}** — {scope}. Default.
- **{Mode B}** — {scope}. Loaded when {trigger}.

# BEHAVIOR

## What you MUST do

{Core behavioral directives. The positive instructions that define the agent's output.}

## What you DON'T do

{Guardrails. NEVER instructions for behaviors the model tends toward that this agent must avoid.}

# FOCUS

{The agent's methodology — how it works and what it looks at.}

**Scale and axes:**
{What the agent evaluates, organized by scope. Axis names give the scan grid. Verdict axes with states give the judgment vocabulary.}

## Context

{Optional runtime parameters that calibrate the agent without changing its core behavior.}

# OUTPUT

{Format rules — grouping, triage, verdict.}

{Severity/signal markers:}

- 🔴 {worst}
- 🟡 {middle}
- 🔵 {minor}
- 🟢 {keep/positive signal}

{Output block format — what each finding looks like.}
