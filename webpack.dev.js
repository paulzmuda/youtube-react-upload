const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROD__: false,
      'process.env.NODE_ENV': '"development"',
    }),
  ],
  cache: true,
  devServer: {
    contentBase: './www',
    hot: true,
  },
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    'babel-polyfill',
    'history',
    './',
  ],
});
