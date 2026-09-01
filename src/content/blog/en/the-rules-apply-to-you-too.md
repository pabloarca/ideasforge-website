---
title: 'You do not build AI. The Act applies to you anyway.'
metaTitle: 'The EU AI Act if you only use AI, not build it'
description: 'The EU AI Act does not hand duties only to the people who make models. Two already apply to you today. The postponement everybody is talking about leaves them alone.'
lang: 'en'
pubDate: 2026-09-01
translationId: 'deployer-duties'
tags: ['Compliance', 'Regulation', 'Business']
---

There is one sentence we hear in almost every meeting where the EU AI Act comes up. **"That is for the people who make AI. We only use it."**

It is half true, and the missing half is the half that carries the duties.

The Act does not sort companies by whether they write code. It sorts them by the role they hold in front of a specific system. Whoever puts it on the market is the provider. Whoever runs it under their own authority is the deployer. **And the deployer has a list of obligations of their own**, which do not go away because somebody else trained the model.

## Two duties that already apply to you today

Not in 2027. Today, while you read this.

The first is **AI literacy**, Article 4. It has been binding since 2 February 2025 and **it does not sort by risk level**: it covers every system, including the assistant somebody on your team uses to draft emails. It asks that whoever works with those tools has training proportionate to what they do with them.

Proportionate is the word that saves you. It does not ask for a degree, it asks that whoever approves a generated answer knows what can go wrong inside it.

The second is the **transparency duty in Article 50**, binding since 2 August 2026. If a person is talking to a machine, they are told. If a machine generated a piece of content, it is marked.

Neither depends on your system being high risk. Neither has been postponed.

## The postponement almost everybody read backwards

In July 2026 the Digital Omnibus was published, Regulation (EU) 2026/1744. The reading that went around was **"they have delayed the AI Act"**. It went around so widely that plenty of committees filed the whole thing away.

What it actually delayed are the high-risk obligations: Annex III moves to 2 December 2027 and Annex I to 2 August 2028.

**What it did not delay, which is the part aimed at you**, are the prohibited practices, the Article 4 literacy duty, the general-purpose model rules and the Article 50 transparency duty.

Put another way, the part affecting few was pushed back and the part affecting everyone was left exactly where it was. Anyone who filed the subject away in July filed away the opposite of what they thought.

## And if you do land in high risk

Then Article 26 applies, which is the deployer's list. Use the system according to its instructions. Put human oversight in place with competence **and with the authority to stop the thing**. Watch that the input data is relevant to what the system does. Monitor how it behaves and report what goes wrong. Keep the logs for at least six months and tell the workers it affects.

Before your stomach drops: **Annex III is eight named domains**, among them biometrics, employment, education, essential services such as credit and life or health insurance, critical infrastructure, law enforcement, migration and justice. A company automating invoices or answering customer questions does not land there by default. One filtering CVs does.

## What we found reading that list

When we put Article 26 next to our own systems we expected to find paperwork. We found something else.

**Almost every one of those duties is an engineering property, not a document.** Keeping logs for six months is an architecture decision you make on day one or never. Whether a person can stop the system is an architecture decision. Whether the input data is relevant gets checked in the code, not in a meeting.

A system built that way **produces the file as a by-product**. One that is not forces you to assemble it by hand every time somebody asks.

And that difference shows up long before any inspector does. The same logs the Act asks for are the ones that tell you why your assistant said something absurd on a Tuesday afternoon. It is the same discipline we argue for on grounds that have nothing to do with the law. We make that case in [measure AI by profit](/en/blog/measure-ai-by-profit).

## The question worth putting to your provider

If you take one thing away from this, make it this one.

**"Does the record of what the system did exist by design, or does it have to be rebuilt when somebody asks for it?"**

If the answer is the second, it does not exist. A file assembled after the question is a piece of writing, not evidence, and whoever reads it will be able to tell.

It is the same question, incidentally, that separates a system you can maintain from one you can only hope keeps working. The Act is not asking you for anything strange. It is asking you, with the force of law, for what you should already want on your own.

The full detail, with the eight domains one by one, Article 26 duty by duty and a first pass you can run this week, is in [the EU AI Act guide](/en/eu-ai-act-compliance).
