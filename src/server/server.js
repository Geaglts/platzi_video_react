import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import webpack from "webpack";

// React
import React from "react";
import { renderToString } from "react-dom/server";

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

const store = createStore(reducer, initialState);

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();

// Development config
if (ENV === "development") {
    const webpackConfig = require("../../webpack.config.dev");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const compiler = webpack(webpackConfig);
    const { publicPath } = webpackConfig.output;
    const serverConfig = { serverSideRender: true, publicPath, hot: true };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
    app.use(morgan("dev"));
} else {
    app.use(morgan("common"));
}

const setResponse = (html) => {
    return `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Platzi Video</title>
                <link rel="icon" href="./favicon.ico" />
                <link href="assets/app.css" type="text/css" rel="stylesheet"/>
            </head>
            <body>
                <div id="app">${html}</div>
                <script src="assets/app.js" type="text/javascript"></script>
            </body>
        </html>        
    `;
};

const renderApp = (req, res) => {
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>
    );

    res.send(setResponse(html));
};

app.get("*", renderApp);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
});
