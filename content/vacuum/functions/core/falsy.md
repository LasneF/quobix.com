---
title: falsy
linkTitle: falsy
date: 2023-07-22T12:39:53-04:00
draft: false
description: |
    Checks that a property has not been defined or does not exist.
type: vacuum
layout: function

---

`falsy` will check that a given **JSON Path** does not exist, or has been not defined or is empty.

The value should not be `true` or an empty string `""` or a `null` object

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
my-important-rule:
  description: This is an important rule
  message: "'chicken' or 'nugget' has been defined! Oh no! You need to remove it!"
  given: $.some.path
  then:
    - field: chicken
      function: falsy
    - field: nugget
      function: falsy
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#falsy)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/falsy.go)