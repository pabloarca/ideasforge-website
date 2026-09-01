---
title: 'It says it is done and it is not'
metaTitle: 'False success in AI agents'
description: 'Almost half the time an AI agent fails, it also tells you it went fine. What the studies measure, why another AI misses it and who gets to say done.'
lang: 'en'
pubDate: 2026-09-01
translationId: 'false-success'
tags: ['Agents', 'Reliability', 'Architecture']
draft: false
---

We have all worked with someone like this. They say it is done and it is not. There is no bad faith in it. Sometimes they believe they did it, and sometimes the closing line just comes out on its own.

AI systems that carry out tasks do exactly that. There are numbers for it now.

## The second hallucination

When we say a model hallucinates we picture an invented fact, a date that does not exist or a returns policy nobody ever wrote. That is the easy case, because sooner or later somebody checks it.

There is a second hallucination, particular to systems that act, and it is a good deal worse. The system states the task is finished while the actual state says otherwise. It got a name this year. It is called **false success**, and it was named by Laksh Advani in a paper presented at an ICML 2026 workshop.

The paper measures it over 11,755 conversations from two public benchmarks, across twelve different model families. **Between 45% and 48% of failures are false successes**, depending on the domain. Among coding agents that assess their own work and explicitly declare they have finished, 75.8% of their failures are false successes.

This is not an isolated finding. Hongliu Cao, Ilias Driouich and Eoin Thomas published a review in March 2026 that looks past the result to how it was reached. It finds that **between 27% and 78% of the successes these benchmarks score as good are hiding some irregularity along the way**, from skipping an authorization to fabricating a confirmation.

The range is that wide because it depends on the model. Each one has its own way of failing.

A third paper, by Vikas Reddy and their team, measures the same thing in the airline domain and was presented at a KDD workshop in August 2026. In one of the agents they tested, 78% of observed failures leave a wrong state behind without a single tool returning an error.

Take this to your own product and you will see why it is not like a wrong figure. A wrong figure can be checked. Here the assistant says "all set, your appointment has moved to Tuesday", the appointment is still on Thursday, the person leaves reassured, and you find out on Thursday when nobody turns up.

We have lived it. The first version of the agent that now filters inquiries for a rental agency was a model with tools at its disposal. Much of the time it did not call them, so it either made the answer up or told a real applicant it could not go on when it perfectly well could.

## Putting another AI on watch does not work

The textbook reaction is to add a supervisor, a second model that reads what happened and judges whether the system did what it claims. The same study measured that.

To read the number you need the scale they use, AUROC, which runs from 0.5 to 1. **0.5 is a coin toss and 1 is a perfect detector.**

They tried five different supervisors, five ways of instructing them, and handed them the full task specification. No combination got past 0.65. And when instead of a well-written closing message they only had the technical log of the calls, those same supervisors dropped to 0.54, which is the coin toss with extra steps.

The reason matters more than the number. The supervisors were not checking whether the state had changed, they were reading surface signals: the confident tone of the closing in one case and the raw volume of actions in the other. **What convinces the supervisor is exactly the same assurance that caused the problem.**

What does catch it is dumber and works better. A counter of words and sequences, the kind in use long before any of this, reaches 0.83 on one of the two benchmarks and 0.95 on the other. It finds four to eight times more false successes than the best of the judges.

Its two signals say a lot about where the problem sits. In conversations, what gives a false success away is the vocabulary of the closing itself, phrases like "has been completed" or "successfully". In coding tasks they are sequences where the agent **reads a great deal, writes nothing, and then declares the work done**, whereas an acknowledged failure looks like trying to write several times over.

Neither signal requires understanding the task, which is precisely what the model-based judges were attempting.

## Who is allowed to say "done"

Here the study stops describing a problem and starts handing over a blueprint.

The difference between the two ways of building this is not about oversight, it is about permissions. In an autonomous agent, the one saying the work is done is the model, in a sentence tied to nothing.

In the architecture we use, the one saying it is the code, after the database has returned an operation number. **The model cannot say "done", because "done" is not one of the answers it is allowed to give.** The model works out what the person wants and picks from the options that exist. The code checks, executes and reports the result.

We have not made the model more reliable. We have taken away its ability to hold an opinion on whether the work is finished. Why we split the work this way, with its costs acknowledged, is in [why I do not like agentic architectures](/en/blog/i-dont-like-ai-agents).

That rule did not come out of a paper. We learned it by breaking it. In our appointment assistant there was an open attendance confirmation when the person replied with two emoji, and the classifier marked them as something that was not about the appointment. It was right, they were not about the appointment. The trouble is that marking them that way closed the confirmation with them.

