---
title: "report command"
linkTitle: "vacuum Report"
date: 2022-07-04T07:39:53-04:00
description: "Build a 'vacuum sealed' report that is re-playable."
strapline: vacuum-sealed analytics, high fidelity data.
draft: false
type: vacuum
menu:
  vacuum:
    parent: "CLI Commands"
    weight: 2
---

---

The `report` command will generate a high fidelity recording of a linting run. The report is a **replayable**
data set that can be used to re-render any vacuum report using either the
[dashboard]({{< relref "/vacuum/commands/dashboard" >}}), or the [html-report]({{< relref "/vacuum/commands/html-report" >}})
commands.

The original results are preserved and won't be changed, regardless how many times the report is re-rendered. 

{{< terminal-window 
    "vacuum report" 
    "vacuum" 
    "report">}}vacuum report my-openapi-spec.yaml myreport{{< /terminal-window >}}

This will generate a report from your _my-openapi-spec.yaml_ and will save the file as **myreport-MM-DD-YY-HH-MM-SS.json**

You can save these reports and replay them when ever you want, soon you will be able to replay multiple reports, over time!

## Compression is best

One thing that I highly recommend, is using **compression** with vacuum reports. It's all automatic, all that is required
is to pass the `-c` or `--compress` flags.

The compressed file is **significantly** smaller than the original specification, tiny really.

When re-playing a compressed report, vacuum will automatically detect that it's compressed, and unpack things.

{{< terminal-window
"vacuum report with compression"
"vacuum"
"report" "-c">}}vacuum report -c model/test_files/petstorev3.json myreport{{< /terminal-window >}}

This will generate a **_compressed_** report from your _my-openapi-spec.yaml_ and will save the file as 
**myreport-MM-DD-YY-HH-MM-SS.json.gz**.


## Available Flags

`report` supports the following flags

| Short |     Full      |  Input  | Description                                                        |
|:-----:|:-------------:|:-------:|:-------------------------------------------------------------------|
|  -c   | _--compress_  | `bool`  | Compress the report with gzip (**_recommended_**)                  |
|  -n   | _--no-pretty_ | `bool`  | Render a machine-only version (_can't be used with_ `-c`)          |
|  -h   |   _--help_    | `bool`  | Show help screen and all flag details                              |
|  -q   | _--no-style_  | `bool`  | Disable color and style console output (useful for CI/CD)          |
|  -i   |   _--stdin_   | `bool`  | Use `stdin` instead of reading OpenAPI spec from a file            |
|  -o   |  _--stdout_   | `bool`  | Use `stdout` instead of writing report to a file                   |
|  -j   |   _--junit_   | `bool`  | Render a [JUnit](https://github.com/testmoapp/junitxml) XML report |

## Global Flags

`report` supports the following _global_ flags

| Short |     Full     |  Input   | Description                              |
|:-----:|:------------:|:--------:|:-----------------------------------------|
|  -r   | _--ruleset_  | `string` | Use an existing ruleset file for linting |
|  -t   |   _--time_   |  `bool`  | Show how long vacuum took to run (_ms_)  |

> Full flags begin with a double hyphen.

## Examples

Want something easy to copy and paste?

### Optimized for machines, without compression

{{< terminal-window
"vacuum report with no-pretty"
"vacuum"
"report"
"-n">}}vacuum report -n model/test_files/petstorev3.json petstore{{< /terminal-window >}}

### Use an existing RuleSet with compression

{{< terminal-window
"vacuum report using ruleset"
"vacuum"
"report"
"-r,-c">}}vacuum report -r rulesets/examples/specific-ruleset.yaml \
-c model/test_files/petstorev3.json petstore{{< /terminal-window >}}

### Use stdin and stdout

Here is an example of how to use `stdin` and `stdout` with the `report` command, and pipe
the output to `jq`

{{< terminal-window
"vacuum report using stdin and stdout"
"echo"
"vacuum"
"report,-i,-o,jq">}}echo "openapi: 3.0.1" | vacuum report -i -o | jq {{< /terminal-window >}}



## Compatible commands

Reports can be replayed through the following commands: 

- [Dashboard]({{< relref "/vacuum/commands/dashboard" >}})
- [HTML Report]({{< relref "/vacuum/commands/html-report" >}})