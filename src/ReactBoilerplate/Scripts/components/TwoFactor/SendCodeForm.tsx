import * as React from 'react';
import { reduxForm } from 'redux-form';
import Form from '../Form';
import { Input } from '../../components';
import { sendCode } from '../../redux/modules/account';
import { RootState } from '../../redux/reducer';

export interface SendCodeFormProps {
  userFactors?: string[];
}

class SendCodeForm extends Form<SendCodeFormProps> {
  public render() {
    const {
      fields: { provider },
      userFactors
    } = this.props;
    return provider && userFactors && (
      <form onSubmit={this.handleApiSubmit(sendCode)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        <Input field={provider} type="option" label="Provider" options={userFactors.map((userFactor) => ({ value: userFactor, display: userFactor }))} />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Send</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm(
  {
    form: 'sendCode',
    fields: ['provider']
  },
  (state: RootState) => ({
    userFactors: state.account.userFactors,
    initialValues: { provider: (state.account.userFactors && state.account.userFactors.length > 0 ? state.account.userFactors[0] : '') }
  }),
  { }
)(SendCodeForm);
