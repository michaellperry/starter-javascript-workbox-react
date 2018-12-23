/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
  
    return new Promise((resolve, reject) => {
        const lessonPage = path.resolve("src/templates/documentTemplate.js");
        resolve(
            graphql(
            `
                {
                    allMarkdownRemark(filter: { 
                        fields: { slug: { glob: "/documents/**" }}
                      }) {
                        edges {
                            node {
                                frontmatter {
                                    title
                                }
                                fields {
                                    slug
                                }
                            }
                        }
                    }
                }
            `
            ).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }

                result.data.allMarkdownRemark.edges.forEach(edge => {
                    createPage({
                        path: edge.node.fields.slug,
                        component: lessonPage,
                        context: {
                            slug: edge.node.fields.slug
                        }
                    });
                });
            })
        );
    });
};
