---
title: onProgress
---

Register a callback to receive outgoing fact count.
A count greater than 0 is an indication to the user that the application is saving.

```typescript
onProgress(
    handler: (queueCount: number) => void
): void;
```

## Parameters

* **handler** - A function to receive the number of facts in the queue

## Examples

Set a CSS class to show a saving indicator to the user.

```typescript
function displayProgress(queueCount) {
    if (queueCount > 0) {
        $('body').addClass('saving');
    }
    else {
        $('body').removeClass('saving');
    }
}

j.onProgress(displayProgress);
```