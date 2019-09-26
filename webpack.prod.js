const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
            sourceMap: true,
            uglifyOptions: {
              compress: {
                // extractComments: 'all',
                // warnings: false,
                drop_console: true,
                inline: false
              },
              output: {
                comments: false
              }
            }

        })
      ],
      runtimeChunk: false,
      // splitChunks: {
      //   cacheGroups: {
      //     default: false,
      //     commons: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendor_app',
      //       chunks: 'all',
      //       minChunks: 2
      //     }
      //   }
      // }
    },
    plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
          __DEV__: false,
          __PROD__: true,
          'process.env.NODE_ENV': '"production"',
      })
    ],
    entry: [
        "babel-polyfill",
        "history",
        "./index.js"
      ],
});