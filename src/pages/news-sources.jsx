import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const NewsSourcesPage = () => {
  // parse the raw json data from the sources file into a js object
  const { allSourcesJson } = useStaticQuery(graphql`
    query NewsSourcesQuery {
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
    <Layout
      title="News Sources"
      description="Newtral's news sources with their bias and reliability scores."
      pathname="news-sources"
    >
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title">News Sources</h1>
          <h2 className="subtitle">Newtral&apos;s news sources with their bias and reliability scores.</h2>
        </div>

        <div className="container">
          <table className="table is-bordered is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Source</th>
                <th>Bias</th>
                <th>Reliability</th>
              </tr>
            </thead>
            <tbody>
              {allSourcesJson.nodes.map((node) => (
                <tr key={node.id}>
                  <td>{node.source}</td>
                  <td>{node.bias}</td>
                  <td className={node.reliability <= 20 ? 'has-background-danger' : ''}>{node.reliability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default NewsSourcesPage;
