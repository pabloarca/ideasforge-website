---
title: 'The symptom signature beats the fix'
description: 'Documenting how a failure is recognized from the outside pays more than documenting how it was fixed. Three real signatures from an AI assistant in production.'
lang: 'en'
pubDate: 2026-07-21
updatedDate: 2026-08-31
translationId: 'symptom-signature'
tags: ['Observability', 'Maintenance', 'Agents']
---

When a system fails, almost every team documents the same two things, what broke and how it was fixed. We document something else first. How that failure is recognized from the outside, before anyone knows what causes it. We call it the symptom signature, and it is one of the least visible, most useful assets we maintain in our systems.

The reason is simple. **The fix gets applied once. The signature gets reused every time the system acts strange again**, and with non-deterministic components that happens more often than anyone likes to admit.

## It is not the old known-error database

IT service management has kept something similar for decades. In ITIL, the reference framework for IT operations, it is called the known error database, and it stores every problem with its root cause, its workaround and the state of its fix.

Our incident catalog looks a lot like it. It differs in one thing, the entry point. A known-error database is organized by cause, because in classic software the cause is stable and the symptom varies.

**With non-deterministic components it is the other way round, the symptom repeats and the cause changes.** The same "it answers nothing" can come today from a dropped connection and tomorrow from a change someone shipped, so the valuable thing is not filing yesterday's cause. It is recognizing today's symptom and having the short list of causes that have produced it before.

That is why an entry in our catalog starts with how the failure looks from the outside and not with what caused it. The tradition is sound. The order has to be flipped.

## Three real signatures

These three come from the catalog of one of our production assistants, an orchestrator with several specialized agents behind it.

**The assistant stops finding anything, whatever it is asked.** The first impulse blames the model or its instructions. The signature says otherwise. Someone added new documents and nobody put them through the indexing job that makes them searchable, so as far as the search is concerned they do not exist. A procedure came out of that scare. After every addition, run that process and check that none is left pending before touching anything else.

**The assistant goes mute on everything except the messages that carry a conversation forward.** Those are the only path that never goes through the model. If they are alive and everything else is not, the diagnosis is immediate. The problem is the connection to the model, not what we wrote for it. That time the system was calling a model endpoint that no longer existed after a manual config change. Twenty minutes of diagnosis turned into two.

**It works in production and fails in the test bench, or the other way round.** The most uncomfortable signature, because nobody wants to look at it. The user’s text was stored in one place and the code was looking for it in another. It was not a test-environment defect, it was a time bomb. The day the upstream system moved it, production would break the same way. A person reading carefully caught it, not an alarm. That is data too. Some signatures still have no automated detector.

## Why this matters if you are the one buying AI

Because **maintenance is where AI projects live or die, and maintenance moves exactly at the speed of diagnosis**. A signature catalog turns *"it's acting strange"* into a short list of checks anyone on the team can run, including the person who joins in two years and sat in none of the meetings.

That is why, when we hand over a system, the incident catalog that ships with the repository does not just say how each problem was fixed. It says how it is recognized. It is one of the handover pieces our clients' technical teams appreciate most, and one almost nobody asks for because almost nobody knows it exists. The catalog has a real-time relative, the circuit breaker that decides what happens while a tool is down, and it has [an article of its own](/en/blog/when-a-tool-goes-down).

Start your catalog today, with a single entry. Next time the system acts strange, write down first how you recognized it, before knowing the cause and before fixing it. That page gets reused. The fix does not.

To understand what else it takes for an assistant to survive production, continue with the [AI agents guide](/en/ai-agents) or see how we approach [custom AI agent development](/en/services/ai-agent-development).
