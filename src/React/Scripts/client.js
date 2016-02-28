import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';

require("bootstrap-loader");

ReactDOM.render(
  <Router history={browserHistory}>
    {getRoutes()}
  </Router>,
  document.getElementById('content')
);