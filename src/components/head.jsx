import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const Head = ({
  title,
  author,
  description,
  pathname,
  meta,
}) => {
  const { site } = useStaticQuery(graphql`
    query HeadQuery {
      site {
        siteMetadata {
          defaultTitle
          defaultAuthor
          defaultDescription
          siteUrl
          referrer
          colorScheme
        }
      }
    }
  `);

  const data = {
    title: title ? `${site.siteMetadata.defaultTitle} | ${title}` : site.siteMetadata.defaultTitle,
    author: author || site.siteMetadata.defaultAuthor,
    description: description || site.siteMetadata.defaultDescription,
    url: pathname ? `${site.siteMetadata.siteUrl}/${pathname}` : site.siteMetadata.siteUrl,
    referrer: site.siteMetadata.referrer,
    colorScheme: site.siteMetadata.colorScheme,
  };

  return (
    <Helmet
      title={data.title}
      meta={[
        {
          name: 'author',
          content: data.author,
        },
        {
          name: 'description',
          content: data.description,
        },
        {
          name: 'url',
          content: data.url,
        },
        {
          name: 'referrer',
          content: data.referrer,
        },
        {
          name: 'color-scheme',
          content: data.colorScheme,
        },
        {
          name: 'og:title',
          content: data.title,
        },
        {
          name: 'og:description',
          content: data.description,
        },
        {
          name: 'og:url',
          content: data.url,
        },
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'og:locale',
          content: 'en_US',
        },
      ].concat(meta)}
    />
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
};

Head.defaultProps = {
  title: null,
  author: null,
  description: null,
  pathname: null,
  meta: [],
};
