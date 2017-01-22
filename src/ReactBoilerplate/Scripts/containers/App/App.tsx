import * as React from 'react';
import { connect } from 'react-redux';
var Helmet = require('react-helmet');
import config from '../../config';
import { IndexLink } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

require('./App.scss');

class App extends React.Component<any, any> {
  public static propTypes = {
    children: React.PropTypes.object.isRequired
  };

  public render() : JSX.Element {
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
              <LinkContainer to="/people">
                <NavItem>People</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container body-content">
          {this.props.children}
          <hr />
          <footer>
            <p>&copy; 2016 - {config.app.title}</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(state => state, {})(App);
