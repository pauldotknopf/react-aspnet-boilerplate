import { combineReducers } from 'redux';
import externalLogins from './externalLogins';
import security from './security';

export default combineReducers({
  externalLogins,
  security
});

export * from './externalLogins';
export * from './changePassword';
export * from './security';
