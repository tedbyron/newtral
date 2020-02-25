import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navIsActive: false,
      navClass: '',
    };
  }

  /**
   * toggle navigation state on burger click
   */
  handleBurgerClick = () => {
    this.setState((state) => ({
      navIsActive: !state.navIsActive,
      navClass: state.navIsActive ? '' : ' is-active',
    }));
  }

  render() {
    const { navIsActive, navClass } = this.state;

    return (
      <header>
        <nav className="navbar is-spaced has-shadow" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Newtral
              </Link>

              <a href="https://github.com/tedbyron/newtral" className="navbar-item is-hidden-tablet" aria-label="GitHub">
                <span className="icon">
                  <FontAwesomeIcon icon={['fab', 'github']} />
                </span>
              </a>

              <button type="button" className={`navbar-burger burger${navClass}`} aria-label="menu" aria-expanded={navIsActive} data-target="navbarMenu" onClick={this.handleBurgerClick}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>

            <div id="navbarMenu" className={`navbar-menu${navClass}`}>
              {/* <div className="navbar-start">
                <Link to="/404" className="navbar-item" activeClassName="is-active">Link</Link>
              </div> */}

              <div className="navbar-end is-hidden-mobile">
                <div className="field is-grouped">
                  <a href="https://github.com/tedbyron/newtral" className="navbar-item" aria-label="GitHub">
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