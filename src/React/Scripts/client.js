import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';

ReactDOM.render(
  <Provider store={createStore(window.__data)}>
    <Router history={browserHistory}>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('content')
);
