import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../LoginForm/LoginForm';
import SendCodeForm from '../SendCodeForm/SendCodeForm';
import VerifyCodeForm from '../VerifyCodeForm/VerifyCodeForm';
import { resetLoginState } from 'redux/modules/account';

class LoginFlow extends Component {
  componentWillUnmount() {
    this.props.resetLoginState();
  }
  render() {
    const {
      account: { requiresTwoFactor, userFactors, sentCode }
    } = this.props;
    if (sentCode) {
      return (
        <VerifyCodeForm />
      );
    }
    if (requiresTwoFactor) {
      return (
        <SendCodeForm userFactors={userFactors} />
      );
    }
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default connect(
  (state) => ({ account: state.account }),
  { resetLoginState }
)(LoginFlow);
