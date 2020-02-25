import React from 'react';
import Layout from '../components/layout';

const NotFoundPage = () => (
  <Layout
    title="404"
    description="404 not found."
    pathname="404"
  >
    <section className="section">
      <div className="container has-text-centered">
        <h1 className="title is-1">404</h1>
        <h2 className="subtitle">
          {'That route doesn\'t exist... '}
          <span role="img" aria-label="frowning face with open mouth emoji">😦</span>
        </h2>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
