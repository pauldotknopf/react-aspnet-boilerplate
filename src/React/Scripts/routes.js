import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  About,
  NotFound,
} from './containers';

export default () => (
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Routes */ }
    <Route path="about" component={About} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
