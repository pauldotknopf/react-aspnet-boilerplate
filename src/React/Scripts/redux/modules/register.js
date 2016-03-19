const REGISTER_START = 'react/register/REGISTER_START';
const REGISTER_COMPLETE = 'react/register/REGISTER_COMPLETE';
const REGISTER_ERROR = 'react/register/REGISTER_ERROR';

import accountApi from '../../api/account';
import { modelStateErrorToFormFields } from '../utils';
import { setAuthUser } from './auth';

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
        ...modelStateErrorToFormFields(state, action.errors)
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        ...modelStateErrorToFormFields(state, action.errors)
      };
    default:
      return state;
  }
}

function registerStart() {
  return { type: REGISTER_START };
}

function registerComplete(response) {
  return { type: REGISTER_COMPLETE, ...response };
}
function registerError(response) {
  return { type: REGISTER_ERROR, ...response };
}

export function register(body) {
  return dispatch => {
    dispatch(registerStart());
    accountApi.register(body,
      (response) => {
        dispatch(registerComplete(response.body));
        if (response.body.success) {
          // the user was registered, and also logged in
          dispatch(setAuthUser(response.body.user));
        }
      },
      (response) => dispatch(registerError(response.body)));
  };
}
