import { modelStateErrorToFormFields } from '../utils';

const REGISTER_START = 'react/account/REGISTER_START';
export const REGISTER_COMPLETE = 'react/account/REGISTER_COMPLETE';
export const REGISTER_ERROR = 'react/account/REGISTER_ERROR';
export const LOGIN_START = 'react/account/LOGIN_START';
export const LOGIN_COMPLETE = 'react/account/LOGIN_COMPLETE';
export const LOGIN_ERROR = 'react/account/LOGIN_ERROR';
export const LOGOFF_START = 'react/account/LOGOFF_START';
export const LOGOFF_COMPLETE = 'react/account/LOGOFF_COMPLETE';
export const LOGOFF_ERROR = 'react/account/LOGOFF_ERROR';

const initialState = {
};

export default function reducer(state = initialState) {
  return state;
}

export function register(body) {
  return {
    types: [REGISTER_START, REGISTER_COMPLETE, REGISTER_ERROR],
    promise: (client) => client.post('/api/account/register', { data: body })
  };
}

export function login(body) {
  return {
    types: [LOGIN_START, LOGIN_COMPLETE, LOGIN_ERROR],
    promise: (client) => client.post('/api/account/login', { data: body })
  };
}

export function logoff() {
  return {
    types: [LOGOFF_START, LOGOFF_COMPLETE, LOGOFF_ERROR],
    promise: (client) => client.post('/api/account/logoff')
  };
}

export function registerFormPlugin(state = {}, action = {}) {
  switch (action.type) {
    case REGISTER_COMPLETE:
      return {
        ...state,
        ...modelStateErrorToFormFields(state, action.result.errors)
      };
    case REGISTER_ERROR:
      return {
        ...state,
        ...modelStateErrorToFormFields(state, action.result.errors)
      };
    default:
      return state;
  }
}
