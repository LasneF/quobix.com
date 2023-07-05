---
title: owaspCheckSecurity
linkTitle: owaspCheckSecurity
date: 2023-07-05T15:34:05-04:00
draft: false
description: |
  Check if global or operation level security has been defined.  
type: vacuum
layout: function

---

**_owaspCheckSecurity_** will check global or operation level security has been defined.

### How do I use this function?

This function is configured by the following `functionOptions`. 

|    NAME     | DESCRIPTION                                       |    TYPE    | REQUIRED? |
|:-----------:|---------------------------------------------------|:----------:|:---------:|
| schemesPath | The key to look for (defaults to securitySchemes) | `[]string` |    yes    |
|  nullable   | Can be empty or not                               | `boolean`  |    yes    |
|   methods   | Which http methods to look through                | `[]string` |    yes    |


#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
my-security-rule:
  description: API should be protected by a `security` rule either at global or operation level.
  type: validation
  given: $
  then:
    function: owaspCheckSecurity
    functionOptions:
      schemesPath: 
        - securitySchemes
      nullable: true
      methods:
        - post
        - put
        - delete
        - patch 
```

---

Used by the following rules:

- [owasp-protection-global-safe]({{< ref "/vacuum/rules/owasp/owasp-protection-global-safe" >}})
- [owasp-protection-global-unsafe]({{< ref "/vacuum/rules/owasp/owasp-protection-global-unsafe" >}})
- [owasp-protection-global-unsafe-strict]({{< ref "/vacuum/rules/owasp/owasp-protection-global-unsafe-strict" >}})
