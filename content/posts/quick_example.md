---
title: "Quick Example"
---

### Creating facts

A Jinaga data model is made of **facts**.
A fact is an immutable JavaScript object which has a `type` field.

```JavaScript
await j.fact({
    type: 'Tweet',
    sender: lewiscarroll,
    body: 'Twas Brillig, and the slithy toves did gyre and gimble in the wabe.',
    sent: '2018-12-05T10:54:42.356Z'
});
```

Call the `fact` function within the browser whenever the user sends a tweet.
It will be sent to the server, where it will be stored.
You don't need a custom API for that.

### Querying facts

To find a set of facts, first define a **template function**.

```JavaScript
function tweetsFromSender(s) {
    return j.match({
        type: 'Tweet',
        sender: s
    });
}
```

The **query** method returns all facts matching the template.

```JavaScript
const tweets = await j.query(lewiscarroll, j.for(tweetsFromSender));

// tweets = [ { type: 'Tweet', ... }, { ... }, ... ];
```

Again, run this code in the browser.
There is no need to set up an API to perform this query on the server.

### Watching facts

A query is a one-time operation.
If you want to update the UI every time a tweet is posted, set up a **watch**.

```JavaScript
function displayTweet(t) {
    // Add the tweet to the UI.
}

await j.watch(lewiscarroll, j.for(tweetsFromSender), displayTweet);
```

This will run the query and call the function for each tweet.
And then, as new tweets arrive, it will run the function for them as well.

This will work as is for facts created in the browser by the logged in user.
So a user can see his own tweets in real-time.
But of course, you want users to collaborate with one another.

### Subscribing to facts

To have new tweets pushed to the browser, call **subscribe**.

```JavaScript
j.subscribe(lewiscarroll, j.for(tweetsFromSender));
```

And with this, facts created in one browser make their way to other browsers.
You didn't write a custom API.
You didn't set up a Web Socket listener.
You didn't define a custom database schema.

Jinaga synchronizes immutable facts from browser, to server, and back again.
It persists them durably, transmits them reliably, and updates the view automatically.