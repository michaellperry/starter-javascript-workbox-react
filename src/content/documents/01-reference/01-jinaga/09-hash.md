---
title: "hash"
---

Compute a string that probabilistically represents a fact.

```typescript
static hash<T>(
    fact: T
): string;
```

## Parameters

* **fact** - The fact to identify

## Returns

* A base-64 encoded SHA-512 hash of a canonical string produced from the fact's fields and predecessors

## Examples

The hash is best used to stand in for the identity of a fact.
It is suitable for use as a key in a JavaScript dictionary.

```javascript
let messageViewModels = {};

j.watch(channel, j.for(messagesInChannel), messageAdded, messageRemoved);

function messageAdded(message) {
    const hash = j.hash(message);
    messageViewModels[hash] = createViewModel(message);
    return hash;
}

function messageRemoved(hash) {
    delete messageViewModels[hash];
}
```

You will also find it useful as a key for a React component.
And since two instances of the same fact are not guaranteed to be the same object, the hash can be used for identity comparison.

```javascript
if (otherUser !== thisUser) {
    // Not correct: two distinct objects could both represent the same fact.
}

if (otherUser.publicKey !== thisUser.publicKey) {
    // Works great, if you have a distinguishing field like public key.
}

if (j.hash(otherUser) !== j.hash(thisUser)) {
    // Takes other fields, as well as predecessors, into account.
}
```

The hash does not include the fact's type.
In most use cases, you want to distinguish among several facts of the same type.
However, if your use case allows for multiple types, and they have similar shapes, you will want to combine the type with the hash.

```javascript
const key = `${fact.type}:${j.hash(fact)}`;
```