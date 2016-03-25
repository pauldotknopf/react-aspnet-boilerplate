import React from 'react';
import Form from 'components/Form';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { register } from 'redux/modules/account';
import { clearAuthentication as clearExternalAuthentication } from 'redux/modules/externalLogin';
import { Button, Col } from 'react-bootstrap';

const bootstrapSocial = require('bootstrap-social');
const fontAwesome = require('font-awesome/scss/font-awesome.scss');

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
      externalLogin: { externalAuthenticated, externalAuthenticatedProvider }
    } = this.props;
    return (
      <form onSubmit={this.handleApiSubmit(register)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        {externalAuthenticated &&
          <div className="form-group">
            <Col md={2} />
            <Col md={10}>
              <Button className={bootstrapSocial['btn-social'] + ' ' + bootstrapSocial['btn-' + externalAuthenticatedProvider.scheme.toLowerCase()]}>
                <span className={fontAwesome.fa + ' ' + fontAwesome['fa-' + externalAuthenticatedProvider.scheme.toLowerCase()]}></span>
                {' Registering with '}
                {externalAuthenticatedProvider.displayName}
              </Button>
              {' '}
              <Button onClick={this.onRemoveExternalAuthClick(this.props.clearExternalAuthentication)}>
                Cancel
              </Button>
            </Col>
          </div>
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
  initialValues: { userName: state.externalLogin.proposedUserName, email: state.externalLogin.proposedEmail }
}),
{ clearExternalAuthentication }
)(RegisterForm);

export default RegisterForm;
