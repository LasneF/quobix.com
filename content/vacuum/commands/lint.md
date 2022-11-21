---
title: "lint command"
linkTitle: "Lint"
date: 2022-07-03T07:39:53-04:00
strapline: Lint an OpenAPI Specification.
description: "Lint an OpenAPI spec and see results in the console."
draft: false
type: vacuum
menu:
  vacuum:
    parent: "CLI Commands"
    weight: 1
---

---

The fastest way to see something useful is to print something out to the console.

{{< terminal-window 
    "lint" 
    "vacuum" 
    "lint">}}vacuum lint my-openapi-spec.yaml{{< /terminal-window >}}

This will print a summary of your linting results. The `lint` command will use the 
[Recommended RuleSet]({{< relref "/vacuum/rulesets/recommended" >}}).

## Just want to try things out?

If you don't have an OpenAPI spec and you want to see something, you can run it against one of the
[test specifications](https://github.com/daveshanley/vacuum/tree/main/model/test_files). A good one to try
is the **petstorev3.json** specification.

{{< terminal-window
"lint"
"vacuum"
"lint">}}vacuum lint model/test_files/petstorev3.json{{< /terminal-window >}}

## Available Flags

`lint` supports the following flags

| Short |       Full        |  Input   | Description                                                                 |
|:-----:|:-----------------:|:--------:|:----------------------------------------------------------------------------|
|  -d   |    _--details_    |  `bool`  | Show full details of the linting report                                     |
|  -c   |   _--category_    | `string` | Used with `-d`, Show a single category of results                           |
|  -e   |    _--errors_     |  `bool`  | Used with `-d`, Show only reported errors                                   |
|  -x   |    _--silent_     |  `bool`  | Show no output, except for the linting result                               |
|  -s   |  _--snippets_     |  `bool`  | Used with `-d`, shows highlighted code in console                           |
|  -n   | _--fail-severity_ | `string` | Set the level at which an error return code is thrown (defaults to `error`) |
|  -h   |     _--help_      |  `bool`  | Show help screen and all flag details                                       |

## Global Flags

`lint` supports the following _global_ flags
    
| Short |       Full        |  Input   | Description                                                                 |
|:-----:|:-----------------:|:--------:|:----------------------------------------------------------------------------|
|  -r   |    _--ruleset_    | `string` | Use an existing ruleset file for linting                                    |
|  -t   |     _--time_      |  `bool`  | Show how long it took to lint the spec in (_ms_)                            |

> Full flags begin with a double hyphen.

## Examples

Want something easy to copy and paste?

### Using an existing RuleSet

{{< terminal-window
"lint"
"vacuum"
"lint"
"-r">}}vacuum lint -r rulesets/examples/specific-ruleset.yaml \
model/test_files/petstorev3.json{{< /terminal-window >}}


### Single category

{{< terminal-window
"lint"
"vacuum"
"lint"
"-d,-c">}}vacuum lint -d -c operations model/test_files/petstorev3.json{{< /terminal-window >}}

### Single category with snippets

{{< terminal-window
"lint"
"vacuum"
"lint"
"-d,-s,-c">}}vacuum lint -d -s -c operations model/test_files/petstorev3.json{{< /terminal-window >}}

### Only show errors 

{{< terminal-window
"lint"
"vacuum"
"lint"
"-d,-e">}}vacuum lint -d -e model/test_files/asana.yaml{{< /terminal-window >}}


