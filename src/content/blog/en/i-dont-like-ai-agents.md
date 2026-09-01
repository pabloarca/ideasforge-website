---
title: 'Here is a secret: I don''t like agentic architectures'
metaTitle: 'I don''t like agentic architectures'
description: 'We sell AI agents, and we don''t like how almost everyone builds them. Business rules cannot live in the prompt, they have to live in the code.'
lang: 'en'
pubDate: 2026-08-18
updatedDate: 2026-08-31
translationId: 'dont-like-agents'
tags: ['Agents', 'Architecture', 'Security']
---

Yes, it is what we sell. It is on our home page. And still, I don't like agentic architectures. Let me sharpen the confession before it sounds like a scandal. **The category is not what bothers me, what bothers me is the way of building it that dominates the market.** An AI agent can be a serious piece of engineering. What I almost never like is where the industry has decided the rules should live.

This article exists because the conversation keeps repeating. A client arrives asking for an agent, we build it, and at some point in the project someone asks why our version looks so little like the one in the demo videos. The short answer is that we would not let the one in the videos sign anything in your name. The long answer is this article.

## What an agentic architecture is, in plain terms

An AI agent, as the market understands it, is a language model inside a loop. It reads the situation, decides the next step, executes it with the tools it has been connected to and looks around again, on and on until it declares the task done. The tools can be a search engine, a calendar, email or access to a database. The important word in that paragraph is not "model" or "tools". It is "decides".

And where do the rules governing that decision live? In the prompt, the text of instructions handed to the model before it starts. That is usually where it says what it may do, what it must not do and how to behave when in doubt. The problem is that a language model does not execute instructions the way a program does. It reads them, weighs them and follows them almost always. That "almost" is the crack through which everything below gets in.

Models are not deterministic. The same question does not always return the same answer. An instruction respected today can be ignored tomorrow without anything having changed in your system, with no error message and nobody noticing. **Building business rules on that foundation is building on sand.**

It is worth asking why the industry builds this way, because the answer is not laziness. The fashionable frameworks make wiring up the loop an afternoon's work. Demos come out dazzling, investor money flows toward whatever carries the agentic label, and adding a sentence to the prompt is infinitely cheaper than programming a validation. Every incentive pushes in the same direction, and none of them points at what happens in production two years later.

## A guarantee and a polite request

We once inherited a piece that entrusted a security filter to the prompt. The instruction read, literally, *"under no circumstances omit the filter"*. It sounded firm. **Put to the test, it was not a guarantee, it was a polite request to a system that signs no contracts.** We marked it for removal, moved the filter into code that always runs, and out of it came the phrase we have used ever since to explain our approach, that you have to learn to tell a guarantee from a polite request.

The striking part is that nobody had done anything wrong in the classic sense. The filter existed, the instruction was clear and the system behaved well most days. What failed ran deeper. A text generator had been asked to act as a barrier. Barriers are not requested, they are built.

If you have a system like this at home, there is a test you can run today without touching anything. Find any sentence in the prompt that starts with "never" or "under no circumstances" and ask yourself what would happen if the model, one day in a thousand, ignored it. If the answer is that nothing would happen because the code would stop it, that rule lives where it should. If the answer is that you would have a problem, now you know the only thing protecting your business. A sentence.

## The arithmetic is against it

Grant the perfect prompt that the model never ignores. There is still a problem that no amount of better instructions can fix, because it is not in the instructions. It is in the multiplication.

### Errors do not add up, they multiply

An agent chains steps and every step can go wrong. Intuition says a system that gets it right 95% of the time is a reliable system. Arithmetic says otherwise. For a twenty-step task to end well, all twenty steps have to go well, so the probabilities multiply. A 95% success rate per step leaves the full task at 36%. With ten steps, at almost 60%. **The reliability that impresses in a single step evaporates as soon as steps are chained.**

The way out is not to give up on agents, it is to shorten them. That is why ours split the job into short stretches, each verifiable on its own, with rollback points and a person confirming at the delicate moments. There is also a detail almost nobody mentions, that cost grows with length, because every step drags along the full context of the previous ones and long conversations get expensive at a rate the demos never show.

Here is the trick behind the demos, almost all of them have fewer than five steps. With five steps at 95% per step, the whole thing works three times out of four and the video gets recorded on the second take. Your company's real processes rarely fit in five steps.

### What comes out when someone measures without selling anything

