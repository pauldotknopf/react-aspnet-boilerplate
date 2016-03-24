import React, { Component } from 'react';
import { connect } from 'react-redux';
import { externalLogin } from 'redux/modules/externalLogin';

class ExternalLogin extends Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
  }
  loginClick(scheme) {
    return (event) => {
      event.preventDefault();
      this.props.externalLogin({ provider: scheme })
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
    return (
      <p>
        {loginProviders.map((loginProvider) =>
          (
            <a className="btn btn-default"
              onClick={this.loginClick(loginProvider.scheme)}>
              {loginProvider.displayName}
            </a>
          )
        )}
      </p>
    );
  }
}

export default connect(
(state) => state.externalLogin,
{ externalLogin }
)(ExternalLogin);
