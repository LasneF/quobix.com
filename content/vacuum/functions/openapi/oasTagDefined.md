---
title: oasTagDefined
linkTitle: oasTagDefined
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
  Checks operations are using tags that are globally defined.
type: vacuum
layout: function

---

`oasTagDefined` will scan an OpenAPI specification looking at each operation's tags. Those tags are checked
against the global tags defined for the document. Anything that does not align (is missing globally) will be returned.

The function is used by
the [operation-tag-defined]({{< relref "/vacuum/rules/tags/operation-tag-defined" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_tags.go)