export function modelStateErrorToFormFields(initialState, modelState) {
  const response = {};
  for (const field in modelState) {
    if (modelState.hasOwnProperty(field)) {
      response[field] = { // eslint-disable-line no-param-reassign
        submitError: {
          errors: modelState[field]
        },
        ...initialState[field]
      };
    }
  }
  return response;
}
