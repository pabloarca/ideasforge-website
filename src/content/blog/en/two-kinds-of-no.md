---
title: 'Two kinds of "no" that are not the same'
description: 'When an AI assistant cannot answer, there are two causes of a different nature. Confusing them is the classic mistake that inflates documentation without fixing anything.'
lang: 'en'
pubDate: 2026-06-09
updatedDate: 2026-08-23
translationId: 'two-nos'
tags: ['Agents', 'Knowledge', 'Product']
draft: true
---

Every AI assistant says "no" many times a day. The interesting question is which of the two kinds of no it is saying, because there are two and they have nothing in common.

The first is **"that cannot be done"**. It is a product policy, the system does not cover that use case. Asking a documentation assistant for real-time variables, or requesting an action nobody has wired up. The limitation is functional, and the correct answer exists before searching anything.

The second is **"that is not documented"**. It is an absence of evidence, the system searched and found nothing. The question was legitimate, the case is covered, but the documentation page that answers it is missing.

## Why confusing them gets expensive

**Because each "no" points at a different work queue, with a different owner.** The first feeds product decisions, which capabilities are missing and which are not worth building. The second feeds content work, which documentation pages need writing.

Confusing them is the classic mistake of documentation assistants. The team sees many "no"s, concludes documentation is lacking, and starts writing pages to solve what is actually a functional limitation. Or the reverse, it dismisses as "out of scope" questions that were perfectly covered and only missing a wiki page. Months of effort in the wrong direction, with the feeling of improving something.

## Each "no" in its own layer

In the plant-floor assistant we maintain for an industrial company, the two kinds of no live in different layers of the system, deliberately.

The product limit is answered without searching anything, with an official text that comes from a versioned catalog. The model identifies the case; it does not write the text. That keeps product policy consistent, auditable, and independent of a generator's mood.

The documentation gap, by contrast, can only be declared after searching. And it leaves a trail. Every turn records a short unmet-need label, drawn from a controlled vocabulary rather than free text. Those labels turn the no's into data, and the data into two separate work queues.

## The nuance that took us a while

Detecting missing documentation is less obvious than it looks. In a large corpus, almost any question finds some fragment above the similarity threshold, so the threshold does not detect the gap. In our first test round, five out of six "outside the documentation" cases slipped through that way. What did detect the real absence was the documentation agent itself, with its own "no match" verdict, and we had to redesign the dispatcher to listen to that signal and leave every relabeling audited.

The moral is not technical. **It is that an assistant that says "no" well is worth more than one that says "yes" to everything, and that behind a good "no" there is more engineering than meets the eye.**

The homemade audit costs one afternoon. Gather your assistant's last twenty negative answers and label each one. *Limit or gap?* If you cannot label them, neither can your system. That is exactly the project.

If your internal knowledge lives scattered across documents and systems, this is what we solve with the [assistant over your internal documentation](/en/services/corporate-knowledge).
