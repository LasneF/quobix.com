---
title: owasp-security-hosts-https-oas3
linkTitle: owasp-security-hosts-https-oas3
date: 2023-07-06T07:09:43-04:00
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
  - "oas3"
---

All server interactions MUST use the https protocol, so the only OpenAPI scheme being used should be `https`.

## JSONPath used

`$.schemes`

### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
paths:
  /chickenNuggets:
servers:
  - url: http://api.quobix.com/
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
paths:
  /chickenNuggets:
servers:
  - url: https://api.quobix.com/
```

### How do I fix this violation?

Make sure all servers use the `https` protocol.

In this day and age, there should never be a reason why you are not using `https` for all your server interactions, unless
this is an internal API that is not exposed to the internet. If that's the case, then just disable this rule.
