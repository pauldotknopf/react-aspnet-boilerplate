import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ConfirmEmail extends Component {
  render() {
    const {
      success,
      change // was this a result of a change of an email
    } = this.props;
    return (
      <div>
        {!success &&
          <div>
            <h1 className="text-danger">Error.</h1>
            <h2 className="text-danger">An error occurred while processing your request.</h2>
          </div>
        }
        {success &&
          <div>
            {change &&
              <div>
                <h2>Change email</h2>
                <p>
                  Your email was succesfully changed.
                </p>
              </div>
            }
            {!change &&
              <div>
                <h2>Confirm email</h2>
                <p>
                  Thank you for confirming your email.
                  Please <Link to="/login">Click here to Log in</Link>.
                </p>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default connect(
(state) => ({ success: state.viewBag.success, change: state.viewBag.change }),
{ }
)(ConfirmEmail);
