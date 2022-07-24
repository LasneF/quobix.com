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

`oasTagDefined` will scan an OpenAPI specification looking at each operation, checking there is only a single
tag defined per operation.

The function is used by
the [operation-tag-defined]({{< relref "/vacuum/rules/tags/operation-tag-defined" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_tags.go)