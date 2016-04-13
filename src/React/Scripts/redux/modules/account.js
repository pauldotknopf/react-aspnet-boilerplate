export const REGISTER_START = 'react/account/REGISTER_START';
export const REGISTER_COMPLETE = 'react/account/REGISTER_COMPLETE';
export const REGISTER_ERROR = 'react/account/REGISTER_ERROR';

export const LOGIN_START = 'react/account/LOGIN_START';
export const LOGIN_COMPLETE = 'react/account/LOGIN_COMPLETE';
export const LOGIN_ERROR = 'react/account/LOGIN_ERROR';

export const LOGOFF_START = 'react/account/LOGOFF_START';
export const LOGOFF_COMPLETE = 'react/account/LOGOFF_COMPLETE';
export const LOGOFF_ERROR = 'react/account/LOGOFF_ERROR';

export const FORGOTPASSWORD_START = 'react/account/FORGOTPASSWORD_START';
export const FORGOTPASSWORD_COMPLETE = 'react/account/FORGOTPASSWORD_COMPLETE';
export const FORGOTPASSWORD_ERROR = 'react/account/FORGOTPASSWORD_ERROR';

export const RESETPASSWORD_START = 'react/account/RESETPASSWORD_START';
export const RESETPASSWORD_COMPLETE = 'react/account/RESETPASSWORD_COMPLETE';
export const RESETPASSWORD_ERROR = 'react/account/RESETPASSWORD_ERROR';

export const SENDCODE_START = 'react/account/SENDCODE_START';
export const SENDCODE_COMPLETE = 'react/account/SENDCODE_COMPLETE';
export const SENDCODE_ERROR = 'react/account/SENDCODE_ERROR';

export const VERIFYCODE_START = 'react/account/VERIFYCODE_START';
export const VERIFYCODE_COMPLETE = 'react/account/VERIFYCODE_COMPLETE';
export const VERIFYCODE_ERROR = 'react/account/VERIFYCODE_ERROR';

export const LOGINSTATE_RESET = 'react/account/LOGINSTATE_RESET';

import { EXTERNALAUTHENTICATE_COMPLETE } from 'redux/modules/externalLogin';

const initialState = {
  sentCode: false,
  sentCodeWithProvider: null,
  userFactors: null,
  requiresTwoFactor: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGINSTATE_RESET:
      return initialState;
    case LOGIN_COMPLETE:
      return {
        ...state,
        userFactors: action.result.userFactors,
        requiresTwoFactor: action.result.requiresTwoFactor
      };
    case SENDCODE_COMPLETE:
      return {
        ...state,
        sentCode: action.result.success,
        sentCodeWithProvider: action.result.provider
      };
    case EXTERNALAUTHENTICATE_COMPLETE:
      if (action.result.requiresTwoFactor) {
        return {
          ...state,
          userFactors: action.result.userFactors,
          requiresTwoFactor: true
        };
      }
      return state;
    case VERIFYCODE_COMPLETE:
      if (action.result.success) {
        return initialState; // we logged the user in, reset all the two-factor stuff
      }
      return state;
    default:
      return state;
  }
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

export function forgotPassword(body) {
  return {
    types: [FORGOTPASSWORD_START, FORGOTPASSWORD_COMPLETE, FORGOTPASSWORD_ERROR],
    promise: (client) => client.post('/api/account/forgotpassword', { data: body })
  };
}

export function resetPassword(body) {
  return {
    types: [RESETPASSWORD_START, RESETPASSWORD_COMPLETE, RESETPASSWORD_ERROR],
    promise: (client) => client.post('/api/account/resetpassword', { data: body })
  };
}

export function sendCode(body) {
  return {
    types: [SENDCODE_START, SENDCODE_COMPLETE, SENDCODE_ERROR],
    promise: (client) => client.post('/api/account/sendcode', { data: body })
  };
}

export function verifyCode(body) {
  return {
    types: [VERIFYCODE_START, VERIFYCODE_COMPLETE, VERIFYCODE_ERROR],
    promise: (client) => client.post('/api/account/verifycode', { data: body })
  };
}

export function resetLoginState() {
  return {
    type: LOGINSTATE_RESET
  };
}
