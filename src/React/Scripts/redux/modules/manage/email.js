export const CHANGEEMAIL_START = 'react/manage/CHANGEEMAIL_START';
export const CHANGEEMAIL_COMPLETE = 'react/manage/CHANGEEMAIL_COMPLETE';
export const CHANGEEMAIL_ERROR = 'react/manage/CHANGEEMAIL_ERROR';

const initialState = {

};

export default function (state = initialState) {
  return state;
}

export function changeEmail(body) {
  return {
    types: [CHANGEEMAIL_START, CHANGEEMAIL_COMPLETE, CHANGEEMAIL_ERROR],
    promise: (client) => client.post('/api/manage/changeemail', { data: body })
  };
}
