import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../../data/SiteConfig'
import MainHeader from '../components/Layout/Header'

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
`

class AboutPage extends React.Component {
  render() {
    const html = this.props.data.content.html;

    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <main>
          <MainHeader
            siteTitle={config.siteTitle}
            siteDescription={config.siteDescription}
            location={this.props.location}
            logo={config.siteLogo}
          />
          <BodyContainer>
            <div
              className="page-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </BodyContainer>
        </main>
      </div>
    )
  }
}

export default AboutPage


export const pageQuery = graphql`
  query AboutQuery {
    content: markdownRemark(frontmatter: {title: {eq: "About Page"}}) {
      html
    }
  }
`