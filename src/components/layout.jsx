import React from 'react';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Footer from './footer';
import Head from './head';
import Header from './header';

import '../styles/global.scss';

// add icons to library for easier access in other components
library.add(faGithub);

const Layout = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a11yIsFocused: false,
    };

    // create a ref for the main element
    this.main = React.createRef();
  }

  /**
   * toggle a11y menu visibility on focus or blur
   */
  handleA11yFocus = () => {
    this.setState((state) => ({
      a11yIsFocused: !state.a11yIsFocused,
    }));
  }

  /**
   * focus the main element through its this.main ref
   */
  handleSkipClick = () => {
    this.main.current.focus();
  }

  render() {
    const {
      title,
      author,
      description,
      pathname,
      children,
    } = this.props;
    const { a11yIsFocused } = this.state;

    return (
      <>
        <Head
          title={title}
          author={author}
          description={description}
          pathname={pathname}
        />

        <div className={`notification buttons is-centered is-marginless${a11yIsFocused ? '' : ' is-sr-only'}`} onFocus={this.handleA11yFocus} onBlur={this.handleA11yFocus}>
          <button type="button" className="button is-marginless" onClick={this.handleSkipClick}>
            Skip to main content
          </button>
        </div>

        <Header />
        <main ref={this.main} role="main" tabIndex="-1">
          {children}
        </main>
        <Footer />
      </>
    );
  }
};

export default Layout;

Layout.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  title: null,
  author: null,
  description: null,
  pathname: null,
};
