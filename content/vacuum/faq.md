---
title: "Frequently Asked Questions"
linkTitle: "FAQ"
strapline: "Some answers to questions I hear frequently about vacuum"
date: 2023-06-17T12:22:04-04:00
draft: false
menu:
  vacuum:
    weight: 10
type: vacuum
---


## Q: Can I use this in production?

<strong>Yes.</strong> It's being used by multiple companies in production today.

## Q: Are you actively supporting vacuum?

<strong>Yes!</strong> There is a **lot** more to come in the future. It's an active project with a rich roadmap ahead of it.

## Q: Can I sponsor you?

<strong>Yes.</strong> It's most welcome and appreciated. [please visit the sponsor page](https://github.com/sponsors/daveshanley) for more information.

Companies are _encouraged_ to sponsor vacuum, as it's a great way to show your support for the project, and get priority
support for your issues.

## Q: Why do I see a 'local lookups are not permitted' warning?

It's probably also telling you to **set AllowFileLookup to true in the configuration**. What does this mean?

This is vacuum telling you that it's detected a local file reference in the OpenAPI specification, and that it's
not going to resolve it without you **explicitly telling it to**.

This is a _safety guard_ to prevent a run-away malicious resolving incident happening. If you remember [Log4Shell](https://en.wikipedia.org/wiki/Log4Shell)
You will understand why this is important.

To tell vacuum to resolve the local file, you need to use the `-p` or `--base` flag that tells vacuum 
where to resolve the local file from. You can use `.` If the file is in your current working directory.

For example:

{{< terminal-window
"vacuum lint with local file references enabled"
"vacuum"
"lint">}}vacuum lint openapi.yaml --base .{{< /terminal-window >}}

## Q: Why do I see a 'remote lookups are not permitted' warning?

It's probably also telling you to **set AllowRemoteLookup to true in the configuration**. What does this mean?
 
Like with local references, telling you that it's detected a remote file reference in the OpenAPI specification, and that it's
not going to resolve it without you **explicitly telling it to**.

Same reason as local lookups. [Log4Shell](https://en.wikipedia.org/wiki/Log4Shell) is a lesson from history.

To tell vacuum to resolve the remote file, you need to use the `-p` or `--base` flag that tells vacuum
where to resolve the remote reference from.

For example:

{{< terminal-window
"vacuum lint with remote file references enabled"
"vacuum"
"lint">}}vacuum lint openapi.yaml --base https://somewhere/someplace/{{< /terminal-window >}}