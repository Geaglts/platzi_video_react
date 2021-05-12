const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

require("dotenv").config();

const isDev = process.env.ENV === "development";
const entry = ["./src/frontend/index.js"];

if (isDev) {
    entry.push(
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true"
    );
}

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, "src/server/public"),
        filename: "assets/app.js",
        publicPath: "/",
    },
    mode: "development",
    resolve: { extensions: [".js", ".jsx"] },
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
        isDev ? new webpack.HotModuleReplacementPlugin() : () => {},
        new MiniCssExtractPlugin({
            filename: "./assets/app.css",
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
        isDev ? () => {} : new CleanWebpackPlugin(),
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
