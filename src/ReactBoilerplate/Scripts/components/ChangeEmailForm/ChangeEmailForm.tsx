import * as React from 'react';
import { reduxForm } from 'redux-form';
import { RootState } from '../../redux/reducer';
import Form from '../Form';
import { Input } from '../../components';
import { changeEmail } from '../../redux/modules/manage/email';

class ChangeEmailForm extends Form<{}, { success: boolean }> {
  public constructor(props: any) {
    super(props);
    this.success = this.success.bind(this);
    this.state = { success: false };
  }
  public success() {
    this.setState({ success: true });
  }
  public render() {
    const {
      fields: { currentPassword, email, emailConfirm }
    } = this.props;
    const {
      success
    } = this.state;
    return (
      <div>
        {success &&
          <p>
          An email has been sent to your email to confirm the change.
          </p>
        }
        {!success && currentPassword && email && emailConfirm &&
          <form
            onSubmit={this.handleApiSubmit(changeEmail, this.success)}
            className="form-horizontal">
            {this.renderGlobalErrorList()}
            <Input field={currentPassword} type="password" label="Current password" />
            <Input field={email} label="New email" />
            <Input field={emailConfirm} label="Confirm new email" />
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-default">Change</button>
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
    form: 'changeEmail',
    fields: ['currentPassword', 'email', 'emailConfirm']
  },
  (state: RootState) => state,
  { }
)(ChangeEmailForm);
