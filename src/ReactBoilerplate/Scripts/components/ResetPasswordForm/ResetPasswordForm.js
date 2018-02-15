import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { resetPassword } from 'redux/modules/account';
import { Link } from 'react-router';

class ResetPasswordForm extends Form {
  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.state = { success: false };
  }
  modifyValues(values) {
    return {
      ...values,
      code: this.props.code
    };
  }
  success() {
    this.setState({ success: true });
  }
  render() {
    const {
      fields: { email, password, passwordConfirm }
    } = this.props;
    const {
      success
    } = this.state;
    return (
      <div>
        {success &&
          <p>
            Your password has been reset. <Link to="/login">Please Click here to log in</Link>.
          </p>
        }
        {!success &&
          <form
            onSubmit={this.handleApiSubmit(resetPassword, this.success)}
            className="form-horizontal">
            {this.renderGlobalErrorList()}
            <Input field={email} label="Email" />
            <Input field={password} type="password" label="Password" />
            <Input field={passwordConfirm} type="password" label="Confirm" />
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-default">Reset</button>
              </div>
            </div>
          </form>
        }
      </div>
    );
  }
}

ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  fields: ['email', 'password', 'passwordConfirm']
},
(state) => {
  let code = null;
  if (state.routing.locationBeforeTransitions) {
    if (state.routing.locationBeforeTransitions.query) {
      code = state.routing.locationBeforeTransitions.query.code;
    }
  }
  return {
    code
  };
},
{ }
)(ResetPasswordForm);

export default ResetPasswordForm;
