import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { changePassword } from 'redux/modules/manage';

class ChangePasswordForm extends Form {
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
        {!success &&
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

ChangePasswordForm = reduxForm({
  form: 'changePassword',
  fields: ['oldPassword', 'newPassword', 'newPasswordConfirm']
},
(state) => state,
{ }
)(ChangePasswordForm);

export default ChangePasswordForm;
