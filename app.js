var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
const memesRouter = require('./routes/memes');
const http = require('http');




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


// Proxy route for the external API
// Proxy route for the external API
app.get('/proxy/memes', async (req, res) => {
	try {
	  const externalApiUrl = 'http://143.42.108.232:81/memes'; // External API URL
  
	  http.get(externalApiUrl, (response) => {
		let data = '';
  
		response.on('data', (chunk) => {
		  data += chunk;
		});
  
		response.on('end', () => {
		  res.json(JSON.parse(data));
		});
	  });
	} catch (error) {
	  console.error('Error fetching memes:', error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  });


app.use('/', indexRouter);
app.use('/memes', memesRouter);

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

