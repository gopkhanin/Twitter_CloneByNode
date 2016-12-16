var config = require('./config');
var	express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var BodyParser	=	require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
// var cookieSession = require('cookie-session');
var session = require('express-session')


module.exports = function(){
	var app = express();

	app.use(session({
		secret:	config.sessionSecret,
		resave:	false,
		saveUninitialized: true
	}));

	// app.use(cookieSession({
	// 	name: 'session',
	// 	keys: ['secret_key1','secret_key2']
	// }));

	// if(process.env.NODE_ENV === 'development'){
	// 	app.use(morgan('dev'));
	// }else{
	// 	app.use(compression)
	// }

	app.use(BodyParser.urlencoded({
		extended : true
	}));
	app.use(BodyParser.json());
	app.use(validator());

	app.use(sass({
		src:'./sass',
		dest: './public/css',
		outputStyle: 'compressed',
		prefix: '/css',
		debug: true
	}));

	app.set('views','./app/views');
	app.set('view engine','jade');

	require('../app/routes/index.routes')(app);
	require('../app/routes/user.routes')(app);

	app.use(express.static('./public'));
	console.log(app);
	return app;
};
