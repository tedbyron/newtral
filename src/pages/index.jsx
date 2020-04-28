import React, { Suspense } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const Stage = React.lazy(() => import('../components/stage'));

const IndexPage = () => {
  // parse the raw json data from the articles and sources files into js objects
  const {
    allArticlesJson,
    allSourcesJson,
  } = useStaticQuery(graphql`
    query IndexQuery {
      allArticlesJson {
        nodes {
          author
          date
          headline
          id
          link
          source
          thumbnail
          topic
        }
      }
      allSourcesJson {
        nodes {
          bias
          id
          source
          reliability
        }
      }
    }
  `);

  return (
    <Layout>
      <section
        className="section section-stage"
        id="section-stage"
      >
        { typeof document !== 'undefined' && (
        <Suspense
          fallback={(
            <div className="container has-text-centered">
              <span>Loading...</span>
            </div>
          )}
        >
          <Stage
            articles={allArticlesJson.nodes}
            sources={allSourcesJson.nodes}
          />
        </Suspense>
        )}
      </section>
    </Layout>
  );
};

export default IndexPage;
