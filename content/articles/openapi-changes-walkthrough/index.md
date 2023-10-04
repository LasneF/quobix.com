---
title: "How to check for breaking changes in an OpenAPI specification"
description: This is walkthrough of how you can use openapi-changes to detect breaking changes in any OpenAPI specification.
date: 2023-10-03T03:19:38-05:00
draft: false
menu: "articles"
strapline: "Know what, where, when and who changed it."
hero: "images/hero-images/openapi-changes-walkthrough.webp"
heroPNG: "images/hero-images/openapi-changes-walkthrough.png"
heroSVG: "images/hero-images/openapi-changes-walkthrough.webp"
heroTitle: "How to tell what changed with your OpenAPI specification"
heroAlt: "How to tell what changed with your OpenAPI specification"
---

I assume you're trying to compare an original and an updated spec or want to check a single spec against a previous commit in a Git repo.

We will use an application called [openapi-changes](https://pb33f.io/openapi-changes/).

---

## Watch the video

This video will walk you through how to use [openapi-changes](https://pb33f.io/openapi-changes/) and will showcase all 
the available commands and how to use them.

{{<youtube "sNalT1RIF4w">}}

---

## What is openapi-changes?

[openapi-changes](https://pb33f.io/openapi-changes/) is the world's sexiest OpenAPI breaking change detector. 
It allows you to compare two OpenAPI specifications and see what changed. It's like `git diff` for OpenAPI (but way, way sexier)

[More information about openapi-changes](https://pb33f.io/openapi-changes/about/) is available over on the [pb33f wiretap](https://pb33f.io/wiretap) site.

---

## Installing openapi-changes

There are a few ways to install [openapi-changes](https://pb33f.io/openapi-changes/):

### Installing using homebrew

{{< terminal-window
"install openapi-changes using homebrew"
"brew"
"install"
">">}}brew install pb33f/taps/openapi-changes{{< /terminal-window >}}


### Installing using npm/yarn

{{< terminal-window
"install openapi-changes using npm"
"npm"
"install" "-g" >}}npm install -g @pb33f/openapi-changes{{< /terminal-window >}}

{{< terminal-window
"install openapi-changes using yarn"
"yarn"
"global" "add" >}}yarn global add @pb33f/openapi-changes{{< /terminal-window >}}


### Installing using docker
{{< terminal-window
"install openapi-changes using docker"
"docker"
"pull" >}}docker pull pb33f/openapi-changes{{< /terminal-window >}}

### Running openapi-changes using docker

{{< terminal-window
"run openapi-changes using docker"
"docker"
"run" >}}docker run --rm -v $PWD:/work:rw  \
pb33f/openapi-changes summary original-openapi.json modified-openapi.json{{< /terminal-window >}}

### Installing using curl

{{< terminal-window
"install openapi-changes using curl"
"curl">}}curl -fsSL https://pb33f.io/openapi-changes/install.sh | sh {{< /terminal-window >}}

---

## Read the openapi-changes quickstart

This video is an extended version of the [openapi-changes quickstart](https://pb33f.io/openapi-changes/quickstart/).































