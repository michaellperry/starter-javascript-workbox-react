import * as monaco from "monaco-editor";
import React, { Component } from 'react';
import Header from '../components/header';
import SEO from '../components/seo';

class TryItPage extends Component {
    render() {
        return (
            <div className="tryit-container">
                <SEO title="Try It" keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
                <div className="index-head-container">
                    <Header />
                </div>
                <div className="command-bar">
                    <input type="button" className="command-button" value="Run" onClick={() => { this.runCode(); }} />
                </div>
                <div id="container"></div>
                <pre id="output"></pre>
            </div>
        );
    }

    componentDidMount() {
        this.editor = monaco.editor.create(document.getElementById('container'), {
            value: [
                "const tagReact = await j.fact({",
                "    type: 'Blog.Tag',",
                "    name: 'React'",
                "});"
            ].join('\n'),
            language: 'javascript',
            minimap: {
                enabled: false
            }
        });

        window.addEventListener('resize', () => {
            this.editor.layout();
        });
    }

    runCode() {
        const code = this.editor.getValue();
        const body = `
            async function f() { ${code} }
            return f();
        `;
        try {
            // eslint-disable-next-line
            const f = new Function(body);
            f().then(() => {
                this.setOutput('Success');
            })
            .catch(e => {
                this.setOutput(`Failed: ${JSON.stringify(e)}`);
            });
        }
        catch (e) {
            this.setOutput(`Exception: ${JSON.stringify(e)}`);
        }
    }

    setOutput(result) {
        document.getElementById('output').innerText = result;
    }
}

export default TryItPage;