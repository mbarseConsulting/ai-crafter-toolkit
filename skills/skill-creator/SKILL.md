---
name: skill-creator
description: "Create Agent Skills following best practices. Use when: (1) building new skills, (2) need guided skill creation, (3) want validated skill structure"
---

<objective>
Guide users through creating professional Agent Skills following best practices. Automates the complete creation workflow from initial concept to validated, test-ready skill with comprehensive documentation and examples.
</objective>

<quick_start>
1. Launch this skill - it asks: "What is your skill about?"
2. Answer 6 essential questions about the skill
3. Skill generates complete structure with examples
4. Review validation results and test scenarios
</quick_start>

<success_criteria>
- All required XML tags present and properly formatted
- SKILL.md under 500 lines with clear progressive disclosure
- references/ directory with relevant documentation
- templates/ directory when applicable
- Validation checklist passes 100%
- At least 3 concrete test scenarios provided
</success_criteria>

<workflow>
## Phase 1: Questionnaire

Ask the user these 6 essential questions:

**Question 1**: "What is your skill about? (Brief description in 1-2 sentences)"
- Capture the core purpose and value

**Question 2**: "What should the skill be named?"
- Format: kebab-case, verb-noun pattern preferred
- Validation: lowercase, hyphens only, ≤40 chars
- Offer to suggest a name based on their description if they're unsure

**Question 3**: "Provide 3 concrete triggering scenarios when this skill should be used:"
- Format: "When [context], use this skill to [action]"
- Example: "When creating a new API endpoint, use this skill to scaffold the structure"

**Question 4**: "Which optional XML tags are needed for this skill?"
Present as checklist with descriptions:
- [ ] `workflow` - Step-by-step procedures
- [ ] `examples` - Multi-shot learning demonstrations
- [ ] `anti_patterns` - Common mistakes to avoid
- [ ] `security_checklist` - Security best practices
- [ ] `advanced_features` - Deep-dive content
- [ ] `validation` - Output verification methods

**Question 5**: "Does this skill need reference documentation or templates?"
- A) References only (additional documentation files)
- B) Templates only (reusable file templates)
- C) Both references and templates
- D) Neither (SKILL.md is sufficient)

**Question 6**: Confirm summary before generation
Display:
```
Summary:
- Name: {skill-name}
- Objective: {brief-objective}
- Triggers: {3-scenarios}
- Optional tags: {selected-tags}
- Resources: {references/templates/both/none}

Proceed with generation? (yes/no)
```

## Phase 2: Generation

Create the complete skill structure using Write tool:

### 1. Generate SKILL.md

Create `.claude/skills/{skill-name}/SKILL.md` with:

```markdown
---
name: {skill-name}
description: "{generated from scenarios and objective}"
---

<objective>
{Based on user's description, articulate what the skill does and why it's important}
</objective>

<quick_start>
1. {First actionable step}
2. {Second actionable step}
3. {Third actionable step}
</quick_start>

<success_criteria>
- {Measurable criterion 1}
- {Measurable criterion 2}
- {Measurable criterion 3}
</success_criteria>

{Include selected optional tags with relevant content}
```

**Content generation rules:**
- `<objective>`: Expand the user's description into a clear statement of purpose
- `<quick_start>`: Derive 3-5 immediate steps from the workflow or scenarios
- `<success_criteria>`: Define 3-5 measurable indicators from the objective
- Optional tags: Pre-fill with contextually relevant content based on the skill's domain

### 2. Generate references/ (if requested)

Always create:
- `skill-standards.md` - Complete skill development standards
- `xml-tags-reference.md` - All XML tags with descriptions

Conditionally create based on skill domain:
- `best-practices.md` - Domain-specific best practices
- `api-reference.md` - If the skill involves APIs or tools
- `troubleshooting.md` - If the skill is complex

### 3. Generate templates/ (if requested)

Create relevant templates based on the skill's purpose:
- `basic-template.md` - Starter template for the skill's output
- Domain-specific templates as needed

### 4. Generate validation checklist

Create `templates/validation-checklist.md` with checks specific to this skill

## Phase 3: Validation

After generation, automatically validate the created structure:

### File Structure Checks
```
✓ .claude/skills/{name}/SKILL.md exists
✓ SKILL.md has valid YAML frontmatter (name + description)
✓ references/ directory created (if requested)
✓ templates/ directory created (if requested)
```

### Required XML Tags
```
✓ <objective> present and non-empty
✓ <quick_start> present with numbered steps
✓ <success_criteria> present with measurable indicators
```

### Optional XML Tags (if selected)
```
✓ <workflow> has numbered steps
✓ <examples> has concrete input/output
✓ <anti_patterns> lists common errors
✓ <security_checklist> has actionable items
✓ <advanced_features> provides deep-dive content
✓ <validation> defines verification methods
```

