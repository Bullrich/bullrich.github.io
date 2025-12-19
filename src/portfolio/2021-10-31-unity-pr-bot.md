---
title: Unity PR Bot
image: unity-pr-bot.png
category: other
technology: Svelte, Typescript, Firebase
description: GitHub app for Unity Cloud projects
---

# Unity Cloud Status Check

GitHub status check which takes Pull Request and starts a Unity Cloud Build.

After the build is finished, it reports the result as either a successful check or a failing one with details.

The technologies used here are:

- Svelte
- Typescript
- GitHub api (Octokit)
- Firebase
    - Functions are used to trigger events between the two systems.

You can see the app here: [https://unityprbot.com](https://unityprbot.com)
