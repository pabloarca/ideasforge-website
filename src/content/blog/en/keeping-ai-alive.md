---
title: 'Starting an AI project is easy. Keeping it alive, nearly impossible'
metaTitle: 'Why AI projects that launch well die anyway'
description: 'Brilliant AI projects launch well and die young. Profitable ones are easy to start and easy to maintain. The difference is decided before any code is written.'
lang: 'en'
pubDate: 2026-07-28
updatedDate: 2026-08-31
translationId: 'keeping-ai-alive'
tags: ['Maintenance', 'Observability', 'Business']
---

Starting brilliant AI projects is easy. The demo goes well, the video circulates, everyone applauds. What is nearly impossible is keeping that project alive for six months. Profitable AI projects are easy to start and easy to maintain. That asymmetry is the filter we use to decide what to build.

It is not a fringe view. [Gartner estimates](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) that over 40% of agentic AI projects will be canceled by the end of 2027. **The mortality is not in launching. It is in surviving.**

## What kills projects is not the model

We run our own product, a WhatsApp appointment assistant that handles health data, and it has taught us where a system actually dies. **It is never the cinematic failure. It is the degradation nobody watches.**

Our worst incident tells it well. A badly calibrated alert started firing on a state that was not a real failure. Within days it emitted 5,667 events and exhausted the monthly quota of the alerting system. All monitoring went blind.

Six days later, thirteen real reminders failed for a clinic, and the corresponding alarm fired thirteen times without a single one leaving the machine. The clinic told us. The system did not.

Rules came out of that which we now apply to everything: every alert carries its own cap, none can exhaust the budget of the others, and silence gets watched too, because **zero warnings in 24 hours does not mean all is well**.

## This has had a name for a decade

We did not discover the asymmetry. In 2015 a team at Google published "Hidden Technical Debt in Machine Learning Systems", the reference work on the hidden technical debt of these systems, with an estimate that went on to have a career of its own. A mature system can be 5% machine learning code and 95% everything else, the data, the infrastructure, the monitoring and the glue between the pieces.

The warning came from an earlier paper by the same authors, which called machine learning the credit card of technical debt, the kind that is easy to open and paid back with interest. It was said by one of the largest operators in the world, a year before most of the industry had touched a model.

A decade on, with generative AI, the debt is the same and the interest has gone up. The central component does not even behave the same way twice, so everything around the model weighs more, not less. **The demo shows the 5%. Day 180 is lived in the other 95.**

## Staying alive is a system, not an intention

The difference between the brilliant project and the profitable one is not talent or model choice. It is that the profitable one was designed to be maintained. In practice, that means concrete pieces:

**A test battery that runs before every change.** With non-deterministic components, any tweak can break what worked yesterday without anything visibly failing. If quality drops, the change does not ship.

**A record that lets you reconstruct every decision.** When the complaint arrives, the useful question is not "which line failed" but "why did the system believe that was the right thing to do". Without the record, that question has no answer.

**Alarms that get tested by forcing the failure.** A defense you have never seen go off is not a defense. Every sentinel gets verified by deliberately breaking what it watches.

**And a periodic, real fire drill.** In our product, a weekly test creates a real appointment, sends a real message, and cleans everything up afterwards. It finds what no simulation finds.

## The uncomfortable question for your vendor

If you are evaluating an AI project, the question that will tell you the most is not about the model or the demo. *What happens on day 180?* Who watches the alarms, who runs the tests, who finds out if the system degrades in silence? A brilliant project cannot answer that. A profitable one answers with names.

Our answer is what we call observability by default, and it sits at the center of how we do [AI agent development](/en/services/ai-agent-development). If you would rather start with the general map, it is in the [AI agents guide](/en/ai-agents). Maintenance has a price too, and what moves that monthly fee is broken down in the [cost guide](/en/ai-agent-development-cost).
