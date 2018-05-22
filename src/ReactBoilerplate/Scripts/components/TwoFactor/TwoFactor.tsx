import * as React from 'react';
import { connect } from 'react-redux';
import { resetLoginState, State as AccountState } from '../../redux/modules/account';
import SendCodeForm from './SendCodeForm';
import VerifyCodeForm from './VerifyCodeForm';
import { RootState } from '../../redux/reducer';

export interface TwoFactorProps {
  account: AccountState;
  resetLoginState: () => any;
}

class TwoFactor extends React.Component<TwoFactorProps> {
  public componentWillUnmount() {
    this.props.resetLoginState();
  }
  public render() {
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
  (state: RootState) => ({ account: state.account }),
  { resetLoginState }
)(TwoFactor);
