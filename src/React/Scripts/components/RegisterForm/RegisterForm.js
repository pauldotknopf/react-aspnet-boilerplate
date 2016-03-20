import React from 'react';
import Form, { handleApiSubmit } from 'components/Form';
import { reduxForm } from 'redux-form';
import { register } from 'redux/modules/account';
import { Input } from 'components';

class RegisterForm extends Form {
  render() {
    const {
      fields: { userName, email, password, passwordConfirm },
      handleSubmit,
      error
    } = this.props;
    return (
      <form onSubmit={handleSubmit(handleApiSubmit(register))} className="form-horizontal">
        {this.renderGlobalErrorList(error)}
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
    );
  }
}

RegisterForm = reduxForm({
  form: 'register',
  fields: ['userName', 'email', 'password', 'passwordConfirm']
},
(state) => state,
{ register }
)(RegisterForm);

export default RegisterForm;
