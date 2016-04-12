import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Manage extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    return (
      <Row style={{ marginTop: 20 }}>
        <Col xs={12} md={4}>
          <Nav bsStyle="pills" stacked>
            <LinkContainer to="/manage/security">
              <NavItem>Security</NavItem>
            </LinkContainer>
            <LinkContainer to="/manage/email">
              <NavItem>Email</NavItem>
            </LinkContainer>
            <LinkContainer to="/manage/changepassword">
              <NavItem>Change password</NavItem>
            </LinkContainer>
            <LinkContainer to="/manage/logins">
              <NavItem>Manage logins</NavItem>
            </LinkContainer>
          </Nav>
        </Col>
        <Col xs={12} md={8}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default connect(
state => ({ user: state.auth.user }),
{ }
)(Manage);
