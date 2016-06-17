import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { resetLoginState } from 'redux/modules/account';
import { TwoFactor } from 'components';

class TwoFactorModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  close() {
    this.props.resetLoginState();
  }
  render() {
    const {
      requiresTwoFactor
    } = this.props.account;
    return (
      <Modal show={requiresTwoFactor} onHide={this.close}>
        <Modal.Header>
          <Modal.Title>Security</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TwoFactor />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
state => ({ account: state.account }),
{ resetLoginState }
)(TwoFactorModal);
