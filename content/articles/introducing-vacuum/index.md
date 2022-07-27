---
title: "Introducing vacuum"
date: 2022-07-25T06:46:55-05:00
draft: false
menu: "articles"
description: "I've spent almost a year building the world's fastest and most scalable OpenAPI linter. Here is why and the story behind it."
strapline: "The world's fastest and most scalable OpenAPI quality analysis tool."
hero: "images/hero-images/vacuum-hero.png"
heroSVG: "images/hero-images/vacuum-hero.png"
heroTitle: "vacuum is an ultra-fast, scalable and extendable OpenAPI linter, built in golang"
heroAlt: "Golang gopher holding a vacuum, sucking up the OpenAPI logo, over the title 'introducing vacuum'"
---

I want to take you back to the fizzy and exciting times of 2016.

I had just exited the [M.A.R.V.I.N project]({{< relref "/articles/marvin">}}) at VMware and was a _little lost_.

I had **no mission** and **no goals**. I was floating in the ether, looking for gaps, holes, anything that I could
fill up with and hide for a while so that I could collect my thoughts.

---

## A stranger with a smile

One afternoon in February or March, a gentleman named _Akmal Khan_ approached me. Akmal has over 40 years of engineering
and leadership experience.

We started talking, and **_instantly connected_** - his brain **worked like mine**.

Within a week, we were whiteboarding all kinds of crazy concepts, we didn't have a mission, but we had buckets of invention ideas.


{{< image-grid >}}
{{< image-grid-item "*whiteboard-1*" "Exploratory Architectures" "Image of a whiteboard with sketches and scribbles" >}}
{{< image-grid-item "*whiteboard-2*" "Random Ideas" "Image of a whiteboard with sketches and scribbles" >}}
{{< image-grid-item "*whiteboard-4*" "What if we...?" "Image of a whiteboard with sketches and scribbles" >}}
{{< /image-grid >}}



## The gap

