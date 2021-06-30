import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import webpack from 'webpack';
import getManifest from './getManifest';

// React
import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from '../frontend/components/Layout';

// React Router
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

// Server Routes
import serverRoutes from '../frontend/routes/serverRoutes';

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../frontend/reducers';

// Integration bff
import passport from 'passport';
import boom from '@hapi/boom';
import axios from 'axios';
import cookieParser from 'cookie-parser';

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();
// Integration bff middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Auth Strategies
import './utils/auth/strategies/basic';

// Development config
if (ENV === 'development') {
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
  app.use(morgan('dev'));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(morgan('common'));
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(helmet.permittedCrossDomainPolicies());
}

const setResponse = (html, preloadedState, manifest) => {
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
  const vendorStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';

  return `<!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Platzi Video</title>
                <link href="${vendorStyles}" type="text/css" rel="stylesheet"/>
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(
                      preloadedState,
                    ).replace(/</g, '\\u003c')}
                </script>
                <script src="${mainBuild}" type="text/javascript"></script>
                <script src="${vendorBuild}" type="text/javascript"></script>
            </body>
        </html>`;
};

const renderApp = (req, res) => {
  let initialState;
  const { email, name, id } = req.cookies;
  if (id) {
    initialState = {
      user: {
        email,
        name,
        id,
      },
      mylist: [],
      trends: [],
      originals: [],
    };
  } else {
    initialState = {
      user: {},
      mylist: [],
      trends: [],
      originals: [],
    };
  }
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = initialState.user.id;
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
      </StaticRouter>
    </Provider>,
  );

  res.removeHeader('x-powered-by');
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

// Requests for the integration bff
// Agregamos las variables de timpo en segundos
const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;

app.post('/auth/sign-in', async function (req, res, next) {
  // Obtenemos el atributo rememberMe desde el cuerpo del request
  const { rememberMe } = req.body;

  passport.authenticate('basic', function (error, data) {
    try {
      if (error || !data) {
        return next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function (err) {
        if (err) {
          return next(err);
        }

        const { token, ...user } = data;
        // Si el atributo rememberMe es verdadero la expiración será en 30 dias
        // de lo contrario la expiración será en 2 horas
        res.cookie('token', token, {
          httpOnly: !(ENV === 'development'),
          secure: !(ENV === 'development'),
          maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async function (req, res, next) {
  const { body: user } = req;
  try {
    const userData = await axios({
      url: `${process.env.API_URL}/api/auth/sign-up`,
      method: 'post',
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    res.status(201).json({
      name: user.name,
      email: user.email,
      id: userData.data.id,
    });
  } catch (error) {
    next(error);
  }
});

app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${PORT}`);
});
