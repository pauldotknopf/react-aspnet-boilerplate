import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { routerMiddleware } from 'react-router-redux';
import createMiddleware from './middleware/clientMiddleware';

let devTools = f => f;
if (typeof window === 'object'
  && typeof window.devToolsExtension !== 'undefined') {
  devTools = window.devToolsExtension();
}

export default function configureStore(initialState, history, client) {
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createMiddleware(client)),
    devTools
  )(createStore);
  return enhancer(reducer, initialState);
}
