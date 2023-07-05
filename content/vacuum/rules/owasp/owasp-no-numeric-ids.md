---
title: owasp-no-numeric-ids
linkTitle: owasp-no-numeric-ids
date: 2023-07-05T12:28:02-04:00
draft: false
description: |
  Use random IDs that cannot be guessed.
severity: error
recommended: true
ruleType: OWASP
functionType: core
functionName: schema
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

OWASP API1:2019 - Use random IDs that cannot be guessed. UUIDs are preferred

Set the `format` to be **_uuid_**.

## JSONPath used

`$.paths..parameters[*][?(@.name == "id" || @.name =~ /(_id|Id|-id)$/)))]`

### Bad example

```yaml
openapi: "3.1.0"
paths:
  /fish/{id}/:
    get:
      description: "get"
      parameters:
        - name: id
          in: path
          schema:
            type: integer
```
### Good Example

```yaml
openapi: "3.1.0"
paths:
  /fish/{id}/:
    get:
      description: "get"
      parameters:
        - name: id
          in: path
          schema:
            type: string
            format: uuid
```

### How do I fix this violation?

For any parameter which ends in id, use type string with `uuid` format instead of type integer.