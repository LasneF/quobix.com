---
title: owasp-define-error-responses-429
linkTitle: owasp-define-error-responses-429
date: 2023-07-05T16:56:14-04:00
draft: false
description: |
  Ensure there is a 500 response error defined for each operation.
severity: warn
recommended: true
ruleType: OWASP
functionType: core
functionName: schema
type: vacuum
layout: rule
formats:
  - "oas3"
---

OWASP API Security recommends defining schemas for all responses. This includes the `429` response error code.

## JSONPath used

`$.paths..responses`

### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
paths:
  /:
    get:
      responses:
        200:
          description: ok
          content:
            "application/problem+json":
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
paths:
  /:
    get:
      responses:
        429:
          description: ok
          content:
            "application/json":
```

### How do I fix this violation?

Extend the responses of all endpoints to include `429` response error codes.


