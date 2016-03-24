import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { externalLoginRegister } from 'redux/modules/externalLogin';

class ExternalLoginRegisterForm extends Form {
  render() {
    const {
      fields: { userName, email }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(externalLoginRegister)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        <Input field={userName} label="User name" />
        <Input field={email} label="Email" />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Register</button>
          </div>
        </div>
      </form>
    );
  }
}

ExternalLoginRegisterForm = reduxForm({
  form: 'externalLoginRegister',
  fields: ['userName', 'email']
},
(state) => ({ initialValues: { userName: state.temp.proposedUserName, email: state.temp.externalLoginEmail } }),
{ }
)(ExternalLoginRegisterForm);

export default ExternalLoginRegisterForm;
