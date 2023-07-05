---
title: owasp-rate-limit
linkTitle: owasp-rate-limit
date: 2023-07-05T16:43:43-04:00
draft: false
description: |
  Ensure rate limiting headers have been applied to an operation.
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

Define proper rate limiting to avoid attackers overloading an API operation.

vacuum applies the following header patters by default:

- **X-RateLimit-Limit**
- **X-Rate-Limit-Limit**
- **RateLimit-Limit**
- **RateLimit-Reset**

## JSONPath used

`$.paths..responses`

### Bad example

```yaml
openapi: 3.1.0
info:
  version: 1.0
paths:
  /chicken/nuggets:
    get:
      description: get
      responses:
        "201":
          description: "ok"
          headers:
            "SomethingElse":
              schema:
                type: string
```
### Good Example

```yaml
openapi: 3.1.0
info:
  version: 1.0
paths:
  /:
    get:
      responses:
        "201":
          description: ok
          headers:
            "X-RateLimit-Limit":
              schema:
                type: string
            "X-RateLimit-Reset":
              schema:
                type: string`
```

### How do I fix this violation?

Implement rate-limiting using HTTP headers: https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/ 

Use headers like `X-Rate-Limit-Limit` https://developer.twitter.com/en/docs/twitter-api/rate-limits 
or `X-RateLimit-Limit` https://docs.github.com/en/rest/overview/resources-in-the-rest-api


