import React, { Component } from 'react';
import { ResetPasswordForm } from 'components';
import { connect } from 'react-redux';

class ResetPassword extends Component {
  render() {
    return (
      <div>
        <h2>Reset password</h2>
        <h4>Reset your password.</h4>
        <hr />
        <ResetPasswordForm />
      </div>
    );
  }
}

export default connect(
state => ({ user: state.auth.user }),
{ }
)(ResetPassword);
