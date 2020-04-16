const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/.env') });
const express = require('express');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack');
const webpackDevConfig = require('./webpack.dev.js');
const webpackProdConfig = require('./webpack.prod.js');

const app = express();

// `node server prod`
if (process.argv[2] === 'prod') {
  console.log('--------RUNNING IN PRODUCTION MODE---------');
  const compiler = webpack(webpackProdConfig);
  app.use(express.static(path.join(__dirname, '/www')));
}

// `node server dev" or always fallback to dev if argv not provided
if (process.argv[2] !== 'prod') {
  console.log('--------RUNNING IN DEV MODE---------');
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Set-Cookie", "HttpOnly;Secure;SameSite=None");
  next();
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'www', 'index.html'));
});

const server = app.listen(process.env.SERVER_PORT, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
