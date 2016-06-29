import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {callAPIMiddleware} from './middleware/callAPIMiddleware';
import createReducer from './createReducer';
let store;

export function configureStore(initialState = {}) {
  store = createStore(createReducer(), initialState, compose(
    applyMiddleware(thunk, callAPIMiddleware),
    (process.env.NODE_ENV == 'development') &&
     typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ?
       window.devToolsExtension() : f => f
  ));

  store.asyncReducers = {};

  if (process.env.NODE_ENV == 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () =>
        store.replaceReducer(require('./createReducer').default)
      );
    }
  }

  return store;
}

export function inject(store, name, asyncReducer) {
  let asyncReducers = store.asyncReducers;
  
  if (!asyncReducers[name] || asyncReducers[name] !== asyncReducer) {
    asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(asyncReducers));
  }
}
