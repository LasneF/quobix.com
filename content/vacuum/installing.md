---
title: "Installing vacuum"
linkTitle: "Installing"
strapline: "Get up and running in no-time."
date: 2022-06-12T06:25:04-04:00
draft: false
menu: 
  vacuum:
    weight: 1
type: vacuum
showTOC: true
---

## Install via homebrew.

{{< info-box >}}
This the _recommended_ approach.
{{< /info-box >}}
If you're on MacOS or Linux, the easiest way to install vacuum is via [homebrew](https://brew.sh/).


{{< terminal-window
"brew install"
"brew"
"install">}}brew install daveshanley/vacuum/vacuum{{< /terminal-window >}}

<video class="instruction-video" controls playsinline loop autoplay muted>
  <source src="/assets/vacuum/mp4/brew-install.mp4" type="video/mp4">
</video>

## Install via [NPM](https://npmjs.com)

{{< terminal-window
"npm install"
"npm"
"install" "-g">}}npm install -g @quobix/vacuum{{< /terminal-window >}}

<video class="instruction-video" controls playsinline loop autoplay muted>
  <source src="/assets/vacuum/mp4/npm-install.mp4" type="video/mp4">
</video>

## Install via [yarn](https://yarnpkg.com/)

{{< terminal-window
"yarn global add"
"yarn"
"global" "add">}}yarn global add @quobix/vacuum{{< /terminal-window >}}

<video class="instruction-video" controls playsinline loop autoplay muted>
  <source src="/assets/vacuum/mp4/yarn-install.mp4" type="video/mp4">
</video>

## Install via curl

This is perhaps the most simple for CD/CD pipelines.

{{< terminal-window
"curl install"
"curl"
"-fsSL">}}curl -fsSL https://quobix.com/scripts/install_vacuum.sh | sh{{< /terminal-window >}}

<video class="instruction-video" controls playsinline loop autoplay muted>
  <source src="/assets/vacuum/mp4/curl-install.mp4" type="video/mp4">
</video>

## Install via Docker.

vacuum is available as a container, pull the image from
[Docker Hub](https://hub.docker.com/repository/docker/dshanley/vacuum/general).

{{< terminal-window
"docker pull"
"docker" 
"pull">}}docker pull dshanley/vacuum{{< /terminal-window >}}

To run via docker, add `dshanley/vacuum` as the docker command, like so:

{{< terminal-window
"docker run --rm -v $PWD:/work:ro dshanley/vacuum lint"
"dshanley/vacuum"
"lint">}}docker run --rm -v $PWD:/work:ro dshanley/vacuum lint &lt;my-openapi-spec.yaml&gt;{{< /terminal-window >}}

---

## Checkout from source.

{{< terminal-window
"git clone"
"git"
"clone">}}git clone https://github.com/daveshanley/vacuum.git{{< /terminal-window >}}
Then change directory into `vacuum`

{{< terminal-window
"change directory"
"cd">}}cd vacuum{{< /terminal-window >}}


### Build the code.

{{< terminal-window
"go build"
"go" "build">}}go build vacuum.go{{< /terminal-window >}}

### Run the code.

{{< terminal-window
"vacuum lint"
"./vacuum" "lint">}}./vacuum lint &lt;my-openapi-spec.yaml>{{< /terminal-window >}}

<video class="instruction-video" controls playsinline loop autoplay muted>
  <source src="/assets/vacuum/mp4/checkout-source.mp4" type="video/mp4">
</video>

---

## Next Steps

[Read more about the linting command]({{< relref "/vacuum/commands/lint" >}}).

---

[Check out vacuum on GitHub](https://github.com/daveshanley/vacuum)


