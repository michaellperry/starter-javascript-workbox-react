---
title: "JavaScript"
---

The `class` feature of modern JavaScript offers a good way to group a fact constructor with a set of template functions.
The type is added as a prototype field.

```javascript
class Tag {
    constructor(
        name
    ) {
        this.type = Tag.Type;
        this.name = name;
    }
}
Tag.Type = "Blog.Tag";
```

A fact can then be created with the `new` operator.

```javascript
const tagReact = await j.fact(new Tag("React"));
```

## Template Functions

Using `static` methods of a class, you can group template functions with the type to which they belong.

```javascript
class Post {
    constructor (
        created,
        author
    ) {
        this.type = Post.Type;
        this.created = created;
        this.author = author;
    }

    static byAuthor(author) {
        return j.match({
            type: Post.Type,
            author
        });
    }
}
Post.Type = "Blog.Post";
```

Template functions belong either with their parameter type or their result type.
Successor templates as shown above are best kept with the result type.
This is because the predecessor (the `author` in this example) has no dependency upon the successor.
There is no need to create that dependency by putting the template function there.
This also makes the queries easier to read.

```javascript
const posts = j.query(author, j.for(Post.byAuthor));
```

## Predecessor Templates

Some template functions return a predecessor.
This is most common in authorization rules.

```javascript
class Post {
    constructor (
        created,
        author
    ) {
        this.type = Post.Type;
        this.created = created;
        this.author = author;
    }

    static author(post) {
        post.has("author");
        return j.match(post.author);
    }
}
Post.Type = "Blog.Post";

function authorizeBlog(a) {
    return a
        .type(Post.Type, j.for(Post.author))
        ;
}
```

By convention, the template function has the same name as the predecessor.
It will not conflict, because the template function is static while the predecessor is an instance field.