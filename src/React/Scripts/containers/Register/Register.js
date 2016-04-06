import React, { Component } from 'react';
import { RegisterForm } from 'components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState('/');
    }
    if (!this.props.externalLogin.externalAuthenticated && nextProps.externalLogin.externalAuthenticated) {
      if (nextProps.externalLogin.signInError) {
        // The user requires two-factor login or is locked out.
        // This means the user is already registered, so we need
        // to redirect the user to the login page so that they can
        // complete two-factor login or be displayed with a lockout
        // message
        this.props.pushState('/login');
        return;
      }
    }
  }
  render() {
    return (
      <div>
        <h2>Register</h2>
        <h4>Create a new account.</h4>
        <hr />
        <RegisterForm />
      </div>
    );
  }
}

export default connect(
state => ({ user: state.auth.user, externalLogin: state.externalLogin }),
{ pushState: push }
)(Register);
