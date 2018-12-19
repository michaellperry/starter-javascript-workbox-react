import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

/* eslint react/no-array-index-key: "off" */

const ChapterList = ({ posts, level }) => (
  <StyledChapterList>
    {posts.map((post, index) => (
      <ChapterListItem key={index}>
        <Link to={post.slug}><ChapterTitle level={level}>{post.title}</ChapterTitle></Link>
        <ChapterList posts={post.children} level={level+1} />
      </ChapterListItem>
    ))}
  </StyledChapterList>
);

const TableOfContents = ({ posts }) => (
  <TOCWrapper>
    <ChapterList posts={posts} level={0} />
  </TOCWrapper>
);

export default TableOfContents

const TOCWrapper = styled.div`
  padding: ${props => props.theme.sitePadding};
  margin: 0;
`

const StyledChapterList = styled.ol`
  list-style: none;
  margin: 0;
`

const ChapterListItem = styled.li`
  margin: 0;
`

const ChapterTitle = styled.h5`
  font-weight: ${({ level }) => {
    switch (level % 3) {
      case 1:
        return '600'
      case 2:
        return '400'
      default:
        return '200'
    }
  }};
  font-size: ${({ level }) => {
    switch (level % 3) {
      case 1:
        return '2.2rem'
      case 2:
        return '1.8rem'
      default:
        return '2.8rem'
    }
  }};
  color: ${({ level, theme }) => {
    switch (level % 3) {
      case 1:
        return 'black'
      case 2:
        return theme.accent
      default:
        return theme.brand
    }
  }};
`
