---
title: "Quick Example"
---

A Jinaga data model is made of **facts**.
A fact is an immutable JavaScript object which has a `type` field.

```JavaScript
var alice = await j.fact({
    type: 'Player',
    name: 'Alice'
});

var bob = await j.fact({
    type: 'Player',
    name: 'Bob'
});
```

A fact can refer to other facts, called **predecessors**.

```JavaScript
var game = await j.fact({
    type: 'Game',
    playerX: alice,
    playerO: bob,
    start: '2018-10-22T00:34:31.987Z'
});
```

Alice and Bob want to play some Tic-Tac-Toe.
Let's make a few moves.

```JavaScript
await j.fact({
    type: 'Move',
    game: game,
    player: alice,
    index: 0,
    square: 4
}));
await j.fact({
    type: 'Move',
    game: game,
    player: bob,
    index: 1,
    square: 7
}));
await j.fact({
    type: 'Move',
    game: game,
    player: alice,
    index: 2,
    square: 0
}));
```

To find all moves in a game, first define a **template function**.

```JavaScript
function movesInGame(g) {
    return j.match({
        type: 'Move',
        game: g
    });
}
```

Then **watch** the game to call a function every time a move is made.

```JavaScript
function moveMade(move) {
    // Update the view.
}

j.watch(game, j.for(movesInGame), moveMade);
```

Now whenever you use `j.fact` to add a fact that matches the template, the function will be called.
Wouldn't it be cool if that happened between browsers, too?
What if Alice and Bob want to play a game in real time?
Simple. Just **subscribe**.

```JavaScript
j.subscribe(game, j.for(movesInGame));
```

Jinaga synchronizes immutable facts from browser, to server, and back again.