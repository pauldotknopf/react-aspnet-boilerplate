import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from 'redux/modules/externalLogin';

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
            <a key={i} className="btn btn-default"
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
(state) => ({ loginProviders: state.externalLogin.loginProviders, location: state.routing.locationBeforeTransitions }),
{ authenticate }
)(ExternalLogin);
