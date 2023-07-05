---
title: owaspHeaderDefinition
linkTitle: owaspHeaderDefinition
date: 2023-07-05T16:32:05-04:00
draft: false
description: |
  Check if a header has been defined or not from the list of headers.  
type: vacuum
layout: function

---

**_owaspHeaderDefinition_** will check that headers have been defined with the supplied headers.

### How do I use this function?

This function is configured by the following `functionOptions`.

|   NAME   | DESCRIPTION                              |    TYPE    | REQUIRED? |
|:--------:|------------------------------------------|:----------:|:---------:|
| headers  | An array of all the headers to check for | `[]string` |    yes    |

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
my-security-rule:
  description: Check for the following rate limiting headers.
  type: validation
  given: $
  then:
    function: owaspHeaderDefinition
    functionOptions:
      headers:
        - X-RateLimit-Limit
        - RateLimit-Limit
        - RateLimit-Reset
```