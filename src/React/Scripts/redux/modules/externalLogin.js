import promiseWindow from 'promise-window';
import { LOGOFF_COMPLETE } from 'redux/modules/account';

export const EXTERNALAUTHENTICATE_START = 'react/externalLogin/EXTERNALAUTHENTICATE_START';
export const EXTERNALAUTHENTICATE_COMPLETE = 'react/externalLogin/EXTERNALAUTHENTICATE_COMPLETE';
export const EXTERNALAUTHENTICATE_ERROR = 'react/externalLogin/EXTERNALAUTHENTICATE_ERROR';

export const EXTERNALAUTHENTICATE_CLEAR = 'react/externalLogin/EXTERNALAUTHENTICATE_CLEAR';

export const EXTERNALLOGIN_START = 'react/externalLogin/EXTERNALLOGIN_START';
export const EXTERNALLOGIN_COMPLETE = 'react/externalLogin/EXTERNALLOGIN_COMPLETE';
export const EXTERNALLOGIN_ERROR = 'react/externalLogin/EXTERNALLOGIN_ERROR';

export const EXTERNALLOGINREGISTER_START = 'react/externalLogin/EXTERNALLOGINREGISTER_START';
export const EXTERNALLOGINREGISTER_COMPLETE = 'react/externalLogin/EXTERNALLOGINREGISTER_COMPLETE';
export const EXTERNALLOGINREGISTER_ERROR = 'react/externalLogin/EXTERNALLOGINREGISTER_ERROR';

const initialState = {
  loginProviders: [], // it is up to the server to provide these values
  externalAuthenticated: false,
  externalAuthenticatedProvider: null,
  requiresTwoFactor: false,
  lockedOut: false,
  signedIn: false,
  proposedEmail: '',
  proposedUserName: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case EXTERNALAUTHENTICATE_COMPLETE:
      return {
        ...state,
        externalAuthenticated: action.result.externalAuthenticated,
        externalAuthenticatedProvider: action.result.loginProvider,
        requiresTwoFactor: action.result.requiresTwoFactor,
        lockedOut: action.result.lockedOut,
        signedIn: action.result.signedIn,
        proposedEmail: action.result.proposedEmail,
        proposedUserName: action.result.proposedUserName
      };
    case EXTERNALAUTHENTICATE_CLEAR:
    case LOGOFF_COMPLETE:
      return {
        ...state,
        externalAuthenticated: false,
        externalAuthenticatedProvider: null,
        requiresTwoFactor: false,
        lockedOut: false,
        signedIn: false,
        proposedEmail: '',
        proposedUserName: ''
      };
    default:
      return state;
  }
}

export function authenticate(provider) {
  return {
    types: [EXTERNALAUTHENTICATE_START, EXTERNALAUTHENTICATE_COMPLETE, EXTERNALAUTHENTICATE_ERROR],
    promise: () => new Promise((result, reject) => {
      promiseWindow.open('/externalloginredirect?provider=' + provider)
        .then((windowResult) => {
          result(windowResult);
        }, () => {
          reject({});
        });
    })
  };
}

export function clearAuthentication() {
  return {
    type: EXTERNALAUTHENTICATE_CLEAR
  };
}

export function externalLogin(body) {
  return {
    types: [EXTERNALLOGIN_START, EXTERNALLOGIN_COMPLETE, EXTERNALLOGIN_ERROR],
    promise: (client) => client.post('/api/account/externallogin', { data: body })
  };
}

export function externalLoginRegister(body) {
  return {
    types: [EXTERNALLOGINREGISTER_START, EXTERNALLOGINREGISTER_COMPLETE, EXTERNALLOGINREGISTER_ERROR],
    promise: (client) => client.post('/api/account/externalloginregister', { data: body })
  };
}
