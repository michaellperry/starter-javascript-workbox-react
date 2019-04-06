---
title: "mutable"
---

If you want the user to be able to edit the property, you will need to capture more information than the current value.
Use the `mutable` specification function to gather that information.

```javascript
{
    name: mutable(j.for(nameOfUser), userNames => userNames
        .map(n => n.value)
        .join(", "))
}
```

Rather than selecting just a single value, the `mutable` specification function takes a conflict resolver.
This function receives an array of facts, not just one.
If that array is empty, then the property has not yet been initialized, and the resolver should return the default value.
If the array has only one fact, then there is no conflict, and the resolver returns the value from that fact.
But, if the array contains more than one fact, then a conflict has occurred.
The resolver determines the correct value given all of those candidates.

The resolver will typically be a map-reduce style function.
The `join` function used above is perfect for strings, because it gives an empty string by default, the single value if there is no conflict, and the list of candidate values if a conflict has occurred.

Another strategy is last write wins.
Since the order of the candidates is not guaranteed, this strategy relies upon a date being added to the fact.
Dates have been converted to strings, because facts are JSON objects.

```javascript
{
    name: mutable(j.for(nameOfUser), userNames => userNames
        .reduce((a,b) => a.createdAt > b.createdAt ? a : b,
            { createdAt: "", value: "" } )
        .value)
}
```

The state field has a `value` field that contains the resolved value.
It also has some additional bookkeeping fields that keep track of candidates.

When the user begins editing the mutable property, take a snapshot of the state field.
Present them with the value, and allow them to make their changes.
When they save, use the `prior` function to turn those candidates into an array.
Then create a new fact if the value has changed or a conflict has been resolved.

```javascript
const name = this.props.name;
let value = this.props.value;

// Edit the value

const priorNames = prior(name);
if (value !== name.value || priorNames.length !== 1) {
    await j.fact({
        type: "User.Name",
        user,
        value,
        prior: priorNames
    });
}
```