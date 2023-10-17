---
title: no-$ref-siblings
linkTitle: no-$ref-siblings
date: 2022-06-30T08:53:17-04:00
draft: false
description: |
  Check for illegal sibling nodes next to '$ref' values
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: refSiblings
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

[JSON Schema References](https://json-schema.org/learn/getting-started-step-by-step.html#references) allow authors to 
re-use schemas for objects in multiple places. In the standard, **$ref** nodes are allowed sibling nodes (most commonly `description`)
nodes that allow authors to describe the use of the reference in the context of the current definition.

OpenAPI is a **_superset_** of JSON Schema. However, in the OpenAPI standard, **$ref** values **_CANNOT_** place any sibling nodes
(like a `description`) next to that **$ref**.

Essentially, OpenAPI will discard anything next to that **$ref**, it's going to ignore it. Often this is where authors
place a description, thinking that it was going to be picked up by tooling.

## Why did this violation appear?

A **$ref** value was used, but it contains a sibling node (another property on the same level). in OpenAPI **$ref** values 
need to be the only child of a parent.

### Bad example

```yaml
paths:
  /pizzas:
    get:
      summary: "Get all pizzas"
      responses:
        '200':
          description: "A list of all the pizzas we have."
          content:
            application/json:
              schema:
                $ref: '#/shared-components/schemas/PizzaList'
                description: "A list object contains a list of pizzas"
components:
  schemas:
    PizzaList:
      properties:
      ...
```
### Good Example

```yaml
paths:
  /pizzas:
    get:
      summary: "Get all pizzas"
      responses:
        '200':
          description: "A list of all the pizzas we have."
          content:
            application/json:
              schema:
                $ref: '#/shared-components/schemas/PizzaList'
components:
  schemas:
    PizzaList:
      description: "A list object contains a list of pizzas"
      properties:
      ...
```

### How do I fix this violation?

Make sure **$ref** values are the only child node, don't place anything next to them.

#### Spectral Equivalent

The rule is equivalent to [no-$ref-siblings](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#no-ref-siblings)
