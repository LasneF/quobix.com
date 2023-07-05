---
title: owasp-auth-insecure-schemes
linkTitle: owasp-auth-insecure-schemes
date: 2023-07-05T15:08:01-04:00
draft: false
description: |
  Only use secure authorization schemes.
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

There are many HTTP authorization schemes but some of them are now considered insecure, 
such as negotiating authentication using specifications like NTLM or OAuth v1.

## JSONPath used

`$..securitySchemes[*][?(@.type=="http")].scheme`

### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  securitySchemes:
    "BadAuth1":
      type: http
      scheme: negotiate
    "BadAuth2":
      type: http
      scheme: oauth
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  securitySchemes:
    "BearerAuth":
      type: http
      scheme: bearer
```

### How do I fix this violation?

Use a **different** authorization scheme. 

Refer to [https://www.iana.org/assignments/http-authschemes/](https://www.iana.org/assignments/http-authschemes/)
to know more about HTTP Authentication Schemes.