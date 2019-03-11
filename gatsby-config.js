module.exports = {
  siteMetadata: {
    title: "Gatsby Starter - Ceevee",
    author: "Aman Mittal",
    description: "A Gatsby.js Starter based on Ceevee by Styleshout",
    galleryInfo: [
      {
        title: 'CLIMB!',
        description: 'Personal Computer'
      },
      {
        title: 'One Day',
        description: 'Mobile Android/IOS'
      },
      {
        title: 'Puzzle Defenders',
        description: 'Web/HTML5 Canvas'
      }
    ]
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/portfolio`
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`librebaskerville`, `open sans`]
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`
  ],
  mapping: {

  }
};
