export enum ActionTypeKeys {
  LOADSECURITY_START = 'react/manage/LOADSECURITY_START',
  LOADSECURITY_COMPLETE = 'react/manage/LOADSECURITY_COMPLETE',
  LOADSECURITY_ERROR = 'react/manage/LOADSECURITY_ERROR',

  SETTWOFACTOR_START = 'react/manage/SETTWOFACTOR_START',
  SETTWOFACTOR_COMPLETE = 'react/manage/SETTWOFACTOR_COMPLETE',
  SETTWOFACTOR_ERROR = 'react/manage/SETTWOFACTOR_ERROR',

  SECURITY_DESTROY = 'react/manage/SECURITY_DESTROY'
}

export type State = {
  settingTwoFactor?: boolean;
  twoFactorEnabled?: boolean;
  emailConfirmed?: boolean;
  validTwoFactorProviders?: string[];
};

export function reducer(state = {}, action: any = {}) {
  switch (action.type) {
    case ActionTypeKeys.LOADSECURITY_COMPLETE:
      return {
        ...state,
        ...action.result
      };
    case ActionTypeKeys.SETTWOFACTOR_START:
      return {
        ...state,
        settingTwoFactor: true
      };
    case ActionTypeKeys.SETTWOFACTOR_COMPLETE:
      return {
        ...state,
        twoFactorEnabled: action.result.twoFactorEnabled,
        settingTwoFactor: false
      };
    case ActionTypeKeys.SETTWOFACTOR_ERROR:
      return {
        ...state,
        settingTwoFactor: false
      };
    case ActionTypeKeys.SECURITY_DESTROY:
      return {};
    default:
      return state;
  }
}

export function loadSecurity() {
  return {
    types: [ActionTypeKeys.LOADSECURITY_START, ActionTypeKeys.LOADSECURITY_COMPLETE, ActionTypeKeys.LOADSECURITY_ERROR],
    promise: (client) => client.post('/api/manage/security')
  };
}

export function setTwoFactor(enabled) {
  return {
    types: [ActionTypeKeys.SETTWOFACTOR_START, ActionTypeKeys.SETTWOFACTOR_COMPLETE, ActionTypeKeys.SETTWOFACTOR_ERROR],
    promise: (client) => client.post('/api/manage/settwofactor', { data: { enabled } })
  };
}

export function destroySecurity() {
  return { type: ActionTypeKeys.SECURITY_DESTROY };
}
