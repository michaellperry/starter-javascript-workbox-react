---
title: "service"
---

Execute a function for every fact matching a given preposition.
The fact represents a piece of work that needs to be done.
The function is expected to handle the fact and create a successor that consumes it.
The service continues running for the life of the process, handling both existing facts and new facts that match the preposision.

```typescript
service<T, U>(
    start: T,
    preposition: Preposition<T, U>, 
    handler: (message: U) => Promise<void>
): void;
```

## Parameters

* **start** - A fact from which to begin the query
* **preposition** - A template function passed into [`j.for`](../for/)
* **handler** - A function to call for each result

## Examples

Create a service for work to be performed on the server based on a request from a client.
For example, a matchmaking service in a game might pair potential players of similar rating.

```javascript
j.service(lobby, j.for(gameRequestsInLobby), handleGameRequest);

async function handleGameRequest(gameRequest) {
    const otherRequests = (await j.query(lobby, j.for(gameRequestsInLobby)))
        .filter(r =>
            r.player.publicKey !== gameRequest.player.publicKey &&
            Math.abs(r.rating - gameRequest.rating) < 100);
    if (otherRequests.length > 0) {
        const otherRequest = otherRequests[Math.floor(Math.random() * otherRequests.length)];
        await j.fact({
            type: 'Game',
            requests: [gameRequest, otherRequest]
        });
    }
}
```

The handler is expected to create a successor that excludes the fact from the query.
In the above example, it is assumed that `gameRequestsInLobby` matches game requests such that no `Game` exists.
Once the successor is created, the request has been handled.
Notice that in this example, the successor consumes two game requests.
The second request will not trigger the handler.

If the handler does not create such a fact, then the service moves on to the next result.
A warning is emitted through the `Trace` class.
In the above example, if there are no suitable game requests, then a warning is emitted and the handler moves on.
The handler will not be triggered again for that fact until the process is restarted.
In this case, the request remains active until a similarly rated player requests a game.

Services are useful for integrating with other data stores.
For example, create a service that stores facts into a relational database.

```javascript
j.service(blog, j.for(commentsInBlog), saveComment);

async function saveComment(comment) {
    const commentId = await insertCommentRow(comment.text, comment.sender);
    await j.fact({
        type: 'Comment.Row',
        comment,
        commentId
    });
}
```

The successor both excludes the comment from the query (thus handling it), and records the generated ID.

A similar pattern is useful for integrating with third party APIs.

```javascript
j.service(company, j.for(ordersForCompany), processOrder);

async function processOrder(order) {
    const confirmationNumber = await callOrderProcessingApi(order.details);
    await j.fact({
        type: 'Order.Confirmation',
        order,
        confirmationNumber
    });
}
```

Finally, services can be used to migrate facts from one structure to another.

```javascript
j.service(applicationRoot, j.for(version1Courses), upgradeCorseToVersion2);

async function upgradeCourseToVersion2(version1Course) {
    await j.fact({
        type: 'Upgrade.Course.2',
        version1: version1Course,
        version2: {
            type: 'Course.2',
            courseInfo: version1Course.info
        }
    });
}
```

If the structure of the facts have changed significantly, you may choose to migrate all of your history to a new schema rather than accepting both old and new facts.
This example creates the version 2 fact at the same time as it creates the upgrade.
The presence of the upgrade fact will consume the version 1 fact so that it will no longer be a candidate for upgrading.