---
title: "PostgreSQL Setup"
type: book
---

Jinaga persists facts on the server in a PostgreSQL database.
Create a new database instance for each application using the following steps.

## Database Creation

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
You will need to install the NPM package in order to retrieve this file.