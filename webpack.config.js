const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    entry: "./src/frontend/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "assets/app.js",
        publicPath: "/",
    },
    mode: "production",
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
                use: [{ loader: "html-loader" }],
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./assets/app.css",
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
    devtool: "source-map",
};
