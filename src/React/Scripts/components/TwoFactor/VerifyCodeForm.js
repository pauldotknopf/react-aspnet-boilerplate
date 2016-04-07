import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { verifyCode } from 'redux/modules/account';

class VerifyCodeForm extends Form {
  modifyValues(values) {
    return {
      ...values,
      provider: this.props.sentCodeWithProvider
    };
  }
  render() {
    const {
      fields: { code }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(verifyCode)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        <Input field={code} label="Code" />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Verify</button>
          </div>
        </div>
      </form>
    );
  }
}

VerifyCodeForm = reduxForm({
  form: 'verifyCode',
  fields: ['code']
},
(state) => ({ sentCodeWithProvider: state.account.sentCodeWithProvider }),
{ }
)(VerifyCodeForm);

export default VerifyCodeForm;
