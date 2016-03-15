import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default function configureStore() {
  let devTools = f => f;
  if (typeof window === 'object'
    && typeof window.devToolsExtension !== 'undefined') {
    console.log('dev tools present...');
    devTools = window.devToolsExtension();
  }
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools
  )(createStore);
  return enhancer(reducer);
}
