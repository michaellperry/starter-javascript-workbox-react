import React, { Component } from 'react';
import Header from '../components/header';
import SEO from '../components/seo';
import { JinagaBrowser } from "jinaga/dist/jinaga";
import '../stylesheets/main.scss';
import { graphql, StaticQuery } from 'gatsby';

const query = graphql`{
    sourceFiles: allFile(filter: { sourceInstanceName: { eq: "jinaga" } }) {
        edges {
            node {
                relativePath
                childRawCode {
                    content
                }
            }
        }
    }
}`

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

class TryItPage extends Component {
    constructor(props) {
        super(props);
        this.editor = React.createRef();
        this.state = {
            output: ''
        };
    }

    render() {
        return (
            <StaticQuery query={query} render={(data) => (
                <div className="tryit-container">
                    <SEO title="Try It" keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
                    <div className="index-head-container">
                        <Header />
                    </div>
                    <div className="command-bar">
                        <input type="button" className="command-button" value="Run" onClick={() => { this.runCode(); }} />
                    </div>
                    <MonacoEditor ref={this.editor} key="MonacoEditor" />
                    <pre className="output">{this.state.output}</pre>
                </div>
            )}>
            </StaticQuery>
        );
    }

    componentDidMount() {
        this.j = JinagaBrowser.create({});
    }

    runCode() {
        const editor = this.editor.current;
        if (editor) {
            const code = editor.getValue();
            const body = `
                with (context) {
                    try {
                        ${code}
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            `;
            this.clearOutput();
            // eslint-disable-next-line
            const f = new Function('context', body);
            f({
                console: {
                    log: (result) => { this.setOutput(result); }
                },
                j: this.j
            });
        }
    }

    clearOutput() {
        this.setState({
            ...this.state,
            output: ''
        });
    }

    setOutput(result) {
        this.setState({
            ...this.state,
            output: this.state.output + result + '\n'
        });
    }
}

export default TryItPage;