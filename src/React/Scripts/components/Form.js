import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { modelStateErrorToFormFields } from '../utils/modelState';

class Form extends Component {
  modifyValues(values) {
    return values;
  }
  handleApiSubmit(action, success, error) {
    const {
      handleSubmit
    } = this.props;
    return handleSubmit((values, dispatch) =>
      new Promise((resolve, reject) => {
        dispatch(action(this.modifyValues(values)))
          .then(
          (result) => {
            if (result.success) {
              resolve();
              if (success) {
                success(result);
              }
            } else {
              reject(modelStateErrorToFormFields(result.errors));
              if (error) {
                error(result);
              }
            }
          },
          (result) => {
            reject(modelStateErrorToFormFields(result.errors));
            if (error) {
              error(result);
            }
          });
      })
    );
  }
  renderGlobalErrorList() {
    const {
      error
    } = this.props;
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
}

export default Form;
