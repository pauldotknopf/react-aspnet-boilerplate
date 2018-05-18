import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import isEmpty from './utils/isEmpty';
import configureStore from './redux/configureStore';
import Html from './helpers/Html';
import { App } from './containers';
import getRoutes from './routes';

/* eslint-disable no-restricted-globals */
interface RenderContext {
  url?: string;
  status?: number;
}

interface RenderResult {
  html?: string;
  status: number;
  redirect?: string;
}
/* eslint-enable no-restricted-globals */

type callbackFunction = (resultStr: string | null, result: RenderResult | null) => void;

export function renderView(callback: callbackFunction, path: string, model: any, viewBag: any) {
  const history = createHistory({ initialEntries: [path] });
  const store = configureStore(model, history);
  const result: RenderResult = {
    status: 200
  };

  // If the server provided anything in ASP.NET's ViewBag, hydrate it to the store/state.
  // The contents can be accessed on the client via `state.viewBag`. It exists for the initial
  // page load only, and will be cleared when navigating to another page on the client.
  if (!isEmpty(viewBag)) {
    store.dispatch({ type: '_HYDRATE_VIEWBAG', viewBag });
  }

  // Context object contains the results of the render
  const context: RenderContext = {};

  // Router and application component
  const component =
  (
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <App>
          {getRoutes(store)}
        </App>
      </StaticRouter>
    </Provider>
  );

  // Perform the render
  const html = ReactDOM.renderToString(<Html component={component} store={store} />);

  // context.url will contain the URL to redirect to if a <Redirect> was used, and may contain a status code
  if (context.url) {
    result.redirect = context.url;
  } else {
    result.html = html;
    if (context.status) {
      result.status = context.status;
    }
  }

  callback(null, result);
}

export function renderPartialView(callback) {
  callback('TODO', null);
}
