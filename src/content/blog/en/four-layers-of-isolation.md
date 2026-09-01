---
title: 'Four layers between your company and the one next door'
description: 'One assistant answers several companies and none of them can see another. The four layers that guarantee it, a lesson about permissions and the redesign that erased a whole class of failures.'
lang: 'en'
pubDate: 2026-08-21
updatedDate: 2026-08-23
translationId: 'four-layers-isolation'
tags: ['Security', 'Architecture', 'Agents']
draft: true
---

One of our assistants answers business questions for several companies at once. Same software, same models, everyone's data living in the same warehouse. From day one it has carried the question every data owner asks, with good reason. What stops, exactly, one company's answer from carrying another company's numbers inside.

We already told in [why we don't like agentic architectures](/en/blog/i-dont-like-ai-agents) how we inherited a filter that lived in the model's instructions and why we retired it. **An instruction is not a guarantee.** This article tells what we built afterwards, four layers designed so that each one absorbs the failure of the one before it, and an ending where isolation stopped being a filter and became the shape of the data itself.

## The assistant is blind by design

A model's context is everything it can read while answering. In this assistant, the context of each conversation holds only the worksites of the person asking. **The assistant does not choose to stay quiet about other companies. They are simply absent from its world**, so nobody can coax out of it a figure it never held. Isolation starts before the conversation does.

## A typo cannot jump the fence

The second layer protects the most human case there is, the name typed halfway or with two letters swapped. The assistant corrects site names so people do not have to type exact denominations, but that correction searches only inside the sites the writer is authorized for. A close match with another company's site never even becomes a candidate. **Convenience moves entirely inside each person's perimeter instead of opening doors through it.**

## An allow-list has the last word

Before any query is built, code checks the request against an allow-list, a closed list of the values permitted for that user. The model may have understood whatever it likes. If an identifier is not on that person's list, the query never comes into existence. Interpretation stays with the model, which is its job, and the decision stays with code that runs the same way every time.

## An empty list means an empty answer

The last layer lives inside the query itself and trusts none of the previous three. Every query carries an unconditional filter. If the permission list arrives empty for whatever reason, the resulting condition matches no rows and the system returns nothing. **It fails by shutting the door, never by leaving it open.** The security must survive a failing model, and a failing us.

## The lesson the permissions taught us

Along the way we picked up a lesson that was not in the blueprint. This assistant's permissions started out inherited from a table meant for something else, the subscription list of a report that already existed. It worked almost always, which is the worst way for something to work, because the failures arrive late and without a pattern. The real fix was not patching the inheritance. It was giving permissions an identity of their own, with an explicit expansion of who sees which site. **Permissions are a concept in their own right, not a by-product of another table.** Every system that treats them as a by-product is incubating its incident.

## And then we moved the ground

The four layers protect a design where every company's data lives together and a filter decides. The definitive step was changing that design. Each company moved into its own schema, its own sealed compartment inside the warehouse, and the combined view joins them with the company stamped on every row. **Adding two companies into one figure stopped being a failure the layers had to catch and turned into a query the database cannot express.**

The effect showed up in the worry list. A loose name comparison that had kept us on edge stopped mattering the same day, because there was no fence left for a lookalike to jump. **Repairing the architecture erases the class of failures, not the single case.** Since then that has been our yardstick for any new safeguard, how many failures it makes impossible rather than how many it promises to catch.

If you are evaluating an assistant that will touch real data, one razor question is enough. *What happens when the permission list arrives empty?* Whoever built it well answers in one sentence, the door shuts. Whoever did not starts telling you about the prompt. This is how we build in [AI agent development](/en/services/ai-agent-development), the deeper story of data, records and sovereignty lives in [GDPR-compliant AI](/en/gdpr-compliant-ai), and both come from the same systems.
