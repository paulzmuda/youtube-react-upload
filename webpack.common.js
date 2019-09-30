const path = require("path");
// const webpack = require("webpack");
// const Dotenv = require("dotenv-webpack");

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

module.exports = {
  context: path.join(__dirname, "src"),

  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js",
    publicPath: "/"
  },
  // module: {  // from react-hot boilerplate
  //   loaders: [{
  //     test: /\.jsx?$/,
  //     loaders: ['react-hot', 'babel'],
  //     include: path.join(__dirname, 'src')
  //   }]
  // }

  module: {
    rules: [
        {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
            exclude: /node_modules/,
            loader: 'file-loader',
            query: {
              name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
            },
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'isomorphic-style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                      // CSS Loader https://github.com/webpack/css-loader
                      importLoaders: 1,
                      sourceMap: isDebug,
                      // CSS Modules https://github.com/css-modules/css-modules
                      modules: true,
                      localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
                      // CSS Nano http://cssnano.co/options/
                      minimize: !isDebug,
                      discardComments: { removeAll: true },
                    },
                  }
            ],
            // query: {
            //   name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
            // },
        },

        {
            test: /theme.scss$/,
            loaders: [
              'isomorphic-style-loader',
              `css-loader?${isDebug ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]&importLoaders=2`,
              'sass-loader',
            ],
          },
          {
            test: /\.scss$/,
            exclude: [/theme.scss$/],
            use: [
              'isomorphic-style-loader',
              `css-loader?${isDebug ? 'sourceMap&' : 'minimize&'}modules&localIdentName=
              ${isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}&importLoaders=2`,
              'sass-loader',
            ],
          },





    
        //   {
    //     test: /\.(jpg|png|svg|gif)$/,
    //     use: {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 25000,
    //       }
    //     }
    //   },
      // {
      //   test: /\.(jpg|png|svg)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[path][name].[hash].[ext]',
      //     }
      //   }
      // },
      
      {
        // test: /\.(js|jsx)$/,
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader:"react-hot-loader/webpack"
          },
          {
            loader: "babel-loader",
            options:{
                presets: ['@babel/preset-env',
                          '@babel/react',{
                          'plugins': ['@babel/plugin-proposal-class-properties']}]
            }
          }
        ]
      },
    //   {
    //     test: /\.(scss|css)$/,
    //     use: [
    //       {
    //         loader: 'style-loader'
    //       },
    //       {
    //         loader: 'css-loader'
    //       },
    //       {
    //         loader: 'sass-loader'
    //       }
    //     ]
    //   }
    //   ,
    //   {
    //     test: /\.svg$/,
    //     use: [
    //       {
    //         loader: "babel-loader"
    //       },
    //       {
    //         loader: "react-svg-loader",
    //         options: {
    //           jsx: true // true outputs JSX tags
    //         }
    //       }
    //     ]
    //   }
    ]
  },

  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom'  },
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, "node_modules")]
  }
};
