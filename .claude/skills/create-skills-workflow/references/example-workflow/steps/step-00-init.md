# Step 00: Initialization

🛑 MANDATORY EXECUTION RULES
✅ Must complete all actions in EXECUTION SEQUENCE before proceeding
📋 Must update state variables (reportTopic, targetAudience, autoMode) in frontmatter
💬 Must use AskUserQuestion tool for all user input (never plain text prompts)
🚫 Must NOT load step-01 or any other steps (progressive loading only)

## CONTEXT BOUNDARIES

**Previous step:** None (entry point)

**Available state:**
- All state variables are empty/default
- stepsCompleted: []
- currentStep: "step-00-init"

**This step's responsibility:** Gather report requirements from user

## YOUR TASK

Collect report topic, target audience, and execution mode preferences from the user.

## EXECUTION SEQUENCE

1. Check if autoMode is enabled in state
   - If autoMode=true: Skip all AskUserQuestion calls, use defaults
   - If autoMode=false: Proceed with interactive questions

2. Use AskUserQuestion to ask:
   - "What is the topic of your report?" (open text)
   - "Who is the target audience?" (options: Technical experts, General public, Business stakeholders, Students)

3. Update state variables in frontmatter:
   ```yaml
   state:
     reportTopic: "{user's answer}"
     targetAudience: "{selected audience}"
     autoMode: false
   ```

4. Add "step-00-init" to stepsCompleted array

5. Confirm to user: "Requirements gathered. Topic: {topic}, Audience: {audience}"

## SUCCESS METRICS

- [ ] reportTopic is not empty
- [ ] targetAudience is set
- [ ] stepsCompleted contains "step-00-init"
- [ ] User received confirmation message

## FAILURE MODES

- If user provides unclear topic: Ask for clarification before proceeding
- If AskUserQuestion fails: Log error and ask user to retry

## AUTO MODE HANDLING

```
if state.autoMode == true:
  reportTopic = "Sample Business Report"
  targetAudience = "Business stakeholders"
  skip AskUserQuestion calls
```

## NEXT STEP

**On success:** Load step-01-outline.md

**Command to execute:**
```
Load: references/example-workflow/steps/step-01-outline.md
```

**Do NOT load step-01 automatically. Wait for explicit command.**
