import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { register } from 'redux/modules/account';

class RegisterForm extends Form {
  render() {
    const {
      fields: { userName, email, password, passwordConfirm }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(register)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        <Input field={userName} label="User name" />
        <Input field={email} label="Email" />
        <Input field={password} type="password" label="Password" />
        <Input field={passwordConfirm} type="password" label="Confirm" />
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
{ }
)(RegisterForm);

export default RegisterForm;
