import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from '../../config';
import { IndexLink } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { logoff } from '../../redux/modules/account';
import { push } from 'react-router-redux';
import TwoFactorModal from './Modals/TwoFactorModal';

require('./App.scss');

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
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
              <IndexLink to="/">
                {config.app.title}
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav navbar>
              <IndexLinkContainer to="/">
                <NavItem>Home</NavItem>
              </IndexLinkContainer>
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
            <p>&copy; 2016 - {config.app.title}</p>
          </footer>
        </div>
        <TwoFactorModal />
      </div>
    );
  }
}

export default connect(
state => ({ user: state.auth.user }),
{ logoff, pushState: push }
)(App);
