---
title: owasp-rate-limit-retry-after
linkTitle: owasp-rate-limit-retry-after
date: 2023-07-05T16:51:43-04:00
draft: false
description: |
  429 responses should define a `Retry-After` header
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

Ensure that any `429` response, contains a `Retry-After` header.    

Define proper rate limiting to avoid attackers overloading the API.
Part of that involves setting a Retry-After header so well meaning consumers are not polling and potentially exacerbating problems

## JSONPath used

`$..responses.429.headers`

### Bad example

```yaml
openapi: 3.1.0
info:
  version: 1.0.1
paths:
  /:
    get:
      responses:
        "429":
          description: ok
          headers: 
        "200":
          description: ok
          headers:
            "Retry-After":
              description: standard retry header
              schema:
                type: string
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: 1.0
paths:
  /cakes:
    get:
      responses:
        "429":
          description: OK
          headers:
            "Retry-After":
              description: standard retry header
              schema:
                type: string`
```

### How do I fix this violation?

Set the `Retry-After` header in the `429` response.