---
title: owasp-no-credentials-in-url
linkTitle: owasp-no-credentials-in-url
date: 2023-07-05T14:59:25-04:00
draft: false
description: |
  URL parameters should not contain identifiable credentials.
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

Keep security credentials **out of paths** and **query** parameters! 

URL parameters **must not contain credentials** such as API key, password, or secret.

## JSONPath used

`$..parameters[*][?(@.in =~ /(query|path)/)].name`

### Bad example

```yaml
openapi: "3.1.0"
paths:
  /nuggets/{id}/:
    get:
      description: "get"
      parameters:
        - name: client_secret
          in: query
          required: true
        - name: token
          in: query
          required: true
        - name: refresh_token
          in: query
          required: true
        - name: id_token
          in: query
          required: true
        - name: password
          in: query
          required: true
        - name: secret
          in: query
          required: true
        - name: apikey
          in: query
          required: true
        - name: apikey
          in: path
          required: true
        - name: API-KEY
          in: query
          required: true
```
### Good Example

```yaml
openapi: "3.1.0"
paths:
  /nuggets/{id}/:
    get:
      description: "get"
      parameters:
        - name: id
          in: path
          required: true
        - name: filter
          in: query
          required: true
```

### How do I fix this violation?

Don't use credentials in URL parameters. Use HTTP headers instead. Remove anything that could be considered
a credential from the URL parameters.