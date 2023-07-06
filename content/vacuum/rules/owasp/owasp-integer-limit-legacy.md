---
title: owasp-integer-limit-legacy
linkTitle: owasp-integer-limit-legacy
date: 2023-07-06T06:46:43-04:00
draft: false
description: |
  Schema of type integer must specify minimum and maximum values.
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

Integers should be limited to mitigate resource exhaustion attacks. Ensure that `minimum` and `maximum` have been defined.

This rule **does not check** for 3.1 `exclisiveMinimum` and `exclusiveMaximum` properties.

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
      maximum: 99
      minimum: 1
```

### How do I fix this violation?

Ensure that `minimum` and `maximum` have been specified on integer values.


