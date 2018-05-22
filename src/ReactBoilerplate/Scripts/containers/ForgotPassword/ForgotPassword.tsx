import * as React from 'react';
import { connect } from 'react-redux';
import { ForgotPasswordForm } from '../../components';
import { RootState } from '../../redux/reducer';

class ForgotPassword extends React.Component {
  public render() {
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
  (state: RootState) => ({ user: state.auth.user }),
  { }
)(ForgotPassword);
