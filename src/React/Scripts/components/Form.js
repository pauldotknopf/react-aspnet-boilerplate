import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { modelStateErrorToFormFields } from '../utils/modelState';

export function handleApiSubmit(action) {
  return (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(action(values))
        .then(
        (result) => {
          if (result.success) {
            resolve();
          } else {
            reject(modelStateErrorToFormFields(result.errors));
          }
        },
        (result) => {
          reject(modelStateErrorToFormFields(result.errors));
        });
    });
}

class Form extends Component {
  renderGlobalErrorList(error) {
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
