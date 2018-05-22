import * as React from 'react';
import { reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
import Form from '../../components/Form';
import { Input, ExternalLogin } from '../../components';
import { login } from '../../redux/modules/account';
import { RootState } from '../../redux/reducer';

export interface LoginFormProps {
  loginProviders: string[];
}

class LoginForm extends Form<LoginFormProps> {
  public render() {
    const {
      fields: { userName, password },
      loginProviders
    } = this.props;
    return userName && password && (
      <form onSubmit={this.handleApiSubmit(login)} className="form-horizontal">
        {this.renderGlobalErrorList()}
        {(loginProviders.length > 0) &&
          <Row>
            <Col md={2} />
            <Col md={10}>
              <ExternalLogin />
              <p>Or...</p>
            </Col>
          </Row>
        }
        <Input field={userName} label="User name" />
        <Input field={password} type="password" label="Password" />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Login</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm(
  {
    form: 'login',
    fields: ['userName', 'password', 'rememberMe']
  },
  (state: RootState) => ({ loginProviders: state.externalLogin.loginProviders }),
  { }
)(LoginForm);
