var createError = require('http-errors');
var express = require('express'),
    i18n = require('i18n');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

 
var app = express();
 
// view engine setup
app.set( 'views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

/**
 * Connection and models from Mongoose
 */
require('./lib/connectMongoose');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

i18n.configure({
  locales:["en","es"],
  directory: __dirname + '/locals'
});
  
/** 
 * My API Routes
 */
app.use(express.static('public'));
app.use('/apiv1/classifieds', require('./routes/apiv1/classifieds'));
app.use('/apiv1/users', require('./routes/apiv1/users'));
 
/**
 * My Wep App Routes
 */
app.use('/',      require('./routes/index'));
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
 
  res.status(err.status || 500);
 
  if (isAPI(req)) {
    res.json({success:false, error:err.message});
    return;
  }
  
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
   res.render('error');
});

/**
 * Function that check if the request is to api
 * @param {req} req 
 */

function isAPI(req) {
  return req.originalUrl.indexOf('/apiv')===0;
}

module.exports = app;
