import React, { Component } from 'react';
import { LoginForm, ExternalLogin } from 'components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import { rehydrateLogin } from 'redux/modules/externalLogin';

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    // if the user logged in, redirect the user.
    if (!this.props.user && nextProps.user) {
      if (this.props.location.query.returnUrl) {
        this.props.pushState(this.props.location.query.returnUrl);
      } else {
        this.props.pushState('/');
      }
      return;
    }
    // if the user was externally authenticated, but wasn't registered,
    // redirect the user to the register.
    if (!this.props.externalLogin.externalAuthenticated && nextProps.externalLogin.externalAuthenticated) {
      let registerUrl = '/register';
      if (this.props.location.query.returnUrl) {
        registerUrl += '?returnUrl=' + this.props.location.query.returnUrl;
      }
      this.props.pushState(registerUrl);
      // whenever we navigate to a new page, the external login info is cleared.
      // however, when we navigate to the register page, we want to this info
      // so that the register page can associte the external login to the new
      // account.
      // So, every the `pushState` call clears out `externalLogin`, we will
      // need to put it back in
      this.props.rehydrateLogin(nextProps.externalLogin);
      return;
    }
  }
  render() {
    return (
      <Row>
        <Col md={8}>
          <h2>Login</h2>
          <h4>Use a local account to log in.</h4>
          <hr />
          <LoginForm />
          <p>
            <Link to="/register">Register as a new user?</Link>
          </p>
          <p>
            <Link to="/forgotpassword">Forgot your password?</Link>
          </p>
        </Col>
        <Col md={4}>
          <h4>Use another service to log in.</h4>
          <ExternalLogin leadingText="Login with" />
        </Col>
      </Row>
    );
  }
}

export default connect(
state => ({ user: state.auth.user, externalLogin: state.externalLogin }),
{ pushState: push, rehydrateLogin }
)(Login);
