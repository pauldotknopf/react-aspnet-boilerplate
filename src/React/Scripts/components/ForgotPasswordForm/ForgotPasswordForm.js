import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Input } from 'components';
import { Glyphicon } from 'react-bootstrap';

class ForgotPasswordForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.success && nextProps.succes) {
      this.props.onCompleted();
    }
  }
  submit() {
  }
  renderErrorList(error) {
    if (!error) {
      return null;
    }
    if (!error.errors) {
      return null;
    }
    return (
      <div className="alert alert-danger">
        {error.errors.map((err, i) =>
          (
            <p key={i}>
              <Glyphicon glyph="exclamation-sign" />
              {' '}
              {err}
            </p>
          )
        )}
      </div>
    );
  }
  render() {
    const {
      fields: { email },
      handleSubmit,
      error
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))} className="form-horizontal">
        {this.renderErrorList(error)}
        <Input field={email} label="Email" />
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  fields: ['email']
},
(state) => state,
{ }
)(ForgotPasswordForm);

export default ForgotPasswordForm;
