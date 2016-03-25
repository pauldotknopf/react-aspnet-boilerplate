import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from 'redux/modules/externalLogin';
import { Button } from 'react-bootstrap';

const bootstrapSocial = require('bootstrap-social');
const fontAwesome = require('font-awesome/scss/font-awesome.scss');

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
            <Button key={i}
              className={bootstrapSocial['btn-google']}
              onClick={this.loginClick(loginProvider.scheme)}>
              <span className={fontAwesome.fa + ' ' + fontAwesome['fa-google']}></span>
              {' ' + this.props.leadingText + ' '}
              {loginProvider.displayName}
            </Button>
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
