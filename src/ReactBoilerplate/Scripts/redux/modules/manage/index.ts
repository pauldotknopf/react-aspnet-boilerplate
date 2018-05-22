import { combineReducers } from 'redux';
import { reducer as externalLogins, State as ExternalLoginsState } from './externalLogins';
import { reducer as security, State as SecurityState } from './security';
import { reducer as email, State as EmailState } from './email';

export type State = {
  externalLogins: ExternalLoginsState;
  security: SecurityState;
  email: EmailState;
};

export const reducer = combineReducers({
  externalLogins,
  security,
  email
});
