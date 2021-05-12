import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import webpack from "webpack";
import getManifest from "./getManifest";

// React
import React from "react";
import { renderToString } from "react-dom/server";
import Layout from "../frontend/components/Layout";

// React Router
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";

// Server Routes
import serverRoutes from "../frontend/routes/serverRoutes";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../frontend/reducers";

// Initial state
import initialState from "../frontend/initialState";

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();

// Development config
if (ENV === "development") {
    const webpackConfig = require("../../webpack.config");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const compiler = webpack(webpackConfig);
    const { publicPath } = webpackConfig.output;
    const serverConfig = { serverSideRender: true, publicPath, hot: true };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
    app.use(morgan("dev"));
} else {
    app.use((req, res, next) => {
        if (!req.hashManifest) req.hashManifest = getManifest();
        next();
    });
    app.use(morgan("common"));
    app.use(express.static(`${__dirname}/public`));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(helmet.permittedCrossDomainPolicies());
}

const setResponse = (html, preloadedState, manifest) => {
    const mainStyles = manifest ? manifest["main.css"] : "assets/app.css";
    const mainBuild = manifest ? manifest["main.js"] : "assets/app.js";

    return `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Platzi Video</title>
                <link href=${mainStyles} type="text/css" rel="stylesheet"/>
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(
                        preloadedState
                    ).replace(/</g, "\\u003c")}
                </script>
                <script src=${mainBuild} type="text/javascript"></script>
            </body>
        </html>        
    `;
};

const renderApp = (req, res) => {
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                <Layout>{renderRoutes(serverRoutes)}</Layout>
            </StaticRouter>
        </Provider>
    );

    res.removeHeader("x-powered-by");
    res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.get("*", renderApp);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
});
