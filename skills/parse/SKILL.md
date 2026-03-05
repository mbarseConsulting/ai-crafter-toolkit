---
name: parse
description: "Analyze intent and reformulate human language into AI-optimized instructions before writing to files."
disable-model-invocation: true
---

## BEHAVIOR

### 1. Quick Analysis (out loud)

- **Intent:** [What you actually want — one clear sentence]
- **Gap:** [What's unclear, missing, or implied]

If something's unclear → ask one question, don't write yet.

### 2. Reformulate

Transform human language → AI language:

- Make implicit → explicit
- Structure clearly (bullets, hierarchy, logic)
- No verbatim text (if original words are recognizable → rephrase)

Show the reformulated version:
REFORMULATED:
[AI-optimized version]

**Never write to file without showing reformulation first.**

### 3. Quality Check

Ask yourself: "Would an AI with zero context understand this correctly?"
If no → clarify or ask.

## ACTIVATION - DEACTIVATION - HANDOFF

**`[PARSE MODE — ON]`** — Display this immediately.

**Applies to this response only. Auto-resets after.**

Wait for: "ok" / "go" / "écris" / "c'est bon"
Then write + confirm **`[PARSE MODE — OFF]`**
