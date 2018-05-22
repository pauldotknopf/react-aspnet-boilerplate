import ApiClient from '../../../helpers/ApiClient';

export enum ActionTypeKeys {
  LOADEXTERNALLOGINS_START = 'react/manage/LOADEXTERNALLOGINS_START',
  LOADEXTERNALLOGINS_COMPLETE = 'react/manage/LOADEXTERNALLOGINS_COMPLETE',
  LOADEXTERNALLOGINS_ERROR = 'react/manage/LOADEXTERNALLOGINS_ERROR',

  ADDEXTERNALLOGIN_START = 'react/manage/ADDEXTERNALLOGIN_START',
  ADDEXTERNALLOGIN_COMPLETE = 'react/manage/ADDEXTERNALLOGIN_COMPLETE',
  ADDEXTERNALLOGIN_ERROR = 'react/manage/ADDEXTERNALLOGIN_ERROR',

  REMOVEEXTERNALLOGIN_START = 'react/manage/REMOVEEXTERNALLOGIN_START',
  REMOVEEXTERNALLOGIN_COMPLETE = 'react/manage/REMOVEEXTERNALLOGIN_COMPLETE',
  REMOVEEXTERNALLOGIN_ERROR = 'react/manage/REMOVEEXTERNALLOGIN_ERROR',

  EXTERNALLOGINS_DESTROY = 'react/manage/EXTERNALLOGINS_DESTROY'
}

export type State = {
  loading?: boolean;
  success?: boolean;
  currentLogins?: Array<{
    loginProvider: string;
    loginProviderDisplayName: string;
    providerKey: string;
  }>;
  otherLogins?: Array<{
    scheme: string;
    displayName: string;
  }>;
  errors?: string[];
};

export function reducer(state: State = {}, action: any = {}): State {
  switch (action.type) {
    case ActionTypeKeys.LOADEXTERNALLOGINS_START:
      return {
        ...state,
        loading: true
      };
    case ActionTypeKeys.LOADEXTERNALLOGINS_COMPLETE:
    case ActionTypeKeys.ADDEXTERNALLOGIN_COMPLETE:
    case ActionTypeKeys.REMOVEEXTERNALLOGIN_COMPLETE:
      return {
        ...state,
        loading: false,
        ...action.result.externalLogins,
        errors: action.result.errors
      };
    case ActionTypeKeys.LOADEXTERNALLOGINS_ERROR:
      return {
        ...state,
        loading: false,
        ...action.result.externalLogins
      };
    case ActionTypeKeys.EXTERNALLOGINS_DESTROY:
      return {};
    default:
      return state;
  }
}

export function loadExternalLogins() {
  return {
    types: [ActionTypeKeys.LOADEXTERNALLOGINS_START, ActionTypeKeys.LOADEXTERNALLOGINS_COMPLETE, ActionTypeKeys.LOADEXTERNALLOGINS_ERROR],
    promise: (client: ApiClient) => client.post('/api/manage/externallogins')
  };
}

export function destroyExternalLogins() {
  return { type: ActionTypeKeys.EXTERNALLOGINS_DESTROY };
}

export function addExternalLogin() {
  return {
    types: [ActionTypeKeys.ADDEXTERNALLOGIN_START, ActionTypeKeys.ADDEXTERNALLOGIN_COMPLETE, ActionTypeKeys.ADDEXTERNALLOGIN_ERROR],
    promise: (client: ApiClient) => client.post('/api/manage/addexternallogin')
  };
}

export function removeExternalLogin(body: any) {
  return {
    types: [ActionTypeKeys.REMOVEEXTERNALLOGIN_START, ActionTypeKeys.REMOVEEXTERNALLOGIN_COMPLETE, ActionTypeKeys.REMOVEEXTERNALLOGIN_ERROR],
    promise: (client: ApiClient) => client.post('/api/manage/removeexternallogin', { data: body })
  };
}
