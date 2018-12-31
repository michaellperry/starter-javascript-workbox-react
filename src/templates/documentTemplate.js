import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Breadcrumb from "../outline/breadcrumb";
import ChildLinks from "../outline/childLinks";
import NextLink from "../outline/next-link";
import TableOfContents from "../outline/tableOfContents";
import { findNode, mapNodes, toTree } from "../outline/tree";

export default function Template({ data }) {
  const { document, documents } = data;
  const { fields, frontmatter, html } = document;
  const { slug } = fields;
  const chapters = toTree(documents, "/documents/");
  const currentDocument = findDocumentBySlug(chapters, slug);
  return (
    <Layout className="document-container">
      <SEO title={document.frontmatter.title} keywords={[`jinaga`, `node`, `typescript`, `javascript`]} />
      <div className="sidebar">
        <TableOfContents className="toc" chapters={chapters} />
      </div>
      <div className="document-content">
        <Breadcrumb className="breadcrumb" chapters={chapters} slug={slug} />
        <h1>{frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
        { currentDocument.children.length > 0 ? (
          <>
            <h2>See Also</h2>
            <ChildLinks className="child-links" children={currentDocument.children} />
          </>
        ) : (
          <>
            <h2>Continue With</h2>
            <p><NextLink chapters={chapters} slug={slug} /></p>
          </>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    document: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    documents: allMarkdownRemark(filter: { 
      fields: { slug: { glob: "/documents/**" }}
    }) {
      edges {
        node {
          fileAbsolutePath
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

function findDocumentBySlug(chapters, slug) {
  const document = findNode(chapters, x => x.slug === slug);
  if (!document) {
    const allSlugs = chapters.length === 0 ? 'none' : mapNodes(chapters, x => x.slug).join(',');
    throw new Error(`Could not find document for slug ${slug}. Available slugs: ${allSlugs}`);
  }
  return document;
}