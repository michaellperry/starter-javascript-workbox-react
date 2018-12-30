---
title: Jinaga Server
---

Jinaga is running on the client.
Now wire it up on the server.

I like to initialize things in a separate file.
Create a new file called `jinaga.js`:

```javascript
const { JinagaServer } = require('jinaga');

function configureJinaga(app) {
    const { handler } = JinagaServer.create({});

    app.use('/jinaga', handler);
}

module.exports = { configureJinaga };
```

Call it from `index.js`:

```javascript
// At the top
const { configureJinaga } = require('./jinaga');

// Before listen
configureJinaga(app);
```

Now that you have the endpoint, you can configure the client.
Change the `JinagaBrowser` line in `src/index.js`:

```javascript
const j = JinagaBrowser.create({
    httpEndpoint: '/jinaga'
});
```

Rebuild the bundle and rerun the application.

```bash
npx webpack
node index
```

This time, when you refresh the page, the count will go up.
The browser has shared the fact with the server, so now it remembers all of the visits.

That is, until you shut it down.
Right now the server is just holding facts in memory.
To make it persist those facts, we will want to set up PostgreSQL.