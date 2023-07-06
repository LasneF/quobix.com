---
title: owasp-security-hosts-https-oas2
linkTitle: owasp-security-hosts-https-oas2
date: 2023-07-06T07:07:43-04:00
draft: false
description: |
  All servers defined MUST use https, and no other protocol is permitted
severity: error
recommended: true
ruleType: OWASP
functionType: core
functionName: schema
type: vacuum
layout: rule
formats:
  - "oas2"
---

All server interactions MUST use the https protocol, so the only OpenAPI scheme being used should be `https`.

## JSONPath used

`$.schemes`

### Bad example

```yaml
swagger: "2.0"
info:
  version: "1.0"
definitions:
  Nuggets:
    type: integer
paths:
  "/"
host:
  - pb33f.io
schemes:
  - http
```
### Good Example

```yaml
swagger: "2.0"
info:
  version: "1.0"
definitions:
  Nuggets:
    type: integer
paths:
  "/"
host:
  - pb33f.io
schemes:
  - https
```

### How do I fix this violation?

Make sure all servers use the `https` protocol.

In this day and age, there should never be a reason why you are not using `https` for all your server interactions, unless
this is an internal API that is not exposed to the internet. If that's the case, then just disable this rule.
