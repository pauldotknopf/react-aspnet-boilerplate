export const CHANGEPASSWORD_START = 'react/manage/CHANGEPASSWORD_START';
export const CHANGEPASSWORD_COMPLETE = 'react/manage/CHANGEPASSWORD_COMPLETE';
export const CHANGEPASSWORD_ERROR = 'react/manage/CHANGEPASSWORD_ERROR';

export function changePassword(body) {
  return {
    types: [CHANGEPASSWORD_START, CHANGEPASSWORD_COMPLETE, CHANGEPASSWORD_ERROR],
    promise: (client) => client.post('/api/manage/changepassword', { data: body })
  };
}
