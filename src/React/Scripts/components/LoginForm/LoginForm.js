import React from 'react';
import Form, { handleApiSubmit } from 'components/Form';
import { reduxForm } from 'redux-form';
import { login } from 'redux/modules/account';
import { Input } from 'components';

class LoginForm extends Form {
  render() {
    const {
      fields: { userName, password },
      handleSubmit,
      error
    } = this.props;
    return (
      <form onSubmit={handleSubmit(handleApiSubmit(login))} className="form-horizontal">
        {this.renderGlobalErrorList(error)}
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
{ }
)(LoginForm);

export default LoginForm;
