import React, { Component } from 'react';
import { ChangePasswordForm } from 'components';
import { connect } from 'react-redux';

class ChangePassword extends Component {
  render() {
    return (
      <div>
        <h2>Change Password.</h2>
        <h4>Change Password Form</h4>
        <hr />
        <ChangePasswordForm />
      </div>
    );
  }
}

export default connect(
state => ({ user: state.auth.user }),
{ }
)(ChangePassword);
