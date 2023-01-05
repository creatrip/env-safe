# Building and Testing env-safe

This document describes how to set up your development environment and run **env-safe** test cases.

- [Prerequisite Software](#prerequisite-software)
- [Getting the Sources](#getting-the-sources)
- [Installing NPM Modules](#installing-npm-modules)
- [Building](#building)
- [Running Tests Locally](#running-tests-locally)

See the [contribution guidelines](https://github.com/creatrip/env-safe/blob/master/CONTRIBUTING.md)
if you'd like to contribute to **env-safe**.

## Prerequisite Software

Before you can build and test **env-safe**, you must install and configure the
following products on your development machine:

- [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.
- [Node.js](http://nodejs.org), (better to install latest version) which is used to run a development web server,
  run tests, and generate distributable files.
  Depending on your system, you can install Node either from source or as a pre-packaged bundle.

## Getting the Sources

Fork and clone the repository:

1. Login to your GitHub account or create one by following the instructions given [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main env-safe repository](https://github.com/creatrip/env-safe).
3. Clone your fork of the env-safe repository and define an `upstream` remote pointing back to
   the env-safe repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/env-safe.git

# Go to the env-safe directory:
cd env-safe

# Add the main env-safe repository as an upstream remote to your repository:
git remote add upstream https://github.com/creatrip/env-safe.git

# Go to the SOURCE CODE directory
cd SOURCE_CODE
```

## Installing NPM Modules

Install all env-safe dependencies by running this command:

```shell
npm install
```

## Building

To build env-safe run:

```shell
npm run build
```

## Running Tests Locally

Run tests:

```shell
npm test
```

You should execute test suites before submitting a PR to github.
All the tests are executed on our Continuous Integration infrastructure and a PR could only be merged once the tests pass.
