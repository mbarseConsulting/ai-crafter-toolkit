# Workflow Skill Template

Use this template when creating a new multi-step workflow skill.

```markdown
---
name: {skill-name}
description: Use when {triggering condition}. Multi-step workflow: (1) {step1 brief}, (2) {step2 brief}, (3) {step3 brief}
stepsCompleted: []
currentStep: "step-00-init"
state:
  # Define your state variables here
  {variable1}: {default_value}
  {variable2}: {default_value}
  autoMode: false
---

# {Skill Name}

{Brief overview of what this workflow accomplishes - 2-3 sentences}

## Workflow Overview

This skill uses a multi-step workflow with:
- **Progressive step loading** - Each step loads independently
- **State persistence** - Variables tracked across steps
- **Interactive decisions** - User approval between phases
- **Clear success metrics** - Each step has validation

## Steps

1. **{Step 0 Name}** (step-00-init) - {Brief description}
2. **{Step 1 Name}** (step-01-{name}) - {Brief description}
3. **{Step 2 Name}** (step-02-{name}) - {Brief description}
4. **{Step N Name}** (step-0N-{name}) - {Brief description}

## When to Use

Use this skill when:
- {Trigger scenario 1}
- {Trigger scenario 2}
- {Trigger scenario 3}

Do NOT use for:
- {Anti-pattern 1}
- {Anti-pattern 2}

## Getting Started

<critical>
Load step-00-init.md to begin. Never load multiple steps simultaneously.
Progressive loading is mandatory for token efficiency.
</critical>

**To start the workflow:**
```
Load: {path/to}/step-00-init.md
```

## Auto Mode

Set `state.autoMode: true` to skip all interactive AskUserQuestion prompts and use default values. Useful for testing or automated execution.

## State Variables

- **{variable1}**: {Description of what this tracks}
- **{variable2}**: {Description}
- **stepsCompleted**: Array tracking which steps have been completed
- **currentStep**: Current step identifier

## Resetting the Workflow

To start over, reset state variables:
```yaml
state:
  {variable1}: {default}
  {variable2}: {default}
stepsCompleted: []
currentStep: "step-00-init"
```
```

## Template Instructions

**Replace these placeholders:**
- `{skill-name}`: kebab-case name (e.g., "report-generator")
- `{Skill Name}`: Human-readable title (e.g., "Report Generator")
- `{triggering condition}`: When this skill should activate
- `{step1 brief}`, `{step2 brief}`, etc.: One-line step descriptions
- `{Step N Name}`: Descriptive name for each step
- `{variable1}`, `{variable2}`: Your state variables
- `{path/to}`: Actual path to steps directory

**Required sections:**
- Frontmatter with state variables
- Workflow Overview
- Steps list
- When to Use
- Getting Started with load command
- <critical> tag about progressive loading

**Optional sections:**
- Auto Mode (if you support it)
- State Variables explanation
- Resetting instructions
