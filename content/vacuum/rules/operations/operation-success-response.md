---
title: "operation-success-response"
linkTitle: "operation-success-response"
date: 2022-06-21T09:23:21-04:00
draft: false
description: Operations must return a 'success' response code.
severity: warn
recommended: false
ruleType: validation
functionType: openapi
functionName: oasOpSuccessResponse
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

Check every [Operation Response](https://swagger.io/docs/specification/describing-responses/) has either a `2xx` or `3xx` response code.

An operation isn't much use, unless it returns an **OK** status code (`2xx`), or a **Redirect/Choice** status code (`3xx`)

### Why did this violation appear?

There is an [Operation Response](https://swagger.io/specification/#responses-object) in your specification that isn't returning a success response.

### What is this rule checking for?

Every [Operation Response](https://swagger.io/specification/#responses-object) is checked for the following:

- **2xx** or **3xx** Response code

### A good example.

{{< highlight yaml >}}
"/pet":
  post:
    responses:
      '200':
        description: New pet was added, great job.
{{< /highlight >}}

### A bad example.

{{< highlight yaml >}}
"/pet":
  post:
    responses:
      '500':
        description: It can only go wrong from here.    
{{< /highlight >}}


### How do I fix this violation?

Ensure all operations return at least one `2xx` or `3xx` response.

#### Spectral Equivalent

The rule is equivalent to [operation-success-response](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-success-response)