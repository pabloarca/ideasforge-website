---
title: 'The symptom signature beats the fix'
description: 'Documenting how a failure is recognized from the outside pays more than documenting how it was fixed. Three real signatures from an AI assistant in production.'
lang: 'en'
pubDate: 2026-07-21
updatedDate: 2026-08-23
translationId: 'symptom-signature'
tags: ['Observability', 'Maintenance', 'Agents']
---

When a system fails, almost every team documents the same two things, what broke and how it was fixed. We document something else first. How that failure is recognized from the outside, before anyone knows what causes it. We call it the symptom signature, and it is one of the least visible, most useful assets we maintain in our systems.

The reason is simple. **The fix gets applied once. The signature gets reused every time the system acts strange again**, and with non-deterministic components that happens more often than anyone likes to admit.

## Three real signatures

These three come from the catalog of one of our production assistants, a system with an orchestrator and several specialized agents behind it.

**Everything lands in "no candidates" with a zero score.** Instinct blames the model, the prompt or the thresholds. The signature says vectors were never generated. Someone added new examples to the catalog without rerunning the ingestion, and retrieval discards anything without a vector. A procedure came out of that scare. After any catalog addition, run the ingestion and verify zero pending items before touching anything else.

**Everything that goes through the model returns null, but the continuations work.** Continuations are the only path in the system that never calls the model. If they are alive and everything else is not, the diagnosis is immediate. The problem is the connection to the model, not the instructions. That time it pointed to a deployment that no longer existed after a manual change. Twenty minutes of diagnosis turned into two.

**It works in production and fails in the test bench, or the other way round.** The most uncomfortable signature, because nobody wants to look at it. The message was arriving in a different field of the request than the one the code read. It was not a testing defect, it was a latent bug that would also hit production if the upstream system changed fields. A person reading carefully caught it, not an alarm. That is data too. Some signatures we do not yet know how to automate.

## Why this matters to whoever buys AI

Because **maintenance is where AI projects live or die, and maintenance moves exactly at the speed of diagnosis**. A signature catalog turns *"it's acting strange"* into a short list of checks anyone on the team can run, including the person who joins in two years and sat in none of the meetings.

That is why, when we hand over a system, the incident catalog that ships with the repository does not just say how each problem was fixed. It says how it is recognized. It is one of the handover pieces our clients' technical teams appreciate most, and one almost nobody asks for because almost nobody knows it exists. The catalogue has a real-time relative, the circuit breaker that decides what happens while a tool is down, and it has [an article of its own](/en/blog/when-a-tool-goes-down).

Start your catalog today, with a single entry. Next time the system acts strange, write down first how you recognized it, before knowing the cause and before fixing it. That page gets reused. The fix does not.

To understand what else it takes for an assistant to survive production, continue with the [AI automation guide](/en/ai-automation) or see how we approach [custom AI agent development](/en/services/ai-agent-development).
