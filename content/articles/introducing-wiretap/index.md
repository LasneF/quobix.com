---
title: "Introducing wiretap"
description: The world's coolest OpenAPI compliance and testing tool. Validate, mock and debug APIs against OpenAPI specifications and much more
date: 2023-10-05T03:19:38-05:00
draft: false
menu: "articles"
strapline: The world's coolest OpenAPI compliance and testing tool
hero: "images/hero-images/introducing-wiretap.webp"
heroPNG: "images/hero-images/introducing-wiretap.png"
heroSVG: "images/hero-images/introducing-wiretap.webp"
heroTitle: "wiretap is the world's coolest OpenAPI compliance and testing tool"
heroAlt: "wiretap is the world's coolest OpenAPI compliance and testing tool"
---

If you know nothing about OpenAPI or don't care about developer experience, engineering tools, or APIs, I'd skip this
article as It will **_bore the shit out of you_**.

---

Now, if you **do care** about sexy productivity tools for developers, then read on. I have something to share with you.

But before I do, let me ask you three questions:

{{<card "Can you answer yes to these questions?">}}

**Question 1:**
- Do you **_know_** if your UI/client sends the **_correct_** data to your backend/API?

**Question 2:**
- Do you **_know_** if your backend/API sends the correct data to your UI/client?

**Question 3:**
- Can you **_prove_** it?

**Bonus question**:
- Can you prove it without having to modify your code? {{</card>}}

I will bet that you said **no** to most of the questions.

If your answer was **yes** to all the questions. Well done, you're kicking ass. Thanks for stopping by. Have a great day, and hack code!

---- 

{{<info-box>}}If any of your answers were **no**, Would you like them to be **yes**?{{</info-box>}}

---

## How to eavesdrop, a quick guide

The only way to know what two computers say to each other, without adding code, is to **listen in** on the conversation.

We have to **tap** into the raw wires. We must **sniff** the traffic.

