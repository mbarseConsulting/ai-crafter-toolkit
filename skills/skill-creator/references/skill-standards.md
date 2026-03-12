# Standards for Agent Skills

This document describes the complete standards for creating Agent Skills following best practices.

## Core Philosophy

Agent Skills are **modular, filesystem-based capabilities** that provide domain-specific expertise through **progressive disclosure**. They are organized prompts loaded on-demand.

### Key Principles

1. **Progressive Disclosure**: Basic information in SKILL.md, detailed content in references/
2. **Conciseness**: SKILL.md should be <500 lines
3. **Clarity**: Assume Claude's intelligence; only add context Claude lacks
4. **Actionability**: Every section should enable concrete action
5. **Modularity**: Skills are self-contained with clear boundaries

## Naming Conventions

Skills follow **verb-noun** naming pattern in **kebab-case**:

✅ Good examples:
- `create-api-endpoint`
- `validate-json`
- `manage-dependencies`
- `setup-authentication`

❌ Bad examples:
- `api` (no verb)
- `CreateEndpoint` (not kebab-case)
- `api_endpoint_creator` (underscores)
- `create-and-validate-api-endpoints` (too long, multiple verbs)

**Rules:**
- All lowercase
- Hyphens only (no underscores or spaces)
- Maximum 40 characters
- Verb-noun pattern (action + subject)

## Required Structure

Every skill MUST have:

```
.claude/skills/{skill-name}/
└── SKILL.md              # Main entry point
```

And MAY have:

```
.claude/skills/{skill-name}/
├── SKILL.md
├── references/           # Additional documentation
│   ├── topic-1.md
│   └── topic-2.md
└── templates/            # Reusable templates
    ├── example-1.md
    └── example-2.md
```

## SKILL.md Structure

### Required: YAML Frontmatter

```yaml
---
name: skill-name
description: "Brief description. Use when: (1) scenario, (2) scenario, (3) scenario"
---
```

**Rules:**
- `name`: Must match directory name
- `description`: Should include 2-3 triggering scenarios

### Required: XML Tags

Every SKILL.md MUST contain these three tags:

#### 1. `<objective>`

**Purpose**: What the skill does and why it's important

**Format**:
```xml
<objective>
Clear statement of what the skill accomplishes and its value proposition.
Should be 1-3 sentences maximum.
</objective>
```

**Example**:
```xml
<objective>
Validate JSON configuration files to ensure they are well-formed and match expected schemas, preventing runtime errors from malformed configs.
</objective>
```

#### 2. `<quick_start>`

**Purpose**: Immediate, actionable guidance to use the skill

**Format**:
```xml
<quick_start>
1. First actionable step
2. Second actionable step
3. Third actionable step
...
</quick_start>
```

**Rules:**
- Numbered list format
- 3-5 steps maximum
- Each step should be concrete and actionable
- Should enable someone to use the skill immediately

**Example**:
```xml
<quick_start>
1. Read the JSON file using Read tool
2. Parse JSON and check for syntax errors
3. Validate against schema if provided
4. Report validation results with specific error locations
</quick_start>
```

#### 3. `<success_criteria>`

**Purpose**: Indicators of successful completion

**Format**:
```xml
<success_criteria>
- Measurable criterion 1
- Measurable criterion 2
- Measurable criterion 3
...
</success_criteria>
```

**Rules:**
- Bulleted list format
- 3-5 criteria
- Each criterion should be measurable or verifiable
- Focus on outcomes, not process

**Example**:
```xml
<success_criteria>
- JSON parsing succeeds or fails with clear error messages
- Schema validation identifies all mismatches
- Error locations include line and column numbers
- Validation completes in <1 second for files up to 1MB
</success_criteria>
```

## Optional XML Tags

Add these tags conditionally based on skill complexity:

### `<context>`

**When to use**: Skill requires background information or domain knowledge

**Format**:
```xml
<context>
Background information that helps understand the skill's domain or purpose.
</context>
```

### `<workflow>`

**When to use**: Skill involves multi-step procedures

