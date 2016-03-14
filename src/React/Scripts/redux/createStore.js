import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default function createStore() {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    typeof window === 'object'
    && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f
  )(_createStore);
  return finalCreateStore(reducer);
}
