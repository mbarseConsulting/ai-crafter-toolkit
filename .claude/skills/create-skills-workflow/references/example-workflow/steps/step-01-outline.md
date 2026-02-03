# Step 01: Outline Creation

🛑 MANDATORY EXECUTION RULES
✅ Must complete all actions in EXECUTION SEQUENCE before proceeding
📋 Must update state.outline in frontmatter with created structure
💬 Must use AskUserQuestion to get outline approval (never plain text "[A] Approve")
🚫 Must NOT load step-02 until user approves outline

## CONTEXT BOUNDARIES

**Previous step:** step-00-init (requirements gathered)

**Available state:**
- reportTopic: {from step-00-init}
- targetAudience: {from step-00-init}
- autoMode: {from step-00-init}
- outline: [] (to be populated)

**This step's responsibility:** Create report outline and get user approval

## YOUR TASK

Generate a structured outline for the report based on topic and audience, then get user approval before proceeding.

## EXECUTION SEQUENCE

1. Verify prerequisites:
   - [ ] reportTopic is not empty
   - [ ] targetAudience is set
   - [ ] "step-00-init" is in stepsCompleted

2. Generate outline based on reportTopic and targetAudience:
   - Create 3-5 main sections
   - Each section should have 2-4 subsections
   - Tailor complexity to targetAudience

3. Display outline to user in clear format:
   ```
   Proposed Outline for "{reportTopic}":

   1. {Section 1}
      - {Subsection 1.1}
      - {Subsection 1.2}
   2. {Section 2}
      - {Subsection 2.1}
      ...
   ```

4. Use AskUserQuestion to get approval:
   ```
   Question: "Does this outline look good?"
   Options:
   - "Approve - proceed with this outline"
   - "Revise - I want to modify the structure"
   ```

5. Handle response:
   - If "Approve": Update state.outline and proceed to step 6
   - If "Revise": Ask what changes are needed, regenerate, repeat from step 3

6. Update state variables in frontmatter:
   ```yaml
   state:
     outline: [{section1}, {section2}, ...]
   ```

7. Add "step-01-outline" to stepsCompleted

## SUCCESS METRICS

- [ ] Outline generated with 3-5 sections
- [ ] Each section has subsections
- [ ] User approved the outline via AskUserQuestion
- [ ] state.outline is populated
- [ ] stepsCompleted contains "step-01-outline"

## FAILURE MODES

- If reportTopic is missing: Error - "Cannot create outline without topic. Return to step-00-init"
- If user rejects outline 3+ times: Offer to restart from step-00-init with different requirements

## AUTO MODE HANDLING

```
if state.autoMode == true:
  generate outline
  automatically approve (skip AskUserQuestion)
  proceed to next step
```

## NEXT STEP

**On success:** Load step-02-generation.md

**Command to execute:**
```
Load: references/example-workflow/steps/step-02-generation.md
```

**Do NOT load step-02 automatically. Wait for explicit command.**
