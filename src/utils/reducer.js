'use strict';

import update from 'react/lib/update';
const init = {
  lastFetched: null,
  isLoading: false,
  error: null,
  data: null
};

let asyncReducer = function (...types) {
  let [REQUEST, SUCCESS, FAILURE] = types;
  return function (state = init, action) {
    switch (action.type) {
      case REQUEST:
        return update(state, {
          isLoading: { $set: true },
          error: { $set: null }
        });
      case SUCCESS:
        return update(state, {
          data: { $set: action.body },
          lastFetched: { $set: action.lastFetched },
          isLoading: { $set: false }
        });
      case FAILURE:
        return update(state, { error: { $set: action.error } });
      default:
        return state;
    }
  };
};

export function list(...types) { return asyncReducer(...types); };

export function single(...types) { return asyncReducer(...types); };
