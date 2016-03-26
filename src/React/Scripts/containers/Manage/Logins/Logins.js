import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadExternalLogins, destroyExternalLogins } from 'redux/modules/manage';
import { Button } from 'react-bootstrap';
import { ExternalLoginButton } from 'components';

class Logins extends Component {
  componentDidMount() {
    if (!this.props.externalLogins) {
      this.props.loadExternalLogins();
    }
  }
  componentWillUnmount() {
    this.props.destroyExternalLogins();
  }
  render() {
    if (!this.props.externalLogins) {
      return null;
    }
    if (this.props.externalLogins.loading) {
      return null;
    }
    const {
      currentLogins,
      otherLogins
    } = this.props.externalLogins;
    return (
      <div>
        <h2>Manage your external logins</h2>
        {(currentLogins.length > 0) &&
          <div>
            <h4>Current logins</h4>
            <table className="table">
              <tbody>
              {currentLogins.map((currentLogin, i) =>
                (
                  <tr key={i}>
                    <td>
                      <Button>
                        Remove
                      </Button>
                      {' '}
                      <ExternalLoginButton key={i}
                        scheme={currentLogin.loginProvider}
                        text={currentLogin.loginProviderDisplayName} />
                    </td>
                  </tr>
                )
              )}
              </tbody>
            </table>
          </div>
        }
        {(otherLogins.length > 0) &&
          <div>
            <h4>Add another service to log in.</h4>
            <table className="table">
              <tbody>
              {otherLogins.map((otherLogins, i) =>
                (
                  <tr key={i}>
                    <td>
                      <Button>
                        Add
                      </Button>
                      {' '}
                      <ExternalLoginButton key={i}
                        scheme={otherLogins.scheme}
                        text={otherLogins.displayName} />
                    </td>
                  </tr>
                )
              )}
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
{ loadExternalLogins, destroyExternalLogins }
)(Logins);
