# Best practices for Kilo Assistant

This document provides a summary of best practices for using Kilo Assistant, with links to the official documentation for more detailed information.

## Using Modes

Modes in Kilo Code are specialized personas that tailor the assistant's behavior to your current task. Each mode offers different capabilities, expertise, and access levels to help you accomplish specific goals.

- **Code Mode:** For writing code, implementing features, debugging, and general development.
- **Ask Mode:** For code explanation, concept exploration, and technical learning.
- **Architect Mode:** For system design, high-level planning, and architecture discussions.
- **Debug Mode:** For tracking down bugs, diagnosing errors, and resolving complex issues.
- **Orchestrator Mode:** For breaking down complex projects into manageable subtasks.

For more details, see the [Using Modes documentation](https://kilocode.ai/docs/basic-usage/using-modes).

## Context Mentions

Context mentions are a powerful way to provide Kilo Code with specific information about your project. Use the `@` symbol to refer to files, folders, problems, and Git commits.

- **File:** `@/path/to/file.ts`
- **Folder:** `@/path/to/folder/`
- **Problems:** `@problems`
- **Terminal:** `@terminal`
- **Git Commit:** `@a1b2c3d`
- **Git Changes:** `@git-changes`
- **URL:** `@https://example.com`

For more details, see the [Context Mentions documentation](https://kilocode.ai/docs/basic-usage/context-mentions).

## Auto-Approving Actions

Auto-approve settings speed up your workflow by eliminating repetitive confirmation prompts, but they significantly increase security risks. Only enable auto-approval for actions you fully trust.

For more details, see the [Auto-Approving Actions documentation](https://kilocode.ai/docs/features/auto-approving-actions).

## How Tools Work

Kilo Code uses tools to interact with your code and environment. These specialized helpers perform specific actions like reading files, making edits, running commands, or searching your codebase.

For more details, see the [How Tools Work documentation](https://kilocode.ai/docs/basic-usage/how-tools-work).

## Enhance Prompt

The "Enhance Prompt" feature helps you improve the quality and effectiveness of your prompts before sending them to the AI model.

For more details, see the [Enhance Prompt documentation](https://kilocode.ai/docs/features/enhance-prompt).

## Prompt Engineering

Prompt engineering is the art of crafting effective instructions for AI models. Well-written prompts lead to better results, fewer errors, and a more efficient workflow.

For more details, see the [Prompt Engineering Tips documentation](https://kilocode.ai/docs/advanced-usage/prompt-engineering).

## Custom Rules

Custom rules provide a powerful way to define project-specific and global behaviors and constraints for the Kilo Code AI agent.

For more details, see the [Custom Rules documentation](https://kilocode.ai/docs/advanced-usage/custom-rules).

## Custom Instructions

Custom Instructions allow you to personalize how Kilo Code behaves, providing specific guidance that shapes responses, coding style, and decision-making processes.

For more details, see the [Custom Instructions documentation](https://kilocode.ai/docs/advanced-usage/custom-instructions).

## Memory Bank

Memory Bank is a system of structured documentation that enables Kilo Code to better understand your project and maintain context across coding sessions.

For more details, see the [Memory Bank documentation](https://kilocode.ai/docs/advanced-usage/memory-bank).

## Working with Large Projects

Large projects require some extra care to manage context effectively. Use specific file paths, break down tasks, and summarize large amounts of code.

For more details, see the [Working with Large Projects documentation](https://kilocode.ai/docs/advanced-usage/large-projects).

## Model Temperature

Temperature controls the randomness of AI model outputs. Adjusting this setting optimizes results for different tasks.

For more details, see the [Model Temperature documentation](https://kilocode.ai/docs/features/model-temperature).