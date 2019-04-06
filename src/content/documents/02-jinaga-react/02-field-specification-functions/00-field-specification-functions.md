---
title: "Field Specification Functions"
---

Declare the props for your React components using the field specification functions.
These are used within the `specificationFor` function.
Each function specifies how the value for the associated prop is determined.

```javascript
const messageSpec = specificationFor(Message, {
    text: field(m => m.text),
    sender: property(j.for(Message.sender).then(UserName.forUser), n => n.value, "<sender>")
});
```