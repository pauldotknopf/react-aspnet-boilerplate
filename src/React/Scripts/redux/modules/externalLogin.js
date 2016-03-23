export const EXTERNALLOGIN_START = 'react/ouath/EXTERNALLOGIN_START';
export const EXTERNALLOGIN_COMPLETE = 'react/ouath/EXTERNALLOGIN_COMPLETE';
export const EXTERNALLOGIN_ERROR = 'react/ouath/EXTERNALLOGIN_ERROR';

const initialState = {
  loginProviders: [] // it is up to the server to provide these values
};

export default function reducer(state = initialState) {
  return state;
}

export function externalLogin(body) {
  return {
    types: [EXTERNALLOGIN_START, EXTERNALLOGIN_COMPLETE, EXTERNALLOGIN_ERROR],
    promise: (client) => client.post('/api/account/externallogin', { data: body })
  };
}
