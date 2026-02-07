# Value Testing

Test whether an artifact provides measurable value beyond baseline Claude capabilities.

## A/B Comparative Testing (Skills & Agents)

Compare Sonnet's output **with** vs **without** the artifact's specialist knowledge.

### Step 1 — Generate Test Scenario

Based on the artifact's purpose, create a realistic task that the artifact is designed to help with. The scenario must be:

- Specific enough to evaluate (not "do something good")
- Representative of the artifact's core use case
- Completable in a single agent turn

Example for a "code-review" skill: "Review this Python function for security issues, performance, and readability: [realistic code snippet]"

### Step 2 — Build Prompts

Create two identical prompts that differ only in specialist knowledge:

**Control prompt (no artifact):**
```
You are a helpful assistant. Complete the following task.

## Task
{test_scenario}
```

**Treatment prompt (with artifact):**
```
You are a helpful assistant. Complete the following task.

## Specialist Knowledge
{full content of the artifact: SKILL.md + key references for skills, or the agent .md file}

## Task
{test_scenario}
```

### Step 3 — Run Parallel Agents

Launch two Task agents (subagent_type: general-purpose, model: sonnet) in parallel:

- **Control**: runs the control prompt
- **Treatment**: runs the treatment prompt

Both agents should produce their full output as text (no tool use needed).

### Step 4 — Present Results

Show both outputs side by side:

```
## A/B Test Results: {artifact_name}

### Scenario
{test_scenario}

### Control (Sonnet without artifact)
{control_output}

### Treatment (Sonnet with artifact)
{treatment_output}
```

### Step 5 — Score

Rate each output on 4 criteria (1-5 scale):

| Criterion | Description | Control | Treatment |
|-----------|-------------|---------|-----------|
| **Accuracy** | Correct information, no hallucinations | /5 | /5 |
| **Completeness** | Covers all aspects of the task | /5 | /5 |
| **Format Compliance** | Follows expected structure/conventions | /5 | /5 |
| **Focus** | Stays on task, no irrelevant content | /5 | /5 |
| **Total** | | /20 | /20 |

**Delta** = Treatment total - Control total

### Step 6 — Verdict

| Delta | Verdict | Meaning |
|-------|---------|---------|
| +4 or more | **SIGNIFICANT VALUE** | Artifact clearly improves output quality |
| +2 to +3 | **MODERATE VALUE** | Artifact helps but could be stronger |
| +1 | **MARGINAL VALUE** | Artifact barely improves output — consider reworking |
| 0 or less | **NO VALUE** | Artifact adds no measurable benefit — rethink purpose |

If MARGINAL or NO VALUE, suggest specific improvements to increase the artifact's impact.

---

## Functional Testing (Hooks)

Verify that hooks behave correctly by simulating their trigger events.

### Step 1 — Identify Hook Type

Determine the event type from the hook definition:

| Event | Expected Behavior |
|-------|-------------------|
| `PreToolUse` | Blocking hooks output `{"decision": "block", "reason": "..."}` or `{"decision": "approve"}`. Non-blocking hooks exit 0. |
| `PostToolUse` | Logging/side-effect hooks exit 0, produce expected output. |
| `Notification` | Notification hooks exit 0, trigger expected side effect. |
| `Stop` | Cleanup hooks exit 0. |

### Step 2 — Generate Test Inputs

Create simulated JSON inputs matching the event schema. Generate at least:

- 1 input that **should trigger** the hook's logic (positive case)
- 1 input that **should not trigger** it (negative case)
- 1 edge case (empty values, unusual tool names, etc.)

Example for a PreToolUse hook that blocks `rm` commands:
```json
// Positive (should block)
{"tool_name": "Bash", "tool_input": {"command": "rm -rf /tmp/test"}}

// Negative (should pass)
{"tool_name": "Bash", "tool_input": {"command": "ls -la"}}

// Edge case
{"tool_name": "Bash", "tool_input": {"command": "echo 'rm is not dangerous here'"}}
```

### Step 3 — Execute Tests

For each test input, pipe it through the hook command:

```bash
echo '{"tool_name": "Bash", "tool_input": {"command": "rm -rf /tmp/test"}}' | bash -c '{hook_command}'
```

Capture both stdout and exit code.

### Step 4 — Report

```
## Hook Test Results: {hook_name}
Event: {event_type} | Command: {hook_command}

| Test | Input Summary | Expected | Actual | Result |
|------|--------------|----------|--------|--------|
| Positive | rm -rf /tmp/test | block | block | PASS |
| Negative | ls -la | approve/silent | silent | PASS |
| Edge case | echo 'rm...' | approve/silent | block | FAIL |

Overall: {PASS_COUNT}/{TOTAL} passed
```

If any test FAILs, explain the discrepancy and suggest a fix for the hook logic.
