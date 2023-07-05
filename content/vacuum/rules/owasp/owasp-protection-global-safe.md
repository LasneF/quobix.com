---
title: owasp-protection-global-safe
linkTitle: owasp-protection-global-safe
date: 2023-07-05T16:03:19-04:00
draft: false
description: |
  Ensure security is enforced globally or at operation level
severity: warn
recommended: true
ruleType: OWASP
functionType: owasp
functionName: owaspCheckSecurity
type: vacuum
layout: rule
formats:
 - "oas3"
---

Check if the operation is protected at operation level. Otherwise, check the global `#/security` property

Rule was extracted from [https://github.com/italia/api-oas-checker/blob/master/security/security.yml](https://github.com/italia/api-oas-checker/blob/master/security/security.yml)

### Bad example

```yaml
openapi: 3.0.1
info:
  version: "1.2.3"
  title: "securitySchemes"
paths:
  /security-ko-get:
    get:
      responses: {}
    head:
      security: []
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
paths:
  /security-ko-missing:
    put:
      responses: {}
    post:
      security: []
  /security-ok-put:
    put:
      security:
        -  BasicAuth: []
      responses: {}
  /security-ok-get:
    get:
      security:
        - {}
      responses: {}
    head:
      security:
        - {}
        - BasicAuth: []
  /security-ko-info:
    post:
      security:
        - {}
        - BasicAuth: []
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
