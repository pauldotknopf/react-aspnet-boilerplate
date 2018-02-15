import React, { Component } from 'react';
import { LoginForm } from 'components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { rehydrateLogin } from 'redux/modules/externalLogin';

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    // if the user logged in, redirect the user.
    if (!this.props.user && nextProps.user) {
      if (this.props.location.query.returnUrl) {
        this.props.pushState(this.props.location.query.returnUrl);
      } else {
        this.props.pushState('/');
      }
      return;
    }
    // if the user was externally authenticated, but wasn't registered,
    // redirect the user to the register.
    if (!this.props.externalLogin.externalAuthenticated && nextProps.externalLogin.externalAuthenticated) {
      if (nextProps.externalLogin.signInError) {
        // The user requires two-factor login or is locked out.
        // This means the user is already registered, so no need
        // to redirect to register page.
        return;
      }

      let registerUrl = '/register';
      if (this.props.location.query.returnUrl) {
        registerUrl += '?returnUrl=' + this.props.location.query.returnUrl;
      }
      this.props.pushState(registerUrl);
      // whenever we navigate to a new page, the external login info is cleared.
      // however, when we navigate to the register page, we want to this info
      // so that the register page can associte the external login to the new
      // account.
      // So, every the `pushState` call clears out `externalLogin`, we will
      // need to put it back in
      this.props.rehydrateLogin(nextProps.externalLogin);
      return;
    }
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <hr />
        <LoginForm />
        <p>
          <Link to="/register">Register as a new user?</Link>
        </p>
        <p>
          <Link to="/forgotpassword">Forgot your password?</Link>
        </p>
      </div>
    );
  }
}

export default connect(
state => ({ user: state.auth.user, externalLogin: state.externalLogin }),
{ pushState: push, rehydrateLogin }
)(Login);
