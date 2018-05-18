import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import { loadSecurity, destroySecurity, setTwoFactor, State as SecurityState } from '../../../redux/modules/manage/security';
import { Spinner } from '../../../components';
import { RootState } from '../../../redux/reducer';

export interface SecurityProps {
  security: SecurityState;
  loadSecurity: () => any;
  destroySecurity: () => any;
  setTwoFactor: (enabled: boolean) => any;
}

class Security extends React.Component<SecurityProps> {
  public constructor(props) {
    super(props);
    this.toggleTwoFactorClick = this.toggleTwoFactorClick.bind(this);
  }
  public componentDidMount() {
    this.props.loadSecurity();
  }
  public componentWillUnmount() {
    this.props.destroySecurity();
  }
  public toggleTwoFactorClick(event) {
    event.preventDefault();
    const {
      twoFactorEnabled
    } = this.props.security;
    this.props.setTwoFactor(!twoFactorEnabled);
  }
  public render() {
    const {
      twoFactorEnabled,
      validTwoFactorProviders,
      settingTwoFactor
    } = this.props.security;
    if (typeof twoFactorEnabled === 'undefined') {
      return (<Spinner />);
    }
    return (
      <div>
        <Alert bsStyle={twoFactorEnabled ? 'success' : 'danger'}>
          Two-factor authentication is <strong>{twoFactorEnabled ? 'enabled' : 'disabled'}</strong>.
          <br />
          <Button
            onClick={this.toggleTwoFactorClick}
            disabled={settingTwoFactor}>
            {twoFactorEnabled ? 'Disable' : 'Enable'}
          </Button>
        </Alert>
        {(twoFactorEnabled && (!validTwoFactorProviders || validTwoFactorProviders.length === 0)) &&
          <Alert bsStyle="warning">
            Although you have two-factor authentication enabled, you have no valid providers to authenticate with.
          </Alert>
        }
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({ security: state.manage.security }),
  { loadSecurity, destroySecurity, setTwoFactor }
)(Security);
