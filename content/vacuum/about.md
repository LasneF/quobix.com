---
title: "What is vacuum?"
linkTitle: "About vacuum"
strapline: "The world's fastest OpenAPI linter."
date: 2022-06-12T06:25:04-04:00
draft: false
menu: 
  vacuum:
    weight: 2
type: vacuum
---

---

vacuum is an **ultra-super-fast**, lightweight [OpenAPI](https://www.openapis.org/) linter and quality checking tool, inspired by
[Spectral](https://github.com/stoplightio/spectral).

It's also compatible with existing [Spectral](https://github.com/stoplightio/spectral) rulesets and generates compatible 
Spectral reports.

---

{{< info-box >}}
vacuum can suck all the lint of a 5mb OpenAPI spec in about 250ms.
{{< /info-box >}}

Designed to reliably lint [OpenAPI](https://www.openapis.org/) specifications, **very, very quickly**. Including _very large_ ones.
[Spectral](https://github.com/stoplightio/spectral). can be quite slow when used as an API and does not scale for enterprise applications.

vacuum will tell you what is wrong with your spec, why, where and how to fix it. It will work at scale and is designed as a CLI (with a UI) and a library to be consumed in other applications.



## Why does it exist?

When I worked at [VMware](https://www.vmware.com/), We needed a quality linter to start understanding just how well the API landscape held up across the company. 

There were thousands of different OpenAPI specs, across a large number of business units. It was my job to try and make sense of it all.

[Spectral](https://github.com/stoplightio/spectral) was the only credible linter available at the time to build on top of, Which is great, 
because spectral does a good job, except for one thing...

{{< error-box >}}
Spectral is really slow against large and multiple specs.
{{< /error-box >}}


## We need a faster linter

We needed something compiled and fast, even Java would have been too slow.

I was talking to my colleague [Steve Trefethen](https://ca-17.com/) about this major pain point with our engineering capability one day, 
particularly how slow Spectral was when trying to operate it as a service.

Steve Said:

> "What we really need is a drop in replacement for Spectral"

I said: 

> "I am going to build it."

So I did. 

## World's fastest OpenAPI linter.

vacuum is much, **much** faster than both [Spectral](https://github.com/stoplightio/spectral) and [ReDocly](https://github.com/Redocly/redocly-cli).

It's faster because it's written in golang, it's multi-threaded and uses an [index](/vacuum/api/spec-index/) for complex rules.

It's also been designed as a [golang library](/vacuum/api/getting-started/) from the ground up.

## What makes vacuum different?

It's been designed with enterprise & large scale use, as well as having a console UI, a rad, interactive HTML report as
well as a '[vacuum sealed report](/vacuum/commands/report/)' that allows re-rendering of any report in time, without losing any fidelity or re-running
new logic that could change results.

## Origin story

[Read more about the origin story behind vacuum]({{< relref "/articles/introducing-vacuum" >}}).


## About these docs

These documents are hand-crafted. They are not auto-generated, they have been deliberately written to be easy
to understand, easy to read and easy to navigate. [SEO](https://developers.google.com/search/docs/beginner/seo-starter-guide),
[performance](https://developer.mozilla.org/en-US/docs/Learn/Performance/What_is_web_performance) and 
[a11y](https://www.a11yproject.com/) have been critical factors in the design
and architecture of how these documents are structured and delivered.

### Technology stack

All of [quobix.com](https://quobix.com) is powered by [hugo](https://gohugo.io/). hugo is just about perfect for
this type of content delivery, I fell in love with hugo about a year ago. There **isn't** a webapp on planet earth 
that you **cannot** build with hugo. It's an old-school design, with a nu-school stack.

I've been [building apps](/author) for 
quarter of a century (_at the time of writing_ - July 2022) and during that time I have designed multiple commercial content management 
systems (CMS) in the past. I wish [hugo](https://gohugo.io/) existed then, I would never have wasted my time.

#### Interactivity

There is [always a need for interactive elements in any interface](/articles/experience-engineering). After personally 
experiencing the [JavaScript Renaissance](https://medium.com/@alexbeletsky/renaissance-of-javascript-485118447cf9) in the
mid-to late 2000's, I've enjoyed watching and exploring the landscape as it shifts and changes.

I asked myself these questions:

> _Should I use React?_ I need ultra speed and power - _will it deliver_?

React uses something called [Virtual DOM](https://reactjs.org/docs/faq-internals.html). the TL;DR version is 
that a 'copy' of the actual [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) 
is kept in memory. The memory version of the DOM is the source of truth, that's
the model that is mutated. React then '_prints_' the state to the actual DOM, using magic.

Which led to the conclusion:

> No, _Magic is slow_. 

So what JavaScript framework **will** provide all the power of [Grey Skull](https://www.youtube.com/watch?v=V8h8snfYidg)?

The answer was **easy**. It's **_No framework_**, use native browser APIs. Use [WebComponents](https://www.webcomponents.org)

> Wait, what about all the boilerplate?

Yeah, this is an issue at scale, lots of copy pasta, lots of mess. There are [some options](https://github.com/webcomponents/element-boilerplate)
but, they suck and look abandoned.

This is where [Lit](https://lit.dev/) comes into the picture. It provides some [Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html)
for WebComponent development that builds out the boilerplate at compile time. [Lit](https://lit.dev/) is **not**, and 
**does not** provide a run-time, it simply builds out the same boilerplate code you would need to anyway.

[WebComponents](https://www.webcomponents.org) are the future, [Lit](https://lit.dev/) makes them easier to use
than React. 

You may still be thinking..

> Cool story bro, but, mmm... nah, I will stick with React.

I would ask you a question: 

> "Do you like slow service?"

Followed by another question:

> "Do you think your customers like slow service from you?"

If you answer '**no**', Then check out [Lit](https://lit.dev/).
