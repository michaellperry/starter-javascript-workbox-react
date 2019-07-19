# Workbox Starter Kit for JavaScript and React

This starter kit uses Webpack to bundle both the client and the server.

Find out more about [Webpack](https://webpack.js.org/), [React](https://reactjs.org/), and [Workbox](https://workboxjs.org/).

## Installing

The easiest way to use this starter kit is to clone it and delete the Git associations.

```bash
git clone https://github.com/jinaga/starter-javascript-workbox-react.git myapplication
cd myapplication
rm -rf .git
```

Once you have the code, run:

```bash
npm install
```

## Building

To build:

```bash
npm run build
```

This creates a `dist` folder with the server-side code in `server.js`, and the client-side code in `scripts/main.js`.

## Running

To run:

```bash
npm start
```

## Developing

After the first build, you will probably want to run in development mode:

```bash
npm run dev
```

This will watch the source code for changes and rebuild as necessary.
It will restart the server to load those changes.

Build something incredible!
