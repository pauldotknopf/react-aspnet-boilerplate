export const LOADPEOPLE_START = 'react/people/LOADPEOPLE_START';
export const LOADPEOPLE_COMPLETE = 'react/people/LOADPEOPLE_COMPLETE';
export const LOADPEOPLE_ERROR = 'react/people/LOADPEOPLE_ERROR';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOADPEOPLE_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOADPEOPLE_COMPLETE:
      return {
        ...state,
        loading: false,
        people: action.result
      };
    case LOADPEOPLE_ERROR:
      return {
        ...state,
        loading: false,
        error: 'An error occured loading people. This error is thrown randomly for demo purposes.'
      };
    default:
      if (!state) return {}; // we want to always have at least an empty object
      return state;
  }
}

export function loadPeople() {
  return {
    types: [LOADPEOPLE_START, LOADPEOPLE_COMPLETE, LOADPEOPLE_ERROR],
    promise: (client) => client.post('/api/people/load')
  };
}
