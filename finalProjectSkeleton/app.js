// NOTE: require your mongodb connection
// as well as your code to bootstrap auth
require('./db');
require('./auth');
// END


//NOTE: we'll need the passport module so
// that we can configure it later on
var passport = require('passport');
// END

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// NOTE: we'll need session support so that a user
// can remain logged in
var session = require('express-session');
var sessionOptions = {
  secret: 'secret cookie thang (store this elsewhere!)',
  resave: true,
  saveUninitialized: true
};
app.use(session(sessionOptions));
// END

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// NOTE: initialize passport and let it know that we're enabling sessions
app.use(passport.initialize());
app.use(passport.session());
// END

// NOTE: add some middleware that drops req.user into the context of
// every template
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
// END

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
 // app.listen(3000);
 //  console.log("listening on port 3000");
