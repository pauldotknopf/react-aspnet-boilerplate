import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Switch, Route, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { push } from 'react-router-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import config from '../../config';
import { logoff } from '../../redux/modules/account';
import TwoFactorModal from './Modals/TwoFactorModal';

require('./App.scss');

class App extends Component {
  constructor(props) {
    super(props);
    this.logoffClick = this.logoffClick.bind(this);
  }
  logoffClick() {
    this.props.logoff();
    this.props.pushState('/');
  }
  renderLoggedInLinks(user) {
    return (
      <Nav navbar pullRight>
        <LinkContainer to="/manage">
          <NavItem>Hello {user.userName}!</NavItem>
        </LinkContainer>
        <NavItem onSelect={this.logoffClick}>
          Log off
        </NavItem>
      </Nav>
    );
  }
  // eslint-disable-next-line class-methods-use-this
  renderAnonymousLinks() {
    return (
      <Nav navbar pullRight>
        <LinkContainer to="/register">
          <NavItem>Register</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
  render() {
    const {
      user
    } = this.props;
    let loginLinks;
    if (user) {
      loginLinks = this.renderLoggedInLinks(user);
    } else {
      loginLinks = this.renderAnonymousLinks();
    }
    return (
      <div>
        <Helmet {...config.app.head} />
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink exact to="/">
                {config.app.title}
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav navbar>
              <LinkContainer exact to="/">
                <NavItem>Home</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem>About</NavItem>
              </LinkContainer>
              <LinkContainer to="/contact">
                <NavItem>Contact</NavItem>
              </LinkContainer>
            </Nav>
            {loginLinks}
          </Navbar.Collapse>
        </Navbar>
        <div className="container body-content">
          {this.props.children}
          <hr />
          <footer>
            <p>&copy; 2018 - {config.app.title}</p>
          </footer>
        </div>
        <TwoFactorModal />
      </div>
    );
  }
}

export default connect(
  (state) => ({ user: state.auth.user, routing: state.routing }),
  { logoff, pushState: push }
)(App);
