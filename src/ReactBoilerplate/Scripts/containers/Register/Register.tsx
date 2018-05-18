import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { RegisterForm } from '../../components';
import { RootState } from '../../redux/reducer';
import { User } from '../../redux/modules/account';

export interface RegisterProps {
  user?: User;
  pushState: (page: string) => any;
}

class Register extends React.Component<RegisterProps> {
  public componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState('/');
    }
  }
  public render() {
    return (
      <div>
        <h2>Register</h2>
        <h4>Create a new account.</h4>
        <hr />
        <RegisterForm />
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({ user: state.auth.user, externalLogin: state.externalLogin }),
  { pushState: push }
)(Register);
