---
title: "property"
---

A Jinaga property is a pattern for simulating changes to a value using immutable facts.
The `property` function translates this pattern into a prop that can change.

A property fact has a parent entity, a value, and an array of prior facts.

```javascript
const name1 = await j.fact({
    type: 'User.Name',
    user: { type: 'User', publicKey: '...' },
    value: 'Michael',
    prior: []
});
```

To change the value of a property, create a new fact that refers to the previous value.

```javascript
const name2 = await j.fact({
    type: 'User.Name',
    user: { type: 'User', publicKey: '...' },
    value: 'Mike',
    prior: [ name1 ]
});
```

Declare a template function that matches only the facts that have not been superseded.

```javascript
function nameOfUser(u) {
    return j.match({
        type: 'User.Name',
        user: u
    }).suchThat(nameIsCurrent);
}

function nameIsCurrent(n) {
    return j.notExists({
        type: 'User.Name',
        prior: [n]
    });
}
```

The `property` specification function will assign the value of the most recent fact to a prop.
The last parameter is the default value, which is used if the query returns no results.

```javascript
{
    name: property(j.for(nameOfUser), n => n.value, "<user>")
}
```