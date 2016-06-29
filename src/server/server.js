// jscs:disable validateQuoteMarks
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.config.dev';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { trigger } from 'redial';
import { callAPIMiddleware } from '../middleware/callAPIMiddleware';
import { configureStore } from '../store';
import Helm from 'react-helmet'; // because we are already using helmet
import reducer from '../createReducer';
import createRoutes from '../routes/root';
import { PageNotFound, ResourceNotFound, InternalError } from './utils/error';

const isDeveloping = process.env.NODE_ENV == 'development';
const port = process.env.PORT || 5000;
const server = global.server = express();

// Security
server.disable('x-powered-by');
server.set('port', port);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(hpp());

server.use(helmet.contentSecurityPolicy({
  defaultSrc: [ "'self'" ],
  scriptSrc: [ "'self'" ],
  styleSrc: [ "'self'" ],
  imgSrc: [ "'self'" ],
  connectSrc: [ "'self'", 'ws:' ],
  fontSrc: [ "'self'" ],
  objectSrc: [ "'none'" ],
  mediaSrc: [ "'none'" ],
  frameSrc: [ "'none'" ]
}));
server.use(helmet.xssFilter());
server.use(helmet.frameguard('deny'));
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());
server.use(cookieParser());
server.use(compression());

// Stub for assets, in case running in dev mode.
let assets;

// Webpack (for development)
if (isDeveloping) {
  server.use(morgan('dev'));
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      assets: false,
      children: false,
      chunks: true,
      chunkModules: false,
      modules: false
    }
  });
  server.use(middleware);

  server.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
} else {
  const buildPath = require('../../webpack.config.prod').output.path;
  assets = require('../../assets.json');
  server.use(morgan('combined'));
  server.use('/build/static', express.static(buildPath));
}

// Render Document (include global styles)
const renderFullPage = (data, initialState, assets) => {
  const head = Helm.rewind();

  // Included are some solid resets. Feel free to add normalize etc.
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
         ${head.title.toString()}
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="shortcut icon" href="/build/static/favicon.ico" type="image/x-icon" />
         <link rel="stylesheet" href="/build/static/styles.css">
         ${head.meta.toString()}
         ${head.link.toString()}
      </head>
      <body>
        <div id="root"></div>
        <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
        <script src="${ isDeveloping ? '/build/static/vendor.js' : assets.vendor.js}"></script>
        <script src="${ isDeveloping ? '/build/static/main.js' : assets.main.js}"></script>
      </body>
    </html>
  `;
};

// API
import api from './api';
const prefix = '/api/v0';
api(server, prefix);
server.get(`${prefix}/*`, (req, res) => ResourceNotFound(res));

// SSR Logic
server.get('*', (req, res) => {
  const store = configureStore();
  const { dispatch } = store;
  const pathname = req.path;
  const history = createMemoryHistory(pathname);
  const routes = createRoutes(store, pathname);
  const location = {
    pathname,
    query: req.query
  };

  match({ routes, history, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return InternalError(res);
    }

    if (!renderProps) {
      return PageNotFound(res);
    }

    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
     path: renderProps.location.pathname,
     query: renderProps.location.query,
     params: renderProps.params,

     // Allow lifecycle hooks to dispatch Redux actions:
     dispatch
   };

    trigger('fetch', components, locals)
      .then(() => {
        const initialState = store.getState();
        const InitialView = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        // just call html = ReactDOM.renderToString(InitialView)
        // to if you don't want Aphrodite. Also change renderFullPage
        // accordingly
        const data = ReactDOM.renderToString(InitialView);
        let status = 200;
        if (renderProps.routes.some(el => el.path == '*')) {
          status = 404;
        }

        res.status(status).send(renderFullPage({ html: data }, initialState, assets));
      })
      .catch(e => console.log(e));
  });
});

// Listen
server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('==> 🌎 Listening on port %s.' +
    'Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

module.exports = server;
