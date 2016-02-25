import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';
import {FindView} from './views.js';
import { match } from 'react-router';
import getRoutes from './routes';
import createHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';

export function RenderView (path, model) {

  const history = createHistory(path);
  var result = "";
  match({ history, routes: getRoutes(), location: path }, (error, redirectLocation, renderProps) => {
    result = ReactDOM.renderToString(<RouterContext {...renderProps} />);
  });
  return result;
};

export function RenderPartialView (path, model) {
    return "TODO";
};
