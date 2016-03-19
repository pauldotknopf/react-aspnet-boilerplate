const AUTH_SET_USER = 'react/auth/AUTH_SET_USER';
const AUTH_UNSET_USER = 'react/auth/AUTH_SET_USER';

const initialState = {
  loggedIn: false,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_SET_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    case AUTH_UNSET_USER:
      return {
        ...state,
        user: null,
        loggedIn: false
      };
    default:
      return state;
  }
}

export function setAuthUser(user) {
  return { type: AUTH_SET_USER, user };
}
export function unsetAuthUser() {
  return { type: AUTH_SET_USER };
}
