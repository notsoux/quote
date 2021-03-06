const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const quote = require('./routes/quote');

const constant = require( './constant/Constant');
const dao = require( './dao/dao');
const response_util = require('./util/response_util');
const quoteFileParse = require('./util/quoteFileUtil');

dao.connect( function(){
  quoteFileParse.parse( "./data/quotes.csv", function(){

  });
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/quote', quote);

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
    switch( err.code) {
      case constant.QUOTE_DATA_STILL_NOT_AVAILABLE:
      case constant.DB_CONNECTION_STILL_NOT_AVAILABLE:{
        response_util.noQuote( res);//res.render('quote_not_available.jade', {message: 'I\'d like to tell you something...but I forgot everything!'});
        break;
      }
      default:
        res.render('error', {
          message: err.message,
          error: err
        });
    }
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
