import { provideHooks } from 'redial';
import { connect as redialConnect } from 'react-redux';
import { DEBUG } from './../../constants';

export function async({ key, search, resolve, connect }) {
  const provide = (callback) => ({
    fetch: ({ dispatch, ...args }) => {

      if (DEBUG) {
        console.log('@provideHooks.fetch', args);
      }

      return dispatch(callback(args));
    }
  });

  const addParams = (callback) => ({ [ key ]: { data, ...props } }) => {
    if (DEBUG) {
      console.log('@connect', !data ? true : props.isLoading);
    }

    return Object.assign(callback({ ...data, ...props }), {
      error      : props.error,
      isLoading  : !data ? true : props.isLoading,
      lastFetched: props.lastFetched
    });
  };

  if (typeof search === 'function') {
    return (ComposedComponent) => {
      provideHooks(
        provide(({ params, query: { q, page, limit, ...filters } }) => search({ q, page, limit, filters, ...params }))
      )(ComposedComponent);

      return redialConnect(
        addParams((data) => (data)),
        (dispatch, { location: { query: { q, page, limit, ...filters } } }) => ({
          q, page : !!page ? +page : page, limit: !!limit ? +limit : limit, filters
        })
      )(ComposedComponent);
    };
  }

  return (ComposedComponent) => {
    provideHooks(provide(resolve))(ComposedComponent);

    return redialConnect(addParams(connect))(ComposedComponent);
  };
}
