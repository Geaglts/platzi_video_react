const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SourceMapDevToolPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';
const entry = ['./src/frontend/index.js'];

if (isDev) {
  entry.push(
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
  );
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: isDev ? 'assets/app.js' : 'assets/app-[contenthash].js',
    publicPath: '/',
  },
  mode: process.env.ENV,
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['babel-loader', 'source-map-loader'],
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[contenthash].[ext]',
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
          filename: '[path][base].gz',
        })
      : () => {},
    new MiniCssExtractPlugin({
      filename: isDev ? 'assets/app.css' : 'assets/app-[contenthash].css',
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    isDev
      ? new ESLintPlugin({
          extensions: ['js', 'jsx'],
          exclude: "'./node_modules/",
        })
      : () => {},
    !isDev ? new WebpackManifestPlugin() : () => {},
    isDev ? () => {} : new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isDev
            ? 'assets/vendor.js'
            : 'assets/vendor-[contenthash].js',
          enforce: true,
          test(module) {
            const name = module.nameForCondition && module.nameForCondition();
            return (chunk) => {
              return (
                chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name)
              );
            };
          },
        },
      },
    },
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3001,
  },
};
