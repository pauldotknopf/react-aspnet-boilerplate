import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './redux/configureStore';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

// Need to import App directly from its file so that this module is dependent on it directly for HMR
import App from './containers/App/App';

const client = new ApiClient();
const history = createHistory();
const store = configureStore((window as any).__data, history, client);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <App>
            {getRoutes(store)}
          </App>
        </AppContainer>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('content')
  );
};

// Render the App inside the store and HMR AppContainer
render();

// Register to accept changes to the App
if (module.hot) {
  module.hot.accept('./containers/App/App', () => { render(); });
}
