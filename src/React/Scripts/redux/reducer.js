import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import account, {
  registerFormPlugin,
  loginFormPlugin,
  forgotPasswordFormPlugin
} from './modules/account';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  form: formReducer.plugin({
    register: registerFormPlugin,
    login: loginFormPlugin,
    forgotPassword: forgotPasswordFormPlugin
  }),
  routing: routerReducer,
  auth,
  account
});
