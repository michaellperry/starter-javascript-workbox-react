module.exports = {
  siteMetadata: {
    title: `Jinaga`,
    description: `Resilient, reliable, and connected web applications.`,
    author: `Michael L Perry`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/jinaga-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `examples`,
        path: `${__dirname}/src/examples/`,
        ignore: [
          `**/*\.json`
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `jinaga`,
        path: `${__dirname}/node_modules/jinaga/dist/types/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          `gatsby-remark-graphviz`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true
            }
          },
          `gatsby-remark-copy-linked-files`
        ]
      }
    },
    {
      resolve: `gatsby-transformer-code`,
      options: {
        name: `jinaga`,
        extensions: [ 'ts' ]
      }
    },
    {
      resolve: `gatsby-transformer-code`,
      options: {
        name: `examples`,
        extensions: [ 'ts' ]
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-389401-11",
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
}
