

import accountApi from '../../api/account';
import { modelStateErrorToFormFields } from '../utils';
import { setAuthUser } from './auth';

const initialState = {
  logginIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        logginIn: true
      };
    case LOGIN_COMPLETE:
      return {
        ...state,
        logginIn: false,
        ...modelStateErrorToFormFields(state, action.errors)
      };
    case LOGIN_ERROR:
      return {
        ...state,
        logginIn: false,
        ...modelStateErrorToFormFields(state, action.errors)
      };
    default:
      return state;
  }
}