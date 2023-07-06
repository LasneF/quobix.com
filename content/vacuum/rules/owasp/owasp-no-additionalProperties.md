---
title: owasp-no-additionalProperties
linkTitle: owasp-no-additionalProperties
date: 2023-07-06T06:53:43-04:00
draft: false
description: |
  If the `additionalProperties` keyword is used it must be set to false
severity: error
recommended: true
ruleType: OWASP
functionType: core
functionName: falsy
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

By default, JSON Schema _allows_ additional properties, which can potentially lead to mass assignment issues with OpenAPI.

Avoid using `additionalProperties` in schemas, or explicitly set to `false`.

## JSONPath used

`$..[?(@.type=="object" && @.additionalProperties)`

### Bad example

```yaml
openapi: "3.0.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: object
      additionalProperties:
        type: object
        properties:
          code:
            type: integer
          text:
            type: string
```
### Good Example

```yaml
openapi: "3.0.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: object
      additionalProperties: false
```

### How do I fix this violation?

Avoid `additionalProperties` in schemas, or explicitly set to `false`.


