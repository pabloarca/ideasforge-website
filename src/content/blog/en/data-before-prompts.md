---
title: 'Data before prompts'
description: 'An entire market sells prompt engineering. Our production experience says you gain more by organizing the data than by polishing the prompt.'
lang: 'en'
pubDate: 2026-08-11
translationId: 'data-before-prompt'
tags: ['Data', 'Architecture', 'Agents']
---

There is a whole industry selling prompt engineering courses, and we understand why: touching the prompt is cheap, fast and feels like control. Our experience maintaining AI systems in production points elsewhere. When something goes wrong, the prompt is almost never where the biggest gains are. The data almost always is.

The logic is simple. A language model works with what you give it. If the data it retrieves is clean, organized and readable, the model does well even with mediocre instructions. If the data is ambiguous or badly structured, no paragraph of instructions makes up for it. You will be politely asking it to guess.

## The case of the threshold that detected nothing

In one of our documentation assistants, the first test round left an uncomfortable finding. Five out of six questions that fell "outside the documentation" were not detected as such. Retrieval always found some similar-looking fragment, because in a large corpus almost any sentence clears the similarity threshold.

The classic temptation would have been to ask the model, with more emphasis, to recognize when there was no evidence. What worked was working the data and code layers: listening to the documentation agent's own "no match" verdict, redesigning the dispatcher to accept it, and leaving every relabeling audited. The prompt barely changed.

## Isolation that stopped depending on remembering

In another of our systems, the separation between clients initially depended on a filter added to every query. It worked, but the whole security posture hung on a condition someone could forget to add. The real improvement was not a stricter instruction or one more check. It was reorganizing the data, with one schema per client in the warehouse. Isolation went from being a predicate to remember to being the very shape of the data. An entire class of failures ceased to exist.

That is the recurring pattern. The robust solution almost never lives in the text you pass the model. It lives in how the data the model consumes is organized, and in the code that decides what it may touch.

## What this means if you are buying AI

That the quality question for a vendor is not "which model do you use?" or "how do you write your prompts?". It is "what will you do with my data so the model works well?". Cleaning catalogs, unifying identifiers, deciding what gets indexed and how it is chunked, defining which fields exist and which are never exposed. It is less glamorous than a clever prompt, and it is where the system's endurance gets decided.

Our internal motto sums it up: judgment lives in the code, interpretation of the world lives in the model, and knowledge lives in the data. Each piece where it belongs.

That is why our [workflow automation](/en/ai-workflow-automation) projects start by looking at the data before the model. And if you are building judgment before deciding, the [AI automation guide](/en/ai-automation) is the best starting point.
