# Step 02: Content Generation

🛑 MANDATORY EXECUTION RULES
✅ Must complete all actions in EXECUTION SEQUENCE before proceeding
📋 Must update state.sections with generated content
💬 Must use AskUserQuestion if user wants to review sections (never plain text prompts)
🚫 Must NOT load step-03 until all sections are generated

## CONTEXT BOUNDARIES

**Previous step:** step-01-outline (outline approved)

**Available state:**
- reportTopic: {from step-00-init}
- targetAudience: {from step-00-init}
- outline: [{approved sections}]
- sections: [] (to be populated with content)

**This step's responsibility:** Generate content for each section in the outline

## YOUR TASK

Generate detailed content for each section in the approved outline, tailored to the target audience.

## EXECUTION SEQUENCE

1. Verify prerequisites:
   - [ ] outline is not empty
   - [ ] "step-01-outline" is in stepsCompleted

2. For each section in state.outline:
   - Generate 200-400 words of content
   - Match tone/complexity to targetAudience:
     * Technical experts: Use technical terminology, assume background knowledge
     * General public: Use plain language, explain concepts
     * Business stakeholders: Focus on impact, ROI, strategic value
     * Students: Educational tone, include examples
   - Include subsection content from outline

3. Store generated content:
   ```yaml
   state:
     sections:
       - title: "{Section 1}"
         content: "{generated text}"
       - title: "{Section 2}"
         content: "{generated text}"
   ```

4. Show progress to user:
   "Generated {N} of {M} sections..."

5. Use AskUserQuestion to ask if user wants to review:
   ```
   Question: "Content generated for all sections. Review before finalizing?"
   Options:
   - "Yes - show me the content"
   - "No - proceed to finalization"
   ```

6. If user selects "Yes":
   - Display each section's content
   - Use AskUserQuestion for each: "Approve this section or request changes?"
   - If changes requested: Regenerate that section, repeat

7. Add "step-02-generation" to stepsCompleted

## SUCCESS METRICS

- [ ] Content generated for ALL sections in outline
- [ ] Each section has 200-400 words
- [ ] Tone matches targetAudience
- [ ] state.sections is fully populated
- [ ] stepsCompleted contains "step-02-generation"

## FAILURE MODES

- If outline is empty: Error - "Cannot generate content without outline. Return to step-01-outline"
- If content generation fails for a section: Retry up to 3 times, then ask user for guidance

## AUTO MODE HANDLING

```
if state.autoMode == true:
  generate all sections
  skip review AskUserQuestion
  proceed to next step
```

## NEXT STEP

**On success:** Load step-03-finalization.md

**Command to execute:**
```
Load: references/example-workflow/steps/step-03-finalization.md
```

**Do NOT load step-03 automatically. Wait for explicit command.**
