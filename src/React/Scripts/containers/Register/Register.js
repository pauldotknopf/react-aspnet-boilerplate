import React, { Component } from 'react';
import { RegisterForm } from 'components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState('/');
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
