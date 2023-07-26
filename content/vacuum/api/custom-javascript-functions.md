---
title: "Custom JS Functions"
linkTitle: "Custom JS Functions"
strapline: "Need more power? Write custom JavaScript code!"
date: 2023-07-22T8:20:04-04:00
draft: false
menu: 
  vacuum:
    parent: "Developer API"
    weight: 8
type: vacuum

---

---

Sometimes using the [core functions](/vacuum/functions/core/) are just not enough. Sometimes we need
more power, we need the ability to **hook in** custom code and custom business logic.

Spectral does a great job with [custom functions](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTkw-custom-functions), 
So, vacuum has adopted a **_very similar_** design, to facilitate custom functions.

{{< info-box >}}
Since `v0.3.0` vacuum support JavaScript based functions as well as [golang]({{<ref "/vacuum/api/custom-functions">}}) based functions.
{{< /info-box >}}

---

{{<warn-box>}}
vacuum is written in golang. When building a JavaScript function, we need to remember that the JavaScript code is being
read in by vacuum and then parsed and executed by the [goja](https://github.com/dop251/goja) JavaScript engine.

There is **no [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)** 
available and there is limited access to [node.js](https://nodejs.org/en) APIs. This is not a v8 environment, and vacuum only supports [ES5](https://262.ecma-international.org/5.1/).{{</warn-box>}}

---

## Structure of a JavaScript function

vacuum expects an absolute minimum of one thing from a JavaScript function, a declaration of a function called `runRule`
that accepts a single argument. It looks like this:

```javascript
function runRule(input) {
 // do something useful with custom logic, this is just a silly example 
 if (input !== 'some-value') {
   return [
     { message: 'something went wrong, input does not match "some-value"' }
   ];
 } 
}
```
In the above example, the `runRule` function accepts a single argument called `input`. This is the value of the `given` property
that was located by the rule. 

If the input does not match `some-value` then the function returns an array of objects, each object is a `modelRuleFunctionResult` that
contains a `message` property. This is the message that will be displayed in the linting report.


### The input argument

The input can be either a `primitive` value, or a `complex` value (_like an object or an array_). It all depends on how the rule
is configured to use the function, and what the `given` property is set to.

If the function only works on a single value, then the `given` property should be set to a JSON Path that points to a single value. 
If the function needs to work on an array of values, then the `given` property should be set to a JSON Path that points to an array, etc.

---

## Access to context

If the function needs to know what rule is calling it, or what the specification looks like, then the `runRule` function can
access the `context` object. This is essentially a JSON rendered version of [model.RuleFunctionContext](https://github.com/daveshanley/vacuum/blob/main/model/rules.go#L39).

There are two objects that are not available to JavaScript functions, the `index` and the `document`. 
The `index` is not available, because it's a complex struct with a lot of data in it and a large API. Without a full
replacement SDK, we can't make this available to JavaScript functions. 

The `document` is not available, because of the same reason as the `index`.

### Example function that uses context

```javascript
function runRule(input) {
 // use context to determine the rule name and the given path
 if (input !== 'some-value') {
   return [
     { message: 'rule' + context.rule.id + ' failed at ' + context.given }
   ];
 } 
}

````

{{<info-box>}}
The `context` object is automatically available to the function as a global. It does not need to be declared as an argument to the `runRule` function.
{{</info-box>}}

### Context type

TypeScript is not (yet) supported, but here is the type definition for the `context` and related objects would be.

```typescript
interface Context {
  ruleAction: RuleAction;
  rule: Rule;
  given: any;
  options: any;
  specInfo: SpecInfo;
}
```

### SpecInfo type

```typescript
interface SpecInfo {
  fileType: string;
  format: string;
  type: string;
  version: string;
}

```

### RuleAction type

```typescript
interface RuleAction {
  field: string;
  functionOptions: any;
}
```

### Rule type

```typescript
interface Rule {
  id: string;
  description: string;
  given: any;
  formats: string[];
  resolved: boolean;
  recommended: boolean;
  type: string;
  severity: string;
  then: any;
  ruleCategory: RuleCategory
  howToFix: string;
}
```
### RuleCategory type

```typescript
interface RuleCategory {
  id:          string;
  name:        string;
  description: string;
}
```
---

## Access to the function options

All functions can accept options from the rule that is calling them. Options are available from `functionOptions` value. To access it, 
start with the `context` object, and its under the `ruleAction` property.

### Example rule and function

Let's configure a ruleset that defines a custom function and passes in some function options.

```yaml
rules:
  my-custom-js-rule:
    description: "adding function options to use in JS functions."
    given: $
    severity: error
    then:
      function: useFunctionOptions
      field: someField
      functionOptions:
         someOption: someValue

```

Now we can create a new file called `useFunctionOptions.js` and write the function logic.

```javascript
function runRule(input) {
    // extract function options from context
    const functionOptions = context.ruleAction.functionOptions

    // check if the 'someOption' value is set in our options
    if (functionOptions.someOption) {
        return [
            {
                message: "someOption is set to " + functionOptions.someOption,
            }
        ];
    } else {
        return [
            {
                message: "someOption is not set",
            }
        ];
    }
}
```

The message will result in: `someOption is set to someValue`

> The `given` value in a ruleset is a JSON Path.

## Providing a schema

Like with [go plugins]({{<ref "/vacuum/api/custom-functions">}}) providing a `getSchema()` function that returns an object that reflects an instance of [RuleFunctionSchema](https://pkg.go.dev/github.com/daveshanley/vacuum/model#RuleFunctionSchema) which
defines how the function should be used and the name it exposes to be "mapped" to a rule.

For example:

```javascript
function getSchema() {
    return {
        "name": "a_new_name_for_this",
        "properties": [
            {
                "name": "mickey",
                "description": "a mouse"
            }
        ],
    };
}
```
---

## Calling core functions

Any custom JavaScript function can call any of the [core functions](/vacuum/functions/core/).

This is done by adding a prefix `vacuum_` to the function name. For example, to call the [truthy](/vacuum/functions/core/truthy) function, the function name
would be `vacuum_truthy`. Another function like [schema](/vacuum/functions/core/schema) would be `vacuum_schema`.

Each core function accepts **two** arguments, the first is the `input` value, and the second is the `context` object.

For example:

```javascript
function runRule(input) {

    // create an array to hold the results
    let results = vacuum_truthy(input, context);

    results.push({
        message: "this is a message, added after truthy was called",
    });

    // return results.
    return results;
}

```

---

## Tutorial

Make sure you have [vacuum](/vacuum/installing/) installed first. 

### Setting things up

The create a new directory for your functions, and change into it.

{{< terminal-window
"create function dir"
"mkdir"
"my-functions">}}mkdir my-functions && cd my-functions{{< /terminal-window >}}

Next, build a custom JavaScript function that will be used by vacuum. This is a simple function that checks if there is more than one path
in an OpenAPI document.

### Implement the logic

Create a new javascript file called `checkSinglePath.js` and write the function logic.

{{< terminal-window
"write the function logic"
"vi" >}}vi checkSinglePath.js{{< /terminal-window >}}

```javascript
function runRule(input) {
  // get the number of keys passed in (each path is a key)
  const numPaths = Object.keys(input).length;
  if (numPaths > 1) {
    return [
      {
        message: 'More than a single path exists, there are ' + numPaths
      }
    ];
  }
}

```

That's it! We're ready to call the function from a rule.


### Configuring functions

To use the function will need to call it from a rule. Create a new [RuleSet](/vacuum/rulesets/understanding/)
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
    given: $.paths
    then:
      function: checkSinglePath
    howToFix: use a spec with only a single path defined.
```

It's really important that the `function` property of the `then` object, matches the name exposed by the `getSchema()` 
method on the custom function, or matches the `filename` of the javascript file.

### Run vacuum with '-f'

To run custom functions, vacuum needs to know where to look for them. There is a global flag `-f` or `--function` that specifies
a path to where your custom function plugin is located.

{{< terminal-window
"run custom ruleset and functions"
"vacuum" "lint" "-r,-f" >}}vacuum lint -r my-ruleset.yaml -f ./my-functions my-openapi-spec.yaml{{< /terminal-window >}}

There should be message informing that vacuum has located a function plugin, and how many functions were loaded.

### Example output

When the rule runs, if there is more than a single path in the OpenAPI document, then the function will return a message.

For example:

```text
More than a single path exists, there are 23
```

---

## Further Examples

There are [example functions](https://github.com/daveshanley/vacuum/tree/main/plugin/sample/js) available showcase
some of these features.