---
title: "Introducing vacuum"
date: 2022-07-24T10:46:55-05:00
draft: true
menu: "articles"
description: "I'd like to introduce you to the world's fastest and most scalable OpenAPI linter"
strapline: "The world's fastest and most scalable OpenAPI quality analysis tool"
hero: "images/hero-images/impostor-syndrome.png"
heroSVG: "images/hero-images/impostor-syndrome.png"
heroTitle: "vacuum is an ultra-fast, scalable and extendable OpenAPI linter, built in golang"
heroAlt: "Golang gopher holding a vacuum, sucking up the OpenAPI logo, over the title 'introducing vacuum'"
---

## I have a confession to make.

But before I do, I want to take you back to the fizzy and exciting times of 2016. Donald Trump was running for president and...

> Ok, just a reminder for my fellow Americans, one of the more sobering tragedies of the last decade was the election of that insidious cretin.

I had just exited the M.A.R.V.I.N project at VMware and was a little lost. I had no mission, and I had no goals. I was floating in the ether, looking for gaps, holes, anything that I could fill up with myself and hide for a while so that I could collect my thoughts.

## A stranger with a smile.

One afternoon in February or March, a gentleman named Akmal Khan approached me. Akmal is a greybeard with over 40 years of engineering and leadership experience.

We started talking and instantly connected - his brain worked like mine. Within a week, we were whiteboarding all kinds of crazy concepts, we didn't have a mission, but we had buckets of invention ideas.

## The gap.

As we became friends and spent hours thinking out loud and drawing, a new initiative blipped on my radar: VMware Cloud on AWS.

Suddenly a flood of REST APIs popped up, and we needed a cloud console to wire up all these APIs. Luckily the engineering team had chosen OpenAPI to document the APIs.

Akmal and I started looking at ways to consume the OpenAPI specifications and create code for the UI automatically. We quickly realized that the Open Source landscape for OpenAPI was pretty bad.

Frankly, the landscape was awful. There were tools for generating code (but the code was garbage), and there were tools for documentation (that wasn't very good at all.

There were also tools to validate / lint the specifications (but they were dead slow and often spewed thousands of results that could not be understood or navigated.

## The opportunity.

We realized that investing in building bullet-proof OpenAPI tools would help us accelerate and dramatically reduce developer toil and bugs.

Akmal started coding like crazy, building low-level libraries and code generators that worked much better (and still do) than most tooling on the market.

It was successful! It worked and allowed me to step things up significantly with OpenAPI at VMware.

## Project EVE

Fast forward to Summer 2019. It was the before times, before COVID - life was good. I had put together a pitch deck with Jehad Affoneh explaining how we could re-imagine all the developer tools, docs, and experiences by adopting the OpenAPI Standard.

I pitched it to SVPs and GMs, whom all bought into it. We got funded!

The first tool we started on was a super fast linter for OpenAPI that we could use in our higher-level tools to measure quality. We looked at the market and tried out Spectral but quickly learned it wasn't suitable.

## JavaScript is excellent, but it's not for everything.

Stoplight built Spectral in JavaScript. We started feeding in our enterprise-grade, super large, and complex OpenAPI Specs into Spectral. 10-30 seconds later, we would get a result. Thousands and thousands of warnings and errors made no sense and no idea how to fix them or why.

The experience was poor, to be honest—slow and mostly spewing noise.

Trying to crunch through hundreds of thousands of lines of sizeable data super fast - is not suited for JS. Not if you want to go fast.

## It turns out building a fast, helpful linter is hard.

After three months, the team abandoned the linter. It just wasn't working, and it wasn't adding any value. It kept on blowing up or giving unhelpful results. We pivoted to documentation (using Akmal's libraries and tools at the core).

We failed hard. I was personally very disappointed, and I had done a poor job of setting the right vision. If I knew then what I know now, things would be very different for that tool.

It's the most critical element. A quality analysis engine needs to know the specification as a compiler does. Without this component, I knew we would hit performance issues down the road.

We decided to pivot to focus on the next most important thing - documentation. More on that another day; for now, continuing to use Spectral for linting was our only option—Le sigh.

## The debt comes due.

A year later, in early 2021, the rest of Project EVE is going well. We have built some excellent tools, and one is called the Printing Press, which powers very large-scale OpenAPI documentation for VMware. (https://developer.vmware.com/apis/vsphere-automation/latest/)

I had started work on some new services that depended on Spectral. These were real-time experiences, and speed was a hard requirement.

Spectral could not do what I needed it to do. Large specs choke the tooling. There was no other option at the time - however, ReDocly has a much faster option for linting. ReDocly still suffers from the same problems at scale that Spectral does.

The technical debt I knew would come to bite had created a barrier with no way around it, and I didn't have the time or the resources to solve the problem the way it needed.

## "If you want something done"...

VMware built all the EVE tooling in golang with my direction. Without a golang linter that ran 1000x the speed of Spectral, there was no way to execute my vision.

In October 2021, I decided to roll up my sleeves and do the hard work, on my own time, on my dollar. I started building the linter I knew was required to accomplish many higher-level goals for OpenAPI tooling. One requirement was that the tool should be a drop-in replacement for Spectral.

## How hard can it be?

The deeper I went, the more I realized that I had more and more problems to solve. Building a fully featured, extensible schema linter from the ground up is not easy at all.

## My confession.

I had to build the JSON Schema resolver four times. My designs were unstable and slowed down with scale. My code didn't hold up to testing, mainly because of the potential for highly recursive structures.

I stood in my kitchen at night scratching my head on many evenings, trying to figure it out. My impostor syndrome was in full swing, and I slid into the pit of despair. There were multiple points where I felt like I didn't know what I was doing.

I almost quit twice.

It took me months and thousands of tests to get it right. And then, things all started to come together.

Learn more about how I solved the speed problems using an index.

## Ten months later

vacuum is now ready, and she is the fastest, most comprehensive OpenAPI linter on the planet.

But don't take my word for it; try it with one of your OpenAPI specs below.

<vacuum-online></vacuum-online>

Not only is vacuum exponentially faster than Spectral, but it's also fully compatible with Spectral rulesets. vacuum can generate compatible with Spectral and has the same core functions.

There are also unique features available in vacuum that aren't available anywhere else, like a console UI and 'vacuum sealed in time' reports. Read more about them in 'why vacuum.'

## Designed for developers

Suppose you want to bring ultra-fast OpenAPI linting directly into your golang application. In that case, there is a straightforward set of APIs to do just that.

## What's next?

More console and HTML report experience refinement and more built-in rules.

vacuum is just the first part of a much larger story that I am building around APIs and developer experience. I hope it helps you on your journey with OpenAPI and API quality.

Learn more about getting set up with vacuum in this tutorial, or you can learn more about why you should care about OpenAPI and quality analysis.

If you're in the mood for code, you can read all of it on Github.













