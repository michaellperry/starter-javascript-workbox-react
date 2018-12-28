import { graphql } from 'gatsby';
import { JinagaBrowser } from "jinaga/dist/jinaga";
import React, { Component } from 'react';
import Header from '../components/header';
import MonacoEditor from '../components/MonacoEditor';
import SEO from '../components/seo';
import '../stylesheets/main.scss';

class ExamplePage extends Component {
    constructor(props) {
        super(props);
        this.editor = React.createRef();
        this.state = {
            output: ''
        };
    }

    render() {
        const { example, sourceFiles } = this.props.data;
        return (
            <div className="tryit-container">
                <SEO title="Try It" keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
                <div className="index-head-container">
                    <Header />
                </div>
                <div className="command-bar">
                    <input type="button" className="command-button" value="Run" onClick={() => { this.runCode(); }} />
                </div>
                <MonacoEditor ref={this.editor} key="MonacoEditor"
                    libraries={sourceFiles.edges.map(edge => ({
                        path: edge.node.relativePath,
                        content: edge.node.childRawCode.content
                    }))}
                    content={example.childRawCode.content} />
                <pre className="output">{this.state.output}</pre>
            </div>
        );
    }

    componentDidMount() {
        this.j = JinagaBrowser.create({});
    }

    runCode() {
        const editor = this.editor.current;
        if (editor) {
            const code = editor.getValue();
            import('typescript').then(ts => {
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
                const { diagnostics, outputText } = ts.transpileModule(body, {
                    compilerOptions: {
                        module: ts.ModuleKind.None
                    }
                });
                let output = '';
                if (diagnostics.length > 0) {
                    output = diagnostics.map(d => d.messageText).join('\n');
                }
                else {
                    try {
                        // eslint-disable-next-line
                        const f = new Function('context', outputText);
                        f({
                            console: {
                                log: (result) => {
                                    // Log immediately...
                                    output += result + '\n';
                                    // And later
                                    this.setOutput(result);
                                }
                            },
                            j: this.j
                        });
                    }
                    catch (e) {
                        output = e.message;
                    }
                }

                this.setState({
                    ...this.state,
                    output
                });
            });
        }
    }

    setOutput(result) {
        this.setState({
            ...this.state,
            output: this.state.output + result + '\n'
        });
    }
}

export default ExamplePage;

export const query = graphql`
query($slug: String!) {
    example: file(
        relativePath: { eq: $slug },
        sourceInstanceName: { eq: "examples" } )
    {
        childRawCode {
            content
        }
    },
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