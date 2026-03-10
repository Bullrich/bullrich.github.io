---
title: The AI review playbook
date: 2026-03-10
description: What I've learned from reviewing AI-generated code. It's not about catching bugs, it's about catching patterns.
---

I review AI code the same way I review anyone else's code. I open the diff, read it, check if it makes sense. There's no special process, no AI-specific checklist taped to my monitor. It's just a PR to me.

After months of doing this daily, I started noticing patterns. Not bugs exactly; it's usually fine on the obvious stuff. It's more like... tendencies. Habits. The kind of thing you'd flag in a one-on-one with a junior developer if you saw it repeatedly. Except the AI doesn't have one-on-ones, and it doesn't learn from the last time you told it.

So here's what I keep catching. Consider it less of a playbook and more of a field journal.

## The reinvention problem

This is the one that gets me the most. The AI will hit a problem and immediately try to solve it from first principles. Which sounds admirable until you realize the problem was solved years ago by someone who documented it on a GitHub issue or a Stack Overflow answer.

I had a bot trying to debug a WebRTC connection issue. It spent five loops making tiny tweaks, adjusting timeouts, changing config parameters, reordering initialization calls. Each attempt was reasonable in isolation. None of them worked. I finally stepped in and said: "This is WebRTC. Millions of people use this. Someone has hit this exact problem before. Go look at GitHub issues and tutorials."

It found the answer in about thirty seconds. Five loops of creative guessing, and the fix was sitting in a GitHub comment from 2023.

It doesn't *refuse* to check existing resources, it just doesn't think to. Its default mode is to reason through a problem using what it already knows, which is exactly how you'd expect a model trained on code to behave. But in practice, a real developer facing an unfamiliar API would google it first and start hacking second. The AI does it backwards every time.

## The "I'll build it myself" instinct

Related but different. This is when the AI runs into something that already exists in your project, or your org, and decides to build a new one from scratch.

I watched it try to set up a cron job by implementing its own scheduling logic. From zero. Custom interval parsing, retry handling, the whole thing. Neat code, actually. Problem is, we have an internal framework for this. Every team uses it. There's documentation, examples, a whole Slack channel dedicated to it. It just didn't know to look.

I had to stop it and say "go check how other projects in the org do this, because nobody here rolls their own cron jobs." And sure enough, once pointed at the internal framework, it implemented the whole thing correctly in a fraction of the time.

This is the pattern that scares me the most, honestly. Not because the code is bad, it's usually fine, but because it introduces something *nobody else in the company has ever seen before*. And now someone has to maintain it. And that someone won't know why it exists when there's a perfectly good framework sitting right there.

## Over-engineering for sport

Oh, this one. God, this one.

The AI loves abstractions. It will wrap a simple function in three layers of error handling, add generics where none are needed, create helper classes for things that could be a one-liner. I've seen it write a 40-line error handler for something that just needed a `try/catch` with a log statement.

I think this comes from its training data. It's seen a lot of enterprise code, a lot of production-grade patterns, and it applies them everywhere, even when you're writing a utility function that three people will ever see. Not everything needs to be extensible. Not everything needs a factory pattern. Sometimes a function is just a function.

The tricky part is that over-engineered code *looks* professional. It passes review if you're skimming; you have to actively ask yourself "does this need to be this complex?" and the answer is usually no.

## Tests that test nothing

This one's subtle and it took me a while to catch consistently. The AI will write tests. It'll even write a *lot* of tests. They'll all pass. And you'll feel good about your coverage numbers.

Then you actually read them and realize half of them are just asserting that the code does what the code does. `expect(result).toBe(result)` energy. Or they mock so aggressively that the test is no longer testing the thing it claims to test, it's testing whether the mocks work correctly.

We have a testing framework at work. Specific patterns, specific utilities, specific ways of setting up fixtures. The AI defaults to whatever testing patterns it knows best, which are almost never *our* patterns. Every time, I have to redirect it: "Use our test utilities. Look at how the tests in this folder are structured. Follow that."

It's the same song every time. The AI produces *a* correct answer. Just not *our* correct answer.

## The AI can't see

This one's specific to frontend work but it's worth mentioning because it's so obvious once you think about it.

It will generate a component, wire up the styles, handle the state management, and the page will look completely wrong. Overlapping elements, broken layouts, text that's unreadable. It doesn't know because it can't see. It's working from code, not from the rendered output. It has no idea what the page actually looks like.

When I use GitHub Copilot for frontend work, I now require it to attach a screenshot of the rendered page with every PR that modifies the UI. It sounds basic, but it changed everything. The AI can't evaluate visual output, but *I* can, and if the screenshot isn't there, the PR doesn't get reviewed. Simple as that.

This is probably the clearest example of where the human in the loop isn't optional. The AI can generate all the CSS it wants. Someone still needs to *look at the screen*.

## The rabbit hole

Sometimes the AI just... goes somewhere. You give it a task, it hits a snag, and instead of stopping to reconsider, it starts solving increasingly tangential problems. Each step makes local sense. The overall direction makes no sense at all.

I've seen it refactor an authentication flow to fix a display bug. I've seen it add a new dependency to work around a problem that was caused by a typo. The classic rabbit hole, where each "fix" creates a new problem, and the AI gamely tackles that new problem too, going deeper and deeper without ever questioning whether it should have turned around three steps ago.

The hardest part of catching this is that you have to notice *what's not there*. The AI won't tell you "hey, I went on a tangent." The diff looks like a series of reasonable changes. You have to zoom out and ask "wait, why are we touching this file at all?"

## It's not a checklist

I said at the start this isn't a checklist, and I meant it. I don't go through these items one by one when I review AI code. I just read the diff. But I've started developing a kind of instinct for when something feels off, when the code is *too* clean, when more files changed than the task should require, when a solution feels invented rather than discovered.

The common thread across all of these patterns is that the AI doesn't have context. Not project context, not org context, not "I googled this and found a blog post from 2021 that solved it" context. It has code context. And code context alone isn't enough.

> The AI is a great developer who just started at your company yesterday.

That's the mental model I keep coming back to. Talented, fast, eager to help. But it doesn't know where the documentation lives. It doesn't know about the internal framework. It doesn't know that the last person who tried to roll their own scheduler got a very stern Slack message from the platform team. It doesn't know what the page is supposed to *look* like.

And that's what review is for. Not to catch bugs, the AI is honestly pretty good at not writing bugs. But to catch everything else. The patterns, the conventions, the "we don't do it that way here" stuff that only lives in people's heads.

The bottleneck is still us. Might as well get good at it.
