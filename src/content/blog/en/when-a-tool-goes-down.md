---
title: 'What your assistant does when a tool goes down'
description: 'A conversational assistant depends on systems that fail. The circuit breaker that protects the user, and the three lessons production taught us about it.'
lang: 'en'
pubDate: 2026-06-23
updatedDate: 2026-08-31
translationId: 'tool-goes-down'
tags: ['Agents', 'Reliability', 'Maintenance']
heroImage: '/blog/tool-goes-down.jpg'
---

A serious conversational assistant does not live alone. It queries databases, internal systems and third-party services. Every one of those pieces can go down, and will. **The question that defines the assistant's quality is not whether its tools fail. It is what the user sees when they do.**

The cheap answer is a technical trace, a message with an error number inside, the kind that only means something to whoever wrote the system. To the person in front of it, that reads as *"this thing doesn't work"*, and trust in the whole system pays for the failure of a single component.

## The circuit breaker

The pattern is called a circuit breaker, and it has almost two decades of service. Michael Nygard christened it in 2007 in "Release It!", the reference book on software in production, borrowing the image of the electrical breaker that cuts the current before the fault spreads.

Large distributed systems have built it in ever since. What is still rare is applying it to the tools of an AI assistant, which fail like any other service and on top of that fail in front of a person, mid-sentence.

In our plant-floor assistant, every tool has a status record: a failure counter, the last error and its timestamp. A watcher checks what each tool returns and recognizes the usual shapes of failure, from an empty response to a connection error to a stalled flow. If a tool fails repeatedly within a time window, the system disables it.

What the user sees then is not a technical error. It is a polite, specific degradation message. That particular capability is unavailable, the rest of the assistant still stands. One broken piece stops contaminating the whole, and no internal trace, with its host names and paths, ever reaches anyone's screen.

## Three lessons production taught us

**A counter that only goes up lies.** If nobody brings it down over time, a perfectly healthy tool still carries the count from an incident months ago. It looks sick when it is perfectly healthy. Every counter reading now is read alongside the date of the last failure, because a number without a date is a rumor.

**Automatic recovery is never free.** Opening the breaker is easy. Deciding when to close it takes judgment. We chose manual, deliberate reactivation, and we wrote it down, because the danger is not the decision but the silence. A downed tool nobody remembers is worse than a noisy outage.

**"Enabled" does not mean "reachable".** The most uncomfortable finding. An audit revealed a tool that showed as healthy and operational in its status table while the router had no way to reach it, because it was missing from the routing rules. Declared health and actual reachability are different properties, and only an end-to-end test verifies both at once.

## Reliability is designed before the failure

None of this gets improvised the day a third-party service goes down at eleven in the morning. **The breaker, the degradation messages and the tests that check every piece can be reached are built earlier, when everything works, which is exactly when they look unnecessary.** Every outage that does happen also leaves its trace in the incident catalog, the piece we describe in [the symptom signature](/en/blog/the-symptom-signature).

There is a test you can run this week. Deliberately kill one of your assistant's tools in a test environment and look at the user's screen. *A technical trace, or a graceful degradation?* Whatever you see is your answer to the question this article opened with.

If you are considering an assistant that depends on your real systems, this is part of what we call [conversational AI](/en/services/conversational-ai). And if you want the full map before deciding, start with the [AI agents guide](/en/ai-agents).
