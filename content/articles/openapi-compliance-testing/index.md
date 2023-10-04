---
title: "How to check your API is compliant with an OpenAPI specification"
description: This is walkthrough of how you can check the compliance of an OpenAPI specification against a client (like a UI, CLI, or SDK) and server or actual API endpoint.
date: 2023-10-04T05:19:38-05:00
draft: false
menu: "articles"
strapline: "How do you know if your clients and servers are compliant?"
hero: "images/hero-images/openapi-compliance.webp"
heroPNG: "images/hero-images/openapi-compliance.png"
heroSVG: "images/hero-images/openapi-compliance.webp"
heroTitle: "Check your clients and servers are compliant with OpenAPI specifications"
heroAlt: "Check your clients and servers are compliant with OpenAPI specifications"
---

This is a walkthrough of how you can check the compliance of an OpenAPI specification against a client (like a UI, CLI, or SDK) and server or actual API endpoint.

We will use an application called [wiretap](https://pb33f.io/wiretap/).

---

## Watch the video

This video will walk you through the steps of checking the compliance of an OpenAPI specification against a client and server.

{{<youtube "njlnguiS-LA">}}

---

## What is wiretap?

[wiretap](https://pb33f.io/wiretap/) is an API compliance testing tool that allows us to **'tap-into'** requests and responses between clients and servers and validate that those requests and responses comply with the OpenAPI specification defined.

[wiretap](https://pb33f.io/wiretap/) can also replace a local dev server, like [webpack's dev server](https://webpack.js.org/configuration/dev-server/), which can host a UI and proxy all the API calls to an endpoint.

[More information about wiretap](https://pb33f.io/wiretap/about/) is available over on the [pb33f wiretap](https://pb33f.io/wiretap) site. 

---

## Installing wiretap

There are a few ways to install [wiretap](https://pb33f.io/wiretap/)

### Installing using homebrew

{{< terminal-window
"install wiretap using homebrew"
"brew"
"install"
">">}}brew install pb33f/taps/wiretap{{< /terminal-window >}}


### Installing using npm/yarn

{{< terminal-window
"install wiretap using npm"
"npm"
"install" "-g" >}}npm install -g @pb33f/wiretap{{< /terminal-window >}}

{{< terminal-window
"install wiretap using yarn"
"yarn"
"global" "add" >}}yarn global add @pb33f/wiretap{{< /terminal-window >}}


### Installing using docker
{{< terminal-window
"install wiretap using docker"
"docker"
"pull" >}}docker pull pb33f/wiretap{{< /terminal-window >}}

### Running wiretap using docker

{{< terminal-window
"run wiretap using docker"
"docker"
"run" >}}docker run -p 9090:9090 -p 9091:9091 -p 9092:9092 --rm -v $PWD:/work:rw  \
pb33f/wiretap -u https://somehostoutthere.com{{< /terminal-window >}}

### Installing using curl

{{< terminal-window
"install wiretap using curl"
"curl">}}curl -fsSL https://pb33f.io/wiretap/install.sh | sh {{< /terminal-window >}}

---

## Downloading the Example OpenAPI specification


{{< terminal-window
"install wiretap using curl"
"curl">}}curl -o giftshop-openapi.yaml https://api.pb33f.io/wiretap/giftshop-openapi.yaml{{< /terminal-window >}}


## Running wiretap

Once you have [wiretap](https://pb33f.io/wiretap/) installed, you can run it using the following command:

{{< terminal-window "run wiretap" "wiretap">}}wiretap -s giftshop-openapi.yaml -u https://api.pb33f.io{{< /terminal-window >}}


---

## Read the wiretap quickstart

This video is an extended version of the [wiretap quickstart](https://pb33f.io/wiretap/quickstart/).

The [giftshop API documentation](https://pb33f.io/wiretap/giftshop-api/) is also available.































