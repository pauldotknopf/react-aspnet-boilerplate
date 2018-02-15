import { LOCATION_CHANGE } from 'react-router-redux';

export default function reducer(state = { $internal: false }, action = {}) {
  switch (action.type) {
    case '_HYDRATE_VIEWBAG':
      // This initial data is provided by the server.
      // It exists for the initial request only.
      return {
        ...state,
        ...action.viewBag
      };
    case LOCATION_CHANGE:
      // This little snippet is a hack to prevent the viewBag
      // from being cleared on initial page load, but destroyed
      // when navigating to a different page.
      // https://github.com/reactjs/react-router-redux/issues/340
      if (state.$internal) return { $internal: true };
      return {
        ...state,
        $internal: true,
        ...action.viewBag
      };
    default:
      return state;
  }
}
