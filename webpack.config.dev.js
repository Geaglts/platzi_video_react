const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    entry: [
        "./src/frontend/index.js",
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true",
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "assets/app.js",
        publicPath: "/",
    },
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@components": path.resolve(
                __dirname,
                "src",
                "frontend",
                "components"
            ),
            "@containers": path.resolve(
                __dirname,
                "src",
                "frontend",
                "containers"
            ),
            "@styles": path.resolve(
                __dirname,
                "src",
                "frontend",
                "assets",
                "styles"
            ),
            "@static": path.resolve(
                __dirname,
                "src",
                "frontend",
                "assets",
                "static"
            ),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                enforce: "pre",
                use: ["babel-loader", "source-map-loader"],
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                },
            },
            {
                test: /\.(s*)css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/[hash].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "./assets/app.css",
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
    devtool: "source-map",
    devServer: {
        open: true,
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        compress: true,
        port: 3001,
    },
};
