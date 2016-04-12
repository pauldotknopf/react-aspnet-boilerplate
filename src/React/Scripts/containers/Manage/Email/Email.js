import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEmail } from 'redux/modules/manage';
import { ChangeEmailForm } from 'components';

class Email extends Component {
  render() {
    return (<ChangeEmailForm />);
  }
}

export default connect(
  (state) => ({ email: state.manage.email }),
  { loadEmail }
)(Email);
