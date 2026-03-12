---
name: create-meta-prompts
description: "Create prompts optimized for Claude-to-Claude communication in multi-stage workflows. Use when: (1) building research/plan/implement workflows, (2) creating reusable prompt templates, (3) optimizing agent communication"
---

# Create Meta-Prompts

Automate creation of prompts optimized for Claude-to-Claude communication in multi-stage workflows.

## Four Prompt Purposes

| Purpose | Keywords | Use For |
|---------|----------|---------|
| **Research** | research, understand, learn, gather, analyze | Information gathering and context building |
| **Plan** | plan, roadmap, approach, strategy, decide | Implementation strategies and architectures |
| **Do** | implement, build, create, fix, add, refactor | Execution and artifact production |
| **Refine** | refine, improve, deepen, expand, iterate | Improvement of existing outputs |

## Workflow

### 1. Intake

**Initial questions:**
1. "What do you want to create a prompt for?"
2. Auto-detect purpose from keywords (see table above)
3. If ambiguous: "Is this for research, planning, implementation, or refinement?"

**Purpose-specific questions:**

**Research prompts:**
- What specific questions need answering?
- What sources or context should be explored?
- What's the intended use of this research?

**Plan prompts:**
- What needs to be planned?
- Are there constraints or requirements?
- What level of detail is needed?

**Do prompts:**
- What artifact should be produced?
- What are the acceptance criteria?
- Are there dependencies on other work?

**Refine prompts:**
- What existing output needs refinement?
- What aspects need improvement?
- What's the success criteria?

### 2. Chain Detection

**Scan for existing context:**
1. Use Glob to check `.prompts/` for completed work
2. Use Glob to check `docs/` for design documents
3. Use Bash to check recent git commits
4. Use Glob to check `works/` for ongoing work

**Smart referencing:**
- Plan prompts → Reference research outputs
- Do prompts → Reference plan outputs
- Refine prompts → Reference the output being refined

**User confirmation:**
If dependencies found: "I found [file]. Should this prompt reference it?"
- Yes → Include `@[file]` reference
- No → Generate standalone
- Show me → Use Read to display file

**Detect execution mode:**
- **Single**: One prompt, no dependencies
- **Sequential**: Multiple prompts with dependencies
- **Parallel**: Multiple independent prompts
- **Mixed**: Complex dependency graph

### 3. Generate

**Use purpose-specific templates:**

Load the appropriate reference file:
- Research → Read `references/research-patterns.md`
- Plan → Read `references/plan-patterns.md`
- Do → Read `references/do-patterns.md`
- Refine → Read `references/refine-patterns.md`

**Generate prompt with structure:**
```markdown
# [Task Title]

## Context
[Background and purpose]

## Task
[Clear directive of what to produce]

## Output Requirements
[Expected format and structure]

## Dependencies
[@referenced-files if any]

## Success Criteria
[How to know when done]
```

### 4. Organize

**Choose folder structure based on complexity:**

**Simple (1-2 prompts):**
```
.prompts/
└── task-name.md
```

**Complex (3+ prompts or sequential dependencies):**
```
.prompts/
├── 001-topic-research/
│   └── topic-research.md
├── 002-topic-plan/
│   └── topic-plan.md
└── 003-topic-implement/
    └── topic-implement.md
```

**Naming conventions:**
- Folders: `{number}-{topic}-{purpose}/`
- Prompts: `{topic}-{purpose}.md`
- Outputs: Same name as prompt file
- Summaries: `SUMMARY.md`

Use Write to create all prompt files.

### 5. Execute (Optional)

**Ask user:**
"What would you like to do?"
- A) Just create - Save prompts and exit
- B) Create and show decision tree - Display execution plan
- C) Create and execute - Run prompts automatically
- D) Full workflow - Execute, validate, and generate summaries

**For options B/C/D, present execution plan:**
```
Execution Plan:
├─ 001-auth-research.md (Research)
├─ 002-auth-plan.md (Plan) [depends on: 001]
└─ 003-auth-implement.md (Do) [depends on: 002]

Mode: Sequential (stop on failure)
```

**Execution behavior:**
- **Sequential**: Run in order with Bash, stop on failure
- **Parallel**: Launch all with Task tool simultaneously
- **Mixed**: Execute layer by layer

### 6. Validate (Optional)

**For executed prompts (minimal validation):**
- Use Bash to check output file exists
- Use Bash to check file size (>0 bytes)
- Warn if empty or very short (<100 chars)

**For full workflow option, generate summary:**

Use Read `references/summary-template.md` and create `SUMMARY.md` with:
- One-liner: What was accomplished
- Key findings/outputs
- Files created (Do prompts only)
- Next steps

## Key Principles

- **Adapt to purpose**: Use purpose-specific questions and templates
- **Detect context**: Scan workspace for existing work to reference
- **Smart organization**: Simple flat structure vs numbered folders based on complexity
- **Flexible execution**: User chooses creation-only vs full workflow
- **Minimal validation**: Just check files exist, warn on issues
- **Template-driven**: Use proven patterns for consistency

## Example Session

```
User: "Create a prompt for researching authentication options"

Claude: "I'll create a research prompt for you. What specific questions about authentication need answering?"

User: "Compare OAuth vs JWT vs session-based auth for our use case"

Claude: "What sources or context should be explored?"

User: "Our docs and common practices"

Claude: "What's the intended use of this research?"

User: "To help plan our auth implementation"

[Scans workspace, finds no existing research]

Claude:
✅ Created: .prompts/auth-research.md

What would you like to do?
A) Just create
B) Create and show decision tree
C) Create and execute
D) Full workflow

User: "C"

Claude: [Executes prompt using Bash]
✅ Output: .prompts/auth-research.md (1,234 bytes)

Done! The research output is ready at .prompts/auth-research.md
```
