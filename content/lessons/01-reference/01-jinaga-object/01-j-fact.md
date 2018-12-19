---
title: Jinaga.fact
type: book
---

Creates a new fact.
This method is asynchronous.
It will be resolved when the fact has been sent to the server.

```TypeScript
fact<T>(
    prototype: T
    ): Promise<T>;
```