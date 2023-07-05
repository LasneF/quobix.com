---
title: owasp-protection-global-unsafe-strict
linkTitle: owasp-protection-global-unsafe-strict
date: 2023-07-05T15:56:10-04:00
draft: false
description: |
  Ensure security is at the operation level
severity: info
recommended: true
ruleType: OWASP
functionType: owasp
functionName: owaspCheckSecurity
type: vacuum
layout: rule
formats:
 - "oas3"
---

APIs should be protected by a `security` rule at the operation level. 

Rule was extracted from [https://github.com/italia/api-oas-checker/blob/master/security/security.yml](https://github.com/italia/api-oas-checker/blob/master/security/security.yml)

### Bad example

```yaml
openapi: 3.0.1
info:
  version: "1.2.3"
  title: "securitySchemes"
security:
  - BasicAuth: []
paths:
  /security-ko-patch-noauth:
    patch:
      security:
        - {}
      responses: {}
  /security-ko-post-noauth:
    patch:
      security:
        - BasicAuth: []
        - {}
      responses: {}
components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
```
### Good Example

```yaml
openapi: 3.0.1
info:
  version: "1.2.3"
  title: "securitySchemes"
security:
  - BasicAuth: []
paths:
  /security-gloabl-ok-put:
    put:
      responses: {}
  /security-ok-put:
    put:
      security:
        -  BasicAuth: []
      responses: {}
components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
```

### How do I fix this violation?

Make sure that all operations should be protected especially when they are not safe 
(methods that do not alter the state of the server) HTTP methods like `POST`, `PUT`, `PATCH`, and `DELETE`. 
This is done with one or more non-empty `security` rules. 

Security rules are defined in the `securityScheme` section.
