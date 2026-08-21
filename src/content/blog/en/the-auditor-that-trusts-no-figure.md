---
title: 'The auditor that trusts no figure'
description: 'A second model that distrusts by design, a deliberately short memory, and the metric that catches an assistant answering from memory.'
lang: 'en'
pubDate: 2026-07-07
translationId: 'distrustful-auditor'
tags: ['Agents', 'Data', 'Observability']
---

In an assistant that answers business questions, the most dangerous failure is not ignorance. It is answering from memory.

A language model with conversation history always has one temptation at hand, the figure it produced itself three messages ago. If the user asks again, or refines, or requests the breakdown, the short path is to recycle that number instead of going back to the database. The result is an answer that is fluent, consistent with the conversation, and potentially stale or misapplied. Nobody catches it, because nothing about it looks off.

## An evaluator that distrusts by design

In the assistant we built for Savian, the solution was an inline auditor, a second model whose golden rule is to never trust the figures that appear in the conversational context. If the question involves a business number, it forces a fresh query against the database, even when the assistant already "knows" the answer.

On top of that sits a decision that looks like a limitation and works as a defense. The memory window is deliberately short. A long history is comfortable for conversation and dangerous for numbers, because it multiplies the stale figures available for recycling. With the short window, every number that goes out over WhatsApp comes from a fresh query.

## The metric that catches answering from memory

For every interaction we record, among other things, two fields that look redundant, the tool the correction asked the assistant to use, and the tool it actually used.

Comparing those two fields is probably the most useful metric in the whole system. It catches the exact case where the model received the instruction to re-query and answered from memory anyway. Without that pair, the failure is invisible: the answer arrives, the format is correct, and no log shows an error.

This is the kind of instrument that almost never shows up in a demo, because in a demo nobody re-asks with malice. It shows up in month three of production, when a manager compares the assistant's figure with the monthly report and they do not match.

## Distrust is a design, not an attitude

None of this depends on the model behaving. The auditor forces the re-query, the short window shrinks the raw material for the error, and the tool metric flags the exceptions. Three pieces of architecture serving one principle. In a system that hands out business figures, data freshness is not requested politely, it is imposed by design. And when what arrives is a zero, distrust changes shape. We tell that story in [the silent zero](/en/blog/the-silent-zero).

If your team waits on analytics for every number, see what we build in [AI agent development](/en/ai-agent-development). And if the problem is a whole process rather than a query, start with [AI workflow automation](/en/ai-workflow-automation).
