---
title: "projection"
---

A projection produces a single child component.
This is useful for breaking down the rendering into several components.
The only parameter is the mapping of the child component.
That mapping will start from the same fact as the current specification.

```javascript
{
    UserView: projection({
        name: property(j.for(nameOfUser), n => n.value, "<user>")
    }
}
```

Give projections a capitalized name so that you can use them as regular React components within your render function.

```javascript
const userMapping = userSpec(({ UserView }) => (
    <UserView />
));
```