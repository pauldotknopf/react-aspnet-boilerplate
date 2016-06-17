import { combineReducers } from 'redux';
import externalLogins from './externalLogins';
import security from './security';
import email from './email';

export default combineReducers({
  externalLogins,
  security,
  email
});

export * from './externalLogins';
export * from './changePassword';
export * from './security';
export * from './email';
