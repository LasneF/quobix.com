---
title: owasp-define-error-validation
linkTitle: owasp-define-error-validation
date: 2023-07-05T16:06:10-04:00
draft: false
description: |
  Ensure there is a 4XX response defined for each operation.
severity: warn
recommended: true
ruleType: OWASP
functionType: owasp
functionName: owaspDefineErrorDefinition
type: vacuum
layout: rule
formats:
  - "oas3"
---

Check that an error response of either `400`, `422` or `4XX` has been defined.

Carefully define schemas for all the API responses, including either `400`, `422` or `4XX` 
responses which describe errors caused by invalid request

## JSONPath used

`$.paths..responses`

### Bad example

```yaml
openapi: 3.1.0
info:
  version: 1.0
paths:
  /no-error-response:
    get:
      responses:
        200:
          description: OK
          content:
            "application/problem+json": {}
```
### Good Example

```yaml
openapi: 3.1.0
info:
  version: 1.0
paths:
  /no-error-response:
    get:
      responses:
        200:
          description: OK
          content:
            "application/problem+json": {}
        422:
          description: Unprocessable Entity
          content:
            "application/problem+json": {}
```

### How do I fix this violation?

Extend the responses of all endpoints to support either `400`, `422`, or `4XX` error codes.

Don't let the consumer guess what errors might be and how gamble with how to deal with those errors.

