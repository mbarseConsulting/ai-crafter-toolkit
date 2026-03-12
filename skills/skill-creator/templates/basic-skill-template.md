---
name: {skill-name}
description: "{brief-description}. Use when: (1) {scenario-1}, (2) {scenario-2}, (3) {scenario-3}"
---

<objective>
{What this skill does and why it's important. 1-3 sentences explaining the purpose and value.}
</objective>

<quick_start>
1. {First actionable step}
2. {Second actionable step}
3. {Third actionable step}
{Optional: 4-5 steps if needed}
</quick_start>

<success_criteria>
- {Measurable criterion 1}
- {Measurable criterion 2}
- {Measurable criterion 3}
{Optional: Additional criteria}
</success_criteria>

{OPTIONAL TAGS BELOW - Include only if they add value}

<context>
{Background information or domain knowledge needed to understand this skill.
Only include if the skill requires specific context that isn't obvious.}
</context>

<workflow>
## Phase 1: {Phase Name}

{Detailed steps for this phase...}

1. {Step 1}
2. {Step 2}
3. {Step 3}

## Phase 2: {Phase Name}

{More detailed steps...}

{Continue with additional phases as needed}
</workflow>

<examples>
## Example 1: {Example Title}

**Input:**
{Concrete input example}

**Expected Output:**
{Concrete output example}

**Explanation:**
{Why this works, key insights}

## Example 2: {Example Title}

{Another example following the same format}

{Add 2-4 examples covering different scenarios}
</examples>

<anti_patterns>
❌ **{Pattern Name}**
- Bad: {Example of wrong approach}
- Good: {Example of correct approach}
- Why: {Explanation of why it matters}

❌ **{Another Pattern}**
- Bad: {Wrong way}
- Good: {Right way}
- Why: {Explanation}

{Include 3-5 common mistakes}
</anti_patterns>

<security_checklist>
- [ ] {Security check 1}
- [ ] {Security check 2}
- [ ] {Security check 3}
{Add all relevant security checks - only use this tag if skill handles sensitive operations}
</security_checklist>

<advanced_features>
## {Feature 1 Name}

{Description and usage of advanced feature}

```{language}
{Code example if applicable}
```

## {Feature 2 Name}

{More advanced content}

{Include 2-4 advanced features for power users}
</advanced_features>

<validation>
After using this skill, verify:

1. {Validation method 1}
2. {Validation method 2}
3. {Validation method 3}

{Include methods to verify the skill's output is correct}
</validation>

{END OF TEMPLATE}

---

## Template Usage Notes

**Required sections:**
- YAML frontmatter (name, description with scenarios)
- `<objective>`
- `<quick_start>`
- `<success_criteria>`

**Optional sections (remove if not needed):**
- `<context>` - Only if background knowledge is required
- `<workflow>` - Only for multi-phase processes
- `<examples>` - Highly recommended for clarity
- `<anti_patterns>` - If common mistakes exist
- `<security_checklist>` - Only for security-sensitive skills
- `<advanced_features>` - Only if power user features exist
- `<validation>` - If output verification is important

**Guidelines:**
1. Replace all `{placeholders}` with actual content
2. Remove optional tags that don't add value
3. Keep SKILL.md under 500 lines
4. Use progressive disclosure: basics here, details in references/
5. Make all content actionable and specific
6. Avoid vague terms like "help," "improve," "manage"
7. Focus on concrete outcomes and measurable results

**Quality checklist:**
- [ ] Objective is specific (not vague)
- [ ] Quick start has 3-5 actionable steps
- [ ] Success criteria are measurable
- [ ] Examples show concrete input/output
- [ ] No duplication between tags
- [ ] Total length <500 lines
- [ ] No unnecessary optional tags
