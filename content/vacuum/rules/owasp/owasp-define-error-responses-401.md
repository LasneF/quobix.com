---
title: owasp-define-error-responses-401
linkTitle: owasp-define-error-responses-401
date: 2023-07-05T16:26:14-04:00
draft: false
description: |
  Ensure there is a 401 response error defined for each operation.
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

OWASP API Security recommends defining schemas for all responses. This includes the `401` response error code.

## JSONPath used

`$.paths..responses`

### Bad example

```yaml
openapi: 3.1.0
info:
  version: 1.0
paths:
  /no-error-response:
    get:
      responses:
        200:
          description: OK
          content:
            "application/problem+json": {}
```
### Good Example

```yaml
openapi: 3.1.0
info:
  version: 1.0
paths:
  /no-error-response:
    get:
      responses:
        200:
          description: OK
          content:
            "application/problem+json": {}
        401:
          description: Access Denied!
          content:
            "application/problem+json": {}
```

### How do I fix this violation?

Extend the responses of all endpoints to include `401` response error codes.


