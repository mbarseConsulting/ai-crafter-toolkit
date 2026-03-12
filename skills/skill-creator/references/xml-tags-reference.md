# XML Tags Reference

Complete reference for all XML tags used in Agent Skills.

## Required Tags

These three tags MUST be present in every SKILL.md file.

---

### `<objective>`

**Purpose**: Defines what the skill does and why it matters

**When to use**: Always (required)

**Format**:
```xml
<objective>
One to three sentences explaining the skill's purpose and value.
</objective>
```

**Guidelines**:
- Be specific about what the skill accomplishes
- Explain the value or problem it solves
- Keep it concise (1-3 sentences)
- Avoid vague terms like "help" or "improve"

**Good examples**:
```xml
<objective>
Validate JSON configuration files to ensure they are well-formed and match expected schemas, preventing runtime errors from malformed configs.
</objective>
```

```xml
<objective>
Scaffold new microservice structure following organizational patterns, ensuring consistency across services and reducing setup time from hours to minutes.
</objective>
```

**Bad examples**:
```xml
<objective>
Help with JSON stuff.
</objective>
<!-- Too vague, no value proposition -->
```

```xml
<objective>
This skill will parse JSON files and then validate them against schemas
and check for errors and report issues and suggest fixes and optimize
the JSON structure and provide recommendations for better JSON design...
</objective>
<!-- Too long, too many responsibilities -->
```

---

### `<quick_start>`

**Purpose**: Provides immediate, actionable steps to use the skill

**When to use**: Always (required)

**Format**:
```xml
<quick_start>
1. First step
2. Second step
3. Third step
</quick_start>
```

**Guidelines**:
- Use numbered list
- 3-5 steps maximum
- Each step must be actionable
- Focus on the happy path
- Enable immediate usage

**Good example**:
```xml
<quick_start>
1. Identify the JSON file to validate
2. Read the file using Read tool
3. Parse and validate against schema
4. Report validation results with line numbers for errors
</quick_start>
```

**Bad example**:
```xml
<quick_start>
First, you need to understand JSON schemas, then familiarize yourself
with the validation process...
</quick_start>
<!-- Not actionable, no numbered steps -->
```

---

### `<success_criteria>`

**Purpose**: Defines measurable indicators of successful completion

**When to use**: Always (required)

**Format**:
```xml
<success_criteria>
- Criterion 1
- Criterion 2
- Criterion 3
</success_criteria>
```

**Guidelines**:
- Use bulleted list
- 3-5 criteria
- Make criteria measurable or verifiable
- Focus on outcomes, not process
- Avoid vague terms

**Good example**:
```xml
<success_criteria>
- JSON parsing succeeds or fails with clear error messages
- All schema violations are identified with line numbers
- Validation completes in <1 second for files up to 1MB
- Exit code indicates pass/fail status
</success_criteria>
```

**Bad example**:
```xml
<success_criteria>
- JSON is validated properly
- Everything works correctly
- User is satisfied
</success_criteria>
<!-- Not measurable, too vague -->
```

---

## Optional Tags

Use these tags conditionally based on skill complexity and needs.

---

### `<context>`

**Purpose**: Provides background information or domain knowledge

**When to use**:
- Skill requires understanding of specific domain
- Prerequisites or assumptions need clarification
- Historical or architectural context helps

**When NOT to use**:
- Skill is self-explanatory
- Information duplicates the objective
- Content would be better in references/

**Format**:
```xml
<context>
Background information, prerequisites, or domain knowledge that helps
understand the skill's purpose and usage.
</context>
```

**Example**:
```xml
<context>
JSON Schema is a vocabulary for validating JSON documents. It describes
the structure, constraints, and data types. This skill validates JSON
files against JSON Schema Draft 7 specification.
</context>
```

---

### `<workflow>`

**Purpose**: Step-by-step procedures for complex processes

**When to use**:
- Skill involves multiple phases
- Process has decision points
- Order of operations is critical
- More detailed than quick_start

