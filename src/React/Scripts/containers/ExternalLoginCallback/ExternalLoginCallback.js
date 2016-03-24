import React, { Component } from 'react';
import { ExternalLoginRegisterForm } from 'components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class ExternalLoginCallback extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      if (this.props.location.query.returnUrl) {
        this.props.pushState(this.props.location.query.returnUrl);
      } else {
        this.props.pushState('/');
      }
    }
  }
  render() {
    return (
      <div>
        <h2>Register</h2>
        <h3>Associate your account.</h3>
        <h4>Association Form</h4>
        <hr />
        <p className="text-info">
          {"You've successfully authenticated your account."}
          {"Please enter a user name for this site below and click the Register button to finish logging in."}
        </p>
        <ExternalLoginRegisterForm />
      </div>
    );
  }
}

export default connect(
state => ({ user: state.auth.user }),
{ pushState: push }
)(ExternalLoginCallback);
