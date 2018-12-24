---
title: Jinaga
---

The primary interface is the Jinaga object.
Create one on the server and one in the browser.
Then create facts and run queries in either place.

## Initializing Jinaga on the Server

To obtain an instance on the server, call `JinagaServer.create()`.

```typescript
import { JinagaServer } from 'jinaga';

const pgConnection = process.env.JINAGA_POSTGRESQL || 'postgresql://user:pass@localhost:5432/app';
const { handler, j } = JinagaServer.create({
    pgKeystore: pgConnection,
    pgStore: pgConnection
});
```

The `handler` member is an Express middleware function.

```typescript
import * as express from 'express';
import * as http from 'http';

const app = express();
const server = http.createServer(app);

app.use('/jinaga', handler);

server.listen(8080);
```

The `j` member is the Jinaga object.
Use this for all server-side fact creation and queries.

## Initializing Jinaga in the Browser

Having created the Express middleware and given it a URL, you can use that to call `JinagaBrowser.create()`.

```typescript
const j = JinagaBrowser.create({
    httpEndpoint: '/jinaga'
});
```

You can now run queries and create facts in the browser.