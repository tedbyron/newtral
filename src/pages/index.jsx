import React from 'react';
import Layout from '../components/layout';

const IndexPage = () => (
  <Layout>
    <section className="section">
      <div className="container has-text-centered">
        <h1 className="title is-1">Newtral</h1>

        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="placeholder" />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>Article Title</strong>
                {' '}
                <small>Author</small>
                {' - '}
                <small>31m ago</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            {/* <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small"><i className="fas fa-reply" /></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fas fa-retweet" /></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fas fa-heart" /></span>
                </a>
              </div>
            </nav> */}
          </div>
          <div className="media-right">
            <button type="button" className="delete" aria-label="close" />
          </div>
        </article>
      </div>
    </section>
  </Layout>
);

export default IndexPage;
