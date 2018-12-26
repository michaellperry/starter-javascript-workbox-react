/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`);
const MonacoWebpackPlugin = require(`monaco-editor-webpack-plugin`);
const path = require(`path`);

function pathParent(path) {
    const index = path.lastIndexOf('/', path.length - 2);
    return index < 0 ? '' : path.substring(0, index + 1);
}

function pathFilename(path) {
    const index = path.lastIndexOf('/', path.length - 2);
    return index < 0 ? '' : path.substring(index + 1);
}

function pathToSlug(filePath) {
    const regex = /[/][0-9]+-([^/]+)/g;
    const withoutOrdinals = filePath.replace(regex, '/$1');
    const lastSegment = pathFilename(withoutOrdinals);
    const folder = pathParent(withoutOrdinals);
    const secondLastSegment = pathFilename(folder);
    return lastSegment === secondLastSegment ? folder : withoutOrdinals;
}

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const filePath = createFilePath({ node, getNode, basePath: `pages` });
        const slug = pathToSlug(filePath);
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

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === 'develop' || stage === 'develop-html') {
        actions.setWebpackConfig({
            plugins: [
                new MonacoWebpackPlugin()
            ]
        });
    }
    else {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /monaco-editor/,
                        use: [
                            loaders.null()
                        ]
                    }
                ]
            }
        })
    }
};