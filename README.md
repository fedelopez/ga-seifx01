# Welcome to SEiFX01

Welcome to SEiFX01!

This repo contains:

- the instructor materials for each day
- scripts to setup your workstation

## Workstation Setup

This script automates the process of setting up a workstation for the SEiFX01 GA course.

### Goals

The primary goal of this project is to give students a simple script they can run to make their machine a bit more useful and standard for working on the GA's SEiFX01 course.

 * A bash script is easy for users to edit locally on-the-fly for small temporary tweaks
 * Everything is in one repository
 * The project name is informative
 * Keep it easy to fork and customize
 * It has very limited requirements: git, bash and Ruby are all available on macOS by default

### Anti-goals

This setup script does not aim to do everything. Some examples:

 * We don't install everything that your project needs. These scripts should only install generally useful things, and prefer running quickly over being complete.
 * We avoid setting up and maintaining overly-custom configurations. When there is already a tool that will get us something in a conventional manner, such as [bash-it](https://github.com/Bash-it/bash-it), we prefer to use it instead of doing things ourselves.

### Getting Started

- Run the latest version of macOS, currently [High Sierra](https://www.apple.com/macos/high-sierra/),
  unless you have a specific reason not to
- These scripts might work on previous versions, but are maintained with only the latest macOS in mind
- If you are not on High Sierra, you need to install the latest version of [Xcode](https://developer.apple.com/xcode/)
- On High Sierra, once you have used git (below), you will have installed the command line developer tools

Open up Terminal.app and run the following command:

```sh
bin/setup-macos.sh
```
