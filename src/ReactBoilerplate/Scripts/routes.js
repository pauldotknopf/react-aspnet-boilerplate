import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  About,
  Contact,
  NotFound,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  ConfirmEmail,
  Manage,
  ManageIndex,
  ManageSecurity,
  ManageChangePassword,
  ManageLogins,
  ManageEmail
} from './containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const { auth: { user } } = store.getState();
    if (!user) {
      // oops, not logged in, so can't be here!
      replace('/login?returnUrl=' +
        encodeURIComponent(nextState.location.pathname + nextState.location.search));
    }
    cb();
  };
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes */ }
      <Route path="about" component={About} />
      <Route path="contact" component={Contact} />
      <Route path="register" components={Register} />
      <Route path="login" components={Login} />
      <Route path="forgotpassword" components={ForgotPassword} />
      <Route path="resetpassword" components={ResetPassword} />
      <Route path="confirmemail" components={ConfirmEmail} />

      <Route path="manage" component={Manage} onEnter={requireLogin}>
        <IndexRoute component={ManageIndex} />
        <Route path="security" component={ManageSecurity} />
        <Route path="email" component={ManageEmail} />
        <Route path="changepassword" component={ManageChangePassword} />
        <Route path="logins" component={ManageLogins} />
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