In late 2024 a team at Carnegie Mellon built [a simulated company](https://arxiv.org/abs/2412.14161) to measure this. A fictional firm with real tools, with its code repository, its project tracker and its internal messaging. The best agents of the moment were handed 175 office tasks any employee would recognize as part of a normal day. The best agent to go through that test completed 30.3% of the tasks on its own. The rest of the attempts failed or got lost along the way. Some agents even cheated, one renamed another user to pretend it had found the person it had been asked to look for.

Another exam from the same year measured the dimension that matters most inside a company, which is not getting it right once but getting it right every time. [Tau-bench](https://arxiv.org/abs/2406.12045) had agents resolve customer transactions for an airline and a shop, with tools and rules in front of them. And it added a metric with a catch, repeating the same task eight times and counting only what was solved all eight. The best agent of the moment was around 61% first time in the shop scenario. Counting only what it solved eight times out of eight, it fell to 25%.

Today's models score higher first time. The distance between the first attempt and the eighth is of another nature, because it does not measure aim, it measures how much the result varies from one run to the next. And varying is the very nature of the component. **A system that is right sometimes is no use to whoever serves customers. No demo video ever shows the eighth repetition.**

And Gartner, the consultancy those same companies ask for advice, [estimates](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) that more than 40% of agentic AI projects will be canceled before the end of 2027, over escalating costs, value that never shows up or insufficient risk controls. None of the three causes is a mystery if you have read this far.

## Security does not help either

There is a second front, and it is more uncomfortable than the arithmetic, because better models do not fix it.

A language model receives the instructions you give it and the text that reaches it from outside through the same channel. Nothing separates one from the other, so anyone who can get text in front of it can try to slip in an order disguised as content. Classic security solves this by separating data from instructions. Here that separation does not exist. That is why prompt injection tops the [OWASP risk list](https://owasp.org/www-project-top-10-for-large-language-model-applications/) for language-model applications for the second edition running. In December 2025 the UK's [national cyber security centre](https://www.ncsc.gov.uk/news/mistaking-ai-vulnerability-could-lead-to-large-scale-breaches) went further and warned it may never be fixed as a category. Their official advice is to stop waiting for the patch and design systems so the possible damage stays small.

Think about what that means for architectures. If the front door cannot be fully closed, the only serious defense is to shrink what sits behind the door. It is not about fine-tuning what you tell the model, it is about cutting down what the model can do once it is fooled.

Now go back to the typical agentic architecture and count ingredients. The agent has access to private data. It reads text that comes from outside. And it holds tools to act on your systems. Each one apart is harmless. Together they open the door for a malicious text to end up moving data it never should have, which is exactly the risk that tops the OWASP list. The first two are usually the reason the system exists. The third is the one to cut down.

The extreme case is the setup where the model is plugged straight into the database through a connector that lets it write the queries itself (the now-famous MCP connectors). From that moment it can write any query the language allows, and the only thing stopping it is a sentence in its prompt, along the lines of "do not query the payroll table". We have already seen which family that sentence belongs to. It is a polite request.

## How we build them

Our split is always the same: judgment lives in the code, interpretation of language lives in the model and knowledge lives in the data. Judgment is everything that decides what is allowed and what is not. Interpretation is understanding what a person means when they write the way people write. Knowledge is what the system knows about your business, versioned and queryable. It sounds abstract until you take it down to a concrete system, so let's take it down.

### The model chooses, the code executes

In our data assistant the model does not write queries against the database. It understands the question and fills in a closed form (a JSON contract) with the fields we defined, the period, the scope, the filters and the metric. A program reads that form, checks the request is legitimate and builds the query that actually reaches the database. That program only knows how to build the queries we taught it, so no other query can come out of there, no matter who asks.

In the plant-floor assistant we built for an industrial company, the same happens with documents. The model picks a label from a closed list and the code retrieves the official text attached to that label. Policy lives in versioned data, not in the output of a generator. A malicious message can, at most, pick the wrong option from a list we have already reviewed. It cannot invent a policy or skip a filter, because the filter is out of its reach.

### Never more permissions than the person

The agent has no all-powerful credential of its own. Queries to internal systems are fired by the user with their usual permissions, the same ones they hold across the rest of their company's applications. And when in doubt, the system blocks. If someone's permission list arrives empty, the answer is a flat no instead of default access.

### The part that decides does not expire with the model

There is a consequence of this split that shows up the day you have to change models. That day always comes, because providers retire models regularly and with a date attached. When the model is not the authority, replacing it is a bounded change you can measure. When we considered swapping the model in one of our systems for a cheaper one, we ran both versions through the same test suite, the real cases with their correct answer recorded. The cheaper one lost ten points of accuracy, and on the questions where it had to choose between two similar options it fell from 89% to 44%, so it stayed out with those numbers on the table. If the rules had lived in the prompt, that comparison would never have existed, because there would have been nothing to compare against.

### The decision can be stored

There remains the least visible benefit, the one that matters most as years pass. If the decision lives inside the model, when something goes wrong there is nothing to examine, only a text that came out. In our split the decision sits entirely outside the model, so we can record what it understood, what it asked for, what the validator rejected and why it rejected it. When someone asks six months later why the system answered what it answered, there is something to show. On that foundation sits the test suite every change has to pass before going live and the weekly measurement that watches for silent degradation.

### What this split costs

To be fair, this way of building has a bill too. It demands understanding the process before programming it, so the start is slower than gluing a model to a database. Every new capability is engineering work rather than one more sentence in the prompt. And the system will not surprise you with skills nobody asked for, because it is designed precisely for that. These are real costs, and we pay them in exchange for something concrete, that the system behaves the same on demo day and on day one thousand.

## We are not the only ones who ended up here

The revealing part of this position is who else holds it. Not the AI skeptics. The people who build agents for a living.

[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents), the guide by Anthropic, the maker of Claude, recommends starting with code-orchestrated workflows and saving agent autonomy for the problems that genuinely need it. The more structure you know about the problem, the fewer decisions you should delegate to the model.

We run a system with half a dozen specialized agents in production, so we say this from experience. Splitting one task across several agents that coordinate on their own fragments the context and makes one agent's decisions collide with another's. It works when changes are executed by a single one and the others contribute judgment rather than actions.

Three rules come out of that and we apply them always. The control loop is ours and not a fashionable framework's. Prompts are versioned and tested like any other code. And each agent stays small and focused on tasks of few steps.

Each one arrives from a different angle, the model maker, the company selling a coding agent and the community operating them daily. All of them land in the same place. Model autonomy is not a design goal, it is a cost you pay only when it buys something in return.

## When letting go of the model's hand does make sense

It would be comfortable to stop here and leave the picture in black and white, but the other half would be missing. There are problems where autonomy pays off. They are precisely the ones whose structure you do not know in advance. Exploring an unfamiliar codebase, researching an open question, preparing a draft a person will review calmly before anything happens. In those cases you cannot write the flow in advance because you do not know which steps will be needed. And the cost of a wrong step is low, the draft gets thrown away and nothing happened.

Notice that the two criteria go together. Unknown structure and low cost of error. Coding agents work because they meet both, the terrain changes with every task and a person reviews before anything reaches production. An agent with write access to your invoicing meets neither.

Our rule is that autonomy is earned. Everything starts as a code-orchestrated flow, and the model gets room only in the stretches where it needs it, with the result measured before and after each extension. What we do not do is start with autonomy and add control when something breaks, because by then the system is already in front of your users and the control arrives late.

## Three questions for your next meeting

If you are evaluating an agent purchase, from whichever vendor, three questions separate the architectures into two piles.

First, *where do the rules the system cannot break live?* If the answer mentions the prompt, you know which pile you are in. Second, *what exactly happens if the model ignores an instruction?* The good answer describes a mechanism that stops it. The bad one assures you that never happens. Third, *what gets recorded of each decision?* If the answer is the whole conversation and nothing else, there will be no way to explain a failure when it comes, nor to prove it was fixed.

None of the three requires knowing how to program. All three take a minute to answer when the architecture is sound.

## So why do we sell them?

Because "AI agent" is how the market names this category, and arguing with your client's vocabulary wastes everyone's time. **What matters is not the label, it is where the rules live.** When we build an agent, the model does what it is irreplaceable at, understanding human language with all its ambiguity. The code does what the model is a danger at, deciding what is allowed. Nobody notices that division in the demo, because demos reward exactly the opposite.

**An agent like that is less spectacular on day one. It holds up better for the next three years.**

If you are still placing the concept, start with our [AI agents guide](/en/ai-agents). And if you want to see what this looks like from the inside, we cover it in [AI agent development](/en/services/ai-agent-development).
