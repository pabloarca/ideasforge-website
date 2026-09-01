---
title: 'Your team keeps asking things that are already written down'
metaTitle: 'AI knowledge base, what actually breaks'
description: 'Putting a model on top of your documents looks like the obvious answer. A 2026 benchmark on enterprise documents says plain keyword search beats vectors.'
lang: 'en'
pubDate: 2026-09-01
translationId: 'already-written'
tags: ['Knowledge', 'Architecture', 'Method']
---

It happens in every company past a certain size. Somebody asks on the internal channel about something that is written down. It is in a procedure, in an email from eight months ago, or in the wiki that was set up with great enthusiasm and that nobody opens any more.

It is not laziness, it is arithmetic. **Asking a colleague takes one message. Looking it up yourself takes a good while**, with the added risk of landing on the old version of the document and never realizing. As long as the sum works out that way, people will keep asking. And they are right to.

Out of that comes the project almost every company considers sooner or later. **Put a language model on top of the documentation** so it answers instead of the colleague.

It is a good idea. What usually fails is the part nobody argues about.

## The result that stops you

In May 2026 **EnterpriseRAG-Bench** was published, a benchmark built for exactly this. It does not use web pages or Wikipedia articles, which is where almost every earlier measurement came from. It uses **roughly half a million enterprise documents** spread across nine sources anyone would recognize: Slack, Gmail, Drive, Jira, Confluence, GitHub.

And it does something we appreciate. **It adds noise on purpose**, with documents archived where they should not be, near-duplicates and versions that contradict each other.

It is worth saying what it is before leaning on it. **That corpus is generated, they are not any real company's documents.** The authors simulate a fictional technology company. That limits what you can conclude from the absolute scores. What it does support, because all three systems compete over the same material, is the ranking between them. And the ranking is a surprise.

Over that corpus they measured three ways of searching. The headline result is this.

**Plain old keyword search scored 68.8% correct. Vector search, the one with embedding models that everybody sells as "semantic search", came in at 51.4%.**

Seventeen points behind. And losing to a technique published in 1994.

## And it does worst exactly where it should win

That invites a fair objection. Keywords will win on literal questions. Vectors exist for the questions phrased in other words.

The benchmark separates those questions into their own category. **Vector search scores 32.8% on them.** That is its home ground and it is its worst mark.

The authors point to an explanation that matches what we see in production. Embedding models learned from internet text, and **your company does not talk like the internet**. You have your own acronyms, project names that mean nothing outside the building and a specific word for the thing the rest of the industry calls something else. The model has never seen that vocabulary, so it places your documents on a map that is not yours.

## What none of them can actually do

There is a figure in that study worse than the ones above, and almost nobody mentions it.

When the question asks for **everything**, the kind that goes "give me all the incidents for this client" or "which suppliers are approved for this", **the three systems land between 35% and 40%**.

And that is exactly the question somebody with a job to do asks. Nobody wants a document, they want to be sure none is slipping past them. A system that gets 40% right there is not merely weak. It **hands you an incomplete list with total confidence**, which is worse than handing you nothing.

## One thing that study does not prove

Here it is worth slowing down, because the same study carries a number that looks good and is not.

In the category of questions whose answer is in no document, all three systems score 100%. It sounds like they know how to say "I don't know". The study cannot tell us that, because a category built so that nothing in the corpus matches is a much easier exam than a real gap, where something almost matches and the system has to decide it is not enough.

We say this because the temptation to use that number in our favor was strong and it would have been a trick. Knowing when to stay quiet is still unmeasured.

## How we build a knowledge base that does answer

What we take from it is not that vectors are useless. It is that **a single search engine over everything a company knows is the wrong architecture**, whichever side wins the comparison.

In the plant-floor assistant we run in production for an industrial company there is no single search engine, there is an orchestrator handing each question to one of half a dozen specialists. And the work that moved the result was not switching models.

**It was calibrating who each question gets sent to. Routing accuracy went from 72.8% to 91.5% over 118 real queries**, the ones people actually asked, not the ones we came up with.

Along the way we tried a cheaper model. It lost ten points overall. On the cases where two specialists could both fit, it **collapsed from 89% to 44%**. That is the kind of thing a public benchmark will never tell you about your own company.

## The question to keep

When somebody offers you an assistant over your documentation, the demo is going to work. It always works, because whoever prepares it picks the questions.

**Ask for something else: that they measure it with your real questions and show you the number.** A hundred queries your team genuinely makes, with the correct answer written down beside each one. And the accuracy on the table.

If there is no number, there is no system. There is a demo, which is a different thing and shows within a fortnight.

It is the same idea we tell in [data before prompts](/en/blog/data-before-prompts). How it gets built is in [the assistant over your internal documentation](/en/services/corporate-knowledge).
