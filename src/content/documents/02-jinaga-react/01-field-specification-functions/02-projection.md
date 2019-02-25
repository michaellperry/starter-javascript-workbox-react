---
title: "projection"
---

A projection produces a single object.
This is useful for organizing component state, especially if you will be breaking down the rendering into several components.
Provide specifications for all of the fields of the child object.

```javascript
projection('user', [
    property('name', j.for(nameOfUser), n => n.value, '')
])
```

Now you have an object that has a subset of the component state, so you can render it separately.

```javascript
return (
    <UserView user={ state.user } />
);
```