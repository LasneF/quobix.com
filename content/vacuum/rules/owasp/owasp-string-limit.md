---
title: owasp-string-limit
linkTitle: owasp-string-limit
date: 2023-07-06T06:08:43-04:00
draft: false
description: |
  Schema of string must specify maxLength
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

String size should be limited to mitigate resource exhaustion attacks. This can be done using `maxLength`, `enum` or `const`.

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
      type: string
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: string
      maxLength: 99
```

### How do I fix this violation?

Use `maxLength`, `enum`, or `const` to define the size/limit of the value.


