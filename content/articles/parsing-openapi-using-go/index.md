---
title: "Parsing OpenAPI files using go"
date: 2022-12-13T15:54:43-05:00
draft: false
menu: "articles"
description: "Learn how easy and quick it is to parse, read and explore OpenAPI specifications using go and [libopenapi](https://github.com/pb33f/libopenapi)."
strapline: "libopenapi makes it simple and easy to parse OpenAPI specifications."
hero: "images/hero-images/parsing-openapi-using-golang.png"
heroSVG: "images/hero-images/parsing-openapi-using-golang.png"
heroTitle: "OpenAPI is simple and easy to parse using go. I'll show you how in five minutes."
heroAlt: "OpenAPI is simple and easy to parse using go. I'll show you how in five minutes."
---

If you're using go as your application programming language of choice and want to parse an [OpenAPI](https://www.openapis.org/) 
specification, this guide will help make this a breeze.

{{< card "Introducing libopenapi" >}}

The library we're going to use in this tutorial is [libopenapi](https://github.com/pb33f/libopenapi). 
It's an enterprise-grade, high-performance library for OpenAPI, written in pure go. 
It supports OpenAPI 3.1 and 3.0 and Swagger (2.0)

I'm the author of [libopenapi](https://github.com/pb33f/libopenapi). It's the same library
that powers [vacuum](/vacuum/).
{{< /card >}}

---

## 1. Install libopenapi in your project

Download the [Petstore OpenAPI 3 sample specification](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml)
that we're going to be using in this tutorial.

{{< terminal-window
"download sample petstore OpenAPI file"
"curl"
"https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml"
">">}}curl https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml > petstorev3.json{{< /terminal-window >}}

