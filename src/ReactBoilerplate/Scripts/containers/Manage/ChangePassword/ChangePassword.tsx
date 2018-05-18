import * as React from 'react';
import { connect } from 'react-redux';
import { ChangePasswordForm } from '../../../components';
import { RootState } from '../../../redux/reducer';

class ChangePassword extends React.Component {
  public render() {
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
  (state: RootState) => ({ user: state.auth.user }),
  { }
)(ChangePassword);
