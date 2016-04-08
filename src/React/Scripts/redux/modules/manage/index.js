import { combineReducers } from 'redux';
import externalLogins from './externalLogins';

export default combineReducers({
  externalLogins
});

export * from './externalLogins';
export * from './changePassword';
