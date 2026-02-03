---
name: create-skills-workflow
description: Use when creating multi-step workflow skills (3+ steps) with state management, progressive loading, and interactive decisions. Examples: (1) "create a workflow skill", (2) "build a multi-phase skill", (3) "need state persistence between steps"
---

# Create Skills Workflow

Guide for building sophisticated multi-step workflow skills with progressive loading, state management, and interactive decision points.

## Overview

This skill helps you create workflow skills that require:
- **3+ distinct steps** - Multiple phases with clear progression
- **State persistence** - Variables that propagate across steps
- **Interactive decisions** - User approval/choices between phases
- **Progressive loading** - Micro-file design for token efficiency

## When to Use

**Use this skill when building:**
- Multi-phase processes (research → draft → review → publish)
- Tasks requiring user validation between steps
- Workflows with conditional/optional execution paths
- Complex state that evolves through multiple stages

**Skip this for:**
- Single-action skills (use `creator` instead)
- Pure research workflows without state
- Simple linear tasks without decisions

## Interactive Workflow (5 Phases)

This skill guides you through creating a workflow skill step-by-step.

### Phase 1: Definition

**Objective:** Understand what workflow skill to build

**Questions to ask:**
1. "What is the goal of this workflow skill?"
2. "How many distinct phases/steps are needed?" (validate ≥3)
3. "What decisions does the user make between steps?"
4. "What information needs to persist across steps?"

**Validation:**
- Confirm this needs a workflow (if <3 steps → redirect to `creator`)
- Verify user decisions are necessary (not just "continue")
- Identify all state variables

**Output of this phase:**
- Workflow name
- Number of steps (minimum 3)
- List of state variables
- Decision points mapped to steps

### Phase 2: Step Planning

**Objective:** Define each step's responsibility and data flow

**For each step (0 through N):**
1. "What is this step's name?" (e.g., "validation", "generation")
2. "What is this step's ONE responsibility?"
3. "What state does it read?" (input variables)
4. "What state does it produce?" (output variables)
5. "Does the user make a decision here?" (yes/no + what decision)

**Example planning session:**
```
Step 0 (init):
- Responsibility: Gather user requirements
- Reads: nothing
- Produces: reportTopic, targetAudience
- Decision: none

Step 1 (outline):
- Responsibility: Create report structure
- Reads: reportTopic, targetAudience
- Produces: outline array
- Decision: approve/revise outline

Step 2 (generation):
- Responsibility: Generate content
- Reads: outline, targetAudience
- Produces: sections array
- Decision: review content yes/no
...
```

**Output of this phase:**
- Complete step list with responsibilities
- State flow diagram (what each step reads/writes)
- Decision points documented

### Phase 3: File Creation

**Objective:** Generate all workflow skill files

**Actions:**
1. Create skill directory: `.claude/skills/{name}/`
2. Create main SKILL.md using `workflow-skill-template.md`:
   - Fill in frontmatter (name, description, state variables)
   - List all steps in overview
   - Add getting started section
3. Create `steps/` subdirectory
4. For each step, create `step-{NN}-{name}.md` using `step-template.md`:
   - Fill in MANDATORY EXECUTION RULES
   - Define CONTEXT BOUNDARIES
   - Write EXECUTION SEQUENCE
   - Set SUCCESS METRICS
   - Configure NEXT STEP routing
   - Add AUTO MODE HANDLING if applicable

**File structure created:**
```
.claude/skills/{name}/
├── SKILL.md
└── steps/
    ├── step-00-init.md
    ├── step-01-{name}.md
    ├── step-02-{name}.md
    └── step-0N-{name}.md
```

**Use templates from references:**
- `workflow-skill-template.md` for main SKILL.md
- `step-template.md` for each step file
- `example-workflow/` as reference

### Phase 4: Validation

**Objective:** Ensure workflow follows all critical patterns

**Load and check against:** `validation-checklist.md`

**Key validations:**
- [ ] Minimum 3 steps present
- [ ] Each step has MANDATORY EXECUTION RULES with all 5 emojis (🛑✅📋💬🚫)
- [ ] State variables defined in frontmatter
- [ ] Each step uses AskUserQuestion (not plain text prompts)
- [ ] Progressive loading enforced (no step loads others)
- [ ] SUCCESS METRICS defined for each step
- [ ] NEXT STEP routing clear
- [ ] Auto mode supported (checks autoMode flag)

**For each issue found:**
- Report specific problem
- Suggest fix
- Offer to correct automatically

**Output of this phase:**
- Validated workflow passing all checks
- OR list of issues to fix

