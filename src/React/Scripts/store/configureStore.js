import { createStore } from 'redux';

export default function configureStore(initialState) {
  // you'll probally want to do some more advanced stuff
  const store = createStore((state) => {
    if (!state) {
      return {
        Greeting: 'Hello!'
      };
    }
    return state;
  }, initialState);
  return store;
}
