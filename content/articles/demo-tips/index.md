---
title: "How to give a better demo"
description: As engineers, we need to showcase our work publicly frequently. It's not easy to make a good demo, but avoiding these give mistakes will give you an advantage.
date: 2023-02-15T05:19:38-05:00
draft: false
menu: "articles"
strapline: "Top tips to avoid boring and confusing your audience."
hero: "images/hero-images/demo-tips.webp"
heroSVG: "images/hero-images/demo-tips.webp"
heroTitle: "Stop giving boring and confusing demonstrations"
heroAlt: "Top 5 mistakes when giving a demo"
---

If you're looking to level up your skills as a software engineer, **one thing** you need to pay attention to is the 
importance of giving a _great_ demonstration of new features or code that you've created.

If you prefer a video format, you can [watch the video version of this article on YouTube](https://www.youtube.com/watch?v=MyLdT-joADc):

{{< youtube MyLdT-joADc >}}

---

## It boils down to one thing

There's a **single** overarching guiding principle that brings all the following advice together.

{{< info-box >}}
Remove the **distractions**
{{< /info-box >}}


## Mistake #1: Screen Resolution

{{< inline-figure "*screen-resolution*" "Err, can you zoom in a bit please?" "simulated zoom screen with three puppets and a compressed screen that is unreadable" >}}

That _super rad_, ultra high-res widescreen monitor you use for coding doesn't **look so rad** when demoing full screen over 
a video conference. In fact, it _really_ sucks to be on the other end of this.

Many people use a laptop, a tablet, or a phone for video conference calls and meetings (like Zoom or Teams). 
That ultra-wide super-high res screen looks like a _scrambled_, **compressed mess**.

People end up squinting or trying to zoom in to see what it is that's going on, and the compression used by video 
conferencing turns everything into a cryptic mess. People need to figure out what to look at and help understand what you're showing them.

### So how can we avoid it?

{{< info-box >}}
Zoom in on **all the things**.
{{</ info-box >}}


{{< inline-figure "*zoom-in*" "Oh wow, that's so cool!" "A much clearer screen shows zoomed in code that is clear to read by all on the video conference" >}}

It's surprising how much more **engaged** people are when they can actually read your code on a screen. 
Make it as **easy as possible** for them to see, zoom in or **increase the font size** of your code editor.

Ideally, use **presentation mode** on your IDE if it has one.

{{< info-box >}}
Share a **single window**.
{{</ info-box >}}

{{< inline-figure "*browser-tabs*" "Everyone is nosey, people will be looking for personal artifacts" "simulated zoom screen with three puppets and a compressed screen that is unreadable" >}}

If the demo involves a browser application, **just share the tabs you
need for the demo**. 

People will look at your _other_ open browser tabs and be **distracted** from what you're showing them.

If you're using a terminal or IDE, just share the windows you need. Avoid confusing people by making them guess what to pay attention to or where to look.

Both these approaches will help focus the attention of your audience and **remove distractions.**

---

## Mistake #2: No Script!

{{< inline-figure "*no-script*" "'...and then, uh, I, um..., bear with me...'" "Picture of the (very handsome) author smiling, with the words 'no script' printed next to him" >}}

Listening to someone _monotonically_ stumble and mumble through a sentence is **painful**. 

There is only **one** reason this happens during a demo.

{{< error-box >}}
**No script**.
{{</ error-box >}}

When we need to figure out what to say or think aloud for the first time as we perform something, 
it generally comes out as a **word salad**, full of _filler_ words and **fluffy, puffy** content.

{{< info-box >}}
Write a **script**.
{{</ info-box >}}

Think about what you're going to say, **write it down**, make it clear, and make it _crisp_! 

Use _inflection_ when you talk, inject **energy and passion**, _enunciate_ your words, and take people on a journey by 
just the _sound_ of your voice.

---

## Mistake #3 Showcasing APIs using JSON Blobs

Have you ever watched a demo where someone posts a big blob of JSON into a window, presses a button, and a different JSON blob appears next to it?

{{< inline-figure "*json-blobs*" "'...and we post a huge blob of JSON, and then we get back another huge blob of...'" "The handsome author smiling and showcasing postman with blobs of JSON going in and out." >}}

**_Impressed?_**

**No?**, _Me either_. I don't think anyone is.

> But Why?

As engineers, we spend more time looking at JSON and YAML than we want to. Mainly those people working on creating or consuming APIs.

{{<card "I know a thing or two about parsing YAML and JSON" >}} 
I mean, that's all that [vacuum]({{< ref= "/vacuum" >}}) does. The same as  [libopenapi](https://pb33f.io/libopenapi). Over the past
decade, I have spent years and years building tools to parse and consume JSON and YAML. I have written parsers, generators, and validators for both formats.

As someone who reads these formats all day, every day, I can tell you that they are **not** the best way to showcase the value of a new feature.
{{</card>}}

Seeing blobs of JSON or YAML doesn't help us understand the **value** of what the feature is or does. 

It just shows the _static_ rendered output of the data that can power the feature.

### So how do you showcase the value?

{{< info-box >}}
Build a small application or a UI to showcase consuming or engaging with the new API. It can be enough to show the value of the feature.
{{</ info-box >}}

Aim to render the API result in a way that helps the audience understand **why you created** the feature, help them understand why it **exists**.

What you're trying to showcase, is the value the feature provides to the end-user, the **customer**. Just showcasing the result
of an API call doesn't help us understand anything other than a blob of data comes out the machine when we feed it.

{{< info-box >}}
An end-to-end demonstration of the feature is best, showcasing the end-user experience and the value to the business and the application.
{{< /info-box >}}

---

## Mistake #4: The Nervous Mouse

{{< inline-figure "*nervous-mouse*" "Clicky, click, click, clickty-click..." "A screen with someone clicking over and over and highlighting text on a screen randomly." >}}

Have you ever tried to follow what someone is saying during a demo...

...but you **can't** because they are clicking randomly all over the place, highlighting random text, or just clicking 
the mouse over and over?

It's a typical way to expel nervous energy, not unlike _nail-biting_ or _leg-jiggling_. 
It helps us focus our minds by giving our hands **something to do**.

However, it's **really distracting** for someone trying to follow a demo.

### Your mouse is a laser pointer during a demo

When telling a story during a demo, a mouse pointer **guides the eyes and attention of the audience** watching. 
No different from a laser pointer being used to highlight where on a slide people should focus when making points.

People follow the mouse. If the mouse zips left to right, randomly changing icons and random blocks of text are 
highlighted as we nervously click around, it's challenging to listen to or follow the narrative.

{{< info-box >}}
Be **aware** of what you're doing with your **hands** and where your **mouse** is. 
{{</ info-box >}}

When people lose sight of the mouse pointer, they start _scanning_ for it, and every second they do that,
they are **not listening** to you or the demo.

---

## Mistake #5: The Virtual Desktop Shuffle

{{< inline-figure "*desktop-shuffle*" "Swipe, swipe, swipe, swipe, sw...'Can you stop doing that'" "Puppets watching someone swipe left and right on virtual desktops" >}}

Some of us like to keep different apps on different virtual desktops, browsers, tools, consoles, etc.,
all nicely separated out. 

It makes for a great experience when **working alone**.

But watching someone **_flip desktops_** trying to find the one with the things they need can be **_excruciating_** and **very distracting**

Bringing people along on the journey is **essential** to giving a good demo. When flipping between desktops, 
it looks **_pretty bad_** over a screen share and **distracts** the audience as to what they should be paying attention to.

Flipping the screen to a completely different layout and back is a **_jarring experience_** for someone else watching.

{{< info-box >}}
Keep **all the windows** needed for the demo on the **same desktop**.
{{</ info-box >}}

---

Remember our guiding principle of `Remove the Distractions` as you plan your next demo. I hope this has been 
useful for you. I certainly enjoyed creating the content.
