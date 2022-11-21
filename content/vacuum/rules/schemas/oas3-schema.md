---
title: oas3-schema
linkTitle: oas3-schema
date: 2022-06-30T08:53:17-04:00
draft: false
description: |
  Check specification is a valid OpenAPI 3 document. 
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasDocumentSchema
type: vacuum
layout: rule
formats:
 - "oas3"
---

Perhaps the 'lightest' linting there is. This rule ensures that the document provided, matches the schema of an [OpenAPI 3](https://swagger.io/specification/)
(OpenAPI 3.0) document. 

The rule performs a schema match using **JSON Schema**

[Click to see schema](https://github.com/daveshanley/vacuum/blob/main/model/schemas/oas3-schema.json) used to match against.

## Why did this violation appear?

The spec provided is not a valid [OpenAPI 3](https://swagger.io/specification/) specification.

### How do I fix this violation?

Correct the specification violations, there isn't any other way forward otherwise.

#### Spectral Equivalent

The rule is equivalent to [oas3-schema](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-schema)