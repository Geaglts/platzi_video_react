const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

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
        filename: isDev ? "assets/app.js" : "assets/app-[hash].js",
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
        !isDev
            ? new CompressionWebpackPlugin({
                  test: /\.js$|\.css$/,
                  filename: "[path][base].gz",
              })
            : () => {},
        new MiniCssExtractPlugin({
            filename: isDev ? "./assets/app.css" : "./assets/app-[hash].css",
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
        !isDev ? new WebpackManifestPlugin() : () => {},
        isDev ? () => {} : new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    devtool: "source-map",
    devServer: {
        open: true,
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        compress: true,
        port: 3001,
    },
};
