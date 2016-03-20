import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../redux/modules/account';
import Input from '../Input';
import { Glyphicon } from 'react-bootstrap';

const submit = (values, dispatch) => {
  console.log(values);
  dispatch(login(values));
};

class LoginForm extends Component {
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
      fields: { userName, password },
      handleSubmit,
      error
    } = this.props;
    return (
      <form onSubmit={handleSubmit(submit)} className="form-horizontal">
        {this.renderErrorList(error)}
        <Input field={userName} label="User name" />
        <Input field={password} label="Password" />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Login</button>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['userName', 'password', 'rememberMe']
},
(state) => state,
{ login }
)(LoginForm);

export default LoginForm;
