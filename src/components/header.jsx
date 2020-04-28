import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Icon from '../images/icon.svg';

const Header = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navIsActive: false,
      navClass: '',
      homeHover: false,
    };
  }

  /**
   * toggle navigation state on burger click
   */
  onBurgerClick = () => {
    this.setState((state) => ({
      navIsActive: !state.navIsActive,
      navClass: state.navIsActive ? '' : ' is-active',
    }));
  }

  onHomeHover = () => {
    this.setState({
      homeHover: true,
    });
  }

  onHomeDehover = () => {
    this.setState({
      homeHover: false,
    });
  }

  render() {
    const { navIsActive, navClass, homeHover } = this.state;

    return (
      <header id="header">
        <nav
          className="navbar is-spaced has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link
                to="/"
                className="navbar-item"
                onMouseEnter={this.onHomeHover}
                onMouseLeave={this.onHomeDehover}
              >
                <Icon className={`icon icon-newtral${homeHover ? ' icon-newtral-hover' : ''}`} />
                <span>&nbsp;Newtral</span>
              </Link>

              <a
                href="https://github.com/tedbyron/newtral"
                className="navbar-item is-hidden-tablet"
                aria-label="GitHub"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={['fab', 'github']} />
                </span>
              </a>

              <button
                type="button"
                className={`navbar-burger burger${navClass}`}
                aria-label="menu"
                aria-expanded={navIsActive}
                data-target="navbarMenu"
                onClick={this.onBurgerClick}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>

            <div id="navbarMenu" className={`navbar-menu${navClass}`}>
              <div className="navbar-start">
                <Link
                  to="/news-sources"
                  className="navbar-item"
                  activeClassName="is-active"
                >
                  News Sources
                </Link>
              </div>

              <div className="navbar-end is-hidden-mobile">
                <div className="field is-grouped">
                  <a
                    href="https://github.com/tedbyron/newtral"
                    className="navbar-item"
                    aria-label="GitHub"
                  >
                    <span className="icon is-medium">
                      <FontAwesomeIcon icon={['fab', 'github']} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
};

export default Header;
