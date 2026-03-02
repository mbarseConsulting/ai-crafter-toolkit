# Rules File Template

Standard format for all QA evaluation rules files.
One rules file = one coherent evaluation scope loaded by a skill.

---

## Location

```
.claude/skills/[skill-name]/
  references/
    [skill-name]-[category]-rules.md
```

Loaded on demand by SKILL.md based on scope conditions.

---

## File Structure

```markdown
# [Category] Rules — [Skill Name]

> Scope: [free label — micro, meso, macro, character, cast, assessment, etc.]
> Loaded when: [condition — e.g., "text < 3 pages", "character sheet provided", "always"]
> Evaluates: [what this file covers — one sentence]
> Does NOT evaluate: [what belongs to other rules files in this skill]
> Preferred output: [diagnostic / inline / assessment — or "any"]

---

## Finding Axes

> Produce findings in the output (table rows, inline notes, or key issues).
> Every axis MUST be passage-citable and direction-actionable.
> If you can't quote 10 words and write a 15-word direction → it's a verdict axis.

### [axis-name]

- **Detects**: [what the agent looks for — concrete, observable in the text]
- **Works**: [what success looks like — specific enough to cite as Strength]
- **Fails**: [what failure looks like — specific enough to quote and diagnose]
- **Fix pattern**: [TYPE of fix, not a specific fix]
- **Example**:
  > "[quoted text]"
  > → [issue diagnosis ≤15 words]
  > → [suggestion ≤15 words]

---

## Verdict Axes

> Produce verdict rows (diagnostic), grid rows (assessment), or summary notes (inline).
> Global assessments — evaluated after reading the full scope, not per passage.
> Every verdict MUST include a suggestion — direction of work, not just judgment.

### [axis-name]

- **Assesses**: [what global quality is being judged — one sentence]
- **Works**: [what success looks like at scale]
- **Fails**: [what failure looks like at scale]
- **States**: [the vocabulary for this axis — e.g., "deep / surface / absent",
  "credible / forced / missing", "fresh / stock / derivative"]
- **Suggestion pattern**: [TYPE of suggestion per state — e.g.,
  "if surface → deepen through specific scenes showing X",
  "if absent → establish through Y before Z"]
```

---

## Constraints

### Per File
- **3-7 axes total** (finding + verdict combined). Less = merge. More = split.
- **One coherent scope per file.**
- **Scope and load condition declared in header.**

### Finding Axes
- **Citation test.** Can you quote ≤10 words + write a ≤15-word direction? No → verdict.
- **Example mandatory.** No example = too abstract → demote to verdict or kill.
- **Fix pattern = type, not instance.**
- **One failure mode per axis.** Detects two unrelated things → split.

### Verdict Axes
- **Gut test.** Assessed after reading the whole scope, not at a specific passage? → verdict.
- **States vocabulary mandatory.** Each verdict axis defines its own scale/states.
- **Suggestion pattern mandatory.** Each state maps to a type of suggestion. Not just
  "fails" — "fails, and here's the kind of work needed to fix it."
- **Micro/meso scope**: max 2 verdict axes.
- **Macro/assessment scope**: verdict-dominated OK. Finding axes = illustrative.

### Agent Behavior Filter
- **If an axis describes how the agent should behave** (e.g., "don't censor",
  "don't moralize", "write fully") **it belongs in the agent persona file,
  not in a rules file.** Rules files define what to DETECT in the text,
  not how the agent should ACT.

### Naming
- **Axis names: kebab-case noun phrases.** Not verbs, not sentences.
- **Unique within a skill.** No collision across rules files.
- **File name: `[skill]-[category]-rules.md`.**
