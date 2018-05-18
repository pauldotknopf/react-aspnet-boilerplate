import * as React from 'react';
import { reduxForm } from 'redux-form';
import Form from '../../components/Form';
import { Input } from '../../components';
import { verifyCode } from '../../redux/modules/account';
import { RootState } from '../../redux/reducer';

export interface VeriyCodeFormProps {
  sentCodeWithProvider: string;
}

class VerifyCodeForm extends Form<VeriyCodeFormProps> {
  public modifyValues(values: any) {
    return {
      ...values,
      provider: this.props.sentCodeWithProvider
    };
  }
  public render() {
    const {
      fields: { code, rememberMe, rememberBrowser }
    } = this.props;
    return code && rememberMe && rememberBrowser && (
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

export default reduxForm(
  {
    form: 'verifyCode',
    fields: ['code', 'rememberMe', 'rememberBrowser']
  },
  (state: RootState) => (
    {
      sentCodeWithProvider: state.account.sentCodeWithProvider,
      initialValues: {
        rememberMe: true,
        rememberBrowser: true
      }
    }
  ),
  { }
)(VerifyCodeForm);
