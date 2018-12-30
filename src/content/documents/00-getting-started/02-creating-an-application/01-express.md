---
title: Express
---

Create the application entry point.
This goes in `index.js`.

```javascript
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json());

server.listen(app.get("port"), () => {
    console.log(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    console.log("  Press CTRL-C to stop\n");
});
```

You can run this with:

```bash
node index
```

Set this up as the `npm start` script if you like.

Then add routes.
I prefer to create these in a separate file.
Add this to `routes.js`:

```javascript
const path = require('path');

function configureRoutes(app) {
    app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });
}

module.exports = { configureRoutes };
```

Include it in `index.js`:

```javascript
// Put this at the top.
const { configureRoutes } = require('./routes');

// Put this just before listen.
configureRoutes(app);
```

Create a landing page at `index.html`.

```html
<html>
    <head>

    </head>

    <body>
        <p>Welcome!</p>
    </body>

</html>
```

Now you can start the app and open it in the browser.