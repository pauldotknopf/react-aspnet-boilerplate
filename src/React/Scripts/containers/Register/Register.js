import React, { Component } from 'react';
import { RegisterForm, ExternalLogin } from 'components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col } from 'react-bootstrap';

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState('/');
    }
  }
  render() {
    const {
      externalLogin: { externalAuthenticated }
    } = this.props;
    return (
      <Row>
        <Col md={8}>
          <h2>Register</h2>
          <h4>Create a new account.</h4>
          <hr />
          <RegisterForm />
        </Col>
        {!externalAuthenticated &&
          <Col md={4}>
            <h4>Use another service to register.</h4>
            <ExternalLogin leadingText="Register with" />
          </Col>
        }
      </Row>
    );
  }
}

export default connect(
state => ({ user: state.auth.user, externalLogin: state.externalLogin }),
{ pushState: push }
)(Register);
