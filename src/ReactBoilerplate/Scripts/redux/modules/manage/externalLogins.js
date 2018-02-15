export const LOADEXTERNALLOGINS_START = 'react/manage/LOADEXTERNALLOGINS_START';
export const LOADEXTERNALLOGINS_COMPLETE = 'react/manage/LOADEXTERNALLOGINS_COMPLETE';
export const LOADEXTERNALLOGINS_ERROR = 'react/manage/LOADEXTERNALLOGINS_ERROR';

export const ADDEXTERNALLOGIN_START = 'react/manage/ADDEXTERNALLOGIN_START';
export const ADDEXTERNALLOGIN_COMPLETE = 'react/manage/ADDEXTERNALLOGIN_COMPLETE';
export const ADDEXTERNALLOGIN_ERROR = 'react/manage/ADDEXTERNALLOGIN_ERROR';

export const REMOVEEXTERNALLOGIN_START = 'react/manage/REMOVEEXTERNALLOGIN_START';
export const REMOVEEXTERNALLOGIN_COMPLETE = 'react/manage/REMOVEEXTERNALLOGIN_COMPLETE';
export const REMOVEEXTERNALLOGIN_ERROR = 'react/manage/REMOVEEXTERNALLOGIN_ERROR';

export const EXTERNALLOGINS_DESTROY = 'react/manage/EXTERNALLOGINS_DESTROY';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case LOADEXTERNALLOGINS_START:
      return {
        ...state,
        loading: true
      };
    case LOADEXTERNALLOGINS_COMPLETE:
    case ADDEXTERNALLOGIN_COMPLETE:
    case REMOVEEXTERNALLOGIN_COMPLETE:
      return {
        ...state,
        loading: false,
        ...action.result.externalLogins,
        errors: action.result.errors
      };
    case LOADEXTERNALLOGINS_ERROR:
      return {
        ...state,
        loading: false,
        ...action.result.externalLogins
      };
    case EXTERNALLOGINS_DESTROY:
      return {};
    default:
      return state;
  }
}

export function loadExternalLogins() {
  return {
    types: [LOADEXTERNALLOGINS_START, LOADEXTERNALLOGINS_COMPLETE, LOADEXTERNALLOGINS_ERROR],
    promise: (client) => client.post('/api/manage/externallogins')
  };
}

export function destroyExternalLogins() {
  return { type: EXTERNALLOGINS_DESTROY };
}

export function addExternalLogin() {
  return {
    types: [ADDEXTERNALLOGIN_START, ADDEXTERNALLOGIN_COMPLETE, ADDEXTERNALLOGIN_ERROR],
    promise: (client) => client.post('/api/manage/addexternallogin')
  };
}

export function removeExternalLogin(body) {
  return {
    types: [REMOVEEXTERNALLOGIN_START, REMOVEEXTERNALLOGIN_COMPLETE, REMOVEEXTERNALLOGIN_ERROR],
    promise: (client) => client.post('/api/manage/removeexternallogin', { data: body })
  };
}