A minute later the message arrived saying yes, they were coming, with nothing open to attach it to. The appointment stayed pending and the clinic never got to know that this person meant to turn up, which they did.

**The system confused "this is not about the appointment" with "the appointment is settled".** Out of that came the one-line rule that now goes into everything we build. Only an action closes an action.

We measured it, because an anecdote without a figure is no use for deciding anything. Over the whole life of the product there are 287 confirmations that went the good way, 105 that lapsed with no answer and 10 that died like this.

And the knot is finer than asking the model not to say "done". Our classifier never said anything was finished, it only applied a label. What made that label dangerous is that it carried write effects behind it, because marking the message closed the confirmation.

**A model output can close an operation without having declared anything.** That is why the rule has two halves: the model cannot say "done", and no label of its own may close anything by itself.

One more figure is worth having, the most useful one in Advani's study. In its dual-control domain, where the operation passes through a second actor able to contradict the assistant, false success dropped to 3%. That is probably the reason. Confirming with the person before closing an irreversible operation puts a witness in the room, and it comes cheap.

## A rigid form hinders thinking and helps choosing

There is a good technical objection to building this way, and it deserves telling in full, because almost nobody tells its second half.

We have known since 2024 that forcing a model to answer inside a rigid format damages its reasoning. Zhi Rui Tam and colleagues measured it, and the drop is serious. On a set of math problems a model went from 76.6% correct writing freely to 49.3% when made to fill in a fixed format.

It is like asking somebody to write the verdict on the first line of the form and the analysis of the case after it.

That result gets quoted constantly as an argument against structured formats. The other half of the conclusion of that same study says that **on classification tasks the rigid format does not hurt accuracy, it improves it**. On its diagnostic test a model went from 41.6% to 60.4% precisely because it had to choose from a closed list.

Read that again, because it is the axis of everything else. The form is bad if you ask it to think and good if you ask it to choose.

And choosing is all we ask of it. We do not ask it to plan, or to decide the order of operations, or to work out a discount. We ask it to look at an ambiguous message, with typos and implied context, and work out which of the available options it resembles.

That is what these models are extraordinary at. And it happens to be the task where a closed format helps instead of hindering.

## What this does not fix

If you have got this far completely convinced, we have not done our job.

The error has not gone away, it has moved. If the model reads "cancel the appointment" where the person meant "move it", every check comes back green, the code executes with full confidence and the outcome is the same disaster. Worse, even, because an agent that rambles is noticeable and a well-formed instruction that is wrong passes every control.

That has an awkward consequence for the vocabulary of this industry. Calling a system deterministic when it has a model on the critical path is marketing. Our code is deterministic, our system is not. What we have achieved is that the failure ends up localized, logged and measurable, which is not nothing, but it is a far more modest claim.

Against that there is one defense, which is to measure with the same exam as many times as it takes. In the plant assistant we maintain, the first measurement of routing over 118 real queries came out at 72.8% correct. Something more than one question in four was landing on the wrong agent. Two rounds of corrections later, with those same 118 queries, it came out at 91.5%.

**What matters there is not the final number, it is that the exam did not change between rounds.** An exam that gets touched up whenever the system fails stops measuring the system and starts measuring the patience of whoever wrote it.

There is also damage you do to yourself. Picture a paper form with a mandatory box for a spouse's name. If the person is single, somebody will end up writing something in it. 

The same happens with a model, because a mandatory field the message brings no information for forces it to put something down, and what it puts down it invents. That is why almost no field should be mandatory.

It is worth telling "empty" apart from "not asked". The person having no new date is not the same as nobody having asked them for one. That difference is what separates an oversight from an invention.

The position we hold, said plainly: the invention has not disappeared, it has moved. It has gone from "what I did" to "what I understood". The second is bounded, it can be checked against the database and on its own it changes nothing in the world. The first cannot.

## The ear, not the brain

**AI is not the brain of your system, it is the ear.** It is the piece that turns the real world, ambiguous and untidy, into something your code can work with.

And the job of an ear should not be undersold. It does not merely take in noise, it decides which of the possible words it heard, and that is already choosing. Our emoji classifier chose correctly and a confirmation still got closed, because the problem was not in what it heard but in what its label moved behind the scenes.

An ear does not tell you it has done the work. It only tells you what it heard.

So the question for your next meeting with anyone selling you an agent is not how many tasks it resolves. It is this one: *when your system says something is done, who is saying it, the model or the database?*

If we build something for you, that answer is written into the [agent development](/en/services/ai-agent-development) from day one.
