import * as React from 'react';
import { reduxForm } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import Form from '../../components/Form';
import { Input, ExternalLoginButton, ExternalLogin } from '../../components';
import { register } from '../../redux/modules/account';
import { clearAuthentication as clearExternalAuthentication, State as ExternalLoginState } from '../../redux/modules/externalLogin';
import { RootState } from '../../redux/reducer';

export interface RegisterFormProps {
  externalLogin: ExternalLoginState;
  clearExternalAuthentication: () => any;
}

class RegisterForm extends Form<RegisterFormProps> {
  protected modifyValues(values) {
    return {
      ...values,
      linkExternalLogin: this.props.externalLogin.externalAuthenticated
    };
  }

  // eslint-disable-next-line class-methods-use-this
  public onRemoveExternalAuthClick(action) {
    return (event) => {
      event.preventDefault();
      action();
    };
  }
  public render() {
    const {
      fields: {
        userName,
        email,
        password,
        passwordConfirm
      },
      externalLogin: {
        externalAuthenticated,
        externalAuthenticatedProvider,
        loginProviders
      }
    } = this.props;
    return userName && email && password && passwordConfirm && (
      <form onSubmit={this.handleApiSubmit(register)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        {externalAuthenticated && externalAuthenticatedProvider &&
          <div className="form-group">
            <Col md={2} />
            <Col md={10}>
              <ExternalLoginButton
                scheme={externalAuthenticatedProvider.scheme}
                text={'Registering with ' + externalAuthenticatedProvider.displayName}
              />
              {' '}
              <Button onClick={this.onRemoveExternalAuthClick(this.props.clearExternalAuthentication)}>
                Cancel
              </Button>
            </Col>
          </div>
        }
        {(!externalAuthenticated && loginProviders.length > 0) &&
          <Row>
            <Col md={2} />
            <Col md={10}>
              <ExternalLogin />
              <p>Or...</p>
            </Col>
          </Row>
        }
        <Input field={userName} label="User name" />
        <Input field={email} label="Email" />
        <Input field={password} type="password" label="Password" />
        <Input field={passwordConfirm} type="password" label="Confirm" />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Register</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm(
  {
    form: 'register',
    fields: ['userName', 'email', 'password', 'passwordConfirm']
  },
  (state: RootState) => ({
    externalLogin: state.externalLogin,
    initialValues: { userName: (state.externalLogin.proposedUserName ? state.externalLogin.proposedUserName : ''), email: (state.externalLogin.proposedEmail ? state.externalLogin.proposedEmail : '') }
  }),
  { clearExternalAuthentication }
)(RegisterForm);
