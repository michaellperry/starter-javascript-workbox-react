import { graphql, StaticQuery } from 'gatsby';
import { JinagaBrowser } from "jinaga/dist/jinaga";
import React, { Component } from 'react';
import Header from '../components/header';
import MonacoEditor from '../components/MonacoEditor';
import SEO from '../components/seo';
import '../stylesheets/main.scss';

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