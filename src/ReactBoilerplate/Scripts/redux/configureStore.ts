import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { reducer } from './reducer';
import createMiddleware from './middleware/clientMiddleware';

let devTools = (f) => f;
if (typeof window === 'object'
  && typeof (window as any).devToolsExtension !== 'undefined') {
  devTools = (window as any).devToolsExtension();
}

export default function configureStore(initialState, history, client?) {
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createMiddleware(client)),
    devTools
  )(createStore);
  return enhancer(reducer, initialState);
}
