import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';


const YourFirstPwaPage = () => (
  <Layout className="body-container">
    <SEO title="Your First PWA" keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
    <StaticQuery
      query={graphql`
        query YourFirstPwaQuery {
          content: markdownRemark(fields: { slug: { eq: "/posts/yourfirstpwa/" } }) {
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

export default YourFirstPwaPage
