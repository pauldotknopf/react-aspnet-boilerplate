import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  About,
  Contact,
  NotFound,
} from './containers';

export default () => (
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Routes */ }
    <Route path="about" component={About} />
    <Route path="contact" component={Contact} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
