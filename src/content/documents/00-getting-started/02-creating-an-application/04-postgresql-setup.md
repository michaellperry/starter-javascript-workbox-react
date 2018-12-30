---
title: "PostgreSQL"
---

Jinaga persists facts on the server in a PostgreSQL database.
Create a new database instance for the application.

Log on to pgAdmin as the `postgres` user. Create a new database named for your application.

```SQL
CREATE DATABASE myapplication;
```

Create a user specifically for your application.

```SQL
CREATE USER dev WITH
  LOGIN
  ENCRYPTED PASSWORD 'devpw'
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  VALID UNTIL 'infinity';
```

This user will be granted limited permissions to the application database. It will only be able to `SELECT` and `INSERT` particular tables.

Switch to the application database and run the script in `node_modules/jinaga/setup.sql`.

Then modify the `JinagaServer` line in `jinaga.js` so that it specifies the PostgreSQL connection string.

```javascript
    const pgConnection = process.env.JINAGA_POSTGRESQL ||
      'postgresql://dev:devpw@localhost:5432/myapplication';
    const { handler } = JinagaServer.create({
        pgKeystore: pgConnection,
        pgStore: pgConnection
    });
```

Start the application, and it will start counting from 1.
But if you stop and restart it, you will see that it continues from there.
The server is now persisting your facts.