import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEmail, destroyEmail, verifyEmail } from 'redux/modules/manage';
import { ChangeEmailForm, Spinner } from 'components';
import { Alert, Button } from 'react-bootstrap';

class Email extends Component {
  constructor(props) {
    super(props);
    this.verifyClick = this.verifyClick.bind(this);
    this.state = { sendingEmailVerification: false };
  }
  componentDidMount() {
    this.props.loadEmail();
  }
  componentWillUnmount() {
    this.props.destroyEmail();
  }
  verifyClick(event) {
    event.preventDefault();
    this.setState({ sendingEmailVerification: true });
    this.props.verifyEmail()
      .then(() => {
        this.setState({ sendingEmailVerification: false });
      }, () => {
        this.setState({ sendingEmailVerification: false });
      });
  }
  render() {
    const {
      email,
      emailConfirmed
    } = this.props.email;
    const {
      sendingEmailVerification
    } = this.state;
    console.log(email);
    if (typeof email === 'undefined') {
      return (<Spinner />);
    }
    return (
      <div>
        <h2>Email</h2>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label" htmlFor="currentEmail">Current email</label>
            <div className="col-md-10">
              <p id="currentEmail" className="form-control-static">{email}</p>
            </div>
          </div>
        </div>
        {!emailConfirmed &&
          <Alert bsStyle="danger">
            Your email is not verified.
            <br />
            <Button
              onClick={this.verifyClick}
              disabled={sendingEmailVerification}>
              Verify
            </Button>
          </Alert>
        }
        <h3>Change your email</h3>
        <ChangeEmailForm />
      </div>
    );
  }
}

export default connect(
  (state) => ({ email: state.manage.email }),
  { loadEmail, destroyEmail, verifyEmail }
)(Email);
