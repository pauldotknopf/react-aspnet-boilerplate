import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

const reducers = {
  form: formReducer
};

const reducer = combineReducers(reducers);

export default function configureStore() {
  return createStore(
    reducer,
    applyMiddleware(thunk)
  );
}
