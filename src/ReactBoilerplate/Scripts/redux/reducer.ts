import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer, RouterState } from 'react-router-redux';
import { reducer as auth, State as AuthState } from './modules/auth';
import { reducer as account, State as AccountState } from './modules/account';
import { reducer as externalLogin, State as ExternalLoginState } from './modules/externalLogin';
import { reducer as manage, State as ManageState } from './modules/manage';
import { reducer as viewBag } from './modules/viewBag';

export type RootState = {
  form: any;
  routing: RouterState;
  auth: AuthState;
  account: AccountState;
  externalLogin: ExternalLoginState;
  manage: ManageState;
  viewBag: any;
};

export const reducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  account,
  externalLogin,
  manage,
  viewBag
});
