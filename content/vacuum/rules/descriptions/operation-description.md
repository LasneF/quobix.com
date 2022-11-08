---
title: operation-description
linkTitle: operation-description
date: 2022-06-26T15:58:17-04:00
draft: false
description: |
  Validates operations or summaries have descriptions and that they meet a minimum number of words.
severity: warn
recommended: true
ruleType: validation
functionType: openapi
functionName: oasDescriptions
type: vacuum
layout: rule
formats:
  - "oas2"
  - "oas3"
---

Checks that an [Operation Object](https://swagger.io/specification/#operation-object) contains a `description` OR a 
`summary`and that it meets a minimum number of words.

Descriptions and summaries for operations are **really important**. Documentation generation tools use this description as the main 
bulk of the documentation for the operation. 

It's amazing how often API authors leave this blank or don't put anything meaningful in here. 

The reason why both `description` and `summary` are checked? People tend to use them differently, sometimes omitting
one, or the other, depending on how the specification is used.

## Why did this violation appear?

An [Operation Object](https://swagger.io/specification/#operation-object) or more are missing a `description` AND `summary`, or the
if there is one, it's got too few words to pass. 

### Bad example

```yaml
paths:
  /vacuum/rules:
    post:
      responses:
        '200':
          ...
```

### Good example

```yaml
paths:
  /vacuum/rules:
    post:
      description: "This is an operation that returns interesting rules."
      responses:
        '200':
          ...
```
## How do I fix this violation?

Add a `description` or a `summary` to the Operation, make it meaningful and useful.

### Spectral Equivalent

The rule is equivalent to [operation-description](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-description)