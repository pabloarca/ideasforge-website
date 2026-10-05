---
title: 'What happens after an AI chatbot or agent is delivered'
metaTitle: 'AI chatbot maintenance after delivery'
description: 'How we maintain an AI chatbot after delivery: a golden dataset of real conversations, monitoring, alerts and results every week.'
lang: 'en'
pubDate: 2026-10-05
translationId: 'after-delivering-an-ai-agent'
tags: ['Agents', 'Reliability']
faq:
  - q: 'What does AI chatbot maintenance include?'
    a:
      - 'Five things: watching it through traces and alerts, measuring it every week against a golden dataset, rerunning the tests before every change, adjusting it with the questions it couldn''t answer and testing every new model before switching.'
      - 'You also get the Phoenix dashboard, the weekly results, the list of unanswered questions and, if you need it, a weekly report.'
  - q: 'How often is the chatbot reviewed?'
    a: 'The golden dataset runs every week against the real model, and the automated tests run again before every change. In between, the traces are available in the dashboard at any time and the alerts fire as soon as something goes off script.'
  - q: 'What is a golden dataset?'
    a: 'It''s the chatbot''s test suite: real conversations from your business, each one with the correct answer written down and checked by a person. It''s the reference that tells you whether the chatbot is still getting things right every week and after every change.'
  - q: 'Who decides what the correct answer is?'
    a: 'Ideally someone on your team who knows the business, and that''s what we''ll ask you for. Test cases written by hand and never checked against the real system don''t work. We learned that with our own appointment assistant.'
  - q: 'What is Arize Phoenix?'
    a: 'It''s a tool from Arize for seeing inside what an AI agent does. Every conversation leaves a trace with what came in, what it did step by step, what it cost, how long it took and which model answered. It also lets you compare two versions on the same cases.'
  - q: 'Where are the conversation traces stored?'
    a: 'They don''t leave for a third party''s cloud. On custom projects, Phoenix is installed on your own server, like the rest of the infrastructure, which is in your name from day one.'
  - q: 'Can I see what the chatbot is doing myself?'
    a: 'Yes. We hand you the Phoenix dashboard, with the traces, the spend and the comparison between versions, and the results of every weekly golden dataset run. If you need it, you also get a weekly report that sums it up.'
  - q: 'What happens if the chatbot gets something wrong in front of a customer?'
    a: 'We see it in the trace, find the cause and add the case to the tests so it can''t happen again without us seeing it. If your team spots it first, they tell us and we follow the same path.'
  - q: 'What happens to the questions the chatbot can''t answer?'
    a: 'We hand you the list and go through it with you. For each one we decide whether adding a term to the glossary is enough, whether the model''s instructions (the prompt) need to change or whether the design does. Once it''s solved, the question joins the golden dataset.'
  - q: 'What happens when the provider releases a new model?'
    a: 'The model version is pinned, so a new version doesn''t reach production on its own. Before switching, the new model runs the same golden dataset and we compare the two versions case by case. If it gets fewer right, we don''t switch, even if it''s cheaper.'
  - q: 'How do you stop a change from breaking what already worked?'
    a: 'No change reaches production unless it passes the test suite. Our appointment assistant has nearly 5,000 automated tests by now. The database is backed up before the change is applied and, if the service stops responding afterwards, the system goes back to the previous version automatically.'
  - q: 'How much does maintenance cost, and is there a minimum term?'
    a:
      - 'It''s a monthly fee that pays for watching and maintaining the chatbot, with no minimum term. The prices are in our guide to how much an AI agent costs.'
      - 'If you stop paying the fee, the chatbot doesn''t switch off. The code and the infrastructure are in your name from day one.'
---

**Once an AI chatbot is delivered, its maintenance begins: we watch it through traces and alerts, measure it every week against a golden dataset of real conversations and adjust it with the questions it couldn't answer.** It's needed because your customers' questions change, your rules change and the model provider ships new versions.

The question from whoever is buying is almost always the same: what if it gets something wrong in front of my customers? It's a fair question. A language model can fail, and nobody serious should promise you otherwise. Here's what we do to catch it in time and what your company gets.

