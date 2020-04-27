import React, { Suspense } from 'react';
import Layout from '../components/layout';

const Stage = React.lazy(() => import('../components/stage'));

const IndexPage = () => (
  <Layout>
    <section className="section section-stage" id="section-stage">
      { typeof document !== 'undefined' && (
        <Suspense
          fallback={(
            <div className="container has-text-centered">
              <span>Loading...</span>
            </div>
          )}
        >
          <Stage className="stage" />
        </Suspense>
      )}
    </section>
  </Layout>
);

export default IndexPage;