**When NOT to use**:
- Process is simple (use quick_start instead)
- Steps are obvious from the objective

**Format**:
```xml
<workflow>
## Phase 1: Name

Detailed steps for this phase...

## Phase 2: Name

Detailed steps for this phase...
</workflow>
```

**Example**:
```xml
<workflow>
## Phase 1: Discovery

1. Scan the codebase for JSON files
2. Identify schema files (*.schema.json)
3. Map JSON files to their schemas

## Phase 2: Validation

1. For each JSON file:
   - Load the file
   - Load corresponding schema
   - Validate structure
   - Collect errors

## Phase 3: Reporting

1. Group errors by file
2. Format with line numbers
3. Suggest fixes for common errors
</workflow>
```

---

### `<examples>`

**Purpose**: Multi-shot learning demonstrations with concrete input/output

**When to use**:
- Concrete examples clarify usage better than descriptions
- Multiple use cases exist
- Input/output format is complex
- Learning by example is valuable

**When NOT to use**:
- Skill is straightforward
- One example is sufficient (put in quick_start)

**Format**:
```xml
<examples>
## Example 1: Title

**Input:**
{Concrete input}

**Expected Output:**
{Concrete output}

**Explanation:**
{Why this works, key insights}

## Example 2: Title

...
</examples>
```

**Example**:
```xml
<examples>
## Example 1: Valid JSON with Schema

**Input:**
File: config.json
```json
{"port": 8080, "host": "localhost"}
```

Schema: config.schema.json
```json
{"type": "object", "required": ["port", "host"]}
```

**Expected Output:**
✅ config.json is valid

**Explanation:**
Both required fields are present and have correct types.

## Example 2: Invalid JSON - Missing Required Field

**Input:**
File: config.json
```json
{"host": "localhost"}
```

**Expected Output:**
❌ config.json:1:1 - Missing required field: port

**Explanation:**
Schema requires "port" field but it's absent.
</examples>
```

---

### `<anti_patterns>`

**Purpose**: Common mistakes and how to avoid them

**When to use**:
- Common errors exist that users repeatedly make
- Misuse of the skill could cause problems
- Similar but incorrect approaches exist

**When NOT to use**:
- Skill is simple with no common pitfalls
- Errors are obvious

**Format**:
```xml
<anti_patterns>
❌ **Pattern name**
- Bad: {Example of wrong approach}
- Good: {Example of correct approach}
- Why: {Explanation}

❌ **Another pattern**
...
</anti_patterns>
```

**Example**:
```xml
<anti_patterns>
❌ **Validating against wrong schema version**
- Bad: Using JSON Schema Draft 4 for files expecting Draft 7
- Good: Check schema $schema field and use correct validator
- Why: Different drafts have incompatible features

❌ **Ignoring validation errors**
- Bad: Proceeding with deployment if validation fails
- Good: Block deployment on validation errors
- Why: Invalid configs cause runtime failures

❌ **Not specifying schema location**
- Bad: Assuming schema is in same directory
- Good: Explicitly configure schema paths
- Why: Projects have different organization conventions
</anti_patterns>
```

---

### `<security_checklist>`

**Purpose**: Security best practices for sensitive operations

**When to use**:
- Skill handles credentials, secrets, or authentication
- Operations could expose vulnerabilities
- Security mistakes are common
- Compliance requirements exist

**When NOT to use**:
- Skill has no security implications
- General security practices (not skill-specific)

**Format**:
```xml
<security_checklist>
- [ ] Security check 1
- [ ] Security check 2
- [ ] Security check 3
</security_checklist>
```

**Example**:
```xml
<security_checklist>
- [ ] Secrets are not logged or displayed
- [ ] Schema files are from trusted sources
- [ ] File paths are validated (no path traversal)
- [ ] Large files are size-limited to prevent DoS
- [ ] Error messages don't expose sensitive data
</security_checklist>
```

---

### `<advanced_features>`

**Purpose**: Deep-dive content for power users

