import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSecurity, destroySecurity, setTwoFactor } from 'redux/modules/manage';
import { Spinner } from 'components';
import { Alert, Button } from 'react-bootstrap';

class Security extends Component {
  constructor(props) {
    super(props);
    this.toggleTwoFactorClick = this.toggleTwoFactorClick.bind(this);
  }
  componentDidMount() {
    this.props.loadSecurity();
  }
  componentWillUnmount() {
    this.props.destroySecurity();
  }
  toggleTwoFactorClick(event) {
    event.preventDefault();
    const {
      twoFactorEnabled
    } = this.props.security;
    this.props.setTwoFactor(!twoFactorEnabled);
  }
  render() {
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
        {(twoFactorEnabled && validTwoFactorProviders.length === 0) &&
          <Alert bsStyle="warning">
            Although you have two-factor authentication enabled, you have no valid providers to authenticate with.
          </Alert>
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({ security: state.manage.security }),
  { loadSecurity, destroySecurity, setTwoFactor }
)(Security);
