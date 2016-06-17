import { combineReducers } from 'redux';
import viewBag from './modules/viewBag';
import people from './modules/people';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  routing: routerReducer,
  viewBag,
  people
});
