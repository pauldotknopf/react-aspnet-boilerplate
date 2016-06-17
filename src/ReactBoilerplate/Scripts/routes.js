import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  NotFound,
  People
} from './containers';

export default () =>
  (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes */ }
      <Route path="/people" component={People} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
