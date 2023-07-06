---
title: owasp-constrained-additionalProperties
linkTitle: owasp-constrained-additionalProperties
date: 2023-07-06T06:53:43-04:00
draft: false
description: |
  Objects should not allow unconstrained `additionalProperties`
severity: error
recommended: true
ruleType: OWASP
functionType: core
functionName: defined
type: vacuum
layout: rule
formats:
  - "oas3"
---

By default, JSON Schema _allows_ additional properties, which can potentially lead to mass assignment issues with OpenAPI.

Avoid using `additionalProperties` in schemas. Use `maxProperties` instead.

## JSONPath used

`$..[?(@.type=="object" && @.additionalProperties!=true && @.additionalProperties!=false )]`

### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: object
      additionalProperties: true
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: object
      additionalProperties:
        type: string
      maxProperties: 1
```

### How do I fix this violation?

Avoid `additionalProperties` in schemas, explicitly set to something other than `true` or `false`, and use `maxProperties` instead.


