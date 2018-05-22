import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import { loadEmail, destroyEmail, verifyEmail, State as EmailState } from '../../../redux/modules/manage/email';
import { ChangeEmailForm, Spinner } from '../../../components';
import { RootState } from '../../../redux/reducer';

export interface EmailProps {
  loadEmail: () => any;
  destroyEmail: () => any;
  verifyEmail: () => any;
  email: EmailState;
}

class Email extends React.Component<EmailProps, { sendingEmailVerification: boolean }> {
  public constructor(props: EmailProps) {
    super(props);
    this.verifyClick = this.verifyClick.bind(this);
    this.state = { sendingEmailVerification: false };
  }
  public componentDidMount() {
    this.props.loadEmail();
  }
  public componentWillUnmount() {
    this.props.destroyEmail();
  }
  public verifyClick(event: any) {
    event.preventDefault();
    this.setState({ sendingEmailVerification: true });
    this.props.verifyEmail()
      .then(() => {
        this.setState({ sendingEmailVerification: false });
      }, () => {
        this.setState({ sendingEmailVerification: false });
      });
  }
  public render() {
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
            <span className="col-md-2 control-label">Current email</span>
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
  (state: RootState) => ({ email: state.manage.email }),
  { loadEmail, destroyEmail, verifyEmail }
)(Email);
