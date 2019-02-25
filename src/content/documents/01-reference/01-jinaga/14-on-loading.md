---
title: onLoading
---

Register a callback to receive loading state notifications.

```typescript
onLoading(
    handler: (loading: boolean) => void
): void;
```

## Parameters

* **handler** - A function to receive loading state

## Examples

Clear the `cloak` CSS class when the initial load completes.

```typescript
function clearCloak(loading) {
    if (!loading) {
        $('body').removeClass('cloak');
    }
}

j.onLoading(clearCloak);
```

Set a CSS class to show a loading indicator to the user.

```typescript
function displayLoading(loading) {
    if (loading) {
        $('body').addClass('loading');
    }
    else {
        $('body').removeClass('loading');
    }
}

j.onLoading(displayLoading);
```