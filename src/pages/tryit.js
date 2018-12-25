//import { graphql, StaticQuery } from 'gatsby';
import React, { Component } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import * as monaco from "monaco-editor";

class TryItPage extends Component {
    render() {
        return (
            <Layout className="body-container">
                <SEO title="Try It" keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
                <div className="page-content">
                    <h1>Try it!</h1>
                    <div id="container" style={{width:800,height:600,border:"1px solid #ccc"}}></div>
                </div>
            </Layout>
        );
    }

    componentDidMount() {
        monaco.editor.create(document.getElementById('container'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        });
    }
}

export default TryItPage;