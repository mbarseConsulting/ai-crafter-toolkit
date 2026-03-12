---
name: creator
description: Use when creating new skills or agents from scratch. Applies when user wants to build new capabilities, automate workflows, or package reusable tools. Triggers include requests like "create a skill for X", "build an agent that does Y", or "I need to automate Z".
---

# Creator

Automate the complete creation workflow for skills and agents with interactive guidance.

## What to Create

**Agent** - For focused, single-task execution (e.g., import-cleaner, json-validator)
**Skill** - For reusable workflows, knowledge, or tools (e.g., pdf-processing, brand-guidelines)

Ask the user: "What do you want to create: agent or skill?"

## Workflow

### 1. Brainstorming

**CRITICAL FIRST STEP:** Before proceeding with creation, you MUST invoke the brainstorming skill using the Skill tool:

```
Use the Skill tool with skill="brainstorming" to explore user intent and requirements
```

The brainstorming skill will guide you through understanding:
- User's goals and constraints
- Concrete use cases and examples
- Scope and boundaries of what needs to be created

**After brainstorming completes**, proceed with the specific questions below:

**For agents:**
- "What is the ONE task this agent should do?" (≤15 words, no "and"/"or")
- "What tools are absolutely necessary?" (Challenge Bash/Glob/Grep/WebFetch)
- Validate: no conjunctions, no vague terms (optimize, improve, help)

**For skills:**
- "What concrete examples would trigger this skill?"
- "What reusable resources are needed?" (scripts, references, assets)
- "What workflows should it automate?"

### 2. Naming

**For agents:**
- Suggest kebab-case name from mission (e.g., "Remove imports" → "import-remover")
- Validate: lowercase, hyphens only, ≤40 chars

**For skills:**
- Suggest based on domain (e.g., "PDF processing" → "pdf-processor")
- Validate: kebab-case, descriptive

### 3. Creation

**For agents:**

**IMPORTANT:** Read the `subagent-creator` skill for agent-specific principles and template before creating the file.

Create `.claude/agents/{name}.md` with:
```yaml
---
name: agent-name
description: "Use when [context]. Examples: (1) [ex], (2) [ex]"
tools: [Read, Write, Edit]
model: sonnet
color: blue
---

You are [ROLE] focused on [TASK].

Your mission is to [SINGLE CLEAR ACTION].

## Your Process

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Output Format

[Specify format]

## Important Guidelines

- [Key rule 1]
- [Key rule 2]
```

**For skills:**
Create `.claude/skills/{name}/SKILL.md` with:
```yaml
---
name: skill-name
description: "What it does. Use when: (1) [trigger], (2) [trigger]"
---

# Skill Name

[Concise instructions using workflow/task/reference pattern]
```

### 4. Verification

**For agents:**
Check:
- [ ] Mission ≤15 words, no conjunctions
- [ ] Tools justified (no Glob/Grep unless exceptional)
- [ ] Clear 3-5 step process
- [ ] Specific output format
- [ ] No project exploration instructions

**For skills:**
Check:
- [ ] Description includes triggering scenarios
- [ ] SKILL.md body <500 lines
- [ ] Resources properly organized (scripts/references/assets)
- [ ] No extraneous files (README, etc.)

### 5. Testing

**For agents:**
Guide manual testing:
- In-scope test: Does it execute mission correctly?
- Out-of-scope test: Does it refuse/ignore unrelated requests?
- Tool usage: Only uses necessary tools?

**For skills:**
- Test with example scenarios from brainstorming
- Verify resources load correctly
- Check progressive disclosure works

## Implementation

Use direct file creation (Write tool) - no external scripts needed.

Follow the pattern:
1. Ask questions → gather info
2. Generate content → create files
3. Verify → check compliance
4. Guide testing → provide scenarios

## Example Session

```
User: "Create an agent"

Claude: [Invokes Skill tool with skill="brainstorming"]
[Brainstorming session explores user needs, use cases, constraints]

Claude: "Based on our brainstorming, what is the ONE task this agent should do?"

User: "Remove unused Python imports"

Claude: "What tools are necessary?"

User: "Read, Edit"

Claude:
💡 Suggested name: import-remover
[Proceed to create .claude/agents/import-remover.md]

✅ Agent created: /path/to/import-remover.md

Verification:
✅ Mission: 4 words, specific
✅ Tools: justified
✅ Process: clear 5 steps

Test with: "Clean imports in src/main.py"
```

## Key Principles

- **One mission**: Agents do ONE thing well
- **Minimal tools**: Challenge every tool
- **No exploration**: Work on explicit input
- **Progressive disclosure**: Skills load content as needed
- **Token efficiency**: Concise over verbose
