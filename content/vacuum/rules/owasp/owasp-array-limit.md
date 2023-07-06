---
title: owasp-array-limit
linkTitle: owasp-array-limit
date: 2023-07-06T06:07:43-04:00
draft: false
description: |
  Schema of type array must specify maxItems
severity: error
recommended: true
ruleType: OWASP
functionType: core
functionName: schema
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

Array size should be limited to mitigate resource exhaustion attacks. Ensure that `maxItems` has been specified.

## JSONPath used

`$..[?(@.type)]`

### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: array
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: array
      maxItems: 99
```

### How do I fix this violation?

Use `maxItems` to ensure there is an upper limit on the number of items in the array to be returned.


