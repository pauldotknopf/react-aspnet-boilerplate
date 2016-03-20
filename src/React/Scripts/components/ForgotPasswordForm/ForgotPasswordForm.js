import React from 'react';
import Form, { handleApiSubmit } from 'components/Form';
import { reduxForm } from 'redux-form';
import { forgotPassword } from 'redux/modules/account';
import { Input } from 'components';

class ForgotPasswordForm extends Form {
  render() {
    const {
      fields: { email },
      handleSubmit,
      error
    } = this.props;
    return (
      <form onSubmit={handleSubmit(handleApiSubmit(forgotPassword))} className="form-horizontal">
        {this.renderGlobalErrorList(error)}
        <Input field={email} label="Email" />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  fields: ['email']
},
(state) => state,
{ }
)(ForgotPasswordForm);

export default ForgotPasswordForm;
