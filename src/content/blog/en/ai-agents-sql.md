---
title: 'The agent that queries your data does not write SQL'
description: 'The text-to-SQL pattern promises a model that writes queries. We built it for Savian with the opposite decision, and that decision is what makes it safe.'
lang: 'en'
pubDate: 2025-08-12
updatedDate: 2026-08-21
translationId: 'ai-agents-sql'
tags: ['Data', 'Agents', 'Security']
heroImage: '/blog/portada-sql.jpg'
---

Text-to-SQL is one of the sector's most repeated promises. You ask in natural language, "how many orders did we close last month?", and a model writes the query, runs it and hands you the figure. We built exactly that for Savian, an agent through which owners and managers query their production data without waiting on analytics. And the central design decision was the opposite of what the pattern's name suggests. Our model does not write SQL.

## Why we do not let it

A model-generated query is free text with access to a database, and free text cannot be fully validated. You can review a thousand well-written queries and still miss error number one thousand and one, the similarly named wrong table, the missing filter, the sum that crosses what should never be crossed. With several companies' data in the same warehouse, that margin of error is not a cosmetic flaw. It is the entire risk of the project.

## What it hands over instead

The model understands the question and delivers a JSON contract with a closed schema, the period, the scope, the filters, the metric and the groupings. Nothing else. Deterministic code validates that contract and builds the query with parameters, its columns drawn from a closed list we defined. No identifier is ever interpolated from model text.

The practical difference fits in one sentence. A contract with five known fields can be validated in full before anything runs. A free-form query cannot. The model does what it is good at, understanding the question, and the code does what demands guarantees, touching the data.

## What that decision buys

It buys demonstrable security, because permissions apply to the validated contract and the final query carries its unconditional filter, the last of the [four layers of isolation](/en/blog/four-layers-of-isolation) we describe separately. And it buys the business result that justifies the project, waiting for a figure went from hours to seconds, without leaving ajar the door the naive pattern never quite closes.

## Honesty is designed too

Two details of the Savian agent show the rest of the mindset. Every answer opens by stating the period that was queried, so nobody mistakes a March figure for an April one. And when the system runs degraded, with some source down, it says so and warns which data may be missing, instead of delivering an incomplete total wearing a complete face.

Figures also never come from the conversation's memory. An internal auditor forces a fresh query for every number delivered, and that piece has [an article of its own](/en/blog/the-auditor-that-trusts-no-figure).

If your team waits hours for every figure, this pattern built properly is among the most profitable things there are. This is how we approach it in [AI agent development](/en/ai-agent-development), with the contract, the layers and the auditor in place from day one.
