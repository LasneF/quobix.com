---
title: owasp-jwt-best-practices
linkTitle: owasp-jwt-best-practices
date: 2023-07-05T15:19:23-04:00
draft: false
description: |
  Ensure 'RFC8725' exists in the description
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

Security schemes using JWTs must explicitly declare support for `RFC8725` in the description.

## JSONPaths used

`$..securitySchemes[*][?(@.type=="oauth2")]`

`$..securitySchemes[*][?(@.bearerFormat=="jwt" || @.bearerFormat=="JWT")]`


### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  securitySchemes:
    "goodOAuth2":
      type: oauth2
      description: RFC8725 Compliant JWT
    "goodBearerJWT":
      type: "ttp
      bearerFormat: jwt
      description: "This is also a RFC8725 compliant JWT
```
### Good Example

```yaml
openapi: 3.1.0
info:
  version: 1.0
components:
  securitySchemes:
    "badOAuth2":
      type: oauth2
      description: No way of knowing if these JWTs are following best practices.
    "badBearerJWT":
      type: http
      bearerFormat: jwt
      description: No way of knowing if these JWTs are following best practices.
```

### How do I fix this violation?

Explicitly state, in the description of the security schemes, that it allows for support of the `RFC8725`:
[https://datatracker.ietf.org/doc/html/rfc8725](https://datatracker.ietf.org/doc/html/rfc8725).