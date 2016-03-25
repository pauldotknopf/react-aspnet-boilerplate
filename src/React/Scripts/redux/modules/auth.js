import { REGISTER_COMPLETE, LOGIN_COMPLETE, LOGOFF_COMPLETE } from './account';
import { EXTERNALLOGINREGISTER_COMPLETE, EXTERNALAUTHENTICATE_COMPLETE } from './externalLogin';

const initialState = {
  loggedIn: false,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_COMPLETE:
    case LOGIN_COMPLETE:
    case EXTERNALLOGINREGISTER_COMPLETE:
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
    case EXTERNALAUTHENTICATE_COMPLETE:
      if (action.result.signedIn) {
        return {
          ...state,
          user: action.result.user,
          loggedIn: true
        };
      }
      return state;
    default:
      return state;
  }
}
