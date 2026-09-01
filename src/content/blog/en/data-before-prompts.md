---
title: 'Data before prompts'
metaTitle: 'Data before prompts: what beats prompt engineering'
description: 'An entire market sells prompt engineering. Our production experience says you gain more by organizing the data than by polishing the prompt.'
lang: 'en'
pubDate: 2026-08-11
updatedDate: 2026-08-31
translationId: 'data-before-prompt'
tags: ['Data', 'Architecture', 'Agents']
---

There is a whole industry selling prompt engineering courses, and we understand why: touching the prompt is cheap, fast and feels like control. Our experience maintaining AI systems in production points elsewhere. **When something goes wrong, the prompt is almost never where the biggest gains are. The data almost always is.**

The logic is simple. A language model works with what you give it. If the data it receives is clean, organized and readable, the model does well even with mediocre instructions. **If the data is ambiguous or badly structured, no paragraph of instructions makes up for it.** You will be politely asking it to guess.

## The case of the threshold that detected nothing

In one of our documentation assistants, the first test round turned up an uncomfortable finding. Five out of six questions that fell "outside the documentation" were not detected as such. Retrieval always found some similar-looking fragment, because in a large corpus almost any sentence clears the similarity threshold.

The classic temptation would have been to ask the model, with more emphasis, to recognize when there was no evidence. The fix came from the data and code layers: listening to the documentation agent's own "no match" verdict, redesigning the dispatcher to accept it, and leaving every relabeling audited. The prompt barely changed.

## Isolation that stopped depending on remembering

In another of our systems, the separation between clients initially depended on a filter added to every query. It worked, but the whole security posture hung on a condition someone could forget to add. The real improvement was not a stricter instruction or one more check. It was reorganizing the data, with one schema per client in the warehouse. Isolation went from being a predicate to remember to being the very shape of the data. An entire class of failures ceased to exist.

That is the recurring pattern. **The robust solution almost never lives in the text you pass the model.** It lives in how the data the model consumes is organized, and in the code that decides what it may touch.

## The industry knows it and dodges it

The title of a 2021 Google Research study puts it bluntly. Everyone wants to do the model work and nobody wants to do the data work.

The study interviewed 53 practitioners applying AI in domains where getting it wrong is expensive, health, credit, conservation. And it put a name to what happens when data is treated as a formality, data cascades. Problems that start small, have no indicator to give them away, and compound until the system has to be rebuilt or the trust of the people using it erodes. Some take years to appear, and they almost always appear in production.

Our two examples are cascades cut short. The threshold that filtered nothing was a data problem dressed as a model problem. The filter someone could forget was a data problem dressed as a discipline problem. **In both cases the fix arrived before the bill because we looked in the right layer.**

## What this means if you are buying AI

The quality question to ask a vendor is not *"which model do you use?"* or *"how do you write your prompts?"*. It is *"what will you do with my data so the model works well?"*. That means cleaning catalogs, unifying identifiers, deciding what gets indexed and how it is chunked, defining which fields the model can see and which are never exposed. It is less glamorous than a clever prompt, and it is where you decide whether the system holds up.

Our internal motto sums it up: **judgment lives in the code, interpretation of language lives in the model, and knowledge lives in the data.** Each piece where it belongs.

Next time a failure begs for a prompt tweak, look first at what the model received. *Was the data clean, organized and complete?* If the answer is no, you already know where the fix is not.

That is why our [workflow automation](/en/services/ai-workflow-automation) projects start by looking at the data before the model. And if you are still forming a view before you commit, the [AI agents guide](/en/ai-agents) is the best starting point.
