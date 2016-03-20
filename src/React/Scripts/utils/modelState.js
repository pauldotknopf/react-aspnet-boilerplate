import _ from 'lodash';

// this method will map model state returned from an API, into an object
// this is valid for passing to redux-forms for validation.
export function modelStateErrorToFormFields(modelState) {
  if (!modelState) {
    return null;
  }
  let updatedModelState = _.omit(modelState, '_global');
  updatedModelState = _.mapValues(updatedModelState, (value) =>
    ({
      errors: value
    })
  );
  if (modelState.hasOwnProperty('_global') && modelState._global.length !== 0) {
    updatedModelState._error = {
      errors: modelState._global
    };
  } else {
    updatedModelState._error = null;
  }
  return updatedModelState;
}
