import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import register from './modules/register';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  form: formReducer.plugin({
    register
  }),
  routing: routerReducer
});
