---
title: operation-tag-defined
linkTitle: operation-tag-defined
date: 2022-06-20T15:53:17-04:00
draft: false
description: |
 Check tags used in operations are defined in the global context of the specification
severity: warn
recommended: true
ruleType: validation
functionType: openapi
functionName: oasTagDefined
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

[Operation Tags](https://swagger.io/docs/specification/grouping-operations-with-tags/) are used to define operation _categories_ or _groups_.

Sometimes, tags that have been defined for an operation, have **not** been defined as part of the global scope of the specification. 

This is technically allowed, however it's **Bad OpenAPI hygiene**. The rule will throw a warning. Make sure tags used by operations
are always defined in the global scope of the document.

### Why did this violation appear?

A tag was used in an operation, without that tag being defined in the global scope. 

### What is this rule checking for?

Every [Operation](https://swagger.io/specification/#operation-object) has to use tags that have been declared globally as part of the 
[tags](https://swagger.io/specification/#tag-object) definition.

### Bad example

{{< highlight yaml >}}
tags:
  - name: snakes
    description: snakes on a plane?
  - name: cakes
    description: We much prefer cakes on a plane.
paths:
  /snakes/cakes:
  post:
    tags: 
      - someRandomUndefinedTag
{{< /highlight >}}

### Good Example

{{< highlight yaml >}}
tags: 
  - name: snakes
    description: snakes on a plane?
  - name: cakes
    description: We much prefer cakes on a plane.
paths:
  /snakes/cakes:
    post:
      tags: 
        - snakes
        - cakes
{{< /highlight >}}


### How do I fix this violation?

Make sure that any tags used by an operation, have been globally declared in the specification [tags](https://swagger.io/specification/#tag-object) definition.

#### Spectral Equivalent

The rule is equivalent to [operation-tag-defined](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-tag-defined)