---
title: "PostgreSQL"
---

Jinaga persists facts on the server in a PostgreSQL database.
Create a new database instance for the application.

Log on to your PostgreSQL database as the `postgres` user.
You can do this with the following `psql` command.

```bash
psql -h localhost postgres postgres
```

Create a new database named for your application.

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

Log off of the session (Ctrl+D) so that you can run the setup script.
Switch to the application database and run the script in `node_modules/jinaga/setup.sql`.

```bash
psql -h localhost -f node_modules/jinaga/setup.sql -U postgres myapplication
```

You will need to install the NPM package in order to retrieve this file.

Once you have created the PostgreSQL database, configure the application to use it.
Modify the `JinagaServer` line in `jinaga-config.js` so that it specifies the PostgreSQL connection string.

```javascript
    const pgConnection = process.env.JINAGA_POSTGRESQL ||
      'postgresql://dev:devpw@localhost:5432/myapplication';
    const { handler } = JinagaServer.create({
        pgKeystore: pgConnection,
        pgStore: pgConnection
    });
```

Start the application, and it will start counting from 1.
If you stop and restart it, you will see that it continues from there.
The server is now persisting your facts.