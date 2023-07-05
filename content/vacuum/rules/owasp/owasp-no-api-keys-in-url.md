---
title: owasp-no-api-keys-in-url
linkTitle: owasp-no-api-keys-in-url
date: 2023-07-05T13:15:21-04:00
draft: false
description: |
  Keep API Keys out of the URL.
severity: error
recommended: true
ruleType: OWASP
functionType: openapi
functionName: pattern
type: vacuum
layout: rule
formats:
 - "oas3"
---

Keep API Keys **out of paths** and **query** parameters! 

API Keys are (_usually opaque_) strings that are passed in headers, cookies or query parameters to access APIs. 
Those keys can be eavesdropped, especially when they are stored in cookies or passed as URL parameters.

## JSONPath used

`$..securitySchemes[*][?(@.type=="apiKey")].in`

### Bad example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  securitySchemes:
    "APIKeyInQuery":
      type: apiKey
      in: query
    "APIKeyInPath":
      type: apiKey
      in: path
```
### Good Example

```yaml
openapi: "3.1.0"
info:
  version: "1.0"
components:
  securitySchemes:
    "APIKeyInHeader":
      type: "APIKey"
      in: "header"
```

### How do I fix this violation?

Remove credentials from URL visible parameters, like query and path parameters.