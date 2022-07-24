---
title: operation-tags
linkTitle: operation-tags
date: 2022-06-29T04:53:17-04:00
draft: false
description: |
 Check an operation is using at least a single tag
severity: warn
recommended: true
ruleType: validation
functionType: openapi
functionName: oasOperationTags
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

[Operations](https://swagger.io/docs/specification/paths-and-operations/) make use of 
[Tags](https://swagger.io/docs/specification/grouping-operations-with-tags/) to group operations together. 
Tags are really important for documentation and exploring tools.

This rule checks that an operation has defined tags, and that at least one exists. This rule is a more generic and 
more useful version of the [operation-singular-tag]({{< relref "/vacuum/rules/tags/operation-singular-tag" >}}).

## Why did this violation appear?

One or more operation in the specification does not have a `tags` property that contains at least a single tag.

### Bad example

No `tags` defined

```yaml
paths:
  /chicken/nugget:
    post:
      description: "this is an operation about chicken nuggets"
      responses:
      ...
```
---

### Good Example

```yaml
paths:
  /chicken/nugget:
    post:
      tags:
       - ChickenNuggets
      description: "this is an operation about chicken nuggets"
      responses:
   ...
```

### How do I fix this violation?

Ensure every Operation has `tags` defined, and ensure they are an `strting array` with at least a single
Tag added.

#### Spectral Equivalent

The rule is equivalent to [operation-tags](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-tags)