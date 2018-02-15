export const LOADSECURITY_START = 'react/manage/LOADSECURITY_START';
export const LOADSECURITY_COMPLETE = 'react/manage/LOADSECURITY_COMPLETE';
export const LOADSECURITY_ERROR = 'react/manage/LOADSECURITY_ERROR';

export const SETTWOFACTOR_START = 'react/manage/SETTWOFACTOR_START';
export const SETTWOFACTOR_COMPLETE = 'react/manage/SETTWOFACTOR_COMPLETE';
export const SETTWOFACTOR_ERROR = 'react/manage/SETTWOFACTOR_ERROR';

export const SECURITY_DESTROY = 'react/manage/SECURITY_DESTROY';

const initialState = {

};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LOADSECURITY_COMPLETE:
      return {
        ...state,
        ...action.result
      };
    case SETTWOFACTOR_START:
      return {
        ...state,
        settingTwoFactor: true
      };
    case SETTWOFACTOR_COMPLETE:
      return {
        ...state,
        twoFactorEnabled: action.result.twoFactorEnabled,
        settingTwoFactor: false
      };
    case SETTWOFACTOR_ERROR:
      return {
        ...state,
        settingTwoFactor: false
      };
    case SECURITY_DESTROY:
      return initialState;
    default:
      return state;
  }
}

export function loadSecurity() {
  return {
    types: [LOADSECURITY_START, LOADSECURITY_COMPLETE, LOADSECURITY_ERROR],
    promise: (client) => client.post('/api/manage/security')
  };
}

export function setTwoFactor(enabled) {
  return {
    types: [SETTWOFACTOR_START, SETTWOFACTOR_COMPLETE, SETTWOFACTOR_ERROR],
    promise: (client) => client.post('/api/manage/settwofactor', { data: { enabled } })
  };
}

export function destroySecurity() {
  return { type: SECURITY_DESTROY };
}
