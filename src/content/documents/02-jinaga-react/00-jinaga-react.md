---
title: 'Jinaga React'
---

Using Jinaga with [React](https://reactjs.org) is a lot easier when you use the binding helpers in `jinaga-react`.

```bash
npm install --save jinaga react react-dom jinaga-react
```

Use the `useJinaga` hook in a function component:

```javascript
export const ChannelView = ({ channel }) => {
    const state = useJinaga(j, channel, [
        collection('messages', j.for(Message.inChannel), m => m.key, [
            field('key', m => j.hash(m)),
            field('text', m => m.text),
            property('sender', j.for(Message.sender).then(UserName.forUser), n => n.value)
        ])
    ]);

    return (
        <ul>
            { state.messages.map(message => <li key={message.key}>
                <p>{ message.text }</p>
                <p>{ message.sender }</p>
            </li>) }
        </ul>
    );
};
```

Or use the `StateManager` class in a class component:

```javascript
export class ChannelView extends React.Component {
    constructor(props) {
        super(props);
        this.stateManager = StateManager.forComponent(this, j, props.channel, [
            collection('messages', j.for(Message.inChannel), m => m.key, [
                field('key', m => j.hash(m)),
                field('text', m => m.text),
                property('sender', j.for(Message.sender).then(UserName.forUser), n => n.value)
            ])
        ]);
        this.state = this.stateManager.initialState();
    }

    componentDidMount() {
        this.stateManager.start();
    }

    componentWillUnmount() {
        this.stateManager.stop();
    }

    render() {
        return (
            <ul>
                { this.state.messages.map(message => <li key={message.key}>
                    <p>{ message.text }</p>
                    <p>{ message.sender }</p>
                </li>) }
            </ul>
        );    
    }
}
```