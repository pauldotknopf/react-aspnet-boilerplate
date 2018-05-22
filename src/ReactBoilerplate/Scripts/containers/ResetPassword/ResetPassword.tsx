import * as React from 'react';
import { connect } from 'react-redux';
import { ResetPasswordForm } from '../../components';
import { RootState } from '../../redux/reducer';

class ResetPassword extends React.Component {
  public render() {
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
  (state: RootState) => ({ user: state.auth.user }),
  { }
)(ResetPassword);
