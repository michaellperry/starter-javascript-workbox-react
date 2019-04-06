---
title: "array"
---

The `array` field specification function is similar to `collection`, except that it produces an array of objects instead of a React component.
Like a collection, it executes a query to find a set of child facts.
But unlike a collection, it takes a child object specification rather than a child component mapping.
It produces objects using that specification, and provides the array as the prop.

```javascript
{
    messages: array(j.for(messagesInChannel), {
        text: field(m => m.text),
        sender: property(j.for(Message.sender).then(UserName.forUser), n => n.value, "<sender>")
    })
}
```

Like a collection, you can determine how the array will be sorted.
However, you can only use the variation that sorts by an element of the object, not by a subsequent query.
Just make sure that the field that you want sort by is part of the specification.

```javascript
{
    messages: array(j.for(messagesInChannel), {
        text: field(m => m.text),
        sender: property(j.for(Message.sender).then(UserName.forUser), n => n.value, "<sender>")
    }, ascending(m => m.sender))
}
```