---
title: "Quick Example"
---

A Jinaga data model is made of **facts**.
A fact is an immutable JavaScript object which has a `type` field.

```JavaScript
var alice = {
    type: 'Player',
    name: 'Alice'
};

var bob = {
    type: 'Player',
    name: 'Bob'
};
```

A fact can refer to other facts, called **predecessors**.

```JavaScript
var game = {
    type: 'Game',
    playerX: alice,
    playerO: bob,
    start: '2018-10-21T18:52:21Z'
};
```

