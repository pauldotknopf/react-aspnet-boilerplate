import * as React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Form from '../Form';
import { Input } from '../../components';
import { resetPassword } from '../../redux/modules/account';
import { RootState } from '../../redux/reducer';

class ResetPasswordForm extends Form<{ code?: string | null; }, { success: boolean }> {
  public constructor(props: any) {
    super(props);
    this.success = this.success.bind(this);
    this.state = { success: false };
  }
  protected modifyValues(values: any) {
    return {
      ...values,
      code: this.props.code
    };
  }
  public success() {
    this.setState({ success: true });
  }
  public render() {
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
        {!success && email && password && passwordConfirm &&
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

export default reduxForm(
  {
    form: 'resetPassword',
    fields: ['email', 'password', 'passwordConfirm']
  },
  (state: RootState) => {
    let code = null;
    if (state.routing.location) {
      if ((state.routing.location as any).query) {
        // eslint-disable-next-line prefer-destructuring
        code = (state.routing.location as any).query.code;
      }
    }
    return {
      code
    };
  },
  { }
)(ResetPasswordForm);
