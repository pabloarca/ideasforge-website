---
title: 'An AI agent for real-estate agencies, from the inside'
metaTitle: 'An AI agent for real-estate agencies'
description: 'Dozens of WhatsApp messages a day, five to ten minutes per inquiry and an overloaded team. What the agent that filters requests for a Barcelona agency actually does.'
lang: 'en'
pubDate: 2025-06-15
updatedDate: 2026-08-31
translationId: 'real-estate-agent'
tags: ['Agents', 'Real estate', 'Automation']
heroImage: '/blog/inmo.jpg'
---

Barceloneta Premium, a Barcelona agency, received dozens of WhatsApp messages a day from people interested in renting. Each inquiry demanded five to ten minutes of manual checking before anyone knew whether it was worth pursuing. Multiply those minutes by dozens of messages and you get the number that was eating the team, a full working day scattered across ten-minute interruptions.

**The obvious answer would have been hiring someone to do the triage. The interesting answer was removing the triage altogether.**

## What the agent does, step by step

The agent receives each message and holds the conversation needed to extract three things, the reason for the inquiry, the budget and the documentation available. It does not push a form at people. It asks the way a team member would ask, in the language of the person writing.

With the information complete, the agent does not decide, and it does not drop the inquiry either. It sends the team an email summary with a verdict, suitable or not suitable, and a paragraph justifying why. The person at the agency opens the email, reads three lines and decides whether to schedule the visit. The judgment stays theirs. **What disappears is the ten minutes of checking it used to take to reach that judgment.**

## The result, in hours rather than promises

More than three hours a day saved on handling incoming requests alone. The team went from triaging to scheduling visits, which is the part of the job that leads to revenue. And interested people get an immediate reply at any hour, including the rental-demand peaks where they used to cool off waiting.

That is also the yardstick we use to decide whether an AI project deserves to exist, **that it moves a business figure and not a feeling**. We tell that story in [measure AI by profit](/en/blog/measure-ai-by-profit).

## "Going cold" is not a feeling, it has numbers

The idea that an interested person goes cold sounds like salesperson's intuition. It has been measured.

The classic study on the life of an inbound inquiry was published by Harvard Business Review in 2011, with 1.25 million inquiries received by 42 American companies. Those that attempted contact within the first hour multiplied their chances of a useful conversation by almost seven compared with those trying an hour later. Compared with those letting a day pass, they multiplied it by more than sixty.

And how many companies answer at that speed? The same article audited another 2,241 companies with a test inquiry. Only 37% replied within the first hour. 23% never replied at all.

The study is fifteen years old and it measured phone calls, so it should not be stretched too far. What has not expired is the mechanism. Someone looking for a flat is not writing only to you, they are writing to every listing that fits, all at once. **The conversation goes to whoever replies first with something useful.** An agent replies with something useful at midnight on a Sunday.

We did not pick the channel either. According to the CNMC household panel, with data from the fourth quarter of 2025, 94.6% of Spanish internet users use WhatsApp regularly. The second messaging app is Instagram, at 27.6%. The conversation happens where people already are. Nobody has to install anything to message you.

## What it takes for it not to be a demo

An agent like this touches personal data, calendars and reputation, so **what happens when it fails matters more than what happens when it works**. The conversation leaves a complete trail, every request is recorded with its verdict and its justification, and the filter that decides what gets escalated does not live in the model's instructions. It lives in code that always runs. These are the same construction rules we apply to all our [conversational AI](/en/services/conversational-ai) work, whether it serves an agency or a clinic.

## What had to be thrown away first

This agent that sounds so reasonable today was not born that way. The first version followed the pattern almost everything sold as an agent is built on, a model with tools at its disposal and the instruction to use them when needed.

**Many times it did not use them.** Nothing failed that you could look up in a log. The model decided it could answer without checking, so it either invented the answer or told the person it could not go on when it could.

We rebuilt it the other way round, with the state of the conversation kept in code and the model interpreting inside that state.

## And after rentals, the rest

The signal that a system works is what happens next. The agency is extending the agent to property sales and to internal processes, on the same foundation that already filters rentals. **Starting with one painful process and growing from there is the pattern we see repeat in the projects that survive.**

You can do this math this afternoon. *How many minutes does each incoming inquiry cost, and how many arrive per day?* Multiply. You are already paying that number, just without an invoice.

If your agency looks like this, the [AI for real estate](/en/real-estate) vertical explains the full system with its proof in production. And if you are in another sector with the same bottleneck, the conversation starts the same way, telling us where the hours go.
