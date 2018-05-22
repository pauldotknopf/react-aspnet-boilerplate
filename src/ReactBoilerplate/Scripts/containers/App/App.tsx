import * as React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { push } from 'react-router-redux';
import * as Navbar from 'react-bootstrap/lib/Navbar';
import * as Nav from 'react-bootstrap/lib/Nav';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import config from '../../config';
import { logoff, User } from '../../redux/modules/account';
import TwoFactorModal from './Modals/TwoFactorModal';
import { RootState } from '../../redux/reducer';
import Routes from '../../routes';

require('./App.scss');

export interface AppProps {
  logoff: () => any;
  pushState: (page: string) => any;
  user?: User;
}

class App extends React.Component<AppProps> {
  public constructor(props: AppProps) {
    super(props);
    this.logoffClick = this.logoffClick.bind(this);
  }
  public logoffClick() {
    this.props.logoff();
    this.props.pushState('/');
  }
  private renderLoggedInLinks(user: User) {
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
  private renderAnonymousLinks() {
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
  public render() {
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
          <Routes />
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
  (state: RootState) => ({ user: state.auth.user, routing: state.routing }),
  { logoff, pushState: push }
)(App);
