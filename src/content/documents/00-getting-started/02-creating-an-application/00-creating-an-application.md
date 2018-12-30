---
title: Creating an Application
---

These steps create a minimal Jinaga application.
You might want to set up Gulp, Grunt, or any other build system you choose.
You might want to use React, Angular, Vue, Knockout, or the front-end library of your choice.
These instructions assume none of that.
All that they assume is Webpack, because you have to have something to import the Jinaga bundle.
You could use RequireJS instead, if that's your preference.

Create a new Node application.

```bash
mkdir myapplication
cd myapplication
npm init
```

Then install the following packages:

```bash
npm install --save \
    body-parser \
    cookie-parser \
    es6-promise \
    express \
    express-session \
    jinaga \
    jsonwebtoken \
    passport \
    pg
```

And install the following development packages:

```bash
npm install --save-dev \
    webpack \
    webpack-cli
```