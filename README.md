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

Using instructions at http://www.damian.oquanta.info/posts/one-line-deployment-of-your-site-to-gh-pages.html:

1. git checkout master
2. git subtree split --prefix dist -b gh-pages
3. git push -f origin gh-pages:gh-pages
4. git branch -D gh-pages
