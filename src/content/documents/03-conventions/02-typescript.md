---
title: "TypeScript"
---

When using TypeScript, Jinaga can verify that template functions are used correctly.
This works best when fact types are specified as classes.

Specify the type string as an upper-case static field, and use it to initialize a lower-case instance field.
Initialize all other fields by declaring them as `public` constructor parameters.
The body of the constructor should be empty.

```typescript
class Tag {
    static Type = "Blog.Tag";
    type = Tag.Type;

    constructor(
        public name: string
    ) { }
}
```

A fact can then be created with the `new` operator.

```typescript
const tagReact = await j.fact(new Tag("React"));
```

## Date Fields

It is common to use a date as a uniquely identifying field of a fact.
But facts are converted into JSON, which does not directly support the `Date` type.
Those fields will be converted to strings.

When declaring a date field in a fact, give it the type `Date | string`. This will allow you to create the fact using `new Date()`, but yet read the field as a string.

```typescript
class Post {
    static Type = "Blog.Post";
    type = Post.Type;

    constructor (
        public created: Date | string,
        public author: Author
    ) { }
}
```

Dates will be converted into strings using ISO-8601 format and the UTC time zone.
As a result, they are portable across time zones within an application, and sort lexically.

## Template Functions

Using `static` methods of a class, you can group template functions with the type to which they belong.
Use an explicit cast within `j.match` to ensure that the compiler can verify types for you.

```typescript
class Post {
    static Type = "Blog.Post";
    type = Post.Type;

    constructor (
        public created: string,
        public author: Author
    ) { }

    static byAuthor(author: Author) {
        return j.match(<Post>{
            type: Post.Type,
            author
        });
    }
}
```

Template functions belong either with their parameter type or their result type.
Successor templates as shown above are best kept with the result type.
This is because the predecessor (the `author` in this example) has no dependency upon the successor.
There is no need to create that dependency by putting the template function there.
This also makes the queries easier to read.

```typescript
const posts = j.query(author, j.for(Post.byAuthor));
```

The explicit cast causes the template function to return an appropriately typed `Specification<T>`.
Types are verified as template functions are chained together.

```typescript
const postTitles = j.query(author, j.for(Post.byAuthor).then(PostTitle.forPost));
```

Furthermore, the result will have the correct type (`PostTitle[]` in the above example).
And additional type inference will be possible.

## Predecessor Templates

Some template functions return a predecessor.
This is most common in authorization rules.
When writing such a template function, it is necessary to use the `has` function to declare that the starting fact has a predecessor field.
This is required because the object that is actually passed to the template function isn't the fact itself, but a proxy used to interpret the function.

Because the fact doesn't actually have a method called `has`, use the `ensure` function to call `has` in a type-safe way.

```typescript
class Post {
    static Type = "Blog.Post";
    type = Post.Type;

    constructor (
        public created: string,
        public author: Author
    ) { }

    static author(post: Post) {
        ensure(post).has("author");
        return j.match(post.author);
    }
}

function authorizeBlog(a) {
    return a
        .type(Post.Type, j.for(Post.author))
        ;
}
```

By convention, the template function has the same name as the predecessor.
It will not conflict, because the template function is static while the predecessor is an instance field.