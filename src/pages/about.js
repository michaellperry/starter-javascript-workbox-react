import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';


const AboutPage = () => (
  <Layout className="body-container">
    <SEO title="About" keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
    <StaticQuery
      query={graphql`
        query AboutQuery {
          content: markdownRemark(fields: { slug: { eq: "/posts/about/" } }) {
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

export default AboutPage
