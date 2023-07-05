---
title: owasp-no-http-basic
linkTitle: owasp-no-http-basic
date: 2023-07-05T13:06:57-04:00
draft: false
description: |
  Use secure authentication methods.
severity: error
recommended: true
ruleType: OWASP
functionType: core
functionName: pattern
type: vacuum
layout: rule
formats:
 - "oas3"
---

Security scheme uses **HTTP Basic**. Use a __more secure__ authentication method, like OAuth 2.0

Basic authentication credentials transported over network are more susceptible to interception than other forms of 
authentication, and as they are not encrypted it means passwords and tokens are more easily leaked.

It's time to upgrade that old, janky authentication mechanism.

## JSONPath used

`$.components.securitySchemes[*]`

### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  securitySchemes:
    "please-hack-me":
      type: "http"
      scheme: basic
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  securitySchemes:
    "someSecurityScheme":
      type: "http"
      scheme: "bearer
```

### How do I fix this violation?

**Do not use basic authentication**, use a more secure authentication method (e.g., bearer).
