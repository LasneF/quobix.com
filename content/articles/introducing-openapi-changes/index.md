---
title: "Introducing openapi-changes"
description: The world's sexiest OpenAPI breaking changes detector. Discover what changed between two OpenAPI specs, or a single spec over time. Supports OpenAPI 3.1, 3.0 and Swagger
date: 2023-10-04T08:19:38-05:00
draft: false
menu: "articles"
strapline: The world's sexiest OpenAPI breaking changes detector.
hero: "images/hero-images/introducing-openapi-changes.webp"
heroPNG: "images/hero-images/introducing-openapi-changes.png"
heroSVG: "images/hero-images/introducing-openapi-changes.webp"
heroTitle: "openapi-changes is the world's sexiest OpenAPI breaking changes detector."
heroAlt: "How to tell what changed with your OpenAPI specification"
---

You're probably thinking, **_"wow what a boring name"_**.

I know it's boring. It's also the best thing I could come up with. 

All the other tools with similar functionality (but nowhere near as sexy) had already taken all the variations I could come up with.

So, I named it _literally_. Boring, but **practical**! Like a minivan. 

{{<success-box>}}Except this minivan has a **bar** and a **disco** inside it, with room for **100** of your friends.{{</success-box>}}

---

## So what is it?

A new tool from [pb33f](https://pb33f.io) that I created. Essentially, it's a **time machine** that allows you to 
discover what has changed between two versions of an OpenAPI contract.

### Boring, who cares?

Diffing a file is boring, yes. It's also confusing at times. And that's where [openapi-changes](https://pb33f.io/openapi-changes/) changes the game.
It provides innovative ways to **visualize what has changed** and how the contract has changed with each commit to a git repository.

---

## A long time ago, in a galaxy far away

Well, it wasn't that long ago or very far away. It was **2020**, and it was _Palo Alto_, California.

Teams using the tooling I created at [VMware](https://vmware.com) wanted a changelog functionality when publishing OpenAPI specs. 
Well, at least that's what they thought they wanted. 

What they actually needed, however, was a tool to determine the **changes for them** and print a **_nicely rendered report_**.

Under the covers, we had built a library called **_wch_**, which stood for '_what-changed_.' 
Unfortunately, the library was not very friendly to use, and it was quite a bit of work to wrangle it 
into another tool I had created, called the **_printing press_**.

The **_printing press_** generates OpenAPI documentation from OpenAPI contracts. 
Now, it could create a changelog by reading a left and right model and determining what had changed using **_wch_**.

[Take a look at the result](https://developer.vmware.com/apis/vmware-cloud-director/latest/changelog/). It's not too bad.

---

## Except it is bad.

**_wch_** is _quirky, inaccurate, buggy_, and **complex**. Given the option, it's something other than what I would want to use. 

{{<error-box>}}It's not an option anyway, none of the code is open-source. It's **proprietary**.{{</error-box>}}


So, I rebuilt the tool from the ground up but with a much cleaner and unified design. 
The brains for [openapi-changes](https://pb33f.io/openapi-changes/) live in [libopenapi](https://pb33f.io/libopenapi/). 

The logic for determining what changed and building out a walkable dataset [lives there](https://github.com/pb33f/libopenapi/tree/main/what-changed),
so any engineer can use it to build their own experiences for that data.

[openapi-changes](https://pb33f.io/openapi-changes/) builds on that model from [libopenapi](https://pb33f.io/libopenapi/) 
and then adds some unique user experiences.

---

## Changes as a tree

{{< inline-figure "*changes-as-a-tree*" "openapi-changes renders results as a tree, combined with a diff" >}}

---

An OpenAPI document is a **tree** data structure, and it's also a very _well-defined_ tree structure. Every branch and 
leaf is supposed to be there and is trackable.

It's much easier to see the depth of a difference when you can **_visually_** see where in the network it changed.

[openapi-changes](https://pb33f.io/openapi-changes/) brings an explorable tree of changes that makes it easy to 
see where something happened in the model vs. a flat list.

---

## Changes as a graph

{{< inline-figure "*changes-as-a-graph-diff*" "explore the openapi changes as a visual graph" >}}

---

If a tree is still too confusing to understand, what about rendering out changes as an **_explorable visual graph_**?

This view takes the same result set, but this time renders it into a visual graph of the changes discovered between two documents.

The interactive visualization can _pan_ and _zoom_ and be re-drawn with flow moving in a **different direction**.

These two modes of exploration generally differ from what you see on these types of tools, and the reports are usually **_dry_** and **un-sexy**.

As you can see, I aim to change that.

---

## Changes as a report

Like data? Want a machine-readable version of the change report? No problem. openapi-changes can generate a JSON report quickly, 
which is the same data that powers the other UIs, is the same data in the report.

---

## Back to the future

[openapi-changes](https://pb33f.io/openapi-changes/) comes with another innovative feature. It allows you to **travel back in time**.

Review how a specification has changed, with each commit available as a point in time to see what changed.

---

{{< inline-figure "*time-machine*" "travel through time and see what changed between each commit in a git repo" >}}

---


[openapi-changes](https://pb33f.io/openapi-changes/) references the **HEAD** version against the previous commit and compares every commit to its predecessor.

The git integration makes it easy to see how things look over time, **_unlike a single snapshot_**.

---

## Face/Off

[openapi-changes](https://pb33f.io/openapi-changes/) offer multiple interface options. 

You have already seen some examples of the [html-report](https://pb33f.io/openapi-changes/html-report/); however, a CI/CD-friendly 
[summary view](https://pb33f.io/openapi-changes/summary/) provides a terminal 
output that is easy for diagnostics in a pipeline and a terminal for local development.

---

{{< inline-figure "*summary-command*" "openapi-changes is terminal friendly and loves to operate in CI/CD pipelines" >}}

---

## Terminal UIs are cool.

Are you old-school like me and love a **fast**, **_light_**, terminal UI instead of always needing a browser? 

[openapi-changes](https://pb33f.io/openapi-changes/) comes with a super simple but fully featured terminal UI, 
all the same data available in the [html-report](https://pb33f.io/openapi-changes/html-report/), just explorable from a terminal window.

---

{{< inline-figure "*terminal-ui*" "terminal UIs are cool, you will never be able to convince me otherwise." >}}

## Github friendly

[openapi-changes](https://pb33f.io/openapi-changes/) comes with support for Github out of the box. 
There is no need to check out the entire repository; point at the repo, and the tool will do the rest!

---

## Take a quick tour.

If you'd like a quick tour of the tooling, I have created a [short tutorial]({{< ref "/articles/openapi-changes-walkthrough" >}}) that walks through its basic functionality and how to use it.

Try the [online demo](https://pb33f.io/openapi-changes/demo/); nothing to download, and get a taste of how it operates.

 




































