import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import register from './modules/register';

export default combineReducers({
  form: formReducer,
  register
});
