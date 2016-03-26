import promiseWindow from 'promise-window';
import { LOGOFF_COMPLETE } from 'redux/modules/account';
import { LOCATION_CHANGE } from 'react-router-redux';

export const EXTERNALAUTHENTICATE_START = 'react/externalLogin/EXTERNALAUTHENTICATE_START';
export const EXTERNALAUTHENTICATE_COMPLETE = 'react/externalLogin/EXTERNALAUTHENTICATE_COMPLETE';
export const EXTERNALAUTHENTICATE_ERROR = 'react/externalLogin/EXTERNALAUTHENTICATE_ERROR';

export const EXTERNALAUTHENTICATE_CLEAR = 'react/externalLogin/EXTERNALAUTHENTICATE_CLEAR';
export const EXTERNALAUTHENTICATE_REHYDATE = 'react/externalLogin/EXTERNALAUTHENTICATE_REHYDATE';

export const EXTERNALLOGIN_START = 'react/externalLogin/EXTERNALLOGIN_START';
export const EXTERNALLOGIN_COMPLETE = 'react/externalLogin/EXTERNALLOGIN_COMPLETE';
export const EXTERNALLOGIN_ERROR = 'react/externalLogin/EXTERNALLOGIN_ERROR';

export const EXTERNALLOGINREGISTER_START = 'react/externalLogin/EXTERNALLOGINREGISTER_START';
export const EXTERNALLOGINREGISTER_COMPLETE = 'react/externalLogin/EXTERNALLOGINREGISTER_COMPLETE';
export const EXTERNALLOGINREGISTER_ERROR = 'react/externalLogin/EXTERNALLOGINREGISTER_ERROR';

function popupWindowSize(provider) {
  switch (provider.toLowerCase()) {
    case 'facebook':
      return { width: 580, height: 400 };
    case 'google':
      return { width: 452, height: 633 };
    case 'github':
      return { width: 1020, height: 618 };
    case 'linkedin':
      return { width: 527, height: 582 };
    case 'twitter':
      return { width: 495, height: 645 };
    case 'live':
      return { width: 500, height: 560 };
    case 'yahoo':
      return { width: 559, height: 519 };
    default:
      return { width: 1020, height: 618 };
  }
}

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
    case EXTERNALAUTHENTICATE_REHYDATE:
      return {
        ...state,
        ...action.result
      };
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
    case LOCATION_CHANGE: // when the user navigates to different pages, we want to clear the user's logged in provider.
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
      const windowSize = popupWindowSize(provider);
      promiseWindow.open('/externalloginredirect?provider=' + provider, { ...windowSize })
        .then((windowResult) => {
          result(windowResult);
        }, () => {
          reject({});
        });
    })
  };
}

export function rehydrateLogin(login) {
  return {
    type: EXTERNALAUTHENTICATE_REHYDATE,
    result: login
  };
}

export function clearAuthentication() {
  return {
    type: EXTERNALAUTHENTICATE_CLEAR
  };
}
