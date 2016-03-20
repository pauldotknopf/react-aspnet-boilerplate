import { REGISTER_COMPLETE, LOGIN_COMPLETE, LOGOFF_COMPLETE } from './account';

const initialState = {
  loggedIn: false,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_COMPLETE:
    case LOGIN_COMPLETE:
      if (!action.result.success) {
        return state;
      }
      return {
        ...state,
        user: action.result.user,
        loggedIn: true
      };
    case LOGOFF_COMPLETE:
      if (!action.result.success) {
        return state;
      }
      return {
        ...state,
        user: null,
        loggedIn: false
      };
    default:
      return state;
  }
}
