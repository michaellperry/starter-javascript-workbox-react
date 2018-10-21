---
title: "Getting Started"
---

## Requirements

- Node 8.9.4
- PostgreSQL 10

Installing pre-requisites:

- Node works best in Bash. Either use the Windows Subsystem for Linux, or use `nvm-windows` to install Node, or just use MacOS/Linux.
- Install `nodejs` on your local machine from [nodejs.org](https://nodejs.org) or another installation medium. 
- Install `gulp-cli` globally by running `sudo npm install -g gulp-cli`.
- Install `PostgreSQL` and `pgAdmin` on your local machine.

If you are installing Node on the Windows Subsystem for Linux with Ubuntu, run these commands:

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Install Jinaga

Create a new Node application.

```bash
mkdir myapplication
cd myapplication
npm init
```

Install the `jinaga` package.

```bash
npm install --save jinaga
```

### Create PostgreSQL Database

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
