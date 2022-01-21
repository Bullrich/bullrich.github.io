---
layout: blog
title: "Easy way to create a retro platformer with Unity"
date: 2016-09-14
categories: blog
tags: unity
---
I can’t say I have a writer’s block if I don’t even try writing. So here goes nothing. 

I have been working on a platformer, my partner in this doesn’t know how to use Unity, so finding a middle point has been hard. We need to design a level in the most pixel perfect way with tiles, at the same time handle the collisions. Should I have one collider for every tile? That would clearly generate some problems in performance. Should I set big polygon colliders for each section?  

That could bring some tedious work and any modification would be a pain in the mousse.  

So how did I resolve the problem with making a perfect level with good collisions, easily modified and having good collisions?  

Easy, with [Tiled2Unity](http://www.seanba.com/tiled2unity). [Tiled ](http://www.mapeditor.org/)is a generic level editor which brings a collision setting. Just like Ogmo or any level editor you used. Tiled2Unity is a software which converts that map into one or more meshes with a polygon collider for each one, simplifying everything.  

It gives you a prefab with everything setted up. _Really marvelous._
