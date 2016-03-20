import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { forgotPassword } from 'redux/modules/account';

class ForgotPasswordForm extends Form {
  render() {
    const {
      fields: { email }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(forgotPassword)} className="form-horizontal">
        {this.renderGlobalErrorList()}
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
