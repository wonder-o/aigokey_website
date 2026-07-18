---
slug: life-agent
lang: en
date: '2026-07-15'
category: Life
title: "Agents in daily life: ask for three options, not one plan"
summary: Turn open-ended errands into preference-led choices and Agents become easier to act on.
readTime: 9
tags:
  - Life efficiency
  - Personal assistant
  - Planning
sources:
  - publisher: Google Research
    title: Google Research Blog
    url: https://research.google/blog/
    publishedAt: '2025-01-01'
visual:
  type: comparison
  title: What a life task should tell an Agent
  items:
    - "Preferences: what matters more, cost, time, comfort, or novelty"
    - "Constraints: budget, schedule, location, and deal-breakers"
    - "Output: three trade-off options instead of an unsorted link list"
---

## Why this matters now

Many everyday tasks do not suffer from a lack of information. They suffer from scattered information. Travel requires comparing transport, lodging, and time. Shopping requires budget, size, and returns. Family plans must account for several people's preferences. If you ask an Agent to “plan it for me,” it may return a complete-looking list without explaining the trade-offs.

A better pattern is to turn an open-ended errand into a preference-led choice. You do not give the final decision to the Agent. You provide the preferences and constraints, then ask for three options with visibly different trade-offs. The Agent gathers, sorts, and compares; you choose.

## The core idea: state the trade-off before asking for an answer

An executable life task has three layers: what you want to achieve, what cannot be violated, and how you compare different outcomes. “A weekend in Hangzhou” is a destination. “Two days, two people, ¥1,800, leave Shanghai after 8am, prioritize food over the number of attractions, and keep walking under 15,000 steps a day” is decision context.

If you have no clear preference, let the Agent ask a question instead of silently deciding for you. For factors that conflict, ask it to state what each option sacrifices. That is more honest than asking for one supposedly optimal answer.

## A real scenario: plan a two-day trip

Give the Agent a compact brief: two people, leave Saturday morning, return Sunday afternoon, ¥1,800 total, local food, and no more than 15,000 steps per day. Ask for three plans: budget-first, comfort-first, and experience-first.

Each plan should contain transport, lodging, two key meals, expected cost, and risk notes. If a fact needs a live lookup, require a source and lookup time. If it cannot be confirmed, label it as uncertain instead of filling the gap with confidence.

You may choose comfort-first lodging with budget-first transport. The Agent did not make that decision. It compressed a messy search into comparable options while leaving you in control of the combination.

## A practical workflow: build a choice framework

### Write deal-breakers first

Budget ceilings, schedule limits, dietary needs, space dimensions, and return requirements should be stated before preferences. Hard constraints narrow the search faster than taste labels.

### State what you are willing to trade

Tell the Agent whether you trade time for money, convenience for novelty, or an attraction for a later start. Preferences are not personality labels; they are ordering rules.

### Fix the output format

Ask every option to use the same fields: who it suits, the core trade-off, expected cost, execution steps, and risks to confirm. Consistent fields make comparison possible.

### End with a next step

Keep only three next actions per option: confirm a ticket, check opening hours, or review a cancellation rule. An action list is easier to execute than a paragraph of advice.

## A prompt you can reuse

```text
Give me three options. Do not make the final decision for me.

Goal: [what I need to accomplish]
Time: [date and available window]
Budget: [limit and what it includes]
Deal-breakers: [hard constraints]
Preference order: [for example, cost > time > comfort]

For each option include:
1. One-line positioning and who it suits
2. Key steps and expected cost
3. What it sacrifices compared with the others
4. Facts that need a live check, with sources
5. The first three actions I can take now
```

## Common failures and fixes

The most common failure is treating uncertain live information as certain. Opening hours, prices, inventory, and transport times change. Anything you will execute today should include a source and a check time.

The second problem is too many choices. Three options with clear trade-offs are usually enough. A dozen links simply hands the selection pressure back to you.

The third is ignoring execution cost. A route may look short but require three transfers, a reservation, or a long wait. Ask the Agent to show walking, waiting, booking, and cancellation costs.

## Try this today

1. Turn one “plan this for me” request into three options.
2. Write two deal-breakers and three preference priorities.
3. Require trade-offs, costs, and next actions for every option.
4. Verify live facts before execution and save the final choice to a checklist.

## Sources and further reading

This article draws on public Google Research material and everyday planning practice. Verify prices, inventory, transport, and opening hours against current official information before acting.
