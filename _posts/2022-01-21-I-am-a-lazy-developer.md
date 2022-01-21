---
layout: blog
title:  "I am a lazy developer"
date:   2022-01-21
categories: blog
---

I’m a lazy developer. I automate everything I can so I don’t have to do it. There! I say it.

I have even automated this website because I’m too lazy to update the copyright information.

The copyright text you see at the footer:

> Copyright © {{ site.time | date: '%Y' }}

Is actually just a Jekyll component that updates itself automatically when I update this website:

```html
<li> Copyright © { site.time | date: '%Y' } </li>
```

In my old portfolio I even updated my age with a script that counted how many years passed from my birthday.

## Quoting Bill Gates because it makes me feel intelligent

> I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.
> 

We all know this quote, it’s famous, it makes us feel good of being lazy, it makes us feel like we are in the correct path and that we don’t need to change. In other words, it makes us feel **comfortable**.

But there are a lot of ways of interpreting this quote, or, being more specific, there are several way to interpret the word *lazy*.

He clearly didn’t refer to the standard definition of *lazy*, he doesn’t want to hire people who don’t want to work.

I believe that, by *lazy*, he refers to people who loathes doing tasks but likes doing work.

## Lazy developers loathes tasks

Lazy developers hate doing tasks, and by tasks I mean monotonous or small tasks that take a bit of our time but are always present. 
Things like manually updating packages, having to log into a dashboard to start a process, complying with linters, even [waiting for the coffee to be ready](https://github.com/NARKOZ/hacker-scripts) counts as a monotonous task.

They don’t like following a script in their routine.

They want to do interesting work, things that make them think. They try to remove as much tasks from their work as possible.

So instead of simple *doing* those repetitive tasks, they figure out a way to automate it and remove it from their routine.

They end up doing a big effort to not do a lot of small efforts, and when this works successfully they perform a better and more efficient job.

## I’m not a lazy developer

I’m not really a lazy developer, it’s not that I don’t want to work; I just loathe doing some tasks.

And because I loathe them, I automate them so I don’t have to do it anymore.

A good example I have was from when I worked in [Innerspace](https://www.innerspace.eu/), we had some standards to follow in the Pull Requests and developers would always forget about it, they were things like the title of the PR should follow a convention (have the ticket number) and there should be certain labels, else our bug tracking software wouldn’t sync with the tickets.

At the beginning I would always look at those inputs and ask my colleges to fix it, but I grew weary of that, so instead I developed [Prace](https://github.com/marketplace/actions/prace-js), a GitHub Action which would fail the PR until this problems have been fixed. I knew that I wouldn’t have to care about that small, but monotonous verification any more.

In the process of reducing my tasks I jumped deeper into more automation.

## Becoming an expert on automation

Though CI fascination and a hate for monotony I have slowly become quite an expert on CI systems and automation.

I consider myself an expert in GitHub actions, I [have](https://github.com/Bullrich/Prace.js) [developed](https://github.com/Bullrich/commit-autotag) [several](https://github.com/Bullrich/update-node-scoped-dependencies) actions myself, while I also have been learning how to use preexisting actions.

I created [Unity PR Bot](https://unityprbot.com/), a GitHub bot that *automates* the execution of Unity Tests in Pull Requests using Unity Cloud (it basically creates a Continuous Testing system using your Unity Cloud instance).

I have also *automated* the repository, Unity PR Bot repository flow is 90% automated through GitHub actions. 
When creating a Pull Request, actions execute tests and lints the Pull Request itself. 
When the Pull Request is merged, it automatically deploys it to staging and it also checks if there has been a version upgrade, where it tags that commit and creates a GitHub release with a changelog of all the changes between the previous tag and this tag and then it builds the project and pushes it to production.

![automation-flow.png](../../img/posts/automation-flow.png)

I have even automated the creation of this automation process, everything is ready in a simple script that copies all the required files to a new repository. You could say that **I automated my automation**.

But you always have to be careful that you are not automation unnecessary processes. Else your laziness transforms you into a person that overengineers. And that’s a very unproductive road.

## Unnecessary automation == Underperforming

There is a very popular post from xkcd which I follow as a guide:

![https://imgs.xkcd.com/comics/is_it_worth_the_time.png](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)

You have to be careful and analyze how much time you would be shaving off by dedicating time to this automation.

Automating things is fun, doing manual things is boring. This is our main motivation to automate things. But we have to make sure that we are saving more time than what we are consuming.

## Automating against the human factor

There is an exception to the previous comment, another justified reason to automate is to ensure that a delicate process isn’t broken.

Emailing the wrong user details, publishing the incorrect build, breaking a process, etc.
There are a lot of cases where a mistake can be costly, either as a monetary cost or, when you have to dedicate time to undo the mistake, as a timely cost.

If you have delicate process that is prone to mistakes, you should automate it when possible, that way you can ensure that things will go as expected.

## Automating as an objective

I really enjoy automating things. It brings me joy seeing those little processes completing themselves, files being created, logs being written, buttons becoming green and then being pressed by fake events.

There was a time that I even automated my instagram profile just for the sake of it.

I know that at the time of building products, I enjoy these little processes, and I’m going to continue doing things that helps me and other people do less tasks and more works.

Because that’s what programming is about, right? Achieving more with less.
