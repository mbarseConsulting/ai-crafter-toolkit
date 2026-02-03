---
name: pdf-report-generator
description: Use when generating structured PDF reports with user review. Multi-step workflow with state persistence and interactive decisions between phases.
stepsCompleted: []
currentStep: "step-00-init"
state:
  reportTopic: ""
  targetAudience: ""
  outline: []
  sections: []
  autoMode: false
---

# PDF Report Generator

Generate structured PDF reports through an interactive multi-step workflow with user review between phases.

## Workflow Overview

This skill demonstrates a complete workflow pattern with:
- Progressive step loading (micro-file design)
- State persistence across steps
- Interactive user decisions between phases
- Clear success/failure handling

## Steps

1. **Initialization** (step-00-init) - Gather requirements and preferences
2. **Outline Creation** (step-01-outline) - Create report structure, get user approval
3. **Content Generation** (step-02-generation) - Generate section content
4. **Finalization** (step-03-finalization) - Format and export PDF

## Getting Started

<critical>
Load step-00-init.md to begin. Never load multiple steps simultaneously.
</critical>

Load: references/example-workflow/steps/step-00-init.md
