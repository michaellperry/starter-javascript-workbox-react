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
            </div>
        );
    }

    componentDidMount() {
        this.editor = monaco.editor.create(document.getElementById('container'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
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
        // eslint-disable-next-line
        const f = new Function(code);
        f();
    }
}

export default TryItPage;