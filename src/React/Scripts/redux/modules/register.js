const REGISTER_START = 'redux-example/register/REGISTER_START';
const REGISTER_COMPLETE = 'redux-example/register/REGISTER_COMPLETE';
const REGISTER_ERROR = 'redux-example/register/REGISTER_ERROR';

import accountApi from '../../api/account';

console.log(accountApi);

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        loading: true
      };
    case REGISTER_COMPLETE:
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.errors
      };
    default:
      return state;
  }
}

function registerStart() {
  return { type: REGISTER_START };
}

function registerComplete(user) {
  return { type: REGISTER_COMPLETE, user };
}
function registerError(errors) {
  return { type: REGISTER_ERROR, errors };
}

export function register(body) {
  return dispatch => {
    dispatch(registerStart());
    accountApi.register(body,
      (success) => dispatch(registerComplete(success)),
      (errors) => dispatch(registerError(errors)));
  };
}
