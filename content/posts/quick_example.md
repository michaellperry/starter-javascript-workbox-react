---
title: "Quick Example"
---

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
