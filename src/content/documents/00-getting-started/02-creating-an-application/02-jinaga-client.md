---
title: Jinaga Client
---

The main event!
You will need to include the client-side library.
The best way is to use Webpack to bundle the script with your application.

Create a new file at `src/main.js`:

```javascript
import { JinagaBrowser } from "jinaga/dist/jinaga";

const j = JinagaBrowser.create({});

function visitsInDomain(d) {
    return j.match({
        type: 'Visit',
        domain: d
    });
}

const domain = {
    type: 'Application',
    name: 'My Application'
};
j.fact({
    type: 'Visit',
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

Pay special attention to the import.
The Jinaga client-side libary is at `jinaga/dist/jinaga`.
The *server*-side library is at `jinaga`.

This application is a simple hit counter.
Every time you visit the application, it records a new fact.
Then it queries for all visits and displays the count.

Now run this command to bundle the app.

```bash
npx webpack
```

This should create a file at `dist/main.js`.
Now we need to serve it up.
Add this to `routes.js`:

```javascript
    app.get("/scripts/main.js", (req, res, next) => {
        res.sendFile(path.join(__dirname, "dist/main.js"));
    });
```

And include it in the page just before the closing `body` tag.

```html
<script src="/scripts/main.js"></script>
```

Run the app again, refresh the browser, and you should see a message.
Refresh the page, and you may be surprised to see that the count remains the same.
That's because the client doesn't tell the server about the facts.
We need to set up the server so that it can do so.