---
slug: agent-memory
lang: en
date: '2026-07-16'
category: Method
title: "More memory is not always better: leave your Agent a short card"
summary: A compact, stable project brief is often more useful than a pile of old chat history.
readTime: 10
tags:
  - Agent memory
  - Project docs
  - Team workflow
sources:
  - publisher: GitHub
    title: GitHub Copilot resources
    url: https://github.blog/ai-and-ml/github-copilot/
    publishedAt: '2025-01-01'
visual:
  type: comparison
  title: Long history versus a short project card
  items:
    - "Long history: lots of information, unclear which rules still apply"
    - "Short card: only constraints that change the next decision"
    - "Best practice: rules in the card, temporary context in the task, facts in the source of truth"
---

## Why this matters now

“Make the Agent remember the project” can sound like a request to feed it every chat, meeting note, and historical decision. In practice, more memory is not automatically better. Old rules, superseded plans, and conflicting preferences make it harder to decide which information should win.

A useful project memory behaves like a shift handover at the office door: short, stable, and updated when the workflow changes. It does not retell history. It tells the next collaborator what must not be forgotten, where to start checking, and where to look when something breaks.

## The core idea: memory should serve the next decision

Ask one question before adding a line to an Agent card: “Without this line, would the next decision be different?” If not, keep it in the archive rather than loading it into every task.

Short cards are good at four things: directory and naming conventions, test and release entry points, non-negotiable boundaries, and verified recurring traps. Temporary requirements, customer preferences, and this task's goal belong in the task card. Final facts belong in code, data, or the formal document.

## A real scenario: compress project orientation into one page

A front-end project may have dozens of views, several scripts, and a component history that is only partly consistent. New contributors often copy a long conversation into the next task. The Agent reads a lot, but still does not know which command to run first.

A better short card might contain:

- Entry: the app starts at `src/main.ts`; routes live in `src/router/index.ts`.
- Style: prefer the tokens and `.btn` classes in `src/style.css`; do not invent close colors.
- Verification: run `vue-tsc -b` and `npm run build` before delivery.
- Boundaries: do not change plan prices, login URLs, or public API behavior.
- Known trap: SSG pages must include dynamic routes in `includedRoutes`.

The card does not replace project documentation. It is an orientation marker used at the beginning of a task. As the repository changes, the card should be reviewed like code, not treated as a permanent manual.

## A practical workflow: build a card that works

### Collect repeated decisions

Look at the last three to five tasks and find the questions that keep returning. Do not copy every answer. Keep the rules that would lead to a different implementation path.

### Attach a source or a check to each rule

“Use this color” is weaker than “Use `--blue`, defined in `src/style.css`.” A source makes a rule easier to update when it becomes stale.

### Separate stable and volatile information

Put project structure and naming conventions near the top. Put release commands, owners, and temporary integrations lower down. Add a confirmation date to facts likely to expire.

### Update the card when the workflow changes

Add the card to the completion checklist for migrations, refactors, and releases. Updating at the moment of change is more reliable than scheduling a large cleanup months later.

## A reusable short-card template

```markdown
# Agent project card

## Start here
- App entry:
- Route entry:
- Main content/data entry:

## Stable rules
- Naming and folders:
- Styles and components:
- Non-negotiable boundaries:

## Verification
- Type check:
- Build command:
- Real browser check:

## Known traps
- [Issue] / [avoidance] / [last confirmed]
```

## Common failures and fixes

The first failure is turning a short card into an encyclopedia. When it grows, move explanations into a document and keep one decision rule plus a link in the card.

The second is recording personal taste as a project constraint. “I prefer this” is not the same as a compatibility, security, or release rule. Mark optional advice as optional and keep actual constraints separate.

The third is updating the card but not the source of truth. A card should help an Agent find the real configuration, not become a second configuration that slowly drifts.

## Try this today

1. Find three questions your team has answered repeatedly.
2. Rewrite them as rules with a source.
3. Delete background that cannot change the next decision.
4. Put the card in the repository and have the Agent read it first.

## Sources and further reading

This article combines public GitHub Copilot resources with team workflow practice. It is an editorial synthesis and does not represent GitHub's endorsement of every recommendation.
