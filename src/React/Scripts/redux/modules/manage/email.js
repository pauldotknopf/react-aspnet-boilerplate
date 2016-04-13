export const LOADEMAIL_START = 'react/manage/LOADEMAIL_START';
export const LOADEMAIL_COMPLETE = 'react/manage/LOADEMAIL_COMPLETE';
export const LOADEMAIL_ERROR = 'react/manage/LOADEMAIL_ERROR';

export const CHANGEEMAIL_START = 'react/manage/CHANGEEMAIL_START';
export const CHANGEEMAIL_COMPLETE = 'react/manage/CHANGEEMAIL_COMPLETE';
export const CHANGEEMAIL_ERROR = 'react/manage/CHANGEEMAIL_ERROR';

export const VERIFYEMAIL_START = 'react/manage/VERIFYEMAIL_START';
export const VERIFYEMAIL_COMPLETE = 'react/manage/VERIFYEMAIL_COMPLETE';
export const VERIFYEMAIL_ERROR = 'react/manage/VERIFYEMAIL_ERROR';

export const EMAIL_DESTROY = 'react/manage/EMAIL_DESTROY';

const initialState = {

};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LOADEMAIL_COMPLETE:
      return {
        ...state,
        ...action.result
      };
    case EMAIL_DESTROY:
      return initialState;
    default:
      return state;
  }
}

export function loadEmail() {
  return {
    types: [LOADEMAIL_START, LOADEMAIL_COMPLETE, LOADEMAIL_ERROR],
    promise: (client) => client.post('/api/manage/email')
  };
}

export function destroyEmail() {
  return { type: EMAIL_DESTROY };
}

export function changeEmail(body) {
  return {
    types: [CHANGEEMAIL_START, CHANGEEMAIL_COMPLETE, CHANGEEMAIL_ERROR],
    promise: (client) => client.post('/api/manage/changeemail', { data: body })
  };
}

export function verifyEmail(body) {
  return {
    types: [VERIFYEMAIL_START, VERIFYEMAIL_COMPLETE, VERIFYEMAIL_ERROR],
    promise: (client) => client.post('/api/manage/verifyemail', { data: body })
  };
}
