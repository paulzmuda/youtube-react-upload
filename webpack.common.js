const path = require('path');
const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

module.exports = {
  context: path.join(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
    modules: [path.join(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        enforce: 'pre',
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
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
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDebug,
              onlyLocals: true,
              modules: {
                localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /theme.scss$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              modules: {
                localIdentName: '[local]',
              },
              sourceMap: true,
              importLoaders: 2,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.scss$/,
        exclude: [/theme.scss$/],
        use: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              modules: {
                localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
              },
              sourceMap: true,
              importLoaders: 2,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
