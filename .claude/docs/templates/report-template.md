# QA Report Template

Loaded by: any QA skill when producing structured output.
The skill says: you are the agent, you use the rules, you output in THIS format.

Rules files define WHAT to detect. This template defines HOW to present it.

**Core law: no diagnosis without suggestion.** Every point — finding, pattern,
verdict — comes with a concrete proposal. No naked criticism. Ever.

---

## Severity

| Emoji | Level      | Meaning                                     |
| ----- | ---------- | ------------------------------------------- |
| 🔴    | Blocking   | Must fix. Text is broken.                   |
| 🟡    | Major      | Should fix. Text is weakened.               |
| 🔵    | Suggestion | Could improve. Author decides.              |
| 🟢    | Strength   | Mechanism that works. Preserve and amplify. |

Default severity comes from the axis. Adjust per context:
a missing hook in a reflective interlude → 🔵, not 🟡.
A scene without tension at a critical plot point → 🔴, not default.

---

## Verdict Scale

| Verdict     | Meaning                                                           |
| ----------- | ----------------------------------------------------------------- |
| **Works**   | Achieves what it should. Say WHY.                                 |
| **Weakens** | Potential undermined. Say WHAT, WHERE, and HOW TO FIX.            |
| **Fails**   | Does not achieve. Say WHY, name the mechanism, PROPOSE DIRECTION. |

---

## Output Formats

The skill chooses the format based on user intent.
Each rules file may suggest a preferred format in its header.

### 1. Diagnostic

Full structured analysis. When the user asks for a complete evaluation.

```markdown
## [Skill Name] — Diagnostic

### Context

- **Text**: [length, type]
- **Refs provided**: [sheets, docs — or "none"]
- **Refs missing**: [what would help — or "complete"]
- **Scope**: [which rules files loaded]
- **Mode**: [if applicable]

### First Impression

[2-3 sentences. Gut reaction. Not a summary — the instinct.]

### Findings

| #   | Sev | Loc | Passage              | Axis      | Issue       | Direction   |
| --- | --- | --- | -------------------- | --------- | ----------- | ----------- |
| 1   | 🔴  | ¶3  | « quoted ≤10 words » | file:axis | [≤15 words] | [≤15 words] |

> Direction column is MANDATORY. No finding without a concrete suggestion.

### Patterns

| Pattern | Count | Examples                            | Sev | Direction                |
| ------- | ----- | ----------------------------------- | --- | ------------------------ |
| [name]  | N     | « ex1 » ¶2, « ex2 » ¶7, « ex3 » ¶14 | 🟡  | [systemic fix ≤15 words] |

> 3+ occurrences = pattern. Max 3 examples. One systemic direction.
> If none: skip section.

### Strengths

| Passage              | Axis   | Mechanism             | Effect         |
| -------------------- | ------ | --------------------- | -------------- |
| « quoted ≤10 words » | [axis] | [what the author did] | [why it works] |

> Never empty unless genuinely nothing works — in which case state that explicitly.

### Verdicts

| Scope        | Verdict                 | Justification        | Suggestion                  |
| ------------ | ----------------------- | -------------------- | --------------------------- |
| [rules file] | Works / Weakens / Fails | [why — one sentence] | [what to do — one sentence] |

> Every verdict gets a suggestion. Even Works: "maintain X" or "push Y further."

### Global Verdict

[1-2 sentences. The truth.]

### Priority Fixes

1. 🔴 #[N] — [highest impact action]

> Max 5. Impact order. Empty if no findings.
```

### 2. Inline

Passage-by-passage notes. When the user submits text and wants to improve it.
Like margin notes from an editor.

```markdown
## [Skill Name] — Inline

[For each issue, in text order:]

🔴|🟡|🔵 [axis — location]
« quoted passage »
What fails, why, what it should produce instead.
→ Concrete fix: what to change and how.

[For strengths worth noting:]

🟢 [axis — location]
« quoted passage »
What works and why — mechanism named.

[At the end, if patterns emerge:]

**Recurring**: [pattern name] — [count]x — [systemic direction]

### Verdict

[1-2 sentences. The truth.]
```

### 3. Assessment

Verdict + grid. When the user asks a question about quality.
"Is my character credible?" "Does this opening work?" "Is this original?"

```markdown
## [Skill Name] — Assessment

### Verdict

[Direct answer to the question. 2-3 sentences. Yes/no/partially + WHY.]

### Context

- **Refs provided**: [sheets, docs — or "none"]
- **Refs missing**: [what would help — or "complete"]

### Grid

| Axis   | State              | Note           | Suggestion     |
| ------ | ------------------ | -------------- | -------------- |
| [axis] | [state from rules] | [one sentence] | [one sentence] |

> States defined by each rules file.
> Suggestion column: always filled. Even for positive states.

### Key Issues

[If problems found. Passage-cited, with direction.]

### Strengths

[What works. Mechanism named.]

### Suggestions

[2-5 concrete, prioritized next steps tied to what was observed.]
```

---

## Format Selection

| User intent                                             | Format                                          |
| ------------------------------------------------------- | ----------------------------------------------- |
| "Diagnose / analyze / full QA on this text"             | Diagnostic                                      |
| "Review this / improve this / what's wrong here"        | Inline                                          |
| "Is this [quality]? / Does this work? / How is my [X]?" | Assessment                                      |
| Ambiguous                                               | Inline for short text, Diagnostic for long text |

---

## Rules (apply across all formats)

### Suggestion Law

**Every diagnostic point gets a suggestion. No exceptions.**

- Finding → Direction column
- Pattern → Direction column
- Verdict → Suggestion column
- Assessment grid → Suggestion column
- Inline → `→` line after every issue
- Even positive points get reinforcement

This is not optional. This is not agent personality. This is how the system works.

### Citation

1. No problem identified without a quoted passage. In any format.
2. Name the mechanism — not "doesn't work", WHY.
3. One direction per issue. Not options.

### Patterns

1. 3+ occurrences of same issue = pattern.
2. Max 3 representative examples.
3. One systemic direction.

### Cell Concision (diagnostic/assessment grids)

- **Passage**: max 10 quoted words.
- **Issue**: max 15 words.
- **Direction/Suggestion**: max 15 words.
- **Axis ref**: `[file]:[axis]` in diagnostic, `[axis]` in inline.

### Location Reference

Use whatever locates: `¶N`, `ch.N ¶N`, `l.N`, `"[first words]"`.

### Severity Adjustment

Default severity from the axis. Adjust per context:

- Reflective passage missing a hook → downgrade to 🔵.
- Critical plot point without tension → upgrade to 🔴.
- Context governs. The default is a starting point.

### Rewrite Protocol (on author request, any format)

1. Only flagged passages.
2. Preserve substance.
3. Implement the stated direction.
4. Show delta: original → rewrite.
5. Never add content unless asked.
