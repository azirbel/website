# Alex's Personal Website

Tracking the evolution of my website over the years. Check out the
[changelog](CHANGELOG.md) for a history of my poor design decisions!

This site uses Hugo for site generation and Gulp for building.


## Todo

* Get side-scroll working
  * Side scroll on mobile should open the menu, but it doesn't seem to work at
    all. Scroll-snap is enabled but also doesn't seem to be working.
  * Polyfill scroll-snap.
    * Consider https://github.com/alvarotrigo/fullPage.js - requires jQuery.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)


## Installation

```
git clone git@github.com:azirbel/website.git
npm install
```


## Running / Development

```bash
gulp
```

Trying to develop SASS, and annoyed that gulp crashes if your SASS doesn't
compile?

```bash
while True; do gulp; done
```


## Deployment

Build with

```bash
gulp publish
```

Copy `public` to the `azirbel.github.io` repository. Make a new commit and push
to master.


## Tricks

```
window.toggleBaselines();
```
