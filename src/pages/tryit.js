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
            async function f(context) {
                with (context) {
                    try {
                        ${code};
                        console.log('Success');
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            f(context);
        `;
        this.clearOutput();
        // eslint-disable-next-line
        const f = new Function('context', body);
        f({
            console: {
                log: (result) => { this.setOutput(result); }
            }
        });
    }

    clearOutput() {
        document.getElementById('output').innerHTML = '';
    }

    setOutput(result) {
        document.getElementById('output').innerText += result + '\n';
    }
}

export default TryItPage;