import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import webpack from "webpack";

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

app.get("*", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Platzi video</title>
                <link href="assets/app.css" type="text/css" rel="stylesheet"/>
            </head>
            <body>
                <div id="app"></div>
                <script src="assets/app.js" type="text/javascript"></script>
            </body>
        </html>
    `);
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
});
