var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var unless = require('express-unless');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reportsRouter = require('./routes/reports');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(cors());
app.options('*', cors());
app.unless = unless;

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/users', usersRouter.router);
app.use('/api', expressJwt({
    secret: usersRouter.SECRET
  }))
  .unless({
    path: [
      '/api/users/authenticate'
    ]
  })
app.use('/api/reports', reportsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
