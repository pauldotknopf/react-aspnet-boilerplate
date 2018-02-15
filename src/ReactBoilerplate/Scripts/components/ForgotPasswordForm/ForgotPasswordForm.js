import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { forgotPassword } from 'redux/modules/account';

class ForgotPasswordForm extends Form {
  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.state = { success: false };
  }
  success() {
    this.setState({ success: true });
  }
  render() {
    const {
      fields: { email }
    } = this.props;
    const {
      success
    } = this.state;
    return (
      <div>
        {success &&
          <p>
          Please check your email to reset your password.
          </p>
        }
        {!success &&
          <form
            onSubmit={this.handleApiSubmit(forgotPassword, this.success)}
            className="form-horizontal">
            {this.renderGlobalErrorList()}
            <Input field={email} label="Email" />
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-default">Submit</button>
              </div>
            </div>
          </form>
        }
      </div>
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
