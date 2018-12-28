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

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
  
    (await loadDocumentPages(graphql)).forEach(page => createPage(page));
    (await loadExamplePages(graphql)).forEach(page => createPage(page));
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        plugins: [
            new MonacoWebpackPlugin()
        ]
    });
};

async function loadDocumentPages(graphql) {
    const doumentTemplate = path.resolve("src/templates/documentTemplate.js");
    const result = await graphql(`
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
    `);
    if (result.errors) {
        throw result.errors;
    }
    return result.data.allMarkdownRemark.edges.map(edge => ({
        path: edge.node.fields.slug,
        component: doumentTemplate,
        context: {
            slug: edge.node.fields.slug
        }
    }));
}

async function loadExamplePages(graphql) {
    const exampleTemplate = path.resolve("src/templates/example.js");
    const result = await graphql(`
        {
            allFile(filter: {sourceInstanceName: {eq: "examples"}}) {
                edges {
                    node {
                        relativePath
                    }
                }
            }
        }
    `);
    if (result.errors) {
        throw result.errors;
    }
    return result.data.allFile.edges.map(edge => ({
        path: `examples/${edge.node.relativePath}`,
        component: exampleTemplate,
        context: {
            slug: edge.node.relativePath
        }
    }));
}