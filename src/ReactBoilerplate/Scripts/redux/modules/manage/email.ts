import ApiClient from '../../../helpers/ApiClient';

export enum ActionTypeKeys {
  LOADEMAIL_START = 'react/manage/LOADEMAIL_START',
  LOADEMAIL_COMPLETE = 'react/manage/LOADEMAIL_COMPLETE',
  LOADEMAIL_ERROR = 'react/manage/LOADEMAIL_ERROR',

  CHANGEEMAIL_START = 'react/manage/CHANGEEMAIL_START',
  CHANGEEMAIL_COMPLETE = 'react/manage/CHANGEEMAIL_COMPLETE',
  CHANGEEMAIL_ERROR = 'react/manage/CHANGEEMAIL_ERROR',

  VERIFYEMAIL_START = 'react/manage/VERIFYEMAIL_START',
  VERIFYEMAIL_COMPLETE = 'react/manage/VERIFYEMAIL_COMPLETE',
  VERIFYEMAIL_ERROR = 'react/manage/VERIFYEMAIL_ERROR',

  EMAIL_DESTROY = 'react/manage/EMAIL_DESTROY'
}

export type State = {
  success?: boolean;
  email?: string;
  emailConfirmed?: boolean;
};

export function reducer(state: State = {}, action: any = {}): State {
  switch (action.type) {
    case ActionTypeKeys.LOADEMAIL_COMPLETE:
      return {
        ...state,
        ...action.result
      };
    case ActionTypeKeys.EMAIL_DESTROY:
      return {};
    default:
      return state;
  }
}

export function loadEmail() {
  return {
    types: [ActionTypeKeys.LOADEMAIL_START, ActionTypeKeys.LOADEMAIL_COMPLETE, ActionTypeKeys.LOADEMAIL_ERROR],
    promise: (client: ApiClient) => client.post('/api/manage/email')
  };
}

export function destroyEmail() {
  return { type: ActionTypeKeys.EMAIL_DESTROY };
}

export function changeEmail(body: any) {
  return {
    types: [ActionTypeKeys.CHANGEEMAIL_START, ActionTypeKeys.CHANGEEMAIL_COMPLETE, ActionTypeKeys.CHANGEEMAIL_ERROR],
    promise: (client: ApiClient) => client.post('/api/manage/changeemail', { data: body })
  };
}

export function verifyEmail(body: any) {
  return {
    types: [ActionTypeKeys.VERIFYEMAIL_START, ActionTypeKeys.VERIFYEMAIL_COMPLETE, ActionTypeKeys.VERIFYEMAIL_ERROR],
    promise: (client: ApiClient) => client.post('/api/manage/verifyemail', { data: body })
  };
}
