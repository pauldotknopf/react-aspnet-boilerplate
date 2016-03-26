import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

class Manage extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    return (
      <Row style={{ marginTop: 20 }}>
        <Col xs={12} md={4}>
          <Nav bsStyle="pills" stacked>
            <IndexLinkContainer to="/manage/changepassword">
              <NavItem>Change password</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/manage/logins">
              <NavItem>Manage logins</NavItem>
            </IndexLinkContainer>
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
