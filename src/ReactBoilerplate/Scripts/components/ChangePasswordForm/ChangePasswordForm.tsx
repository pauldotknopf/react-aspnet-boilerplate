import * as React from 'react';
import { reduxForm } from 'redux-form';
import Form from '../../components/Form';
import { Input } from '../../components';
import { changePassword } from '../../redux/modules/manage/changePassword';
import { RootState } from '../../redux/reducer';

class ChangePasswordForm extends Form<{}, { success: boolean }> {
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
      fields: { oldPassword, newPassword, newPasswordConfirm }
    } = this.props;
    const {
      success
    } = this.state;
    return (
      <div>
        {success &&
          <p>
          Your password has been changed.
          </p>
        }
        {!success && oldPassword && newPassword && newPasswordConfirm &&
          <form
            onSubmit={this.handleApiSubmit(changePassword, this.success)}
            className="form-horizontal">
            {this.renderGlobalErrorList()}
            <Input field={oldPassword} type="password" label="Current password" />
            <Input field={newPassword} type="password" label="New password" />
            <Input field={newPasswordConfirm} type="password" label="Confirm new password" />
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
    form: 'changePassword',
    fields: ['oldPassword', 'newPassword', 'newPasswordConfirm']
  },
  (state: RootState) => state,
  { }
)(ChangePasswordForm);
