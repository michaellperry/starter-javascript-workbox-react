---
title: "collection"
---

A collection field produces an array of child objects.
Each object must have a field that uniquely identifies it.
If you already have such a field within the model, feel free to use it.
But a good alternative is to use the fact's hash.
Provide specifications for all fields of the child objects, including the key.

```javascript
collection('messages', j.for(messagesInChannel), m => m.key, [
    field('key', m => j.hash(m))
])
```