import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';
import { match } from 'react-router';
import getRoutes from './routes';
import createHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import isEmpty from 'utils/isEmpty';

export function renderView(callback, path, model, viewBag) {
  const history = createHistory(path);
  const store = configureStore(model, history);
  const result = {
    html: null,
    status: 404,
    redirect: null
  };
  match(
    { history, routes: getRoutes(store), location: path },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        result.redirect = redirectLocation.pathname + redirectLocation.search;
      } else if (error) {
        result.status = 500;
      } else if (renderProps) {
        // if this is the NotFoundRoute, then return a 404
        const isNotFound = renderProps.routes.filter((route) => route.status === 404).length > 0;
        result.status = isNotFound ? 404 : 200;
        const component =
        (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        if (!isEmpty(viewBag)) {
          // If the server provided anyhting in ASP.NET's ViewBag, hydrate it to the store/state.
          // The contents can be accessed on the client via `state.viewBag`. It exist for the initial
          // page load only, and will be cleared when navigating to another page on the client.
          store.dispatch({ type: '_HYDRATE_VIEWBAG', viewBag });
        }
        result.html = ReactDOM.renderToString(<Html component={component} store={store} />);
      } else {
        result.status = 404;
      }
    });
  callback(null, result);
}

export function renderPartialView(callback) {
  callback('TODO', null);
}
