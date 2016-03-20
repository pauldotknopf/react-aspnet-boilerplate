import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import account from './modules/account';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  account
});
