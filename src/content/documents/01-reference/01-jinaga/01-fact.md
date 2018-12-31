---
title: fact
---

Creates a new fact.
This method is asynchronous.
It will be resolved when the fact has been persisted.
It returns the fact that was just created.

```typescript
fact<T>(
    prototype: T
): Promise<T>;
```

## Parameters

* **prototype** - The fact to save and share

## Returns

* A promise that resolves to the fact that was just persisted

## Throws

* **Specify the type of the fact** if the `type` field is not provided

## Examples

Create a simple top-level fact.

```typescript
const tagReact = await j.fact({
    type: 'Blog.Tag',
    name: 'React'
});
```

[Try it](/examples/fact/single-fact)

Create a fact with a single predecessor.
Why is this called a predecessor?
Because it comes before.
We have to have a person before they can write a blog post.

```typescript
const post = await j.fact({
    type: 'Blog.Post',
    created: new Date(),    // Will be converted to an ISO string, such as '2018-12-23T22:46:02.487Z'.
    author: person          // Where person is the result of a previous j.fact.
});
```

[Try it](/examples/fact/single-predecessor)

Create a fact with multiple predecessors.
Just put them in an array.

```typescript
await j.fact({
    type: 'Blog.Post.Tags',
    post: post,
    tags: [tagReact, tagCss, tagMicroFrontends]
});
```

[Try it](/examples/fact/multiple-predecessors)

You can specify the predecessors inline.
The predecessor facts will be persisted first.
However, persistence is not guaranteed to be atomic.

```typescript
await j.fact({
    type: 'Blog.Post.Tags',
    post: {
        type: 'Blog.Post',
        created: new Date(),
        author: person
    },
    tags: [{
        type: 'Blog.Tag',
        name: 'React'
    }, {
        type: 'Blog.Tag',
        name: 'CSS'
    }, {
        type: 'Blog.Tag',
        name: 'Micro-Frontends'
    }]
});
```

[Try it](/examples/fact/all-at-once)

You may be feeling that Jinaga facts are upside down.
Typically, a JSON object contains its children.
But a Jinaga fact contains its parent.
What's going on with that?

This all stems from the fact that Jinaga facts are *immutable*.
You cannot change a fact.
If a fact contained an array of children, then you would never be able to add another child.
And so the relationship has to be flipped.
A child knows its parent, because that parent relationship never changes.

To find all of the children of a fact, you need to write a query.
By the way, we call these children *successors*, as you will soon see.