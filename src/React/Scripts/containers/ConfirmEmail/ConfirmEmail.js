import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ConfirmEmail extends Component {
  render() {
    const {
      success
    } = this.props;
    return (
      <div>
        {success &&
          <div>
            <h2>Confirm Email</h2>
            <p>
              Thank you for confirming your email.
              Please <Link to="/login">Click here to Log in</Link>.
            </p>
          </div>
        }
        {!success &&
          <div>
            <h1 className="text-danger">Error.</h1>
            <h2 className="text-danger">An error occurred while processing your request.</h2>
          </div>
        }
      </div>
    );
  }
}

export default connect(
(state) => ({ success: state.viewBag.confirmEmailSuccess }),
{ }
)(ConfirmEmail);