**Format**:
```xml
<workflow>
## Phase 1: Name

Step-by-step instructions...

## Phase 2: Name

More instructions...
</workflow>
```

**Rules:**
- Break into logical phases
- Use numbered steps within phases
- Include decision points if applicable

### `<examples>`

**When to use**: Concrete examples would clarify usage (multi-shot learning)

**Format**:
```xml
<examples>
## Example 1: Description

**Input:**
{Show input}

**Expected Output:**
{Show output}

**Explanation:**
{Why this works}

## Example 2: Description

...
</examples>
```

**Rules:**
- Show concrete input and output
- Include explanation of why it works
- 2-4 examples covering common cases

### `<anti_patterns>`

**When to use**: Common mistakes exist that users should avoid

**Format**:
```xml
<anti_patterns>
❌ **Pattern name**
- Bad: {Example of wrong approach}
- Good: {Example of correct approach}

❌ **Another pattern**
...
</anti_patterns>
```

### `<security_checklist>`

**When to use**: Skill involves security-sensitive operations

**Format**:
```xml
<security_checklist>
- [ ] Security check 1
- [ ] Security check 2
- [ ] Security check 3
</security_checklist>
```

### `<advanced_features>`

**When to use**: Skill has advanced capabilities beyond basic use

**Format**:
```xml
<advanced_features>
## Feature 1

Description and usage...

## Feature 2

Description and usage...
</advanced_features>
```

### `<validation>`

**When to use**: Output verification is important

**Format**:
```xml
<validation>
Methods to verify the skill's output:

1. Validation method 1
2. Validation method 2
3. Validation method 3
</validation>
```

## Progressive Disclosure Best Practices

**In SKILL.md (concise):**
- Required tags only
- Essential workflow steps
- Most common examples
- Link to references for details

**In references/ (detailed):**
- Complete API documentation
- All edge cases and variations
- Detailed troubleshooting
- Advanced techniques
- Long examples

**Example:**

SKILL.md:
```xml
<workflow>
1. Parse input file
2. Validate structure
3. Report errors

See `references/validation-rules.md` for complete validation logic.
</workflow>
```

references/validation-rules.md:
```markdown
# Validation Rules

## Rule 1: Structure Validation
{Detailed explanation...}

## Rule 2: Type Checking
{Detailed explanation...}

## Edge Cases
{All edge cases...}
```

## File Size Guidelines

- **SKILL.md**: <500 lines
- **Reference files**: No strict limit, but aim for <1000 lines per file
- **Templates**: Keep concise and commented

If SKILL.md exceeds 500 lines, move content to references/.

## Slash Command Wrappers

Create lightweight wrappers in `~/.claude/commands/{skill-name}.md` that delegate to the skill:

```markdown
Execute the {skill-name} skill to {brief description}.

Use the Skill tool to invoke: skill="{skill-name}"
```

**Keep expertise centralized** in SKILL.md, not duplicated in commands.

## Testing Skills

After creating a skill, test with:

1. **In-scope test**: Does it activate and perform correctly?
2. **Edge case test**: Does it handle variations appropriately?
3. **Out-of-scope test**: Does it refuse or ignore unrelated requests?

Document test scenarios in the skill or in `references/testing.md`.

## Common Pitfalls

1. ❌ **Everything in SKILL.md** → Use references/ for details
2. ❌ **Vague objectives** → Be specific about what the skill does
3. ❌ **No success criteria** → Define measurable outcomes
4. ❌ **Process instead of outcome in criteria** → Focus on results
5. ❌ **Too many optional tags** → Only use tags that add genuine value
6. ❌ **Generic triggering scenarios** → Be concrete and specific
7. ❌ **README files** → Not needed, SKILL.md is the entry point

## Version Control

- Commit skills to your repository
- Use meaningful commit messages
- Tag skill versions if they evolve significantly
- Document breaking changes in references/

## Skill Evolution

As you use and refine skills:

1. Start simple (required tags only)
2. Add optional tags as complexity warrants
3. Move growing content to references/
4. Create templates for common outputs
5. Document lessons learned in references/

The best skills are **iterated based on real usage**.
