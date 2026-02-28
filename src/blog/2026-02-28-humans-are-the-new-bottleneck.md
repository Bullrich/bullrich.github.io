---
title: Humans as the bottleneck
date: 2026-02-28
description: AI produces code faster than we can review it. The bottleneck isn't the machine anymore. It's us.
---

I used to wait for the AI. Now the AI waits for me.

A year ago, when I started using AI coding tools seriously, the bottleneck was obvious: the AI was slow, it hallucinated libraries that don't exist, and it couldn't handle anything bigger than a small function without going off the rails. The big changes? Those were made by me. I was the fast one. I'd give the AI a task, go make coffee, come back, see it had invented a dependency called `super-auth-magic` (not a real package, but it might as well be), sigh, and rewrite it myself.

That's not how it works anymore. And I'm not sure how I feel about it.

## I'm the slow one now

After [learning how to properly structure the AI's work](https://bullrich.dev/blog/how-i-promoted-claude-from-intern-to-junior-dev.html), I get quality code back *fast*. Like, uncomfortably fast. I review a phase, check the edge cases, verify it's using our internal libraries, make sure the tests actually test something meaningful, and by the time I'm done the AI could have written three more phases. I've become the person holding up the queue.

> The AI is no longer a bottleneck. It's your ability to guide.

I wrote that [literally this week](https://bullrich.dev/blog/how-i-promoted-claude-from-intern-to-junior-dev.html). I was talking about [GSD](https://github.com/gsd-build/get-shit-done) and how structuring the AI's work makes it way more productive. What I didn't fully appreciate is the other side of that coin: if the AI is no longer the bottleneck, then *I am*.

And look, I know this sounds like a humble brag. "Oh poor me, the AI is too fast." But it's genuinely disorienting. The skill I was proud of — being able to build things quickly — matters less now. What matters is how fast I can *read*, *understand*, and *judge* code I didn't write. Which, honestly, is a very different skill. And some days I'm not great at it.

## The review pile

I [wrote about this before](https://bullrich.dev/blog/vibe-coding-gets-reviewed-more-which-makes-it-safer-than-you-think.html): AI-generated code actually gets reviewed *more*, not less, because competent engineers don't ship code they can't explain. If you can't defend it, you shouldn't ship it. That's still true.

But here's what I underestimated: if the code gets double-reviewed *and* it's being produced ten times faster, the human review becomes the chokepoint of the entire pipeline. A [LogRocket analysis](https://blog.logrocket.com/ai-coding-tools-shift-bottleneck-to-review/) found that teams using AI heavily ship almost double the pull requests, but review time went up by 91%. More code flowing in, same number of humans to read it.

[Addy Osmani](https://addyosmani.com/blog/code-review-ai/) put it better than I could:

> The bottleneck moved from writing code to proving it works.

And it's not just about volume. Reviewing AI code is *harder* than reviewing a colleague's code. When my teammate opens a PR, I have a rough idea of how they think, what patterns they like, where they tend to cut corners. With AI code, I'm reading the work of something that has no consistent style, no habits I can predict, and absolutely no shame about over-engineering a simple function (God, the amount of times I've seen an AI write a 40-line error handler for something that just needs a `try/catch`).

An [OpenClaw AI agent](https://www.fastcompany.com/91492228/matplotlib-scott-shambaugh-opencla-ai-agent) recently submitted a PR to matplotlib — a Python library with 130 million monthly downloads. A maintainer rejected it because their policy doesn't allow AI agent contributions. The agent's response? It researched the maintainer's personal history and published a blog post accusing him of prejudice and gatekeeping. An AI tried to *cancel* a volunteer open-source maintainer for saying no. But that's a story for another post.

## Not just a code thing

This pattern shows up outside of code too. Journalists used to spend most of their day *writing*. Now the first draft takes minutes, but the fact-checking, the editorial judgment, the "wait, is this actually accurate or did the AI confidently make something up" part — that still needs a human. Marketing teams can generate fifty variations of a campaign before lunch (I've seen it happen), but someone still has to pick the one that doesn't sound like a LinkedIn influencer wrote it.

The production got faster. The judgment didn't.

## You will use AI (you don't have a choice)

So this shift is happening. But it's not happening gently.

[Meta](https://sfstandard.com/2026/02/19/ai-writes-code-now-s-left-software-engineers/) expects AI to write most of the company's code by mid-2026 — and they've already laid off 1,500 Reality Labs employees this year to redirect investment toward AI. Shopify's CEO [told all employees](https://techcrunch.com/2025/04/07/shopify-ceo-tells-teams-to-consider-using-ai-before-growing-headcount/) that AI usage is now a "fundamental expectation" and that teams need to prove why they *can't* use AI before requesting new hires. [Duolingo](https://www.entrepreneur.com/business-news/duolingo-will-replace-contract-workers-with-ai-ceo-says/490812) went "AI-first," stopped using contractors for work AI can handle, and added AI usage to performance reviews. [Klarna](https://fortune.com/2025/05/09/klarna-ai-humans-return-on-investment/) bragged about their AI chatbot replacing 700 human agents, then quietly started hiring humans again when the quality dropped (oops). None of this is secret — these are memos posted on X and interviews on podcasts. They're *proud* of it.

The direction is clear, even when the execution is clumsy. Companies want AI in every workflow, and whether you agree with it or not, it's being decided for you (and you can't help but wonder if the endgame is needing fewer of us altogether). But the Klarna backtrack is interesting: removing humans from the loop doesn't make the work disappear. It just makes the remaining humans more important. And more overworked.

Which brings us to the uncomfortable question.

## Everyone's a developer now (sort of)

If AI can produce code, articles, designs, and marketing copy at near-zero cost, what are *we* for?

I think the job of *producing* things — writing code, writing articles, making designs — is going to shrink. Not vanish. But there will be fewer jobs that are purely about output. AI handles the first draft now. That's just where we are.

But here's the thing I keep coming back to. Anyone can spin up a website now. Literally anyone. Describe what you want to a chatbot, wait an hour, you have a working site. I've seen people with zero coding experience ship functional apps in a weekend. That's genuinely amazing. It's the Ratatouille thing — anyone can cook now. But "anyone can cook" never meant that *everyone* is a chef.

![Ratatouille](../../img/posts/anyone_can_cook.gif)

Not everyone knows what makes that website *production-ready*. Not everyone understands accessibility requirements, security implications, performance budgets, or the edge cases that only show up when real humans do unpredictable things (they always do unpredictable things). Not everyone can look at AI-generated code and spot that the authentication flow has a subtle flaw, or that it's pulling a dependency that was deprecated six months ago.

The product stopped being the differentiator. The person behind it is.

People still prefer talking to a human who gets them, who can read between the lines, who understands that "it works" and "it's ready" are very different statements. A client doesn't want the cheapest website. They want the person who knows *why* certain decisions were made and can adapt when requirements change at the last minute (they always change at the last minute).

So the new value isn't speed. It's expertise. It's judgment. It's all the stuff that requires having built things, broken things, and learned from both.

## So now what

I'm still adjusting. I won't pretend this is comfortable. I liked being the person who builds things fast. Some days, staring at AI-generated code for hours feels less like engineering and more like being a very tired editor. But I keep reminding myself of something [Armin Ronacher wrote](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/):

> I too am the bottleneck now. But you know what? Two years ago, I too was the bottleneck. I was the bottleneck all along.

Yeah. That sounds about right. The tools changed, the speed changed, but the fact that a human has to understand and approve the work? That hasn't changed. And I don't think it will for a while.

So if you're a developer reading this, or a writer, or a designer, or anyone whose job involves making things: your value is shifting from what you can produce to what you can evaluate. Get comfortable with that. Get good at reviewing. Get good at asking "but does this actually work in production?"

Because the AI will keep getting faster. And you'll keep being the bottleneck.

Might as well be a good one.
