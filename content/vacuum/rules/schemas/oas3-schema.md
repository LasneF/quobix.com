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

Perhaps the 'lightest' linting there is. This rule ensures that the document provided, matches the schema of an [OpenAPI 3.0+](https://swagger.io/specification/)
document or [OpenAPI 3.1](https://spec.openapis.org/oas/latest.html). 

The rule performs a schema match using **JSON Schema**

- [OpenAPI 3.0+ Schema](https://github.com/pb33f/libopenapi/blob/main/datamodel/schemas/oas3-schema.json)
- [OpenAPI 3.1+ Schema](https://github.com/pb33f/libopenapi/blob/main/datamodel/schemas/oas31-schema.json)

The schemas are built into [libopenapi](https://pb33f.io/libopenapi).

## Why did this violation appear?

The spec provided is not a valid [OpenAPI 3](https://swagger.io/specification/) or [OpenAPI 3.1](https://spec.openapis.org/oas/latest.html) 
specification.

### How do I fix this violation?

Correct the specification violations, there isn't any other way forward otherwise.

#### Spectral Equivalent

The rule is equivalent to [oas3-schema](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-schema)