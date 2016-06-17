import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input, ExternalLoginButton, ExternalLogin } from 'components';
import { register } from 'redux/modules/account';
import { clearAuthentication as clearExternalAuthentication } from 'redux/modules/externalLogin';
import { Button, Row, Col } from 'react-bootstrap';

class RegisterForm extends Form {
  modifyValues(values) {
    return {
      ...values,
      linkExternalLogin: this.props.externalLogin.externalAuthenticated
    };
  }
  onRemoveExternalAuthClick(action) {
    return (event) => {
      event.preventDefault();
      action();
    };
  }
  render() {
    const {
      fields: { userName, email, password, passwordConfirm },
      externalLogin: { externalAuthenticated, externalAuthenticatedProvider, loginProviders }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(register)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        {externalAuthenticated &&
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

RegisterForm = reduxForm({
  form: 'register',
  fields: ['userName', 'email', 'password', 'passwordConfirm']
},
(state) => ({
  externalLogin: state.externalLogin,
  initialValues: { userName: (state.externalLogin.proposedUserName ? state.externalLogin.proposedUserName : ''), email: (state.externalLogin.proposedEmail ? state.externalLogin.proposedEmail : '') }
}),
{ clearExternalAuthentication }
)(RegisterForm);

export default RegisterForm;