### Content Quality
```
✓ SKILL.md < 500 lines
✓ No duplication between SKILL.md and references/
✓ Progressive disclosure: basics in SKILL.md, details in references/
✓ No unnecessary README files
```

**Display validation results:**
```
✅ Validation: X/Y checks passed

{If failures:}
❌ Failed checks:
- {Check 1}: {Reason}
- {Check 2}: {Reason}
```

## Phase 4: Test Scenarios

Generate 3-5 test scenarios based on the triggering scenarios provided:

```
📋 Suggested Test Scenarios:

Test 1 (In-scope - Primary use case):
Input: {Concrete example from scenario 1}
Expected: {Skill activates and performs intended action}

Test 2 (In-scope - Edge case):
Input: {Variant or edge case of the main scenarios}
Expected: {Skill handles appropriately}

Test 3 (Out-of-scope):
Input: {Similar but outside the skill's defined scope}
Expected: {Skill refuses or doesn't activate}

{Additional tests based on complexity}
```

**Testing instructions:**
1. Try each scenario in a new conversation
2. Verify the skill activates (or doesn't) as expected
3. Check that outputs match success criteria
4. Iterate on SKILL.md if behavior is incorrect

</workflow>

<examples>
## Example 1: Creating a simple validation skill

**User input:**
- What: "Validate JSON configuration files"
- Name: "json-validator"
- Scenarios:
  1. "When user provides a JSON file, validate its structure"
  2. "When config file exists, check against schema"
  3. "When deployment starts, verify JSON is valid"
- Optional tags: workflow, examples
- Resources: References only

**Generated SKILL.md snippet:**
```markdown
---
name: json-validator
description: "Validate JSON configuration files against schemas. Use when: (1) validating user JSON, (2) checking configs, (3) pre-deployment verification"
---

<objective>
Validate JSON configuration files to ensure they are well-formed and match expected schemas, preventing runtime errors from malformed configs.
</objective>

<quick_start>
1. Read the JSON file using Read tool
2. Parse JSON and check for syntax errors
3. Validate against schema if provided
4. Report validation results with specific error locations
</quick_start>

<success_criteria>
- JSON parsing succeeds or fails with clear error messages
- Schema validation identifies all mismatches
- Error locations include line and column numbers
- Validation completes in <1 second for files up to 1MB
</success_criteria>
```

## Example 2: Creating a workflow-heavy skill

**User input:**
- What: "Guide developers through setting up new microservices"
- Name: "microservice-scaffolder"
- Scenarios:
  1. "When starting a new service, scaffold the structure"
  2. "When adding to existing system, ensure consistency"
  3. "When onboarding, show service setup process"
- Optional tags: workflow, examples, anti_patterns, validation
- Resources: Both references and templates

**Generated structure:**
```
.claude/skills/microservice-scaffolder/
├── SKILL.md (with workflow, examples, anti_patterns, validation tags)
├── references/
│   ├── skill-standards.md
│   ├── xml-tags-reference.md
│   ├── microservice-best-practices.md
│   └── architecture-patterns.md
└── templates/
    ├── basic-service-template.md
    ├── dockerfile-template.md
    └── kubernetes-manifest-template.md
```

</examples>

<validation>
After using this skill to create a new skill, verify:

1. **Run the validation phase** - All checks should pass
2. **Test in-scope scenario** - Skill activates correctly
3. **Test out-of-scope scenario** - Skill doesn't activate inappropriately
4. **Check progressive disclosure** - SKILL.md is concise, details in references/
5. **Verify XML tags** - All required tags present, optional tags add value
6. **Read generated content** - Makes sense and is actionable

If any validation fails, edit the generated files to fix issues before committing.

</validation>

<anti_patterns>
Common mistakes when creating skills:

❌ **Vague objectives**
- Bad: "Help users work with files"
- Good: "Validate JSON configuration files against schemas"

❌ **Too many responsibilities**
- Bad: "Create, validate, deploy, and monitor microservices"
- Good: "Scaffold new microservice structure with consistent patterns"

❌ **Generic triggering scenarios**
- Bad: "When user needs help"
- Good: "When starting a new API endpoint, scaffold REST structure"

❌ **Missing success criteria**
- Bad: Having only implementation steps
- Good: Defining measurable outcomes (errors found, files created, time saved)

❌ **Putting everything in SKILL.md**
- Bad: 1000-line SKILL.md with all documentation
- Good: Concise SKILL.md (<500 lines) + detailed references/

❌ **Over-selecting optional tags**
- Bad: Selecting all optional tags for a simple skill
- Good: Only selecting tags that add genuine value

❌ **No templates when needed**
- Bad: Workflow skill with no example outputs
- Good: Including templates that users can customize

</anti_patterns>

## Additional Resources

See `references/skill-standards.md` for complete skill development standards.
See `references/xml-tags-reference.md` for all available XML tags.
