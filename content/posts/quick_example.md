---
title: "Quick Example"
---

A Jinaga data model is made of **facts**.
A fact is an immutable JavaScript object which has a `type` field.

```JavaScript
var j = JinagaBrowser.create({});

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

When using TypeScript, it is helpful to define classes to represent types of facts.

```TypeScript
export class Player {
    static Type = 'Player';
    type = Player.Type;

    constructor(
        public name: string
    ) { }
}

export class Game {
    static Type = 'Game';
    type = Game.Type;

    constructor(
        public playerX: Player,
        public playerO: Player,
        public start = new Date()
    ) { }
}

const alice = await j.fact(new Player('Alice'));
const bob = await j.fact(new Player('Bob'));
const game = await j.fact(new Game(alice, bob));
```

Following this pattern, we can define the moves of a game.

```TypeScript
export class Move {
    static Type = 'Move';
    type = Move.Type;

    constructor(
        public game: Game,
        public player: Player,
        public index: number,
        public square: number
    )
}

await j.fact(new Move(game, alice, 0, 4));
await j.fact(new Move(game, bob,   1, 7));
await j.fact(new Move(game, alice, 2, 0));
await j.fact(new Move(game, bob,   3, 8));
await j.fact(new Move(game, alice, 4, 6));
await j.fact(new Move(game, bob,   5, 3));
await j.fact(new Move(game, alice, 6, 2));
```

This type defines the game as a predecessor of a move.
That means that a move is a **successor**.
To find all of the successors of a fact, define a **template function**.

```TypeScript
export function movesInGame(g: Game) {
    return j.match(<Move>{
        type: Move.Type,
        game: g
    });
}

const moves = await j.query(game, j.for(movesInGame));
```

Most times, however, you don't need to run the query just once.
Instead, you need to respond every time a new result is added.
Set up a function that will be called every time a move is made.

```TypeScript
function moveMade(move: Move) {
    // Update the view.
}

j.watch(game, j.for(movesInGame), moveMade);
```

In any two player game, each player will want the browser to respond in real time when their opponent makes a move.
To support this, **subscribe** to the moves.
When one player makes a move in their browser, that fact will be pushed to the other player's browser.

```JavaScript
j.subscribe(game, j.for(movesInGame));
```

Jinaga synchronizes immutable facts from browser, to server, and back again.