---
title: oasOpSingleTag
linkTitle: oasOpSingleTag
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
  Checks operations only contain a single tag
type: vacuum
layout: function

---

`oasOpSingularTag` will scan an OpenAPI specification looking at each operation, checking there is only a single
tag defined per operation.

The function is used by
the [operation-singular-tag]({{< relref "/vacuum/rules/tags/operation-singular-tag" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_single_tag.go)