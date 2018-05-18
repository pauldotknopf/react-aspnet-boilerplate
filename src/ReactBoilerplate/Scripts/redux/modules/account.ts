import { ActionTypeKeys as ExternalLoginActionTypeKeys } from './externalLogin';
import ApiClient from '../../helpers/ApiClient';

export enum ActionTypeKeys {
  REGISTER_START = 'react/account/REGISTER_START',
  REGISTER_COMPLETE = 'react/account/REGISTER_COMPLETE',
  REGISTER_ERROR = 'react/account/REGISTER_ERROR',

  LOGIN_START = 'react/account/LOGIN_START',
  LOGIN_COMPLETE = 'react/account/LOGIN_COMPLETE',
  LOGIN_ERROR = 'react/account/LOGIN_ERROR',

  LOGOFF_START = 'react/account/LOGOFF_START',
  LOGOFF_COMPLETE = 'react/account/LOGOFF_COMPLETE',
  LOGOFF_ERROR = 'react/account/LOGOFF_ERROR',

  FORGOTPASSWORD_START = 'react/account/FORGOTPASSWORD_START',
  FORGOTPASSWORD_COMPLETE = 'react/account/FORGOTPASSWORD_COMPLETE',
  FORGOTPASSWORD_ERROR = 'react/account/FORGOTPASSWORD_ERROR',

  RESETPASSWORD_START = 'react/account/RESETPASSWORD_START',
  RESETPASSWORD_COMPLETE = 'react/account/RESETPASSWORD_COMPLETE',
  RESETPASSWORD_ERROR = 'react/account/RESETPASSWORD_ERROR',

  SENDCODE_START = 'react/account/SENDCODE_START',
  SENDCODE_COMPLETE = 'react/account/SENDCODE_COMPLETE',
  SENDCODE_ERROR = 'react/account/SENDCODE_ERROR',

  VERIFYCODE_START = 'react/account/VERIFYCODE_START',
  VERIFYCODE_COMPLETE = 'react/account/VERIFYCODE_COMPLETE',
  VERIFYCODE_ERROR = 'react/account/VERIFYCODE_ERROR',

  LOGINSTATE_RESET = 'react/account/LOGINSTATE_RESET'
}

export interface User {
  id: string;
  userName: string;
  email: string;
}

export type State = {
  sentCode: boolean;
  sentCodeWithProvider?: string;
  userFactors?: string[];
  requiresTwoFactor: boolean;
};

const initialState: State = {
  sentCode: false,
  sentCodeWithProvider: undefined,
  userFactors: undefined,
  requiresTwoFactor: false
};

export function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {
    case ActionTypeKeys.LOGINSTATE_RESET:
      return initialState;
    case ActionTypeKeys.LOGIN_COMPLETE:
      return {
        ...state,
        userFactors: action.result.userFactors,
        requiresTwoFactor: action.result.requiresTwoFactor
      };
    case ActionTypeKeys.SENDCODE_COMPLETE:
      return {
        ...state,
        sentCode: action.result.success,
        sentCodeWithProvider: action.result.provider
      };
    case ExternalLoginActionTypeKeys.EXTERNALAUTHENTICATE_COMPLETE:
      if (action.result.requiresTwoFactor) {
        return {
          ...state,
          userFactors: action.result.userFactors,
          requiresTwoFactor: true
        };
      }
      return state;
    case ActionTypeKeys.VERIFYCODE_COMPLETE:
      if (action.result.success) {
        return initialState; // we logged the user in, reset all the two-factor stuff
      }
      return state;
    default:
      return state;
  }
}

export function register(body: any) {
  return {
    types: [ActionTypeKeys.REGISTER_START, ActionTypeKeys.REGISTER_COMPLETE, ActionTypeKeys.REGISTER_ERROR],
    promise: (client: ApiClient) => client.post('/api/account/register', { data: body })
  };
}

export function login(body: any) {
  return {
    types: [ActionTypeKeys.LOGIN_START, ActionTypeKeys.LOGIN_COMPLETE, ActionTypeKeys.LOGIN_ERROR],
    promise: (client: ApiClient) => client.post('/api/account/login', { data: body })
  };
}

export function logoff() {
  return {
    types: [ActionTypeKeys.LOGOFF_START, ActionTypeKeys.LOGOFF_COMPLETE, ActionTypeKeys.LOGOFF_ERROR],
    promise: (client: ApiClient) => client.post('/api/account/logoff')
  };
}

export function forgotPassword(body: any) {
  return {
    types: [ActionTypeKeys.FORGOTPASSWORD_START, ActionTypeKeys.FORGOTPASSWORD_COMPLETE, ActionTypeKeys.FORGOTPASSWORD_ERROR],
    promise: (client: ApiClient) => client.post('/api/account/forgotpassword', { data: body })
  };
}

export function resetPassword(body: any) {
  return {
    types: [ActionTypeKeys.RESETPASSWORD_START, ActionTypeKeys.RESETPASSWORD_COMPLETE, ActionTypeKeys.RESETPASSWORD_ERROR],
    promise: (client: ApiClient) => client.post('/api/account/resetpassword', { data: body })
  };
}

export function sendCode(body: any) {
  return {
    types: [ActionTypeKeys.SENDCODE_START, ActionTypeKeys.SENDCODE_COMPLETE, ActionTypeKeys.SENDCODE_ERROR],
    promise: (client: ApiClient) => client.post('/api/account/sendcode', { data: body })
  };
}

export function verifyCode(body: any) {
  return {
    types: [ActionTypeKeys.VERIFYCODE_START, ActionTypeKeys.VERIFYCODE_COMPLETE, ActionTypeKeys.VERIFYCODE_ERROR],
    promise: (client: ApiClient) => client.post('/api/account/verifycode', { data: body })
  };
}

export function resetLoginState() {
  return {
    type: ActionTypeKeys.LOGINSTATE_RESET
  };
}
