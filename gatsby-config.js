module.exports = {
  siteMetadata: {
    title: "Brent Arata - Software Engineer",
    author: "Brent Arata",
    description: "A Gatsby.js Creation",
    galleryInfo: [
      {
        title: 'CLIMB!',
        description: 'PC - Windows'
      },
      {
        title: 'One Day',
        description: 'Mobile - Android/IOS'
      },
      {
        title: 'Puzzle Defenders',
        description: 'Web - HTML5 Canvas'
      },
      {
        title: 'Sh*tty Elephants In Space',
        description: 'PC - Windows'
      }
    ]
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/assets/favicon/favicon.png",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: 'auto',
        lang: 'en-US',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
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
