---
name: hook-creator
description: "Creates standard hooks for common automation. Use when: (1) user asks to create/add a hook, (2) user mentions bash logging, command blocking, or session notifications, (3) user wants to automate tool behavior"
---

# Hook Creator

Create standard hooks for common automation needs without manual JSON editing.

## Available Standard Hooks

1. **Bash Command Logger** - Logs all bash commands with timestamps to `~/.claude/bash-log.txt`
2. **Dangerous Command Blocker** - Blocks destructive commands (rm -rf, dd, mkfs, fork bombs)
3. **Session Notifications** - Logs session start/end timestamps to `~/.claude/session-log.txt`

## Workflow

### 1. Present Options

Show the user the 3 standard hooks:

```
Available standard hooks:

1. Bash Command Logger - Logs all bash commands to a file
2. Dangerous Command Blocker - Prevents destructive commands (rm -rf, dd, etc.)
3. Session Notifications - Logs session start/end timestamps

Which hook would you like to create? (1-3)
```

### 2. Choose Location

Use AskUserQuestion to ask:

```
Where should this hook be saved?

- Project level (.claude/hooks.json) - Only for this project
- Global level (~/.claude/hooks.json) - All Claude Code sessions
```

### 3. Handle Existing Configuration

If the target file exists:
- Read it with the Read tool
- Parse the JSON to understand existing hooks
- Use AskUserQuestion: "Found existing hooks.json with [X] hooks. Merge with existing or replace entire file?"
- If "merge": Add new hook to the appropriate event array, preserving existing hooks
- If "replace": Use Bash to backup to `.hooks.json.backup`, then write new config

### 4. Create Hook

Based on user's selection, use the appropriate configuration:

**Bash Command Logger:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date '+%Y-%m-%d %H:%M:%S')]\" >> ~/.claude/bash-log.txt && jq -r '.tool_input.command' >> ~/.claude/bash-log.txt"
          }
        ]
      }
    ]
  }
}
```

**Dangerous Command Blocker:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "CMD=$(jq -r '.tool_input.command'); if echo \"$CMD\" | grep -E 'rm -rf|dd if=|mkfs|:(){ :|:& };:' > /dev/null; then echo '{\"decision\": \"block\", \"reason\": \"Dangerous command detected\"}'; fi"
          }
        ]
      }
    ]
  }
}
```

**Session Notifications:**
```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date '+%Y-%m-%d %H:%M:%S')] Session started\" >> ~/.claude/session-log.txt"
          }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date '+%Y-%m-%d %H:%M:%S')] Session ended\" >> ~/.claude/session-log.txt"
          }
        ]
      }
    ]
  }
}
```

**Merging Logic:**
- If merging, read existing JSON and append to the appropriate event array (PreToolUse, SessionStart, SessionEnd)
- Ensure proper JSON structure is maintained
- Handle case where event doesn't exist yet in the file

**File Creation:**
- For project-level: Create `.claude/` directory if needed with Bash
- Use Write tool to create/replace the hooks.json file
- Use proper JSON formatting

### 5. Confirm Success

Display confirmation:

```
✅ Hook created successfully

File: [full path]
Hook: [hook name]
[Brief description]

Test with: claude --debug
```

## Edge Cases

- **Directory missing**: Create `.claude/` with `mkdir -p .claude` before writing
- **Invalid JSON**: Catch parse errors, offer to backup and replace
- **Merge conflict**: If same matcher+event exists, warn user
- **Permission errors**: Display helpful error message
- **Missing jq**: Note that some hooks require `jq` to be installed

## Tools to Use

- **AskUserQuestion**: For location choice and merge/replace decisions
- **Read**: Check existing hooks.json
- **Write**: Create/update hooks.json
- **Bash**: Create directories, backup files

## Important

- Always preserve user's existing hooks when merging
- Use proper JSON escaping and formatting
- Provide clear file paths in confirmation
- Don't assume jq is installed - hooks may fail if not
