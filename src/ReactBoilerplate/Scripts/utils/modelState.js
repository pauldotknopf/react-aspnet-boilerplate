import _ from 'lodash';

/* eslint "import/prefer-default-export": 0 */
/* eslint "no-prototype-builtins": 0 */
/* eslint "no-underscore-dangle": [2, {"allow": ["_global", "_error" ]}] */

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
