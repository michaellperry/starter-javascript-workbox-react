---
title: Starter Kits
---

If you follow the instructions in [Creating an Application](../creating-an-application/), you will end up with a working application.
Those steps are designed so that you can see each piece working one at a time.
If you want to skip ahead, you can deploy one of the following starter kits.
But if something goes wrong, it might be harder to diagnose.

First, pick your language.
Then export the repository.
If you have Subversion installed, you can do that in a single line.
Otherwise, you will need to download it via the GitHub repository page.

## TypeScript

```bash
svn export https://github.com/jinaga/starter-typescript.git/trunk myapplication
```

[Download from GitHub](https://github.com/jinaga/starter-typescript)

## JavaScript

Repository coming soon.
For now, just copy the following files.

### package.json

```json
{
  "name": "myapplication",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.3",
    "cookie-parser": "^1.4.3",
    "es6-promise": "^4.2.5",
    "express": "^4.16.4",
    "express-session": "^1.15.6",
    "jinaga": "^2.0.0",
    "jsonwebtoken": "^8.4.0",
    "passport": "^0.4.0",
    "pg": "^7.7.1"
  },
  "devDependencies": {
    "webpack": "^4.28.3",
    "webpack-cli": "^3.1.2"
  }
}
```

### index.js

```javascript
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { configureRoutes } = require('./routes');
const { configureJinaga } = require('./jinaga');

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json());

configureRoutes(app);
configureJinaga(app);

server.listen(app.get("port"), () => {
    console.log(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    console.log("  Press CTRL-C to stop\n");
});
```

### routes.js

```javascript
const path = require('path');

function configureRoutes(app) {
    app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    app.get("/scripts/main.js", (req, res, next) => {
        res.sendFile(path.join(__dirname, "dist/main.js"));
    });
}

module.exports = { configureRoutes };
```

### jinaga.js

```javascript
const { JinagaServer } = require('jinaga');

function configureJinaga(app) {
    const pgConnection = process.env.JINAGA_POSTGRESQL ||
        'postgresql://dev:devpw@localhost:5432/myapplication';
    const { handler } = JinagaServer.create({
        pgKeystore: pgConnection,
        pgStore: pgConnection
    });

    app.use('/jinaga', handler);
}

module.exports = { configureJinaga };
```

### index.html

```html
<html>
    <head>

    </head>

    <body>
        <p>Welcome!</p>

        <script src="/scripts/main.js"></script>
    </body>

</html>
```

### src/index.js

```javascript
import { JinagaBrowser } from "jinaga/dist/jinaga";

const j = JinagaBrowser.create({
    httpEndpoint: '/jinaga'
});

function visitsInDomain(d) {
    return j.match({
        type: 'MyApplication.Visit',
        domain: d
    });
}

const domain = {
    type: 'MyApplication.Domain',
    name: 'myapplication'
};
j.fact({
    type: 'MyApplication.Visit',
    time: new Date(),
    domain
}).then(visit => {
    return j.query(domain, j.for(visitsInDomain));
}).then(visits => {
    const message = `You are visitor number ${visits.length}.`;
    const paragraph = document.createElement('p');
    paragraph.innerText = message;
    document.body.appendChild(paragraph);
});
```