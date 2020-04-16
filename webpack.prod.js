const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
      'process.env.NODE_ENV': '"production"',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            extractComments: 'all',
            warnings: false,
            drop_console: true,
            inline: false,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  entry: ['babel-polyfill', 'history', './'],
});
