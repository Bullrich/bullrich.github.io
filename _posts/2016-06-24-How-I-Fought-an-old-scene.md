---
layout: blog
title:  "How I fought two days against an old scene"
date:   2016-06-24
categories:
    - blog
tags:
    - unity
---
I have been fighting for a couple of days against a problem I had with a scene in Unity. First, I noticed that the game didn’t load a script when compiling for Android, then others scripts didn’t find the gameobject with said script. Then I started to debug and debug…

![My helpful screenshot]({{ site.baseurl }}img/posts/la_escena.jpg)

I called the script from thousands of references, by it’s instance, I set objects to it, new scripts, everything but it didn’t work and it was making me mad. Something was wrong but I can’t figure it out!

I always received that text in windows console when debugging that I hated so much:

    Object reference not set to an instance of an object.

I googled and googled everywhere but I didn’t find anything. When I’m about to give up and start a new project I have an idea:

If I try to quit and add the scenes again to the build settings?

Conclusion: I had moved the main scene from one folder to another, and the project was compiling the old scene, not the new one, that’s why it wasn’t showing the new script. Because it didn’t exist in that scene.

A simple error cost me two days of development.

### Be careful with your scenes!
