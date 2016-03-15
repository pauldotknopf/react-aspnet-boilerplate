import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';
import { match } from 'react-router';
import getRoutes from './routes';
import createHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

export function RenderView(path, model) {
  const history = createHistory(path);
  const result = {
    html: null,
    status: 404,
    redirect: null
  };
  match(
    { history, routes: getRoutes(), location: path },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        result.redirect = redirectLocation.pathname + redirectLocation.search;
      } else if (error) {
        result.status = 500;
      } else if (renderProps) {
        // if this is the NotFoundRoute, then return a 404
        const isNotFound = renderProps.routes.filter((route) => route.status === 404).length > 0;
        result.status = isNotFound ? 404 : 200;
        const store = configureStore(history, model);
        const component =
          (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
        result.html = ReactDOM.renderToString(<Html component={component} store={store} />);
      } else {
        result.status = 404;
      }
    });
  return result;
}

export function RenderPartialView() {
  return 'TODO';
}

