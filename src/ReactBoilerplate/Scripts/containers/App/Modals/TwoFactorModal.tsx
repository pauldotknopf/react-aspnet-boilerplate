import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { resetLoginState, State as AccountState } from '../../../redux/modules/account';
import { TwoFactor } from '../../../components';
import { RootState } from '../../../redux/reducer';

export interface TwoFactorModalProps {
  account: AccountState;
  resetLoginState: () => any;
}

class TwoFactorModal extends React.Component<TwoFactorModalProps> {
  public constructor(props: TwoFactorModalProps) {
    super(props);
    this.close = this.close.bind(this);
  }
  public close() {
    this.props.resetLoginState();
  }
  public render() {
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
  (state: RootState) => ({ account: state.account }),
  { resetLoginState }
)(TwoFactorModal);
