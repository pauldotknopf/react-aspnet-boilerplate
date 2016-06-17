import React, { Component } from 'react';
import { modelStateErrorToFormFields } from '../utils/modelState';
import { ErrorList } from 'components';

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
    return (<ErrorList errors={error.errors} />);
  }
}

export default Form;
