import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import siteLogo from "../images/site-logo.png";


const IndexPage = () => (
  <Layout
    className="body-container"
    head={
      <div className="hero">
        <img src={siteLogo} alt="Jinaga" />
        <p>Resilient, reliable, and connected web applications.</p>
      </div>
    }>
    <SEO title="Jinaga" keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
    <h2>Exchange Immutable Facts</h2>
    <p>
      JSON objects are durably stored on the back end,
      and reliably transmitted between browsers.
      The view is automatically updated as new facts
      arrive, even from other users.
    </p>
    <Link className="cta" style={{ border: 'none' }} to={'/examples/intro/overview'}>
      <div className="button-container">Try it in your browser</div>
    </Link>
    <StaticQuery
      query={graphql`
        query IndexQuery {
          content: markdownRemark(fields: { slug: { eq: "/posts/quick-example/" } }) {
            html
          }
        }
      `}
      render={({ content }) => (
        <div
          className="page-content"
          dangerouslySetInnerHTML={{ __html: content.html }} />
      )}>
    </StaticQuery>
  </Layout>
)

export default IndexPage
