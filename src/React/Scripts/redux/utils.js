import _ from 'lodash';
import u from 'updeep';

function updateField(current, errors) {
  if (!errors) return current;
  if (errors.length === 0) {
    return current;
  }
  return u({
    submitError: {
      errors
    }
  }, current);
}

export function modelStateErrorToFormFields(initialState, modelState) {
  if (!modelState) {
    return null;
  }
  let updatedModelState = _.omit(modelState, '_global');
  updatedModelState = _.mapValues(updatedModelState, (value, key) =>
    updateField(
      initialState.hasOwnProperty(key) ? initialState[key] : {},
      modelState[key])
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
