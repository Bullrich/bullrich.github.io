---
layout: blog
title:  "Today I Took and Passed the Unity Certified Developer Exam"
date:   2016-09-30
categories: 
    - blog
tags:
    - unity
---
Today, in Argentina, I was one of the first Argentinian who could take the Unity Certified Developer Exam (God, I won’t write that again, so I’ll say UCDE), literally the second, today were two exams, one at 1 pm, and the other at 3 pm. I was at the 1 pm one, and finish it second because some complications that I will address in a moment.

The exam took place at the [Universidad Abierta Interamericana – UAI](http://www.uai.edu.ar/), where the director of the UAI’s Game Develepment career was helping a person from Unity, who later presented himself as James, to setup everything. Fifteen minutes later they called us, asked for our IDs and our email, which James typed into a skype conversation and then hit send. We stood there waiting for another 10 minutes until James presented himself as James, and wrote down on a blackboard the url that we had to access in a sub site in Unity Certification’s site. Everything pretty normal, we were given our email as the username and a default password, that we had to change the moment that we log in. After that we waited for another five minutes until everyone had the option to open the exam in our “Courses” dashboard.

We opened it, had to read a Terms & Agreement stuff that no one ever read so I skipped to the last part and pressed “Accept”.

“50% of the course has been completed”. Neat!

Now came the real part. I opened the “Course” again and it send me to the exam tutorial. A timer start, that gave me 90 minutes to answer everything. There were 3 types of questions: multiple choices, match descriptions with names, and click on a picture the part that you are asked.

_NOW_ the real exam starts!

The first section was all about Animation. Some tricky question, select several stuff bad explained, and match things whose name I didn’t understand with things whose descriptions I didn’t understand. Need to have 70% of the questions correctly answered, got 50%. Shrugs, bad way to start.

Then came the Asset Management part. That was extremely easy. [What kind of audio files can Unity import](https://docs.unity3d.com/Manual/AudioFiles.html), differentiate an empty gameobject in the inspector, find the child of X object in the hierarchy window, one multiple choice that asked how can I create a prefab, what is saved when I save a scene, etc. That part I passed with a 90%.

Then came the audio. God, I don’t know anything about audio. They asked what’s the effect of the Doppler effect. I choose one answer randomly. How to make an audio source play when the object is spawned (the answer is “Play on Awake” for anyone who doesn’t know). Locate an audio file in the project window. What component modifies the audio of an audio source. I failed this one.

Now the Editor Interface. Easy peasy (or however that’s written). A match window with it’s function; in which window can I find errors (console window), how to parent an object (drag an object to the object you want it to be the parent), how to reset a component (wheel in component &gt; Reset), with what key does the scene window focus an object (F), how can you orbit the camera in the scene, etc. Passed it with honors.

Employment Preparedness: What’s a NDA, and what’s intelectual property. You have to answer both right to pass this part.

Game Art: Explain why you should use less polygons (for performance), what does the color do in games (affect mood), and one or two more things I don’t remember but answered correctly again. Got a 100% in this part.

Then came Game Design. Oh god. Game design. I hate what happens in this part. One question was: What are the most common genres for mobile games, which I selected the correct answer (puzzle, board and arcade games), then press submit and…. and….. and….. THE SITE FROZE. I couldn’t click anything! AND THE CLOCK WAS STILL TICKING! I called James over who didn’t know what to do. He refreshed the page which sent me back to my dashboard where it said that I had completed 100% of the course. But I had to continue! Another guy got frozen in the same part, and then another one too. James was speaking through Skype with whoever was there, and suddenly came Carl Callewaert[¹](#extra), who didn’t know what was going on. James took pics, sent them through Skype and was really nervous. This clearly wasn’t a good sign. I was waiting on my dashboard with the 100% there, no option to click, time passed, I wanted to use my phone but had to leave it on my bag for the duration of the exam. Finally Carl comes to my computer and asked what is going on, I tell him that when James refreshed the site it sent me back to the dashboard, and Carl pressed on something that didn’t look like a button, but in fact was, and allowed me to continue where I left my exam. Yes! I could answer the question this time and continue to go on. All very simple questions.

Industry Awareness: Really easy. Two questions, match production phases with it’s description and what is the input on a mobile phone (Touch).

Lighting. Luckily for me, I read about this just this morning, so I was prepared. What is called pre computed lights (Baked), what does light baking produce (Lightmap) and what does Lightmap do or something like that, which I answered Lightmap UVs. Identify light types by it’s shadow. Match light types with it’s emiter shape. Explain what is a culling mask. Passed this one.

Now one I really hate: Materials and Effects. Had to match what type of texture would go with what kind of shader rendering(if you read [this](https://docs.unity3d.com/Manual/StandardShaderMaterialParameterRenderingMode.html) it will be easy), what is called the property to make particles spawn particles, with what property can you make particles change to yellow, then to orange and then to blue, what is the [albedo of a shader](https://docs.unity3d.com/Manual/StandardShaderMaterialParameterAlbedoColor.html) and other stuff. Passed this with the minimum needed score.

Navigation and Pathfinding. Again, easy if you read the [guide](https://docs.unity3d.com/Manual/class-NavMeshAgent.html). What is an obstacle, what is the max slope and how do you call the pre computing function of mapping the navigation map (again, baking).

Physics. God, there were some bad asked question here. Clearly a programmer asked this questions because, as a writer, I didn’t understand several questions here.  
Identify a sphere collider by it appearance, how can I move a collider up without moving the object, some question which the answer was OnTrigger and then was a Raycast question. There was a picture with a clock model and the question was something like “In which axis should a raycast be cast to collide with the clock: X, Y, W or Z”. I didn’t know. From where it is being cast? What’s the origin point? I called James, who, kindly, told me that it was being casted from the camera, so I could answer without any problem.  
Some questions of rigidbodies, I don’t remember most of them. Again, I passed this part.

Now the fun part! Programming &lt;3. What is the purpose of methods, how can I acces a variable from another script (public, duh), for what use can I use quaternions, what is deltaTime, for what use is the awake, then there was one which asked which option of the upper toolbar should I choose to create a new script (you know, the toolbar that says “File, Edit, Assets, GameObject, Component, Window, Help”). No idea with that one; I always right click on the inspector and create a script from there. Passed all except for that one.

Project Management: For what are the layers, identify Tags in the inspector, which objects have the transform component, etc.

Services: A easy one. I know that most failed this one because they have never used it. What do I need to make a cloud build (a repository), how is called the service that give me data about my players, and what is the difference between a reward and a regular add.

Last but not least: User Interface. Explain which type should a method be to be called from a button function (public), identify the pivot of an object, in what format should I import an Image to use it in the screen, and something else I don’t remember. Also, passed.

 

So then, by the end, I got a 82(I think that it was 1660 points of 2000). I was second completing the exam (damn Game Design section that freezed my site). It was really really easy and EVERYTHING that they’ll ask you can be find on the [Exam Objectives pdf](https://certification.unity.com/themes/certification/docs/unity-certified-developer-exam-objectives.pdf) (I literally have this opened and copy some of the “Certification Objectives” for telling you some question). I recommend checking the docs before going to the exam but good luck.

For people that say that the certification is useless, I recommend reading [this](https://www.reddit.com/r/Unity3D/comments/4fp2x3/last_weekend_i_took_and_passed_the_unity/d2b12hw) answer in a reddit post. That is the UCDE main objective. Also, it’s valid for only two years, so you have to squish all you can from it in that time.

 

At the end, they took us a picture with James and uploaded to the UAI’s facebook page or whatever. I spoke to the career director, who tried to convince me to study there, but I’m from the competition (Escuela Da Vinci) so I rejected the kind offer, but we exchanged email addresses ’cause he told me he wanted to make a project and that he could use my help. I also tried to dissuade him to teach Unreal instead on focusing only in Unity, like I’ve been insisting in the career director of my career for a year and a half, and finally was able to start a Unreal Lab so that the teachers can learn it and teach it to the students. Now I have to insist with CryEngine for another year and a half.

So you all know how this goes. If everything fails, we’ll always have GameMaker.

Thanks for reading all this, I know it’s long. Kudos to you!

 

* * *

### Extra
¹Carl Callewaert is Unity’s Lead Evangelist. He is like Jesus but with Unity. He travels the world preaching and teaching about Unity, you should follow him on [Twitter](https://twitter.com/carlunity), he literally tweets from a different country each week.