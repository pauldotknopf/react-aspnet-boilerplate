import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from 'redux/modules/externalLogin';
import { ExternalLoginButton } from 'components';

class ExternalLogin extends Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
  }
  loginClick(scheme) {
    return (event) => {
      event.preventDefault();
      this.props.authenticate(scheme);
    };
  }
  render() {
    const {
      loginProviders
    } = this.props;
    return (
      <p>
        {loginProviders.map((loginProvider, i) =>
        (
          <span key={i}>
            <ExternalLoginButton
              onClick={this.loginClick(loginProvider.scheme)}
              scheme={loginProvider.scheme}
              text={(this.props.leadingText ? (this.props.leadingText + ' ') : '') + loginProvider.displayName} />
            {' '}
          </span>
        ))}
      </p>
    );
  }
}

export default connect(
(state) => ({ loginProviders: state.externalLogin.loginProviders, location: state.routing.locationBeforeTransitions }),
{ authenticate }
)(ExternalLogin);
