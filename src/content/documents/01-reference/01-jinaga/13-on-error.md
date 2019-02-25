---
title: onError
---

Register an callback to receive error messages.

```typescript
onError(
    handler: (message: string) => void
): void;
```

## Parameters

* **handler** - A function to receive error messages

## Examples

Display errors to the user with the front-end library of your choice.

```typescript
function displayError(message) {
    // Show a growl or banner notification
}

j.onError(displayError);
```

Log errors on the server using very similar looking code.