[Wireshark](https://www.wireshark.org/) / Ethereal has always been my go-to for this type of work, 
particularly when reverse engineering software.

However, determining if a client or server complies with an API Specification is a whole level above the raw packets
sent over HTTP. The concepts are much higher, and a stack of protocols exists above the low-level packets flying around the wire.

HTTP is a **_simple_** protocol, but payloads can be **absolutely anything**. 

Knowing if those payloads are valid requires a whole different set of tools that understand HTTP traffic and
can validate it's compliant with an OpenAPI specification.

---

## Introducing wiretap

During the spring of 2023, I noticed some problems when talking to my [Splunk](https://www.splunk.com) engineers across 
the Security organization. 

The first was that there needed to be a **better solution** to validate a client and server OpenAPI compliance without 
middleware, code changes, or adding new infrastructure.

The second was that [webpack devServer](https://webpack.js.org/configuration/dev-server/) is fine for small UI projects 
but **_chokes to death_** when it comes to large-scale enterprise applications that frequently make many API calls.

I watched UI engineers get frustrated with the poor performance when running local development. 

What we needed was **more** power. We needed some [b33f](https://pb33f.io).

---

{{< inline-figure "*wiretap-validation*" "wiretap gives power back directly to engineers working with APIs" >}}

---


Hacking code is **my passion**. So when an opportunity arises to build something that mutates one tool's existing 
functionality to serve another purpose - I can't resist it. It's like a **_dog whistle_** to me.

## Building the batteries

To validate OpenAPI specifications, we need a tool that can understand OpenAPI specifications and then know how to 
validate HTTP requests and responses against them.

[libopenapi](http://pb33f.io/libopenapi/) could handle the first requirement. Its core functionality is just that; 
however, it **didn't know** how to validate anything and **could not** validate HTTP requests and responses.

---

## Introducing libopenapi-validator

An extension for [libopenapi](http://pb33f.io/libopenapi/) that allows developers to validate schemas, parameters, 
requests, and responses directly from an HTTP request or response.

I spent **_over a month_** building that in the mornings and weekends because 
you must take the time to craft something properly to do something right.

Now, we have a tool that can do the validation. We need **another** device that sniffs traffic and hosts all the 
application's business logic.

---

## Introducing the ranch

Well, not really. You see, the [ranch](https://github.com/pb33f/ranch) is a hard fork of [transport](https://github.com/vmware/transport-go). 
A project I architected from the ground up when I worked at VMware.

I wanted to make significant changes, add new functionality, and rip out stuff I didn't like - but I was no longer
in control of the code and didn't work for the company anymore. 

So, as is my right (**_as is everyone on earth_**), I [hard-forked](https://github.com/pb33f/ranch) the public code 
and renamed the project **ranch**.

### Why ranch?

A ranch is where the cowboys **live** and **work**. It's our home.
[ranch](https://github.com/pb33f/ranch) is a fundamental base architecture for a much larger landscape. 
It's not just a message-bus architecture. It's so much more and serves as the foundational platform for wiretap.

Another problem I also wanted to solve is how to break apart some of the transport functionality into a much **_smaller_**, **_cleaner_**,
and **usable** format.

---

## Introducing saddlebag

Ta-da! I know, **_so many introductions_** - it's like attending your fiance's Thanksgiving dinner for the first time.

[saddlebag](https://github.com/pb33f/saddlebag-js) is an **ultra-lightweight**, super simple state management library 
for JavaScript applications. Designed around the concept of `bags` that contain anything, anyone can listen for updates 
on anything in the bag or everything in the bag.

[saddlebag](https://github.com/pb33f/saddlebag-js) allows wiretap to update the UI application state in one place,
and everything reacts to that single source of truth. 

Simple, effective, tiny, and **blazing** fast.

---

## Bringing sexy back

Doesn't every single developer or business tool out there feel the same? 

{{<info-box>}}**Safe**, **boring**, **templated**, **corporate**?{{</info-box>}} 

It does to me, anyway, which makes me feel sad. I want **energy** and **_fun_**. 

I want **vibrancy**. I want **_fizz_**. So, as with all [pb33f](https://pb33f.io) tools, it took on our neon pink and 
blue retro style. Our neo-console experience, but in a browser with **_pizazz_**.

As I was building out the UX for wiretap. I asked developers what they wanted from a tool like this. 

I asked everyone during frequent reviews about how they felt the experience shaped up, what was **_missing_**, 
and what it could **do better**.

What started as an OpenAPI compliance tool became a tool chest of UI to API diagnostics. The team kept throwing up, 
**_"What if it could also..."_** minor enhancements and features that make diagnosing how a UI is using an API easier and faster.


---


## Turning up the power

[Oskari Rautinen](https://oskari.io/) turned up the heat nonchalantly one morning in June. 

> "Oh, we need it to also re-write paths, drop and modify headers, inject authentication, and add variables."

{{<info-box>}}**_No fucking problem_**, mate.{{</info-box>}}

_Bish_, _bosh_, **done**! A week later, It was all done: a drop-in replacement for [webpack devServer](https://webpack.js.org/configuration/dev-server/) and a 
supercharged API diagnostics toolkit rolled into one!

After a few small automation and some harnessing changes - wiretap has entirely replaced webpack devServer as the 
local development UI hosting tool. It is a seamless drop-in replacement.

---

{{< inline-figure "*wiretap-chains*" "wiretap has unique features like request chain tracking" >}}

---


## Try it out for yourself

Take a spin through the [quick start guide](https://pb33f.io/wiretap/quickstart/) for wiretap, from installing it 
to running against the [toy giftshop API](https://pb33f.io/wiretap/giftshop-api/) and witnessing API compliance violations.


## Video walkthrough

**Can't** or **_won't_** download anything and have a few minutes spare? If so, watch the
[video walkthrough]({{<ref "/articles/openapi-compliance-testing">}}) of the tool that showcases the core features and how to use it.

Or just check out the [wiretap docs](https://pb33f.io/wiretap/).

---


## What's next for wiretap?

Here are some of the '_what if..._' conversations with my engineers. 

These are my customers. They are my **why**, which drives the **what** of wiretap and all the [pb33f](https://pb33f.io) tools I create.

So what if wiretap could also:

- Simulate chaos with an API?
- Replay sessions?
- Export sessions in a headless way?
- Handle multiple specs?
- Support WebSocket proxying?
- Support AsyncAPI?

No fucking problem, _mates_.














