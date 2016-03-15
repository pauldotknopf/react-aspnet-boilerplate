import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore(window.__data);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('content')
);
