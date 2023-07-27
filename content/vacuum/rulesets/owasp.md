---
title: OWASP Rules
linkTitle: OWASP Rules
date: 2023-07-06T07:13:17-04:00
strapline: Turn up the heat with OWASP API rules.
draft: false
description: |
  Rules that will help you secure your OpenAPI specification.
type: vacuum
menu:
  vacuum:
    parent: "RuleSets"
    weight: 4
---
---

Apply **O**pen **W**orldwide **A**pplication **S**ecurity **P**roject (OWASP) API rules to your OpenAPI specification 
using vacuum. [Learn more about OWASP](https://owasp.org/).


These rules were written by [Ricardo Graça](https://github.com/Ricagraca). 

---

vacuum supports [OWASP API rules](https://owasp.org/www-project-api-security/) **out of the box**! 

To use them, you will need to create a ruleset that extends the `vacuum:owasp` ruleset.

Create a new file (something like _owasp-rules.yaml_) and add the following YAML to it:

```yaml
extends: [[spectral:oas, recommended], [vacuum:owasp, all]]
```

This creates a ruleset that implements all of the [Recommended Rules]({{< ref "/vacuum/rulesets/recommended" >}}) and the [OWASP Rules]({{< ref "/vacuum/rules/owasp" >}}).

{{< terminal-window "lint with ruleset" "vacuum" "command" "-r">}}vacuum command -r owasp-rules.yaml my-openapi-spec.yaml{{< /terminal-window >}}

Get ready to be told about all the things you are doing wrong! 

What you see may hurt, but it's for the good of the API.