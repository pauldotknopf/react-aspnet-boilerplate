import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { sendCode } from 'redux/modules/account';

class SendCodeForm extends Form {
  render() {
    const {
      fields: { provider },
      userFactors
    } = this.props;
    return (
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

SendCodeForm = reduxForm({
  form: 'sendCode',
  fields: ['provider']
},
(state) => ({
  userFactors: state.account.userFactors,
  initialValues: { provider: (state.account.userFactors.length > 0 ? state.account.userFactors[0] : '') }
}),
{ }
)(SendCodeForm);

export default SendCodeForm;
