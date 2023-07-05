---
title: owaspDefineErrorDefinition
linkTitle: owaspDefineErrorDefinition
date: 2023-07-05T16:16:05-04:00
draft: false
description: |
  Check if global or operation level security has been defined.  
type: vacuum
layout: function

---

**_owaspDefineErrorDefinition_** will check that an error response of either `400`, `422` or `4XX` has been defined.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
my-security-rule:
  description: Make sure operation defines error responses
  type: validation
  given: $.paths..responses
  then:
    function: owaspDefineErrorDefinition
```

Used by the following rules:

- [owasp-define-error-validation]({{< ref "/vacuum/rules/owasp/owasp-define-error-validation" >}})
- [owasp-define-error-responses-401]({{< ref "/vacuum/rules/owasp/owasp-define-error-responses-401" >}})
- [owasp-define-error-responses-500]({{< ref "/vacuum/rules/owasp/owasp-define-error-responses-500" >}})