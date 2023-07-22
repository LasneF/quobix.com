---
title: "linting other documents"
linkTitle: "Non-OpenAPI Files"
strapline: "Want to lint something other than OpenAPI?"
date: 2023-07-022T12:20:04-04:00
draft: false
menu: 
  vacuum:
    parent: "Developer API"
    weight: 8
type: vacuum

---

---

The majority of `vaccum` is designed for linting OpenAPI. Most of the built in functions and rules are designed for OpenAPI
documents. 

However, `vacuum` is built to be extensible, and it is possible to lint other types of documents using the 
[core functions]({{<ref "/vacuum/functions/core">}}).

## Skipping OpenAPI checks

In version `v0.2.7` a new property was added to [motor.RulesetExecution](https://github.com/daveshanley/vacuum/blob/main/motor/rule_applicator.go#L53)
called `SkipDocumentCheck`

This allows all OpenAPI/Swagger checks to be bypassed and allows rules to be applied to any document. 

For example, to lint the following YAML document:

```yaml
_format_version: "3.0"
services:
- host: mockbin.org
  id: b1525aee-d304-11ed-afa1-0242ac120002
  name: summer-time
  path: /requests
  plugins: []
  port: 443
  protocol: https
  routes:
  - id: b7d87736-d304-11ed-afa1-0242ac120002
    methods:
    - GET
    name: summer-time_get
    paths:
    - ~/summer-time$
    plugins: []
    regex_priority: 200
    strip_path: false
    tags: []
```

## Creating custom rules

The following simple [custom ruleset]({{<ref "/vacuum/rulesets/custom-rulesets">}}) could be used to check the version:

```yaml
rules:
  my-new-rule:
    description: "Check the version is correct"
    given: $._format_version
    severity: error
    then:
      function: pattern
      functionOptions:
        match: "^1.1$"
```

Putting it all together, the following code would lint the above YAML document:

```go
package main

import (
	"fmt"
	"io/ioutil"
	"github.com/daveshanley/vacuum/motor"
	"github.com/daveshanley/vacuum/rulesets"
)

func main() {

	// read in a RuleSet file
	ruleSetBytes, err := ioutil.ReadFile("custom-ruleset.yaml")
	if err != nil {
		panic(err.Error())
	}

	// extract a custom RuleSet from our bytes.
	customRuleSet, rsErr := rulesets.CreateRuleSetFromData(ruleSetBytes)

	if rsErr != nil {
		panic(err.Error())
	}

	// read in an OpenAPI specification
	specBytes, err := ioutil.ReadFile("custom-input.yaml")
	if err != nil {
		panic(err.Error())
	}

	// apply custom ruleset to our specification
	ruleSetResults := motor.ApplyRulesToRuleSet(&motor.RuleSetExecution{
		RuleSet: customRuleSet,
		Spec:    specBytes,
		SkipDocumentCheck: true, // skip document checking
	})

	if len(ruleSetResults.Errors) > 0 {
		fmt.Printf("Errors: %v\n\n", ruleSetResults.Errors)
		return
	}

	// print out how many violations were found.
	fmt.Printf("Linting Violations: %d", len(ruleSetResults.Results))

	// iterate over each violation of this rule
	for _, violation := range ruleSetResults.Results {

		// print out the start line, column, violation message.
		fmt.Printf(" - [%d:%d] %s\n", violation.StartNode.Line,
			violation.StartNode.Column, violation.Message)
	}
}
```

> The [above examples](https://github.com/daveshanley/vacuum/discussions/280#discussioncomment-6516018) were original created by
> [@mheap](https://github.com/mheap) and posted in the [vacuum discussions](https://github.com/daveshanley/vacuum/discussions)