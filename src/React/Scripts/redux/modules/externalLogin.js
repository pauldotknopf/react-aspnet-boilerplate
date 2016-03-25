import promiseWindow from 'promise-window';

export const EXTERNALAUTHENTICATE_START = 'react/externalLogin/EXTERNALAUTHENTICATE_START';
export const EXTERNALAUTHENTICATE_COMPLETE = 'react/externalLogin/EXTERNALAUTHENTICATE_COMPLETE';
export const EXTERNALAUTHENTICATE_ERROR = 'react/externalLogin/EXTERNALAUTHENTICATE_ERROR';

export const EXTERNALLOGIN_START = 'react/externalLogin/EXTERNALLOGIN_START';
export const EXTERNALLOGIN_COMPLETE = 'react/externalLogin/EXTERNALLOGIN_COMPLETE';
export const EXTERNALLOGIN_ERROR = 'react/externalLogin/EXTERNALLOGIN_ERROR';

export const EXTERNALLOGINREGISTER_START = 'react/externalLogin/EXTERNALLOGINREGISTER_START';
export const EXTERNALLOGINREGISTER_COMPLETE = 'react/externalLogin/EXTERNALLOGINREGISTER_COMPLETE';
export const EXTERNALLOGINREGISTER_ERROR = 'react/externalLogin/EXTERNALLOGINREGISTER_ERROR';

const initialState = {
  loginProviders: [] // it is up to the server to provide these values
};

export default function reducer(state = initialState) {
  return state;
}

export function authenticate(provider) {
  return {
    types: [EXTERNALAUTHENTICATE_START, EXTERNALAUTHENTICATE_COMPLETE, EXTERNALAUTHENTICATE_ERROR],
    promise: () => new Promise((result, reject) => {
      promiseWindow.open('/externalloginredirect?provider=' + provider)
        .then((windowResult) => {
          result(windowResult);
        }, () => {
          reject({});
        });
    })
  };
}

export function externalLogin(body) {
  return {
    types: [EXTERNALLOGIN_START, EXTERNALLOGIN_COMPLETE, EXTERNALLOGIN_ERROR],
    promise: (client) => client.post('/api/account/externallogin', { data: body })
  };
}

export function externalLoginRegister(body) {
  return {
    types: [EXTERNALLOGINREGISTER_START, EXTERNALLOGINREGISTER_COMPLETE, EXTERNALLOGINREGISTER_ERROR],
    promise: (client) => client.post('/api/account/externalloginregister', { data: body })
  };
}
