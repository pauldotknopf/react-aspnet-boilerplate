import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadExternalLogins, destroyExternalLogins, addExternalLogin, removeExternalLogin } from 'redux/modules/manage';
import { authenticate as externalAuthenticate, clearAuthentication as clearExternalAuthentication } from 'redux/modules/externalLogin';
import { Button } from 'react-bootstrap';
import { ExternalLoginButton, Spinner, ErrorList } from 'components';

class Logins extends Component {
  constructor(props) {
    super(props);
    this.addButtonClick = this.addButtonClick.bind(this);
    this.removeButtonClick = this.removeButtonClick.bind(this);
  }
  componentDidMount() {
    this.props.loadExternalLogins();
  }
  componentWillUnmount() {
    this.props.destroyExternalLogins();
  }
  addButtonClick(scheme) {
    return (event) => {
      event.preventDefault();
      this.props.externalAuthenticate(scheme, false /* don't auto sign-in */)
        .then((result) => {
          this.props.clearExternalAuthentication();
          if (result.externalAuthenticated) {
            // the user succesfully authenticated with the service.
            // add the login to this account.
            this.props.addExternalLogin();
          }
        }, () => {
          this.props.clearExternalAuthentication();
        });
    };
  }
  removeButtonClick(scheme) {
    return (event) => {
      event.preventDefault();
      this.props.removeExternalLogin(scheme);
    };
  }
  render() {
    if (this.props.externalLogins.loading) {
      return (<Spinner />);
    }
    if (!this.props.externalLogins.currentLogins) {
      return (<Spinner />);
    }
    const {
      currentLogins,
      otherLogins,
      errors
    } = this.props.externalLogins;
    return (
      <div>
        <h2>Manage your external logins</h2>
        <ErrorList errors={errors} />
        {(currentLogins.length > 0) &&
          <div>
            <h4>Current logins</h4>
            <table className="table">
              <tbody>
              {currentLogins.map((currentLogin, i) =>
              (
                <tr key={i}>
                  <td>
                    <Button onClick={this.removeButtonClick(currentLogin)}>
                      Remove
                    </Button>
                    {' '}
                    <ExternalLoginButton
                      key={i}
                      scheme={currentLogin.loginProvider}
                      text={currentLogin.loginProviderDisplayName} />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        }
        {(otherLogins.length > 0) &&
          <div>
            <h4>Add another service to log in.</h4>
            <table className="table">
              <tbody>
              {otherLogins.map((otherLogin, i) =>
              (
                <tr key={i}>
                  <td>
                    <Button onClick={this.addButtonClick(otherLogin.scheme)}>
                      Add
                    </Button>
                    {' '}
                    <ExternalLoginButton
                      key={i}
                      scheme={otherLogin.scheme}
                      text={otherLogin.displayName} />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

export default connect(
state => ({ externalLogins: state.manage.externalLogins }),
{ loadExternalLogins, destroyExternalLogins, externalAuthenticate, clearExternalAuthentication, addExternalLogin, removeExternalLogin }
)(Logins);
