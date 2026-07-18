---
slug: context-as-product
lang: en
date: '2026-07-18'
category: Workflow
title: "An Agent is not a chat box: make context part of the product"
summary: The real time Codex-style agents save is context switching. Give them goals, constraints, and verification up front.
readTime: 11
featured: true
tags:
  - Codex
  - Agent workflow
  - Task design
sources:
  - publisher: OpenAI
    title: Introducing Codex
    url: https://openai.com/index/introducing-codex/
    publishedAt: '2025-05-16'
visual:
  type: steps
  title: Four layers of context in a reliable Agent task
  items:
    - "Goal: the observable result that must be delivered"
    - "Boundaries: files, data, and actions that must stay untouched"
    - "Current state: materials, constraints, and known issues"
    - "Verification: how we will prove the task is done"
---

## Why this matters now

When an Agent only answers questions, prompt cleverness can hide missing information. Once it can read a repository, call tools, edit files, and run commands, the outcome depends less on a magical instruction and more on whether the Agent has enough context to make a decision without inventing the missing parts.

Many first tasks written for Codex or another coding Agent look like this: “Make this page better.” A human teammate would need more information too. Which page? Which behavior must not change? Does “better” mean visual similarity, a passing build, or a smaller number of user steps? An Agent is not necessarily failing when it asks these questions. It is exposing the work that was previously left implicit.

The same pattern applies to research, operations, writing, and planning. Background, goals, constraints, examples, and acceptance criteria are all context. Context is not a long message pasted into a chat box. It is the small set of working materials that lets a collaborator make a defensible choice.

## The core idea: treat context like a product interface

A reusable Agent task should look like a small product interface with explicit inputs and outputs. The input is not “everything we know.” It is the facts that can change the decision. The output is not merely “done”; it is an artifact someone else can inspect.

In our editorial workflow, we compress a task into four questions: What is the goal? What is out of bounds? What exists already? How will we prove completion? These questions are easier for both a human and an Agent to reuse than a long paragraph of background.

## A real scenario: turn “change the page” into an executable task

Imagine adding invoice guidance to a subscription page. A weak instruction says: “Add invoice information below the plans and make it look good.” A stronger task adds four lines:

- Goal: add an invoice note below the pricing cards without horizontal scroll on mobile.
- Boundaries: do not change prices, registration links, or the existing support modal.
- Current state: the entry point is `src/views/SubscriptionView.vue`; shared colors and buttons live in `src/style.css`.
- Verification: run `vue-tsc -b` and `npm run build`, then inspect a 390px viewport.

The second version is only slightly longer, but it removes a large amount of guessing. The Agent can read the files, propose a narrow plan, make a minimal change, and report which checks passed and which assumptions remain.

## A practical workflow: four passes with an Agent

### Start with the definition of done

Describe what should be observable at the end before describing the actions. “A new route exists,” “search leaves only matching articles,” and “the build emits four article pages” are useful criteria. “Make the experience better” is not. If the result cannot be measured yet, name the check that will make it observable.

### Read first, edit second

Make the first pass read the relevant routes, components, styles, and tests without changing files. Then ask the Agent to summarize what it found, what it plans to change, and what it will leave alone. This exposes wrong assumptions before they become a large diff.

### Use small changes as checkpoints

Split a larger task into data, routing, page structure, styling, and verification. Each step should leave a runnable or inspectable state. If the direction changes, you can correct one step instead of explaining an entire mixed worktree.

### Make verification part of delivery

Ask the Agent to report the commands it ran, what they proved, and what remains unverified. For a front-end task, a successful build is only the floor. Navigation, mobile layout, keyboard focus, and empty states should be checked in a real browser.

## A prompt you can reuse

```text
Read the relevant routes, components, styles, and tests before editing.

Goal:
- [the observable result]

Out of scope:
- [behaviors, interfaces, or pages that must not change]

Current context:
- Entry files: [paths]
- Existing patterns: [components, styles, data sources]
- Constraints: [compatibility, responsive, performance, content]

Definition of done:
1. [observable result]
2. [verification command]
3. [browser or mobile check]

First report a plan and risks. Work in small steps and report verification after each step.
```

## Common failures and fixes

The first failure is context without hierarchy. Pasting the whole project description, old chat history, and every reference link can bury the constraint that matters. Keep stable rules in project documentation and put temporary background in the current task card.

The second failure is checking only a final screenshot. A screenshot does not prove a route refresh, build output, keyboard interaction, or error state. Put those checks in the definition of done so the Agent treats them as deliverables.

The third failure is asking the Agent to keep guessing when the evidence is missing. A reliable workflow lets it pause, ask a question, or record an assumption. Visible uncertainty is safer than a polished result built on hidden guesses.

## Try this today

1. Rewrite one task using goal, boundaries, current state, and verification.
2. Ask the Agent to read and restate its plan before editing.
3. Split the task into two independently verifiable steps.
4. Save the final check and result back into the task card.

## Sources and further reading

This article distills OpenAI's public Codex announcement and practical Agent workflows. It is an editorial synthesis and does not represent the source author's position. Check the original source for the latest product details.
