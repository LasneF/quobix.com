---
title: path-keys-no-trailing-slash
linkTitle: path-keys-no-trailing-slash
date: 2022-06-29T05:53:17-04:00
draft: false
description: |
 Path definitions cannot contain a trailing slash.
severity: warn
recommended: true
ruleType: validation
functionType: core
functionName: pattern
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

{{< info-box >}}
JSON Path: __$.paths__
{{< /info-box >}}

When defining [Paths](https://swagger.io/docs/specification/paths-and-operations/), it's important to not include a trailing
slash at the end of the path definition.

It's good hygiene to keep trailing slashes off paths, mainly because it can confuse tooling that use the specification
for generating code, mocking or other applications. Some tools will get confused, some tools won't care.

{{< card "Example of trailing slashes borking things up" >}}
If we have two paths:

- somedomain.com/some/path/
- somedomain.com/some/path

Some tools will treat this as **two** separate paths, some tools will see them as **the same**. There isn't really
a good way to know how a tool will react (unless we experiment).
{{< /card >}}


This rule checks that no `paths` definition ends with a slash '**/**'.

## Why did this violation appear?

One or more `paths` definitions contains a trailing slash.

### Bad example

```yaml
 paths:
  /pizza/{cake}/{icecream}/:
    get:
      parameters:
      ...
```

### Good example

```yaml
 paths:
  /pizza/{cake}/{icecream}:
    get:
      parameters:
      ...
```

### How do I fix this violation?

Ensure there are no `paths` definitions that end with a slash '**/**'.

#### Spectral Equivalent

The rule is equivalent to [path-keys-no-trailing-slash](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#path-keys-no-trailing-slash)