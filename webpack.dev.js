const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        // new webpack.NamedModulesPlugin(),
        new Dotenv(),
        new webpack.HotModuleReplacementPlugin(),
        // ensure that we get a production build of any dependencies
        // this is primarily for React, where this removes 179KB from the bundle
        new webpack.DefinePlugin({
            __DEV__: true,
            __PROD__: false,
            'process.env.NODE_ENV': '"development"',
      })
    ],
    cache: true,
    devServer: {
        contentBase: './www',
        hot: true
    },
    entry: [
        "webpack-hot-middleware/client",
        "react-hot-loader/patch",
        "babel-polyfill",
        "history",
        "./index.js"
      ],
});