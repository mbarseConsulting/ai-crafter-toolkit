# Skill Validation Checklist

Use this checklist to validate a newly created skill before deployment.

## File Structure

### Required Files
- [ ] `.claude/skills/{skill-name}/SKILL.md` exists
- [ ] SKILL.md has valid YAML frontmatter
- [ ] Frontmatter includes `name` field matching directory name
- [ ] Frontmatter includes `description` field with triggering scenarios

### Optional Directories (if applicable)
- [ ] `references/` directory created if reference docs exist
- [ ] `templates/` directory created if templates exist
- [ ] No unnecessary files (README.md, .DS_Store, etc.)

## YAML Frontmatter

- [ ] Valid YAML syntax (no syntax errors)
- [ ] `name` field is kebab-case
- [ ] `name` field is ≤40 characters
- [ ] `name` field matches directory name exactly
- [ ] `description` field is present
- [ ] `description` includes 2-3 triggering scenarios
- [ ] Description format: "Brief. Use when: (1) X, (2) Y, (3) Z"

## Required XML Tags

### `<objective>`
- [ ] Tag is present
- [ ] Tag is not empty
- [ ] Content is 1-3 sentences
- [ ] Explains what the skill does
- [ ] Explains why it's important/valuable
- [ ] Avoids vague terms (help, improve, manage)
- [ ] Is specific and actionable

### `<quick_start>`
- [ ] Tag is present
- [ ] Tag is not empty
- [ ] Uses numbered list format
- [ ] Has 3-5 steps
- [ ] Each step is actionable
- [ ] Steps are in logical order
- [ ] Enables immediate usage

### `<success_criteria>`
- [ ] Tag is present
- [ ] Tag is not empty
- [ ] Uses bulleted list format
- [ ] Has 3-5 criteria
- [ ] Each criterion is measurable or verifiable
- [ ] Focuses on outcomes (not process)
- [ ] Avoids vague terms (works well, is good)

## Optional XML Tags (if used)

### `<context>` (if present)
- [ ] Provides necessary background information
- [ ] Doesn't duplicate the objective
- [ ] Is concise (not overly long)
- [ ] Adds value (not just filler)

### `<workflow>` (if present)
- [ ] Organized into logical phases
- [ ] Each phase has a clear name
- [ ] Steps are numbered
- [ ] Order of operations is clear
- [ ] Decision points are indicated
- [ ] More detailed than quick_start

### `<examples>` (if present)
- [ ] Includes 2-4 examples
- [ ] Each example has a descriptive title
- [ ] Shows concrete input
- [ ] Shows expected output
- [ ] Includes explanation of why it works
- [ ] Examples cover different scenarios
- [ ] Code examples are runnable/valid

### `<anti_patterns>` (if present)
- [ ] Uses ❌ emoji for each pattern
- [ ] Includes "Bad" example
- [ ] Includes "Good" example
- [ ] Explains "Why" it matters
- [ ] Covers common mistakes
- [ ] Has 3-5 patterns

### `<security_checklist>` (if present)
- [ ] Uses checkbox format (- [ ])
- [ ] Each item is actionable
- [ ] Covers relevant security concerns
- [ ] Appropriate for the skill's domain
- [ ] No generic items (specific to this skill)

### `<advanced_features>` (if present)
- [ ] Content is genuinely advanced
- [ ] Not duplicating basic usage
- [ ] Organized into sections
- [ ] Includes code examples
- [ ] Explains when/why to use advanced features

### `<validation>` (if present)
- [ ] Provides concrete validation methods
- [ ] Methods are actionable
- [ ] Doesn't duplicate success_criteria
- [ ] Covers how to verify output correctness

## Content Quality

### Writing Quality
- [ ] SKILL.md is <500 lines total
- [ ] Language is clear and concise
- [ ] No spelling errors
- [ ] No grammatical errors
- [ ] Consistent terminology throughout
- [ ] Active voice used (not passive)
- [ ] Technical terms are explained

