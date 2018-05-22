import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { loadExternalLogins, destroyExternalLogins, addExternalLogin, removeExternalLogin, State as ExternalLoginsState } from '../../../redux/modules/manage/externalLogins';
import { authenticate as externalAuthenticate, clearAuthentication as clearExternalAuthentication } from '../../../redux/modules/externalLogin';
import { ExternalLoginButton, Spinner, ErrorList } from '../../../components';
import { RootState } from '../../../redux/reducer';

export interface LoginsProps {
  externalLogins: ExternalLoginsState;
  loadExternalLogins: () => any;
  destroyExternalLogins: () => any;
  clearExternalAuthentication: () => any;
  addExternalLogin: () => any;
  externalAuthenticate: (scheme: string, autoSignIn: boolean) => any;
  removeExternalLogin: (scheme: any) => any;
}

class Logins extends React.Component<LoginsProps> {
  public constructor(props: LoginsProps) {
    super(props);
    this.addButtonClick = this.addButtonClick.bind(this);
    this.removeButtonClick = this.removeButtonClick.bind(this);
  }
  public componentDidMount() {
    this.props.loadExternalLogins();
  }
  public componentWillUnmount() {
    this.props.destroyExternalLogins();
  }
  public addButtonClick(scheme: string) {
    return (event: any) => {
      event.preventDefault();
      this.props.externalAuthenticate(scheme, false /* don't auto sign-in */)
        .then((result: { externalAuthenticated: boolean }) => {
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
  public removeButtonClick(scheme: any) {
    return (event: any) => {
      event.preventDefault();
      this.props.removeExternalLogin(scheme);
    };
  }
  public render() {
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
                {currentLogins.map((currentLogin) =>
                  (
                    <tr key={currentLogin.providerKey}>
                      <td>
                        <Button onClick={this.removeButtonClick(currentLogin)}>
                          Remove
                        </Button>
                        {' '}
                        <ExternalLoginButton
                          scheme={currentLogin.loginProvider}
                          text={currentLogin.loginProviderDisplayName} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        }
        {(otherLogins && otherLogins.length > 0) &&
          <div>
            <h4>Add another service to log in.</h4>
            <table className="table">
              <tbody>
                {otherLogins.map((otherLogin) =>
                  (
                    <tr key={otherLogin.scheme}>
                      <td>
                        <Button onClick={this.addButtonClick(otherLogin.scheme)}>
                          Add
                        </Button>
                        {' '}
                        <ExternalLoginButton
                          scheme={otherLogin.scheme}
                          text={otherLogin.displayName} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({ externalLogins: state.manage.externalLogins }),
  {
    loadExternalLogins,
    destroyExternalLogins,
    externalAuthenticate,
    clearExternalAuthentication,
    addExternalLogin,
    removeExternalLogin
  }
)(Logins);
