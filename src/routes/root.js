// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import App from '../components/app';
import Main from './main';

import './root.less';

export default function createRoutes(store, pathname) {
  return {
    path: '/',
    component: App,
    childRoutes: [
    ],

    indexRoute: {
      component: Main
    }
  };
}