### Progressive Disclosure
- [ ] Basics in SKILL.md
- [ ] Details in references/
- [ ] No duplication between SKILL.md and references/
- [ ] SKILL.md links to references/ when appropriate
- [ ] Each file has single, clear purpose

### Code Examples
- [ ] All code examples are syntactically correct
- [ ] Language is specified in code blocks
- [ ] Code is properly formatted
- [ ] Code is minimal (no unnecessary complexity)
- [ ] Code demonstrates the point clearly

## Structure & Organization

### Naming Conventions
- [ ] Skill name follows verb-noun pattern
- [ ] File names are lowercase with hyphens
- [ ] No underscores or spaces in names
- [ ] Consistent naming across files

### Tag Order
- [ ] Required tags come first
- [ ] Optional tags are in logical order
- [ ] Related tags are grouped together

### Content Organization
- [ ] Logical flow from simple to complex
- [ ] Related information is grouped
- [ ] Clear section headers
- [ ] Appropriate use of lists vs paragraphs

## Functional Validation

### Skill Activation
- [ ] Description clearly indicates when to use skill
- [ ] Triggering scenarios are specific
- [ ] Skill has clear boundaries (what it does/doesn't do)

### Usability
- [ ] Someone unfamiliar can use the skill
- [ ] No assumed knowledge (or clearly stated prerequisites)
- [ ] All tools/commands are explained
- [ ] Examples are complete (not partial)

### Completeness
- [ ] All necessary information is present
- [ ] No broken references or links
- [ ] Templates are complete and usable
- [ ] Reference docs cover mentioned topics

## Testing

### In-Scope Testing
- [ ] Test scenario 1: {describe scenario}
  - Expected: Skill activates correctly
  - Result: {pass/fail}

- [ ] Test scenario 2: {describe scenario}
  - Expected: Skill performs intended action
  - Result: {pass/fail}

- [ ] Test scenario 3: {describe scenario}
  - Expected: Output meets success criteria
  - Result: {pass/fail}

### Edge Case Testing
- [ ] Edge case 1: {describe edge case}
  - Expected: Skill handles appropriately
  - Result: {pass/fail}

- [ ] Edge case 2: {describe edge case}
  - Expected: Skill handles appropriately
  - Result: {pass/fail}

### Out-of-Scope Testing
- [ ] Out-of-scope scenario 1: {describe scenario}
  - Expected: Skill doesn't activate or refuses
  - Result: {pass/fail}

- [ ] Out-of-scope scenario 2: {describe scenario}
  - Expected: Skill doesn't activate or refuses
  - Result: {pass/fail}

## Final Checks

### Pre-Deployment
- [ ] All validation checks passed
- [ ] All tests passed
- [ ] Documentation is complete
- [ ] No TODO or placeholder content
- [ ] Files are committed to version control
- [ ] Skill is listed in available skills (if applicable)

### Post-Deployment
- [ ] Skill activates when expected
- [ ] Skill produces correct output
- [ ] Success criteria are met
- [ ] No errors or warnings
- [ ] Users can follow documentation successfully

---

## Validation Results

**Date:** {date}
**Skill:** {skill-name}
**Validator:** {name}

**Overall Status:** {PASS / NEEDS WORK / FAIL}

**Checks Passed:** {count} / {total}

**Issues Found:**
1. {Issue 1 description}
2. {Issue 2 description}
3. {Issue 3 description}

**Action Items:**
- [ ] {Action item 1}
- [ ] {Action item 2}
- [ ] {Action item 3}

**Notes:**
{Any additional notes or observations}

---

## Quick Validation (Essential Checks Only)

If time is limited, verify at minimum:

1. ✅ Required tags present (objective, quick_start, success_criteria)
2. ✅ SKILL.md <500 lines
3. ✅ Valid YAML frontmatter
4. ✅ At least one in-scope test passes
5. ✅ At least one out-of-scope test passes
6. ✅ No syntax errors in code examples
7. ✅ Documentation is understandable without explanation

If all 7 quick checks pass, skill is minimally viable. Full validation can be done later.
