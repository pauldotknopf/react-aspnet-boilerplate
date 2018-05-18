import { ActionTypeKeys as AccountActionTypeKeys, User } from './account';
import { ActionTypeKeys as ExternalLoginActionTypeKeys } from './externalLogin';

export type State = {
  loggedIn: boolean;
  user?: User;
};

const initialState: State = {
  loggedIn: false,
  user: undefined
};

export function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {
    case AccountActionTypeKeys.REGISTER_COMPLETE:
    case AccountActionTypeKeys.LOGIN_COMPLETE:
      if (!action.result.success) {
        return state;
      }
      return {
        ...state,
        user: action.result.user,
        loggedIn: true
      };
    case AccountActionTypeKeys.LOGOFF_COMPLETE:
      if (!action.result.success) {
        return state;
      }
      return {
        ...state,
        user: undefined,
        loggedIn: false
      };
    case ExternalLoginActionTypeKeys.EXTERNALAUTHENTICATE_COMPLETE:
      if (action.result.signedIn) {
        return {
          ...state,
          user: action.result.user,
          loggedIn: true
        };
      }
      return state;
    case AccountActionTypeKeys.VERIFYCODE_COMPLETE:
      if (action.result.success) {
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
