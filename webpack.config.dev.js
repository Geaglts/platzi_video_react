const path = require("path");
const HTMlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@components": path.resolve(__dirname, "src", "components"),
            "@containers": path.resolve(__dirname, "src", "containers"),
            "@styles": path.resolve(__dirname, "src", "assets", "styles"),
            "@static": path.resolve(__dirname, "src", "assets", "static"),
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
        new HTMlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "./assets/[name].css",
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
