---
title: "Why should you care?"
linkTitle: "Why?"
strapline: "Questions you may be asking yourself"
date: 2022-07-01T12:20:04-04:00
draft: false
menu:
  vacuum:
    weight: 3
type: vacuum

---


## Why should I care about OpenAPI?

[Open API](https://www.openapis.org/) is the **_de-facto_** choice for designing and documenting REST APIs. Following an **API First**[^1][^2][^3]
strategy allows teams to design and define, test, mock and explore APIs without building any code. 

It allows service providers and consumers to work independently, using a strongly defined, rich API contract.

## Why do I need an OpenAPI linter?

We are human and we suck at writing. Even when something looks syntactically correct, it will probably still read like garbage. 

There are more than likely missing examples, poor descriptions, invalid mis-matched version syntax and all kinds of other syntax issues.

Without a linter, you have no idea if your contract is **high quality**.

## Why should I use this one?

See how fast it is compared to [Spectral](https://stoplight.io/open-source/spectral).

{{<youtube id="slYFjMpcb_c" autoplay="true">}}

### Why is it so fast?

After [architecting and leading]({{< relref "author" >}}) multiple company-wide initiatives over multiple years to solve OpenAPI quality problems
at a [tech mega-corporation]({{< relref "/articles/thanks-vmware" >}}), no linter operated at the scale and speed we required.

Linting was the slowest, clunkiest and the most painful part of processing OpenAPI specifications at scale. All the tools were/are still
built in TypeScript, which is great - if you like going slow.

vacuum **solves all these problems, completely**.

## Why build this?

[I personally]({{< relref "author" >}}) **really care** about this. I am not happy with the tools on the market, and they do
not work in the way I want to consume them. vacuum is designed to be [experience]({{< relref "/articles/experience-engineering" >}}) first.

[^1]: [Understanding  the API-First Approach to Building Products](https://swagger.io/resources/articles/adopting-an-api-first-approach/)
[^2]: [What is API-first?](https://tyk.io/blog/res-what-is-api-first/)
[^3]: [Postman state of API](https://www.postman.com/state-of-api/api-first-strategies/#api-first-strategies)

