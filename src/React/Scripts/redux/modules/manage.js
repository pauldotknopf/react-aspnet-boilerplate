export const CHANGEPASSWORD_START = 'react/manage/CHANGEPASSWORD_START';
export const CHANGEPASSWORD_COMPLETE = 'react/manage/CHANGEPASSWORD_COMPLETE';
export const CHANGEPASSWORD_ERROR = 'react/manage/CHANGEPASSWORD_ERROR';

export const LOADEXTERNALLOGINS_START = 'react/manage/LOADEXTERNALLOGINS_START';
export const LOADEXTERNALLOGINS_COMPLETE = 'react/manage/LOADEXTERNALLOGINS_COMPLETE';
export const LOADEXTERNALLOGINS_ERROR = 'react/manage/LOADEXTERNALLOGINS_ERROR';

export const EXTERNALLOGINS_DESTROY = 'react/manage/EXTERNALLOGINS_DESTROY';

const initialState = {

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADEXTERNALLOGINS_START:
      return {
        ...state,
        externalLogins: {
          loading: true
        }
      };
    case LOADEXTERNALLOGINS_COMPLETE:
      return {
        ...state,
        externalLogins: {
          loading: false,
          ...action.result
        }
      };
    case LOADEXTERNALLOGINS_ERROR:
      return {
        ...state,
        externalLogins: {
          loading: false,
          ...action.result
        }
      };
    case EXTERNALLOGINS_DESTROY:
      return {
        ...state,
        externalLogins: null
      };
    default:
      return state;
  }
}

export function changePassword(body) {
  return {
    types: [CHANGEPASSWORD_START, CHANGEPASSWORD_COMPLETE, CHANGEPASSWORD_ERROR],
    promise: (client) => client.post('/api/manage/changepassword', { data: body })
  };
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