As we became friends and spent hours thinking out loud and drawing, a new initiative blipped on my radar:
[VMware Cloud on AWS.](https://www.vmware.com/products/vmc-on-aws/)

Suddenly a flood of new REST APIs popped up, and we needed a cloud console to wire up all these APIs. Luckily the engineering team had chosen [OpenAPI](https://www.openapis.org/) to document the APIs.

Akmal and I started looking at ways to automatically consume the [OpenAPI](https://www.openapis.org/) specifications and create code for the UI.

We quickly realized that the Open Source landscape for OpenAPI was **_pretty bad_**.

Frankly, the landscape was **awful** (back then). There were tools for generating code (but the code was garbage), and there were tools
for documentation that wasn't very good at all.

There were also tools to validate / lint the specifications, but they were not performant or valuable.

---

## The opportunity

We realized that investing in building bullet-proof [OpenAPI](https://www.openapis.org/) tools would help us accelerate and dramatically reduce developer toil and bugs.

Akmal started coding like crazy, building low-level libraries and code generators that worked much better (and still do) than most tooling on the market.

It was successful! It worked and allowed me to step things up significantly with [OpenAPI](https://www.openapis.org/) at VMware.

---

## Project EVE

Fast forward to Summer 2019. It was the before times, before COVID - life was good. I had put together a pitch deck with
[Jehad Affoneh](https://www.mynameisjehad.com), in which we explained how we could re-imagine all the developer tools, docs, and experiences by adopting the [OpenAPI](https://www.openapis.org/) Standard.

I pitched it to SVPs and GMs, who all bought into it; everyone did; it was a no-brainer. **We got funded**!

We called it Project EVE with a public-facing name of [VMware DX](https://twitter.com/vmwaredx)

The first tool to build was a valuable linter for [OpenAPI](https://www.openapis.org/) that we could use in our higher-level tools to measure
quality. We looked at the market and tried out [Spectral](https://stoplight.io/open-source/spectral) but quickly learned it wasn't suitable.

---

## JavaScript is excellent, but it's not for everything

[Stoplight](https://stoplight.io) built [Spectral](https://stoplight.io/open-source/spectral) in JavaScript. We started feeding in our enterprise-grade,
super large, and complex OpenAPI Specs into Spectral. 10-30 seconds later, we would get a result.

Thousands and thousands of warnings and errors made no sense and no idea how to fix them or why.

The experience was **poor**, to be honest—slow and **_mostly spewing noise_**.

---


## It turns out building a fast, helpful linter is hard

After three months, the team **abandoned the linter**. It just _wasn't working_, and it **_wasn't adding any value_**.

{{< info-box >}}
It kept on blowing up or giving unhelpful results.
{{< /info-box >}}

**We failed hard**. I was personally **_very disappointed_**, and I had done an inferior job of setting the right vision.
If I knew then what I know now, things would be very different for that tool.

It's the **most critical** element that a quality analysis engine needs. We needed to know the specification as a compiler does.

Without this component, I **_knew we would hit performance issues down the road_**.

We decided to pivot to focus on the next most important thing - documentation. More on that another day; for now, continuing
to use [Spectral](https://stoplight.io/open-source/spectral) for linting was our only option.

> Le sigh.

---

## The debt comes due

A year later, in early 2021, the rest of Project EVE is **going well**. We have built some excellent tools, one of which is called the
**_Printing Press_**, which powers very large-scale [OpenAPI](https://www.openapis.org/) documentation for VMware.

We had launched new [API docs](https://developer.vmware.com/apis/vsphere-automation/latest/) and [PowerCLI](https://developer.vmware.com/powercli)
docs, all generated from EVE tooling. Looking good!

**_But, it wasn't all good._**

---

I started working on some new services that depended on [Spectral](https://stoplight.io/open-source/spectral).
These were _real-time_ experiences, and **speed** was a **_hard requirement_**.

[Spectral](https://stoplight.io/open-source/spectral) could not do what I needed it to do. Large specs **choke** the tooling.

There was no other option at the time -
however, [ReDocly](https://redocly.com/docs/cli/) has a much faster option for linting. [ReDocly](https://redocly.com/docs/cli/)
still suffers from the same problems at scale that [Spectral](https://stoplight.io/open-source/spectral) does.

The technical debt **_I knew would come to bite_** had created a barrier with no way around it, and I didn't have the time or
the resources to solve the problem the way it is needed.

{{< default-box >}}
If you're interested in learning more about EVE, you can watch this talk I gave at [Tech Field Day](https://techfieldday.com/) 10
{{< /default-box >}}

{{< youtube X0_9AqIOugk >}}

---

## If you want something done

VMware built all the EVE tooling in golang with my direction. Without a golang linter that ran  at least **1000x**, the speed of
[Spectral](https://stoplight.io/open-source/spectral), there was **_no way_** to execute my vision.

In October 2021, I decided to _roll up my sleeves_ and do the hard work, on my **own** time, on **my dollar**. No-one else
was going to fund the effort, except me.

I started building the linter I knew was required to accomplish many higher-level goals for OpenAPI tooling.

One requirement was that the tool is a **drop-in replacement** for [Spectral](https://stoplight.io/open-source/spectral).

---

## How hard can it be?

The deeper I went, I realized that I had more and more problems to solve. Building a fully featured, extensible schema
linter from the ground up is not easy at all.

I had to build the [JSON Schema](https://json-schema.org/) resolver **four times**. My designs were unstable and slowed
down with scale.

My code **_didn't hold up to testing_**, mainly because of the potential for highly recursive graph data structures.
I stood in my kitchen at night _scratching my head_ on many evenings, trying to figure it out.

My [impostor syndrome]({{< relref "/articles/impostor-syndrome">}}) was in full swing, and I slid into [the pit of despair](/articles/impostor-syndrome/#the-dunning-kruger-graph).

There were multiple points where I felt like **_I didn't know what I was doing_**, and I almost quit twice.
It took me months and thousands of tests to get it right. The solution was to **change strategy** and use an index design.

[Learn more about how I solved the speed problems]({{< relref "/vacuum/api/spec-index">}}) using an index.

---

## Ten months later
{{< success-box >}}
vacuum is now **ready**, and she is the **_fastest_**, most comprehensive OpenAPI linter on the planet.
{{< /success-box >}}
But don't take my word for it; try it with one of your OpenAPI specs below.

<vacuum-online></vacuum-online>

> If you need a spec to try out, why not use the [Petstore Example](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml)

---

vacuum is fully compatible with, yet **_exponentially faster_** than [Spectral](https://stoplight.io/open-source/spectral).

There are also unique features available in vacuum that aren't available anywhere else, like a
[console UI and dashboard]({{< relref "/vacuum/commands/dashboard">}})
and [vacuum sealed reports]({{< relref "/vacuum/commands/report">}}) with much higher fidelity than [Spectral](https://stoplight.io/open-source/spectral).

---

### See the speed for yourself

{{< youtube slYFjMpcb_c >}}

---


## Designed for developers

Suppose you want to bring ultra-fast OpenAPI linting directly into your golang application. In that case, there is a
straightforward [set of APIs]({{< relref "/vacuum/api/getting-started">}}) to do just that.

---

## What's next?

[vacuum]({{< relref "/vacuum">}}) is just the first part of a much larger story that I am building around APIs and developer experience.
I hope it helps you on your journey with [OpenAPI](https://www.openapis.org/) and API quality.

Learn more about getting set up with vacuum in 30 seconds [in this tutorial]({{< relref "/vacuum/start">}}),
or [why you should care]({{< relref "/vacuum/why">}}) about API-First and quality analysis.

If you're in the mood for code, [you can read all of it on Github](https://github.com/daveshanley/vacuum).
