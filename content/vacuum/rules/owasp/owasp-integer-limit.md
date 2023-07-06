---
title: owasp-integer-limit
linkTitle: owasp-integer-limit
date: 2023-07-06T06:42:43-04:00
draft: false
description: |
  Schema of type integer must specify minimum and maximum values (3.1+).
severity: error
recommended: true
ruleType: OWASP
functionType: core
functionName: schema
type: vacuum
layout: rule
formats:
  - "oas3"
---

Integers should be limited to mitigate resource exhaustion attacks. Ensure that `minimum` and `maximum` or `exclusiveMinimum` and `exclusiveMaximum` have been specified.
(or a combination of them)


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
      type: integer
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: integer
      exclusiveMinimum: 1
      maximum: 99
```

### How do I fix this violation?

Ensure that `minimum` and `maximum` or `exclusiveMinimum` and `exclusiveMaximum` (or used in a combination between them)
have been specified on integer values.


