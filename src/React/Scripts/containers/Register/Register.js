import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { register } from '../../redux/modules/account';
import Input from '../../components/Input';
import { Glyphicon } from 'react-bootstrap';
import { push } from 'react-router-redux';

const submit = (values, dispatch) => {
  dispatch(register(values));
};

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }
  renderErrorList(error) {
    if (!error) {
      return null;
    }
    if (!error.errors) {
      return null;
    }
    return (
      <div className="alert alert-danger">
        {error.errors.map((err, i) =>
          (
            <p key={i}>
              <Glyphicon glyph="exclamation-sign" />
              {' '}
              {err}
            </p>
          )
        )}
      </div>
    );
  }
  render() {
    const {
      fields: { userName, email, password, passwordConfirm },
      handleSubmit,
      error
    } = this.props;
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(submit)} className="form-horizontal">
          <h4>Create a new account.</h4>
          <hr />
          {this.renderErrorList(error)}
          <Input field={userName} label="User name" />
          <Input field={email} label="Email" />
          <Input field={password} label="Password" />
          <Input field={passwordConfirm} label="Confirm" />
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-default">Register</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

Register = reduxForm({
  form: 'register',
  fields: ['userName', 'email', 'password', 'passwordConfirm']
},
mapStateToProps,
{ register, pushState: push }
)(Register);

export default Register;
