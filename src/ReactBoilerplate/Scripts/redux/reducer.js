import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import auth from './modules/auth';
import account from './modules/account';
import externalLogin from './modules/externalLogin';
import manage from './modules/manage';
import viewBag from './modules/viewBag';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  account,
  externalLogin,
  manage,
  viewBag
});
