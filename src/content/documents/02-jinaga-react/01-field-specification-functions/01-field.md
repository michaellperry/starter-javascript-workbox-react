---
title: "field"
---

The simplest field specification function provides an immutable value based on the fact.
Use it to copy a field directly from the fact into state.

```javascript
field('text', m => m.text)
```

Or to compute the hash to use as a key.

```javascript
field('key', m => j.hash(m))
```

Or to store the fact itself.

```javascript
field('fact', m => m)
```