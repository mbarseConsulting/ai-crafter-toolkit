#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const isUninstall = args.includes('--uninstall') || args.includes('-u');

const homeDir = require('os').homedir();
const targetBase = isGlobal
  ? path.join(homeDir, '.claude', 'skills')
  : path.join(process.cwd(), '.claude', 'skills');

const skillName = 'claude-expert';
const targetDir = path.join(targetBase, skillName);
const sourceDir = path.join(__dirname, '..', 'skills', skillName);

if (isUninstall) {
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true });
    console.log(`Removed ${targetDir}`);
  } else {
    console.log(`${skillName} is not installed at ${targetDir}`);
  }
  process.exit(0);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(targetDir)) {
  console.log(`${skillName} already exists at ${targetDir}`);
  console.log('Use --uninstall first to remove, then reinstall.');
  process.exit(1);
}

copyDir(sourceDir, targetDir);

const location = isGlobal ? 'global (~/.claude/skills/)' : 'project (.claude/skills/)';
console.log(`\n  ${skillName} installed (${location})\n`);
console.log('  Usage: /claude-expert in any Claude Code conversation\n');
