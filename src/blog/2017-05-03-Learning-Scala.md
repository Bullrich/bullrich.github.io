---
layout: "layouts/blog.html"
title:  "Learning Scala"
date:   2017-05-03
categories: blog
tag: scala
---

> You have to make a Rest Api in Scala using Akka HTTP.

### The task

That was my task. I had to program a Rest Api (I kind of knew what a Rest Api was but I never made one, I'm a OOProgramer, and mainly use Unity, so server and stuff isn't my field), with Scala, a language I never heard anything before using the framework Akka HTTP(something that I didn't even have a clue of what it was).

When you are giving a task like this, it's a difficult path, but it's way better than having to debug and fix common bugs, you are given the chance of learn, while you're being paid.

I started easy with Scala, I checked out a tutorial online, given by a big German engineer. He seemed as a brilliant engineer, but he wasn't so good at teaching, so I got lost in the middle.

Later on I learned that this German engineer was in fact [Martin Odersky](https://en.wikipedia.org/wiki/Martin_Odersky), the designer of the Scala language.

### Discovering Scala

Scala provided a lot of fun stuff, which I hated at the beginning. It's more of a functional language, so there is a big chunk of differences with every object oriented programming language.

What blew my mind was Scala's syntax, it can be a copy of C#'s syntax or it can be something completely different.

For example, Scala's syntax has several rules which allow to not use dot. In fact, in Scala you don't need a semi colon to declare a line end, simply go to a new line.

And **every method returns something** in Scala, there are no void methods.

Let me show you:

Let's say we have a string called `ExampleString`.

```csharp
public static string AddATwoToAString(string givenString) {
    int ble = 2; // We declare a int
    string bleString = ble.toString(); // We transform that int into a string
    string newString = givenString + bleString; // We make a new string from those two
    return newString; // We return that string
}
```

This is a generic method in C#. To call this method we should do something like: `AddATwoToAString(ExampleString);`

 Now let's write it in Scala.

```scala
def AddATwoToAString(givenString: String): String ={
    val ble:Int = 2
    val bleString:String = ble toString // We transform that int into a string
    val newString = givenString + bleString // We make a new string from those two
    newString // We return that string
}
```

If you want to call this method you can simply type: `AddATwoToAString ExampleString`.

That's it. Not dots, nor parenthesis. If you have a method that accept only one parameter, there is no need to add the parameter between parenthesis, you can write it after a space. And if you have a method that doesn't accept parameters there is no need to call the parenthesis, you can simply type `AddATwoToAString` instead of `AddATwoToAString();`.

You can also remove the brackets if the method doesn't have to many logic inside. For example, the method could be as following and give the same result

```scala
def AddATwoToAString(givenString: String): String = givenString + 2
```

That is the Scala magic.

I hated it in the beginning. It was horrible.

And then I grew used to it. And I lost.

### Learning Akka HTTP

[Akka HTTP](http://doc.akka.io/docs/akka-http/current/scala.html) proved to be really useful. It provided a logic for routes which was really intuitive. I made all the endpoints with ease and had a server running after a couple of days of experimenting.

I don't know what else to say from Akka HTTP, but that made me remember two things, first, SBT, second, Java. Let me tell you why Scala can make magic.

### SBT

[Scala Build-Tools](http://www.scala-sbt.org/), commonly called SBT, is an interactive build tool. It's the biggest thing for working with Scala. Not only SBT brings all the Scala packages needed for compiling, it can build and manage library dependencies.

SBT makes a file called build.sbt which contains all the libraries and pluggins of the project. If you are using [IDEA](https://www.jetbrains.com/idea/) it's even easier. Everytime you make a change to that file it download all the new library and compile so that you can use the code auto-completion or see how the methods work from the inside.

And when you finish your project and want to compile simply open the terminal, and in that directory type `sbt run` and it will have your server up and running. If you don't have any of the libraries it need it will download them before for your use! It's really useful! I wouldn't be able to work without it!

### REPL

> The Scala REPL is a tool (scala) for evaluating expressions in Scala.

Basically it's like [JSFiddle](https://jsfiddle.net/). If you want to try something but you don't want to compile your code type in the console `sbt consoleQuick` and type your code to see if your syntax/logic works. IDEA also brings it own REPL called worksheets. You can create a file and test your code methods without having to compile.

### Java

Now, here we are. At the magic of Scala!

> Scala source code is intended to be compiled to Java bytecode, so that the resulting executable code runs on a Java virtual machine.

This is the biggest advantage of Scala. Scala provides [language interoperability](https://en.wikipedia.org/wiki/Language_interoperability) with Java, so anything you can do in Java, you can do it in Scala.

If you want to call a method from Java, you simply import that library and call that method using Scala syntax. This allows you to use the vast amount of Java libraries out there, giving you unlimited possibilities. Going from Java to Scala shouldn't provide much of a fuss, everything you could do there, you can do here and more.

## Wrapping things up

So, to wrap things up, or the TL;DR

- Scala has a similar syntax with C, but can alternate with a no dots one.
- Scala is compatible with Java, and can call all of it's libraries.
- SBT is the key to use Scala.
- You can test your code with REPL.
- Use [IDEA](https://www.jetbrains.com/idea/) if you are going to work with Scala.
- Remember that every method in Scala must return something.
- 2 + 3 != 4
