module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  lessonsDir: "lessons", // The name of the directory that contains lessons or docs.
  siteTitle: "Jinaga", // Site title.
  siteTitleAlt: "Jinaga JavaScript Data Synchronization Framework", // Alternative site title for SEO.
  siteLogo: "/logos/logo-400.png", // Logo used for SEO and manifest.
  siteUrl: "https://jinaga.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Resilient, reliable, and connected web applications.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "MichaelLPerry", // Username to display in the author segment.
  userTwitter: "michaellperry", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Allen, TX", // User location to display in the author segment.
  userAvatar: "http://qedcode.com/sites/default/files/Avatar_Small.jpg", // User avatar to display in the author segment.
  userDescription: "Software Mathematician", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/michaellperry/jinaga",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/michaellperry",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:michael@qedcode.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2018. Michael L Perry", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#00A0DE", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
  // TODO: Move this literally anywhere better.
  toCChapters: ["", "Chapter 1", "Chapter 2"] // Used to generate the Table Of Contents. Index 0 should be blank.
};
