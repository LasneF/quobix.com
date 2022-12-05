---
title: "html-report command"
linkTitle: "HTML Report"
date: 2022-07-04T07:39:53-04:00
description: "View linting report in a browser, in style."
strapline: Explore linting analytics, in style.
draft: false
type: vacuum
menu:
  vacuum:
    parent: "CLI Commands"
    weight: 4
---

---

Ahh, the traditional generated HTML report. Quite often, they are a real let-down.

I wanted to do something **_not awful_** when it comes to the HTML report. vacuum can generate a self-contained
interactive UI experience for exploring linting results from an OpenAPI specification, or a 
[vacuum report]({{< relref "/vacuum/commands/report" >}}).

The report has **no dependencies**, and it makes **no network calls**. The HTML file that is generated, is fully 
self-contained, it can be used **_without_** an internet connection.


{{< success-box >}}
It's ideal for rendering in a CI/CD pipeline, easily viewable by anyone.
{{< /success-box >}}

The report is generated in milliseconds and loads just as fast, even for enormous specifications!

The report uses [WebComponents](https://www.webcomponents.org/) via [Lit](https://lit.dev/), which means
it renders **really, really fast**.

---

## Build a report from an OpenAPI Spec

Use the `html-report` command followed by a path to your OpenAPI Spec. There is a second optional argument
that allows the naming of the report file, otherwise it defaults to **report.html**.

{{< terminal-window
"html report"
"vacuum"
"html-report">}}vacuum html-report my-openapi-spec.yaml{{< /terminal-window >}} 

There should be a file named **report.html** in the current working direction. Open it up in your favorite browser.s

### Change the report output file

{{< terminal-window
"html report"
"vacuum"
"html-report">}}vacuum html-report my-openapi-spec.yaml new-name.html{{< /terminal-window >}}

### Load a vacuum report

Load a [vacuum report]({{< relref "/vacuum/commands/report" >}}) and render the results as they were recorded,
without re-running any linting rules or indexing.

{{< terminal-window
"html report"
"vacuum"
"html-report">}}vacuum html-report &lt;myspec-report-07-04-22-12-13-22.json.gz&gt;{{< /terminal-window >}}

## Flags

`lint` supports the following flags

| Short |         Full         | Input  | Description                                               |
|:-----:|:--------------------:|:------:|:----------------------------------------------------------|
|  -d   | _--disableTimestamp_ | `bool` | Disable the timestamp from being generated on the report. |

## Global Flags

`lint` supports the following _global_ flags

| Short |     Full     |  Input   | Description                                       |
|:-----:|:------------:|:--------:|:--------------------------------------------------|
|  -r   | _--ruleset_  | `string` | Use an existing ruleset file for linting          |

## Examples

Want to see an example report? Don't have an OpenAPI spec? 

Make sure you have [checked out the source]({{< relref "/vacuum/installing#checkout-from-source">}}), and 
you're in the **vacuum** directory, then you can use example specs:

### Stripe

{{< terminal-window
"report for stripe"
"vacuum"
"html-report">}}vacuum html-report model/test_files/stripe.yaml{{< /terminal-window >}}


### Asana

{{< terminal-window
"report for asana"
"vacuum"
"html-report">}}vacuum html-report model/test_files/asana.yaml{{< /terminal-window >}}

### Kubernetes

{{< terminal-window
"report for kubernetes"
"vacuum"
"html-report">}}vacuum html-report model/test_files/k8s.yaml{{< /terminal-window >}}
