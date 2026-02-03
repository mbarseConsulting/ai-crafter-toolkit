# Workflow Skill Validation Checklist

Use this checklist to ensure your workflow skill follows all critical patterns.

## Overall Structure

- [ ] **Minimum 3 steps** - Workflow has at least 3 distinct phases
- [ ] **Micro-file design** - Each step is a separate file in `steps/` directory
- [ ] **Progressive loading** - Steps loaded one at a time, not all upfront
- [ ] **Clear naming** - Steps named `step-00-init.md`, `step-01-{name}.md`, etc.

## SKILL.md (Main File)

- [ ] **Frontmatter present** - Contains name, description, state variables
- [ ] **stepsCompleted array** - Tracks which steps have been completed
- [ ] **currentStep** - Indicates current position in workflow
- [ ] **State variables defined** - All necessary state vars declared with defaults
- [ ] **Workflow overview** - Lists all steps with brief descriptions
- [ ] **Getting started section** - Clear instruction to load step-00-init
- [ ] **Critical tag present** - `<critical>` tag warns about progressive loading
- [ ] **No step content inline** - Main file doesn't contain step logic

## Each Step File

### Mandatory Sections

- [ ] **MANDATORY EXECUTION RULES** - Present with all 5 emoji markers:
  - 🛑 Intro line
  - ✅ Completion requirement
  - 📋 State update requirement
  - 💬 AskUserQuestion requirement
  - 🚫 Progressive loading enforcement

- [ ] **CONTEXT BOUNDARIES** - Defines:
  - Previous step completed
  - Available state variables
  - This step's single responsibility

- [ ] **YOUR TASK** - One clear sentence

- [ ] **EXECUTION SEQUENCE** - Numbered, concrete actions

- [ ] **SUCCESS METRICS** - Checkboxes with measurable criteria

- [ ] **FAILURE MODES** - Error conditions and recovery actions

- [ ] **NEXT STEP** - Clear routing to next step or completion

### Content Quality

- [ ] **Prerequisites verified** - Step checks that previous step completed
- [ ] **Single responsibility** - Each step does ONE thing well
- [ ] **No cross-loading** - Step doesn't load other steps (except routing to next)
- [ ] **State updates documented** - Shows exact state variables being modified
- [ ] **User interaction clear** - When/how user input is collected

## User Interaction

- [ ] **AskUserQuestion used** - ALL user decisions use AskUserQuestion tool
- [ ] **No plain text prompts** - Never uses "[A] Approve" style prompts
- [ ] **Clear options** - Each AskUserQuestion has descriptive option labels
- [ ] **Auto mode support** - Checks `autoMode` flag and skips questions if true

## State Management

- [ ] **State initialized** - All variables have sensible defaults
- [ ] **State propagates** - Each step reads from and writes to state
- [ ] **stepsCompleted updated** - Each step adds itself to the array
- [ ] **currentStep tracked** - Updated to reflect position in workflow
- [ ] **State persists** - Variables maintained across step transitions

## Step Progression

- [ ] **Linear path clear** - Happy path through all steps is obvious
- [ ] **Branch handling** - If/when branching occurs, it's well-defined
- [ ] **Error recovery** - Failed steps have clear fallback paths
- [ ] **Completion marked** - Final step marks workflow as complete
- [ ] **Reset instructions** - Documents how to restart workflow

## Documentation

- [ ] **Description complete** - Frontmatter description explains when to use skill
- [ ] **Step summaries** - Each step has brief description in main SKILL.md
- [ ] **Prerequisites listed** - What user needs before starting workflow
- [ ] **Expected outcomes** - What workflow produces at completion

## Anti-Patterns to Avoid

- [ ] **Not loading all steps at once** - Would waste context tokens
- [ ] **Not using vague task descriptions** - Each step has concrete actions
- [ ] **Not omitting MANDATORY EXECUTION RULES** - Every step must have them
- [ ] **Not hardcoding paths** - Uses state variables instead
- [ ] **Not forgetting auto mode** - Checks autoMode before AskUserQuestion
- [ ] **Not allowing circular dependencies** - Steps flow in one direction

## Testing

- [ ] **Happy path tested** - Workflow completes successfully end-to-end
- [ ] **Error paths tested** - Failure modes handled gracefully
- [ ] **State persistence verified** - Variables carry through all steps
- [ ] **Auto mode tested** - Workflow runs without user interaction
- [ ] **Token efficiency confirmed** - Only one step loaded at a time

## Final Validation

Run through this final checklist:

1. [ ] Can the workflow be completed in 3+ distinct phases?
2. [ ] Does each step have a single, clear responsibility?
3. [ ] Are all user decisions using AskUserQuestion?
4. [ ] Is state being tracked correctly across steps?
5. [ ] Does progressive loading work (only current step in context)?
6. [ ] Are success and failure paths both handled?
7. [ ] Is the workflow < 500 lines total per step?
8. [ ] Would another developer understand how to use this workflow?

**If all boxes are checked, your workflow skill is ready!**