### Phase 5: Testing Guidance

**Objective:** Help user test the workflow end-to-end

**Provide test scenarios:**
1. **Happy path test:**
   "Test the workflow by starting at step-00-init and progressing through all steps with approvals"

2. **Error handling test:**
   "Test what happens if you reject/revise at decision points"

3. **State persistence test:**
   "Verify state variables carry through all steps correctly"

4. **Auto mode test:**
   "Set autoMode=true and run through without interactions"

**Expected outcomes:**
- All steps complete successfully
- State tracked correctly in frontmatter
- User decisions work via AskUserQuestion
- Workflow produces expected final output

**If issues found:**
- Identify which step/validation failed
- Return to Phase 4 for corrections
- Re-test after fixes

## Critical Architecture Patterns

### Micro-File Design

Each step exists as a separate file, loaded progressively:
- **Never load all steps at once** - Wastes context tokens
- **Load only current step** - Maximum token efficiency
- **Steps don't load other steps** - Routing is declarative

### Mandatory Step Components

Every step file MUST include:

**1. MANDATORY EXECUTION RULES** (with emojis):
```markdown
🛑 MANDATORY EXECUTION RULES
✅ Must complete all actions in EXECUTION SEQUENCE
📋 Must update state variables in frontmatter
💬 Must use AskUserQuestion for decisions
🚫 Must NOT load other steps
```

**2. CONTEXT BOUNDARIES:**
- Previous step completed
- Available state variables
- This step's single responsibility

**3. YOUR TASK:** One clear sentence

**4. EXECUTION SEQUENCE:** Numbered concrete actions

**5. SUCCESS METRICS:** Checkboxes with measurable criteria

**6. FAILURE MODES:** Error conditions and recovery

**7. NEXT STEP:** Clear routing instruction

### User Interaction Rules

**Always use AskUserQuestion tool:**
```markdown
Use AskUserQuestion:
Question: "Approve this outline?"
Options:
- "Approve - proceed with this structure"
- "Revise - make changes"
```

**Never use plain text prompts:**
```markdown
❌ BAD: "Type [A] to approve or [R] to revise"
✅ GOOD: Use AskUserQuestion with options
```

**Auto mode support:**
```markdown
if state.autoMode == true:
  use default values
  skip AskUserQuestion calls
  proceed automatically
```

### State Tracking

**Define in frontmatter:**
```yaml
---
name: skill-name
stepsCompleted: []
currentStep: "step-00-init"
state:
  variable1: default_value
  variable2: default_value
  autoMode: false
---
```

**Update in each step:**
- Read needed variables from state
- Perform step actions
- Write new values to state
- Add step name to stepsCompleted

## Templates and Examples

**Available resources in `references/`:**

- **step-template.md** - Complete template for creating any step
- **workflow-skill-template.md** - Template for main SKILL.md file
- **validation-checklist.md** - Full validation checklist
- **example-workflow/** - Complete working example (pdf-report-generator)
  - 4-step workflow demonstrating all patterns
  - Shows progressive loading, state management, decisions
  - Reference this when building your workflow

## Common Pitfalls

| Mistake | Problem | Solution |
|---------|---------|----------|
| Loading all steps at once | Wastes context tokens | Use progressive loading, one step at a time |
| Plain text prompts | Inconsistent UX, no auto mode | Always use AskUserQuestion tool |
| Omitting MANDATORY RULES | Steps don't follow patterns | Use step-template.md for every step |
| Vague task descriptions | Unclear what step does | One clear sentence in YOUR TASK |
| Forgetting auto mode | Can't test without interaction | Check autoMode before AskUserQuestion |
| Hardcoded paths | Not flexible | Use state variables instead |
| Circular dependencies | Steps can't complete | Linear progression with clear routing |

## Quick Start

**To create a workflow skill using this guide:**

1. Invoke this skill: `/create-skills-workflow`
2. Answer Phase 1 questions about your workflow
3. Plan each step in Phase 2
4. Let the skill generate files in Phase 3
5. Validate with checklist in Phase 4
6. Test following Phase 5 guidance

**To see a complete example:**

Read `references/example-workflow/` which shows a 4-step PDF report generator with all patterns implemented.

## Implementation Notes

- Use `Write` tool to create all files
- Reference templates from `references/`
- Validate each step file against `step-template.md`
- Run final check against `validation-checklist.md`
- Token target: <300 lines per step file
- Total workflow: <500 lines for main SKILL.md

<critical>
Progressive loading is non-negotiable. Each step must be self-contained and loaded only when needed. Never compromise on micro-file design.
</critical>
