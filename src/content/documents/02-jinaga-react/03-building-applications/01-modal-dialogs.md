---
title: Modal Dialogs
---

Modal dialogs are often used to collect input from the user before performing an action.
They make it clear to the user that they must complete this input before proceeding.

## React Portal

Modals in React use a Component called `<Portal>` to break out of the document structure.
A portal places child components into a different element on the page.
Add the file [modal.tsx](https://github.com/michaellperry/snippets/blob/master/modal.tsx) to your application.
Then add a `div` with the id `modal-host` to the bottom of the page to accept this content.

```html
<body>
    <div id="application-host"></div>
    <div id="modal-host"></div>
</body>
```

The `Modal` component defined in that file adds a Portal to the div.

```tsx
const modalHost = document.getElementById('modal-host');
ReactDOM.createPortal((
    <div className='modal-container'>
        <!-- Modal dialog defined here -->
    </div>
  ), modalHost);
```

## Style the Modal

The Modal component will just add some elements to the bottom of your document.
They won't look much like a modal dialog.
To get that popup dialog look, you'll need to apply some styles.
The SASS file [_modal.scss](https://github.com/michaellperry/snippets/blob/master/_modal.scss) contains some styles that provide the right effect.

The first thing it does is position the container to fill the entire window:

```scss
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
```

Then within this container, it centers the dialog horizontally and vertically:

```scss
.modal-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

Additional styles make the container partially transparent so that it obscures the page a little.
They also apply a fade animation so that the modal gradually comes in and disappears.


## Create a Custom Modal Component

With these files added to your project, you are ready to define your own modal.
You will first need some state that determines whether the modal is open or not.
Then you'll set the properties of the `<Modal>` component to display as you like it.

```typescript
export const ConferenceModal = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  function saveAnd(closeDialog: () => void) {
    return async () => {
      // Save the conference asynchronously.
      closeDialog();
    }
  }

  return (
    <Modal
      title='New Conference'
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      content={closeDialog => (
        <form onSubmit={formHandler(saveAnd(closeDialog))}>
          <input type='submit' value='OK' />
          <button type='button' onClick={closeDialog}>Cancel</button>
        </form>
      )} />
  );
}
```

The `close` property is a function that resets the state so that the modal is no longer open.
The `content` property is a function that takes a single parameter and renders the contents of the modal.
That parameter is a function that you can use to close the dialog.

When the user dismisses the modal, call this function.
Don't just set the state yourself.
This function initiates the fade effect so that the modal gradually disappears.

The `formHandler` function used above is defined in [processor.ts](https://github.com/michaellperry/snippets/blob/master/processor.ts).
It prevents the default submission of the form, and instead invokes an asynchronous function.
If that function fails, it logs the error rather than letting it go unhandled.

## Handling Enter and ESC

The contents of the modal should be wrapped in a `<form>` element.
This allows the user to press Enter to complete the form and close the modal.
The `<Modal>` component already handles the ESC key by closing the dialog.

It is important to apply `type='button'` to the cancel button.
By default, any button will submit the form.
You certainly don't want the cancel button to save.

The component and styles presented here can be used in any React app.
There is nothing specific to Jinaga.
But don't worry.
Guidance about using modals with Jinaga is coming up soon.

But before we get to that, we should talk about prompts.
