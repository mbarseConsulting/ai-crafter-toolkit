# Step 03: Finalization

🛑 MANDATORY EXECUTION RULES
✅ Must complete all actions in EXECUTION SEQUENCE before completing workflow
📋 Must mark workflow as complete in stepsCompleted
💬 Must use AskUserQuestion for format selection (never plain text)
🚫 This is the FINAL step - do NOT load any other steps

## CONTEXT BOUNDARIES

**Previous step:** step-02-generation (content generated)

**Available state:**
- reportTopic: {from step-00-init}
- targetAudience: {from step-00-init}
- outline: {from step-01-outline}
- sections: [{generated content}]

**This step's responsibility:** Format and export the final PDF report

## YOUR TASK

Assemble all sections into a formatted document and export as PDF.

## EXECUTION SEQUENCE

1. Verify prerequisites:
   - [ ] sections array is not empty
   - [ ] All previous steps in stepsCompleted

2. Use AskUserQuestion to select format preferences:
   ```
   Question: "Select report format style"
   Options:
   - "Professional - formal business format"
   - "Academic - research paper style"
   - "Creative - modern design with visuals"
   ```

3. Assemble complete document:
   - Title page with reportTopic
   - Table of contents from outline
   - All sections with content from state.sections
   - Apply selected format style

4. Generate formatted output:
   - Create markdown version first
   - Format according to selected style
   - Include page breaks between sections
   - Add headers/footers if applicable

5. Present final document to user:
   "Report complete! Here's your {style} report on '{reportTopic}'..."
   [Display formatted content]

6. Use AskUserQuestion for final confirmation:
   ```
   Question: "Save this report?"
   Options:
   - "Yes - export as PDF"
   - "Revise - make changes"
   ```

7. If "Yes":
   - Inform user: "Report would be saved as: {reportTopic}-report.pdf"
   - (Note: Actual PDF generation would require external tools)

8. If "Revise":
   - Ask which step to revisit
   - Load appropriate step-XX-{name}.md

9. Update final state:
   ```yaml
   stepsCompleted: ["step-00-init", "step-01-outline", "step-02-generation", "step-03-finalization"]
   currentStep: "complete"
   ```

10. Display workflow summary:
    "Workflow complete! Generated {N} sections for {targetAudience} audience."

## SUCCESS METRICS

- [ ] All sections assembled into complete document
- [ ] Format style applied
- [ ] User confirmed final output
- [ ] stepsCompleted contains all 4 steps
- [ ] currentStep set to "complete"

## FAILURE MODES

- If sections are incomplete: Error - "Missing content. Return to step-02-generation"
- If user wants major changes: Offer to restart from step-01-outline

## AUTO MODE HANDLING

```
if state.autoMode == true:
  use "Professional" format by default
  skip confirmation AskUserQuestion
  automatically export
```

## NEXT STEP

**Workflow complete!** This is the final step.

If user wants to create another report, they should invoke the skill again from step-00-init.

## CLEANUP

Reset state variables for next workflow execution:
```yaml
state:
  reportTopic: ""
  targetAudience: ""
  outline: []
  sections: []
stepsCompleted: []
currentStep: "step-00-init"
```
