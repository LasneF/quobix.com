---
title: No Rules!
linkTitle: No Rules/Off
date: 2022-07-01T05:30:17-04:00
strapline: Too cool for rules! no rules!
draft: false
description: |
  An empty RuleSet that is ready to have rules enabled.
type: vacuum
menu:
  vacuum:
    parent: "RuleSets"
    weight: 3
---
---

Why would anyone want **no rules?** what is the point of an empty RuleSet?

The main purpose of this RuleSet is to allow the [individual enabling of rules]({{< relref "/vacuum/rulesets/custom-rulesets#enabling-rules" >}})

Create a new file (something like _custom-rules.yaml_) and add the following YAML to it:

```yaml
extends: [[spectral:oas, off]]
```
This creates a ruleset that extends '**no**' rules. You can find this ruleset in the **rulesets/examples** directory,
and it's named [norules-ruleset.yaml](https://github.com/daveshanley/vacuum/blob/main/rulesets/examples/norules-ruleset.yaml)

Now you can enable rules individually:

```yaml
extends: [[spectral:oas, off]]
rules:
  operation-operationId: true
  description-duplication: true
```

Now you can run any vacuum command that supports a ruleset.


{{< terminal-window "lint with ruleset" "vacuum" "lint" "-r">}}vacuum lint -r custom-rules.yaml my-openapi-spec.yaml{{< /terminal-window >}}


There is a [specific-ruleset](https://github.com/daveshanley/vacuum/blob/main/rulesets/examples/specific-ruleset.yaml) 
available as an example.

---

## What about disabling specific rules?

From version `v0.0.54`+ you can disable rules by using `false`. As [requested here](https://github.com/daveshanley/vacuum/issues/252),
the feature allows you to disable rules in an existing ruleset (_like the recommended/default one_) without having to create a new ruleset.

The example below explains how to disable two of the rules in the recommended ruleset.

```yaml
extends: [[spectral:oas, recommended]]
rules:
  operation-operationId: false
  description-duplication: false
```

