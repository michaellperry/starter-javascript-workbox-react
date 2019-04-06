---
title: "field"
---

The simplest field specification function provides an immutable value based on the fact.
Use it to copy a field directly from the fact into state.

```javascript
{
    text: field(m => m.text)
}
```

Or to compute the hash.

```javascript
{
    hash: field(m => j.hash(m))
}
```

Or to store the fact itself.

```javascript
{
    fact: field(m => m)
}
```