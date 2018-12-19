import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import SEO from '../components/SEO'
import SiteHeader from '../components/Layout/Header'
import config from '../../data/SiteConfig'
import TableOfContents from '../components/Layout/TableOfContents'
import Link from 'gatsby-link'

function pathParent(path) {
  const index = path.lastIndexOf('/');
  return index < 0 ? '' : path.substring(0, index);
}

function pathFilename(path) {
  const index = path.lastIndexOf('/');
  return index < 0 ? '' : path.substring(index + 1);
}

function flatten(collection, selector) {
  if (collection.length === 0) {
      return [];
  }
  else {
      return collection.map(selector).reduce((a,b) => a.concat(b));
  }
}

function toTree({ edges }) {
  let filesByFolder = {};
  let foldersByParent = {};
  let root = null;
  edges.forEach(edge => {
    const path = edge.node.fileAbsolutePath;
    const filename = pathFilename(path);
    const folder = pathParent(path);
    const parent = pathParent(folder);

    let files = filesByFolder[folder] || [];
    files.push({
      slug: edge.node.fields.slug,
      title: edge.node.frontmatter.title,
      filename: filename
    });
    filesByFolder[folder] = files;

    let folders = foldersByParent[parent] || {};
    folders[folder] = true;
    foldersByParent[parent] = folders;

    if (root === null || root.length > parent.length) {
      root = parent;
    }
  });

  return getNodes(filesByFolder, foldersByParent, root);
}

function getNodes(filesByFolder, foldersByParent, folder) {
  const folders = Object.keys(foldersByParent[folder] || {});
  const folderChildren = flatten(folders, f => getNodes(filesByFolder, foldersByParent, f));
  
  let files = filesByFolder[folder] || [];
  if (files.length === 0) {
    return folderChildren;
  }

  files.sort((a, b) => a.filename > b.filename ? 1 : -1);
  const first = files[0];
  const rest = files.slice(1);
  const fileChildren = rest.map(f => ({
    slug: f.slug,
    title: f.title,
    filename: f.filename,
    children: []
  }));

  let children = fileChildren.concat(folderChildren);
  children.sort((a,b) => a.filename > b.filename ? 1 : -1);
  return [{
    slug: first.slug,
    title: first.title,
    filename: pathFilename(folder),
    children: children
  }];
}

function findNode(nodes, predicate) {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (predicate(node)) {
      return node;
    }
    const child = findNode(node.children, predicate);
    if (child) {
      return child;
    }
  }
  return null;
}

function findAncestors(nodes, predicate) {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (predicate(node)) {
      return [];
    }
    const ancestors = findAncestors(node.children, predicate);
    if (ancestors) {
      return [node].concat(ancestors);
    }
  }
  return null;
}

function Breadcrumb({ nodes, slug }) {
  const ancestors = findAncestors(nodes, n => n.slug === slug);
  return ancestors && ancestors.length > 0 && (
    <BreadcrumbList>
      { ancestors.map((node, index) => (
      <BreadcrumbItem key={index}>
        <Link to={node.slug}>{node.title}</Link>
      </BreadcrumbItem>
      )) }
    </BreadcrumbList>
  )
}

const ChildLinks = ({ children }) => children.length > 0 && (
  <div>
    <h2>See also</h2>
    <StyledChapterList>
      {children.map((node, index) => (
        <ChapterListItem key={index}>
          <Link to={node.slug}>{node.title}</Link>
        </ChapterListItem>
      ))}
    </StyledChapterList>
  </div>
);


export default class LessonTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug
    if (!postNode) {
      return (
        <p>Failed to load lesson at {slug}.</p>
      );
    }
    const post = postNode.frontmatter
    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }
    const nodes = toTree(this.props.data.allPosts);
    const currentNode = findNode(nodes, x => x.slug === slug);
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader location={this.props.location} />
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents
              posts={nodes}
            />
          </ToCContainer>
          <BodyContainer>
            <div>
              { currentNode && <Breadcrumb nodes={nodes} slug={slug} /> }
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
              { currentNode && <ChildLinks children={currentNode.children} /> }
            </div>
          </BodyContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
  @media screen and (max-width: 600px) {
    order: 1;
  }
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${props => props.theme.lightGrey};
  overflow: scroll;
  @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
`

const StyledChapterList = styled.ol`
  list-style: none;
  margin: 0;
`

const ChapterListItem = styled.li`
  margin: 0;
`

const BreadcrumbList = styled.ol`
  list-style: none;
`

const BreadcrumbItem = styled.li`
  display: inline;
  &:after {
    content: "/";
    padding: 0px 8px;
  }
  &:last-child:after {
    content: "";
  }
`

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LessonBySlug($slug: String!) {
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
    }
    allPosts: allMarkdownRemark(filter: { frontmatter: { type: { eq: "book" } } }) {
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
