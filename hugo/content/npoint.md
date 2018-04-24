+++
title = "n:point"
date = "2018-04-24T10:00:00-08:00"
+++

Today I'm officially launching an old side project:

[npoint.io](https://www.npoint.io/) is a JSON storage service with schema
validation.

<img src="/img/npoint-saved.png" />

It allows you to save JSON bins online (similar to the well-named
[jsonbin.io](http://jsonbin.io/), which I'm a fan of). n:point is different in
a couple ways:

1. It's focused on really easy editing
2. It lets you set and lock a [schema](http://json-schema.org/), so you can be
   confident your downstream app will never break
3. It's open source ([GitHub](https://github.com/azirbel/npoint))

## Backstory

Over the last couple years I've hit the same scenario a bunch of times:

1. I'm working on a small app that has some configuration data
2. I store that data as hardcoded JSON
3. I wish I could easily let someone else edit it

The first time, I was making an FAQ page for
[Opendoor](https://www.opendoor.com/). I stored our FAQs as JSON so that I
could generate pages in javascript (Angular.js).

It worked fine, but was annoying to change FAQs because we had to make a pull
request and deploy. Marketing people (the main users) couldn't do it
themselves.

What I wanted was an interface like this to stash my FAQ data:

<img src="/img/npoint-basic.png" />

...but if I shared a JSON bin directly with our team, I was worried someone
might forget, say, the "answer" property and break our whole FAQ.

[npoint.io](https://www.npoint.io/) can guarantee that won't happen:

<img src="/img/npoint-schema-error.png" />

There are a few other uses I have for n:point:

* Saving sample data for interview questions
* Saving data to make available to online services like
  [Observable](https://beta.observablehq.com/)
* Working faster during hackathons (At one point I was working on a chatbot
  which followed a script, and I wanted my teammate to be able to edit that
  script as we iterated.)

It's pretty flexible, so maybe there are other uses too!

## Similar Tools

Most similar tools fall somewhere on the backend-as-a-service spectrum.

<img src="/img/npoint-landscape.png" />

**JSON Bins** (e.g. [jsonbin.io](http://jsonbin.io/) and
[jsonstore.io](https://www.jsonstore.io/)): I'm a big fan of these sites, and
[jsonbin.io](http://jsonbin.io/) in particular was an inspiration for me! In
comparison, n:point focuses less on API-based access, and more on the editing
experience and schema enforcement (a bit like a CMS).

**CMS Systems** (e.g. [ButterCMS](https://buttercms.com/),
[Sanity](https://www.sanity.io/) and [Netlify
CMS](https://www.netlifycms.org/): headless CMS systems provide a data editing
interface, but expose their data over an API so you can build the frontend
yourself (like n:point). The difference is that they tend to be harder to set
up, maybe more than you want for prototyping.

**Full backends** (e.g. [Firebase](https://firebase.google.com/)): Aims at
being a full backend. Will take a decent amount of time to set up and get the
auth rules right, but has high performance and a full feature set.

**n:point aims to be as easy to set up as a JSON bin, but scale farther**. Add
schema validation only when you need it, or use it as a lightweight CMS, but
don't even bother logging in unless you want to.

(And it's free! Go try it at [npoint.io](https://www.npoint.io) and see what
you think)

## Development Notes

### Accounts

Adding user accounts slowed me down a lot for what was supposed to be a small
project. I had to set up emails for password resets, add an account management
page, and write a lot of validation rules, all of which distracted from the
main purpose of the project.

I did it because I want to support privately-owned JSON bins, and I think the
simplest way to do that is to let users share a login. So I wanted the account
system to be email and password based, rather than via Google/Twitter/Github
auth.

I also tried to use [Devise](https://github.com/plataformatec/devise), but was
pretty unhappy with how that turned out. Since my frontend is a single-page
React app, I had to customize the login process almost to the point of making
Devise useless. I wanted to do emails via a [third-party
tool](http://alexzirbel.com/side-project-emails/), so I couldn't even use
Devise to handle password reset emails.

In the future, I hope to try [Auth0](https://auth0.com/) or another third-party
auth method, and avoid this as much as possible.

### Emails

I used [SendGrid](https://sendgrid.com/) and was really happy with it. I wrote
this up as a [separate post](http://alexzirbel.com/side-project-emails/).

### Unsafe Javascript Eval

I learned that it's possible to `eval` unsafe javascript via an iframe with the
[sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
attribute set. If you do this you should also load the iframe on a different
domain, to ensure that it doesn't have access to cookies, and use `Function()`
rather than `eval` to avoid exposing local variables to the unsafe javascript.

This is also the approach that [Observable](https://beta.observablehq.com/) uses.

### React and Rails

I was happy with this stack choice. For this project I used `create-react-app`,
then configured it to build the javascript into the Rails assets folder so that
Rails can serve it. It's simple and works well, with the downside that I have
to check in the compiled JS into version control.

For future projects I plan to use [Next.js](https://github.com/zeit/next.js/),
so that I can get [blazing
fast](https://twitter.com/acdlite/status/974390255393505280) page transitions
and server-side rendering.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Tip when evaluating libraries: check if it&#39;s blazing fast. If it&#39;s fast, but the README doesn&#39;t specify whether its fastness is blazing, keep searching. Often you can find a similar library that does the same thing, but blazingly. Blazing means good.</p>&mdash; Andrew Clark (@acdlite) <a href="https://twitter.com/acdlite/status/974390255393505280?ref_src=twsrc%5Etfw">March 15, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Open Source

It's open source! Check it out here:

[github.com/azirbel/npoint](https://github.com/azirbel/npoint)

All feedback is very welcome. I hope you like it.