The next step is to install [libopenapi](https://github.com/pb33f/libopenapi) in your go application.

{{< terminal-window
"install libopenapi"
"go"
"get"
"">}}go get github.com/pb33f/libopenapi{{< /terminal-window >}}

## 2. Read in the petstore OpenAPI specification

Read the petstore OpenAPI spec into a byte slice.

```go
import (
	"fmt"
	"github.com/pb33f/libopenapi"
	"os"
)

func main() {

  // load in the petstore sample OpenAPI specification
  // into a byte slice.
  petstore, _ := os.ReadFile("petstorev3.json")

  // create a new Document from from the byte slice.
  document, err := libopenapi.NewDocument(petstore)
  
  // if anything went wrong, an error is thrown
  if err != nil {
      panic(fmt.Sprintf("cannot create new document: %e", err))
  }
  
```
{{< code-split >}}Now we can build an OpenAPI 3 Model from the document.{{< /code-split >}}
```go
  // because we know this is a v3 spec, we can build a ready to go model from it.
  docModel, errors := document.BuildV3Model()
```  
{{< code-split >}}If anything goes wrong, print out the errors, then panic.{{< /code-split >}}
```go
  // if anything went wrong when building the v3 model, a slice of errors will be returned
  if len(errors) > 0 {
      for i := range errors {
          fmt.Printf("error: %e\n", errors[i])
      }
      panic(fmt.Sprintf("cannot create v3 model from document: %d errors reported", len(errors)))
  }
```

**_That's it!_** The model is now **ready**, and we can access it via `docModel.Model` property.

Let's explore a little by printing  out a list of paths and how many operations they each have.
```go
  for pathName, pathItem := range docModel.Model.Paths.PathItems {
      fmt.Printf("Path %s has %d operations\n", pathName, len(pathItem.GetOperations()))
  }
```

This will print out something like:

```text
Path /store/order/{orderId} has 2 operations
Path /pet/findByStatus has 1 operations
Path /pet/findByTags has 1 operations
Path /pet has 2 operations
Path /pet/{petId}/uploadImage has 1 operations
Path /user/login has 1 operations
Path /user has 1 operations
...
```

To explore a little further, we can list out all the `Schema` definitions found and how many properties they contain.

```go
  for schemaName, schemaProxy := range docModel.Model.Components.Schemas {
      fmt.Printf("Schema '%s' has %d properties\n", schemaName, len(schemaProxy.Schema().Properties))
  }
```

Which will print out something like:


```text
Schema 'User' has 8 properties
Schema 'Tag' has 2 properties
Schema 'ApiResponse' has 3 properties
Schema 'Order' has 6 properties
...
```


---

## Dealing with circular errors and resolving issues.

Schemas in OpenAPI are complex, and each version has a **_different set of supported properties_**.

One of the design attractions of OpenAPI is the ability to use 
[references](http://json-schema.org/understanding-json-schema/structuring.html#ref) to prevent duplicating the same 
code over and over for reusable schemas and other object types.

[libopenapi](https://github.com/pb33f/libopenapi) will automatically resolve [JSON Schema](http://json-schema.org/) 
references when building a model. Some specs use recursive/circular patterns when designing models (which is supported) 
but can cause **severe problems** for some tools.

When [libopenapi](https://github.com/pb33f/libopenapi) reads the specification into a model, it automatically 
resolves all of those references and will detect anything circular.

> A circular reference means the reference loops back around on itself as part of a chain 
> that runs through direct or polymorphic sub-schemas.
 
For some specs, this may be by design (like the Stripe OpenAPI specification). However, for others, it may not be desirable.

If any circular/resolving errors are available when reading the OpenAPI specification,
[libopenapi](https://github.com/pb33f/libopenapi) returns them with the `BuildV3Model()` method.

{{< info-box >}}
The errors won't prevent the model from building, you can choose to ignore them if you want.
{{< /info-box >}}

### 1. Download the Stripe OpenAPI Specification.

{{< terminal-window
"download Stripe OpenAPI specification"
"curl"
"https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json"
">">}}curl https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json > stripe.json{{< /terminal-window >}}

Like earlier, read the bytes and create a new Document using `libopenapi.NewDocument().`

```go
// load Stripe OpenAPI specification into 
stripe, _ := os.ReadFile("stripe.json")

// create a new document from Stripe specification bytes
document, err := libopenapi.NewDocument(stripe)

// if anything went wrong, an error is thrown
if err != nil {
    panic(fmt.Sprintf("cannot create new document: %e", err))
}
```

This spec has several circular errors. Instead of reading and using the model,
we can use errors and cast them `*resolver.ResolvingError.`

Let's print out some details from the circular references in the Stripe API.

```go
// build a model from the Stripe document, ignore the model, keep the errors
_, errors := document.BuildV3Model()

// loop through errors and print out interesting details about them.
if len(errors) > 0 {
    for i := range errors {
        if circError, ok := errors[i].(*resolver.ResolvingError); ok {
            fmt.Printf("Message: %s\n--> Loop starts line %d | Polymorphic? %v\n\n",
                circError.Error(),
                circError.CircularReference.LoopPoint.Node.Line,
                circError.CircularReference.IsPolymorphicResult)
        }
    }
}
```

Which will print something like this:

```text
Message: Circular reference detected: file: person -> legal_entity_person_verification -> legal_entity_person_verification_document -> file -> file_link -> file [8893:15]
--> Loop starts line 8893 | Polymorphic? true

Message: Circular reference detected: bank_account: payment_intent -> customer -> bank_account -> account -> bank_account [2291:23]
--> Loop starts line 2291 | Polymorphic? true
...
```

---

## What about parsing Swagger specifications?

If [Swagger (OpenAPI 2)](https://swagger.io/specification/v2/) is something you're still using, 
I **recommend upgrading** to [OpenAPI version. 3.1](https://spec.openapis.org/oas/v3.1.0)

However, if that's something that you can't do, then [libopenapi](https://github.com/pb33f/libopenapi) has got you covered.

The process is the same as building an OpenAPI 3+ document; however, call `BuildV2Model()` instead.

```go
// for a v2 (Swagger) specification, build a v2 mode;
swaggerDocModel, errors := document.BuildV2Model()
```

[libopenapi](https://github.com/pb33f/libopenapi) will render a different model. 
Swagger differs in many ways from OpenAPI, so most of the model is not shared.

---

Read the full docs for [libopenapi](https://github.com/pb33f/libopenapi) at [pkg.go.dev](https://pkg.go.dev/github.com/pb33f/libopenapi)

 
 



