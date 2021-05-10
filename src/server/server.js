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
    const serverConfig = { serverSideRender: true, publicPath };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
    app.use(morgan("dev"));
} else {
    app.use(morgan("common"));
}

app.get("*", (req, res) => {
    res.status(200).json({ message: "Todo bien en casa" });
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
});