## How we evaluate a chatbot: the golden dataset

To know whether a chatbot is still working well, you need a reference. **That reference is a golden dataset: real conversations from your business, each one with the correct answer written down and checked by a person.** Ideally that person is someone on your team who knows the business.

The cases that work come from real conversations. We learned that with our own product, an appointment assistant for clinics. We wrote the first test cases by hand and they were useless, because they were never checked against the real system.

You also need a clear bar. In that assistant, the chatbot has to understand what the patient is asking for in at least 85% of all cases and in 70% of each type of request.

## How we see what the chatbot does every day

**Every time the chatbot works it leaves a trace in Arize Phoenix: what came in, what it did step by step, what it cost, how long it took and which model actually answered.** Phoenix is a tool from Arize for seeing inside what an AI agent does. We use it on the chatbots and agents we maintain, including our appointment assistant.

The traces don't leave for a third party's cloud. On custom projects, Phoenix is installed on your own server, as we explain in our [guide to GDPR-compliant AI](/en/gdpr-compliant-ai).

The traces show what the chatbot costs and whether something is slowing down. They also show whether the provider answered with a fallback model without telling anyone. In the appointment assistant, a check looks for exactly that and hasn't found a single fallback model in 29,041 calls.

## Tests before every change and a weekly review

**The chatbot runs its tests again at two moments: before every change and once a week.** Every change is a risk, however small it looks.

In the appointment assistant, no change reaches production unless it passes the automated tests, which now number nearly 5,000. The database is backed up before the change is applied and, if the service stops responding afterwards, the system goes back to the previous version automatically.

<div data-pizarra="cambioSeguro"></div>

On top of that, once a week the golden dataset runs against the real model. Those tests cost money on every run, so they don't run around the clock. They run every week and whenever something important changes, and their results stay in Phoenix so one week can be compared with the next.

## What we do with the questions it can't answer

**The questions the chatbot couldn't answer are the best to-do list there is.** We go through them with you and decide what each one needs: adding a term to the glossary, changing the model's instructions (the prompt) or changing the chatbot's design. Once it's solved, the question joins the golden dataset and gets checked every week.

<div data-pizarra="cicloDespues"></div>

Mistakes go the same way. If someone asked for an appointment on "January 11" in the middle of June, the assistant read it as a January that had already passed. Since we caught it, the year is worked out by the code and not by the model, and that case is checked again with every change.

And people have the last word. Clinics can flag a conversation as a problem, and we review those reports one by one. It's a signal no automated test can replace.

## Alerts for the failures nobody sees

**We also check that the alerts themselves work, because a failure that raises no alarm can go days without anyone noticing.** The appointment assistant has around a hundred checks inside its own code that fire as soon as something goes off script. One of them told us that appointments created by hand from the dashboard weren't updating the customer record, and we added a test that covers it.

Alerts fail too. Once, an alert that fired too often used up the notification service's quota, and 13 appointment reminders were lost without any warning. The clinic told us. Since then every alert has a daily cap, and a test checks that the cap holds.

## When a new model comes out: switch or not?

**A new or cheaper model doesn't get in just because. First it runs the same golden dataset, and in Phoenix we compare the two versions case by case.** If the new one gets fewer right, we don't switch, even if it's cheaper.

The model version is also pinned. Updating it is our decision and it goes through the tests like any other change, so a new version from the provider doesn't reach production on its own.

## What your company gets every week

**Everything we see, you see too.** We hand you:

- **The Phoenix dashboard**, with the traces, the spend and the comparison between versions.
- **The results of every weekly run** of the golden dataset.
- **The questions the chatbot couldn't answer**, so we can decide together what to adjust.
- **A weekly report that sums it up**, if you need it.

On custom projects, the code and the infrastructure are in your name from day one. Maintenance is a monthly fee with no minimum term, and the prices are in our guide to [how much an AI agent costs](/en/ai-agent-development-cost).

You won't get a chatbot that never makes a mistake, because that doesn't exist. **You'll get one that's measured every week, tested before every change and improved with what it couldn't answer.**
