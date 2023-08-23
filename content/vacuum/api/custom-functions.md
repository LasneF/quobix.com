---
title: "Custom Golang Functions"
linkTitle: "Custom Go Functions"
strapline: "Need more power? Write custom golang code!"
date: 2022-07-03T8:20:04-04:00
draft: false
menu: 
  vacuum:
    parent: "Developer API"
    weight: 7
type: vacuum

---

---

Sometimes using the [core functions](/vacuum/functions/core/) are just not enough. Sometimes we need
more power, we need the ability to **hook in** custom code and custom business logic.

Spectral does a great job with [custom functions](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTkw-custom-functions), 
So, vacuum has adopted a **_very similar_** design, to facilitate custom functions.

{{< info-box >}}
Since `v0.3.0` vacuum support [JavaScript]({{<ref "/vacuum/api/custom-javascript-functions">}}) based functions as well as golang based functions.
{{< /info-box >}}


---

## Structure of a custom function

A custom function is written the **exact same way** that **_all_** functions are written in vacuum. 
The [core functions](/vacuum/functions/core) and the [OpenAPI functions](/vacuum/functions/openapi/) 
as well as core functions all implement the [RuleFunction](https://pkg.go.dev/github.com/daveshanley/vacuum/model#RuleFunction)
interface.

```go
type RuleFunction interface {
  RunRule(nodes []*yaml.Node, context RuleFunctionContext) []RuleFunctionResult
  GetSchema() RuleFunctionSchema
}
```

### The RunRule method

`RunRule` accepts a slice of [Node](https://pkg.go.dev/gopkg.in/yaml.v3#Node) references, these are nodes that
match the [given](/vacuum/rulesets/understanding/) property of the [rule](/vacuum/rulesets/understanding/).

> The 'given' value is a JSON Path.

The second argument to the `RunRule` method is a [RuleFunctionContext](https://pkg.go.dev/github.com/daveshanley/vacuum/model#RuleFunctionContext)
struct. This contains just about everything you need to know about the specification, the rule that is using the function, the
function options being passed in from the rule, as well as an [index](/vacuum/api/spec-index) that contains every reference
to every part of the spec.

### The GetSchema method

`GetSchema` returns a instance of [RuleFunctionSchema](https://pkg.go.dev/github.com/daveshanley/vacuum/model#RuleFunctionSchema) which
defines how the function should be used and the name it exposes to be "mapped" to a rule.

## Building custom functions as 'plugins'

vacuum is deployed as a compiled application, which means you can't modify the source. The only way to inject custom functions
into the code, is to have vacuum look for compiled functions defined as a **plugin**, These custom comiled functions can then be loaded
at runtime and used as part of any ruleset.

## Example Plugin

Make sure you have [go](https://go.dev/) and [vacuum](/vacuum/installing/) installed first. 

### Setting things up

The create a new directory for your plugin, and change into it.

{{< terminal-window
"create plugin dir"
"mkdir"
"my-plugin">}}mkdir my-plugin && cd my-plugin{{< /terminal-window >}}

Next, initialize your code as a module

{{< terminal-window
"init module"
"go"
"mod" "init">}}go mod init my-awesome-functions{{< /terminal-window >}}

Now, include vacuum as a dependency

{{< terminal-window
"include vacuum dependency"
"go"
"get">}}go get github.com/daveshanley/vacuum{{< /terminal-window >}}

### Implement the logic

Create a new struct (you can name it anything you like) and implement the `RunRule` and `GetSchema` methods
to qualify it as a function that can be run by vacuum.

{{< terminal-window
"write the function logic"
"vi" >}}vi check_single_path.go{{< /terminal-window >}}

```go
package main

import (
	"fmt"

	"github.com/daveshanley/vacuum/model"
	"gopkg.in/yaml.v3"
)

// checkSinglePathExists is an example custom rule that checks only a
// single path exists.
type checkSinglePathExists struct {
}

func (s checkSinglePathExists) GetSchema() model.RuleFunctionSchema {
	return model.RuleFunctionSchema{
		Name: "checkSinglePathExists", // Used to lookup the function
	}
}

func (s checkSinglePathExists) RunRule(nodes []*yaml.Node,
	context model.RuleFunctionContext) []model.RuleFunctionResult {

	// get the index https://quobix.com/vacuum/api/spec-index/
	index := context.Index

	// get the paths node from the index.
	paths := index.GetPathsNode()

	// checks if there are more than two nodes present in the paths node,
	// if so, more than one path is present.
	if len(paths.Content) > 2 {
		msg := fmt.Sprintf("more than a single path exists, "+
			"there are %v", len(paths.Content)/2)
		return []model.RuleFunctionResult{
			{
				Message:   msg,
				StartNode: paths,
				EndNode:   paths,
				Path:      "$.paths",
				Rule:      context.Rule,
			},
		}
	}
	return nil
}
```

### Register the function

Once your function logic is complete, it's time to register the function as a plugin. This
is done by creating a `Boot` function that accepts a [Manager](https://github.com/daveshanley/vacuum/blob/main/plugin/plugin_manager.go)
reference, that is used to register the functions as available to vacuum.

{{< terminal-window
"create function boot loader"
"vi">}}vi boot.go{{< /terminal-window >}}

```go
package main

import "github.com/daveshanley/vacuum/plugin"

// Boot is called by the Manager when the module is located.
// all custom functions should be registered here.
func Boot(pm *plugin.Manager) {

  checkSinglePath := checkSinglePathExists{}

  // register custom functions with vacuum plugin manager.
  pm.RegisterFunction(checkSinglePath.GetSchema().Name, checkSinglePath)
}
```

### Compile as a shared object.

Go has a wonderful [plugin](https://pkg.go.dev/plugin) feature. To use it, code has to be compiled as a
shared object using the `-buildmode=plugin` flag when compiling.

{{< terminal-window
"compile function and boot loader as plugin"
"go" "build">}}go build -buildmode=plugin boot.go check_single_path.go{{< /terminal-window >}}

There should now be a `boot.so` file in the 'my-plugin' directory.

## Configuring functions

To use the newly compiled plugin, you will need to call it from a rule. Create a new [RuleSet](/vacuum/rulesets/understanding/)
or update an existing one, to include a new rule that calls the new custom function.

### Example RuleSet

```yaml
extends: [[spectral:oas, off]]
documentationUrl: https://quobix.com/vacuum/rulesets/custom-rulesets
rules:
  sample-paths-rule:
    description: Load a custom function that checks for a single path
    severity: error
    recommended: true
    formats: [ oas2, oas3 ]
    given: $
    then:
      function: checkSinglePathExists
    howToFix: use a spec with only a single path defined.
```

It's really important that the `function` property of the `then` object, matches the name exposed by the `GetSchema` 
method on the custom function.

## Run vacuum with '-f'

To run custom functions, vacuum needs to know where to look for them. There is a global flag `-f` or `--function` that specifies
a path to where your custom function plugin is located.

{{< terminal-window
"run custom ruleset and functions"
"vacuum" "lint" "-r,-f" >}}vacuum lint -r my-ruleset.yaml -f ./my-plugin my-openapi-spec.yaml{{< /terminal-window >}}

There should be message informing that vacuum has located a function plugin, and how many functions were loaded.

{{< warn-box >}}
If you see a message like: _Unable to open custom functions: plugin.Open("./my-plugin"): plugin was built with a different version of package...'_ then it's
because the version of go that you're using locally, is different to the one used to compile vacuum.
{{< /warn-box >}}

---

## Further Examples

There is [an example function plugin](https://github.com/daveshanley/vacuum/tree/main/plugin/sample) available that shows
a couple of custom functions being defined, That are then called by a [custom ruleset](https://github.com/daveshanley/vacuum/blob/main/rulesets/examples/sample-plugin-ruleset.yaml).

To run the example, clone the vacuum repo, and change into the `plugin/sample` directory.

{{< terminal-window
"clone vacuum and change into sample plugin directory"
"git" "clone">}}git clone https://github.com/daveshanley/vacuum.git && \
cd vacuum/plugin/sample{{< /terminal-window >}}

Build the sample plugin.

{{< terminal-window
"compile function and boot loader as plugin"
"go" "build">}}go build -buildmode=plugin .{{< /terminal-window >}}

Go back up into the vacuum directory and compile vacuum

{{< terminal-window
"compile vacuum"
"go" "build">}}cd ../../ && go build vacuum.go{{< /terminal-window >}}

Now we can run the sample ruleset that uses custom functions, with an OpenAPI specification. Use the `-f` flag
to specify the path to the sample plugin.

{{< terminal-window
"run vacuum with custom functions"
"./vacuum" "lint">}}./vacuum lint -r rulesets/examples/sample-plugin-ruleset.yaml \
-f plugin/sample /path/to/openapi.yaml{{< /terminal-window >}}

The following output should be displayed: 

```
Located custom function plugin: plugin/sample/sample.so
Loaded 2 custom function(s) successfully.
Linting against 2 rules: https://quobix.com/vacuum/rulesets/custom-rulesets
```