import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetLoginState } from 'redux/modules/account';
import SendCodeForm from './SendCodeForm';
import VerifyCodeForm from './VerifyCodeForm';

class TwoFactor extends Component {
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
    return (<div />);
  }
}

export default connect(
  (state) => ({ account: state.account }),
  { resetLoginState }
)(TwoFactor);
