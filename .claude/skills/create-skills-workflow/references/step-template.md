# Step {NUMBER}: {STEP_NAME}

🛑 MANDATORY EXECUTION RULES
✅ Must complete all actions in EXECUTION SEQUENCE before proceeding
📋 Must update state variables {LIST_STATE_VARS} in frontmatter
💬 Must use AskUserQuestion tool for all user decisions (never plain text prompts)
🚫 Must NOT load other steps (progressive loading only)

## CONTEXT BOUNDARIES

**Previous step:** {PREVIOUS_STEP_NAME} ({what was completed})

**Available state:**
- {stateVar1}: {description}
- {stateVar2}: {description}
- stepsCompleted: {list}
- currentStep: "{current}"

**This step's responsibility:** {One sentence describing this step's single responsibility}

## YOUR TASK

{One clear sentence describing what this step does}

## EXECUTION SEQUENCE

1. Verify prerequisites:
   - [ ] {prerequisite 1 from previous step}
   - [ ] {prerequisite 2}
   - [ ] "{PREVIOUS_STEP_NAME}" is in stepsCompleted

2. {Action 1 - be specific and concrete}

3. {Action 2}

4. {If user interaction needed}:
   Use AskUserQuestion:
   ```
   Question: "{Your question here}"
   Options:
   - "{Option 1 description}"
   - "{Option 2 description}"
   ```

5. Update state variables in frontmatter:
   ```yaml
   state:
     {stateVar}: "{new value}"
   ```

6. Add "{STEP_NAME}" to stepsCompleted array

7. {Final action or confirmation}

## SUCCESS METRICS

- [ ] {Specific measurable criterion 1}
- [ ] {Specific measurable criterion 2}
- [ ] {Specific measurable criterion 3}
- [ ] stepsCompleted contains "{STEP_NAME}"

## FAILURE MODES

- If {error condition 1}: {recovery action}
- If {error condition 2}: {recovery action}
- If {critical failure}: Error - "{message}". Return to {STEP_NAME}

## AUTO MODE HANDLING

```
if state.autoMode == true:
  {describe default behavior}
  skip AskUserQuestion calls
  proceed automatically
```

## NEXT STEP

**On success:** Load step-{NEXT_NUMBER}-{NEXT_NAME}.md

**On failure:** {fallback action}

**Command to execute:**
```
Load: {path/to/next/step.md}
```

**Do NOT load next step automatically. Wait for explicit command.**
