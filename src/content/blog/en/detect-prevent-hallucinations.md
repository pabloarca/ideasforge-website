---
title: 'Detecting and preventing AI hallucinations is architecture'
description: 'A hallucination is a well-written, false answer. The four mechanisms our systems use to corner them in production, with their numbers and their scars.'
lang: 'en'
pubDate: 2025-09-20
updatedDate: 2026-08-23
translationId: 'hallucinations'
tags: ['Agents', 'Quality', 'Observability']
heroImage: '/blog/hallucinations.jpg'
draft: true
---

A hallucination is an answer that looks right, reads well and is false. An invented figure, a citation that does not exist, a number the system never queried. A large part of building AI agents is exactly this, telling a correct answer from an answer that merely looks correct. And that distinction is not made by a prompt trick. It is made by architecture.

The hallucinations we see in production almost always have one of two origins. Either the model answers from its memory of the conversation, ignoring the instruction to query the data, or the context it receives is badly built and the model fills the gaps with whatever sounds probable. **Neither gets fixed by asking the model not to hallucinate. Both get fixed by removing the opportunity.**

## Why the model would rather invent than stay quiet

This is not some odd defect the industry has failed to pin down. It is the rewarded behavior.

The work that explains it best was published by OpenAI with Georgia Tech in September 2025, and its argument fits inside a picture of an exam. A model is trained and graded the way a student is graded on a hard question, where "I don't know" scores zero and a confident answer sometimes scores, even when it is made up. Under those rules, guessing with assurance is the strategy that wins.

The conclusion of that paper is the one we had been reaching the hard way. As long as the tests reward assurance, the model will keep filling gaps, so the correction is not to ask it for sincerity. It is to change the rules of the game around it, which is exactly what the four mechanisms below are for.

And how much damage does this do outside a demo? A researcher at HEC Paris keeps a register of court rulings in which the judge found AI-invented material, with a strict test for entry. By the middle of 2026 it was past 1,600 cases, and the curve is steepening rather than flattening out. **More than 650 of them come from practicing lawyers**, people whose trade is precisely to check citations.

## Context is king

A model is only as good as what it can read while answering. If the search that feeds it returns irrelevant or stale fragments, the model will complete with probability what should come from a document. That is why we order the data and the tools before polishing a single instruction. We tell that story in [data before prompts](/en/blog/data-before-prompts), and it is the part of the work nobody sees because it never appears in the demo.

## Every figure from a fresh query

In the agent we built for Savian, a second model acts as an auditor and distrusts for a living. It accepts no figure that comes from the conversational context, even three messages away, and forces a fresh database query for every number that gets delivered. The memory window is short on purpose. **Remembering less means hallucinating less, because the raw material of the error is not even available.** The auditor has [an article of its own](/en/blog/the-auditor-that-trusts-no-figure), with the detail of how you take away a model's temptation to answer from memory.

## The metric that catches memory

Detecting matters as much as preventing, and our favorite metric for this compares two things that should always match, the tool the conversation asked for and the tool the model actually used. When they diverge, the model answered from memory instead of querying. That divergence is measurable turn by turn, leaves a trace in the records and turns *"I think it sometimes makes things up"* into a figure someone watches every week. **What is not measured gets debated. What is measured gets fixed.**

## The text the user reads is not written by the model

In one of our plant-floor assistants we went a step further. For answers that have to be exact, the model does not return the final text. It returns a key, an identifier, and the code retrieves the canonical text that key points to. **What the person reads is literally what was approved, word for word, whatever the model generated around it.** Interpretation stays with the model and the content stays out of its reach, which is where a hallucination cannot touch it.

## When "I don't know" hallucinates too

There is a hallucination almost nobody talks about, the system that says "I have no information on that" without having searched properly, or the one that answers confidently something its documentation does not back. In one of our first test batteries, five out of six "outside the documentation" cases slipped past the similarity threshold. The fix was not tuning the threshold. It was listening to a different signal and auditing every relabel. That story, with the two kinds of "no" a serious assistant must tell apart, lives in [two kinds of "no"](/en/blog/two-kinds-of-no).

## What to ask if you are buying

If you are evaluating an assistant and invented answers worry you, three questions separate the brochure from the engineering. Where does every figure it shows come from, a fresh query or the conversation's memory. Which metric catches the model answering without querying, and who watches it. And what happens when the documentation has no answer, a clear "no" with a trail or well-written filler.

Reducing hallucinations is neither luck nor magic. **It is well-built context, verification that trusts nothing and critical content kept out of the model's reach, all of it measured in production.** That is how we work in [AI agent development](/en/services/ai-agent-development), and if you are mapping the concept from the start, begin with the [AI agents guide](/en/ai-agents). The next impeccable answer you see, greet it with the first question of this house. *Where did this figure come from?*
