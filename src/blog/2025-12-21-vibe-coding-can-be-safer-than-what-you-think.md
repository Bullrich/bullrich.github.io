---
layout: "layouts/blog.html"
title: "Vibe Coding gets reviewed more, which makes it safer than you think"
date: 2025-12-21
categories: blog
---
**TLDR**: AI Code will get reviewed more, not less because competent engineers don’t open Pull Requests for code they can’t explain.
## Reviewing the AI

A silly thing that I have discovered, after we had a big pivot into using AI as much as possible, is that, for code made by AI if **the author understands correctly what has to be done** it is actually more reviewed than regular code.
After working with teams that use AI, I have come to the conclusion that, when _responsible engineers are involved_, the code gets double of reviews.
## “Author’s” review

As an engineer, I feel ashamed if I submit a pull request of AI slop, which I don’t understand how it works. I need to be able to answer questions about my code. My colleagues trust that my capabilities, and if it’s exposed that “You are absolutely right” did it for me and I just submitted, it’s just showing that I am mediocre about “my” work.
Vibe coding requires you to know what you want to obtain from the code, and to micromanage the agent into doing exactly that, this requires a thorough review of all the code it creates, you need to know why it makes something one way, when it should fix it, when it should use internal libraries that it is not aware and what kind of tests it needs to write.
> Don’t import `is-even`. We have our own version of `is-even` at home (`is-even = !is-odd`).

Because of this, the code ends being thoroughly reviewed by its “author”, having being thoroughly inspected until it feels like it’s one own code. This is the first review.

## Peer Review

This is the de-facto review, you open a Pull Request and wait for your colleagues to review it (and if you don’t do code reviews, you should! Humans, and, now, machines, make mistakes!).
This step is something you should be more acquainted with. A standard review from a fellow human, leaving comments along the line of “make sure to log this error with our custom logger”.
After their review, the code should now be double reviewed (except if you just get a `LGTM` without an actual review).

## (Optional) Automated Review

This is an optional, but welcome addition, you can get your (or a different) AI agent to review the code.
It can be as simple as [requesting a review from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) or using a tool like [Code Rabbit](https://www.coderabbit.ai) (I promise they are not sponsoring me, I just used them before Copilot became popular).
This gives a new level of security on top of your code. Of course, the AI agent may sometimes be obnoxious with the review, pointing unnecessary flaws (i.e.: having a lint ignore comment without understanding that it’s a problem that comes from a dependency, or being overly cautious about a method that isn’t actually important), but sometimes it does catch some nice flaws in your code. It’s excellent at seeing variables that are not being used after being declared, or locating issues in your loops.
I do recommend using this review system before the reviews from your fellows humans so they only do the last line of defense against bad code.

## Conclusion

This obviously requires that the engineer producing the code actually cares, but _a negligent engineer would produce chaos, both with or without AI_.
If anything, it raises the bar. When the code isn’t written by you, you are forced to understand it before you can defend it. And if you can’t defend it, you shouldn’t ship it.
Used this way, vibe coding doesn’t remove reviews, it makes skipping it uncomfortable.
