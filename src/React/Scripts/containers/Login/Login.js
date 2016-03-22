import React, { Component } from 'react';
import { LoginForm } from 'components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

class Login extends Component {
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
        <h2>Login</h2>
        <h4>Use a local account to log in.</h4>
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
state => ({ user: state.auth.user }),
{ pushState: push }
)(Login);
