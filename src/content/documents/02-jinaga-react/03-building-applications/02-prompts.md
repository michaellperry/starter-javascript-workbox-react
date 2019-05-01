---
title: Prompts
---

A prompt is a specific kind of modal dialog.
It asks for confirmation before taking some action on the user's behalf.
Prompts usually have less content than a full modal, often just a question and a pair of buttons.

## Inject Action

Add the code in [prompt.tsx](https://github.com/michaellperry/snippets/blob/master/prompt.tsx) to your project.
This component extends the [`Modal`](../modal-dialogs/) component and provides the content.
It displays a question and a pair of buttons, Yes and No.

The question to display and the action to take if the user clicks Yes are combined in an `Action` object.

```typescript
export interface Action {
  question: string;
  confirm(): Promise<void>;
}
```

Define a React state to hold the current action:

```typescript
const [deleteAction, setDeleteAction] = React.useState(null as Action);
```

Then pass this state into the `<Prompt>` component:

```typescript
<Prompt
    title='Delete Conference'
    action={deleteAction}
    setAction={setDeleteAction} />
```

## Show the Prompt

The prompt will appear when the action is not null.
So when the user initiates an action that requires a prompt, set the state.

```typescript
<button onClick={() => setDeleteAction({
        question: `Are you sure you want to delete ${conference.title}?`,
        confirm: deleteConference
    })}>Delete</button>
```

The `confirm` field is set to an asynchronous function that will be called when the user confirms the action.
If they cancel, then the action will be set to null and the prompt will disappear.
