---
title: "Handling References"
linkTitle: "External References"
description: "Handling remote, or relative external references in specifications"
date: 2023-03-36T15:12:53-04:00
strapline: Handling remote, or relative external references in OpenAPI specifications
draft: false
type: vacuum
menu:
  vacuum:
    parent: "CLI Commands"
    weight: 6
---

---

If the OpenAPI specifcation being processed by `vacuum` contains external references, then `vacuum` will need to know
how to handle them when resolving the specification.

## Reference Types

References come in three forms:
- Local references
- Remote references
- Relative references

## Local references

Local references are those that are local to the specification being processed. They look something like this:

```yaml
$ref: '#/components/schemas/Error'
```

They are local in the sense that they are contained within the same document as the reference.

`vaccum` knows how to handle these references out of the box, without needing any further configuration.

### Remote references

Remote references are those that are hosted on a remote server, and are accessed via a URL. They look something like this:

```yaml
$ref: 'https://api.quobix.com/openapi.yaml#/components/schemas/Error'
```

The first part (_before the hash_) is the full URL to the remote file. The second part (_after the hash_) is the JSON Pointer
to the object being referenced.

This is the **correct** way to reference remote files, vacuum will support this out of the box, without needing any
further configuration.

> However, this is generally not the way that remote references are used in the wild.

Most of the time an OpenAPI specification assumes you have downloaded the entire set of files from the remote location,
**_before_** you start processing the specification, which is not a good assumption to make.

{{<error-box>}}
The **worst** of the offenders out there that does this 
is [Digital Ocean](https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml).
{{</error-box>}}

### Relative references

Relative references can be those that are hosted on a remote server, or on the local file system. They can be either!

```yaml
$ref: '../../../resources/openapi.yaml#/components/schemas/Error'
```

> So how does vacuum know the difference?

**It doesn't!**

For example, when parsing the [Digital Ocean](https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml)
specification, there are references to relative files that are hosted on the remote server. 

This isn't very useful if the [indexing engine]({{<ref "/vacuum/api/spec-index">}}) tries to find those files 
on the local file system (which is what the specification is indicating) and it can't.

### Providing a BaseURL

To solve this problem, `vacuum` allows you to provide a `BaseURL` that will be used to resolve relative references. 
This URL is used by the resolver to resolve relative references correctly if they do not exist on the local file system.

This is done using the `-p` / `--base` flag.

In the [Digital Ocean](https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml)
example, the `BaseURL` would be https://raw.githubusercontent.com/digitalocean/openapi/main/specification 

For example

```
vacuum lint digitalocean.yaml -p \
https://raw.githubusercontent.com/digitalocean/openapi/main/specification
```

### Providing a Base working directory

If files are available locally, then you can provide a base working directory that will be used to resolve relative
references. This directory is used by the resolver to resolve relative references correctly if they do exist on the local
file system.

The default is the current working directory, however it can be set to anything using the same `-p` / `--base` flag.


{{< terminal-window
"vacuum lint using a base working directory"
"vacuum"
"lint" "-p">}}vacuum lint -p ../../specs/openapi digitalocean.yaml{{< /terminal-window >}}

The index will look in `../../specs/openapi` as a base for relative files.

## Available Flags

`spectral-report` supports the following flags

| Short |     Full     |  Input  | Description                                                |
|:-----:|:------------:|:-------:|:-----------------------------------------------------------|
|  -h   |   _--help_   | `bool`  | Show help screen and all flag details                      |
|  -q   | _--no-style_ | `bool`  | Disable color and style console output (useful for CI/CD)  |
|  -i   |  _--stdin_   | `bool`  | Use `stdin` instead of reading OpenAPI spec from a file    |
|  -o   |  _--stdout_  | `bool`  | Use `stdout` instead of writing Spectral report to a file  |

## Global Flags

`spectral-report` supports the following _global_ flags

| Short |    Full     |  Input   | Description                                                       |
|:-----:|:-----------:|:--------:|:------------------------------------------------------------------|
|  -r   | _--ruleset_ | `string` | Use an existing ruleset file for linting                          |
|  -t   |  _--time_   |  `bool`  | Show how long vacuum took to run (_ms_)                           |
|  -p   |  _--base_   | `string` | Base URL or Base working directory to use for relative references |

> Full flags begin with a double hyphen.

## Examples

### Use stdin and stdout

Here is an example of how to use `stdin` and `stdout` with the `spectral-report` command, and pipe
the output to `jq`

{{< terminal-window
"vacuum spectral-report using stdin and stdout"
"echo"
"vacuum"
"spectral-report,-i,-o,jq">}}echo "openapi: 3.0.1" | vacuum spectral-report -i -o | jq {{< /terminal-window >}}
