import React, { Component } from 'react';

class MonacoEditor extends Component {
    render() {
        return (
            <div id="container"></div>
        );
    }

    componentDidMount() {
        import("monaco-editor").then(monaco => {
            // monaco.languages.typescript.javascriptDefaults.addExtraLib(

            // );

            this.editor = monaco.editor.create(document.getElementById('container'), {
                value: `async function tryit() {
    const tagReact = await j.fact({
        type: 'Blog.Tag',
        name: 'React'
    });
}
`,
                language: 'typescript',
                minimap: {
                    enabled: false
                }
            });
    
            window.addEventListener('resize', () => {
                this.editor.layout();
            });
        });
    }

    getValue() {
        return this.editor.getValue();
    }
}

export default MonacoEditor;