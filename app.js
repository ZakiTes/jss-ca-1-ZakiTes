var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var session = require('express-session');
var JsonStore = require('express-session-json')(session);

var indexRouter = require('./routes/index');
var app = express();
const memesRouter = require('./routes/memes');
const http = require('http');
const memeRouter= require('./routes/meme');
const loginRouter= require('./routes/login');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static('public'));


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	store: new JsonStore()
  }));
  app.use(passport.authenticate('session'));


app.use('/', indexRouter);
app.use('/memes', memesRouter);
app.use('/meme', memeRouter);
app.use('/login', loginRouter);

//post

  
  
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

