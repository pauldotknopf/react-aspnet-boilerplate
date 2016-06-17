import React, { Component } from 'react';
import { ForgotPasswordForm } from 'components';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <h2>Forgot your password?</h2>
        <h4>Enter your email.</h4>
        <hr />
        <ForgotPasswordForm />
      </div>
    );
  }
}

export default connect(
state => ({ user: state.auth.user }),
{ }
)(ForgotPassword);
