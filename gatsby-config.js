const path = require('path');

module.exports = {
  siteMetadata: {
    defaultTitle: 'Newtral',
    defaultAuthor: 'Teddy Byron',
    defaultDescription: 'A news aggregator that tries to be neutral.',
    siteUrl: 'https://newtral.netlify.app',
    referrer: 'no-referrer-when-downgrade',
    colorScheme: 'only light',
  },
  plugins: [
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://newtral.netlify.app',
        stripQueryString: true,
      },
    },
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'newtral.netlify.com',
        short_name: 'newtral.netlify.com',
        description: 'A news aggregator that tries to be neutral.',
        lang: 'en',
        display: 'minimal-ui',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#b86bff', // TODO: theme color
        // TODO: icon: 'src/images/icon.png',
        include_favicon: false,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        whitelist: [
          '___gatsby',
          'gatsby-focus-wrapper',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.resolve(__dirname, 'src', 'data'),
      },
    },
    'gatsby-plugin-offline',
  ],
};
