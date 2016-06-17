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
      fields: { code, rememberMe, rememberBrowser }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(verifyCode)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        <Input field={code} label="Code" />
        <Input field={rememberMe} type="checkbox" label="Remember me" />
        <Input field={rememberBrowser} type="checkbox" label="Remember browser" />
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
  fields: ['code', 'rememberMe', 'rememberBrowser']
},
(state) => ({
  sentCodeWithProvider: state.account.sentCodeWithProvider,
  initialValues: {
    rememberMe: true,
    rememberBrowser: true
  }
}),
{ }
)(VerifyCodeForm);

export default VerifyCodeForm;
