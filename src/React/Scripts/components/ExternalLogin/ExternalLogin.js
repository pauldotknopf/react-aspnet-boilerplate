import React, { Component } from 'react';
import { connect } from 'react-redux';
import { externalLogin } from 'redux/modules/externalLogin';

class ExternalLogin extends Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
  }
  loginClick(scheme, returnUrl) {
    return (event) => {
      event.preventDefault();
      this.props.externalLogin({ provider: scheme, returnUrl })
        .then(result => {
          if (result.success) {
            window.location = result.redirectUri;
          }
        });
    };
  }
  render() {
    const {
      loginProviders
    } = this.props;

    let returnUrl = '/';
    if (this.props.location) {
      if (this.props.location.query) {
        if (this.props.location.query.returnUrl) {
          returnUrl = this.props.location.query.returnUrl;
        }
      }
    }

    return (
      <p>
        {loginProviders.map((loginProvider) =>
          (
            <a className="btn btn-default"
              onClick={this.loginClick(loginProvider.scheme, returnUrl)}>
              {loginProvider.displayName}
            </a>
          )
        )}
      </p>
    );
  }
}

export default connect(
(state) => ({ loginProviders: state.externalLogin.loginProviders, location: state.routing.locationBeforeTransitions }),
{ externalLogin }
)(ExternalLogin);
