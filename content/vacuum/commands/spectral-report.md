---
title: "spectral-report command"
linkTitle: "Spectral Report"
description: "Build a Spectral compatible JSON report"
date: 2022-07-04T07:39:53-04:00
strapline: A drop-in replacement for Spectral reports.
draft: false
type: vacuum
menu:
  vacuum:
    parent: "CLI Commands"
    weight: 5
---

---

The `spectral-report` command will generate a linting report that is the same as the [Spectral JSON](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTg1-spectral-cli)
output. It's a **drop-in replacement** for any application using [Spectral](https://stoplight.io/open-source/spectral),
but wants to go **_much faster_**.

{{< terminal-window 
    "vacuum spectral report" 
    "vacuum" 
    "spectral-report">}}vacuum spectral-report my-openapi-spec.yaml spectral.json{{< /terminal-window >}}

This will generate a report from your _my-openapi-spec.yaml_ and will save the file as **spectral.json**

If you leave the optional second argument off, then the default file output of **vacuum-spectral-report.json** will
be used.

## Available Flags

`spectral-report` supports the following flags

| Short |     Full     |  Input  | Description                                                |
|:-----:|:------------:|:-------:|:-----------------------------------------------------------|
|  -h   |   _--help_   | `bool`  | Show help screen and all flag details                      |
|  -q   | _--no-style_ | `bool`  | Disable color and style console output (useful for CI/CD)  |
|  -i   |  _--stdin_   | `bool`  | Use `stdin` instead of reading OpenAPI spec from a file    |
|  -o   |  _--stdout_  | `bool`  | Use `stdout` instead of writing Spectral report to a file  |

## Global Flags

`spectral-report` supports the following _global_ flags

| Short |     Full     |  Input   | Description                              |
|:-----:|:------------:|:--------:|:-----------------------------------------|
|  -r   | _--ruleset_  | `string` | Use an existing ruleset file for linting |
|  -t   |   _--time_   |  `bool`  | Show how long vacuum took to run (_ms_)  |

> Full flags begin with a double hyphen.

## Examples

### Use stdin and stdout

Here is an example of how to use `stdin` and `stdout` with the `spectral-report` command, and pipe
the output to `jq`

{{< terminal-window
"vacuum spectral-report using stdin and stdout"
"echo"
"vacuum"
"spectral-report,-i,-o,jq">}}echo "openapi: 3.0.1" | vacuum spectral-report -i -o | jq {{< /terminal-window >}}
