import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const history = useScroll(() => browserHistory)();

ReactDOM.render(
  <Router history={history}>
    {getRoutes()}
  </Router>,
  document.getElementById('content')
);