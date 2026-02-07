# Hook Examples

## Structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolName",
        "hooks": [
          {
            "type": "command",
            "command": "shell command"
          }
        ]
      }
    ]
  }
}
```

## Events

| Event        | When             | Stdin                                  | Can Block |
| ------------ | ---------------- | -------------------------------------- | --------- |
| PreToolUse   | Before tool runs | `{tool_name, tool_input}`              | Yes       |
| PostToolUse  | After tool runs  | `{tool_name, tool_input, tool_result}` | No        |
| SessionStart | Session begins   | —                                      | No        |
| SessionEnd   | Session ends     | —                                      | No        |

## Blocking (PreToolUse only)

Output this JSON to block:

```json
{ "decision": "block", "reason": "Why it was blocked" }
```

Any other output (or no output) = allow.

## Common Hooks

### Bash Command Logger

```json
{
  "matcher": "Bash",
  "hooks": [
    {
      "type": "command",
      "command": "echo \"[$(date '+%Y-%m-%d %H:%M:%S')]\" >> ~/.claude/bash-log.txt && jq -r '.tool_input.command' >> ~/.claude/bash-log.txt"
    }
  ]
}
```

### Dangerous Command Blocker

```json
{
  "matcher": "Bash",
  "hooks": [
    {
      "type": "command",
      "command": "CMD=$(jq -r '.tool_input.command'); if echo \"$CMD\" | grep -E 'rm -rf|dd if=|mkfs|:(){ :|:& };:' > /dev/null; then echo '{\"decision\": \"block\", \"reason\": \"Dangerous command detected\"}'; fi"
    }
  ]
}
```

### Subagent Tagger

```json
{
  "matcher": "Task",
  "hooks": [
    {
      "type": "command",
      "command": "TYPE=$(jq -r '.tool_input.subagent_type // \"\"'); if [ -n \"$TYPE\" ]; then TAG=$(echo \"$TYPE\" | tr '-' ' ' | awk '{if(NF==1) printf toupper(substr($1,1,2)); else for(i=1;i<=NF;i++) printf toupper(substr($i,1,1))}'); DESC=$(jq -r '.tool_input.description // \"\"'); echo \"[$(date '+%H:%M:%S')] [$TAG] $TYPE: $DESC\" >> ~/.claude/subagent-debug.txt; echo \"[$TAG] $TYPE activated\" >&2; fi"
    }
  ]
}
```

### Session Logger

Place this in the `"SessionStart"` event array:

```json
{
  "hooks": [
    {
      "type": "command",
      "command": "echo \"[$(date '+%Y-%m-%d %H:%M:%S')] Session started\" >> ~/.claude/session-log.txt"
    }
  ]
}
```

## Merging Rules

1. Read existing hooks.json first
2. Parse JSON, find the target event array
3. Append new hook entry — never replace existing hooks
4. If same matcher+event exists, warn user before adding
5. Backup to `.hooks.json.backup` before full replacement
6. Create `.claude/` with `mkdir -p` if needed
