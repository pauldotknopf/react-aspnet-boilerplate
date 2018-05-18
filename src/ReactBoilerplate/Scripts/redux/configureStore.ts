import { createStore, applyMiddleware, compose, StoreEnhancerStoreCreator } from 'redux';
import { Store } from 'react-redux';
import { History } from 'history';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { reducer, RootState } from './reducer';
import createMiddleware from './middleware/clientMiddleware';
import ApiClient from '../helpers/ApiClient';

let devTools = (f: any) => f;
if (typeof window === 'object'
  && typeof (window as any).devToolsExtension !== 'undefined') {
  devTools = (window as any).devToolsExtension();
}

export default function configureStore(initialState: RootState, history: History, client?: ApiClient): Store<RootState> {
  const enhancer = compose<StoreEnhancerStoreCreator<RootState>>(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createMiddleware(client)),
    devTools
  )(createStore);
  return enhancer(reducer, initialState);
}
