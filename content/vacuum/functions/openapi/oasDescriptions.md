---
title: oasDescriptions
linkTitle: oasDescriptions
date: 2022-06-26T15:39:53-04:00
draft: false
description: |
    Checks operation descriptions have been set, and meet a minimum word count.
type: vacuum
layout: function

---

`oasDescriptions` Checks operation descriptions have been set, and meet a minimum word count.

The function will check for **both** a description **AND** a summary. If neither is found, then a warning will be
triggered.

### How do I use this function?

**_pattern_** is configured by the following `functionOptions`

|   NAME   | DESCRIPTION                                             |   TYPE    | REQUIRED? |
|:--------:|---------------------------------------------------------|:---------:|:---------:|
| minWords | Minimum words that must be included (default is **1**)  | `integer` |    yes    |

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
operation-descriptions:
  description: "Operations should have at least 5 words"
  type: "validation"
  recommended: true
  severity: "warn"
  given: "$"
  then:
    function: "oasDescriptions"
    functionOptions:
      minWords: 5
```

The function is used by
the [operation-descriptions]({{< relref "/vacuum/rules/descriptions/operation-description" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_parameters.go)