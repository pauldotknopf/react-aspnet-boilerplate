import promiseWindow from 'promise-window';
import { LOCATION_CHANGE } from 'react-router-redux';
import { ActionTypeKeys as AccountActionTypeKeys } from './account';

export enum ActionTypeKeys {
  EXTERNALAUTHENTICATE_START = 'react/externalLogin/EXTERNALAUTHENTICATE_START',
  EXTERNALAUTHENTICATE_COMPLETE = 'react/externalLogin/EXTERNALAUTHENTICATE_COMPLETE',

  EXTERNALAUTHENTICATE_ERROR = 'react/externalLogin/EXTERNALAUTHENTICATE_ERROR',
  EXTERNALAUTHENTICATE_CLEAR = 'react/externalLogin/EXTERNALAUTHENTICATE_CLEAR',
  EXTERNALAUTHENTICATE_REHYDATE = 'react/externalLogin/EXTERNALAUTHENTICATE_REHYDATE'
}

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

export type ExternalLoginProvider = {
  scheme: string;
  displayName: string;
};

export type State = {
  loginProviders: ExternalLoginProvider[];
  externalAuthenticated: boolean;
  externalAuthenticatedProvider?: ExternalLoginProvider;
  signInError: boolean;
  proposedEmail: string;
  proposedUserName: string;
};

const initialState: State = {
  loginProviders: [], // it is up to the server to provide these values
  externalAuthenticated: false,
  externalAuthenticatedProvider: undefined,
  signInError: false,
  proposedEmail: '',
  proposedUserName: ''
};

export function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {
    case ActionTypeKeys.EXTERNALAUTHENTICATE_REHYDATE:
      return {
        ...state,
        ...action.result
      };
    case ActionTypeKeys.EXTERNALAUTHENTICATE_COMPLETE:
      if (action.result.signInError) {
        // We have a valid account with this external login,
        // but we couldn't login for some reason.
        // We don't want to store this login though, because
        // either a two-factor modal will popup will show,
        // or lockout message will show to the user.
        // Either way, there is no reason to store this external
        // login. We can't register with it, or login with it.
        return {
          ...state,
          externalAuthenticated: false,
          externalAuthenticatedProvider: undefined,
          signInError: false,
          proposedEmail: '',
          proposedUserName: ''
        };
      }
      return {
        ...state,
        externalAuthenticated: action.result.externalAuthenticated,
        externalAuthenticatedProvider: action.result.loginProvider,
        signInError: action.result.signInError,
        proposedEmail: action.result.proposedEmail,
        proposedUserName: action.result.proposedUserName
      };
    case ActionTypeKeys.EXTERNALAUTHENTICATE_CLEAR: // when some requests to clear any previously stored external authentications
    case AccountActionTypeKeys.LOGOFF_COMPLETE: // when a user logs off
    case LOCATION_CHANGE: // when the user navigates to different pages, we want to clear the user's logged in provider.
    case AccountActionTypeKeys.LOGINSTATE_RESET:
      // let's clear out the any previously stored external authentications that were done on the client.
      return {
        ...state,
        externalAuthenticated: false,
        externalAuthenticatedProvider: undefined,
        signInError: false,
        proposedEmail: '',
        proposedUserName: ''
      };
    default:
      return state;
  }
}

export function authenticate(provider, autoLogin = true) {
  return {
    types: [ActionTypeKeys.EXTERNALAUTHENTICATE_START, ActionTypeKeys.EXTERNALAUTHENTICATE_COMPLETE, ActionTypeKeys.EXTERNALAUTHENTICATE_ERROR],
    promise: () => new Promise((result, reject) => {
      const windowSize = popupWindowSize(provider);
      promiseWindow.open('/externalloginredirect?provider=' + provider + '&autoLogin=' + autoLogin, { ...windowSize })
        .then((windowResult) => {
          result(windowResult);
        }, () => {
          reject(new Error());
        });
    })
  };
}

export function rehydrateLogin(login) {
  return {
    type: ActionTypeKeys.EXTERNALAUTHENTICATE_REHYDATE,
    result: login
  };
}

export function clearAuthentication() {
  return {
    type: ActionTypeKeys.EXTERNALAUTHENTICATE_CLEAR
  };
}
