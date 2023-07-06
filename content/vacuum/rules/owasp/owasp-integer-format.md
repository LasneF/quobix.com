---
title: owasp-integer-format
linkTitle: owasp-integer-format
date: 2023-07-06T06:50:43-04:00
draft: false
description: |
  Schema of type integer must specify format of `int32` or `int64`.
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

Schema of type integer must specify format of `int32` or `int64`.

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
      format: int64
```

### How do I fix this violation?

Make sure all integer schemas have a format of `int32` or `int64`.


