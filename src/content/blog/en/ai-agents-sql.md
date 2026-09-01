---
title: 'The agent that queries your data does not write SQL'
metaTitle: 'The agent that queries your data writes no SQL'
description: 'The text-to-SQL pattern promises a model that writes queries. We built it for Savian with the opposite decision, and that decision is what makes it safe.'
lang: 'en'
pubDate: 2025-08-12
updatedDate: 2026-08-31
translationId: 'ai-agents-sql'
tags: ['Data', 'Agents', 'Security']
heroImage: '/blog/portada-sql.jpg'
---

Text-to-SQL is one of the sector's most repeated promises. You ask in natural language, *"how many orders did we close last month?"*, and a model writes the query, runs it and hands you the figure. We built exactly that for Savian, an agent through which owners and managers query their production data without waiting on analytics. And the central design decision was the opposite of what the pattern's name suggests. **Our model does not write SQL.**

## Why we do not let it

**A model-generated query is free text with access to a database, and free text cannot be fully validated.** You can review a thousand well-written queries and still miss error number one thousand and one, the similarly named wrong table, the missing filter, the sum that crosses what should never be crossed. With several companies' data in the same warehouse, that margin of error is not a cosmetic flaw. It is the entire risk of the project.

## And what if the model already gets it right almost every time?

Since ours is the uncomfortable position, it is worth looking at the numbers on the other side.

The reference exam is called Spider 2.0, an academic piece from late 2024 that gathered 632 real query tasks over enterprise databases, with their thousands of columns and their dialects. The same models that were scoring around 90% on earlier academic exams dropped to between 10 and 21% there. The distance between the demo and your data warehouse, measured.

Specialized systems have been climbing that leaderboard since, and the best now pass 90% on part of the test. The problem looked like one of aim, and aim improves every quarter.

Does that change our decision? No, because the objection was never aim. An accuracy exam measures whether the query returns the right figure, and it does not measure what the wrong query does. **The query that fails also runs.** With data from several companies in the same warehouse, the price of that failure looks nothing like a badly worded answer.

There is also something no accuracy exam measures, security. OWASP, the sector's reference on application security, gives a whole category of its list for language-model applications to improper output handling, which means passing what the model generates to another system without validating it.

Its textbook example is exactly this one, the generated query that reaches the database with nobody scrutinizing it. **Our closed contract is not a house quirk, it is the design answer to that category.**

## What it hands over instead

The model understands the question and delivers a JSON contract with a closed schema, the period, the scope, the filters, the metric and the groupings. Nothing else. Deterministic code validates that contract and builds the query with parameters, its columns drawn from a closed list we defined. No identifier is ever interpolated from model text.

The practical difference fits in one sentence. **A contract with five known fields can be validated in full before anything runs. A free-form query cannot.** **The model does what it is good at, understanding the question, and the code does what demands guarantees, touching the data.**

## What that decision buys

It buys demonstrable security, because permissions apply to the validated contract and the final query carries its unconditional filter, the last of the four layers that keep each company's data apart from the one next door. And it buys the business result that justifies the project, waiting for a figure went from hours to seconds, without leaving ajar the door the naive pattern never quite closes.

## Saying what is missing is designed too

Two details of the Savian agent show the rest of the mindset. Every answer opens by stating the period that was queried, so nobody mistakes a March figure for an April one. And when the system runs degraded, with some source down, it says so and warns which data may be missing, instead of delivering **an incomplete total wearing a complete face**.

Figures also never come from the conversation's memory. An internal auditor forces a fresh query for every number delivered.

At your next demo of this pattern, ask one thing only. *Who writes the query that touches my data?* If the answer is the model, you already know the margin of error. If it is code validating a closed contract, keep looking.

If your team waits hours for every figure, this pattern built properly is among the most profitable things there are. This is how we approach it in [AI agent development](/en/services/ai-agent-development), with the contract, the layers and the auditor in place from day one.
