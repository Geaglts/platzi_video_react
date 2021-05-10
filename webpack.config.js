const path = require("path");
const HTMlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    entry: "./src/frontend/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    mode: "production",
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
        new HTMlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./assets/[name].css",
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
    devtool: "source-map",
};
