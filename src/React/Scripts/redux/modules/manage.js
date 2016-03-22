export const CHANGEPASSWORD_START = 'react/account/CHANGEPASSWORD_START';
export const CHANGEPASSWORD_COMPLETE = 'react/account/CHANGEPASSWORD_COMPLETE';
export const CHANGEPASSWORD_ERROR = 'react/account/CHANGEPASSWORD_ERROR';

const initialState = {
};

export default function reducer(state = initialState) {
  return state;
}

export function changePassword(body) {
  return {
    types: [CHANGEPASSWORD_START, CHANGEPASSWORD_COMPLETE, CHANGEPASSWORD_ERROR],
    promise: (client) => client.post('/api/manage/changepassword', { data: body })
  };
}