**When to use**:
- Skill has advanced capabilities beyond basic use
- Power users need more control
- Optimization techniques exist
- Progressive disclosure: basics in main content, advanced here

**When NOT to use**:
- Everything is basic usage
- Content should be in references/

**Format**:
```xml
<advanced_features>
## Feature 1

Description and usage...

## Feature 2

Description and usage...
</advanced_features>
```

**Example**:
```xml
<advanced_features>
## Custom Validators

Beyond standard JSON Schema, register custom validators:

```javascript
validators.register('creditCard', (value) => {
  return /^\d{16}$/.test(value)
})
```

## Performance Optimization

For large files (>10MB):
1. Stream parsing instead of loading entire file
2. Validate incrementally
3. Use --fast-fail flag to stop at first error

## Schema Composition

Combine multiple schemas with $ref:

```json
{
  "$ref": "./base.schema.json",
  "properties": {
    "customField": {"type": "string"}
  }
}
```
</advanced_features>
```

---

### `<validation>`

**Purpose**: Methods to verify the skill's output

**When to use**:
- Output verification is critical
- Multiple validation methods exist
- Users need to confirm correctness

**When NOT to use**:
- Success criteria already covers validation
- Output is obviously correct/incorrect

**Format**:
```xml
<validation>
How to verify the skill's output:

1. Validation method 1
2. Validation method 2
3. Validation method 3
</validation>
```

**Example**:
```xml
<validation>
Verify JSON validation results by:

1. **Exit codes**: 0 for valid, 1 for invalid, 2 for errors
2. **Error count**: Check number matches expected violations
3. **Line numbers**: Errors point to correct locations
4. **Cross-validation**: Use online JSON Schema validators
5. **Round-trip**: Fix errors and re-validate (should pass)
</validation>
```

---

## Tag Selection Guide

Use this decision tree to choose optional tags:

```
Is the skill complex?
├─ Yes: Consider <workflow>
└─ No: Skip workflow

Does it need examples?
├─ Yes: Use <examples>
└─ No: Skip examples

Are there common mistakes?
├─ Yes: Use <anti_patterns>
└─ No: Skip anti_patterns

Is security important?
├─ Yes: Use <security_checklist>
└─ No: Skip security

Are there advanced features?
├─ Yes: Use <advanced_features>
└─ No: Skip advanced

Is output verification critical?
├─ Yes: Use <validation>
└─ No: Skip validation

Does it need context/background?
├─ Yes: Use <context>
└─ No: Skip context
```

**Rule of thumb**: Start with required tags only. Add optional tags as complexity warrants.

---

## Common Combinations

### Simple Validation Skill
```
Required: objective, quick_start, success_criteria
Optional: examples, anti_patterns
```

### Complex Workflow Skill
```
Required: objective, quick_start, success_criteria
Optional: workflow, examples, validation
```

### Security-Critical Skill
```
Required: objective, quick_start, success_criteria
Optional: security_checklist, anti_patterns, validation
```

### Teaching/Tutorial Skill
```
Required: objective, quick_start, success_criteria
Optional: context, examples, anti_patterns, advanced_features
```

---

## XML Tag Best Practices

1. **Don't duplicate content** - If something is in required tags, don't repeat in optional tags
2. **Use progressive disclosure** - Basic info in required tags, details in optional tags, deep dives in references/
3. **Keep tags focused** - Each tag has one clear purpose
4. **Prefer references/** - For very long content, link to references/ instead
5. **Test tag necessity** - Remove optional tags that don't add value
6. **Order matters** - Present tags in logical order (context → workflow → examples → validation)

---

## Validation Checklist

When creating SKILL.md, verify:

✅ All required tags present (`<objective>`, `<quick_start>`, `<success_criteria>`)
✅ Required tags are non-empty
✅ Optional tags add genuine value
✅ No duplication between tags
✅ Content is concise (<500 lines total)
✅ Progressive disclosure: basics in SKILL.md, details in references/
✅ XML syntax is correct (opening and closing tags match)
