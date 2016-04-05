import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { login } from 'redux/modules/account';

class LoginForm extends Form {
  render() {
    const {
      fields: { userName, password }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(login)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        <Input field={userName} label="User name" />
        <Input field={password} type="password" label="Password" />
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
