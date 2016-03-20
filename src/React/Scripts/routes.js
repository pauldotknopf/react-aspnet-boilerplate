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
  ForgotPassword
} from './containers';

export default () => (
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Routes */ }
    <Route path="about" component={About} />
    <Route path="contact" component={Contact} />
    <Route path="register" components={Register} />
    <Route path="login" components={Login} />
    <Route path="forgotpassword" components={ForgotPassword} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
