---
title: "collection"
---

A collection field produces a component that in turn renders a list of child components.
It executes a query to get all of the child facts, and uses them as the starting point of the child mapping.

```javascript
{
    Messages: collection(j.for(messagesInChannel), messageMapping)
}
```

Give collections a capitalized name so that you can use them as regular React components within your render function.

```jsx
const channelMapping = channelSpec(({ Messages }) => (
    <Messages />
));
```

You can order the collection by a field of the resulting fact using the `ascending` or `descending` functions.

```javascript
{
    Messages: collection(j.for(messagesInChannel), messageMapping,
        descending(m => m.sentAt))
}
```

Or you can order by the results of another query.
The order-by query starts from the result.

```javascript
{
    Messages: collection(j.for(messagesInChannel), messageMapping,
        ascending(j.for(messageSender).then(namesOfUser), n => n.value))
}
```
