# Alex's Personal Website

Tracking the evolution of my website over the years. Check out the
[changelog](CHANGELOG.md) for a history of my poor design decisions!

This site is build on Next.js and MDX.


## Installation

```
git clone git@github.com:azirbel/website.git
```

This is necessary because @zeit/next-mdx doesn't yet pull in v16 of @mdx-js/mdx, which fixes a bug around code tags.

See https://github.com/mdx-js/mdx/issues/304 and https://github.com/zeit/next-plugins/issues/307

```
yarn install --frozen-lockfile
```


## Running / Development

```bash
yarn build:content
yarn dev
```


## Deployment

```bash
now
now alias [paste] www.alexzirbel.com
```

