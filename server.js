require('dotenv').config({path: __dirname + "/.env"});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackDevConfig = require('./webpack.dev.js');
const webpackProdConfig = require('./webpack.prod.js');
const app = express();

const compiler = process.argv[2]=='prod' ? webpack(webpackProdConfig) : webpack(webpackDevConfig); // "node server prod or node server dev" and always just fallback to dev

process.argv[2]=='prod' ?
	app.use(express.static(__dirname + '/www'))
  : 
	app.use(webpackDevMiddleware(compiler, {
		hot: true,
		filename: 'bundle.js',
		publicPath: '/',
		stats: {
			colors: true,
		},
		historyApiFallback: true,
	}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Set-Cookie", "HttpOnly;Secure;SameSite=None");

  next();
});

process.argv[2]=='prod' ? null : app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'www', 'index.html'))
});

process.argv[2]=='prod' ? console.log('--------RUNNING IN PRODUCTION MODE---------') : console.log('--------RUNNING IN DEV MODE---------');
const server = app.listen(process.env.SERVER_PORT, function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});