---
title: owasp-string-restricted
linkTitle: owasp-string-restricted
date: 2023-07-06T06:36:43-04:00
draft: false
description: |
  Schema of type string must specify a format, pattern, enum, or const
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

To avoid unexpected values being sent or leaked, ensure that strings have either a `format`, RegEx `pattern`, `enum`, or `const

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
      format: email
```

### Another Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  schemas:
    Foo:
      type: string
      format: hex
      pattern: ^[0-9a-fA-F]+$
      maxLength: 16
```

### How do I fix this violation?

Ensure that strings have either a `format`, RegEx `pattern`, `enum`, or `const for all string types.


