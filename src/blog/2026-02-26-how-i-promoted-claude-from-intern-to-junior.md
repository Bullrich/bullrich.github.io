---
title: How I promoted Claude from intern to junior dev
date: 2026-02-26
description: I found a system that turns Claude Code into a reliable coding partner. It's called GSD, and it works the same way I work. By asking questions first and coding second.
---

I've been using Claude Code for a while now. And for a while, it felt like working with a very eager, very fast intern who doesn't ask enough questions. You tell it to build something, it sprints into the codebase, writes a thousand lines, and then you realize it went in completely the wrong direction. Classic intern behavior.

Then I found [Get Shit Done](https://github.com/gsd-build/get-shit-done) (real repo name) and something clicked. Claude didn't get smarter. I got better at managing it.

## The intern problem

Raw Claude Code is impressive. You describe what you want, it writes code. Fast. But *fast* isn't the same as *right*. Without structure, Claude does what any unsupervised junior would do: it makes assumptions, picks the first approach that comes to mind, and when it hits a wall it tries the same thing five different ways instead of stepping back.

I wrote about [vibe coding](https://bullrich.dev/blog/vibe-coding-gets-reviewed-more-which-makes-it-safer-than-you-think.html) before, about how AI-generated code gets more scrutiny, not less. That's still true. But I realized the bottleneck isn't the *review*, it's everything that happens before the code exists. The planning. The investigation. The "wait, have you actually thought about this?" part.

Think about what separates a senior developer from an intern. It's not typing speed. It's the ability to find holes in a plan before writing a single line of code. The questions they ask, the caveats they spot, the edge cases they think about upfront. When you use a tool that forces the AI to focus on planning, to find caveats, to poke holes in your idea before coding, you're not just organizing work. You're turning that intern into something much more useful.

GSD fixes that.

## Working with a junior, not babysitting an intern

[Get Shit Done](https://github.com/gsd-build/get-shit-done) is a meta-prompting system for Claude Code. In practice, what it does is force Claude to work the same way I work: discuss first, plan second, code third.

When you run `/gsd:new-project`, Claude asks you questions about what you're building until it really understands the project. Then it splits your idea into phases. Not vague phases like "set up the backend", but detailed ones with clear scope and goals. Each phase becomes its own mini-project with the full cycle:

```
/gsd:discuss-phase 1    → Shape how it should be built
/gsd:plan-phase 1       → Let it research and create a plan
/gsd:execute-phase 1    → Now it codes
/gsd:verify-work 1      → Confirm it actually works
```

If you've used [Superpowers](https://github.com/obra/superpowers) (which is great for working on specific features), this will feel familiar. Superpowers does brainstorm → plan → execute for a single feature. GSD does the same iteration but at the project level: it breaks your whole MVP into phases and each phase gets that same careful cycle. So instead of one big brainstorm-plan-execute pass, you get many focused ones, each building on the last.

That phase splitting is what makes GSD click for larger projects. Each phase has enough detail that Claude knows exactly what it's doing, but it's small enough that context doesn't degrade halfway through.

## The discuss phase is where the real work happens

This is the command I want to talk about the most, because it's the one that changed everything for me. When you run `/gsd:discuss-phase`, Claude doesn't start coding. It starts *asking questions*. A million questions. And I mean that in the best way possible.

```
> /gsd:discuss-phase 1

GSD: Analyzing Phase 1: "Core Android app with authentication"

I have some questions before we plan this:

1. Authentication: OAuth, email/password, or both?
2. You mentioned "modern capabilities" - are we talking
   Jetpack Compose, Material 3, or staying with XML layouts?
3. Should the backend auth be self-hosted or use a service
   like Firebase/Supabase?
4. Offline support: does the app need to work without
   connection?

> Both OAuth and email. Jetpack Compose, definitely.
> Self-hosted, I want full control. And yes, offline matters.

GSD: Got it. A few more on the offline piece...
```

This is exactly how I guide myself when I start a project. I don't open my editor and start typing. I sit down and think about what I'm building, what the edge cases are, what I don't know yet. GSD makes Claude do the same thing. The output is a `CONTEXT.md` file that feeds into everything else: the research, the planning, the execution. Skip this step and you get generic code. Use it and you get *your* code.

> The discuss phase is the difference between telling someone *what* to build and teaching them *why* you're building it that way.

## Verify before you trust

The other command I want to highlight is `/gsd:verify-work`. After Claude finishes a phase, this command walks you through what it built and asks you to actually test it.

```
> /gsd:verify-work 1

Verifying Phase 1 deliverables:

✓ 1. Can you open the app and see the login screen?
  → [ ] Yes  [ ] No

✓ 2. Can you register with email and receive confirmation?
  → [ ] Yes  [ ] No

✓ 3. Does Google OAuth redirect properly?
  → [ ] Yes  [ ] No, it crashes on redirect

GSD: Investigating OAuth redirect failure...
     Found: redirect URI mismatch in AndroidManifest.xml
     Creating fix plan...
```

No "it compiles so it must work". No hoping for the best. It forces you to use the thing and report back. And when something fails, GSD doesn't just dump an error on you. It spawns a debug agent, diagnoses the problem, and creates a fix plan. You run `/gsd:execute-phase` again and it patches the issue.

This is the verify-then-fix loop that I always wanted from AI coding. We all have a tendency to glance at the output, see no red errors, and move on. This system doesn't let you do that.

## Context is everything

I didn't expect this to be a selling point, but GSD is *great* at managing context. Claude Code has a context window, and when it fills up, quality degrades. You've probably seen the "I'll be more concise now" message. That's Claude telling you it's about to cut corners.

GSD solves this two ways. First, it splits work across multiple agents, each with a fresh context window. The orchestrator stays light and spawns specialized agents for the heavy lifting. Each agent gets  clean tokens purely for its task. My main session stays responsive even when Claude is researching, planning, and executing across multiple files.

Second, and this is the part I didn't appreciate until I needed it: GSD keeps everything in separate markdown files. There's a `STATE.md` tracking decisions and progress, `CONTEXT.md` with your discuss-phase answers, `ROADMAP.md` with the phase breakdown, research files, plan files, summaries. Your whole project's brain lives in `.planning/`.

Why does this matter? Because sessions end. Your laptop dies, you run out of tokens and have to wait for 4 hours, you close the terminal, you go to bed. With raw Claude Code, you'd have to re-explain where you were. With GSD, you run `/gsd:resume-work` and Claude reads those files and picks up exactly where it left off. No "so where were we?" conversation. It just knows.

For my current project this matters a lot. Without context management, Claude would lose track of which layer it's working on by phase 3. With GSD, every phase starts fresh with exactly the context it needs, and every interruption is painless.

## Getting started

If you want to try it, it's one command:

```bash
npx get-shit-done-cc@latest
```

Pick Claude Code as your runtime, install it globally, and run `/gsd:help` to see what's available. My recommendation: don't skip `/gsd:discuss-phase`. It's the command that makes everything else work. And use `/gsd:verify-work` after every phase.

> I'm a [lazy developer](https://bullrich.dev/blog/i-am-a-lazy-developer.html). I automate everything I can. GSD lets me automate the part I couldn't before: making sure the AI actually understands what I want before it starts building.

The AI is not longer a bottleneck. It's your ability to guide. GSD gives you the structure to guide it well. And once you learn to work *with* it (stopping loops, directing investigations, shaping decisions during the discuss phase) it stops feeling like babysitting an intern and starts feeling like pairing with a junior who actually listens.