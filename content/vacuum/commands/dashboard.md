---
title: "dashboard command"
linkTitle: "Dashboard"
date: 2022-07-04T07:39:53-04:00
description: "View linting report in a cool dashboard UI."
strapline: You know what? console UIs are really cool. 
draft: false
type: vacuum
menu:
  vacuum:
    parent: "CLI Commands"
    weight: 3
---

---

{{< info-box >}}
The console UI is an **early state of development**, it will change.
{{< /info-box >}}

Working in a terminal is an essential and every day part of any software or DevOps engineer's life. 
A terminal is perhaps the most common interface most of us use.

Console UIs are **not so common** these days, which is **_really strange_**. 

Using a browser based app is cool, but there is something **really** cool about a console UI. That's why
vacuum comes with a custom console UI for reviewing a linting run. I'm calling it the `dashboard` (_for now_)

---

## Run the dashboard against an OpenAPI spec

{{< warn-box >}}
The dashboard **cannot** be run on headless systems, like a CI/CD pipeline.
{{< /warn-box >}}

Run the `dashboard` command and pass in your OpenAPI spec, or 
[vacuum Report]({{< relref "/vacuum/commands/report" >}}).


{{< terminal-window
"vacuum report with no-pretty"
"vacuum"
"dashboard"
"-n">}}vacuum dashboard &lt;my-openapi-spec.yaml&gt;{{< /terminal-window >}}

> Make sure your terminal window is sized to at least **_1024x768_**

## Navigating the Dashboard

Everything is keyboard driven (no mouse).

| Action                  |     Keys      | Action Result                               |
|:------------------------|:-------------:|:--------------------------------------------|
| Select Category         |   ⬅️➡️/S,X    | Navigate between categories                 |
| Change Rule / Violation |    ⬆⬇/A,Z     | Change currently selected rule or violation |
| Select                  | &lt;Enter&gt; | Select a highlighted rule                   |
| Leave Rule              |  &lt;Esc&gt;  | Leave selected rule                         |
| Quit                    |   Q, Ctrl-C   | Leave selected rule                         |

## Replaying a report

The dashboard can [replay a vacuum report]({{< relref "/vacuum/commands/report" >}}). This means the dashboard
will load in all the results as they were captured Even if the current
specification is different to what it was when the report was captured.

Simply replace the **_&lt;my-openapi-spec.yaml&gt;_** with the report file, which will look something like 
**my-openapi-spec-report-07-04-22-12-30-21.json.gz**. vacuum will auto-detect the report file.

## Global Flags

`dashboard` supports the following _global_ flags

| Short |     Full     |  Input   | Description                                                       |
|:-----:|:------------:|:--------:|:------------------------------------------------------------------|
|  -r   | _--ruleset_  | `string` | Use an existing ruleset file for linting                          |
|  -p   | _--base_     | `string` | Base URL or Base working directory to use for relative references |
|  -k   | _--skip-check_ | `string` | Skip checking for a valid OpenAPI document, useful for linting fragments or non-OpenAPI documents    |
