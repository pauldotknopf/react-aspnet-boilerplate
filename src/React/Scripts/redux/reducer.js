import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import register from './modules/register';
import auth from './modules/auth';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  form: formReducer.plugin({
    register
  }),
  routing: routerReducer,
  auth
});
