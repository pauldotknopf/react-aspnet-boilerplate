import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState, history) {
  const middleware = routerMiddleware(history);
  let devTools = f => f;
  if (typeof window === 'object'
    && typeof window.devToolsExtension !== 'undefined') {
    console.log('dev tools present...');
    devTools = window.devToolsExtension();
  }
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(middleware),
    devTools
  )(createStore);
  return enhancer(reducer);
}
