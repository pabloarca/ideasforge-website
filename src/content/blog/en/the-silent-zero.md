---
title: 'The silent zero: when "no data" is an alarm'
description: 'A zero is not a neutral answer: it is an unclassified alarm. The three causes of a "no data" response and why the third one is the most treacherous.'
lang: 'en'
pubDate: 2026-08-04
translationId: 'silent-zero'
tags: ['Observability', 'Data', 'Agents']
---

When a data assistant answers "no results for that period", almost everyone reads it as just another answer. We learned to read it differently: a zero is not a neutral answer, it is an alarm waiting to be classified.

We learned it maintaining one of our assistants in production. Three completely different situations produced the same "no data", and from the outside they were indistinguishable.

## The three causes of a zero

**The first is the true zero.** No activity was recorded. The answer is correct and there is nothing to fix. This is the only innocent zero, and the problem is that the other two disguise themselves as it.

**The second is the badly built query.** The system queried, but queried wrong. It happened to us with a date range that included one day too many, mistaking an exclusive date for an inclusive one. And it happened with a regression where an identifier changed meaning and every filter by manager started returning empty. In both cases the data existed; the system was not finding it.

**The third is the most treacherous: nothing was queried at all.** In a query that grouped several sources, the source with no rows simply vanished from the result. The user saw a table, the table was well formed, and one of their companies was missing from it. No error, no warning, no red log line. The system worked. The answer was incomplete and looked complete.

## Why nobody catches the third one

The first two zeros get found eventually: someone asks for a figure they know exists and the gap gives it away. The third does not, because there is no gap to see. A missing row draws nobody's attention, least of all in a table with twenty correct ones.

Out of that came a rule we now apply to everything we build: an incomplete figure that looks complete does more damage than an error. An error gets seen and fixed. A silent omission propagates into every decision made with it.

## What we do about zeros

Two things, and neither is a magic filter.

First: the system declares what it did. Every answer opens by stating which period was queried, because we discovered that "last month" meant different things to different people. And if a source is unavailable, the system answers with the ones it has and says out loud which one was left out. Transparency turns the third zero into the first.

Second: we classify. Every conversation that ends without data gets labeled with its cause, and those labels form separate work queues. A true zero needs nothing. A bad query is a defect to fix. An omitted source is a design hole. Treating them the same means treating none of them. The other half of the discipline is refusing to trust the figures that do arrive, which is exactly the job of [the auditor that trusts no figure](/en/blog/the-auditor-that-trusts-no-figure).

This kind of discipline is what separates an assistant that works in the demo from one that survives months of production. We describe how we apply it in [AI agent development](/en/ai-agent-development), and if you are starting from scratch, the [AI automation guide](/en/ai-automation) is the best entry point.
