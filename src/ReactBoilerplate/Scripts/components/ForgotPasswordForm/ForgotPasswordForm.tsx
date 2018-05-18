import * as React from 'react';
import { reduxForm } from 'redux-form';
import Form from '../../components/Form';
import { Input } from '../../components';
import { forgotPassword } from '../../redux/modules/account';
import { RootState } from '../../redux/reducer';

class ForgotPasswordForm extends Form<{}, { success: boolean }> {
  public constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.state = { success: false };
  }
  public success() {
    this.setState({ success: true });
  }
  public render() {
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
        {!success && email &&
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

export default reduxForm(
  {
    form: 'forgotPassword',
    fields: ['email']
  },
  (state: RootState) => state,
  { }
)(ForgotPasswordForm);
